const addPeopleForm = document.getElementById('add-people-form');
const peopleListDiv = document.getElementById("people-list-div");
const people = [];

function renderPeople(Person) {
  let peopleList = document.getElementById('peopleList');
  if (peopleList === null) {
    createTable();
  };
  createTd(Person);
  console.log(people);
  if(people.length > 6) {
    removeTableElement();
  }
}

function createTable() {
    const table = document.createElement("table");
    peopleListDiv.append(table);
    table.setAttribute('id','peopleList');
    table.classList.add("tableList");
    const trTable = document.createElement("tr");
    const tableFirstName = document.createElement("td");
    const tableLastName = document.createElement("td");
    const tableDateOfBirth = document.createElement("td");
    const tableWeight = document.createElement("td");
    tableFirstName.textContent = "Имя";
    tableLastName.textContent = "Фамилия";
    tableDateOfBirth.textContent = "Дата рождения";
    tableWeight.textContent = "Вес";
    const tr = document.createElement("tr");
    peopleList.append(tr);
    tr.appendChild(tableFirstName);
    tr.appendChild(tableLastName);
    tr.appendChild(tableDateOfBirth);
    tr.appendChild(tableWeight);
}



function createTd(Person){
  const personFirstName = document.createElement("td");
  const personLastName = document.createElement("td");
  const personDateOfBirth = document.createElement("td");
  const personWeight = document.createElement("td");
  const deleteBtn = document.createElement("BUTTON");
  deleteBtn.setAttribute('id','deleteBtn');
  deleteBtn.addEventListener("click",deleteTr);
  fillTextContent(Person,personFirstName,personLastName,personDateOfBirth,personWeight,deleteBtn);
  appendChilds(personFirstName,personLastName,personDateOfBirth,personWeight,deleteBtn);
}

function appendChilds(FirstName,LastName,DateOfBirth,Weight,deleteBtn) {
  const tr = document.createElement("tr");
  peopleList.append(tr);
  tr.setAttribute('id','tableEl');
  tr.appendChild(FirstName);
  tr.appendChild(LastName);
  tr.appendChild(DateOfBirth);
  tr.appendChild(Weight);
  tr.appendChild(deleteBtn);
}


function fillTextContent(Person,personFirstName,personLastName,personDateOfBirth,personWeight,deleteBtn) {
  personFirstName.textContent = Person.firstName;
  personLastName.textContent = Person.lastName; 
  personDateOfBirth.textContent = Person.dateOfBirth;
  personWeight.textContent = Person.weight;
  deleteBtn.textContent = "x"; 
}

function removeTableElement() {
  table = document.getElementById("peopleList");
  people.shift();
  tr = document.getElementById("tableEl");
  table.removeChild(tr);
}

function addPersonHandler(event) {
  event.preventDefault();
  const firstName = document.getElementById("first-name-input").value;
  const lastName = document.getElementById("last-name-input").value;
  const dateOfBirth = document.getElementById("date-input").value;
  const weight = document.getElementById("weight-input").value;
  const Person = {
    firstName : firstName,
    lastName : lastName,
    dateOfBirth : dateOfBirth,
    weight : weight,
  };
  people.push(Person);
  renderPeople(Person);
}


addPeopleForm.addEventListener("submit", addPersonHandler);


function deleteTr() {
  table = document.getElementById("peopleList");
  people.shift();
  tr = document.getElementById("tableEl");
  table.removeChild(tr);
}

/*
console.log(localStorage);
localStorage.clear();

 function Test(Person) {
  let keyName = localStorage.length + +"1";
  localStorage.setItem(keyName, JSON.stringify(Person));
  let savedPerson = JSON.parse(localStorage.getItem(keyName));  
}
*/