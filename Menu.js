//Initialize menu data structure
let weeklyMenu = {
    Monday: {
        breakfast: [], 
        lunch: [], 
        snack: [], 
        drinks: []
    },
    Tuesday: {
        breakfast: [],
        lunch: [],
        snack: [],
        drinks: [],
    },
    Wednesday: {
        breakfast: [],
        lunch: [],
        snack: [],
        drinks: [],
    },
    Thursday: {
        breakfast: [],
        lunch: [],
        snack: [],
        drinks: [],
    },
    Friday: {
        breakfast: [],
        lunch: [],
        snack: [],
        drinks: []
    }
};

//Function to render menu table
function renderMenuTable() {
    const tableBody = document.getElementById('menu-table-body');
    tableBody.innerHTML = '';

    const categories = ['breakfast', 'lunch', 'snack'];
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
            cell.innerHTML = weeklyMenu[day][category].map((item, index) => `${item} <button onclick="removeItem('${day}', '${category}', ${index})" style="margin-left: 5px; font-size: 10px;">x</button>`).join('<br>');
            row.appendChild(cell);
        });

        tableBody.appendChild(row); 
       
    });
}

//Function to add a food item **EDIT**
function addFoodItem(){
    const day = document.getElementById('day-select').value;
    const category = docment.getElementById('category-select').value;
    const foodItem = document.getElementById('food-input').value.trim();

    //Alert message, not necessary.
    if (foodItem === '') {
        alert('Please enter a food or drink item.');
        return;
    }
    //For drinks, suggest milk or water if not already specified
    if (category === 'drinks' && !['milk', 'water'].includes(foodItem.toLowerCase())) {
        const confirmation = confirm(`You entered "${foodItem}" for drinks. The typical drinks are milk or water.`);
        if (!confirmation) {
            return;
        } 
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
function clearDay() {
    if (confirm(`Are you sure you want to clear all items for ${day}?`)) {
        weeklyMenu[day] = {breakfast: [], lunch: [], snack: [], drinks: []};
        renderMenuTable();
    }
}

//Function to clear all items
function clearAllItems(){
    if (confirm('Are you sure you want to clear the entire menu?')){
        Object.keys(weeklyMenu).forEach(day => {
            weeklyMenu[day] = {breakfast: [], lunch: [], snack: [], drinks: []};
        });
        renderMenuTable();
    }
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

//Function to load menu **EDIT TO PRINT FUNCTION**
function loadMenu() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const loadedMenu = JSON.parse(e.target.result);
                    weeklyMenu = loadedMenu;
                    renderMenuTable();
                    alert('Menu loaded successfully!');
                } catch (error) {
                    alert('Error loading menu file. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

//Add event listener for Enter key in the food input
document.getElementById('food-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addFoodItem();
    }
});

//Initial render
renderMenuTable();



