import './style.css';

// --- 要素を取得 ---
const form = document.getElementById('form-validation') as HTMLFormElement;
const usernameInput = document.getElementById('username-input') as HTMLInputElement;
const emailInput = document.getElementById('email-input') as HTMLInputElement;
const passwordInput = document.getElementById('password-input') as HTMLInputElement;

// --- error要素を取得 ---
const usernameError = document.getElementById('username-error') as HTMLParagraphElement;
const emailError = document.getElementById('email-error') as HTMLParagraphElement;
const passwordError = document.getElementById('password-error') as HTMLParagraphElement;

// --- 各バリデーションの関数を定義 ---
// ユーザー名のバリデーション
function validateUsername(): boolean {
  if (usernameInput.value.trim() === '') {
    usernameError.textContent = 'ユーザー名は必須です';
    return false;
  } else {
    usernameError.textContent = '';
    return true;
  }
}

// メールアドレスのバリデーション
function validateEmail(): boolean {
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'メールアドレスは必須です';
    return false;
  } else if (!emailInput.value.includes('@')) {
    emailError.textContent = '有効なメールアドレスの形式ではありません';
    return false;
  } else {
    emailError.textContent = '';
    return true;
  }
}

// パスワードのバリデーション
function validatePassword(): boolean {
  if (passwordInput.value.length < 8) {
    passwordError.textContent = 'パスワードは8文字以上で入力してください';
    return false;
  } else {
    passwordError.textContent = '';
    return true;
  }
}

// --- 各入力欄にリアルタイムのイベントリスナーを設定 ---
usernameInput.addEventListener('blur', validateUsername);
emailInput.addEventListener('input', validateEmail);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('input', validatePassword);
passwordInput.addEventListener('blur', validatePassword);

// --- フォーム送信時の最終チェック ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 各バリデーションを再度実行して、最終的な有効性をチェック
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  // すべてのバリデーションが通った場合のみ成功アラートを表示
  if (isUsernameValid && isEmailValid && isPasswordValid) {
    alert('登録が完了しました！');
    form.reset();
  }
})