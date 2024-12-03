const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

// List all words
exports.list_all_words = (req, res) => {
    Vocab.find({}, (err, words) => {
        if (err) res.send(err);  // Handle error if any
        res.json(words);  // Return the list of words in JSON format
    });
};

// Create a new word and save it to the database
exports.create_a_word = (req, res) => {
    const newWord = new Vocab(req.body);  // Create a new Vocab object using data from the request body
    newWord.save((err, word) => {
        if (err) {
            return res.status(500).send(err);  // Return error response if saving fails
        }
        res.json(word);  // Return the newly created word
    });
};

// View a word by its ID
exports.read_a_word = (req, res) => {
    Vocab.findById(req.params.wordId, (err, word) => {
        if (err) res.send(err);  
        res.json(word); 
    });
};

// Update a word
exports.update_a_word = (req, res) => {
    Vocab.findOneAndUpdate(
        {_id: req.params.wordId},  // Find the word by its ID
        req.body,  // Update the word with data from the request body
        {new: true},  // Return the updated word
        (err, word) => {
            if (err) res.send(err); 
            res.json(word);  // Return the updated word
        }
    );
};

// Delete a word by its ID
exports.delete_a_word = (req, res) => {
    Vocab.deleteOne({_id: req.params.wordId}, err => {
        if (err) res.send(err); 
        res.json({
            message: 'Word successfully deleted', 
            _id: req.params.wordId  // Include the ID of the deleted word
        });
    });
};
