const express = require('express');
const app = express();

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

// Main page
app.get('/', (req, res) => {
  res.send('<h1>Phonebook App</h1>');
})

// Get all
app.get('/api/persons', (req, res) => {
  res.json(persons);
})

// Info page
app.get('/info', (req, res) => {
  const pInfo = `Phonebook has info for ${persons.length} people`;
  const cDate = new Date();

  res.send(`
    <p>${pInfo}</p>
    <p>${cDate}</p>
  `)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})