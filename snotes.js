    // escrever nas div
    function escreverNaDiv(divId) {
        var textareaId = "textarea" + divId.charAt(0).toUpperCase() + divId.slice(1);
        var textarea = document.getElementById(textareaId);
    
        if (textarea) {
            textarea.value = textarea.value + "\n" + document.getElementById("input" + divId.charAt(0).toUpperCase() + divId.slice(1)).value;
            document.getElementById("input" + divId.charAt(0).toUpperCase() + divId.slice(1)).value = "";
        } else {
            console.error("Textarea não encontrado.");
        }
    }

