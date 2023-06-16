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
const PAGE_MODE_MEAL_PREP = "mealPrep";
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
const DISABLED_CLASS = "disabled";
let PAGE_TITLE_DEFAULT_TEXT = document.title;
let TITLE_DEFAULT_TEXT = document.querySelector("#title h1").textContent;
const MEAL_PREP_FILE_NAME = "page";
const MEAL_PREP_SUBTITLE = "Meal Prep";

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
const mealPrepFooter = document.getElementById("mealPrepFooter");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentPage = document.getElementById("currentPage");

/***********************************************************************
 * Page state variables
 **********************************************************************/
const recipeDocs = {};
const recipeHTML = {};
const recipeCSS = {};

let pageRecipe = "";
let mealPrepPageNumber = 0;
let bigPreviewSrc = "";
let altTitle = "";

let defaultPageMode = PAGE_MODE_CARDS;
if (localStorage.getItem(PAGE_MODE_KEY) !== null) {
    defaultPageMode = localStorage.getItem(PAGE_MODE_KEY);
}

/***********************************************************************
 * initial loading of dynamic content
 **********************************************************************/
if (recipeNames.length > 0) {
    for (let recipeName of recipeNames) {
        let recipeHTMLPath = getRecipeHTMLPath(recipeName);
        generateAndAddRecipe(recipeName, recipeHTMLPath);
    }
} else if (mealPrepRecipes.length > 0) {
    for (let mealPrepRecipe of mealPrepRecipes) {
        let recipeHTMLPath = getMealPrepHTMLPath(
            mealPrepRecipe.recipeName, 
            mealPrepRecipe.pageCount-1,
        );
        generateAndAddRecipe(mealPrepRecipe.recipeName, recipeHTMLPath);
    }
}

