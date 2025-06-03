const myLibrary = [];
// Function constructor for taking books's information
function Book(name, author, title, status, pages) {
  this.name = name;
  this.author = author;
  this.title = title;
  this.status = status;
  this.pages = pages;
  this.id = crypto.randomUUID();
}
Book.prototype.changeReadStatus = function () {
  if (this.status === "read") {
    this.status = "haven't read";
  } else if (this.status === "haven't read") {
    this.status = "read";
  }
};

//Function for displaying books's information in table and theirs buttons
const table = document.querySelector("table > tbody");
function displayBookInTable(book) {
  //create row for each book
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", book.id);
  table.appendChild(newRow);

  //create row cell for each value of book
  //create name cell
  const nameRow = document.createElement("td");
  nameRow.textContent = book.name;
  newRow.appendChild(nameRow);

  //crete author cell
  const authorRow = document.createElement("td");
  authorRow.textContent = book.author;
  newRow.appendChild(authorRow);

  //create title cell
  const titleRow = document.createElement("td");
  titleRow.textContent = book.title;
  newRow.appendChild(titleRow);

  //create status cell
  const statusRow = document.createElement("td");
  statusRow.textContent = book.status;
  newRow.appendChild(statusRow);
  //create pages cell
  const pagesRow = document.createElement("td");
  pagesRow.textContent = book.pages;
  newRow.appendChild(pagesRow);
  //create id cell
  const id = document.createElement("td");
  id.textContent = book.id;
  newRow.appendChild(id);
  //create "change read status" button
  const changeStatusButton = document.createElement("button");
  changeStatusButton.textContent = "Change status";
  newRow.appendChild(changeStatusButton);
  changeStatusButton.addEventListener("click", function () {
    book.changeReadStatus();
    statusRow.textContent = book.status;
  });
  //create remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove book";
  newRow.appendChild(removeButton);
  removeButton.addEventListener("click", function () {
    newRow.remove();
    const rowId = newRow.dataset.id;
    const index = myLibrary.findIndex((b) => b.id === rowId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
  });
}

//Function for refreshing user's input after add new book
function refreshUserInput() {
  bookName.value = "";
  author.value = "";
  title.value = "";
  bookStatus.value = "";
  pages.value = "";
}

//Display the form for user to add new Book
const dialog = document.querySelector("dialog");
const displayFormButton = document.querySelector(".new-book-button");
displayFormButton.addEventListener("click", function () {
  dialog.showModal();
});

// Prevent submit button's default . Instead, make the button send value to add new Book ,display Book info in table or close the form
const bookName = document.querySelector("#name");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const bookStatus = document.querySelector("#status");
const pages = document.querySelector("#pages");

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", function (event) {
  event.preventDefault();
  dialog.close();
});

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    bookName.value === "" ||
    author.value === "" ||
    title.value === "" ||
    bookStatus.value === "" ||
    pages.value === ""
  ) {
    alert("Please fill the entire form!");
    return;
  }
  const myBook = new Book(
    bookName.value,
    author.value,
    title.value,
    bookStatus.value,
    pages.value
  );

  displayBookInTable(myBook);
  myLibrary.push(myBook);
  refreshUserInput();
  dialog.close();
});
