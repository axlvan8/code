

            var htmlStart = '<!DOCTYPE html><html><body><p id="a"></p><canvas id="canvas" width="800" height="800"></canvas><script>window.onerror = function(message, src, line, col, err){alert("Error:"+ message);}try{'
                document.addEventListener("keydown", (e) => {
                   if(e.ctrlKey && (e.key == "r" || e.key == "R")){
                        document.getElementById("run").click();
                   }
                   if(e.ctrlKey && (e.key == "s" || e.key == "S")){
                        document.getElementById("save").click();
                   }
                })
            function a(){
                const code = document.getElementById("tc").value;
                
                const ifr = document.getElementById("sandbox");
                    if(!code.trim()){
                    alert("Error")
                    return;
                }
                
               
                const html = `
                    ${htmlStart}
                    ${code}
                    }catch(e){
                    alert('Error:'+ e.message);
                    throw new Error(e.message);
                    document.getElementById("a").textContent = e.message;
                    console.log(e.message)
                }
                <\/script>
                
                </body>
                </html>
            `
           
            ifr.srcdoc = html;
            
                
            }
            function deleteProject(name) {
    // Remove the item from the browser's storage
    localStorage.removeItem("project_" + name);
    
    // Refresh the list on the screen so it disappears
    loadProjects();
}
           function save(){
            const name = document.getElementById("pn").value.trim();
            const code = document.getElementById("tc").value;
            if(!name){
                throw new Error("Name is required");
                return;
            }
            localStorage.setItem("project_"+ name, code);
           }
            function loadProjects() {
                const list = document.getElementById("projectlist");
                 list.innerHTML = '';
                 for (let i = 0; i < localStorage.length; i++) {
                 const key = localStorage.key(i);
                if (key.startsWith("project_")) {
                   const projectName = key.replace("project_", "");
     
                    const li = document.createElement("li");
                   li.style.display = "flex";
                     li.style.justifyContent = "space-between";
                     li.style.alignItems = "center";
     
                     const span = document.createElement("span");
                    span.textContent = projectName;
                    span.style.cursor = "pointer";
                     span.onclick = () => {
                       document.getElementById("pn").value = projectName;
                       document.getElementById("tc").value = localStorage.getItem(key);
                     };
     
                    const delBtn = document.createElement("button");
                   delBtn.textContent = "Delete";
                   delBtn.title = "Delete project";
                   delBtn.style.marginLeft = "10px";
                    delBtn.style.background = "none";
                   delBtn.style.border = "none";
                    delBtn.style.cursor = "pointer";
                  delBtn.style.color = "red";
                   delBtn.onclick = (e) => {
                     e.stopPropagation();
                       deleteProject(projectName);
                  };

                    li.appendChild(span);
                  li.appendChild(delBtn);
                  list.appendChild(li);
                 }
               }
               }
     





function loadDefault(){
    Show();
}

function loadBeginner(){
    Show();
}

function Show(){
    const editor = document.getElementById("Editor")
    const menu = document.getElementById("menu")
    menu.style.display = "none"
    showElement(editor);
}

function showElement(element){
    element.style.display = "block";
}



              loadProjects();