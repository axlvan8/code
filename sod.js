function showTime() {
    document.getElementById('currentTime').innerHTML = new Date().toDateString();
    document.getElementById('didy').innerHTML = new Date().toString();
    document.getElementById('wert').innerHTML = new Date().toUTCString();
    document.getElementById('trew').innerHTML = new Date().toISOString();
}
showTime();
setInterval(function (){
    showTime();
}, 1000);

