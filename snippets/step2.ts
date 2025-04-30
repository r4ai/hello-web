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

// #region step2
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

  // 入力欄を空にする
  inputElm.value = "";

  // タスクのリストを再描画
  renderTodoList();
});
// #endregion

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
