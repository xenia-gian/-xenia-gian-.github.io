document
  .getElementById("calculateButton")
  .addEventListener("click", calculatePrice);
document.getElementById("clearButton").addEventListener("click", clearForm);

document
  .getElementById("replacement_type")
  .addEventListener("change", function () {
    const replacementType = document.getElementById("replacement_type").value;
    if (replacementType === "system_swap") {
      // document.getElementById("bedroomsQuestion").style.display = "block";
      document.getElementById("bathroomsQuestion").style.display = "block";
      // document.getElementById("radiatorsQuestion").style.display = "block";
    } else {
      // document.getElementById("bedroomsQuestion").style.display = "none";
      document.getElementById("bathroomsQuestion").style.display = "none";
      // document.getElementById("radiatorsQuestion").style.display = "none";
    }
  });

function calculatePrice() {
  const boilerType = document.getElementById("boiler_type").value;
  const boilerPower = document.getElementById("boiler_power").value;
  const boilerLocation = document.getElementById("boiler_location").value;
  const flue = document.getElementById("flue").value;
  const replacementType = document.getElementById("replacement_type").value;
  const bathroomCount = document.getElementById("bathroom_count").value;

  if (
    !boilerType ||
    !boilerPower ||
    !boilerLocation ||
    !flue ||
    !replacementType
  ) {
    alert("Please fill out all fields.");
    return;
  }

  if (replacementType === "system_swap") {
    // const bedrooms = document.getElementById("bedrooms").value;
    const bathrooms = document.getElementById("bathrooms")?.value;
    // const radiators = document.getElementById("radiators").value;

    // if (!bedrooms || !bathrooms || !radiators) {
    if (!bathrooms) {
      alert("Please fill out all system swap specific questions.");
      return;
    }
  }

  let price = 0;
  let labour = 0;
  let combinationFound = false;

  // Define the price table with combinations and their prices
  const priceTable = {
    combinations: [
      {
        boiler_type: "combi",
        boiler_power: "24",
        replacement_type: "straight_swap",
        price: 1008.05,
        labour: 400,
      },
      {
        boiler_type: "combi",
        boiler_power: "30",
        replacement_type: "straight_swap",
        price: 1104.53,
        labour: 400,
      },
      {
        boiler_type: "combi",
        boiler_power: "35",
        replacement_type: "straight_swap",
        price: 1225.65,
        labour: 400,
      },
      {
        boiler_type: "system",
        boiler_power: "15",
        replacement_type: "straight_swap",
        price: 1056.87,
        labour: 400,
      },
      {
        boiler_type: "system",
        boiler_power: "18",
        replacement_type: "straight_swap",
        price: 1092.72,
        labour: 400,
      },
      {
        boiler_type: "system",
        boiler_power: "24",
        replacement_type: "straight_swap",
        price: 1128.58,
        labour: 400,
      },
      {
        boiler_type: "regular",
        boiler_power: "15",
        replacement_type: "straight_swap",
        price: 1005.89,
        labour: 400,
      },
      {
        boiler_type: "regular",
        boiler_power: "18",
        replacement_type: "straight_swap",
        price: 1041.77,
        labour: 400,
      },
      {
        boiler_type: "regular",
        boiler_power: "24",
        replacement_type: "straight_swap",
        price: 1077.62,
        labour: 400,
      },
      {
        boiler_type: "regular" || "system",
        replacement_type: "system_swap",
        bathroom_count: "1",
        price: 1008.05,
        labour: 700,
      },
      {
        boiler_type: "regular" || "system",
        replacement_type: "system_swap",
        bathroom_count: "2-3",
        price: 1104.53,
        labour: 700,
      },
      {
        boiler_type: "regular" || "system",
        replacement_type: "system_swap",
        bathroom_count: "3+",
        price: 1225.65,
        labour: 700,
      },
      // Add more combinations as needed
    ],
  };

  // Loop through the combinations to find a match
  for (const combination of priceTable.combinations) {
    if (
      combination?.boiler_type === boilerType &&
      combination?.boiler_power === boilerPower &&
      combination?.replacement_type === replacementType &&
      (replacementType !== "straight_swap" ||
        combination?.bathroom_count === bathroomCount)
    ) {
      // If the combination matches, update the price and set the flag to true
      price += combination.price;
      labour += combination.labour;
      combinationFound = true;
      break; // Exit the loop since we found a match
    }
  }

  // If no combination is found, display an alert
  if (combinationFound == false) {
    alert(
      "Combination not found. Ps. try editing the kw to match the boiler type.",
    );
    return; // Exit the function
  }

  // Add the combination (DO NOT TOUCH THE LOOP)
  switch (boilerLocation) {
    case "same_location":
      labour += 0;
      break;
    case "diff_location_same_room":
      labour += 125;
      break;
    case "diff_location_same_floor":
      labour += 300;
      break;
    case "diff_location_diff":
      labour += 450;
      break;
  }

  switch (boilerLocation) {
    case "wall":
      price += 73.13;
      labour += 0;
      break;
    case "roofPitched":
      price += 436.5;
      labour += 75;
      break;
    case "roofFlat":
      price += 238.23;
      labour += 75;
      break;
  }

  // Calculate price with VAT
  let total = ((price + labour) * 1.2).toFixed(2);
  let vat = ((price + labour) * 0.2).toFixed(2);
  document.getElementById("priceOutput").textContent = " £" + total;
  document.getElementById("partsOutput").textContent = " Parts = £" + price;
  document.getElementById("labourOutput").textContent = "Labour = £" + labour;
  document.getElementById("vatOutput").textContent = "VAT = £" + vat;
}

function clearForm() {
  document.getElementById("priceForm").reset();
  document.getElementById("priceOutput").textContent = "";
  document.getElementById("partsOutput").textContent = "";
  document.getElementById("labourOutput").textContent = "";
  document.getElementById("vatOutput").textContent = "";
  // document.getElementById("bedroomsQuestion").style.display = "none";
  document.getElementById("bathroomsQuestion").style.display = "none";
  // document.getElementById("radiatorsQuestion").style.display = "none";
}
