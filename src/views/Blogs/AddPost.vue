<template>
    <div class="mx-4 mt-2">
        <v-row>
            <v-col></v-col>
            <v-col cols="9">
                <v-card elevation="1" color="green-darken-4" variant="tonal" class="mb-4">
                    <v-card-title class="text-center">
                        Tambah Post
                    </v-card-title>
                </v-card>
                <v-card class="pa-4" color="green-darken-4" variant="tonal" height="auto">
                    <v-text-field v-model="postTitle" label="Judul Post" required></v-text-field>
                    <v-row align="center">
                        <v-col cols="10">
                            <v-text-field v-model="postImage" label="Link Gambar" required></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-tooltip class="d-flex flex-row-reverse" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" variant="plain" height="auto" width="auto"><v-icon size="x-large"
                                            color="indigo-darken-4">mdi-help-circle</v-icon></v-btn>
                                </template>
                                <span v-html="helpContent"></span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                    <v-card-title class="px-4 text-body-1">Isi Post</v-card-title>
                    <div class="editor-wrapper mb-12">
                        <QuillEditor theme="snow" v-model:content="content" content-type="html" />
                    </div>
                </v-card>
                <v-row class="mt-2" justify="space-around">
                    <v-col cols="3">
                        <v-btn color="red-darken-4" variant="tonal"
                            @click="toPost()"><v-icon>mdi-arrow-left-circle</v-icon>kembali</v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn color="green-darken-4" variant="tonal"
                            @click="savePost()"><v-icon>mdi-check-circle</v-icon>submit</v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col></v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
export default {
    components: { QuillEditor },
    data() {
        return {
            postTitle: '',
            postImage: '',
            content: '',
            helpContent: "Link Image bisa didapatkan<br>melalui imgur atau<br>image hosting lainnya",
            apiUrl: import.meta.env.VITE_API_URL,
        }
    },
    methods: {
        toPost() {
            this.$router.push('/blog')
        },
        async savePost() {
            try {
                const response = await axios.post(this.apiUrl + 'api/blogs', {
                    title: this.postTitle,
                    body: this.content,
                    image: this.postImage
                })
                console.log(response)
                alert(response.data.message)
                this.$router.push("/blog")
            }
            catch (err) {
                console.log(err)
            }
        }
    },
}
</script>
<style>
.editor-wrapper {
    height: 200px;
    /* Set the desired height */
}
</style>