'use strict';
/*

Ensure that the content has loaded into the Document Object Model (DOM) -- Fancy wording for giving us magic methods...
  - element.addEventListener()
  - .querySelector()

*/

function handleTodoItemClick(e) {
  // No need to prevent defaults because an <li> inside of an <ol>
  // doesn't do anything by default as far as I know (shrug).
  // Take the one that was clicked and make it "done"
  // by way of strike-through text?
  const currentlyClickedItemElement = e.currentTarget;
  currentlyClickedItemElement.classList.toggle('strikethrough');
}

// Then show what's matched with what in another list saying:
//    "{Todo Name} would go great with: {Matched Todo Name}"
function handleTodoMatcherButtonClick(e, listOfTodos) {
  let matches = [];
  const numberOfTodos = listOfTodos.length;
  // Only run this code if the number of todos is even...
  if (numberOfTodos % 2 === 0) {
    const shuffledTodos = _.shuffle(listOfTodos);
    shuffledTodos.map((todoItem, i) => {
      let indexToMatchWith = i+1;
      // When `i` is... don't use `i` instead use 0.
      if (indexToMatchWith >= listOfTodos.length) {
        indexToMatchWith = 0;
      }
      // if `todoItem` === `shuffledTodos[indexToMatchWith]` then show error on page "double matches!"
      const nextTodo = shuffledTodos[indexToMatchWith];

      const matchText = `${todoItem} would go great with: ${nextTodo}`;
      matches.push(matchText);
    });
    // Defined here because the scope is different in this function!
    const todoMatchedList = document.querySelector('[data-js="matched-list"]');
    // Resets the inner content of the list container to be "blank" before adding the matches again.
    // This is so the list will not repeat and append `beforeend` of the last button press of matches.
    todoMatchedList.innerHTML = "";
    matches.forEach((match) => {
      const htmlToAdd = `
        <li> ${match} </li>
      `;
      match
      // Add to html
      todoMatchedList.insertAdjacentHTML('beforeend', htmlToAdd);
    })
  }
}

// Wait for content to load
document.addEventListener('DOMContentLoaded', () => {
  // Grab references to all elements I would like from OR add to.
  // 1. Add todos text input (what the todo will be).
  const addTodoSubmitElement = document.querySelector('[data-js="new-todo"]');
  // 2. Save todo button (when to add the what).
  const addTodoTextInputElement = document.querySelector('[data-js="todo-text"]');
  // 3. List of todos to be done...
  const todoListElement = document.querySelector('[data-js="todo-list"]');
  // 4. Todo matcher button
  const todoMatcherButtonElement = document.querySelector('[data-js="todo-matcher-button"]');

  // Placeholder array to store all the todos in memory.
  let listOfTodos = ['Thomas', 'Pillows', 'Cheese', 'iPhones'];

  // Grab the text from text input when todo submit is pressed
  // AND add it to the list as a list item
  addTodoSubmitElement.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTodoTextValue = addTodoTextInputElement.value;

    // Along with building the HTML to be added to the page...
    // I want to store this in an array, so that I can access it fast later.
    listOfTodos.push(currentTodoTextValue);
    const nextTodoHTML = `
      <li
        data-js="todo-item"
      >
        ${currentTodoTextValue}
      </li>
    `;
    todoListElement.insertAdjacentHTML('beforeend', nextTodoHTML);

    // Find all todo items and listen for click in case I am done with them
    const elem = document
      .querySelectorAll('[data-js="todo-item"]')
      .forEach((todoItemElement) => {
        todoItemElement.removeEventListener('click', handleTodoItemClick);
        todoItemElement.addEventListener('click', handleTodoItemClick)
      })
    ;
  });

  // @TODO: Worker has even number of todos in list and generates matches
  // - [x] List of todos (data not just HTML/UI) -> Local State
  //   - [x] Probably save to an array/list at the same step of adding to HTML (currently)
  // - [x] Add button to page "Match Todos"
  //   - [x] When clicking button: If the list of todos even?
  //     - [x] Then show what's matched with what in another list saying "{Todo Name} would go great with: {Matched Todo Name}"
  todoMatcherButtonElement.addEventListener(
    'click',
    (e) => {
      // This anonymous function allows us to pass a "intermediate" function
      // to send custom arguments to our handler
      handleTodoMatcherButtonClick(e, listOfTodos)
    }
  );
});
