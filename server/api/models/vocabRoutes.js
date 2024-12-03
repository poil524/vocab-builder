const vocabBuilder = require('../controllers/vocabController');
// Define route
module.exports = app => {
    // List all words
    app
        .route('/words')
        .get(vocabBuilder.list_all_words)
        .post(vocabBuilder.create_a_word);
    // View the specific word by its ID
    app
        .route('/words/:wordId')
        .get(vocabBuilder.read_a_word)
        .put(vocabBuilder.update_a_word)
        .delete(vocabBuilder.delete_a_word);
};