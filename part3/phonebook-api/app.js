const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const { Person } = require("./models");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI);


const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${ process.env.PORT } port`);
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.get('/api/persons', async (req, res) => {
    const persons = await Person.find();

    res.json(persons);
});

app.get('/api/persons/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const person = await Person.findById(id);

        if (!person) {
            throw new Error('User is not found');
        }

        res.json(person);
    } catch (e) {
        next(e);
    }
});

app.delete('/api/persons/:id', async (req, res) => {
    const { id } = req.params;

    const person = await Person.findById(id);

    if (!person) {
        return res.status(404);
    }

    await Person.findByIdAndDelete(id);

    res.status(204).end();
});

app.post('/api/persons', async (req, res, next) => {
    try {
        const { name, number } = req.body;


        if (!name || !number) {
            return res.status(400).end();
        }

        const person = await Person.findOne({ name });

        if (person) {
            return res.status(400).send('name must be unique');
        }

        const personFromDB = await Person.create({ name, number });

        res.status(201).json(personFromDB);
    } catch (e) {
        next(e)
    }
});

app.get('/info', (req, res) => {
    res.send(`
    <p>Phonebook has info for ${ persons.length }</p>
    <p>${ new Date().toString() }</p>
     `)
});

app.use(errorHandler);