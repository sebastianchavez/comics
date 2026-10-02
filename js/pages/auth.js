/* ============================================
   Auth Pages - Login, Registro, Recuperar
   ============================================ */

const AuthPages = (() => {

  // ===== LOGIN =====
  function initLogin() {
    Components.init();

    const redirect = Helpers.getParam('redirect') || 'perfil.html';
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value.trim();
      const password = form.password.value;
      const remember = form.remember.checked;

      // Reset errors
      form.querySelectorAll('.input-comic').forEach(i => i.classList.remove('error'));

      let valid = true;
      if (!Helpers.isValidEmail(email)) {
        form.email.classList.add('error');
        valid = false;
      }
      if (!Helpers.isValidPassword(password)) {
        form.password.classList.add('error');
        valid = false;
      }
      if (!valid) {
        Helpers.toast('Por favor revisa los campos', 'error');
        return;
      }

      const result = Store.Auth.login(email, password);
      if (!result.ok) {
        Helpers.toast(result.error, 'error');
        form.password.classList.add('error');
        return;
      }
      Helpers.toast(`¡Bienvenido de nuevo, ${result.user.firstName}!`, 'success');
      setTimeout(() => window.location.href = redirect, 800);
    });

    // Quick login button
    document.getElementById('quick-login')?.addEventListener('click', () => {
      document.querySelector('#login-form [name="email"]').value = 'demo@comics.com';
      document.querySelector('#login-form [name="password"]').value = '123456';
      Helpers.toast('Credenciales demo cargadas', 'info');
    });
  }

  // ===== REGISTER =====
  function initRegister() {
    Components.init();

    const redirect = Helpers.getParam('redirect') || 'perfil.html';

    // Password strength indicator
    const pwdInput = document.getElementById('reg-password');
    if (pwdInput) {
      pwdInput.addEventListener('input', (e) => updatePasswordStrength(e.target.value));
    }

    document.getElementById('register-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const data = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
        address: {
          street: form.street.value.trim(),
          city: form.city.value.trim(),
          state: form.state.value.trim(),
          zip: form.zip.value.trim(),
          country: form.country.value || 'España'
        }
      };

      form.querySelectorAll('.input-comic').forEach(i => i.classList.remove('error'));
      const errors = {};

      if (!Helpers.isValidName(data.firstName)) errors.firstName = true;
      if (!Helpers.isValidName(data.lastName)) errors.lastName = true;
      if (!Helpers.isValidEmail(data.email)) errors.email = true;
      if (!Helpers.isValidPhone(data.phone)) errors.phone = true;
      if (!Helpers.isValidPassword(data.password)) errors.password = true;
      if (data.password !== data.confirmPassword) errors.confirmPassword = true;
      if (!form.accept.checked) errors.accept = true;

      Object.keys(errors).forEach(k => {
        const el = form.querySelector(`[name="${k}"]`);
        if (el) el.classList.add('error');
      });

      if (Object.keys(errors).length > 0) {
        Helpers.toast('Por favor revisa los campos marcados', 'error');
        return;
      }

      const { confirmPassword, ...registerData } = data;
      const result = Store.Auth.register(registerData);
      if (!result.ok) {
        Helpers.toast(result.error, 'error');
        form.querySelector('[name="email"]').classList.add('error');
        return;
      }
      Helpers.toast(`¡Bienvenido a Comic Store, ${result.user.firstName}!`, 'success');
      setTimeout(() => window.location.href = redirect, 800);
    });
  }

  function updatePasswordStrength(pwd) {
    const bar = document.getElementById('pwd-strength-bar');
    const text = document.getElementById('pwd-strength-text');
    if (!bar || !text) return;
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 10) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    const levels = [
      { width: '0%', color: 'bg-gray-200', label: '' },
      { width: '20%', color: 'bg-red-500', label: 'Muy débil' },
      { width: '40%', color: 'bg-orange-500', label: 'Débil' },
      { width: '60%', color: 'bg-yellow-500', label: 'Aceptable' },
      { width: '80%', color: 'bg-green-500', label: 'Fuerte' },
      { width: '100%', color: 'bg-green-600', label: 'Muy fuerte' }
    ];
    const lvl = levels[strength];
    bar.style.width = lvl.width;
    bar.className = `h-full transition-all ${lvl.color}`;
    text.textContent = lvl.label;
    text.className = `text-xs mt-1 ${strength >= 4 ? 'text-green-600' : strength >= 3 ? 'text-yellow-600' : 'text-red-600'}`;
  }

  // ===== RECOVER =====
  function initRecover() {
    Components.init();

    document.getElementById('recover-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value.trim();
      form.querySelectorAll('.input-comic').forEach(i => i.classList.remove('error'));

      if (!Helpers.isValidEmail(email)) {
        form.email.classList.add('error');
        Helpers.toast('Email no válido', 'error');
        return;
      }

      const result = Store.Auth.requestPasswordReset(email);
      Helpers.toast(result.message, 'success');
      form.reset();
      document.getElementById('recover-success').classList.remove('hidden');
    });
  }

  return { initLogin, initRegister, initRecover };
})();

window.AuthPages = AuthPages;