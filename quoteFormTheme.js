document.addEventListener('DOMContentLoaded', function () {
  const modalHTML = `
  <div class="modal-content">
    <span class="close" id="closeModal">&times;</span>
    <h2>Form customization settings</h2>

    <label for="formColor">Color of the form:</label>
    <input type="color" id="formColor"><br><br>

    <label for="buttonColor">Color of buttons:</label>
    <input type="color" id="buttonColor"><br><br>

    <label for="formPosition">Form position:</label>
      <select id="formPosition">
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
      </select><br><br>

      <div class="settingsButtons">
        <button id="applySettings">Save</button>
        <button id="resetSettings">Reset</button>
      </div>
  </div>`;

  document.getElementById('settingsModal').innerHTML = modalHTML;

  const settingsBtn = document.getElementById('settingsBtn');
  const modal = document.getElementById('settingsModal');
  const closeModal = document.getElementById('closeModal');
  const applySettingsButton = document.getElementById('applySettings');
  const resetSettingsButton = document.getElementById('resetSettings');
  const formColorInput = document.getElementById('formColor');
  const buttonColorInput = document.getElementById('buttonColor');
  const formPositionSelect = document.getElementById('formPosition');

  //Show modal window
  settingsBtn.onclick = function () {
    modal.style.display = "block";
    setTimeout(() => modal.classList.add('active'), 10);
    //Load saved settings if any
    loadSettings();
  }

  closeModal.onclick = function () {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = "none", 500);
  }

  //Close window when clicking outside modal window
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = "none", 500)
    }
  }

  //Apply settings on click "Save"
  applySettingsButton.onclick = function () {
    const formColor = formColorInput.value;
    const buttonColor = buttonColorInput.value;
    const formPosition = formPositionSelect.value;

    if (formColor) localStorage.setItem('formColor', formColor);
    if (buttonColor) localStorage.setItem('buttonColor', buttonColor);
    if (formPosition) localStorage.setItem('formPosition', formPosition);

    document.querySelector('.form-fields').style.backgroundColor = formColor;
    document.querySelector('#submit').style.backgroundColor = buttonColor;
    setFormPosition(formPosition);

    modal.classList.remove('active');
    setTimeout(() => modal.style.display = "none", 500);
  }

  //Function to load settings from localStore
  function loadSettings() {
    const currentTheme = getQueryParameter('theme') || 'light';
    const initialStyles = themes[currentTheme];
    
    const savedFormColor = localStorage.getItem('formColor') || initialStyles.formBackgroundColor;
    const savedButtonColor = localStorage.getItem('buttonColor') || initialStyles.buttonBackgroundColor;
    const savedFormPosition = localStorage.getItem('formPosition') || 'center';
    
    document.querySelector('.form-fields').style.backgroundColor = savedFormColor;
    setFormPosition(savedFormPosition);

    applyTheme({
      initialStyles,
      buttonBackgroundColor: savedButtonColor,
      formBackgroundColor: savedFormColor
    });

    formColorInput.value = savedFormColor;
    buttonColorInput.value = savedButtonColor;
    formPositionSelect.value = savedFormPosition;
  }

  function setFormPosition(position) {
    const form = document.querySelector('.form-fields');
    form.style.marginLeft = position === 'left' ? '0' : 'auto';
    form.style.marginRight = position === 'right' ? '0' : 'auto';
  }

  function resetSettings() {
    const currentTheme = getQueryParameter('theme') || 'light';
    const initialStyles = themes[currentTheme];

    localStorage.removeItem('formColor');
    localStorage.removeItem('buttonColor');
    localStorage.removeItem('formPosition');

    // //Reset form style to initial state
    document.querySelector('.form-fields').style.backgroundColor = initialStyles.formBackgroundColor;
    document.querySelector('#submit').style.backgroundColor = initialStyles.buttonBackgroundColor;
    setFormPosition('center');

    formColorInput.value = initialStyles.formBackgroundColor;
    buttonColorInput.value = initialStyles.buttonBackgroundColor;
    formPositionSelect.value = 'center';

    applyTheme(initialStyles);
  }

  resetSettingsButton.onclick = function () {
    resetSettings();
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
      button.style.backgroundColor = localStorage.getItem('buttonColor') || theme.buttonBackgroundColor;
      button.style.color = theme.buttonTextColor;

      const buttonHoverBackgroundColor = localStorage.getItem('buttonHoverBackgroundColor') || theme.buttonHoverBackgroundColor;
      const buttonHoverTextColor = localStorage.getItem('buttonHoverTextColor') || theme.buttonHoverTextColor;

      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = buttonHoverBackgroundColor;
        button.style.color = buttonHoverTextColor;
      });

      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = localStorage.getItem('buttonColor') || theme.buttonBackgroundColor;
        button.style.color = theme.buttonTextColor;
      });

      fields.forEach(field => {
        field.style.borderColor = theme.fieldBorderColor;
        field.style.color = theme.textColor;

        // fields.addEventListener('mouseover', () => {
        //   fields.style.borderColor = theme.fieldBorderColor;
        // });

        // fields.addEventListener('mouseout', () => {
        //   fields.style.borderColor = theme.fieldBorderColor;
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