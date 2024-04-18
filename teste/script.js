document.addEventListener('DOMContentLoaded', function() {
    const newNoteButton = document.getElementById('new-note-button');
    const toggleViewButton = document.getElementById('toggle-view-button');
    const noteInput = document.getElementById('note-input');
    const notePreview = document.getElementById('note-preview');
    const notesList = document.getElementById('notes-list');
    let editing = true;

    // Função para alternar entre a edição e a visualização da nota
    function toggleView() {
        editing = !editing;
        if (editing) {
            noteInput.style.display = 'block';
            notePreview.style.display = 'none';
            toggleViewButton.textContent = 'Alternar para Visualização';
        } else {
            noteInput.style.display = 'none';
            notePreview.style.display = 'block';
            toggleViewButton.textContent = 'Alternar para Edição';
            renderPreview();
        }
    }

    // Função para renderizar a visualização Markdown em tempo real
    function renderPreview() {
        const converter = new showdown.Converter();
        const noteContent = noteInput.value;
        const html = converter.makeHtml(noteContent);
        notePreview.innerHTML = html;
    }

    // Função para salvar a nota no localStorage
    function saveNote() {
        const noteContent = noteInput.value;
        localStorage.setItem('currentNote', noteContent);
        renderNotesList();
    }

    // Função para renderizar a lista de notas
    function renderNotesList() {
        notesList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const noteContent = localStorage.getItem(key);
            const listItem = document.createElement('li');
            listItem.textContent = noteContent.substring(0, 100); // Limitando a exibição a 30 caracteres
            listItem.addEventListener('click', function() {
                noteInput.value = noteContent;
                toggleView();
            });
            notesList.appendChild(listItem);
        }
    }

    // Event Listeners
    newNoteButton.addEventListener('click', function() {
        noteInput.value = '';
        toggleView();
    });

    toggleViewButton.addEventListener('click', toggleView);

    noteInput.addEventListener('input', function() {
        if (!editing) {
            renderPreview();
        }
    });

    window.addEventListener('beforeunload', saveNote);

    // Carregar a nota atual do localStorage quando a página é carregada
    const currentNote = localStorage.getItem('currentNote');
    if (currentNote) {
        noteInput.value = currentNote;
    }

    // Renderizar a lista de notas
    renderNotesList();
});