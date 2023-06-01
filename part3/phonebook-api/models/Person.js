const { model, Schema } = require('mongoose');

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    }
});

module.exports = model('person', personSchema);