function generateAndAddRecipe(recipeName, recipePath) {
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
                <iframe src="${recipePath}" id="${recipeIframeId}" scrolling="no"></iframe>
                <div class="recipeOverlay"></div>
            </div>
        </div>
    `;
}

/***********************************************************************
 * after loading, add event handlers for dynamically loaded content
 **********************************************************************/

if (recipeNames.length > 0) {
    for (let recipeName of recipeNames) {
        let recipeHTMLPath = getRecipeHTMLPath(recipeName);
        addRecipeEventHandlers(recipeName, recipeHTMLPath);
    }
} else if (mealPrepRecipes.length > 0) {
    for (let mealPrepRecipe of mealPrepRecipes) {
        let recipeHTMLPath = getMealPrepHTMLPath(
            mealPrepRecipe.recipeName, 
            mealPrepRecipe.pageCount-1,
        );
        addRecipeEventHandlers(mealPrepRecipe.recipeName, recipeHTMLPath);
    }
}

function addRecipeEventHandlers(recipeName, recipeHTMLPath) {
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
 * remaining Page initialization
 **********************************************************************/

let pageMode = defaultPageMode;
let pageView = defaultPageMode;
updateBackToText();
updateTitleText(TITLE_DEFAULT_TEXT);

let hashWithoutParams = location.hash.substring(1).split("?")[0];
let hashMatchesRecipe = 
    location.hash && recipeNames.includes(hashWithoutParams);
let hashMatchesMealPrep = 
    location.hash && doesMealPrepIncludeRecipe(hashWithoutParams);

if (location.hash && (hashMatchesRecipe || hashMatchesMealPrep)) {
    if (hashMatchesRecipe) {
        pageView = PAGE_MODE_RECIPE;
    } else if (hashMatchesMealPrep) {
        pageView = PAGE_MODE_MEAL_PREP;
    }

    if (location.hash.includes("?")) {
        let paramsWithoutHash = location.hash.substring(1).split("?")[1];
        const params = new URLSearchParams(paramsWithoutHash);
        const pageParam = params.get('p');
        if (pageParam !== null) {
            mealPrepPageNumber = parseInt(pageParam, 10) - 1;
        }
    }

    setTimeout(showBackButton, 300);
    setTimeout(preloadRecipeTitle, 600, hashWithoutParams);
    setTimeout(preloadRecipe, 900, hashWithoutParams);
} else {
    setTimeout(showModeButtons, 300);
    setTimeout(showTitle, 600);
    setTimeout(displayCookbook, 900);
}

function doesMealPrepIncludeRecipe(recipeName) {
    return (mealPrepRecipes.find(recipe => recipe.recipeName == recipeName) !== undefined);
}

function preloadRecipeTitle(recipeName) {
    let recipeHeadingId = `${recipeName}${HEADING_ID_POSTFIX}`;
    let recipeTitle = document.getElementById(recipeHeadingId).textContent;
    title.classList.add(RECIPE_CLASS);
    updateTitleText(recipeTitle);
    showTitle();
    document.querySelector("title").innerHTML = `${recipeTitle} | ${PAGE_TITLE_DEFAULT_TEXT}`;
}

function preloadRecipe(recipeName) {
    pageRecipe = recipeName;
    fetchHTMLRecipeCodeAndPrint(recipeName);
    displayCookbook();
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

if (mealPrepFooter) {
    mealPrepFooter.onanimationend = function() {
        if (this.classList.contains(FADE_OUT_CLASS)) {
            this.classList.remove(FADE_OUT_CLASS);
            this.classList.add(HIDE_CLASS);
        } else if (this.classList.contains(FADE_IN_CLASS)) {
            this.classList.remove(FADE_IN_CLASS);
        }
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
        if (pageView != PAGE_MODE_RECIPE && pageView != PAGE_MODE_MEAL_PREP) {
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
        if (isMealPlanPage() && pageView == PAGE_MODE_MEAL_PREP) {
            fetchHTMLRecipeCodeAndPrint(pageRecipe);
        }
        else {
            displayCookbook();
        }
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
        mealPrepPageNumber = 0;
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
        mealPrepPageNumber = 0;
        displayIndividualRecipe(recipe, recipeTitle);
    }
}

if (nextButton) {
    nextButton.onclick = loadNextPage;
    function loadNextPage() {
        const mealPrepRecipe = mealPrepRecipes.find(
            mealPlanRecipe => mealPlanRecipe.recipeName == pageRecipe,
        );
        
        if (mealPrepPageNumber < mealPrepRecipe.pageCount - 1) {
            mealPrepPageNumber++;
            cookbookPage.classList.add(FADE_OUT_CLASS);
            refreshMealPlanFooter();

            let recipeHeadingId = `${pageRecipe}${HEADING_ID_POSTFIX}`;
            let recipeTitle = document.getElementById(recipeHeadingId).innerHTML;
            storeHistoryState(pageView, pageRecipe, recipeTitle, mealPrepPageNumber)
        }
    }
}

if (prevButton) {
    prevButton.onclick = loadPrevPage;
    function loadPrevPage() {
        if (mealPrepPageNumber > 0) {
            mealPrepPageNumber--;
            cookbookPage.classList.add(FADE_OUT_CLASS);
            refreshMealPlanFooter();

            let recipeHeadingId = `${pageRecipe}${HEADING_ID_POSTFIX}`;
            let recipeTitle = document.getElementById(recipeHeadingId).innerHTML;
            storeHistoryState(pageView, pageRecipe, recipeTitle, mealPrepPageNumber)
        }
    }
}

function refreshMealPlanFooter() {
    const mealPrepRecipe = mealPrepRecipes.find(
        mealPlanRecipe => mealPlanRecipe.recipeName == pageRecipe,
    );
    nextButton.classList.add(DISABLED_CLASS);
    prevButton.classList.add(DISABLED_CLASS);
    if (mealPrepPageNumber > 0) {
        prevButton.classList.remove(DISABLED_CLASS);
    }
    if (mealPrepPageNumber < mealPrepRecipe.pageCount - 1) {
        nextButton.classList.remove(DISABLED_CLASS);
    }
    currentPage.innerHTML = 
        `Page ${mealPrepPageNumber + 1} of ${mealPrepRecipe.pageCount}`;
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
            if (pageView == PAGE_MODE_RECIPE || pageView == PAGE_MODE_MEAL_PREP) {
                backButton.classList.add(FADE_OUT_CLASS);
                title.classList.add(FADE_OUT_CLASS);
                if (pageView == PAGE_MODE_MEAL_PREP) {
                    mealPrepFooter.classList.add(FADE_OUT_CLASS);
                }
            }
            break;
        case PAGE_MODE_LIST:
            pageMode = mode;
            storePageMode(mode);
            updateBackToText();
            listButton.classList.add(SELECTED_CLASS);
            cardsButton.classList.remove(SELECTED_CLASS);
            cookbookPage.classList.add(FADE_OUT_CLASS);
            if (pageView == PAGE_MODE_RECIPE || pageView == PAGE_MODE_MEAL_PREP) {
                backButton.classList.add(FADE_OUT_CLASS);
                title.classList.add(FADE_OUT_CLASS);
                if (pageView == PAGE_MODE_MEAL_PREP) {
                    mealPrepFooter.classList.add(FADE_OUT_CLASS);
                }
            }
            break;
        case PAGE_MODE_MEAL_PREP:
            // if (pageView != PAGE_MODE_MEAL_PREP) {
            //     mealPrepPageNumber = 0;
            // }
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

function storeHistoryState(view, recipeKey, recipeName, pageNumber=0) {
    const stateObject = {
        view: view,
        recipe: "",
        recipeName: "",
        pageNumber: "",
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

    if (pageNumber > 0) {
        stateObject.pageNumber = (pageNumber + 1).toString();
        const params = new URLSearchParams();
        params.set("p", stateObject.pageNumber);
        stateLocation = `${stateLocation}?${params}`;
    }
    
    history.pushState(stateObject, stateTitle, stateLocation);
    document.querySelector("title").innerHTML = stateTitle;
}

window.onpopstate = function(event) {
    const state = event.state;
    if (state && state.view) {
        if (state.pageNumber) {
            mealPrepPageNumber = parseInt(state.pageNumber) - 1;
        }
        setPageView(state.view, state.recipe, state.recipeName, false);
        let newTitle = PAGE_TITLE_DEFAULT_TEXT;
        if (state.recipeName) {
            newTitle = `${state.recipeName} | ${newTitle}`;
        }
        document.querySelector("title").innerHTML = newTitle;
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
    const recipePath = isMealPlanPage()
        ? getMealPrepHTMLPath(recipe, mealPrepPageNumber)
        : getRecipeHTMLPath(recipe);
    bigPreviewSrc = recipePath;
    reloadRecipePreview();
    fetch(recipePath)
        .then(response => response.text())
        .then(html => {
            let recipeKey = recipe;
            if (isMealPlanPage()) {
                recipeKey += mealPrepPageNumber;
            }
            if (!(recipeKey in recipeHTML)) {
                recipeHTML[recipeKey] = html;
            }
            document.getElementById("htmlPreview").innerHTML = 
                convertStringToEscapedHTML(recipeHTML[recipeKey]);
            
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
            if (isMealPlanPage()) {
                displayCookbook();
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
            let recipeKey = recipe;
            if (isMealPlanPage()) {
                recipeKey += mealPrepPageNumber;
            }
            if (!(recipeKey in recipeCSS)) {
                recipeCSS[recipeKey] = css;
            }
            document.getElementById("cssPreview").innerHTML = 
                convertStringToEscapedHTML(recipeCSS[recipeKey]);
            
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
        .replace(/\n/g, "<br>")
        .replace(/&lt;!--/g, "<span class='comment'>&lt;!--")
        .replace(/--&gt;/g, "--&gt;</span>")
        .replace(/&lt;(?!!--)/g, "<span class='tag'>&lt;")
        .replace(/(?!--)&gt;/g, "&gt;</span>");
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

function showBackButton() {
    backButton.classList.remove(HIDE_CLASS);
    backButton.classList.add(FADE_IN_CLASS);
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
        case PAGE_MODE_MEAL_PREP:
            if (mealPrepFooter.classList.contains(HIDE_CLASS)) {
                mealPrepFooter.classList.remove(HIDE_CLASS);
                mealPrepFooter.classList.add(FADE_IN_CLASS);
            }
            refreshMealPlanFooter();
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

function displayIndividualRecipe(recipe, recipeTitle) {
    let view = isMealPlanPage() ? PAGE_MODE_MEAL_PREP : PAGE_MODE_RECIPE;
    setPageView(view, recipe, recipeTitle);
    cardsButton.classList.add(FADE_OUT_CLASS);
    listButton.classList.add(FADE_OUT_CLASS);
    body.scrollIntoView({
        behavior: "smooth",
    });
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
function isMealPlanPage() {
    if (recipeNames.length > 0) {
        return false;
    } else if (mealPrepRecipes.length > 0) {
        return true;
    }
    return false;
}

function applyRootFolderToPath(path) {
    return `${ROOT_RECIPE_FOLDER}/${path}`;
}

function getRecipeHTMLPath(recipeName) {
    return applyRootFolderToPath(recipeName + ".html");
}

function getMealPrepHTMLPath(recipeName, pageNumber=0) {
    return applyRootFolderToPath(`${recipeName}/${MEAL_PREP_FILE_NAME}${pageNumber}.html`);
}