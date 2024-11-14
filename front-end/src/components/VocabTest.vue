<template>
  <div>
    <h2>Score: {{ score }} out of {{ words.length }}</h2>
    <form action="#" @submit.prevent="onSubmit">
      <div v-if="selectedLanguages.includes('english')" class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" v-model="english" :disabled="testOver" autocomplete="off" />
      </div>
      <div v-if="selectedLanguages.includes('german')" class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" v-model="german" :disabled="testOver" autocomplete="off" />
      </div>
      <div v-if="selectedLanguages.includes('spanish')" class="ui labeled input fluid">
        <div class="ui label">
          <i class="spain flag"></i> Spanish
        </div>
        <input type="text" v-model="spanish" :disabled="testOver" autocomplete="off" />
      </div>
      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>
    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    },
    selectedLanguages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      english: '',
      score: 0,
      testOver: false,
      curHint: '' // The current hint language
    };
  },
  computed: {
    currWord() {
      return this.randWords.length ? this.randWords[0] : '';
    }
  },
  methods: {
    onSubmit() {
      if (this.english === this.currWord.english) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord.german);
      }
      this.english = '';
      this.randWords.shift();
      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    },
    randomizeHintLanguage() {
      // Choose a random language from the selected languages
      const randomIndex = Math.floor(Math.random() * this.selectedLanguages.length);
      this.hintLanguage = this.selectedLanguages[randomIndex];
    },
    isHintLanguage(language) {
      // Check if the provided language is the selected hint language
      return language === this.hintLanguage;
    },
  }
};
</script>
