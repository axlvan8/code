function storeName(){
    var username = document.getElementById("username").value;
    if(username === "null" || username ===""){
        return false;
    }
    localStorage.setItem("user", username);
    document.getElementById("username").value = "";
    document.getElementById("leg").innerHTML ="\"" + localStorage.getItem("user") + "\" is Stored";
}
function recallName(){
    if(localStorage.getItem("user") === null){
        document.getElementById("username").value = "";
        document.getElementById("leg").innerHTML ="Stored name is\"" + localStorage.getItem("user") + "\"";
    }
}
function removeName(){
    if(localStorage.getItem("user") === null){
        return false;
    }
    document.getElementById("leg").innerHTML = "\"" + localStorage.getItem("user") + "\" is removed";
    localStorage.removeItem("user");
    document.getElementById("username").value = "";
}