// Initialization
// --------------------------------------------------------------
const listDOM = document.querySelector("#list");

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  let listItemDOM = document.createElement("li");
  listItemDOM.innerHTML =
    `<span style="color: darkred; font-weight: bold">${key}</span>` +
    `<button class="close" style="height: 100%; width: 50px;">
      <i class="fa-solid fa-xmark"></i>
    </button>`;
  if (localStorage.getItem(key).includes("checked")) {
    listItemDOM.classList.add("checked");
  }
  listDOM.appendChild(listItemDOM);
}

// Adding "checked" class to the clicked list Elements
// --------------------------------------------------------------
let listItemDOM = document.querySelectorAll("#list > li");
listItemDOM.forEach((value) => value.addEventListener("click", listItemClick));

function listItemClick() {
  if (this.className.includes("checked")) {
    this.classList.remove("checked");
    let tempItem = JSON.parse(localStorage.getItem(`${this.innerText}`));
    if (tempItem) {
      tempItem.isChecked = "";
      localStorage.setItem(`${this.innerText}`, JSON.stringify(tempItem));
    }
  } else {
    this.classList.add("checked");
    let tempItem = JSON.parse(localStorage.getItem(`${this.innerText}`));
    if (tempItem) {
      tempItem.isChecked = "checked";
      localStorage.setItem(`${this.innerText}`, JSON.stringify(tempItem));
    }
  }
}

// Adding close button to the list Elements
// --------------------------------------------------------------
listItemDOM.forEach(
  (value) =>
    (value.innerHTML =
      value.innerHTML +
      `<button class="close" style="height: 100%; width: 50px;">
        <i class="fa-solid fa-xmark"></i>
      </button>`)
);

let closeButtonDOM = document.querySelectorAll("#list > li > button");
closeButtonDOM.forEach((value) => value.addEventListener("click", closeButtonClick));

function closeButtonClick() {
  listDOM.removeChild(this.parentNode);
  localStorage.removeItem(this.parentNode.innerText.trim());
}

// Adding new li elements to the dynamic list array
// --------------------------------------------------------------
function newElement() {
  const inputDOM = document.querySelector("#task");
  const listItemNewDOM = document.createElement("li");

  if (inputDOM.value.trim()) {
    listItemNewDOM.innerHTML =
      `<span style="color: darkred; font-weight: bold">${inputDOM.value}</span>` +
      `<button class="close" style="height: 100%; width: 50px;">
        <i class="fa-solid fa-xmark"></i>
      </button>`;
    listDOM.appendChild(listItemNewDOM);

    // Adding to the local storage
    // ----------------------------------------------------------
    const userKey = inputDOM.value;
    const epochTime = new Date().getTime();
    const userItem = { epochTime: `${epochTime}`, isChecked: `${listItemNewDOM.className}` };
    localStorage.setItem(userKey, JSON.stringify(userItem));

    const toastSuccess = new bootstrap.Toast(document.querySelector("#liveToastSuccess"));
    toastSuccess.show();
  } else {
    const toastError = new bootstrap.Toast(document.querySelector("#liveToastError"));
    toastError.show();
  }

  listItemDOM = document.querySelectorAll("#list > li");
  listItemDOM.forEach((value) => value.addEventListener("click", listItemClick));
  closeButtonDOM = document.querySelectorAll("#list > li > button");
  closeButtonDOM.forEach((value) => value.addEventListener("click", closeButtonClick));

  return listItemDOM, closeButtonDOM;
}
