<template>
    <div>
        <h1>Words</h1>
        <!-- Search bar -->
        <input type="text" id="searchWord" @keyup="searchWordFunction" placeholder="Search for word..">
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

        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th v-for="display in displaySettings" v-if="display.checked">
                        {{ display.language.charAt(0).toUpperCase() + display.language.slice(1) }}
                    </th>
                    <th>Class</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in words" :key="i">
                <td v-for="display in displaySettings" v-if="display.checked">
                    <!--Clikc on the word to access it-->
                    <router-link :to="{ name: 'show', params: { id: word._id } }">
                        {{ word[display.language] }}
                    </router-link>
                </td>
                <td>{{ word.class }}</td>
                <!-- Remove Edit and Show
                <td width="75" class="center aligned">
                    <router-link v-if="word._id" :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
                </td>
                <td width="75" class="center aligned">
                    <router-link v-if="word._id"
                        :to="{ name: 'show', params: { id: word._id } }">View/Edit</router-link>
                </td>
                -->
                <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                    <a :href="`/words/${word._id}`">Destroy</a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { api } from "../helpers/helpers";

export default {
    name: 'words',
    data() {
        return {
            words: [],
            displaySettings: [
                { checked: true, language: 'english' },
                { checked: true, language: 'german' },
                { checked: true, language: 'spanish' }
            ]
        };
    },
    methods: {
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            this.flash('Word deleted successfully!', 'success');
            const newWords = this.words.filter(word => word._id !== id);
            this.words = newWords;
        },
        searchWordFunction() {
            const input = document.getElementById("searchWord");
            const filter = input.value.toUpperCase();
            const table = document.getElementById("words");
            const tr = table.getElementsByTagName("tr");

            for (let i = 1; i < tr.length; i++) {
                const tdArray = tr[i].getElementsByTagName("td");
                let found = false;

                // Search only within visible columns
                for (let j = 0; j < tdArray.length - 3; j++) {
                    if (tdArray[j]) {
                        const txtValue = tdArray[j].textContent || tdArray[j].innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            found = true;
                            break;
                        }
                    }
                }
                tr[i].style.display = found ? "" : "none";
            }
        }
    },
    async mounted() {
        this.words = await api.getWords();
        console.log(this.words);
    }
};
</script>
