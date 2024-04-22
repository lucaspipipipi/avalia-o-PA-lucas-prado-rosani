// word.js

function formatText(command) {
    document.execCommand(command, false, null);
}

function justifyText(alignment) {
    document.execCommand('justify' + alignment, false, null);
}

function justifyTextFull() {
    document.execCommand('justifyFull', false, null);
}

// muda de cor 
function changeColor() {
    var color = document.getElementById('color-picker').value;
    document.execCommand('foreColor', false, color);
}
// função de criar lista 
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
// aumentar fonte
function increaseFontSize() {
    var currentSize = window.getComputedStyle(document.getElementById('editor')).fontSize;
    var newSize = parseInt(currentSize) + 1;
    document.execCommand('fontSize', false, newSize);
}
// diminuir fonte
function decreaseFontSize() {
    var currentSize = window.getComputedStyle(document.getElementById('editor')).fontSize;
    var newSize = parseInt(currentSize) - 1;
    document.execCommand('fontSize', false, newSize);
}

// função para inserir titulo
function insertTitle() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var titleNode = document.createElement('h1');
    titleNode.textContent = "Título";
    range.deleteContents();
    range.insertNode(titleNode);
}

// função para inserir subtitulo
function insertSubtitle() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var subtitleNode = document.createElement('h2');
    subtitleNode.textContent = "Subtítulo";
    range.deleteContents();
    range.insertNode(subtitleNode);
}

// função para salvar o conteudo no localStorage
function saveContent() {
    var content = document.getElementById('editor').innerHTML;
    var fileName = document.getElementById('txtFileName').value || "documento";
    localStorage.setItem(fileName, content);
    updateSavedFilesList();
}

// função para carregar o conteudo salvo do localStorage
function loadSavedFile() {
    var selectedFileName = document.getElementById('saved-files').value;
    var content = localStorage.getItem(selectedFileName);
    document.getElementById('editor').innerHTML = content;
}

// função para carregar um arquivo local
function loadFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var content = e.target.result;
        document.getElementById('editor').innerHTML = content;
    };
    reader.readAsText(file);
}

// função para salvar como arquivo de texto .txt
function saveAsTxt() {
    var content = document.getElementById('editor').innerText;
    var fileName = document.getElementById('txtFileName').value || "documento";
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName + ".txt";
    a.click();
    window.URL.revokeObjectURL(url);
}

// função para excluir um arquivo do localStorage
function deleteFile() {
    var selectedFileName = document.getElementById('saved-files').value;
    localStorage.removeItem(selectedFileName);
    updateSavedFilesList();
}

// atualiza a lista de arquivos salvos
function updateSavedFilesList() {
    var savedFilesSelect = document.getElementById('saved-files');
    savedFilesSelect.innerHTML = '<option selected disabled>Carregar arquivo</option>';
    for (var i = 0; i < localStorage.length; i++) {
        var fileName = localStorage.key(i);
        savedFilesSelect.innerHTML += '<option value="' + fileName + '">' + fileName + '</option>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateSavedFilesList();
});

// Captura o evento de colagem
document.getElementById('editor').addEventListener('paste', function(event) {
    // prevenir o comportamento padrão de colagem
    event.preventDefault();

    // obter o conteúdo colado como texto
    var pastedText = (event.originalEvent || event).clipboardData.getData('text/plain');

    // criar um elemento temporario para manipulação
    var tempElement = document.createElement('div');

    // aplicar estilos ao elemento temporário
    tempElement.style.backgroundColor = '#c8eaf8'; 
    tempElement.style.padding = '10px'; 

    // definir o conteudo colado no elemento temporário
    tempElement.textContent = pastedText;

    // limpar o conteudo atual do editor
    document.getElementById('editor').innerHTML = '';

    // colar o conteudo estilizado no editor
    document.getElementById('editor').appendChild(tempElement);
});
