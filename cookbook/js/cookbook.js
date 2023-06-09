/***********************************************************************
 * Constants
 **********************************************************************/
const HEADING_ID_POSTFIX = "Heading";
const IFRAME_ID_POSTFIX = "Iframe";
const COOKBOOK_RECIPE_CLASS = "cookbookRecipe";
const LINK_CLASS = "recipeLink"
const PREVIEWING_CLASS = "previewing";
const PAGE_MODE_KEY = "mode";
const PAGE_MODE_NONE = "none";
const PAGE_MODE_CARDS = "cards";
const PAGE_MODE_LIST = "list";
const PAGE_MODE_RECIPE = "recipe";
const PAGE_MODE_NAME_CARDS = "Cards View";
const PAGE_MODE_NAME_LIST = "List View";
const RECIPE_CLASS = "recipe";
const RECIPE_NONE_CLASS = "recipeNone";
const RECIPE_CARDS_CLASS = "recipeCards";
const RECIPE_LIST_CLASS = "recipeList";
const RECIPE_DETAILS_CLASS = "recipeDetails";
const SELECTED_CLASS = "selected";
const FADE_OUT_CLASS = "fadeOut";
const FADE_IN_CLASS = "fadeIn";
const HIDE_CLASS = "hide";
let PAGE_TITLE_DEFAULT_TEXT = document.title;
const TITLE_DEFAULT_TEXT = "HTML Elements";

/***********************************************************************
 * Page elements
 **********************************************************************/
const body = document.querySelector("body");
const title = document.getElementById("title");
const titleH1 = document.querySelector("#title h1");
const titleH3 = document.querySelector("#title h3");
const backTo = document.getElementById("backTo");
const cookbookPage = document.getElementById("cookbookPage");
const cookbookPageColumnOne = document.getElementById("cookbookPageColumnOne");
const cssPreview = document.getElementById("cssPreview");
const recipeListPreview = document.getElementById("recipeListPreview");
const cardsButton = document.getElementById("cardsButton");
const listButton = document.getElementById("listButton");
const backButton = document.getElementById("backButton");

/***********************************************************************
 * Page state variables
 **********************************************************************/
const recipeDocs = {};
const recipeHTML = {};
const recipeCSS = {};

let pageRecipe = "";
let bigPreviewSrc = "";
let altTitle = "";

let defaultPageMode = PAGE_MODE_CARDS;
if (localStorage.getItem(PAGE_MODE_KEY) !== null) {
    defaultPageMode = localStorage.getItem(PAGE_MODE_KEY);
}

let pageMode = defaultPageMode;
let pageView = defaultPageMode;
updateBackToText();
updateTitleText(TITLE_DEFAULT_TEXT);

setTimeout(showModeButtons, 300);
setTimeout(showTitle, 600);
setTimeout(displayCookbook, 900);

/***********************************************************************
 * initial loading of dynamic content
 **********************************************************************/
