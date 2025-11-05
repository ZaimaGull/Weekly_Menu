// Default structure for each day
const defaultDay = () => ({
    breakfast: [],
    lunch: [],
    snack: [],
    drinks: ["Water / Milk"]
  });
  
  const weeklyMenu = {
    Monday: defaultDay(),
    Tuesday: defaultDay(),
    Wednesday: defaultDay(),
    Thursday: defaultDay(),
    Friday: defaultDay()
  };
  
  const DAYS = Object.keys(weeklyMenu);
  const CATEGORIES = ["breakfast", "lunch", "snack", "drinks"];
  
  // Render the table
  function renderMenuTable() {
    const tableBody = document.getElementById("menu-table-body");
    tableBody.innerHTML = "";
  
    CATEGORIES.forEach(category => {
      const row = document.createElement("tr");
  
      // category label
      const catCell = document.createElement("td");
      catCell.innerHTML = `<strong>${category.charAt(0).toUpperCase() + category.slice(1)}</strong>`;
      row.appendChild(catCell);
  
      // day cells
      DAYS.forEach(day => {
        const cell = document.createElement("td");
        cell.style.cursor = "pointer";
  
        const items = weeklyMenu[day][category];
        if (items.length > 0) {
          cell.innerHTML = items.map(item => `<div>${item}</div>`).join("");
        } else {
          cell.innerHTML = `<div style="color:#aaa;">(double-click to add or edit)</div>`;
        }
  
        // double-click to edit/add
        cell.ondblclick = () => editCell(day, category, cell);
  
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  }
  
  // Turn a cell into an editable input
  function editCell(day, category, cell) {
    const oldValue = weeklyMenu[day][category].join("\n");
  
    const textarea = document.createElement("textarea");
    textarea.value = oldValue;
    textarea.style.width = "95%";
    textarea.style.height = "80px";
    textarea.style.fontFamily = "inherit";
    textarea.style.fontSize = "14px";
  
    cell.innerHTML = "";
    cell.appendChild(textarea);
    textarea.focus();
  
    // save on blur or Enter
    textarea.addEventListener("blur", () => saveCell(day, category, textarea));
    textarea.addEventListener("keypress", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveCell(day, category, textarea);
      }
    });
  }
  
  function saveCell(day, category, textarea) {
    const newValue = textarea.value
      .split("\n")
      .map(v => v.trim())
      .filter(v => v !== "");
    weeklyMenu[day][category] = newValue;
    renderMenuTable();
  }
  
  // Clear all (reset but keep default drinks)
  function clearAllItems() {
    if (!confirm("Clear the entire menu?")) return;
    DAYS.forEach(day => { weeklyMenu[day] = defaultDay(); });
    renderMenuTable();
  }
  
  // Print
  function printMenu() { window.print(); }
  
  // Placeholder for week update
  function updateWeek() {}
  
  // Initial render
  renderMenuTable();
  