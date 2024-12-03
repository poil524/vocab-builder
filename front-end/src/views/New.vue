<template>
    <div>
        <div class="container" id="headerContainer">
            <h1>New Word</h1>
        </div>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>

<script>
import WordForm from '@/components/WordForm.vue';   // Import the WordForm component
import { api } from '../helpers/helpers';

export default {
    name: 'new-word',
    components: {
        'word-form': WordForm // Register WordForm component to be used
    },
    methods: {
        createOrUpdate: async function (word) {
            const res = await api.createWord(word);  // Call the API to create the new word
            this.flash('Word created', 'success');
            this.$router.push(`/words/${res._id}`); // Redirect to the view word page on success
        }
    }
};
</script>