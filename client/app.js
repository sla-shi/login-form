document.addEventListener('DOMContentLoaded', () => {

  var formHTML = `
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
            <input type="number" name="hear_about" id="hear_about" required>
          </div>
              
          <div>
            <label for="type_location" class="required-label">Location Type:</label>
            <input type="number" name="type_location" id="type_location" required>
          </div>
              
          <div>
            <label for="service_type" class="required-label">Service Type:</label>
            <select name="service_type" id="service_type" required>
              <option value="">--Select a service--</option>
            </select>
          </div>
              
          <div>
            <label for="square_footage:" class="required-label">Square Footage:</label>
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
  } else {
    console.log('Error: Element with id "quoteForm" not found');
    return;
  }

  fetch('/quotes/init-form')
    .then(response => response.json())
    .then(data => {
      populateForm(data);
    })
    .catch(error => {
      console.log('Error fetching init from data: ', error);
    });
  
  //Function for dynamically filling form fields
  function populateForm(data) {
    const serviceTypeSelect = document.getElementById('service_type');
    const squareFootageSelect = document.getElementById('square_footage');

    //Filling services
    data.services.forEach(service => {
      const option = document.createElement('option');
      option.value = service.id;
      option.textContent = service.name;
      serviceTypeSelect.appendChild(option);
    });

    //The square footage ranges
    data.square_footage.forEach(range => {
      const option = document.createElement('option');
      option.value = range.id;
      option.textContent = range.range_limit;
      squareFootageSelect.appendChild(option);
    });
  }

  document.getElementById('quoteForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const termsCheckbox = document.getElementById('terms');

    if (!termsCheckbox.checked) {
      event.preventDefault();
      alert('Please agree to the terms of service before submitting');
    } else {
      //Data to send
    const formData = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      zip_code: document.getElementById('zip_code').value,
      hear_about: parseInt(document.getElementById('hear_about').value, 10),
      type_location: parseInt(document.getElementById('type_location').value, 10),
      service_type: parseInt(document.getElementById('service_type').value, 10),
      square_footage: parseInt(document.getElementById('square_footage').value, 10)
    };
      
      if (!formData.first_name || !formData.last_name || !formData.phone || !formData.email || !formData.zip_code ||
          isNaN(formData.hear_about) || isNaN(formData.type_location) || isNaN(formData.service_type) || isNaN(formData.square_footage)) {
        alert('Please fill in all fields');
        return;
      }

    //Send POST req
    fetch('/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Form submitted successfully: ', data);
        alert('Form submitted successfully');
      })
      .catch(error => {
        console.error('Error submitting the form: ', error);
        alert('Error submitting the form');
      });
    }
  });
});
