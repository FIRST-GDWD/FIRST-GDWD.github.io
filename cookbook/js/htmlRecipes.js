const recipeNames = [
    "headings",
    "paragraphs",
    "bolds",
    "italics",
    "linebreaks",
    "horizontalRules",
    "orderedLists",
    "unorderedLists",
    "images",
    "anchors",
];

const ROOT_RECIPE_FOLDER = "htmlRecipes";
const HEADING_ID_POSTFIX = "Heading";
const IFRAME_ID_POSTFIX = "Iframe";
const LINK_CLASS = "recipeLink"
const PREVIEWING_CLASS = "previewing";
const PAGE_MODE_KEY = "mode";
const PAGE_MODE_NONE = "none";
const PAGE_MODE_CARDS = "cards";
const PAGE_MODE_LIST = "list";
const PAGE_MODE_RECIPE = "recipe";
const RECIPE_NONE_CLASS = "recipeNone";
const RECIPE_CARDS_CLASS = "recipeCards";
const RECIPE_LIST_CLASS = "recipeList";
const RECIPE_DETAILS_CLASS = "recipeDetails";
const SELECTED_CLASS = "selected";
const FADE_OUT_CLASS = "fadeOut";
const FADE_IN_CLASS = "fadeIn";
const HIDE_CLASS = "hide";

const cookbookPage = document.getElementById("cookbookPage");
const cookbookPageColumnOne = document.getElementById("cookbookPageColumnOne");
const cssPreview = document.getElementById("cssPreview");
const bigRecipePreview = document.getElementById("bigRecipePreview");

const cardsButton = document.getElementById("cardsButton");
const listButton = document.getElementById("listButton");
const backButton = document.getElementById("backButton");

const recipeDocs = {};
const recipeHTML = {};
const recipeCSS = {};

let pageRecipe = "";
let bigPreviewSrc = "";

let defaultPageMode = PAGE_MODE_CARDS;
if (localStorage.getItem(PAGE_MODE_KEY) !== null) {
    defaultPageMode = localStorage.getItem(PAGE_MODE_KEY);
}

let pageMode = defaultPageMode;
let pageView = defaultPageMode;

setTimeout(showModeButtons, 300);
setTimeout(displayCookbook, 600);

function applyRootFolderToPath(path) {
    return `${ROOT_RECIPE_FOLDER}/${path}`;
}

function getRecipeHTMLPath(recipeName) {
    return applyRootFolderToPath(recipeName + ".html");
}

