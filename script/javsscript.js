const addPeopleForm = document.getElementById('add-people-form');
const peopleListDiv = document.getElementById("people-list-div");
let people = [];
const PEOPLE_LOCAL_STORAGE_KEY = "people";
const uniqueError = document.createElement("p");
let sortedType;
let sortIndex;
let currentSort = null;

renderSavedPeople();

function addPersonToTable(person) {
  let peopleList = document.getElementById('peopleList');

  if (peopleList === null) {
    createTable();
  }
  
  createTableRow(person);

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
      setUniqueError();
      return;
    } 

    people.push(newPerson);
    addPersonToTable(newPerson);

    if (currentSort === "asc") {
      currentSort = null;
      sort(sortIndex,sortedType);
    }  else if (currentSort === "decs") {
      currentSort = "asc";
      sort(sortIndex,sortedType);
    }
      else {
        alert("Peson add without sort");
      }

    localStorage.setItem(PEOPLE_LOCAL_STORAGE_KEY, JSON.stringify(people));
}
    

function setUniqueError() {
  uniqueError.classList.add("error-class");
  uniqueError.innerHTML = "Введите уникального пользователя";
  document.getElementById("add-person").before(uniqueError);
}

function clearUniqueError() {
  [...document.getElementById("add-people-form").childNodes].find(node => node === uniqueError)?.remove();
}

function renderSavedPeople() {
  const savedPeople = JSON.parse(localStorage.getItem(PEOPLE_LOCAL_STORAGE_KEY));

  if(savedPeople) {
    people = savedPeople;
    people.forEach(addPersonToTable);
  }
}; 

function createTable() {
    const table = document.createElement("table");
    const tableFirstName = document.createElement("td");
    const tableLastName = document.createElement("td");
    const tableDateOfBirth = document.createElement("td");
    const tableWeight = document.createElement("td");
    const tr = document.createElement("tr");

    tableFirstName.addEventListener("click", () => {sort(0,"string")});
    tableLastName.addEventListener("click", () => {sort(1,"string")});
    tableDateOfBirth.addEventListener("click", () => {sort(2,"date")});
    tableWeight.addEventListener("click", () => {sort(3,"number")});

    peopleListDiv.append(table);
    table.setAttribute('id','peopleList');
    table.classList.add("tableList");
    tableFirstName.textContent = "Имя";
    tableLastName.textContent = "Фамилия";
    tableDateOfBirth.textContent = "Дата рождения";
    tableWeight.textContent = "Вес";
    peopleList.append(tr);
    tr.appendChild(tableFirstName);
    tr.appendChild(tableLastName);
    tr.appendChild(tableDateOfBirth);
    tr.appendChild(tableWeight);
}

function createTableRow(person) {
  const tr = document.createElement("tr");
  peopleList.append(tr);
  
  const personFirstName = document.createElement("td");
  const personLastName = document.createElement("td");
  const personDateOfBirth = document.createElement("td");
  const personWeight = document.createElement("td");
  const deleteBtn = document.createElement("BUTTON");

  personFirstName.textContent = person.firstName;
  personLastName.textContent = person.lastName; 
  personDateOfBirth.textContent = person.dateOfBirth;
  personWeight.textContent = person.weight;
  deleteBtn.textContent = "x";

  tr.setAttribute('id','tableEl');
  tr.appendChild(personFirstName);
  tr.appendChild(personLastName);
  tr.appendChild(personDateOfBirth);
  tr.appendChild(personWeight);
  tr.appendChild(deleteBtn);

  deleteBtn.setAttribute('id','deleteBtn');
  deleteBtn.addEventListener("click", () => {
    tr.remove();
    const removeIndex = people.findIndex(person => 
        person.firstName === personFirstName.textContent &&
        person.lastName === personLastName.textContent &&
        person.dateOfBirth === personDateOfBirth.textContent
      );
      console.log(removeIndex);

      if (removeIndex >= 0) {
        people.splice(removeIndex,1);
        localStorage.setItem(PEOPLE_LOCAL_STORAGE_KEY, JSON.stringify(people));
      }
  });
}

function removeTableRow() {
  const table = document.getElementById("peopleList");
  const tr = document.getElementById("tableEl");

  table.removeChild(tr);
  people.shift();
}

function addPersonHandler(event) {
  
  event.preventDefault();
  
  const firstName = document.getElementById("first-name-input").value;
  const lastName = document.getElementById("last-name-input").value;
  const dateOfBirth = document.getElementById("date-input").value;
  const weight = document.getElementById("weight-input").value;
  const person = {
    firstName,
    lastName,
    dateOfBirth,
    weight,
  };

  addPerson(person);
}

function sort(rowIndex, type) {
  
  const list = document.querySelector("#peopleList");
  const [headerNode, ...personNodes] = list.children;

  sortedType = type;
  sortIndex = rowIndex;


  if (currentSort === null) {

    personNodes.sort((a,b) => {
      const nodeA = a.children[rowIndex];
      const nodeB = b.children[rowIndex];
    
      const textA = nodeA.innerText;
      const textB = nodeB.innerText;
    
      if (type === "date") {
        return new Date(textA) - new Date(textB);
      } else if (type === "number") {
        return parseInt(textA) - parseInt(textB);
      } else if (type === "string") {
        return textA.localeCompare(textB);
      }
      });

      personNodes.forEach(node=>list.appendChild(node));
      currentSort = "asc";

  } else if (currentSort === "asc") {

    personNodes.sort((a,b) => {
      const nodeA = a.children[rowIndex];
      const nodeB = b.children[rowIndex];
    
      const textA = nodeA.innerText;
      const textB = nodeB.innerText;
    
      if (type === "date") {
          return new Date(textB) - new Date(textA);
        } else if (type === "number") {
          return parseInt(textB) - parseInt(textA);
        } else if (type === "string") {
          return textB.localeCompare(textA);
        }
      });

      personNodes.forEach(node=>list.appendChild(node));
      currentSort = "decs";

  } else {

    currentSort = null;

    while (list.children.length > 1) {
      list.removeChild(list.lastChild);
    }

    people.forEach(addPersonToTable);
    }
}



addPeopleForm.addEventListener("submit", addPersonHandler);