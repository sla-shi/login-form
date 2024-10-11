(function () {
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
            By submitting this form, you are acknowledging you would like to be contacted by Maids and Moore at the phone number provided. Maids and Moore may contact you about its services through various automated and recorded means including telephone, text and email. Note: Messaging frequency may vary and data rates may apply.
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
  }
})();