// initial loading of recipe content
for (let recipeName of recipeNames) {

    let recipeHTMLPath = getRecipeHTMLPath(recipeName);
    let recipeHeadingId = `${recipeName}${HEADING_ID_POSTFIX}`;
    let recipeIframeId = `${recipeName}${IFRAME_ID_POSTFIX}`;

    cookbookPageColumnOne.innerHTML += `
        <div class="cookbookRecipe">
            <h2 class="recipeHeading">
                <a href="#${recipeName}" id="${recipeHeadingId}" class="${LINK_CLASS}" data-recipe="${recipeName}">
                    Loading...
                </a>
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

bigRecipePreview.onload = function () {
    this.contentDocument.body.style.marginRight = "32px";
}

for (let recipeName of recipeNames) {
    let recipeHTMLPath = `htmlRecipes/${recipeName}.html`;
    let recipeHeadingId = `${recipeName}${HEADING_ID_POSTFIX}`;
    let recipeIframeId = `${recipeName}${IFRAME_ID_POSTFIX}`;

    document.getElementById(recipeIframeId).onload = function() {
        document.getElementById(recipeHeadingId).innerHTML = 
            this.contentDocument.getElementsByTagName("title")[0].innerHTML;
        recipeDocs[recipeName] = this.contentDocument;
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

function fadeOutModeButtons() {
    cardsButton.classList.add(FADE_OUT_CLASS);
    listButton.classList.add(FADE_OUT_CLASS);
}
function fadeInModeButtons() {

}

function storePageMode(mode) {
    localStorage.setItem(PAGE_MODE_KEY, mode);
}

function setPageView(mode, recipe="") {
    switch(mode) {
        case PAGE_MODE_CARDS:
            pageMode = mode;
            storePageMode(mode);
            cardsButton.classList.add(SELECTED_CLASS);
            listButton.classList.remove(SELECTED_CLASS);
            cookbookPage.classList.add(FADE_OUT_CLASS);
            if (pageView == PAGE_MODE_RECIPE) {
                backButton.classList.add(FADE_OUT_CLASS);
            }
            break;
        case PAGE_MODE_LIST:
            pageMode = mode;
            storePageMode(mode);
            listButton.classList.add(SELECTED_CLASS);
            cardsButton.classList.remove(SELECTED_CLASS);
            cookbookPage.classList.add(FADE_OUT_CLASS);
            if (pageView == PAGE_MODE_RECIPE) {
                backButton.classList.add(FADE_OUT_CLASS);
            }
            break;
        case PAGE_MODE_RECIPE:
            cardsButton.classList.add(FADE_OUT_CLASS);
            listButton.classList.add(FADE_OUT_CLASS);
            cookbookPage.classList.add(FADE_OUT_CLASS);
            fetchHTMLRecipeCodeAndPrint(recipe);
            break;
    }

    pageView = mode;
    pageRecipe = recipe;
}

function hideCSSPreview() {
    document.getElementById("recipeDetailsHeadingCSS").classList.add("hide");
    document.getElementById("cssPreview").classList.add("hide");
}

function showCSSPreview() {
    document.getElementById("recipeDetailsHeadingCSS").classList.remove("hide");
    document.getElementById("cssPreview").classList.remove("hide");
}

function fetchHTMLRecipeCodeAndPrint(recipe) {
    document.getElementById("htmlPreview").innerHTML = "Loading HTML...";
    const recipePath = getRecipeHTMLPath(recipe);
    bigPreviewSrc = recipePath;
    bigRecipePreview.src = bigPreviewSrc;
    fetch(recipePath)
        .then(response => response.text())
        .then(html => {
            if (!(recipe in recipeHTML)) {
                recipeHTML[recipe] = html;
            }
            document.getElementById("htmlPreview").innerHTML = 
                convertStringToEscapedHTML(recipeHTML[recipe]);
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const cssLink = doc.querySelector("head link[rel=stylesheet]");
            if (cssLink) {
                showCSSPreview();
                fetchCSSRecipeCodeAndPrint(recipe, cssLink.href);
            } else {
                hideCSSPreview();
            }
        })
        .catch(error => {
            console.log("Error in fetching recipe: ", error);
        });
}

function fetchCSSRecipeCodeAndPrint(recipe, cssFilePath) {
    const cleanedCssFilePath = cssFilePath.substring(cssFilePath.indexOf('css/'));
    const actualCssFilePath = applyRootFolderToPath(cleanedCssFilePath);
    document.getElementById("cssPreview").innerHTML = "Loading CSS...";
    fetch(actualCssFilePath)
        .then(response => response.text())
        .then(css => {
            if (!(recipe in recipeCSS)) {
                recipeCSS[recipe] = css;
            }
            document.getElementById("cssPreview").innerHTML = 
                convertStringToEscapedHTML(recipeCSS[recipe]);
            
        })
        .catch(error => {
            console.log("Error in fetching recipe: ", error);
        });
}

function convertStringToEscapedHTML(stringWithNormalSpaces) {
    return stringWithNormalSpaces
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/\n/g, "<br>");
}

cardsButton.onclick = function() {
    setPageView(PAGE_MODE_CARDS);
}

listButton.onclick = function() {
    setPageView(PAGE_MODE_LIST);
}

backButton.onclick = function() {
    setPageView(pageMode, "");
}

const recipeLinks = document.getElementsByClassName(LINK_CLASS);
for (let recipeLink of recipeLinks) {
    recipeLink.onclick = onRecipeLinkClick;
}

function onRecipeLinkClick() {
    let recipe = this.dataset.recipe;
    setPageView(PAGE_MODE_RECIPE, recipe);
    cardsButton.classList.add(FADE_OUT_CLASS);
    listButton.classList.add(FADE_OUT_CLASS);
}

cardsButton.onanimationend = onModeButtonAnimationEnd;
listButton.onanimationend = onModeButtonAnimationEnd;
function onModeButtonAnimationEnd() {
    if (this.classList.contains(FADE_OUT_CLASS)) {
        this.classList.remove(FADE_OUT_CLASS);
        this.classList.add(HIDE_CLASS);
        backButton.classList.remove(HIDE_CLASS);
        backButton.classList.add(FADE_IN_CLASS);
    } else if (this.classList.contains(FADE_IN_CLASS)) {
        this.classList.remove(FADE_IN_CLASS);
    }
}

function showModeButtons() {
    switch(pageMode) {
        case PAGE_MODE_CARDS:
            cardsButton.classList.add(SELECTED_CLASS);
            break;
        case PAGE_MODE_LIST:
            listButton.classList.add(SELECTED_CLASS);
            break;
    }
    cardsButton.classList.remove(FADE_OUT_CLASS);
    listButton.classList.remove(FADE_OUT_CLASS);
    cardsButton.classList.remove(HIDE_CLASS);
    listButton.classList.remove(HIDE_CLASS);
    cardsButton.classList.add(FADE_IN_CLASS);
    listButton.classList.add(FADE_IN_CLASS);
}

backButton.onanimationend = onBackButtonAnimationEnd;
function onBackButtonAnimationEnd() {
    if (this.classList.contains(FADE_OUT_CLASS)) {
        this.classList.remove(FADE_OUT_CLASS);
        this.classList.add(HIDE_CLASS);
        showModeButtons();
    } else if (this.classList.contains(FADE_IN_CLASS)) {
        this.classList.remove(FADE_IN_CLASS);
    }
}

function clearCookbookPageView() {
    cookbookPage.classList.remove(RECIPE_NONE_CLASS);
    cookbookPage.classList.remove(RECIPE_CARDS_CLASS);
    cookbookPage.classList.remove(RECIPE_LIST_CLASS);
    cookbookPage.classList.remove(RECIPE_DETAILS_CLASS);
}

cookbookPage.onanimationend = function() {
    if (cookbookPage.classList.contains(FADE_IN_CLASS)) {
        cookbookPage.classList.remove(FADE_IN_CLASS);
    } else if (cookbookPage.classList.contains(FADE_OUT_CLASS)) {
        displayCookbook();
    }
}

function displayCookbook() {
    cookbookPage.classList.remove(FADE_OUT_CLASS);
    cookbookPage.classList.add(FADE_IN_CLASS);

    clearCookbookPageView();
    switch(pageView) {
        case PAGE_MODE_CARDS:
            cookbookPage.classList.add(RECIPE_CARDS_CLASS);
            break;
        case PAGE_MODE_LIST:
            cookbookPage.classList.add(RECIPE_LIST_CLASS);
            break;
        case PAGE_MODE_RECIPE:
            cookbookPage.classList.add(RECIPE_DETAILS_CLASS);
            break;
    }
}