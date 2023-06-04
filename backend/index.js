require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

const errorHandler = (error, req, res, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error);
};



// Main page
app.get('/', (req, res) => {
  res.send('<h1>Phonebook App</h1>');
})

// Get all
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  })
})

// Get person
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end();
    }
  })
})

// Delete person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(result => {
    res.status(204).end()
  }).catch(error => next(error));
})

// Add person
const generateId = () => {
  return Math.floor((Math.random() * 1000))
}

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({error: 'Name is missing'});
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson);
  }).catch(error => (console.log(error)))
})

app.put('api/persons/:id', (req, res) => {
  const body = req.body;

  Person.find({name: body.name}).then()
})

// Info page
app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const pInfo = `Phonebook has info for ${persons.length} people`;
    const cDate = new Date();
  
    res.send(`
      <p>${pInfo}</p>
      <p>${cDate}</p>
    `)
  });
})

// Non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})