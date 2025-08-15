// --- 要素を取得 ---
const countDisplay = document.getElementById('count-display') as HTMLSpanElement;
const incrementButton = document.getElementById('increment-button') as HTMLButtonElement;
const decrementButton = document.getElementById('decrement-button') as HTMLButtonElement;

// --- カウントの状態を管理する変数（状態）を定義 ---
let count: number = 0;

// --- 画面の表示を更新する関数を定義 ---
// count変数の値をHTMLに反映させる
function updateDisplay() {
  countDisplay.textContent = count.toString();
}

// --- ボタンがクリックされたときの処理を登録 ---
incrementButton.addEventListener('click', () => {
  // countを1増やす
  count++;
  // 画面を更新
  updateDisplay();
});

decrementButton.addEventListener('click', () => {
  // countを1減らす
  count--;
  // 画面を更新
  updateDisplay();
});

// --- 初期表示 ---
// ページが読み込まれたときに最初のカウント(0)を表示するために、一度呼び出しておく
updateDisplay();