for (let recipeName of recipeNames) {

    let recipeHTMLPath = getIngredientHTMLPath(recipeName);
    let recipeHeadingId = `${recipeName}${HEADING_ID_POSTFIX}`;
    let recipeIframeId = `${recipeName}${IFRAME_ID_POSTFIX}`;

    cookbookPageColumnOne.innerHTML += `
        <div class="${COOKBOOK_RECIPE_CLASS}" data-recipe="${recipeName}">
            <h2 class="recipeHeading">
                <a href="" id="${recipeHeadingId}" class="${LINK_CLASS}" data-recipe="${recipeName}">
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

/***********************************************************************
 * after loading, add event handlers for dynamically loaded content
 **********************************************************************/

for (let recipeName of recipeNames) {
    let recipeHTMLPath = getIngredientHTMLPath(recipeName);
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
                recipeListPreview.classList.add("fadeOut");
            }
        }
    }
}

/***********************************************************************
 * onanimationend event handlers
 **********************************************************************/

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

title.onanimationend = onTitleAnimationEnd;
function onTitleAnimationEnd() {
    if (this.classList.contains(FADE_IN_CLASS)) {
        this.classList.remove(FADE_IN_CLASS);
    } else if (this.classList.contains(FADE_OUT_CLASS)) {
        this.classList.remove(FADE_OUT_CLASS);
        this.classList.remove(HIDE_CLASS);
        this.classList.add(FADE_IN_CLASS);
        if (pageView != PAGE_MODE_RECIPE) {
            this.classList.remove(RECIPE_CLASS);
            updateTitleText();
        } else {
            this.classList.add(RECIPE_CLASS);
            updateTitleText(altTitle);
        }
    }
}

cookbookPage.onanimationend = function() {
    if (cookbookPage.classList.contains(FADE_IN_CLASS)) {
        cookbookPage.classList.remove(FADE_IN_CLASS);
    } else if (cookbookPage.classList.contains(FADE_OUT_CLASS)) {
        displayCookbook();
    }
}

recipeListPreview.onanimationend = function() {
    if (this.classList.contains(FADE_IN_CLASS)) {
        this.classList.remove(FADE_IN_CLASS);
    } else if (this.classList.contains(FADE_OUT_CLASS)) {
        this.classList.remove(FADE_OUT_CLASS);
        this.classList.add(FADE_IN_CLASS);
        reloadRecipePreview();
    }
};

function reloadRecipePreview() {
    let bigRecipePreview = document.getElementById("bigRecipePreview");
    if (bigRecipePreview.src != bigPreviewSrc) {
        recipeListPreview.innerHTML = `
            <iframe id="bigRecipePreview" src="${bigPreviewSrc}"></iframe>
        `;
        document.getElementById("bigRecipePreview").onload = function () {
            this.contentDocument.body.style.marginRight = "32px";
        }
    }
}


/***********************************************************************
 * onclick event handlers
 **********************************************************************/

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

function onRecipeLinkClick(e) {
    if (pageView == PAGE_MODE_LIST) {
        e.preventDefault();
        let recipe = this.dataset.recipe;
        displayIndividualRecipe(recipe, this.textContent);
    }
}

const cookbookRecipes = document.getElementsByClassName(COOKBOOK_RECIPE_CLASS);
for (let cookbookRecipe of cookbookRecipes) {
    cookbookRecipe.onclick = onCookbookRecipeClick;
}

function onCookbookRecipeClick(e) {
    if (pageView == PAGE_MODE_CARDS) {
        e.preventDefault();
        let recipe = this.dataset.recipe;
        let recipeHeadingId = `${recipe}${HEADING_ID_POSTFIX}`;
        let recipeTitle = document.getElementById(recipeHeadingId).innerHTML;
        displayIndividualRecipe(recipe, recipeTitle);
    }
}

function displayIndividualRecipe(recipe, recipeTitle) {
    setPageView(PAGE_MODE_RECIPE, recipe, recipeTitle);
    cardsButton.classList.add(FADE_OUT_CLASS);
    listButton.classList.add(FADE_OUT_CLASS);
    body.scrollIntoView({
        behavior: "smooth",
    });
}

/***********************************************************************
 * page state changes
 **********************************************************************/

function storePageMode(mode) {
    localStorage.setItem(PAGE_MODE_KEY, mode);
}

function setPageView(mode, recipeKey="", recipeName="", shouldSaveInHistory=true) {
    switch(mode) {
        case PAGE_MODE_CARDS:
            pageMode = mode;
            storePageMode(mode);
            updateBackToText();
            cardsButton.classList.add(SELECTED_CLASS);
            listButton.classList.remove(SELECTED_CLASS);
            cookbookPage.classList.add(FADE_OUT_CLASS);
            if (pageView == PAGE_MODE_RECIPE) {
                backButton.classList.add(FADE_OUT_CLASS);
                title.classList.add(FADE_OUT_CLASS);
            }
            break;
        case PAGE_MODE_LIST:
            pageMode = mode;
            storePageMode(mode);
            updateBackToText();
            listButton.classList.add(SELECTED_CLASS);
            cardsButton.classList.remove(SELECTED_CLASS);
            cookbookPage.classList.add(FADE_OUT_CLASS);
            if (pageView == PAGE_MODE_RECIPE) {
                backButton.classList.add(FADE_OUT_CLASS);
                title.classList.add(FADE_OUT_CLASS);
            }
            break;
        case PAGE_MODE_RECIPE:
            cardsButton.classList.add(FADE_OUT_CLASS);
            listButton.classList.add(FADE_OUT_CLASS);
            title.classList.add(FADE_OUT_CLASS);
            cookbookPage.classList.add(FADE_OUT_CLASS);
            fetchHTMLRecipeCodeAndPrint(recipeKey);
            break;
    }

    pageView = mode;
    pageRecipe = recipeKey;

    if (shouldSaveInHistory) {
        storeHistoryState(pageView, recipeKey, recipeName);
    }
}

function storeHistoryState(view, recipeKey, recipeName) {
    const stateObject = {
        view: view,
        recipe: "",
        recipeName: "",
    };

    let stateLocation = location.pathname;
    if (recipeKey) {
        stateObject.recipe = recipeKey;
        stateLocation = `${stateLocation}#${recipeKey}`;
    }

    let stateTitle = PAGE_TITLE_DEFAULT_TEXT;
    if (recipeName) {
        stateObject.recipeName = recipeName;
        stateTitle = `${recipeName} | ${PAGE_TITLE_DEFAULT_TEXT}`;
    }

    history.pushState(stateObject, stateTitle, stateLocation);
}

