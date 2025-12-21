var i=0;
//t.js
var p=document.getElementById("asciiOutput");
function translateAscii(input){
    /*unfinished old version.
    if(!input){
        alert(input);
        return '';
    }
    for(i=0;i<input.length;i++){
        
        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="B"){
            p.textContent+="01000010";
        }        if(input[i]==="C"){
            p.textContent+="01000011";
        }        if(input[i]==="D"){
            p.textContent+="01000100";
        }        if(input[i]==="E"){
            p.textContent+="01000101";
        }        if(input[i]==="F"){
            p.textContent+="01000001";
        }        if(input[i]==="G"){
            p.textContent+="01000001";
        }        if(input[i]==="H"){
            p.textContent+="01000001";
        }        if(input[i]==="I"){
            p.textContent+="01000001";
        }        if(input[i]==="J"){
            p.textContent+="01000001";
        }        if(input[i]==="K"){
            p.textContent+="01000001";
        }        if(input[i]==="L"){
            p.textContent+="01000001";
        }        if(input[i]==="M"){
            p.textContent+="01000001";
        }        if(input[i]==="N"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
        }        if(input[i]==="A"){
            p.textContent+="01000001";
}}*/
    const p = document.getElementById("asciiOutput");
    p.textContent = '';

    if (!input) {
        alert("No input provided!");
        return '';
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i].toUpperCase();
        const code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            const binary = code.toString(2).padStart(8, '0');
            p.textContent += binary;
        } else {
            p.textContent += '[?]';
        }
    }
}
function bin(binaryStr) {
    const output = document.getElementById("asciiOutput");
    output.textContent = '';

    
    binaryStr = binaryStr.replace(/[^01]/g, '');

    if (binaryStr.length % 8 !== 0) {
        output.textContent = '[Invalid binary input]';
        return;
    }

    let result = '';

    for (let i = 0; i < binaryStr.length; i += 8) {
        const byte = binaryStr.slice(i, i + 8);
        const charCode = parseInt(byte, 2);
        result += String.fromCharCode(charCode);
    }

    output.textContent = result;
}
export function copyToClipboard(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const text = el.textContent || el.value;
    if (!text) {
        alert("Nothing to copy.");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            
        })
        .catch((err) => {
            console.error("Clipboard error:", err);
            alert("Failed to copy.");
        });
}
