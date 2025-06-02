// Function constructor for taking books's information
const myLibrary = [];
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

//Function for displaying books's information in table
const table = document.querySelector("table > tbody");
function displayBookInTable(book) {
  //create row for each book
  const newRow = document.createElement("tr");
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
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
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
const form = document.querySelector("form");
const displayFormButton = document.querySelector(".new-book");
displayFormButton.addEventListener("click", function () {
  form.style.display = "block";
});

// Prevent submit button's default . Instead, make the button send value to add new Book , and display Book info in table
const bookName = document.querySelector("#name");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const bookStatus = document.querySelector("#status");
const pages = document.querySelector("#pages");

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
});
