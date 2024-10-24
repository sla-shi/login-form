document.addEventListener('DOMContentLoaded', function () {
  const modalHTML = `
  <div class="modal-content">
    <span class="close" id="closeModal">&times;</span>
    <h2>Form customization settings</h2>

    <label for="formColor">Color of the form:</label>
    <input type="color" id="formColor"><br><br>

    <label for="buttonColor">color of buttons:</label>
    <input type="color" id="buttonColor"><br><br>

    <label for="formPosition">Form position:</label>
      <select id="formPosition">
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
      </select><br><br>

    <button id="applySettings">Save</button>
  </div>`;

  document.getElementById('settingsModal').innerHTML = modalHTML;

  const settingsBtn = document.getElementById('settingsBtn');
  const modal = document.getElementById('settingsModal');
  const closeModal = document.getElementById('closeModal');
  const applySettingsButton = document.getElementById('applySettings');
  const formColorInput = document.getElementById('formColor');
  const buttonColorInput = document.getElementById('buttonColor');
  const formPositionSelect = document.getElementById('formPosition');

  settingsBtn.onclick = function () {
    modal.style.display = "block";
    setTimeout(() => modal.classList.add('active'), 10);

    loadSettings();
  }

  closeModal.onclick = function () {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = "none", 500);
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = "none", 500)
    }
  }

  applySettingsButton.onclick = function () {
    const formColor = formColorInput.value;
    const buttonColor = buttonColorInput.value;
    const formPosition = formPositionSelect.value;

    const currentFormColor = document.querySelector('.form-fields').style.backgroundColor;
    const currentButtonColor = document.querySelector('#submit').style.backgroundColor;

    if (formColor !== currentFormColor) {
      document.querySelector('.form-fields').style.backgroundColor = formColor;
      localStorage.setItem('formColor', formColor);
    }

    if (buttonColor !== currentButtonColor) {
      document.querySelector('#submit').style.backgroundColor = formColor;
      localStorage.setItem('buttonColor', buttonColor);
    }

    const form = document.querySelector('.form-fields');
    if (formPosition === 'left') {
      form.style.marginLeft = '0';
      form.style.marginRight = 'auto';
    } else if (formPosition === 'center') {
      form.style.marginLeft = 'auto';
      form.style.marginRight = 'auto';
    } else if (formPosition === 'right') {
      form.style.marginLeft = 'auto';
      form.style.marginRight = '0';
    }

    localStorage.setItem('formPosition', formPosition);

    modal.classList.remove('active');
    setTimeout(() => modal.style.display = "none", 500);
  }

  function loadSettings() {
    const savedFormColor = localStorage.getItem('formColor');
    const savedButtonColor = localStorage.getItem('buttonColor');
    const savedFormPosition = loadSettings.getItem('formPosition');

    if (savedFormColor) formColorInput.value = savedFormColor;
    if (savedButtonColor) formColorInput.value = savedButtonColor;
    if (savedFormPosition) formPositionSelect.value = savedFormPosition;

    if (savedFormColor) document.querySelector('.form-fields').style.backgroundColor = savedFormColor;
    if (savedButtonColor) document.querySelector('#submit').style.backgroundColor = savedButtonColor;

    const form = document.querySelector('.form-fields');
    if (savedFormPosition === 'left') {
      form.style.marginLeft = '0';
      form.style.marginRight = 'auto';
    } else if (savedFormPosition === 'center') {
      form.style.marginLeft = 'auto';
      form.style.marginRight = 'auto';
    } else if (savedFormPosition === 'right') {
      form.style.marginLeft = 'auto';
      form.style.marginRight = '0';
    }
  }

  loadSettings();
});

const themes = {
    light: {
      bodyBackgroundColor: '#fff',
      formBackgroundColor: '#3ab4fa',
      textColor: '#000',
      buttonBackgroundColor: '#ff9800',
      buttonTextColor: '#fff',
      buttonHoverBackgroundColor: '#fff',
      buttonHoverTextColor: '#ff9800',
      fieldBorderColor: '#007bff'
    },
    dark: {
      bodyBackgroundColor: '#121212',
      formBackgroundColor: '#333',
      textColor: '#333',
      buttonBackgroundColor: '#555',
      buttonTextColor: '#fff',
      buttonHoverBackgroundColor: '#fff',
      buttonHoverTextColor: '#333',
      fieldBorderColor: '#000'
    }
  };

  function applyTheme(theme) {
    const form = document.querySelector('.form-fields');
    const button = document.querySelector('#submit');
    const fields = document.querySelectorAll('input, select, textarea');

    document.body.style.backgroundColor = theme.bodyBackgroundColor;

    if (form && theme) {
      form.style.backgroundColor = theme.formBackgroundColor;
      form.style.color = theme.textColor;
      button.style.backgroundColor = theme.buttonBackgroundColor;
      button.style.color = theme.buttonTextColor;

      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = theme.buttonHoverBackgroundColor;
        button.style.color = theme.buttonHoverTextColor;
      });

      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = theme.buttonBackgroundColor;
        button.style.color = theme.buttonTextColor;
      });

      fields.forEach(field => {
        field.style.borderColor = theme.fieldBorderColor;
        field.style.color = theme.textColor;

        // fields.addEventListener('mouseover', () => {
        //   button.style.borderColor = theme.fieldBorderColor;
        // });

        // fields.addEventListener('mouseout', () => {
        //   button.style.borderColor = theme.fieldBorderColor;
        // });
      });
    }
  }

  function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

 function applyThemeFromURL() {
  const selectTheme = getQueryParameter('theme');
  const theme = themes[selectTheme] || themes['light'];
  applyTheme(theme);
}