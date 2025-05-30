import "./style.css";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

/**
 * todosとnextIdをローカルストレージから取得する
 */
const loadTodos = (): { todos: Todo[]; nextId: number } => {
  const todosJson = localStorage.getItem("todos");
  if (todosJson) {
    const todos = JSON.parse(todosJson);
    const nextId = Math.max(...todos.map((todo: Todo) => todo.id), 0) + 1;
    return { todos, nextId };
  }
  return { todos: [], nextId: 1 };
};

/**
 * todosをローカルストレージに保存する
 */
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const formElm = document.querySelector<HTMLFormElement>("#todo-form")!;
const inputElm = document.querySelector<HTMLInputElement>("#todo-input")!;
const listElm = document.querySelector<HTMLUListElement>("#todo-list")!;

let { todos, nextId } = loadTodos();

/**
 * タスクリストを描画する
 */
const renderTodoList = () => {
  listElm.innerHTML = "";

  for (const todo of todos) {
    // タスクの要素を作成
    const listItemElm = document.createElement("li");
    listItemElm.dataset.id = todo.id.toString();
    if (todo.done) {
      listItemElm.classList.add("done");
    }
    listItemElm.innerHTML = `
      <input type="checkbox" class="toggle" ${todo.done ? "checked" : ""}>
      <span>${todo.text}</span>
      <button class="remove">✕</button>
    `;

    // タスクの要素をリストに追加
    listElm.appendChild(listItemElm);
  }
};

/**
 * タスクの追加を行う
 */
formElm.addEventListener("submit", (event) => {
  event.preventDefault(); // おまじない

  // 入力欄の値を取得
  const text = inputElm.value.trim();
  if (!text) return;

  // 得られた値をもとに新しいタスクを作成
  todos.push({ id: nextId++, text, done: false });
  saveTodos();

  // 入力欄を空にする
  inputElm.value = "";

  // タスクのリストを再描画
  renderTodoList();
});

/**
 * タスクの削除・完了状態の変更を行う
 */
listElm.addEventListener("click", (event) => {
  // おまじない
  event.preventDefault();
  if (!(event.target instanceof HTMLElement)) return;

  // タスクリストの要素を取得
  const listItemElement = event.target.closest<HTMLLIElement>("li");
  if (!listItemElement) return;

  // ボタンが押されたタスクのIDを取得
  const id = Number(listItemElement.dataset.id);

  // タスクの状態を変更
  const isToggleButton = event.target.classList.contains("toggle");
  const isDeleteButton = event.target.classList.contains("remove");
  if (isToggleButton) {
    // タスクの完了状態を変更
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  } else if (isDeleteButton) {
    // タスクを削除
    todos = todos.filter((todo) => todo.id !== id);
  }
  saveTodos();

  // タスクのリストを再描画
  renderTodoList();
});

document.addEventListener("DOMContentLoaded", () => {
  // タスクリストを描画
  renderTodoList();
});
