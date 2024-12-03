<template>
    <div>
        <h1>Vocabulary List</h1>
        <div class="table-container">
            <table id="words" class="ui celled compact table">
                <thead>
                    <tr>
                        <!-- Search row -->
                        <th id="searchRow" colspan="7">
                            <input type="text" id="searchInput" @keyup="searchWord" placeholder=" Search for word..">
                        </th>
                    </tr>
                    <!-- Table headers -->
                    <tr>
                        <th>English</th>
                        <th>German</th>
                        <th>Spanish</th>
                        <th>Class</th>
                        <th colspan="3"></th>
                    </tr>
                </thead>
                <!-- List rendering-->
                <tr v-for="(word, i) in words" :key="i">
                    <td>
                        <!-- Click on the word to access it -->
                        <router-link :to="{ name: 'show', params: { id: word._id } }">
                            {{ word.english }}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{ name: 'show', params: { id: word._id } }">
                            {{ word.german }}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{ name: 'show', params: { id: word._id } }">
                            {{ word.spanish }}
                        </router-link>
                    </td>
                    <td id="wordClass">{{ word.class }}</td>
                    <td width="25">
                        <!-- Edit word-->
                        <router-link v-if="word._id" :to="{ name: 'edit', params: { id: word._id } }">
                            <i class="edit icon"></i>
                        </router-link>
                    </td>
                    <!-- Delete word-->
                    <td width="25" @click.prevent="onDestroy(word._id)">
                        <a :href="`/words/${word._id}`">
                            <i class="x icon"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style>
table {
    align-items: center;
}

.table-container {
    max-height: 450px;
    overflow-y: auto;
}

#words thead {
    position: sticky;
    top: 0;
}

#words th,
#words td {
    border-right: none;
    border-left: none;
    text-align: center;
}

#searchInput {
    width: 80%;
    height: 45px;
    border-radius: 50px;
    border: 2.5px solid;
    padding-left: 25px;
}

#searchRow {
    height: 90px;
    border-bottom: none;
}

#wordClass {
    font-style: italic;
    color: gray !important;
}

td i.x.icon {
    color: lightcoral;
    font-size: 15px;
}

td i.x.icon:hover {
    color: crimson;
}

td i.edit.icon {
    color: lightseagreen;
    font-size: 15px;
}

td i.edit.icon:hover {
    color: rgb(21, 123, 118)
}

</style>

<script>
import { api } from "../helpers/helpers";

export default {
    name: 'words',
    data() {
        return {
            words: [],
        };
    },
    methods: {
        // Delete a word from the list
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            this.flash('Word deleted successfully!', 'success');
            const newWords = this.words.filter(word => word._id !== id); // Remove the deleted word from the list
            this.words = newWords;  // Update the words list
        },
        // Search through the list
        searchWord() {
            const input = document.getElementById("searchInput"); 
            const filter = input.value.toUpperCase();   // Prevent from input case sensitive
            const table = document.getElementById("words");
            const tr = table.getElementsByTagName("tr");

            // Loop through each row to check if the word matches the search
            for (let i = 2; i < tr.length; i++) {
                const tdArray = tr[i].getElementsByTagName("td");
                let found = false;

                // Check each cell in the row for a match
                for (let j = 0; j < tdArray.length - 3; j++) {
                    if (tdArray[j]) {
                        const txtValue = tdArray[j].textContent || tdArray[j].innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            found = true;
                            break;
                        }
                    }
                }
                tr[i].style.display = found ? "" : "none"; // Hide row if unmatched; show row if matched
            }
        }
    },
    async mounted() {
        this.words = await api.getWords();  // Fetch all words and assign to array
        console.log(this.words);
    }
};
</script>
