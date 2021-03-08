const addPeopleForm = document.getElementById('add-people-form');
const peopleListDiv = document.getElementById("people-list-div");
let people = [];
const PEOPLE_LOCAL_STORAGE_KEY = "people";

renderSavedPeople();


function addPersonToTable(person) {
  let peopleList = document.getElementById('peopleList');
  if (peopleList === null) {
    createTable();}
  createTd(person);
  console.log(people);
  if(people.length > 6) {
    removeTableRow();
  }
}


function addPerson(newPerson) {
  if (people.some(person => 
    newPerson.firstName === person.firstName &&
    newPerson.lastName  === person.lastName &&
    newPerson.dateOfBirth === person.dateOfBirth 
    )) {
      alert("Введите уникального челика");
      return;
    }
    people.push(newPerson);
    addPersonToTable(newPerson);
    localStorage.setItem(PEOPLE_LOCAL_STORAGE_KEY, JSON.stringify(people));
    console.log(localStorage);
}


function renderSavedPeople() {
  const savedPeople = JSON.parse(localStorage.getItem(PEOPLE_LOCAL_STORAGE_KEY));
  if(savedPeople) {
    people = savedPeople;
    people.forEach(person => {
      addPersonToTable(person);
    });
  }
}; 



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


function createTd(person){
  const personFirstName = document.createElement("td");
  const personLastName = document.createElement("td");
  const personDateOfBirth = document.createElement("td");
  const personWeight = document.createElement("td");
  const deleteBtn = document.createElement("BUTTON");
  deleteBtn.setAttribute('id','deleteBtn');
  fillTextContent(person,personFirstName,personLastName,personDateOfBirth,personWeight,deleteBtn);
  appendChilds(personFirstName,personLastName,personDateOfBirth,personWeight,deleteBtn);
}


function appendChilds(FirstName,LastName,DateOfBirth,Weight,deleteBtn) {
  const tr = document.createElement("tr");
  peopleList.append(tr);
  deleteBtn.addEventListener("click", () => {
    tr.remove();
    let removeIndex = people.findIndex( person => 
        person.firstName === person.firstName &&
        person.lastName === person.lastName &&
        person.dateOfBirth === person.dateOfBirth 
      );
      people.splice(removeIndex,1);
      console.log(people);
      console.log(removeIndex);
      localStorage.setItem(PEOPLE_LOCAL_STORAGE_KEY, JSON.stringify(people));
  });
  
  tr.setAttribute('id','tableEl');
  tr.appendChild(FirstName);
  tr.appendChild(LastName);
  tr.appendChild(DateOfBirth);
  tr.appendChild(Weight);
  tr.appendChild(deleteBtn);
}


function fillTextContent(person,personFirstName,personLastName,personDateOfBirth,personWeight,deleteBtn) {
  personFirstName.textContent = person.firstName;
  personLastName.textContent = person.lastName; 
  personDateOfBirth.textContent = person.dateOfBirth;
  personWeight.textContent = person.weight;
  deleteBtn.textContent = "x"; 
}


function removeTableRow() {
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
  const person = {
    firstName : firstName,
    lastName : lastName,
    dateOfBirth : dateOfBirth,
    weight : weight,
  };
  addPerson(person);
}


addPeopleForm.addEventListener("submit", addPersonHandler);
