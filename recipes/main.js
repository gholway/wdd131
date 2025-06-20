import { recipes } from './recipes.mjs';

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('section');
    recipeCard.classList.add('recipe-card');

    let starsHtml = '';
    const maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
        if (i < recipe.rating) {
            starsHtml += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else {
            starsHtml += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
        }
    }

    recipeCard.innerHTML = `
        <img src="images/${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-info">
            <h2 class="recipe-title">${recipe.name}</h2>
            <div class="recipe-meta">
                <span class="recipe-tags">${recipe.tags.join(', ')}</span>
                <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of ${maxStars} stars">
                    ${starsHtml}
                </span>
            </div>
            <p class="recipe-description">${recipe.description}</p>
        </div>
    `;
    return recipeCard;
}

function renderRecipes(recipesToRender) {
    const recipeGrid = document.querySelector('.recipe-grid');
    recipeGrid.innerHTML = '';
    recipesToRender.forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipeGrid.appendChild(card);
    });
}

function filterRecipes(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search-input');

    renderRecipes(recipes);

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        const filtered = filterRecipes(searchTerm);
        renderRecipes(filtered);
    });
});
