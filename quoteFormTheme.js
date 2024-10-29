const themes = {
    light: {
      bodyBackgroundColor: '#fff',
      formBackgroundColor: '#3ab4fa',
      textColor: '#000',
      buttonBackgroundColor: '#ff9800',
      buttonTextColor: '#fff',
      buttonHoverBackgroundColor: '#fff',
      buttonHoverTextColor: '#ff9800',
      fieldBorderColor: '0'
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

      const buttonHoverBackgroundColor = theme.buttonHoverBackgroundColor;
      const buttonHoverTextColor = theme.buttonHoverTextColor;

      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = buttonHoverBackgroundColor;
        button.style.color = buttonHoverTextColor;
      });

      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = theme.buttonBackgroundColor;
        button.style.color = theme.buttonTextColor;
      });

      fields.forEach(field => {
        field.style.borderColor = theme.fieldBorderColor;
        field.style.color = theme.textColor;

        field.addEventListener('mouseover', () => {
          field.style.borderColor = theme.fieldBorderColor;
        });

        field.addEventListener('mouseout', () => {
          field.style.borderColor = theme.fieldBorderColor;
        });
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