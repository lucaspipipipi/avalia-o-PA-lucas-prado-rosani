document.addEventListener("DOMContentLoaded", function() {
    const addContainerBtn = document.getElementById("addContainerBtn");
    const containers = document.getElementById("containers");

    // Adiciona um novo contêiner ao clicar no botão "Novo bloco de notas"
    addContainerBtn.addEventListener("click", function() {
        addContainer();
    });

    // Configura os botões de exclusão e torna os contêineres redimensionáveis e arrastáveis
    setupContainers();

    // Função para adicionar um novo contêiner
    function addContainer() {
        const newContainer = document.createElement("div");
        newContainer.classList.add("container");
        newContainer.innerHTML = `
            <div contenteditable="true" class="editable">Novo contêiner...</div>
            <button class="deleteBtn">Excluir</button>
        `;
        containers.appendChild(newContainer);
        setupDeleteButtons(); // Configura os botões de exclusão para os novos contêineres
        makeResizableDiv(newContainer); // Torna o contêiner redimensionável
        makeDraggable(newContainer); // Torna o contêiner arrastável
    }

    // Configura os botões de exclusão para todos os contêineres
    function setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                const container = button.parentElement;
                container.remove();
            });
        });
    }

    // Configura os contêineres existentes
    function setupContainers() {
        const existingContainers = document.querySelectorAll(".container");
        existingContainers.forEach(container => {
            setupDeleteButtons(); // Configura os botões de exclusão para os contêineres existentes
            makeResizableDiv(container); // Torna os contêineres redimensionáveis
            makeDraggable(container); // Torna os contêineres arrastáveis
        });
    }

    // Torna o contêiner redimensionável
    function makeResizableDiv(div) {
        const element = document.createElement('div');
        element.classList.add('resizer');
        div.appendChild(element);

        let isResizing = false;
        let lastDownX = 0;
        let lastDownY = 0;

        element.addEventListener('mousedown', function(event) {
            isResizing = true;
            lastDownX = event.clientX;
            lastDownY = event.clientY;
        });

        document.addEventListener('mousemove', function(event) {
            if (!isResizing)
                return;

            const width = div.offsetWidth + (event.clientX - lastDownX);
            const height = div.offsetHeight + (event.clientY - lastDownY);

            div.style.width = `${width}px`;
            div.style.height = `${height}px`;

            lastDownX = event.clientX;
            lastDownY = event.clientY;
        });

        document.addEventListener('mouseup', function() {
            isResizing = false;
        });
    }

    // Torna o contêiner arrastável
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});