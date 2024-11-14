<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

        

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.english" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.german" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="spain flag"></i> Spanish
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.spanish" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class=""></i> Class
            </div>
            <!--
            <input type="text" placeholder="Enter word..." v-model="word.spanish" />
            -->
            <select v-model="word.class">
                <option value="" disabled selected style="color: grey;">Select a word class</option>
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="adverb">Adverb</option>
                <option value="pronoun">Pronoun</option>
                <option value="preposition">Preposition</option>
                <option value="conjunction">Conjunction</option>
                <option value="interjection">Interjection</option>
                <option value="determiner">Determiner</option>
            </select>
        </div>
        <button class="positive ui button">Submit</button>
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
            if (this.word.english === '' || this.word.german === '' || this.word.spanish === '') {
                this.errorsPresent = true;
            } else {
                this.$emit('createOrUpdate', this.word);
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
</style>