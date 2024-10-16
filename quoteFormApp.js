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

  fetchInitFormData();

  document.getElementById('quoteForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const termsCheckbox = document.getElementById('terms');

    if (!termsCheckbox.checked) {
      event.preventDefault();
      alert('Please agree to the terms of service before submitting');
    } else {
      //Data to send
      const formData = {
        client_first_name: document.getElementById('first_name').value,
        client_last_name: document.getElementById('last_name').value,
        client_phone: document.getElementById('phone').value,
        client_email: document.getElementById('email').value,
        zip_code: document.getElementById('zip_code').value,
        hear_about_id: parseInt(document.getElementById('hear_about').value, 10),
        type_location_id: parseInt(document.getElementById('type_location').value, 10),
        service_type_id: parseInt(document.getElementById('service_type').value, 10),
        square_footage_id: parseInt(document.getElementById('square_footage').value, 10)
      };
      
      if (!formData.client_first_name || !formData.client_last_name || !formData.client_phone || !formData.client_email || !formData.zip_code ||
        isNaN(formData.hear_about_id) || isNaN(formData.type_location_id) || isNaN(formData.service_type_id) || isNaN(formData.square_footage_id)) {
        alert('Please fill in all fields');
        return;
      }

      //Send POST req
      try {
        const response = await fetch('https://api-dev.thecleaningsoftware.com/api/quotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
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
            alert(data.message);
          } else {
            alert('Unknown error. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error submitting the form: ', error);
        alert('Error submitting the form');
      }
    }
  });

  // Function for getting data from api
  async function fetchInitFormData() {
    try {
      const response = await fetch('https://api-dev.thecleaningsoftware.com/api/quotes/init-form');

      if (!response.ok) {
        throw new Error('Failed to fetch from data');
      }

      const data = await response.json();

      //Checking the data structure and filling out the form
      if (data && data.services && data.square_footage) {
        populateForm(data);
      } else {
        console.error('Invalid data structure from server');
      }
    } catch(error) {
      console.log('Error fetching init from data: ', error);
    }
  }
  
  //Function for dynamically filling form fields
  function populateForm(data) {
    const serviceTypeSelect = document.getElementById('service_type');
    const squareFootageSelect = document.getElementById('square_footage');

    if (serviceTypeSelect && squareFootageSelect) {
      //Filling services
      data.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceTypeSelect.appendChild(option);
      });
      
      //Filling square footage ranges
      data.square_footage.forEach(range => {
        const option = document.createElement('option');
        option.value = range.id;
        option.textContent = range.range_limit;
        squareFootageSelect.appendChild(option);
      });
    } else {
      console.error('Form select elements not found');
    }
  }
});