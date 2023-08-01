/***********************************************************************
 * variables for dynamic content
 **********************************************************************/
const recipeNames = [];
const mealPrepRecipes = [
    {
        recipeName: "single-column-center-margin",
        categories: "page-layout, single-column",
        pageCount: 3,
        includesLocalCSS: true,
    },
    {
        recipeName: "single-column-left",
        categories: "page-layout, single-column",
        pageCount: 2,
        includesLocalCSS: true,
    },
    {
        recipeName: "single-column-right",
        categories: "page-layout, single-column",
        pageCount: 2,
        includesLocalCSS: true,
    },
    {
        recipeName: "two-columns-sidebar-flex",
        categories: "page-layout, two-columns",
        pageCount: 4,
        includesLocalCSS: true,
    },
    {
        recipeName: "two-columns-equal-flex",
        categories: "page-layout, two-columns",
        pageCount: 3,
        includesLocalCSS: true,
    },
];
const ROOT_RECIPE_FOLDER = "recipes";
const IS_DYNAMIC_LOAD = true;

// load cookbook.js immediately after this file