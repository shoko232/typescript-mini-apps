import './style.css';

// --- 要素を取得 ---
const omikujiButton = document.getElementById('omikuji-button') as HTMLButtonElement;
const omikujiResult = document.getElementById('omikuji-result') as HTMLHeadingElement;

// --- おみくじの配列を定義 ---
const fortunes: string[] = [
  '大吉',
  '中吉',
  '小吉',
  '吉',
  '末吉',
  '凶',
  '大凶',
];

// --- ボタンが押されたときの処理 ---
omikujiButton.addEventListener('click', () => {
  // Math.random() 0以上1未満の小数を返す
  // 小数と配列の長さをかける
  // Math.floor() 小数点以下を切り捨てて整数のインデックスを得る
  const randomIndex: number = Math.floor(Math.random() * fortunes.length);

  // ランダムに選ばれたインデックスを使って配列から運勢を1つ取り出す
  const result: string = fortunes[randomIndex];

  // 取り出した運勢を画面に表示する
  omikujiResult.textContent = result;
});
