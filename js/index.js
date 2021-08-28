'use strict';

editTaskTitle();
currentTasks();
addNewTask();
darkMode();

/*
  When the .mode-btn button is clicked, some elements class name is toggled so 
  that it corresponds to a dark theme when currently in light theme and light
  theme when currently in dark theme.
*/
function darkMode() {
  let modeButton = document.querySelector('.mode-btn');
  modeButton.addEventListener('click', function() {
    let toggleIcon = document.querySelector('.mode-btn i');
    toggleIcon.classList.toggle('fa-toggle-on');
    toggleIcon.classList.toggle('fa-toggle-off');

    let modeIcon = document.querySelector('.col i');
    modeIcon.classList.toggle('fa-sun');
    modeIcon.classList.toggle('fa-moon');

    let body = document.querySelector('body');
    body.classList.toggle('body-dark')

    let pageName = document.querySelector('header p');
    pageName.classList.toggle('name-dark');

    let containers = document.querySelectorAll('.container');
    containers.forEach(function(container) {
      container.classList.toggle('container-dark');
    });

    let button = document.querySelector('.form button');
    button.classList.toggle('btn-dark');

    let cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
      card.classList.toggle('card-dark')
    });

    let items = document.querySelectorAll('.list-group-item');
    items.forEach(function(item) {
      item.classList.toggle('item-dark');
    });

    let pins = document.querySelectorAll('li .priority');
    if (pins.length === 0) {
      pins = document.querySelectorAll('li .priority-dark');
    }
    pins.forEach(function(pin) {
      pin.classList.toggle('priority');
      pin.classList.toggle('priority-dark');
    });

    let plusIcon = document.querySelector('.fa-plus');
    plusIcon.classList.toggle('plus-dark');

    let inputs = document.querySelectorAll('input');
    inputs.forEach(function(input) {
      input.classList.toggle('input-dark');
    });

    let deleteIcons = document.querySelectorAll('.fa-times-circle');
    deleteIcons.forEach(function(xIcon) {
      xIcon.classList.toggle('x-dark');
    });
  });
}

/*
  Changes the task title, when a user clicks the title a form
  is rendered and the users submitted text input changes the title
  as long as the text is not blank.
*/
function editTaskTitle() {
  let taskTitle = document.querySelector('.task-title');
  taskTitle.addEventListener('click', function() {
    document.querySelector('.form').classList.toggle('d-none');
    taskTitle.classList.toggle('d-none');
  });
  let formButton = document.querySelector('.form button');
  formButton.addEventListener('click', function() {
    let input = document.querySelector('.form input').value;
    if (input.length > 0) {
      taskTitle.textContent = input;
      document.querySelector('.form').classList.toggle('d-none');
      taskTitle.classList.toggle('d-none');
    }
  });
}

/*
  Creates a list of items element for the unfisished tasks and for the finished
  tasks. Renders a input element and button element in the unfinished list items.
*/
function currentTasks() {
  let ulElem = document.createElement('ul');
  ulElem.classList.add('list-group');
  let ulDoneElem = document.createElement('ul');
  ulDoneElem.classList.add('list-group');

  let liAddItem = document.createElement('li');
  liAddItem.classList.add('list-group-item');
  let plusButton = document.createElement('button');
  plusButton.classList.add('btn');
  let plusIcon = document.createElement('i');
  plusIcon.classList.add('fas', 'fa-plus');
  plusButton.appendChild(plusIcon);
  let inputAddItem = document.createElement('input');
  inputAddItem.classList.add('border-0', 'input-list');
  inputAddItem.type = "text";
  inputAddItem.placeholder = "Add item";
  liAddItem.appendChild(plusButton);
  liAddItem.appendChild(inputAddItem);
  ulElem.appendChild(liAddItem);

  let cards = document.querySelectorAll('.card');
  cards[0].appendChild(ulElem);
  cards[1].appendChild(ulDoneElem);
}

/*
  Renders a new item in the undifnished list section.

  @param {object} ulElem The list of items element where task will be added
  @param {string} task   A user created task
*/
function addListItem(ulElem, task) {
  let liElem = document.createElement('li');
  liElem.classList.add('list-group-item');
  let pinButton = document.createElement('button');
  pinButton.classList.add('btn', 'd-none');
  let pinIcon = document.createElement('i');
  pinIcon.classList.add('fas', 'fa-thumbtack');
  pinButton.appendChild(pinIcon);
  let checkInput = document.createElement('input');
  checkInput.type = "checkbox";
  checkInput.name = "box";
  let textInput = document.createElement('input');
  textInput.classList.add('border-0', 'input-list');
  textInput.type = "text";
  textInput.value = " " + task;
  let deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'd-none');
  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('far', 'fa-times-circle');
  deleteButton.appendChild(deleteIcon);
  liElem.appendChild(pinButton);
  liElem.appendChild(checkInput);
  liElem.appendChild(textInput);
  liElem.appendChild(deleteButton);

  ulElem.appendChild(liElem);
  moveTask(liElem, checkInput, textInput);
  taskOption(liElem);
  pinItem(pinButton);
  removeItem(deleteButton);
}

