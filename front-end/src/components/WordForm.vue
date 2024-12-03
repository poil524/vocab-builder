<template>
    <form action="#" @submit.prevent="onSubmit">
        <!-- Error message -->
        <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

        <!-- English -->
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.english" />
        </div>

        <!-- German-->
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.german" />
        </div>

        <!-- Spanish -->
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="spain flag"></i> Spanish
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.spanish" />
        </div>

        <!-- Word class dropdown -->
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class=""></i> Class
            </div>
            <select v-model="word.class" class="ui dropdown" id="wordClassSelect">
                <option value="" disabled>Select a word class</option>
                <option value="noun">noun</option>
                <option value="verb">verb</option>
                <option value="adjective">adjective</option>
                <option value="adverb">adverb</option>
                <option value="pronoun">pronoun</option>
                <option value="preposition">preposition</option>
                <option value="conjunction">conjunction</option>
                <option value="interjection">interjection</option>
                <option value="determiner">determiner</option>
            </select>
        </div>
        <div class="container button">
            <button class="positive ui button">Submit</button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'word-form',
    props: {
        word: {
            type: Object,
            required: false,
            default: () => {
                return {
                    english: '',
                    german: '',
                    spanish: '',
                    class: ''
                };
            }
        }
    },
    data() {
        return {
            errorsPresent: false,
        };
    },
    methods: {
        onSubmit: function () {
            // Check if any field is empty
            if (this.word.english === '' || this.word.german === '' || this.word.spanish === '' || this.word.class ==='') {
                this.errorsPresent = true;
            } else {
                // Emit createOrUpdate event with the current word data
                this.$emit('createOrUpdate', this.word);
                // Reset the form
                this.word.english = '';
                this.word.german = '';
                this.word.spanish = '';
                this.word.class = '';
                this.errorsPresent = false;
            }
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
}

#wordClassSelect {
    width: 100%;
    height: 41px;
    padding: 8px 0px 8px 14px;
    font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

#wordClassSelect option {
    color: black;
}

#wordClassSelect option:first-child {
    color: grey;
}
</style>