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
    {
        recipeName: "two-column-mixed-layouts",
        categories: "page-layout, two-columns, grid, flex",
        pageCount: 10,
        includesLocalCSS: true,
    },
    {
        recipeName: "three-cards",
        categories: "content-layout, flex",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "media-and-text",
        categories: "content-layout, flex",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "comparison-tables",
        categories: "content-layout, grid, flex",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "hero-left-flex",
        categories: "content-layout, hero, flex",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "hero-right-flex-column",
        categories: "content-layout, hero, flex",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "hero-left-position",
        categories: "content-layout, hero",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "hero-center-flex",
        categories: "content-layout, hero, flex",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "hero-parallax",
        categories: "content-layout, hero, flex",
        pageCount: 1,
        includesLocalCSS: true,
    },
    {
        recipeName: "gallery-grid-basic",
        categories: "content-layout, gallery, grid",
        pageCount: 4,
        includesLocalCSS: true,
    },
    {
        recipeName: "gallery-grid-cropped",
        categories: "content-layout, gallery, grid",
        pageCount: 4,
        includesLocalCSS: true,
    },
    {
        recipeName: "gallery-masonry-horizontal",
        categories: "content-layout, gallery, flex",
        pageCount: 4,
        includesLocalCSS: true,
    },
    {
        recipeName: "gallery-masonry-vertical-flex",
        categories: "content-layout, gallery, flex",
        pageCount: 4,
        includesLocalCSS: true,
    },
    {
        recipeName: "gallery-masonry-vertical-columns",
        categories: "content-layout, gallery",
        pageCount: 4,
        includesLocalCSS: true,
    },
];
const ROOT_RECIPE_FOLDER = "recipes";
const IS_DYNAMIC_LOAD = true;

// load cookbook.js immediately after this file