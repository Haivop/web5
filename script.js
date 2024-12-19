window.onload = () => {
    const savedColor = localStorage.getItem("block6Color");
    const savedTable = localStorage.getItem("savedTableOG");
    const savedData = getCookie("minDigit");

    if (isMobile()){
        document.getElementById("formContainer").style.display = "block";
    }

    if (savedColor){
        document.getElementById("box6").style.color = localStorage.getItem("block6Color");
        document.getElementById("select").selectedIndex = localStorage.getItem("option")
    }

    if (savedTable) {
        document.getElementById("tableContainer").innerHTML += savedTable;
    }

    if (savedData) {
        const confirmKeep = confirm(`Збережено мінімальну цифру: ${savedData}. Зберегти дані?`);
        if (confirmKeep) {
            alert("Дані залишаються збереженими. Перезавантажте сторінку.");
        } 
        else {
            deleteCookie("minDigit");
            location.reload();
        }
    } 
    else {
        document.getElementById("min-digit-search").onsubmit = (e) => {
            e.preventDefault();
            const num = document.getElementById("number").value;
            const minDigit = Math.min(...num.split("").map(Number));
            alert(`Мінімальна цифра: ${minDigit}`);
            setCookie("minDigit", minDigit, 7);
        };
    }
};

function isMobile() {
    return window.innerWidth <= 768;
}

function CreateTable(){
    document.getElementById("tableContainer").innerHTML = '';

    const cellsCount = document.getElementById("cells").value;
    const table = document.createElement("table");
    table.id = "tableOG";

    const rows = cellsCount % 2 === 0 ? 2 : 1;
    let cellIndex = 0;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < Math.ceil(cellsCount / rows); j++) {
            if (cellIndex >= cellsCount) break;
            const cell = document.createElement("td");
            cell.contentEditable = "true";
            cell.innerText = `Cell ${++cellIndex}`;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    document.getElementById("tableContainer").appendChild(table);
    localStorage.setItem("savedTableOG", document.getElementById("tableContainer").outerHTML);
};

function SaveTable(){
    localStorage.setItem("savedTable", document.getElementById("tableContainer").outerHTML);
}

function LoadTable(){
    const savedTable = localStorage.getItem("savedTable");
    if (savedTable) {
        document.getElementById("tableContainer").innerHTML = '';
        document.getElementById("tableContainer").innerHTML += savedTable;
    }
}

function SwapText(){
    let temp = document.getElementById('header-text').innerHTML;
    document.getElementById('header-text').innerHTML = document.getElementById('box6-text').innerHTML;
    document.getElementById('box6-text').innerHTML = temp;
}

function ChangeColor(select){
    document.getElementById("box6").style.color = select.value;
    localStorage.setItem("block6Color", select.value);
    localStorage.setItem("option", select.selectedIndex);
}

function Trigger(){
    document.getElementById("formContainer").style.display = "none";
};

function Undo(){
    document.getElementById("formContainer").style.display = "block";
}

function HideShow(){
    if(isMobile()){
        if(document.getElementById("formContainer").style.display == "block")
            Trigger();
        else if(document.getElementById("formContainer").style.display == "none")
            Undo();
    }
}

function Calc(){
    let r = document.getElementById('radius').value;
    document.getElementById('result-calc').innerHTML = (Math.PI * r * r).toFixed(2);
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};`;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}
