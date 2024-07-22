const htmlInput = document.getElementById("html-input");
const submitButton = document.getElementById("submit");
const rawInputElement = document.getElementById("rawInput");
const cleanedInputElement = document.getElementById("cleanedInput");

submitButton.onclick = () => {
    const TAB_LENGTH = 4;
    const VOID_ELEMENTS = ["link", "meta", "img", "hr", "br"];
    const rawInputLines = htmlInput.value.split("\n");
    const lineObjects = [];
    const parentStack = [];
    let lastLineObject = null;
    for (let i = 0; i < rawInputLines.length; i++) {
        const rawInput = rawInputLines[i];
        const newLineObject = {};
        newLineObject.rawInput = rawInput.trimEnd();
        newLineObject.charCount = rawInput.length;
        newLineObject.exceedsCharLimit = rawInput.length > 80;
        newLineObject.trimmedInput = rawInput.trimStart().trimEnd();
        newLineObject.isEmpty = newLineObject.trimmedInput.length == 0;
        newLineObject.actualIndentation = 
            newLineObject.rawInput.length - newLineObject.trimmedInput.length;

        const tagNameRegex = /^<\s*([a-zA-Z0-9-]+)\b[^>]*/;
        const matches = newLineObject.trimmedInput.match(tagNameRegex);
        if (matches) {
            newLineObject.tagName = matches[1].toLowerCase();
        } else {
            newLineObject.tagName = null;
        }

        const closingTagNameRegex = /<\/\s*([a-zA-Z0-9-]+)\s*>$/;
        const closingTagMatches = 
            newLineObject.trimmedInput.match(closingTagNameRegex);
        if (closingTagMatches) {
            newLineObject.closingTagName = closingTagMatches[1].toLowerCase();
        } else {
            newLineObject.closingTagName = null;
        }

        newLineObject.isVoidElement = VOID_ELEMENTS.includes(newLineObject.tagName);

        

        if (newLineObject.tagName && !newLineObject.closingTagName && !newLineObject.isVoidElement) {
            parentStack.push(newLineObject);
        }

        const incompleteTagRegex = /<[^>]*$/;
        newLineObject.isTagIncomplete = 
            incompleteTagRegex.test(newLineObject.trimmedInput);
        
        const hasAttributeRegex = /\b[a-zA-Z0-9-]+="[^"]*"/;
        newLineObject.containsAttribute = hasAttributeRegex.test(newLineObject.trimmedInput);

        newLineObject.hasDirtyAttributes = newLineObject.isTagIncomplete && newLineObject.containsAttribute;

        const containsCapsRegex = /<\/?[a-zA-Z0-9-]*[A-Z][a-zA-Z0-9-]*[^>]*>/;
        newLineObject.hasCaps = containsCapsRegex.test(newLineObject.trimmedInput);

        // TODO: need to track if opening/closing tags are matched up;
        //      accounted for missing closing divs...but what about extra ones?
        //      e.g. https://github.com/CarlaC2024/CarlaC2024.github.io/blob/main/projects/Portfolio/index.html

        
        let indentation = 0;
        let foundMatchedParent = false;
        let isStrayClosingTag = false;
        if (!newLineObject.tagName && newLineObject.closingTagName) {
            let parentsPoppedCount = 0;
            while(!foundMatchedParent && parentStack.length > 0) {
                const poppedParent = parentStack.pop();
                parentsPoppedCount++;
                if (poppedParent.tagName == newLineObject.closingTagName) {
                    indentation = poppedParent.idealIndentation;
                    foundMatchedParent = true;
                    if (parentsPoppedCount > 1) {
                        newLineObject.isNearMissingClosingTags = true;
                    }
                } else if (parentStack.length == 0) {
                    indentation = newLineObject.actualIndentation;
                    isStrayClosingTag = true;
                    newLineObject.isStrayClosingTag = true;
                }
            }
        }
        
        if (!foundMatchedParent && !isStrayClosingTag && lastLineObject) {
            // debugger;
            if (
                (
                    lastLineObject.isVoidElement 
                    && lastLineObject.isTagIncomplete
                    && !newLineObject.tagName
                    && newLineObject.containsAttribute
                ) 
                || (
                    lastLineObject.isVoidAttribute
                    && !lastLineObject.trimmedInput.startsWith('>')
                )
            ) {
                newLineObject.isVoidAttribute = true;
            }
            /*
                If the last line has an opening tag
                    and is not a void element (or is an incomplete opening tag)
                    and does not have a closing tag
                    and (
                        the current line does not have a closing tag
                        or (it does but) it has its own opening tag
                        or it doesn't match the previous line's opening tag
                         
                    )
                OR
                    if the last line starts with a >
            */
            if (
                (
                    lastLineObject.tagName 
                    && (
                        !lastLineObject.isVoidElement
                        || lastLineObject.isTagIncomplete
                    )
                    && !lastLineObject.closingTagName 
                    && (
                        newLineObject.closingTagName == null
                        || newLineObject.tagName
                        || newLineObject.closingTagName != lastLineObject.tagName
                    )
                )
                || (
                    lastLineObject.trimmedInput.startsWith('>')
                    && !lastLineObject.isVoidAttribute
                )
            ) {
                indentation = lastLineObject.idealIndentation + TAB_LENGTH;
            // should this check if the closing tag matches the previous parent?
            } else if (
                (!newLineObject.tagName && newLineObject.closingTagName)
                || newLineObject.trimmedInput.startsWith('>')
            ) {
                indentation = lastLineObject.idealIndentation - TAB_LENGTH;
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

        let paddedRawTrimmedInput = line.trimmedInput.padEnd(80 - line.actualIndentation, ' ');
        let trimmedRawInputWithCharLimit = 
            paddedRawTrimmedInput.slice(0, 80 - line.actualIndentation) 
            + '|' 
            + paddedRawTrimmedInput.slice(80 - line.actualIndentation);

        let indentationDiff = line.idealIndentation - line.actualIndentation;

        const hasDirtyCode = 
            (indentationDiff != 0 && !line.isEmpty)
            || line.isStrayClosingTag
            || line.isNearMissingClosingTags
            || line.hasDirtyAttributes
            || line.hasCaps
            || line.isExcessLineSpace
            || line.exceedsCharLimit;

        let errorMessage = ""
        if (hasDirtyCode) {
            errorMessage += `Line ${i+1} has the following clean code issues:\n`;
            if (indentationDiff != 0 && !line.isEmpty) {
                errorMessage += 
                    `    Line should be ${indentationDiff > 0 ? "indented " : "outdented "}`
                    + `${Math.abs(indentationDiff)} spaces `;
                
                if (indentationDiff % TAB_LENGTH == 0) {
                    const tabs = Math.abs(indentationDiff) / TAB_LENGTH;
                    errorMessage += `(or ${tabs} ${tabs == 1 ? "tab" : "tabs"}) `;
                }
                    
                errorMessage += `to the ${indentationDiff > 0 ? "right." : "left."} \n`;
            }
        }

        let rawInputContent = "";
        rawInputContent += "<div class='line' title='" + errorMessage + "'>";
        rawInputContent += "<div class='lineNumber" + (hasDirtyCode ? " dirty" : "") + "'>" + (i+1) + "</div>";
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


        let paddedTrimmedInput = line.trimmedInput.padEnd(80 - line.idealIndentation, ' ');
        let trimmedInputWithCharLimit = 
            paddedTrimmedInput.slice(0, 80 - line.idealIndentation) 
            + '|' 
            + paddedTrimmedInput.slice(80 - line.idealIndentation);
        
        let cleanedInputContent = "";
        cleanedInputContent += "<div class='line' title='" + errorMessage + "'>";
        cleanedInputContent += "<div class='lineNumber" + (hasDirtyCode ? " dirty" : "") + "'>" + (i+1) + "</div>";
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

    console.log(lineObjects);
}

function convertStringToEscapedHTML(stringWithNormalSpaces) {
    return stringWithNormalSpaces
        .replace(/&nbsp;/g, "&amp;nbsp;")
        .replace(/&copy;/g, "&amp;copy;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/\n/g, "<br>");
}