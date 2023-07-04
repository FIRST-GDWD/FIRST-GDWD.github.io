/***********************************************************************
 * variables for dynamic content
 **********************************************************************/
const recipeNames = [];
const mealPrepRecipes = [
    {
        recipeName: "headings",
        pageCount: 4,
    },
    {
        recipeName: "text-styling",
        pageCount: 8,
    },
    {
        recipeName: "lists",
        pageCount: 10,
    },
    {
        recipeName: "images",
        pageCount: 8,
    },
    {
        recipeName: "anchors",
        pageCount: 10,
    },
    {
        recipeName: "basic-html-drills",
        pageCount: 7,
    },
    {
        recipeName: "wiki-page-1",
        pageCount: 1,
    },
    {
        recipeName: "wiki-page-2",
        pageCount: 1,
    },
    {
        recipeName: "recipe-book",
        pageCount: 1,
    },
    {
        recipeName: "playlist",
        pageCount: 1,
    },
    {
        recipeName: "movie-showcase",
        pageCount: 1,
    },
    {
        recipeName: "basic-css-drills",
        pageCount: 15,
        includesLocalCSS: true,
    },
    {
        recipeName: "box-model-margin-drills",
        pageCount: 12,
        includesLocalCSS: true,
    },
    {
        recipeName: "box-model-padding-drills",
        pageCount: 7,
        includesLocalCSS: true,
    },
    {
        recipeName: "box-model-border-drills",
        pageCount: 9,
        includesLocalCSS: true,
    },
];
const ROOT_RECIPE_FOLDER = "meal-prep";

// load cookbook.js immediately after this file