import { recipes } from './recipes.mjs';

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const randomIndex = getRandomNumber(list.length);
    return list[randomIndex];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<span class="recipe-tags-item">${tag}</span>`).join(', ');
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    const maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
        if (i < rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `
        <section class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <div class="recipe-info">
                <h2 class="recipe-title">${recipe.name}</h2>
                <div class="recipe-meta">
                    <span class="recipe-tags">${tagsTemplate(recipe.tags)}</span>
                    ${ratingTemplate(recipe.rating)}
                </div>
                <p class="recipe-description">${recipe.description}</p>
            </div>
        </section>
    `;
}

function renderRecipes(recipeList) {
    const recipeGrid = document.querySelector('.recipe-grid');
    recipeGrid.innerHTML = '';
    const htmlStrings = recipeList.map(recipe => recipeTemplate(recipe));
    recipeGrid.innerHTML = htmlStrings.join('');
}

function filterRecipes(query) {
    const lowerCaseQuery = query.toLowerCase();
    
    const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(lowerCaseQuery) ||
        recipe.description.toLowerCase().includes(lowerCaseQuery) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
        recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery))
    );

    const sorted = filtered.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    return sorted;
}

function searchHandler(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim();
    const filteredRecipes = filterRecipes(searchTerm);
    renderRecipes(filteredRecipes);
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', searchHandler);
}

document.addEventListener('DOMContentLoaded', init);