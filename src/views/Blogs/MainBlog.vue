<template>
    <div class="mx-4 mt-2">
        <v-card width="screen" elevation="0" color="light-blue-lighten-4" height="100">
            <v-img src="@/assets/blogs_banner.jpg" cover>
                <v-card-item>
                    <v-card-title class="text-indigo-darken-4 text-center">Hello {{authStore.setName}}, welcome to the
                        Blogs Page!</v-card-title>
                    <v-card-subtitle class="text-indigo-darken-4 text-center">Kapital Printing</v-card-subtitle>
                </v-card-item>
                <v-card-text class="text-indigo-darken-4 text-right">
                    {{ timeStore.formattedTime }}
                </v-card-text>
            </v-img>
        </v-card>

        <v-row class="mt-4">
            <v-col>
                <v-card width="screen" elevation="1" color="green-lighten-4" height="max">
                    <v-card-title class="text-indigo-darken-4 text-center">Daftar Posting</v-card-title>
                    <v-progress-linear v-if="loading" indeterminate=""></v-progress-linear>
                    <v-table v-else>
                        <thead>
                            <tr>
                                <th class="text-left text-indigo-darken-4">
                                    Judul
                                </th>
                                <th></th>
                                <th><v-btn size="small" color="green-darken-4" prepend-icon="mdi-plus-box"
                                        @click="toAddPost()">Tambah Post</v-btn></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in posts" :key="item.index" :search="search">
                                <td>{{ item.title }}</td>
                                <td>
                                    <router-link text-decoration="none" :to="'/detailpost/' + item.id">
                                        <v-btn color="green-darken-4" rounded="lg" variant="tonal" size="small">
                                            <v-icon icon="mdi-pencil-circle mr-4"></v-icon>Edit</v-btn>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios'
import { useTimeStore } from '@/store/timeStore'
import { useAuthStore } from '@/store/authStore';

export default {
    setup() {
        const timeStore = useTimeStore()
        const authStore = useAuthStore()

        setInterval(() => {
            timeStore.updateTime()
        }, 1000)

        // **only return the whole store** instead of destructuring
        return { timeStore, authStore }
    },
    data() {
        return {
            posts: [],
            apiUrl: import.meta.env.VITE_API_URL,
            loading: true
        }
    },
    methods: {
        toAddPost() {
            this.$router.push("/addpost")
        },
    },
    async mounted() {
        try {
            const response = await axios.get(this.apiUrl + 'api/blogs')
            this.posts = response.data
            this.loading = false
            console.log(this.posts)
        }
        catch (err) {
            console.log(err)
            this.loading = false
        }
    }
}
</script>
<style></style>