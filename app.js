const recipes = [
    { id: 1, title: "🍝 Classic Spaghetti Carbonara", time: 25, difficulty: "easy", description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.", category: "pasta" },
    { id: 2, title: "🍛 Chicken Tikka Masala", time: 45, difficulty: "medium", description: "Tender chicken pieces in a creamy, spiced tomato sauce.", category: "curry" },
    { id: 3, title: "🥐 Homemade Croissants", time: 180, difficulty: "hard", description: "Buttery, flaky French pastries that require patience but deliver amazing results.", category: "baking" },
    { id: 4, title: "🥗 Greek Salad", time: 15, difficulty: "easy", description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.", category: "salad" },
    { id: 5, title: "🍗 Beef Wellington", time: 120, difficulty: "hard", description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.", category: "meat" },
    { id: 6, title: "🥕 Vegetable Stir Fry", time: 20, difficulty: "easy", description: "Colorful mixed vegetables cooked quickly in a savory sauce.", category: "vegetarian" },
    { id: 7, title: "🍜 Pad Thai", time: 30, difficulty: "medium", description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.", category: "noodles" },
    { id: 8, title: "🍕 Margherita Pizza", time: 60, difficulty: "medium", description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.", category: "pizza" }
];

// DOM Selection
const recipeContainer = document.querySelector('#recipe-container');

// Function to create HTML for a single recipe card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty.trim()}">${recipe.difficulty.trim()}</span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Render recipes
const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join('');
};

// Initialize with all recipes
renderRecipes(recipes);

// --- New Features ---
// Keep track of current recipes
let currentRecipes = [...recipes];

// Filtering logic
const filterRecipes = (filter) => {
    switch(filter) {
        case "easy":
        case "medium":
        case "hard":
            currentRecipes = recipes.filter(r => r.difficulty.trim() === filter);
            break;
        case "quick":
            currentRecipes = recipes.filter(r => r.time < 30);
            break;
        default: // "all"
            currentRecipes = [...recipes];
    }
    renderRecipes(currentRecipes);
};

// Sorting logic
const sortRecipes = (sortType) => {
    if (sortType === "name") {
        currentRecipes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "time") {
        currentRecipes.sort((a, b) => a.time - b.time);
    }
    renderRecipes(currentRecipes);
};

// Active state handler
const setActiveButton = (group, button) => {
    document.querySelectorAll(`#controls .${group} button`)
        .forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
};

// Event listeners for filters
document.querySelectorAll("#controls .filters button").forEach(button => {
    button.addEventListener("click", () => {
        filterRecipes(button.dataset.filter);
        setActiveButton("filters", button);
    });
});

// Event listeners for sorts
document.querySelectorAll("#controls .sorts button").forEach(button => {
    button.addEventListener("click", () => {
        sortRecipes(button.dataset.sort);
        setActiveButton("sorts", button);
    });
});