### Contrubuting

## BEM syntax

BEM stands for “Block Element Modifier”. Here's a breakdown of what that means:

Block is the primary component block (e.g. .c-button)
Element is a child of the primary block (e.g. .c-button\_\_text)
Modifier is a variation of a component style (e.g. .c-button--secondary)

## General Pages

Becuause this is not using a standard CMS we are using Markdown files to build out the basic pages, and javascript object data to populate the pages, and give the editors a place to edit content with out getting into the code.
The main pages are static pages and and content can be edited from the `data/*.js` files
The basic page are dynamic and if you add a new Markdown file to `data/utilities` the URL for that page will be generated based off the file name.
You can also up date the navigation menu to add a new page from the `data/utilities/navMenu.js` file.
