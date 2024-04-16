
// escrever nas div
function escreverNaDiv(divId) {
    var inputId = "input" + divId.charAt(0).toUpperCase() + divId.slice(1);
    var input = document.getElementById(inputId);
    var div = document.querySelector("." + divId);

    if (input && div) {
        div.innerHTML = input.value;
    } else {
        console.error("Input ou div não encontrados.");
    }
}