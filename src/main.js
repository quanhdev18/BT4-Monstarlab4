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

const errors = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function getTrimmedValue(element) {
  return element.value.trim();
}

function setFieldError(field, errorElement, message) {
  errors[field] = message;
  errorElement.textContent = message;
}

function validateUsername() {
  const usernameValue = getTrimmedValue(username);
  if (!usernameValue) {
    setFieldError('username', usernameError, MESSAGES.REQUIRED);
  } else if (specialCharsRegex.test(usernameValue)) {
    setFieldError('username', usernameError, MESSAGES.USERNAME_SPECIAL_CHARS);
  } else {
    setFieldError('username', usernameError, '');
  }
}

function validateEmail() {
  const emailValue = getTrimmedValue(email);
  if (!emailValue) {
    setFieldError('email', emailError, MESSAGES.REQUIRED);
  } else if (!emailRegex.test(emailValue)) {
    setFieldError('email', emailError, MESSAGES.EMAIL_INVALID);
  } else {
    setFieldError('email', emailError, '');
  }
}

function validatePassword() {
  const passwordValue = getTrimmedValue(password);
  if (!passwordValue) {
    setFieldError('password', passwordError, MESSAGES.REQUIRED);
  } else if (!passwordRegex.test(passwordValue)) {
    setFieldError('password', passwordError, MESSAGES.PASSWORD_INVALID);
  } else {
    setFieldError('password', passwordError, '');
  }
}

function validateConfirmPassword() {
  const confirmPasswordValue = getTrimmedValue(confirmPassword);
  const passwordValue = getTrimmedValue(password);
  if (!confirmPasswordValue) {
    setFieldError('confirmPassword', confirmPasswordError, MESSAGES.REQUIRED);
  } else if (confirmPasswordValue !== passwordValue) {
    setFieldError('confirmPassword', confirmPasswordError, MESSAGES.CONFIRM_PASSWORD_MISMATCH);
  } else {
    setFieldError('confirmPassword', confirmPasswordError, '');
  }
}

function validateForm() {
  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  for (const field in errors) {
    if (errors[field]) {
      return false;
    }
  }
  return true;
}

function resetData() {
  form.reset();
  setFieldError('username', usernameError, '');
  setFieldError('email', emailError, '');
  setFieldError('password', passwordError, '');
  setFieldError('confirmPassword', confirmPasswordError, '');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (validateForm()) {
    const userData = {
      username: getTrimmedValue(username),
      email: getTrimmedValue(email),
      password: getTrimmedValue(password),
    };
    const users = JSON.parse(localStorage.getItem('registeredUsersArr')) || [];
    // dùng const ở đây được không em? Var, let, const khác gì nhau? =>> dùng const đưuọc. Var,let, const khác nhau ở phép gán lại giá trị, phạm vi
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
