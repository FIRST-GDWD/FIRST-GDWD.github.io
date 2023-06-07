const recipeNames = [
    "headings",
    "paragraphs",
    "bolds",
    "italics",
];

const HEADING_ID_POSTFIX = "Heading";
const IFRAME_ID_POSTFIX = "Iframe";
const PREVIEWING_CLASS = "previewing";
const PAGE_MODE_CARDS = "cards";
const PAGE_MODE_LIST = "list";
const PAGE_MODE_RECIPE = "recipe";
const RECIPE_CARDS_CLASS = "recipeCards";
const RECIPE_LIST_CLASS = "recipeList";
const SELECTED_CLASS = "selected";
const FADE_OUT_CLASS = "fadeOut";
const FADE_IN_CLASS = "fadeIn";

const cookbookPage = document.getElementById("cookbookPage");
const cookbookPageColumnOne = document.getElementById("cookbookPageColumnOne");
const bigRecipePreview = document.getElementById("bigRecipePreview");

const recipeDocs = {};

let pageMode = PAGE_MODE_CARDS;
let bigPreviewSrc = "";

// initial loading of recipe content
for (let recipeName of recipeNames) {

    let recipeHTMLPath = `htmlRecipes/${recipeName}.html`;
    let recipeHeadingId = `${recipeName}${HEADING_ID_POSTFIX}`;
    let recipeIframeId = `${recipeName}${IFRAME_ID_POSTFIX}`;

    cookbookPageColumnOne.innerHTML += `
        <div class="cookbookRecipe">
            <h2 class="recipeHeading">
                <a href="${recipeHTMLPath}" id="${recipeHeadingId}">Loading...</a>
                <span class="recipeDots"></span>
            </h2>
            <div class="recipePreview">
                <iframe src="${recipeHTMLPath}" id="${recipeIframeId}" scrolling="no"></iframe>
                <div class="recipeOverlay"></div>
            </div>
        </div>
    `;

}

// after loading, add event handlers

bigRecipePreview.onanimationend = function() {
    
    if (bigRecipePreview.classList.contains(FADE_IN_CLASS)) {
        bigRecipePreview.classList.remove(FADE_IN_CLASS);
    } else if (bigRecipePreview.classList.contains(FADE_OUT_CLASS)) {
        bigRecipePreview.classList.remove(FADE_OUT_CLASS);
        bigRecipePreview.classList.add(FADE_IN_CLASS);
        if (bigRecipePreview.src != bigPreviewSrc) {
            bigRecipePreview.src = bigPreviewSrc;
        }
    }
    
};

for (let recipeName of recipeNames) {
    let recipeHTMLPath = `htmlRecipes/${recipeName}.html`;
    let recipeHeadingId = `${recipeName}${HEADING_ID_POSTFIX}`;
    let recipeIframeId = `${recipeName}${IFRAME_ID_POSTFIX}`;

    document.getElementById(recipeIframeId).onload = function() {
        document.getElementById(recipeHeadingId).innerHTML = 
            this.contentDocument.getElementsByTagName("title")[0].innerHTML;
        this.onload = null;
    }

    document.getElementById(recipeHeadingId).onmouseover = function() {
        if (cookbookPage.classList.contains("recipeList")) {
            clearPreviewedRecipeHeadingLinks();
            this.classList.add(PREVIEWING_CLASS);
            if (bigPreviewSrc != recipeHTMLPath) {
                bigPreviewSrc = recipeHTMLPath;
                bigRecipePreview.classList.add("fadeOut");
            }
        }
    }
}

function clearPreviewedRecipeHeadingLinks() {
    const headingLinks = document.querySelectorAll("h2.recipeHeading a");
    for (let headingLink of headingLinks) {
        headingLink.classList.remove(PREVIEWING_CLASS);
    }
}

// button behavior

const cardsButton = document.getElementById("cardsButton");
const listButton = document.getElementById("listButton");
const backButton = document.getElementById("backButton");

cardsButton.onclick = function() {
    this.classList.add(SELECTED_CLASS);
    listButton.classList.remove(SELECTED_CLASS);
    cookbookPage.classList.add(FADE_OUT_CLASS);
}

listButton.onclick = function() {
    this.classList.add(SELECTED_CLASS);
    cardsButton.classList.remove(SELECTED_CLASS);
    
    cookbookPage.classList.add(FADE_OUT_CLASS);
}

cookbookPage.onanimationend = function() {
    if (cookbookPage.classList.contains(FADE_IN_CLASS)) {
        cookbookPage.classList.remove(FADE_IN_CLASS);
    } else if (cookbookPage.classList.contains(FADE_OUT_CLASS)) {
        cookbookPage.classList.remove(FADE_OUT_CLASS);
        cookbookPage.classList.add(FADE_IN_CLASS);

        if (cookbookPage.classList.contains(RECIPE_CARDS_CLASS)) {
            cookbookPage.classList.remove(RECIPE_CARDS_CLASS);
            cookbookPage.classList.add(RECIPE_LIST_CLASS);
        } else if (cookbookPage.classList.contains(RECIPE_LIST_CLASS)) {
            cookbookPage.classList.remove(RECIPE_LIST_CLASS);
            cookbookPage.classList.add(RECIPE_CARDS_CLASS);
        }
    }
}