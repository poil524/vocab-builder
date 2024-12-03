const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Vocab model
const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: 'German word cannot be blank'
        },
        spanish: {
            type: String,
            required: 'Spanish word cannot be blank'
        },
        class: {
            type: String,
            required: 'Please select a word class'
        }
    },
    {collection: 'vocab3'}
);
// Create and export the Vocab model based on the VocabSchema
module.exports = mongoose.model('Vocab', VocabSchema);