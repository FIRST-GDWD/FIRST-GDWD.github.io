/***********************************************************************
 * variables for dynamic content
 **********************************************************************/
const recipeNames = [];
const mealPrepRecipes = [
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
        recipeName: "single-column-center-margin",
        categories: "page-layout, single-column",
        pageCount: 3,
        includesLocalCSS: true,
    },
    {
        recipeName: "two-columns-sidebar-flex",
        categories: "page-layout, two-columns, flex",
        pageCount: 4,
        includesLocalCSS: true,
    },
    {
        recipeName: "two-columns-equal-flex",
        categories: "page-layout, two-columns, flex",
        pageCount: 3,
        includesLocalCSS: true,
    },
    {
        recipeName: "two-columns-sidebar-grid",
        categories: "page-layout, two-columns, grid",
        pageCount: 4,
        includesLocalCSS: true,
    },
    {
        recipeName: "three-columns-sidebars-grid",
        categories: "page-layout, three-columns, grid",
        pageCount: 3,
        includesLocalCSS: true,
    },
    {
        recipeName: "three-columns-traditional-grid",
        categories: "page-layout, three-columns, grid",
        pageCount: 3,
        includesLocalCSS: true,
    },
    {
        recipeName: "mixed-columns-grid+flex",
        categories: "page-layout, three-columns, grid, flex",
        pageCount: 2,
        includesLocalCSS: true,
    },
];
const ROOT_RECIPE_FOLDER = "recipes";
const IS_DYNAMIC_LOAD = true;

// load cookbook.js immediately after this file