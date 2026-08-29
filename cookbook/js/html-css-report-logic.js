let htmlDirtyLines = 0;
let htmlTotalLines = 0;
let cssDirtyLines = 0;
let cssTotalLines = 0;

function updateHTMLStats(dirtyLineCount, totalLineCount) {
    htmlDirtyLines = dirtyLineCount;
    htmlTotalLines = totalLineCount;
    rerenderOverallStats();
}

function updateCSSStats(dirtyLineCount, totalLineCount) {
    cssDirtyLines = dirtyLineCount;
    cssTotalLines = totalLineCount;
    rerenderOverallStats();
}

function rerenderOverallStats() {
    const totalLines = htmlTotalLines + cssTotalLines;
    if (totalLines == 0) return;

    const totalDirtyLines = htmlDirtyLines + cssDirtyLines;
    const overallPercentElement = 
        document.getElementById("dirtyPercentOverall");

    overallPercentElement.innerHTML = 
        (totalDirtyLines / totalLines * 100).toFixed(2);
}