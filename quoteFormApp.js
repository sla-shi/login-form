document.addEventListener('DOMContentLoaded', () => {

  var formHTML = `
  <div id="loader" style="display: flex;">
    <div id="spinner"></div>
  </div>

  <div class="form-fields">
    <h2>30-second Quote</h2>
    <h3>Save instant 10%, receive instant email</h3>
    <div class="fields">
      <form id="quoteForm">
        <div class="form-body">
          <div>
            <label for="first_name" class="required-label">First Name:</label>
            <input type="text" name="first_name" id="first_name" required>
          </div>
              
          <div>
            <label for="last_name" class="required-label">Last Name:</label>
            <input type="text" name="last_name" id="last_name" required>
          </div>
              
          <div>
            <label for="phone" class="required-label">Phone:</label>
            <input type="text" name="phone" id="phone" required>
          </div>
              
          <div>
            <label for="email" class="required-label">Email:</label>
            <input type="text" name="email" id="email" required>
          </div>
              
          <div>
            <label for="zip_code" class="required-label">Zip Code:</label>
            <input type="text" name="zip_code" id="zip_code" required>
          </div>
              
          <div>
            <label for="hear_about" class="required-label">How did you hear about us?:</label>
            <select name="hear_about" id="hear_about" required>
              <option value="">--Select type--</option>
            </select>
          </div>
              
          <div>
            <label for="type_location" class="required-label">Location Type:</label>
            <select name="type_location" id="type_location" required>
              <option value="">--Select type location--</option>
            </select>
          </div>
              
          <div>
            <label for="service_type" class="required-label">Service Type:</label>
            <select name="service_type" id="service_type" required>
              <option value="">--Select a service--</option>
            </select>
          </div>
              
          <div>
            <label for="square_footage" class="required-label">Square Footage:</label>
            <select name="square_footage" id="square_footage" required>
              <option value="">--Select square footage--</option>
            </select>
          </div>

          <div class="consent-text">Consent</div>

          <div class="checkbox-container">
            <input type="checkbox" id="terms" required>
            <label for="terms">I agree to the terms of service</label>
          </div>

          <div class="terms-notice">
            By submitting this form, you are acknowledging you would like to be contacted by Maids and
            Moore at the phone number provided. Maids and Moore may contact you about its services through
            various automated and recorded means including telephone, text and email. Note: Messaging frequency may vary and data rates may apply.
          </div>

          <button id="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>`;
  
  var quoteFormContainer = document.getElementById('quoteForm');
  if (quoteFormContainer) {
    quoteFormContainer.innerHTML = formHTML;

    applyThemeFromURL();
  } else {
    console.log('Error: Element with id "quoteForm" not found');
    return;
  }

  if (typeof grecaptcha !== 'undefined') {
    grecaptcha.ready(() => {
      console.log('reCaptcha is ready.');
      fetchInitFormData();
    });
  } else {
    console.error('reCaptcha library is not loaded.');
  }

  document.getElementById('quoteForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const termsCheckbox = document.getElementById('terms');

    if (!termsCheckbox.checked) {
      alert('Please agree to the terms of service before submitting');
      return;
    }

    //Data to send
    const formData = {
      client_first_name: document.getElementById('first_name').value.trim(),
      client_last_name: document.getElementById('last_name').value.trim(),
      client_phone: document.getElementById('phone').value.trim(),
      client_email: document.getElementById('email').value.trim(),
      zip_code: document.getElementById('zip_code').value.trim(),
      hear_about_id: parseInt(document.getElementById('hear_about').value, 10),
      type_location_id: parseInt(document.getElementById('type_location').value, 10),
      service_type_id: parseInt(document.getElementById('service_type').value, 10),
      square_footage_id: parseInt(document.getElementById('square_footage').value, 10),
    };
    
    if (!formData.client_first_name || !formData.client_last_name || !formData.client_phone || !formData.client_email || !formData.zip_code ||
      isNaN(formData.hear_about_id) || isNaN(formData.type_location_id) || isNaN(formData.service_type_id) || isNaN(formData.square_footage_id)) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const recaptchaToken = await grecaptcha.execute('6Le040AqAAAAANpuTZ9SlXSOO78-AYfUs0AyyYjI', { action: 'submit' });
      
      if (!recaptchaToken) {
      console.error('Failed to get reCAPTCHA token.');
      return;
      }
      
      //Send POST req
      const response = await fetch('https://api-dev.thecleaningsoftware.com/api/quotes',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'tcs-auth-token': localStorage.getItem('API_TOKEN'),
          'tcs-account-sid': localStorage.getItem('API_SID'),
          'tcs-recaptcha-token': recaptchaToken
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();

        //Handling validation errors
        if (errorData.errors) {
          const errorMessage = errorData.errors.map(err => {
            const property = err.property;
            const constraintMessage = Object.values(err.constraints).join(', ');
            return `${property}: ${constraintMessage}`;
          }).join('\n');

          alert(`Validation error: \n${errorMessage}`);
        } else {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
      } else {
        const data = await response.json();

        //Processing a positive response
        if (data.success) {
          alert(data.message || 'From submitted successfully');
        } else {
          alert('Unknown error. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting the form: ', error);
      alert('Error submitting the form');
    }
  });

  function onReCaptchaLoad() {
    console.log('reCaptcha script has been loaded.');

    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        console.log('reCaptcha is ready to use.');
        document.getElementById('loader').style.display = 'none';
      });
    } else {
      console.error('reCaptcha not loaded');
    }
  }

  // Function for getting data from api
  async function fetchInitFormData() {

    try {
      const recaptchaToken = await grecaptcha.execute('6Le040AqAAAAANpuTZ9SlXSOO78-AYfUs0AyyYjI', { action: 'submit' });

      if (!recaptchaToken) {
      console.error('Failed to get reCAPTCHA token.');
      return;
    }

      const response = await fetch('https://api-dev.thecleaningsoftware.com/api/quotes/init-form', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'tcs-auth-token': localStorage.getItem('API_TOKEN'),
          'tcs-account-sid': localStorage.getItem('API_SID'),
          'tcs-recaptcha-token': recaptchaToken
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch from data');
      }

      const data = await response.json();

      //Checking the data structure and filling out the form
      if (data && data.data) {
        populateForm(data.data);
      } else {
        console.error('Invalid data structure from server');
      }
    } catch(error) {
      console.log('Error fetching init from data: ', error);
    }
  }

  window.onload = function () {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(onReCaptchaLoad);
    } else {
      console.error('reCaptcha not loaded');
    }
  }
  
  //Function for dynamically filling form fields
  function populateForm(data) {
    const serviceTypeSelect = document.getElementById('service_type');
    const squareFootageSelect = document.getElementById('square_footage');
    const hearAboutSelect = document.getElementById('hear_about');
    const typeLocationSelect = document.getElementById('type_location');

    if (serviceTypeSelect && data.services) {
      //Filling services
      data.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceTypeSelect.appendChild(option);
      });
    }
      
    if (squareFootageSelect && data.square_footages) {
      data.square_footages.forEach(range => {
        const option = document.createElement('option');
        option.value = range.id;
        option.textContent = range.range_limit;
        squareFootageSelect.appendChild(option);
      });
    }

    if (hearAboutSelect && data.hear_about_types) {
      data.hear_about_types.forEach(hearAbout => {
        const option = document.createElement('option');
        option.value = hearAbout.id;
        option.textContent = hearAbout.name;
        hearAboutSelect.appendChild(option);
      });
    }

    if (typeLocationSelect && data.locations) {
      data.locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location.id;
        option.textContent = location.name;
        typeLocationSelect.appendChild(option);
      });
    }
  }
});