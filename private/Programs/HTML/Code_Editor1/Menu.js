



function loadDefault(){
    Show();
}

function Show(){
    const editor = {results:document.getElementById("result"), output:document.getElementById("output"), textbox:document.getElementById("tc")};
    
    showElement(results);
    showElement(output);
    showElement(textbox);
}

function showElement(element){
    element.style.display = "block";
}