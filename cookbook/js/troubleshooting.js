/***********************************************************************
 * variables for dynamic content
 **********************************************************************/
const recipeNames = [];
const mealPrepRecipes = [
    {
        recipeName: "wordpress-caching",
        categories: "wordpress",
        pageCount: 1,
        hasLocalProject: false,
    },
    {
        recipeName: "endless-push",
        categories: "github",
        pageCount: 1,
        hasLocalProject: false,
    },
];
const categories = [
    {
        label: "WordPress",
        value: "wordpress",
    },
    {
        label: "GitHub",
        value: "github",
    },
];
const ROOT_RECIPE_FOLDER = "troubleshooting";
const IS_DYNAMIC_LOAD = true;

// load cookbook.js immediately after this file