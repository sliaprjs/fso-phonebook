const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

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

// Get person
app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id;
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person)
  } else {
    res.status(404).end();
  }
})

// Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id;
  persons = persons.filter(p => p.id !== id);
  console.log(persons);

  res.status(204).end();
})

// Add person
const generateId = () => {
  return Math.floor((Math.random() * 1000))
}

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'Name is missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'Number is missing'
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'Name already exists'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person);

  res.json(person)
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

// Non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})