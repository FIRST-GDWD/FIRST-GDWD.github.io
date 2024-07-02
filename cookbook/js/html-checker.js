const htmlInput = document.getElementById("html-input");
const submitButton = document.getElementById("submit");
const rawInputElement = document.getElementById("rawInput");
const cleanedInputElement = document.getElementById("cleanedInput");

submitButton.onclick = () => {
    const TAB_LENGTH = 4;
    const VOID_ELEMENTS = ["link", "meta", "img", "hr", "br"];
    const rawInputLines = htmlInput.value.split("\n");
    const lineObjects = [];
    let lastLineObject = null;
    for (let i = 0; i < rawInputLines.length; i++) {
        const rawInput = rawInputLines[i];
        const newLineObject = {};
        newLineObject.rawInput = rawInput;
        newLineObject.charCount = rawInput.length;
        newLineObject.trimmedInput = rawInput.trimStart();
        newLineObject.actualIndentation = 
            newLineObject.rawInput.length - newLineObject.trimmedInput.length;

        const tagNameRegex = /^<\s*([a-zA-Z0-9-]+)\b[^>]*/;
        const matches = newLineObject.trimmedInput.match(tagNameRegex);
        if (matches) {
            newLineObject.tagName = matches[1];
        } else {
            newLineObject.tagName = null;
        }

        const closingTagNameRegex = /<\/\s*([a-zA-Z0-9-]+)\s*>$/;
        const closingTagMatches = 
            newLineObject.trimmedInput.match(closingTagNameRegex);
        if (closingTagMatches) {
            newLineObject.closingTagName = closingTagMatches[1];
        } else {
            newLineObject.closingTagName = null;
        }

        newLineObject.isVoidElement = VOID_ELEMENTS.includes(newLineObject.tagName);

        const incompleteTagRegex = /<[^>]*$/;
        newLineObject.isTagIncomplete = 
            incompleteTagRegex.test(newLineObject.trimmedInput);
        
        const hasAttributeRegex = /\b[a-zA-Z0-9-]+="[^"]*"/;
        newLineObject.containsAttribute = hasAttributeRegex.test(newLineObject.trimmedInput);

        // TODO: if incomplete tag and has attributes, flag for dirty code

        // TODO: need to track if opening/closing tags are matched up;
        //      carla's Themed Gallery example was missing closing divs.
        //      maybe use a stack to keep track of opening tags,
        //      and pop them off when finding a matching closing tag?

        let indentation = 0;
        if (lastLineObject) {
            debugger;
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
                    and is not a void element
                    and does not have a closing tag
                    and (
                        the current line does not have a closing tag
                        or it does but it doesn't match the previous line's opening tag
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
            }
        }
        newLineObject.idealIndentation = indentation;

        lineObjects.push(newLineObject);
        lastLineObject = newLineObject;
    }

    rawInputElement.innerHTML = "";
    cleanedInputElement.innerHTML = "";
    for (let i = 0; i < lineObjects.length; i++) {
        const line = lineObjects[i];

        let rawInputContent = "";
        rawInputContent += "<div class='line'>";
        rawInputContent += "<div class='lineNumber'>" + (i+1) + "</div>";
        rawInputContent += "<div class='lineContent'>" + convertStringToEscapedHTML(line.rawInput) + "</div>";
        rawInputContent += "</div>";
        
        rawInputElement.innerHTML += rawInputContent;
        
        let cleanedInputContent = "";
        cleanedInputContent += "<div class='line'>";
        cleanedInputContent += "<div class='lineNumber'>" + (i+1) + "</div>";
        cleanedInputContent += "<div class='lineContent'>";
        for (let j = 0; j < line.idealIndentation; j++) {
            cleanedInputContent += "&nbsp;";
        }
        cleanedInputContent += convertStringToEscapedHTML(line.trimmedInput) + "</div>";
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
        .replace(/ /g, "<span class='space'>&nbsp;</span>")
        .replace(/\n/g, "<br>")
        .replace(/&lt;!--/g, "<span class='comment'>&lt;!--")
        .replace(/--&gt;/g, "--&gt;</span>")
        .replace(/&lt;(?!!--)/g, "<span class='tag'>&lt;")
        .replace(/(?!--)&gt;/g, "&gt;</span>")
        .replace(/\/\*/g, "<span class='comment'>/*")
        .replace(/\*\//g, "*/</span>")
        .replace(/{/g, "<span class='cssBlock'>{")
        .replace(/}/g, "}</span>")
        .replace(/(?<![&<]nbsp|[&<]lt|[&<]gt|[&<]copy|[&<]amp);/g, "<span class='terminator'>;</span>")
        .replace(/(?<=(<span class='space'>&nbsp;<\/span>){2,})([a-zA-Z])/g, `<span class='newProperty'></span>$2`)
        .replace(/(?<=<span class='space'>&nbsp;<\/span>)([a-zA-Z0-9'""])/g, `<span class='textStart'></span>$1`);
}