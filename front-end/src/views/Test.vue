<template>
   
  <div>
    <h1>Create Your Test</h1>

    <!-- Language Selection Form -->
    <h3>Select Languages</h3>
    <div v-for="(display, index) in displaySettings" :key="index">
      <label>
        <input type="checkbox" v-model="display.checked" />
        {{
          display.language.charAt(0).toUpperCase() + display.language.slice(1)
        }}
      </label>
    </div>
    <!-- Number of Questions Input -->
    <h3>Select Number of Questions</h3>
    <input type="number" v-model="numQuestions" min="1" :max="words.length" placeholder="Enter number of questions" />

    <!-- Submit Button -->
    <button class="ui button" @click="createTest">Create Test</button>

    <!-- Display Test After Submission -->
    <div v-if="testCreated">
      <vocab-test :words="selectedWords" :selectedLanguages="selectedLanguages"></vocab-test>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/helpers";
import VocabTest from "../components/VocabTest.vue";

export default {
  name: "test",
  components: {
    "vocab-test": VocabTest,
  },
  data() {
    return {
      words: [],
      numQuestions: 5, // Default number of questions
      testCreated: false, // Toggle to display the test after creation
      selectedWords: [], // Stores the selected words for the test
      displaySettings: [
        { language: "english", checked: true },
        { language: "german", checked: true },
        { language: "spanish", checked: false },
      ],
    };
  },
  computed: {
    selectedLanguages() {
      return this.displaySettings
        .filter((setting) => setting.checked)
        .map((setting) => setting.language);
    },
  },
  async mounted() {
    this.words = await api.getWords();
  },
  methods: {
    createTest() {
      if (this.selectedLanguages.length < 2) {
        alert("Please select at least two languages.");
        return;
      }
      if (this.numQuestions > 0 && this.numQuestions <= this.words.length) {
        // Randomly select the specified number of questions
        this.selectedWords = this.words
          .sort(() => 0.5 - Math.random())
          .slice(0, this.numQuestions);
        this.testCreated = true;
      } else {
        alert("Please select a valid number of questions.");
      }
    },
  },
};
</script>
