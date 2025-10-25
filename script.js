document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registrationForm');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const successMsg = document.getElementById('success');

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    input.classList.add('invalid');
  }

  function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
    input.classList.remove('invalid');
  }

  function validateUsername() {
    const value = username.value.trim();
    if (value.length < 3) {
      showError(username, 'Username must be at least 3 characters.');
      return false;
    }
    clearError(username);
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(email, 'Please enter a valid email.');
      return false;
    }
    clearError(email);
    return true;
  }

  function validatePassword() {
    const value = password.value;
    if (value.length < 6) {
      showError(password, 'Password must be at least 6 characters.');
      return false;
    }
    clearError(password);
    return true;
  }

  function validateConfirmPassword() {
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
      showError(confirmPassword, 'Passwords do not match.');
      return false;
    }
    clearError(confirmPassword);
    return true;
  }

  // Real-time validation
  username.addEventListener('input', validateUsername);
  email.addEventListener('input', validateEmail);
  password.addEventListener('input', validatePassword);
  confirmPassword.addEventListener('input', validateConfirmPassword);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    if (!validateUsername()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validatePassword()) valid = false;
    if (!validateConfirmPassword()) valid = false;

    if (valid) {
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => { successMsg.style.display = 'none'; }, 2000);
      // Alternatively, here you can handle data sending to your backend.
    }
  });
});