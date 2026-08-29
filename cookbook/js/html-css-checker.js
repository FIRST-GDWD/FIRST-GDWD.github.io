const submitButton = document.getElementById("submit");
const urlInput = document.getElementById("urlInput");
const urlSubmitButton = document.getElementById("urlSubmit");
const reportElement = document.getElementById("report");
const rawHTMLInputElement = document.getElementById("rawHTMLInput");
const cleanedHTMLInputElement = document.getElementById("cleanedHTMLInput");
const rawCSSInputElement = document.getElementById("rawCSSInput");
const cleanedCSSInputElement = document.getElementById("cleanedCSSInput");

submitButton.onclick = () => {
    reportElement.classList.add("hide");
    // add artificial delay, to make a change appear to occur on the page
    setTimeout(() => {
        if (urlInput.value) {
            const url = urlInput.value;
            fetchHTMLFromURL(url);
        }
    }, 250);
}

function fetchHTMLFromURL(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            generateReportOnHTML(html);

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('head link[rel=stylesheet]');
            let firstLocalCSSPath = '';
            let preferredLocalCSSPath = '';

            for (let i = 0; i < links.length; i++) {
                const linkElement = links[i];
                if (linkElement.href.includes("/css/") || linkElement.href.includes("/CSS/")) {
                    if (!firstLocalCSSPath) {
                        if (linkElement.href.includes("/css/")) {
                            firstLocalCSSPath = linkElement.href.substring(linkElement.href.indexOf('css/'));
                        } else if (linkElement.href.includes("/CSS/")) {
                            firstLocalCSSPath = linkElement.href.substring(linkElement.href.indexOf('CSS/'));
                        }
                    }
                    if (
                        linkElement.href.includes("style.css")
                        || linkElement.href.includes("styles.css")
                        || linkElement.href.includes("drill.css") 
                        || linkElement.href.includes("index.css")
                    ) {
                        if (linkElement.href.includes("/css/")) {
                            preferredLocalCSSPath = linkElement.href.substring(linkElement.href.indexOf('css/'));
                        } else if (linkElement.href.includes("/CSS/")) {
                            preferredLocalCSSPath = linkElement.href.substring(linkElement.href.indexOf('CSS/'));
                        }
                    }
                }
            }

            const urlObject = new URL(url);
            const urlPartsArray = urlObject.pathname.split('/');
            if (urlPartsArray[urlPartsArray.length - 1].includes('.')) {
                urlPartsArray.pop();
            }
            const rootPath = 
                urlObject.origin + urlPartsArray.join('/') + '/';

            if (preferredLocalCSSPath) {
                fetchCSSFromURL(rootPath + preferredLocalCSSPath);
            } else {
                fetchCSSFromURL(rootPath + firstLocalCSSPath);
            }
        })
        .catch(error => {
            console.log("Error in fetching web page code: ", error);
        });
}

function fetchCSSFromURL(url) {
    //console.log("fetchCSSFromURL: " + url);
    fetch(url)
        .then(response => response.text())
        .then(css => {
            generateReportOnCSS(css);
        })
        .catch(error => {
            console.log("Error in fetching CSS: ", error);
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

function shouldAllowNestedCSSRules() {
    let params = null;
    
    if (location.hash.includes("?")) {
        let paramsWithoutHash = location.hash.substring(1).split("?")[1];
        params = new URLSearchParams(paramsWithoutHash);
    } else if (location.search) {
        params = new URLSearchParams(location.search);
    }

    if (params) {
        const pageParam = params.get('allowCSSNesting');
        if (pageParam !== null) {
            const report = document.getElementById("report");
            report.classList.add("nestedOverride");
            return true;
        }
    }

    return false;
}