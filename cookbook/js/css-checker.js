const htmlInput = document.getElementById("html-input");
const submitButton = document.getElementById("submit");
const urlInput = document.getElementById("urlInput");
const urlSubmitButton = document.getElementById("urlSubmit");
const reportElement = document.getElementById("report");
const rawInputElement = document.getElementById("rawInput");
const cleanedInputElement = document.getElementById("cleanedInput");

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
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('head link[rel=stylesheet]');
            let selectedCSSPath = '';
            for (let i = 0; i < links.length; i++) {
                const linkElement = links[i];
                if (linkElement.href.startsWith('/css/')) {
                    selectedCSSPath = linkElement.href;
                    break;
                }
            }
            if (selectedCSSPath) {
                // probably need to append resource path to root URL.
                //generateReportOnCSS(selectedCSSPath);
            }
        })
        .catch(error => {
            console.log("Error in fetching recipe: ", error);
        });
}

function generateReportOnHTML(rawInput) {
    const rawInputLines = rawInput.split("\n");
    const TAB_LENGTH = 4;
    const LINE_CHAR_LIMIT = 80;
    const VOID_ELEMENTS = ["link", "meta", "img", "hr", "br", "input"];
    const VALID_ELEMENTS = [
        "html",
        "head",
        "body",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "i",
        "b",
        "sup",
        "sub",
        "hr",
        "br",
        "ul",
        "ol",
        "li",
        "img",
        "span",
        "nav",
        "header",
        "footer",
        "main",
        "section",
        "aside",
        "figure",
        "video",
        "audio",
        "link",
        "title",
        "meta",
        "a",
        "script",
    ];
    const lineObjects = [];
    const parentStack = [];
    let lastLineObject = null;
    for (let i = 0; i < rawInputLines.length; i++) {
        const rawInput = rawInputLines[i];
        const newLineObject = {};
        newLineObject.lineNumber = i+1;
        newLineObject.rawInput = rawInput.trimEnd();
        newLineObject.charCount = newLineObject.rawInput.length;
        newLineObject.exceedsCharLimit = newLineObject.rawInput.length > LINE_CHAR_LIMIT;
        newLineObject.trimmedInput = rawInput.trimStart().trimEnd();
        newLineObject.isEmpty = newLineObject.trimmedInput.length == 0;
        newLineObject.actualIndentation = 
            newLineObject.rawInput.length - newLineObject.trimmedInput.length;

        newLineObject.isBlockOpener = newLineObject.trimmedInput.endsWith('{');
        newLineObject.isBlockCloser = newLineObject.trimmedInput.startsWith('}');
            

        // TODO: change to CSS rule/selector/block terminology, and set logic
        if (newLineObject.isBlockOpener) {
            parentStack.push(newLineObject);
        }

        
        let indentation = 0;
        let foundMatchedParent = false;
        let isStrayClosingBracket = false;
        if (newLineObject.isBlockCloser) {
            let parentsPoppedCount = 0;
            if (parentStack.length > 0) {
                const poppedParent = parentStack.pop();
                parentsPoppedCount++;

                indentation = poppedParent.idealIndentation;
                foundMatchedParent = true;
                poppedParent.matchingLineNumber = newLineObject.lineNumber;
                newLineObject.matchingLineNumber = poppedParent.lineNumber;
                // if (parentsPoppedCount > 1) {
                //     newLineObject.isNearMissingClosingTags = true;
                // }
            } else if (parentStack.length == 0) {
                indentation = newLineObject.actualIndentation;
                isStrayClosingBracket = true;
                newLineObject.isStrayClosingBracket = true;
            }
        } else if (!foundMatchedParent && !isStrayClosingTag && lastLineObject) {
            if (lastLineObject.isBlockOpener) {
                indentation = lastLineObject.idealIndentation + TAB_LENGTH;
            } else {
                indentation = lastLineObject.idealIndentation;
                newLineObject.isExcessLineSpace = 
                    newLineObject.isEmpty && lastLineObject.isEmpty;
            }
        }
        newLineObject.idealIndentation = indentation;

        lineObjects.push(newLineObject);
        if (!isStrayClosingTag) {
            lastLineObject = newLineObject;
        }
    }


    rawInputElement.innerHTML = "";
    cleanedInputElement.innerHTML = "";
    for (let i = 0; i < lineObjects.length; i++) {
        const line = lineObjects[i];

        let paddedRawTrimmedInput = line.trimmedInput.padEnd(
            LINE_CHAR_LIMIT - line.actualIndentation, 
            ' ',
        );
        let trimmedRawInputWithCharLimit = 
            paddedRawTrimmedInput.slice(0, LINE_CHAR_LIMIT - line.actualIndentation) 
            + '|' 
            + paddedRawTrimmedInput.slice(LINE_CHAR_LIMIT - line.actualIndentation);

        let indentationDiff = line.idealIndentation - line.actualIndentation;

        line.hasDirtyCode = 
            (indentationDiff != 0 && !line.isEmpty)
            || line.isStrayClosingBracket
            // || line.isNearMissingClosingTags
            || line.isExcessLineSpace
            || line.exceedsCharLimit;

        let errorMessage = ""
        if (line.hasDirtyCode) {
            errorMessage += `Line ${line.lineNumber} has the following clean code issues:\n`;
            if (indentationDiff != 0 && !line.isEmpty) {
                errorMessage += 
                    `  - This line should be ${indentationDiff > 0 ? "indented " : "outdented "}`
                    + `${Math.abs(indentationDiff)} spaces `;
                
                if (indentationDiff % TAB_LENGTH == 0) {
                    const tabs = Math.abs(indentationDiff) / TAB_LENGTH;
                    errorMessage += `(or ${tabs} ${tabs == 1 ? "tab" : "tabs"}) `;
                }
                    
                errorMessage += `to the ${indentationDiff > 0 ? "right." : "left."} \n`;
            }

            if (line.isStrayClosingBracket) {
                errorMessage += 
                    `  - This line appears to contain a stray closing bracket, ` 
                    + `which does not match to an opening bracket.\n`
            }

            // if (line.isNearMissingClosingTags) {
            //     errorMessage += 
            //         `  - This line is near where a missing closing tag is expected.\n`;
            // }

            if (line.isExcessLineSpace) {
                errorMessage += 
                    `  - More than one consecutive line of empty space is excessive; `
                    + `this line of code can be removed.\n`;
            }

            if (line.exceedsCharLimit) {
                errorMessage += 
                    `  - This line exceeds the ${LINE_CHAR_LIMIT} character limit.\n`;
            }
        }
        line.errorMessage = errorMessage;

        let rawInputContent = "";
        rawInputContent += `<div class='line ${line.hasDirtyCode ? " dirty" : ""}' title='${errorMessage}' data-line-number='${line.lineNumber}' data-matching-line-number='${line.matchingLineNumber ? line.matchingLineNumber : 0}'>`;
        rawInputContent += "<div class='lineNumber'>" + line.lineNumber + "</div>";
        rawInputContent += "<div class='lineContent'>";
        for (let j = 0; j < line.actualIndentation; j++) {
            if (indentationDiff != 0 && !line.isEmpty) {
                if (j < line.idealIndentation) {
                    rawInputContent += "<span class='goodIndent'>&nbsp;</span>";
                } else {
                    rawInputContent += "<span class='badIndent'>&nbsp;</span>";
                }
            } else {
                rawInputContent += "&nbsp;";
            }
        }
        if (indentationDiff > 0 && !line.isEmpty) {
            let badIndentCode = trimmedRawInputWithCharLimit.slice(0, indentationDiff);
            let remainingCode = trimmedRawInputWithCharLimit.slice(indentationDiff);
            rawInputContent += "<span class='fixIndent'>" + convertStringToEscapedHTML(badIndentCode) + "</span>";
            rawInputContent += convertStringToEscapedHTML(remainingCode);
        } else {
            rawInputContent += convertStringToEscapedHTML(trimmedRawInputWithCharLimit) + "</div>";
        }
        rawInputContent += "</div>";
        
        rawInputElement.innerHTML += rawInputContent;


        let paddedTrimmedInput = line.trimmedInput.padEnd(
            LINE_CHAR_LIMIT - line.idealIndentation, 
            ' ',
        );
        let trimmedInputWithCharLimit = 
            paddedTrimmedInput.slice(0, LINE_CHAR_LIMIT - line.idealIndentation) 
            + '|' 
            + paddedTrimmedInput.slice(LINE_CHAR_LIMIT - line.idealIndentation);
        
        let cleanedInputContent = "";
        cleanedInputContent += `<div class='line ${line.hasDirtyCode ? " dirty" : ""}' title='${errorMessage}' data-line-number='${line.lineNumber}' data-matching-line-number='${line.matchingLineNumber ? line.matchingLineNumber : 0}'>`;
        cleanedInputContent += "<div class='lineNumber'>" + line.lineNumber + "</div>";
        cleanedInputContent += "<div class='lineContent'>";
        for (let j = 0; j < line.idealIndentation; j++) {
            if (indentationDiff != 0 && !line.isEmpty) {
                cleanedInputContent += "<span class='goodIndent'>&nbsp;</span>";
            } else {
                cleanedInputContent += "&nbsp;";
            }
        }
        cleanedInputContent += convertStringToEscapedHTML(trimmedInputWithCharLimit) + "</div>";
        cleanedInputContent += "</div>";

        cleanedInputElement.innerHTML += cleanedInputContent;
    }

    const dirtyCodeCountElement = document.getElementById("dirtyCodeCount");
    const badIndentationCountElement = document.getElementById("badIndentationCount");
    const dirtyPercentElement = document.getElementById("dirtyPercent");
    const issuesListElement = document.getElementById("issuesList");

    let dirtyLines = lineObjects.filter(line => line.hasDirtyCode);
    dirtyCodeCountElement.innerHTML = dirtyLines.length;
    badIndentationLines = dirtyLines.filter(line => line.indentationDiff != 0 && !line.isEmpty);
    badIndentationCountElement.innerHTML = badIndentationLines.length;
    dirtyPercentElement.innerHTML = (dirtyLines.length / lineObjects.length * 100).toFixed(2);

    let newIssuesListHTML = "";
    for (const line of dirtyLines) {
        newIssuesListHTML += 
            `<div class='issue'>${convertStringToEscapedHTML(line.errorMessage, false)}</div>`;
    }
    issuesListElement.innerHTML = newIssuesListHTML;


    let lineElements = document.getElementsByClassName("line");
    for (const lineElement of lineElements) {
        if (lineElement.dataset.matchingLineNumber != 0) {
            lineElement.onmouseover = (element) => {
                const twins = document.querySelectorAll(`[data-line-number="${lineElement.dataset.lineNumber}"]`);
                const spouses = document.querySelectorAll(`[data-line-number="${lineElement.dataset.matchingLineNumber}"]`);

                Array.from(lineElements).forEach(ln => ln.classList.remove("areMarried"));
                twins.forEach(twin => twin.classList.add("areMarried"));
                spouses.forEach(spouse => spouse.classList.add("areMarried"));
            };
            lineElement.onmouseout = (element) => {
                Array.from(lineElements).forEach(ln => ln.classList.remove("areMarried"));
            };
        }
    }

    reportElement.classList.remove("hide");
    reportElement.classList.add("fadeIn");

    console.log(lineObjects);
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