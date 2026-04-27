/*
EDITS TO MAKE:
[x] Remove logo and move title to be in the center. 
[x] Look into a way for the items to be editable. 
[x] Change format so there's entry boxes within the table, making it more similar to the current template.
[x] Find a way to make the boxes editable or open ended boxes for entry within the table. 
[] When editing the table, format the editble blocks so that when you hit print, the blocks don't take too much space. 
 
*/

// Default structure for each day
const defaultDay = () => ({
  breakfast: [],
  lunch: [],
  snack: [],
  drinks: ["Water/Milk"], // always present
});

const weeklyMenu = {
  Monday: defaultDay(),
  Tuesday: defaultDay(),
  Wednesday: defaultDay(),
  Thursday: defaultDay(),
  Friday: defaultDay(),
};

const DAYS = Object.keys(weeklyMenu);
const CATEGORIES = ["breakfast", "lunch", "snack", "drinks"];

// Render table
function renderMenuTable() {
  const tableBody = document.getElementById("menu-table-body");
  tableBody.innerHTML = "";

  CATEGORIES.forEach((category) => {
    const row = document.createElement("tr");

    const catCell = document.createElement("td");
    catCell.innerHTML = `<strong>${
      category.charAt(0).toUpperCase() + category.slice(1)
    }</strong>`;
    row.appendChild(catCell);

    DAYS.forEach((day) => {
      const cell = document.createElement("td");
      const items = weeklyMenu[day][category];

      cell.innerHTML = items
        .map(
          (item, index) =>
            `<span ondblclick="editItem('${day}','${category}',${index},this)">${item}</span>
           <button onclick="removeItem('${day}','${category}',${index})" class="no-print" style="margin-left:5px; font-size:10px;">x</button>`
        )
        .join("<br>");

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

// Add food item
function addFoodItem() {
  const day = document.getElementById("day-select").value;
  const category = document.getElementById("category-select").value;
  const foodItem = document.getElementById("food-input").value.trim();

  if (!foodItem) {
    alert("Please enter a food item.");
    return;
  }
  weeklyMenu[day][category].push(foodItem);
  document.getElementById("food-input").value = "";
  renderMenuTable();
}

// Edit item
function editItem(day, category, index, element) {
  const oldValue = weeklyMenu[day][category][index];
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldValue;
  input.style.width = "80%";

  element.replaceWith(input);
  input.focus();

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveEdit(day, category, index, input);
  });
  input.addEventListener("blur", () => {
    saveEdit(day, category, index, input);
  });
}

function saveEdit(day, category, index, input) {
  const newValue = input.value.trim();
  if (newValue) {
    weeklyMenu[day][category][index] = newValue;
  }
  renderMenuTable();
}

// Remove item
function removeItem(day, category, index) {
  weeklyMenu[day][category].splice(index, 1);
  renderMenuTable();
}

// Clear all items (reset to defaultDay)
function clearAllItems() {
  if (!confirm("Clear the entire menu?")) return;
  DAYS.forEach((day) => {
    weeklyMenu[day] = defaultDay();
  });
  renderMenuTable();
}

// Print
function printMenu() {
  window.print();
}

// Init
document.getElementById("food-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addFoodItem();
});
renderMenuTable();
