/***********************************************************************
 * variables for dynamic content
 **********************************************************************/
const recipeNames = [];
const mealPrepRecipes = [
    {
        recipeName: "headings",
        categories: "demo, week1",
        pageCount: 4,
    },
    {
        recipeName: "text-styling",
        categories: "demo, week1",
        pageCount: 8,
    },
    {
        recipeName: "lists",
        categories: "demo, week1",
        pageCount: 10,
    },
    {
        recipeName: "images",
        categories: "demo, week1",
        pageCount: 8,
    },
    {
        recipeName: "anchors",
        categories: "demo, week1",
        pageCount: 10,
    },
    {
        recipeName: "basic-html-drills",
        categories: "drills, week1",
        pageCount: 7,
    },
    {
        recipeName: "wiki-page-1",
        categories: "exercise, week1",
        pageCount: 1,
    },
    {
        recipeName: "wiki-page-2",
        categories: "exercise, week1",
        pageCount: 1,
    },
    {
        recipeName: "recipe-book",
        categories: "project, week1",
        pageCount: 1,
    },
    {
        recipeName: "playlist",
        categories: "project, week1",
        pageCount: 1,
    },
    {
        recipeName: "movie-showcase",
        categories: "project, week1",
        pageCount: 1,
    },
    {
        recipeName: "colors-and-text",
        categories: "demo, week2",
        pageCount: 11,
        includesLocalCSS: true,
    },
    {
        recipeName: "basic-css-drills",
        categories: "drills, week2",
        pageCount: 15,
        includesLocalCSS: true,
    },
    {
        recipeName: "color-palettes",
        categories: "exercise, week2",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "divs-spans-and-flow",
        categories: "demo, week2",
        pageCount: 9,
        includesLocalCSS: true,
    },
    {
        recipeName: "document-flow-drills",
        categories: "drills, week2",
        pageCount: 8,
        includesLocalCSS: true,
    },
    {
        recipeName: "bulletin-board",
        categories: "exercise, week2",
        pageCount: 3,
        includesLocalCSS: true,
    },
    {
        recipeName: "box-model",
        categories: "demo, week2",
        pageCount: 11,
        includesLocalCSS: true,
    },
    {
        recipeName: "box-model-margin-drills",
        categories: "drills, week2",
        pageCount: 9,
        includesLocalCSS: true,
    },
    {
        recipeName: "box-model-padding-drills",
        categories: "drills, week2",
        pageCount: 7,
        includesLocalCSS: true,
    },
    {
        recipeName: "box-model-border-drills",
        categories: "drills, week2",
        pageCount: 9,
        includesLocalCSS: true,
    },
    {
        recipeName: "upside-down-tetris",
        categories: "exercise, week2",
        pageCount: 3,
        includesLocalCSS: true,
    },
    {
        recipeName: "combining-selectors",
        categories: "demo, week2",
        pageCount: 11,
        includesLocalCSS: true,
    },
    {
        recipeName: "containers-selectors-drills",
        categories: "drills, week2",
        pageCount: 7,
        includesLocalCSS: true,
    },
    {
        recipeName: "studio-gallery",
        categories: "exercise, week2",
        pageCount: 2,
        includesLocalCSS: true,
    },
    {
        recipeName: "alley-posters",
        categories: "exercise, week2",
        pageCount: 2,
        includesLocalCSS: true,
    },
    {
        recipeName: "absolute-vs-relative-units",
        categories: "demo, week2",
        pageCount: 10,
        includesLocalCSS: true,
    },
    {
        recipeName: "generic-license",
        categories: "project, week2",
        pageCount: 2,
        includesLocalCSS: true,
    },
    {
        recipeName: "one-column-layouts",
        categories: "demo, week3",
        pageCount: 8,
        includesLocalCSS: true,
    },
    {
        recipeName: "two-column-flex-layouts",
        categories: "demo, week3",
        pageCount: 7,
        includesLocalCSS: true,
    },
    {
        recipeName: "two-column-grid-layouts",
        categories: "demo, week3",
        pageCount: 9,
        includesLocalCSS: true,
    },
    {
        recipeName: "three-column-grid-layouts",
        categories: "demo, week3",
        pageCount: 9,
        includesLocalCSS: true,
    },
];
const ROOT_RECIPE_FOLDER = "meal-prep";
const IS_DYNAMIC_LOAD = true;

// load cookbook.js immediately after this file