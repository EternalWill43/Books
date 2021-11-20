import { storageAvailable } from "./utility.js";
var isDown = false;
var dimensions;
var leftfin, topfin;
var count = 2;
const cont = document.querySelector(".container");
const subbtn = document.querySelector('.subbtn');
const addbtn = document.querySelector(".add");
const formcontainer = document.querySelector(".formcontainer");
const cancelbutton = document.querySelector(".canbtn");

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

cancelbutton.addEventListener("click", () => {
    hideform();
}, { propagate: false });


function handleSubmit() {
    let tit = document.getElementById('titleid').value;
    let pag = document.getElementById('pagesid').value;
    pag = parseInt(pag, 10);
    let rea = document.getElementById('readid').checked;
    addBookToLibrary(tit, pag, rea);
}

subbtn.addEventListener("click", () => {
    handleSubmit();
    clearform();
    hideform();
}, { propagate: false });

function clearform() {
    document.getElementById('titleid').value = "";
    document.getElementById('pagesid').value = "";
    document.getElementById('readid').checked = false;
    console.log("Cleared");
}

addbtn.addEventListener("click", () => {
    showform();
});

function showform() {
    formcontainer.style.display = "block";
}

function hideform() {
    formcontainer.style.display = "none";
}

function addFunc() {
    const formcontainer = document.createElement("div");

}

let myLibrary = [];

function addBookToLibrary(t, p, r) {
    const book = new Book(t, p, r);
    myLibrary.push(book);
    addBookToPage(book);
}
function addBookToPage(ele) {
    let newbook = document.createElement("div");
    newbook.classList.add("book");
    let id = myLibrary.length;
    newbook.setAttribute("id", id);
    let newtitle = document.createElement("div");
    newtitle.classList.add("booktitle");
    newtitle.textContent = ele.title;
    let newpages = document.createElement("div");
    newpages.classList.add("bookpages");
    newpages.textContent = ele.pages + " pages";
    let newread = document.createElement("input");
    newread.classList.add("bookread");
    newread.setAttribute("type", "checkbox");
    if (ele.read) newread.checked = true;
    newread.setAttribute("id", id);
    let newlabel = document.createElement("label");
    newlabel.setAttribute("for", id);
    newlabel.textContent = "Read: ";
    newread.textContent = "Read: ";
    let closebtn = document.createElement("button");
    closebtn.classList.add("clb");
    closebtn.textContent = "Remove book";
    closebtn.addEventListener("click", () => {
        newbook.remove();
    }, { once: true, propagate: false });
    newbook.appendChild(newtitle);
    newbook.appendChild(newpages);
    newbook.appendChild(newlabel);
    newbook.appendChild(newread);
    newbook.appendChild(closebtn);
    cont.appendChild(newbook);
    count += 2;
    dragElement(newbook);
}

if (storageAvailable('localStorage')) {
    console.log("Storage available");
}

class Book {
    constructor(t, p, r) {
        this.title = t;
        this.pages = p;
        this.read = r;
    }
}

Book.prototype.info = function () {
    console.log(this.title);
}


addBookToLibrary("ISSTH", 2047, true);
addBookToLibrary("GOGF", 1000, false);


