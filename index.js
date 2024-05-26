document
  .getElementById("calculateButton")
  .addEventListener("click", calculatePrice);
document.getElementById("clearButton").addEventListener("click", clearForm);

document
  .getElementById("replacement_type")
  .addEventListener("change", function () {
    const replacementType = document.getElementById("replacement_type").value;
    if (replacementType === "system_swap") {
      document.getElementById("bathroomsQuestion").style.display = "block";
    } else {
      document.getElementById("bathroomsQuestion").style.display = "none";
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
    const bathrooms = document.getElementById("bathroom_count")?.value;
    if (!bathrooms) {
      alert("Please fill out all system swap specific questions.");
      return;
    }
  }

  let price = 0;
  let price_expensive = 0;
  let labour = 0;
  let combinationFound = false;
  let parts = "";
  let parts_expensive = "";

  const priceTable = {
    combinations: [
      {
        boiler_type: "combi",
        boiler_power: "24",
        replacement_type: "straight_swap",
        price: 1008.05,
        labour: 400,
        price_expensive: 1314.68,
        parts: "Ideal Combi Logic+ 24kw",
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "combi",
        boiler_power: "30",
        replacement_type: "straight_swap",
        price: 1104.53,
        labour: 400,
        price_expensive: 1409.04,
        parts: "Ideal Combi Logic+ 30kw",
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "combi",
        boiler_power: "35",
        replacement_type: "straight_swap",
        price: 1225.65,
        labour: 400,
        price_expensive: 0,
        parts: "Ideal Combi Logic+ 30kw",
        parts_expensive: "Not Available",
      },
      {
        boiler_type: "system",
        boiler_power: "15",
        replacement_type: "straight_swap",
        price: 1056.87,
        labour: 400,
        price_expensive: 1318.99,
        parts: "Ideal System Logic+ 15kw",
        parts_expensive: "Worcester Bosch System 15kw",
      },
      {
        boiler_type: "system",
        boiler_power: "18",
        replacement_type: "straight_swap",
        price: 1092.72,
        labour: 400,
        price_expensive: 1561.04,
        parts: "Ideal System Logic+ 18kw",
        parts_expensive: "Worcester Bosch System 18kw",
      },
      {
        boiler_type: "system",
        boiler_power: "24",
        replacement_type: "straight_swap",
        price: 1128.58,
        labour: 400,
        price_expensive: 1442.04,
        parts: "Ideal System Logic+ 24kw",
        parts_expensive: "Worcester Bosch System 24kw",
      },
      {
        boiler_type: "regular",
        boiler_power: "15",
        replacement_type: "straight_swap",
        price: 1005.89,
        labour: 400,
        price_expensive: 1240.9,
        parts: "Ideal Regular Logic+ 15kw",
        parts_expensive: "Worcester Bosch Regular 15kw",
      },
      {
        boiler_type: "regular",
        boiler_power: "18",
        replacement_type: "straight_swap",
        price: 1041.77,
        labour: 400,
        price_expensive: 1304.6,
        parts: "Ideal Regular Logic+ 18kw",
        parts_expensive: "Worcester Bosch Regular 18kw",
      },
      {
        boiler_type: "regular",
        boiler_power: "24",
        replacement_type: "straight_swap",
        price: 1077.62,
        labour: 400,
        price_expensive: 1368.3,
        parts: "Ideal Regular Logic+ 24kw",
        parts_expensive: "Worcester Bosch Regular 25kw",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "24",
        bathroom_count: "1",
        price: 1008.05,
        labour: 700,
        parts: "Ideal Combi Logic+ 24kw",
        price_expensive: 1314.68,
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "18",
        bathroom_count: "1",
        price: 1008.05,
        labour: 700,
        parts: "Ideal Combi Logic+ 24kw",
        price_expensive: 1314.68,
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "15",
        bathroom_count: "1",
        price: 1008.05,
        labour: 700,
        parts: "Ideal Combi Logic+ 24kw",
        price_expensive: 1314.68,
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "24",
        bathroom_count: "1",
        price: 1008.05,
        labour: 700,
        parts: "Ideal Combi Logic+ 24kw",
        price_expensive: 1314.68,
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "18",
        bathroom_count: "1",
        price: 1008.05,
        labour: 700,
        parts: "Ideal Combi Logic+ 24kw",
        price_expensive: 1314.68,
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "15",
        bathroom_count: "1",
        price: 1008.05,
        labour: 700,
        parts: "Ideal Combi Logic+ 24kw",
        price_expensive: 1314.68,
        parts_expensive: "Worcester Bosch Combi 25kw",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "24",
        bathroom_count: "2-3",
        price: 1104.53,
        labour: 700,
        parts: "Ideal Logic+ 30kw",
        price_expensive: 1409.04,
        parts_expensive: "Worcester Bosch Combi 30kw",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "18",
        bathroom_count: "2-3",
        price: 1104.53,
        labour: 700,
        parts: "Ideal Logic+ 30kw",
        price_expensive: 1409.04,
        parts_expensive: "Worcester Bosch Combi 30kw",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "15",
        bathroom_count: "2-3",
        price: 1104.53,
        labour: 700,
        parts: "Ideal Logic+ 30kw",
        price_expensive: 1409.04,
        parts_expensive: "Worcester Bosch Combi 30kw",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "24",
        bathroom_count: "2-3",
        price: 1104.53,
        labour: 700,
        parts: "Ideal Logic+ 30kw",
        price_expensive: 1409.04,
        parts_expensive: "Worcester Bosch Combi 30kw",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "18",
        bathroom_count: "2-3",
        price: 1104.53,
        labour: 700,
        parts: "Ideal Logic+ 30kw",
        price_expensive: 1409.04,
        parts_expensive: "Worcester Bosch Combi 30kw",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "15",
        bathroom_count: "2-3",
        price: 1104.53,
        labour: 700,
        parts: "Ideal Logic+ 30kw",
        price_expensive: 1409.04,
        parts_expensive: "Worcester Bosch Combi 30kw",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "24",
        bathroom_count: "3+",
        price: 1225.65,
        labour: 700,
        parts: "Ideal Logic+ 35kw",
        price_expensive: 0,
        parts_expensive: "Not available",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "18",
        bathroom_count: "3+",
        price: 1225.65,
        labour: 700,
        parts: "Ideal Logic+ 35kw",
        price_expensive: 0,
        parts_expensive: "Not available",
      },
      {
        boiler_type: "regular",
        replacement_type: "system_swap",
        boiler_power: "15",
        bathroom_count: "3+",
        price: 1225.65,
        labour: 700,
        parts: "Ideal Logic+ 35kw",
        price_expensive: 0,
        parts_expensive: "Not available",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "24",
        bathroom_count: "3+",
        price: 1225.65,
        labour: 700,
        parts: "Ideal Logic+ 35kw",
        price_expensive: 0,
        parts_expensive: "Not available",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "18",
        bathroom_count: "3+",
        price: 1225.65,
        labour: 700,
        parts: "Ideal Logic+ 35kw",
        price_expensive: 0,
        parts_expensive: "Not available",
      },
      {
        boiler_type: "system",
        replacement_type: "system_swap",
        boiler_power: "15",
        bathroom_count: "3+",
        price: 1225.65,
        labour: 700,
        parts: "Ideal Logic+ 35kw",
        price_expensive: 0,
        parts_expensive: "Not available",
      },
    ],
  };

  for (const combination of priceTable.combinations) {
    if (
      combination.boiler_type === boilerType &&
      combination.boiler_power === boilerPower &&
      combination.replacement_type === replacementType &&
      (replacementType === "straight_swap" ||
        combination.bathroom_count === bathroomCount)
    ) {
      price += combination.price;
      labour += combination.labour;
      price_expensive += combination.price_expensive;
      parts = combination.parts || "";
      parts_expensive = combination.parts_expensive || "";
      combinationFound = true;
      break;
    }
  }

  if (!combinationFound) {
    alert(
      "Combination not found. Ps. try editing the kw to match the boiler type.",
    );
    return;
  }

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

  switch (flue) {
    case "wall":
      price += 73.13;
      price_expensive += 73.13;
      labour += 0;
      break;
    case "roofPitched":
      price += 436.5;
      price_expensive += 436.5;
      labour += 75;
      break;
    case "roofFlat":
      price += 238.23;
      price_expensive += 238.23;
      labour += 75;
      break;
  }

  let parts_labour = price + labour;
  let parts_labour_expensive = price_expensive + labour;
  let hometree_commission = parts_labour * 0.1;
  let hometree_commission_expensive = parts_labour_expensive * 0.1;

  //   let total = ((price + labour) * 1.2).toFixed(2);
  let vat = (parts_labour + hometree_commission) * 0.2;
  let vat_expensive =
    (parts_labour_expensive + hometree_commission_expensive) * 0.2;
  let total = parts_labour + hometree_commission + vat;
  let total_expensive =
    parts_labour_expensive + hometree_commission_expensive + vat_expensive;

  document.getElementById("priceOutput").textContent = " £" + total.toFixed(2);
  document.getElementById("partsOutput").textContent =
    " Parts = £" + price.toFixed(2);
  document.getElementById("labourOutput").textContent =
    "Labour = £" + labour.toFixed(2);
  document.getElementById("vatOutput").textContent = "VAT = £" + vat.toFixed(2);
  document.getElementById("actualParts").textContent = parts;
  document.getElementById("hometreeCommission").textContent =
    "Commission = £" + hometree_commission.toFixed(2);

  // Expensive
  document.getElementById("priceOutputExpensive").textContent =
    " £" + total_expensive.toFixed(2);
  document.getElementById("partsOutputExpensive").textContent =
    " Parts = £" + price_expensive;
  document.getElementById("labourOutputExpensive").textContent =
    "Labour = £" + labour.toFixed(2);
  document.getElementById("vatOutputExpensive").textContent =
    "VAT = £" + vat_expensive.toFixed(2);
  document.getElementById("actualPartsExpensive").textContent = parts_expensive;
  document.getElementById("hometreeCommissionExpensive").textContent =
    "Commission = £" + hometree_commission_expensive.toFixed(2);
}

function clearForm() {
  document.getElementById("priceForm").reset();
  document.getElementById("priceOutput").textContent = "";
  document.getElementById("partsOutput").textContent = "";
  document.getElementById("labourOutput").textContent = "";
  document.getElementById("vatOutput").textContent = "";
  document.getElementById("bathroomsQuestion").style.display = "none";
}
