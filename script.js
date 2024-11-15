 // Hämta referenser till DOM-element
const taskInput = document.getElementById('taskInput'); // Inmatningsfält för nya uppgifter
const addButton = document.getElementById('addButton'); // Knapp för att lägga till en ny uppgift
const taskList = document.getElementById('taskList'); // Lista där uppgifter kommer att visas
const searchInput = document.getElementById('searchInput'); // Inmatningsfält för att söka uppgifter

// JavaScript för hamburgermenyn
const mobileMenu = document.getElementById('mobile-menu'); // Knapp för hamburgermenyn
const navList = document.getElementById('nav-list'); // Navigationslista

// Eventlyssnare för att växla hamburgermenyn
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active'); // Växla 'active'-klassen för att visa/dölja menyn
});

// Ladda uppgifter från localStorage eller initiera en tom array om inga finns
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Funktion för att rendera uppgifter i uppgiftslistan
function renderTasks(filter = '') {
    taskList.innerHTML = ''; // Rensa den aktuella uppgiftslistan
    tasks
        .filter(task => task.toLowerCase().includes(filter.toLowerCase())) // Filtrera uppgifter baserat på sökningen
        .forEach((task, index) => {
            const li = document.createElement('li'); // Skapa ett nytt listobjekt för varje uppgift
            li.classList.add('task-item'); // Lägg till en klass för styling
            li.textContent = task; // Sätt textinnehållet till uppgiften

            const deleteButton = document.createElement('button'); // Skapa en ta bort-knapp
            deleteButton.textContent = 'Ta bort'; // Sätt knappens text till 'Ta bort'
            // Eventlyssnare för ta bort-knappen
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1); // Ta bort uppgiften från arrayen
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Uppdatera localStorage
                renderTasks(searchInput.value); // Rendera om uppgiftslistan med aktuell sökning
            });

            li.appendChild(deleteButton); // Lägg till ta bort-knappen i listobjektet
            taskList.appendChild(li); // Lägg till listobjektet i uppgiftslistan
        });
}

// Eventlyssnare för att lägga till en ny uppgift
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim(); // Hämta det trimmade värdet från inmatningen
    if (taskText) { // Kontrollera om inmatningen inte är tom
        tasks.push(taskText); // Lägg till den nya uppgiften i tasks-arrayen
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Uppdatera localStorage
        taskInput.value = ''; // Rensa inmatningsfältet
        renderTasks(searchInput.value); // Rendera om uppgiftslistan med aktuell sökning
    }
});

// Eventlyssnare för sökfältet
searchInput.addEventListener('input', () => {
    renderTasks(searchInput.value); // Rendera om uppgiftslistan baserat på sökningen
});

// Initial render av uppgifter när sidan laddas
renderTasks();
