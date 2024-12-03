<template>
  <div>
    <h1>Show Word</h1>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" readonly :value="word.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" readonly :value="word.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="spain flag"></i> Spanish
      </div>
      <input type="text" readonly :value="word.spanish" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class=""></i> Class
      </div>
      <input type="text" readonly :value="word.class" />
    </div>
    <div class="container button">
      <div class="actions">
        <button class="primary ui button">
          <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }">
            Edit
          </router-link>
        </button>
      </div>
      <button class="negative ui button" @click.prevent="onDestroy(word._id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'

export default {
  name: 'show',
  data() {
    return {
      word: '',
    };
  },

  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleteWord(id);
      this.flash('Word deleted successfully!', 'success');  // Call the API to delete the word
      this.$router.push({ name: 'words' }); // Redirect to the words list page
    },
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  color: white;
}

.primary.ui.button {
  width: 90px;
  margin-right: 50px;
}

.negative.ui.button {
  background-color: white;
  color: #db2828;
  border: 2px solid #db2828;
  width: 90px;
  margin-left: 50px;
}
</style>