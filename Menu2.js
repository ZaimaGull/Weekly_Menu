const defaultDay = () => ({
  breakfast: [],
  lunch: [],
  snack: [],
  drinks: ["Water / Milk"],
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

function renderMenuTable() {
  const tbody = document.getElementById("menu-table-body");
  tbody.innerHTML = "";

  CATEGORIES.forEach((category) => {
    const row = document.createElement("tr");

    const catCell = document.createElement("td");
    catCell.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    row.appendChild(catCell);

    DAYS.forEach((day) => {
      const cell = document.createElement("td");
      cell.style.cursor = "pointer";

      const content = document.createElement("div");
      content.className = "cell-content";

      const items = weeklyMenu[day][category];

      if (items.length) {
        items.forEach((item) => {
          const div = document.createElement("div");
          div.textContent = item;
          content.appendChild(div);
        });
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "placeholder";
        placeholder.textContent = "(double-click to add or edit)";
        content.appendChild(placeholder);
      }

      cell.appendChild(content);
      cell.ondblclick = () => editCell(day, category, cell);
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}

function editCell(day, category, cell) {
  const textarea = document.createElement("textarea");
  textarea.className = "cell-editor";
  textarea.value = weeklyMenu[day][category].join("\n");

  cell.innerHTML = "";
  cell.appendChild(textarea);
  textarea.focus();

  textarea.addEventListener("blur", () => saveCell(day, category, textarea));

  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveCell(day, category, textarea);
    }
  });
}

function saveCell(day, category, textarea) {
  weeklyMenu[day][category] = textarea.value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);

  renderMenuTable();
}

function clearAllItems() {
  if (!confirm("Clear the entire menu?")) return;
  DAYS.forEach((day) => (weeklyMenu[day] = defaultDay()));
  renderMenuTable();
}

function printMenu() {
  window.print();
}

renderMenuTable();