window.onpopstate = function(event) {
    const state = event.state;
    if (state && state.view) {
        setPageView(state.view, state.recipe, state.recipeName, false);
    }
}

function updateBackToText() {
    switch(pageMode) {
        case PAGE_MODE_CARDS:
            backTo.textContent = PAGE_MODE_NAME_CARDS;
            break;
            
        case PAGE_MODE_LIST:
            backTo.textContent = PAGE_MODE_NAME_LIST;
            break;
    }
}

function updateTitleText(text = TITLE_DEFAULT_TEXT) {
    titleH1.textContent = text;
}


/***********************************************************************
 * fetch and load dynamic content functions
 **********************************************************************/

function fetchHTMLRecipeCodeAndPrint(recipe) {
    document.getElementById("htmlPreview").innerHTML = "Loading HTML...";
    const recipePath = getIngredientHTMLPath(recipe);
    bigPreviewSrc = recipePath;
    //bigRecipePreview.src = bigPreviewSrc;
    reloadRecipePreview();
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
            altTitle = doc.title;
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

/***********************************************************************
 * display functions
 **********************************************************************/
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

function fadeOutModeButtons() {
    cardsButton.classList.add(FADE_OUT_CLASS);
    listButton.classList.add(FADE_OUT_CLASS);
}

function showTitle() {
    title.classList.remove(FADE_OUT_CLASS);
    title.classList.remove(HIDE_CLASS);
    title.classList.add(FADE_IN_CLASS);
}

function clearCookbookPageView() {
    cookbookPage.classList.remove(RECIPE_NONE_CLASS);
    cookbookPage.classList.remove(RECIPE_CARDS_CLASS);
    cookbookPage.classList.remove(RECIPE_LIST_CLASS);
    cookbookPage.classList.remove(RECIPE_DETAILS_CLASS);
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

function clearPreviewedRecipeHeadingLinks() {
    const headingLinks = document.querySelectorAll("h2.recipeHeading a");
    for (let headingLink of headingLinks) {
        headingLink.classList.remove(PREVIEWING_CLASS);
    }
}

function hideCSSPreview() {
    document.getElementById("recipeDetailsHeadingCSS").classList.add("hide");
    document.getElementById("cssPreview").classList.add("hide");
}

function showCSSPreview() {
    document.getElementById("recipeDetailsHeadingCSS").classList.remove("hide");
    document.getElementById("cssPreview").classList.remove("hide");
}


/***********************************************************************
 * other utility functions
 **********************************************************************/
function applyRootFolderToPath(path) {
    return `${ROOT_RECIPE_FOLDER}/${path}`;
}

function getIngredientHTMLPath(recipeName) {
    return applyRootFolderToPath(recipeName + ".html");
}