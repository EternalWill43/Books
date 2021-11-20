import { storageAvailable } from "./utility.js";
var count = 201;
var ycount = 0;
const cont = document.querySelector(".container");
const subbtn = document.querySelector('.subbtn');
const addbtn = document.querySelector(".add");
const formcontainer = document.querySelector(".formcontainer");
const cancelbutton = document.querySelector(".canbtn");

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
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

function changeBookStyle(e, b) {
    if (e.checked) {
        b.classList.remove("book");
        b.classList.add("finbook");
    } else {
        b.classList.add("book");
        b.classList.remove("finbook");
    }
}

formcontainer.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        handleSubmit();
        clearform();
        hideform();
    }
});

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
    newread.addEventListener("change", () => { changeBookStyle(newread, newbook) });
    if (ele.read) {
        newread.checked = true;
        newbook.classList.remove("book");
        newbook.classList.add("finbook");
    }
    newread.setAttribute("id", id);
    let newlabel = document.createElement("label");
    newlabel.setAttribute("for", id);
    newlabel.textContent = "Read: ";
    newread.textContent = "Read: ";
    let closebtn = document.createElement("button");
    closebtn.classList.add("clb");
    closebtn.textContent = "Remove book";
    console.log(newread);
    closebtn.addEventListener("click", () => {
        newbook.remove();
    }, { once: true, propagate: false });
    newbook.appendChild(newtitle);
    newbook.appendChild(newpages);
    newbook.appendChild(newlabel);
    newbook.appendChild(newread);
    newbook.appendChild(closebtn);
    cont.appendChild(newbook);
    if (newbook.id > 1) {
        let w = cont.offsetWidth
        if (count + 201 >= w) {
            count = 0;
            ycount += 210;
        }
        newbook.style.transform = `translate3d(${count}px, ${ycount}px, 0px)`;
        count += 201;
    }
    myLibrary.push(ele);
    localStorage.setItem(id, JSON.stringify(ele));
    dragElement(newbook);
}

if (storageAvailable('localStorage')) {
    console.log("Storage available");
}

function Book(t, p, r) {
        this.title = t,
        this.pages = p,
        this.read = r
}

Book.prototype.info = function () {
    console.log(this.title);
}

function parseStorage() {
    let arr = Object.keys(localStorage);
    console.log("Keys: " + arr.length);
    for (let i = 0; i < arr.length; i++) {
        let temp = JSON.parse(localStorage[arr[i]]);
        console.log(temp);
        addBookToLibrary(temp.title, temp.pages, temp.read);
    }
}

function onLoad() {
    console.log("Items in storage: " + localStorage.length);
    parseStorage();
}

onLoad();



