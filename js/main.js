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

// Wait for content to load
document.addEventListener('DOMContentLoaded', () => {
  // Grab references to all elements I would like from OR add to.
  // 1. Add todos text input (what the todo will be).
  const addTodoSubmitElement = document.querySelector('[data-js="new-todo"]');
  // 2. Save todo button (when to add the what).
  const addTodoTextInputElement = document.querySelector('[data-js="todo-text"]');
  // 3. List of todos to be done...
  const todoListElement = document.querySelector('[data-js="todo-list"]');


  // Grab the text from text input when todo submit is pressed
  // AND add it to the list as a list item
  addTodoSubmitElement.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTodoTextValue = addTodoTextInputElement.value;
    const nextTodoHTML = `
      <li
        data-js="todo-item"
      >
        ${currentTodoTextValue}
      </li>
    `;
    todoListElement.insertAdjacentHTML('beforeend', nextTodoHTML);

    // Find all tood items and listen for click in case I am done with them
    const elem = document
      .querySelectorAll('[data-js="todo-item"]')
      .forEach((todoItemElement) => {
        todoItemElement.removeEventListener('click', handleTodoItemClick);
        todoItemElement.addEventListener('click', handleTodoItemClick)
      })
    ;
  });
});
