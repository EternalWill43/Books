import { storageAvailable } from "./utility.js";

const cont = document.querySelector(".container");
const subbtn = document.querySelector('.subbtn');
const addbtn = document.querySelector(".add");
const formcontainer = document.querySelector(".formcontainer");
const cancelbutton = document.querySelector(".canbtn");
cancelbutton.addEventListener("click", () => {
    hideform();
}, {propagate: false});


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
}, {propagate: false});

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
    closebtn.textContent="Remove book";
    closebtn.addEventListener("click", () => {
        newbook.remove();
    }, {once: true, propagate: false});
    newbook.appendChild(newtitle);
    newbook.appendChild(newpages);
    newbook.appendChild(newlabel);
    newbook.appendChild(newread);
    newbook.appendChild(closebtn);
    cont.appendChild(newbook);
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

Book.prototype.info = function() {
    console.log(this.title);
}


addBookToLibrary("ISSTH", 2047, true);
addBookToLibrary("GOGF", 1000, false);


