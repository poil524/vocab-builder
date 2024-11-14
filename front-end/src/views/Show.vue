<template>
  <div>
    <h1>Show Word</h1>

    <!-- Language Display Controls -->
    <div v-for="(display, index) in displaySettings" :key="index">
      <label>
        <input type="checkbox" v-model="display.checked" />
      </label>
      <select v-model="display.language">
        <option value="" disabled selected style="color: grey;">Select a language to display</option>
        <option value="english">English</option>
        <option value="german">German</option>
        <option value="spanish">Spanish</option>
      </select>
    </div>

    <div v-if="isSelected('english')" class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" readonly :value="word.english" />
    </div>

    <div v-if="isSelected('german')" class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" readonly :value="word.german" />
    </div>

    <div v-if="isSelected('spanish')" class="ui labeled input fluid">
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

    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }">
        Edit word
      </router-link>
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
      displaySettings: [
        { checked: true, language: 'english' },
        { checked: true, language: 'german' },
        { checked: true, language: 'spanish' }
      ]
    };
  },

  methods: {
    // Check if the language is selected in the display settings
    isSelected(language) {
      return this.displaySettings.some(display => display.language === language && display.checked);
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
  text-decoration: underline;
  margin: 20px 10px;
}
</style>