// @ts-check
import './style.css';

// --- 要素を取得 ---
const calculatorDisplay = document.getElementById('calculator-display') as HTMLDivElement;
const calculatorKeys = document.getElementById('calculator-keys') as HTMLDivElement;

// --- 電卓の状態を管理する変数 ---
// 現在ディスプレイに表示されている値
let currentInput: string = '0';
// 選択された演算子
let operator: string | null = null;
// 演算子が押される前の入力値
let previousInput: string | null = null;

// --- ディスプレイの表示を更新する関数 ---
function updateDisplay() {
  calculatorDisplay.textContent = currentInput;
}

// --- 計算を実行する関数 ---
function calculate(): number {
  const prev = parseFloat(previousInput!);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return prev / current;
    default:
      return current;
  }
}

// --- ボタンがクリックされたときのメインの処理 ---
calculatorKeys?.addEventListener('click', (e) =>{
  // クリックされた要素がボタンでなければ何もしない
  const target = e.target as HTMLButtonElement;
  if(!target.matches('button')) {
    return;
  }

  // ボタンのdata-value属性を取得
  const value = target.dataset.value!;

  // 押されたボタンの種類に応じて処理を分岐
  if(target.classList.contains('key-operator')) {
    // --- 演算子ボタンが押された場合 ---
    if(previousInput !== null && operator) {
      // すでに前の計算がある場合は、先に計算してしまう
      const result = calculate();
      currentInput = result.toString();
      updateDisplay();
    }
    operator = value;
    previousInput = currentInput;
    // 次の入力を待つ
    currentInput = '0';
  } else if (value === '='){
    // --- 「=」が押された場合 ---
    if(operator && previousInput) {
      const result = calculate();
      currentInput = result.toString();
      // 計算後は状態をリセット
      operator = null;
      previousInput = null;
      updateDisplay();
    }
  } else if (value === 'clear') {
    // --- 「C」を押した場合 ---
    currentInput = '0';
    operator = null;
    previousInput = null;
    updateDisplay();
  } else {
    // --- 数字または「.」ボタンが押された場合 ---
    if(currentInput === '0') {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay();
  }
});

// --- 初期表示 ---
updateDisplay();
