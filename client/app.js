
document.addEventListener('DOMContentLoaded', () => {

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
  });
});
