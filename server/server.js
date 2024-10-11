const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/quotes', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'quote_form.html'))
})

app.post('/quotes', (req, res) => {
  const formData = req.body;
  console.log('Received from submitted successfully', formData);
 res.json({ message: 'Form submitted successfully', data: formData });
});

app.get('/quotes/init-form', (req, res) => {
  const initFormData = {
    services: [
      { id: 1, name: "Deep Clean" },
      { id: 2, name: "Routine clean - Weekly" },
      { id: 3, name: "Routine clean - Biweekly" },
    ],
    square_footage: [
      { id: 1, range_limit: "1 - 900" },
      { id: 2, range_limit: "901 - 1200" },
      { id: 3, range_limit: "1201 - 1500" },
    ]
  };
  res.json(initFormData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});