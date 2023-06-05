<template>
  <div class="mx-4 mt-2">
    <v-card width="screen" elevation="0" color="light-blue-lighten-4" height="100">
      <v-img src="@/assets/home_banner.jpg" cover>
        <v-card-item>
          <v-card-title class="text-indigo-darken-4 text-center">Hello {{ authStore.setName }}, welcome to the
            dashboard!</v-card-title>
          <v-card-subtitle class="text-indigo-darken-4 text-center">Kapital Printing</v-card-subtitle>
        </v-card-item>
        <v-card-text class="text-indigo-darken-4 text-right">
          {{ timeStore.formattedTime }}
        </v-card-text>
      </v-img>
    </v-card>

    <v-row class="mt-4">
      <v-col>
        <v-card width="max" elevation="0" color="yellow-lighten-4">
          <v-card-item>
            <v-card-title class="text-indigo-darken-4 text-center mb-4">Products</v-card-title>
            <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
            <v-card-text v-else class="text-indigo-darken-4 text-subtitle-1 font-weight-bold" v-for="prod in product"
              :key="prod.index">
              {{ prod.title }}
              <hr />
            </v-card-text>
          </v-card-item>
          <v-card-text class="text-center mb-n14">
            <router-link :to="{ name: 'product' }">
              <v-btn class="mx-auto text-indigo-darken-4" color="yellow-lighten-3" size="small">To Products</v-btn>
            </router-link>
          </v-card-text>
          <v-card-text class="text-indigo-darken-4 text-right">
            Number of products: {{ prodCount }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card width="max" elevation="0" color="green-lighten-4">
          <v-card-item>
            <v-card-title class="text-indigo-darken-4 text-center mb-4">Blogs</v-card-title>
            <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
            <v-card-text v-else class="text-indigo-darken-4 text-subtitle-1 font-weight-bold" v-for="blog in post"
              :key="blog.index">
              {{ blog.title }}
              <hr />
            </v-card-text>
          </v-card-item>
          <v-card-text class="text-center mb-n14">
            <router-link :to="{ name: 'blog' }">
              <v-btn class="mx-auto text-indigo-darken-4" color="green-lighten-3" size="small">To Blogs</v-btn>
            </router-link>
          </v-card-text>
          <v-card-text class="text-indigo-darken-4 text-right">
            Number of Blogs: {{ postCount }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import { useTimeStore } from '../store/timeStore';
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
      product: [],
      post: [],
      loading: true,
      apiUrl: import.meta.env.VITE_API_URL
    }
  },
  computed: {
    prodCount() {
      return this.product.length
    },
    postCount() {
      return this.post.length
    }
  },
  async mounted() {
    try {
      const responseProd = await axios.get(this.apiUrl + 'api/items')
      const responsePost = await axios.get(this.apiUrl + 'api/blogs')
      this.product = responseProd.data
      this.post = responsePost.data
      this.loading = false
    } catch (error) {

    }
  },

}
</script>

