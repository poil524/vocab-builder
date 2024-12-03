<template>
  <div>
    <!-- Display score -->
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

    <!-- Form for user to enter input -->
    <form action="#" @submit.prevent="onSubmit"> <!--Prevents default form submission and triggers onSubmit-->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord.english" />
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" placeholder="Enter word..." v-model="german" :disabled="testOver" autocomplete="off" />
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="spain kingdom flag"></i> Spanish
        </div>
        <input type="text" placeholder="Enter word..." v-model="spanish" :disabled="testOver" autocomplete="off" />
      </div>
      <!-- Submit button -->
      <div class="container button">
        <button class="positive ui button" :disabled="testOver">Submit</button>
      </div>
    </form>
    <!-- Display results after test -->
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
    }
  },
  data() {
    return {
      // Shuffle words for random order
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      german: '',
      spanish: '',
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord: function () {
      // Return the current word, or an empty string if no words are left
      return this.randWords.length ? this.randWords[0] : '';
    }
  },
  methods: {
    onSubmit: function () {
      // Check if the entered inputs are correct
      if (this.german === this.currWord.german && this.spanish === this.currWord.spanish) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord.german);
      }

      // Reset input fields
      this.german = '';
      this.spanish = '';
      this.randWords.shift(); // Remove the current word from the list so it do not appear again

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function () {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    }
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>