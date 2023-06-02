const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as an argument');
}

const password = process.argv[2];
const personName = process.argv[3];
const personPhone = process.argv[4];

const url = `mongodb+srv://sliaprjs:${password}@cluster0.lkqirus.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: personName || 'John Smith',
  number: personPhone || '012'
});

person.save().then(result => {
  console.log(`Added ${personName} with number ${personNumber} to phonebook`);
  mongoose.connection.close();
})