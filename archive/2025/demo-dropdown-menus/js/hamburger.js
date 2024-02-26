/*
    This code creates variables, that store references
    to the HTML Elements we need to modify
*/
let hamburger = document.getElementById("hamburger-icon");
let sidebar = document.getElementById("sidebar");
let closeButton = document.getElementById("close-button");

/*
    This creates an Event Handler for when the 
    hamburger icon is clicked.
*/
hamburger.onclick = () => {
    /*
        This code adds an "active" class to the sidebar
    */
    sidebar.classList.add("active");
};

/*
    This creates an Event Handler for when the 
    close (x) icon is clicked.
*/
closeButton.onclick = () => {
    /*
        This code removes the "active" class from
        the sidebar
    */
    sidebar.classList.remove("active");
};