/*
  Removes a task from the current list.

  @param {object} deleteButton A button element that corresponds to a task
*/
function removeItem(deleteButton) {
  deleteButton.addEventListener('click', function() {
    let liElem = deleteButton.parentElement;
    let ulElem = liElem.parentElement;
    ulElem.removeChild(liElem);
    document.querySelector('.complete').textContent = document.querySelectorAll('ul')[1].children.length + " Completed";
  });
}

/*
  Moves the list element in the beginning of all other list element siblings.

  @param {object} liElem A list item element
*/
function moveToTop(liElem) {
  let ulElem = liElem.parentElement;
  ulElem.insertBefore(liElem, ulElem.children[1]);
}

/*
  Moves a task to the beginning of the list with a priority label, otherwise
  moves a task to the end of the list when task has priority label.

  @param {object} pinButton A button element that corresponds to a task
*/
function pinItem(pinButton) {
  pinButton.addEventListener('click', function() {
    let pinIconClass = pinButton.children[0].classList;
    let liElem = pinButton.parentElement;
    let ulElem = liElem.parentElement;
    if (pinIconClass.contains('priority')) {
      pinIconClass.remove('priority');
      ulElem.appendChild(liElem);
    } else {
      pinButton.classList.remove('d-none');
      pinIconClass.add('priority');
      moveToTop(liElem);
    }
  });
}

/*
  Moves a task from unfinished list to finished list when task is unfinished,
  otherwise moves task to finished list.

  @param {object} liElem     A list item element holding information about a task
  @param {object} checkInput A checkbox input corresponding to the task
  @param {string} text       A task
*/
function moveTask(liElem, checkInput, text) {
  checkInput.addEventListener('click', function() {
    let ulElem = liElem.parentElement;
    let ulElems = document.querySelectorAll('ul');
    let ulOpposite = "";
    if (ulElems[0] == ulElem) {
      ulOpposite = ulElems[1];
      ulElem.removeChild(liElem);
      liElem.removeChild(liElem.children[0]);
      ulOpposite.appendChild(liElem);
    } else {
      ulOpposite = ulElems[0];
      ulElem.removeChild(liElem);
      let pinButton = document.createElement('button');
      pinButton.classList.add('btn');
      let pinIcon = document.createElement('i');
      pinIcon.classList.add('fas', 'fa-thumbtack');
      pinButton.appendChild(pinIcon);
      pinItem(pinButton);
      liElem.insertBefore(pinButton, liElem.children[0]);
      ulOpposite.appendChild(liElem);
    }
    document.querySelector('.complete').textContent = ulElems[1].children.length + " Completed";
  });
}

/*
  displays pin button and delete button when mouse enters list element.

  @param {object} item A list item element holding information about a task
*/
function taskOption(item) {
  item.addEventListener('mouseenter', function() {
    let liChildren = item.children;
    if (liChildren.length > 3) {
      let xIcon = liChildren[3];
      xIcon.classList.remove('d-none');
      let pinButton = liChildren[0];
      if (!pinButton.children[0].classList.contains("priority")) {
        pinButton.classList.toggle('d-none');
      }
    } else {
      let xIcon = liChildren[2];
      xIcon.classList.remove('d-none');
    }
  });
  item.addEventListener('mouseleave', function() {
    let liChildren = item.children;
    if (liChildren.length > 3) {
      let xIcon = liChildren[3];
      xIcon.classList.add('d-none');
      let pinButton = liChildren[0];
      if (!pinButton.children[0].classList.contains("priority")) {
        pinButton.classList.toggle('d-none');
      }
    } else {
      let xIcon = liChildren[2];
      xIcon.classList.add('d-none');
    }
  });
}

/*
  Adds a task that is not empty to the unfinished list when the button element
  is clicked.
*/
function addNewTask() {
  let addButton = document.querySelector('.list-group-item button');
  addButton.addEventListener('click', function(event) {
    event.preventDefault();
    let taskInput = document.querySelector('.list-group-item input');
    if (taskInput.value.length > 0) {
      let ulUnfinished = document.querySelector('ul');
      addListItem(ulUnfinished, taskInput.value);
      taskInput.value = "";
    }
  });
}
