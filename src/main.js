const form = document.getElementById('registerForm');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const specialCharsRegex = /[!@#$%^&*()_\-+=,.?/]/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])([^\s]){8,}$/;

const MESSAGES = {
  REQUIRED: 'Bắt buộc nhập.',
  USERNAME_SPECIAL_CHARS: 'Không nhập các ký tự đặc biệt: !@#$%^&*()_-+=,.?/',
  EMAIL_INVALID: 'Nhập đúng định dạng email.',
  PASSWORD_INVALID:
    'Mật khẩu phải tối thiểu 8 ký tự, có ít nhất 1 chữ viết hoa, chữ thường, số, ký tự đặc biệt và không chứa khoảng trắng',
  CONFIRM_PASSWORD_MISMATCH: 'Mật khẩu không khớp.',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  ALERT_WARNING: 'Cảnh báo',
};

function getTrimmedValue(element) {
  return element.value.trim();
}

function validateUsername() {
  let valid = true;
  const usernameValue = getTrimmedValue(username);
  if (!usernameValue) {
    usernameError.textContent = MESSAGES.REQUIRED;
    valid = false;
  } else if (specialCharsRegex.test(usernameValue)) {
    usernameError.textContent = MESSAGES.USERNAME_SPECIAL_CHARS;
    valid = false;
  } else {
    usernameError.textContent = '';
  }
  return valid;
}

function validateEmail() {
  let valid = true;
  const emailValue = getTrimmedValue(email);
  if (!emailValue) {
    emailError.textContent = MESSAGES.REQUIRED;
    valid = false;
  } else if (!emailRegex.test(emailValue)) {
    emailError.textContent = MESSAGES.EMAIL_INVALID;
    valid = false;
  } else {
    emailError.textContent = '';
  }
  return valid;
}

function validatePassword() {
  let valid = true;
  const passwordValue = getTrimmedValue(password);
  if (!passwordValue) {
    passwordError.textContent = MESSAGES.REQUIRED;
    valid = false;
  } else if (!passwordRegex.test(passwordValue)) {
    passwordError.textContent = MESSAGES.PASSWORD_INVALID;
    valid = false;
  } else {
    passwordError.textContent = '';
  }
  return valid;
}

function validateConfirmPassword() {
  let valid = true;
  const confirmPasswordValue = getTrimmedValue(confirmPassword);
  const passwordValue = getTrimmedValue(password);
  if (!confirmPasswordValue) {
    confirmPasswordError.textContent = MESSAGES.REQUIRED;
    valid = false;
  } else if (confirmPasswordValue !== passwordValue) {
    confirmPasswordError.textContent = MESSAGES.CONFIRM_PASSWORD_MISMATCH;
    valid = false;
  } else {
    confirmPasswordError.textContent = '';
  }
  return valid;
}

function validateForm() {
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  return isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
}

function resetData() {
  form.reset();
  usernameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (validateForm()) {
    const userData = {
      username: getTrimmedValue(username),
      email: getTrimmedValue(email),
      password: getTrimmedValue(password),
    };
    let users = JSON.parse(localStorage.getItem('registeredUsersArr')) || [];
    users.push(userData);
    localStorage.setItem('registeredUsersArr', JSON.stringify(users));
    alert(MESSAGES.REGISTER_SUCCESS);
    resetData();
  } else {
    alert(MESSAGES.ALERT_WARNING);
  }
});

username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);
