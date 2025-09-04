//Initialize menu data structure
const defaultDay = () => ({
    breakfast: [],
    lunch: [],
    snack: [],
    drinks: ["Water/Milk"]
});

const weeklyMenu = {
    Monday: defaultDay(),
    Tuesday: defaultDay(),
    Wednesday: defaultDay(),
    Thursday: defaultDay(),
    Friday: defaultDay(),
};

//Function to render menu table
function renderMenuTable() {
    const tableBody = document.getElementById('menu-table-body');
    tableBody.innerHTML = '';

    const categories = ['breakfast', 'lunch', 'snack', 'drinks'];
    const days = Object.keys(weeklyMenu);

    categories.forEach(category => {
        const row = document.createElement('tr');

        //Category cell (left column)
        const categoryCell = document.createElement('td');
        categoryCell.innerHTML = `<strong>${category.charAt(0).toUpperCase() + category.slice(1)}</strong>`;
        row.appendChild(categoryCell);

        //One cell for each day
        days.forEach(day => {
            const cell = document.createElement('td');
            cell.innerHTML = weeklyMenu[day][category].map((item, index) => `${item} <button onclick="removeItem('${day}', '${category}', ${index})" class="no-print" style="margin-left: 5px; font-size: 10px;">X</button>`).join('<br>');
            row.appendChild(cell);
        });

        tableBody.appendChild(row); 
       
    });
}

//Function to add a food item **EDIT**
function addFoodItem(){
    const day = document.getElementById('day-select').value;
    const category = document.getElementById('category-select').value;
    const foodItem = document.getElementById('food-input').value.trim();

    //Alert message, not necessary.
    if (foodItem === '') {
        alert('Please enter a food or drink item.');
        return;
    }
    
    weeklyMenu[day][category].push(foodItem);
    document.getElementById('food-input').value = '';
    renderMenuTable();
}

//Function to remove a specific item
function removeItem(day, category, index) {
    weeklyMenu[day][category].splice(index, 1);
    renderMenuTable();
}

//Function to clear all items for a specific day
function clearDay(day) {
    if (confirm(`Clear all items for ${day}?`)) {
        weeklyMenu[day] = defaultDay(); //resets with water & milk
        renderMenuTable();
    }
}

//Function to clear all items
function clearAllItems(){
    if (!confirm('Clear the entire menu?')) return; 
    DAYS.forEach(day => {
        weeklyMenu[day] = defaultDay(); //resets with water & milk
    });
    renderMenuTable();
}

//Function to save menu (as text for now)
function saveMenu() {
    const menuJson = JSON.stringify(weeklyMenu, null, 2);
    const blob = new Blob([menuJson], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekly_menu.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


//Function to print menu 
function printMenu() {
  window.print();
}

//Add event listener for Enter key in the food input
document.getElementById('food-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addFoodItem();
    }
});

//Initial render
renderMenuTable();



