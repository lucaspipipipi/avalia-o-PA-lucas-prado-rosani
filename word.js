function formatText(command) {
    document.execCommand(command, false, null);
}

function justifyText(alignment) {
    document.execCommand('justify' + alignment, false, null);
}

function justifyTextFull() {
    document.execCommand('justifyFull', false, null);
}

function changeColor() {
    var color = document.getElementById('color-picker').value;
    document.execCommand('foreColor', false, color);
}

function insertList() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var selectedNode = range.commonAncestorContainer;

    var listNode = document.createElement('ol');
    listNode.appendChild(document.createElement('li'));
    listNode.appendChild(document.createElement('li'));

    range.deleteContents();
    range.insertNode(listNode);
}

function increaseFontSize() {
    var currentSize = window.getComputedStyle(document.getElementById('editor')).fontSize;
    var newSize = parseInt(currentSize) + 1;
    document.execCommand('fontSize', false, newSize);
}

function decreaseFontSize() {
    var currentSize = window.getComputedStyle(document.getElementById('editor')).fontSize;
    var newSize = parseInt(currentSize) - 1;
    document.execCommand('fontSize', false, newSize);
}