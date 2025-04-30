import "./style.css";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const formElm = document.querySelector<HTMLFormElement>("#todo-form")!;
const inputElm = document.querySelector<HTMLInputElement>("#todo-input")!;
const listElm = document.querySelector<HTMLUListElement>("#todo-list")!;

let todos: Todo[] = [
  { id: 1, text: "タスク1", done: false },
  { id: 2, text: "タスク2", done: true },
];
let nextId = todos.length + 1;

/**
 * タスクリストを描画する
 */
const renderTodoList = () => {
  // Step 1: タスクリストの描画をここに実装する
};

/**
 * タスクの追加を行う
 */
formElm.addEventListener("submit", (event) => {
  event.preventDefault(); // おまじない

  // Step 2: タスクの追加をここに実装する
});

/**
 * タスクの削除・完了状態の変更を行う
 */
listElm.addEventListener("click", (event) => {
  // おまじない
  event.preventDefault();
  if (!(event.target instanceof HTMLElement)) return;

  // Step 3: タスクの削除・完了状態の変更をここに実装する
});

/**
 * 初期化処理
 */
document.addEventListener("DOMContentLoaded", () => {
  renderTodoList();
});
