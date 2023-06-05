<template>
    <div class="mx-4 mt-2">
        <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
        <v-row v-else>
            <v-col></v-col>
            <v-col cols="6">
                <v-card elevation="1" color="indigo-darken-4" variant="tonal" class="mb-4">
                    <v-card-title class="text-center">
                        Detail Produk
                    </v-card-title>
                </v-card>
                <v-card class="pa-4" color="indigo-darken-4" variant="tonal">
                    <v-text-field v-model="prodName" label="Nama Produk" required></v-text-field>
                    <v-row align="center">
                        <v-col cols="10">
                            <v-text-field v-model="prodImage" label="Link Gambar" required></v-text-field>
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
                    <v-card-title class="px-4 text-body-1">Deskripsi Produk</v-card-title>
                    <div class="editor-wrapper mb-12">
                        <QuillEditor theme="snow" v-model:content="description" content-type="html" />
                    </div>
                </v-card>
                <v-row class="mt-2" justify="space-around">
                    <v-col cols="3">
                        <v-btn color="yellow-darken-4" variant="tonal"
                            @click="toProduct()"><v-icon>mdi-arrow-left-circle</v-icon>kembali</v-btn>
                    </v-col>
                    <v-col cols="3">
                        <div class="text-center">
                            <v-dialog v-model="dialogdel" width="auto">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="red-darken-4" variant="tonal" v-bind="props">
                                        <v-icon>mdi-check-circle</v-icon>hapus
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        Apakah anda yakin akan menghapus data ini?
                                    </v-card-text>
                                    <v-card-actions class="justify-space-around">
                                        <v-btn color="red-darken-4" variant="tonal" @click="dialogdel = false">Tidak</v-btn>
                                        <v-btn color="green-darken-4" variant="tonal" @click="deleteProduct()">Yakin</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="text-center">
                            <v-dialog v-model="dialogup" width="auto">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="green-darken-4" variant="tonal" v-bind="props">
                                        <v-icon>mdi-check-circle</v-icon>submit
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        Apakah anda yakin melakukan perubahan data?
                                    </v-card-text>
                                    <v-card-actions class="justify-space-around">
                                        <v-btn color="red-darken-4" variant="tonal" @click="dialogup = false">Tidak</v-btn>
                                        <v-btn color="green-darken-4" variant="tonal" @click="updateProduct()">Yakin</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col></v-col>
        </v-row>
    </div>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from 'axios'
export default {
    components: { QuillEditor },
    data() {
        return {
            prodName: "",
            prodImage: "",
            description: "",
            loading: true,
            dialogup: false,
            dialogdel: false,
            helpContent: "Link image bisa didapatkan <br> melalui imgur atau <br> image hosting lainnya",
            apiUrl: import.meta.env.VITE_API_URL,
        };
    },
    methods: {
        toProduct() {
            this.$router.push({ name: "product" });
        },
        async updateProduct() {
            try {
                const response = await axios.put(this.apiUrl + 'api/items/' + this.$route.params.id, {
                    title: this.prodName,
                    desc: this.description,
                    image: this.prodImage
                })
                console.log(response)
                this.dialog = false
                alert(response.data.message);
                this.$router.push("/product");
            }
            catch (err) {
                console.log(err)
            }
        },
        async deleteProduct() {
            try {
                const response = await axios.delete(this.apiUrl + 'api/items/' + this.$route.params.id)
                console.log(response)
                this.dialog = false
                alert(response.data.message);
                this.$router.push("/product");
            }
            catch (err) {
                console.log(err)
            }
        },
    },
    async mounted() {
        try {
            const response = await axios.get(this.apiUrl + "api/items/" + this.$route.params.id);
            this.prodName = response.data.title;
            this.prodImage = response.data.image;
            this.description = response.data.desc;
            this.loading = false
            console.log(this.$route.params.id)
        }
        catch (err) {
            console.log(err);
            this.loading = false;
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