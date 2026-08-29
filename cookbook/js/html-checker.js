const htmlInput = document.getElementById("html-input");
const submitButton = document.getElementById("submit");
const urlInput = document.getElementById("urlInput");
const urlSubmitButton = document.getElementById("urlSubmit");
const reportElement = document.getElementById("report");
const rawHTMLInputElement = document.getElementById("rawHTMLInput");
const cleanedHTMLInputElement = document.getElementById("cleanedHTMLInput");

submitButton.onclick = () => {
    reportElement.classList.add("hide");
    // add artificial delay, to make a change appear to occur on the page
    setTimeout(() => {
        if (htmlInput.value) {
            urlInput.value = "";
            generateReportOnHTML(htmlInput.value);
        } else if (urlInput.value) {
            fetchHTMLFromURL(urlInput.value);
        }
    }, 250);
}

function fetchHTMLFromURL(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            generateReportOnHTML(html);
        })
        .catch(error => {
            console.log("Error in fetching recipe: ", error);
        });
}

function convertStringToEscapedHTML(stringWithNormalSpaces, shouldReplaceSpaces=true) {
    let result = stringWithNormalSpaces
        .replace(/&nbsp;/g, "&amp;nbsp;")
        .replace(/&copy;/g, "&amp;copy;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
    if (shouldReplaceSpaces) {
        result = result.replace(/ /g, "&nbsp;");
    }
    return result;
}