import './style.css'

// --- Todoアイテムの型定義 ---
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// --- Todoリストを管理する配列（状態）を定義 ---
let todos: Todo[] = [];

// --- 要素を取得 ---
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

// todoの完了状態をトグルする関数
function toggleTodo(todoId: number) {
  const targetTodo = todos.find(todo => todo.id === todoId);

  // もし対象のtodoが見つかれば
  if(targetTodo) {
    targetTodo.completed = !targetTodo.completed;
  }

  // 状態が変更されたので画面を再描画して最新の状態を反映
  renderTodos();
}

// IDを指定して該当するtodoを配列から削除する関数
function deleteTodo(todoId: number) {
  // filterメソッドを使って削除したいID*以外*の要素で新しい配列を作る
  todos = todos.filter(todo => todo.id !== todoId);

  // 状態が変更されたので画面を再描画して最新の状態を反映
  renderTodos();
}

function renderTodos() {
  // ul要素の中を一旦リセット
  todoList.innerHTML = '';

  // todos配列の各要素からli要素を生成して追加
  todos.forEach(todo => {
    // li要素を作成
    const li = document.createElement('li');

    if(todo.completed) {
      li.classList.add('completed');
    }

    // checkbox要素を作成
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // type属性をcheckboxに設定
    checkbox.checked = todo.completed;

    // チェックボックスがクリックされたらtoggleTodo関数を呼び出す
    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id);
    });

    // Todoのテキストを表示するspan要素を作成
    const span = document.createElement('span');
    span.textContent = todo.text; // todoオブジェクトのtextプロパティをテキストとして設定

    // 削除ボタンを作成
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.textContent = '削除'; // ボタンの表示テキストを設定
    deleteButton.classList.add('todo-delete');

    // 削除ボタンがクリックされたらdeleteTodo関数を呼び出す
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    // 作成した部品をliの中に組み立てる
    // appendChildで要素を入れ子にする
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // 組み立てたliをulに追加して表示
    todoList.appendChild(li);
  });
}

// --- フォームの送信イベントを監視 ---
todoForm.addEventListener('submit', (e) => {
  // 既定のフォーム送信（ページリロード）をキャンセル
  e.preventDefault();

  // 入力された値を取得し、全土の空白を削除
  const newTodoText = todoInput.value.trim();

  // 入力が空なら何もしない
  if(newTodoText.length === 0) return;

  // 新しいTodoオブジェクトを作成
  const newTodo: Todo = {
    id: Date.now(), //ユニークなIDとして現在時刻のタイムスタンプを利用
    text: newTodoText,
    completed: false,
  };

  // todos配列に新しいTodoを追加
  todos.push(newTodo);

  // 入力欄をクリア
  todoInput.value = '';

  // 画面を再描画
  renderTodos();
})