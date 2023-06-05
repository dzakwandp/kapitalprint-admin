<template>
    <nav>
        <v-app-bar :elevation="0" color="grey-lighten-4" rounded>
            <v-toolbar-title>
                <v-img src="@/assets/logo.png" :width="50"></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outlined color="red lighten-1" @click="logOut()">
                <span>Log Out</span>
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer expand-on-hover rounded rail color="grey-lighten-4" class="mt-2 text-indigo-darken-4">
            <v-list>
                <v-list-item :prepend-avatar="userData.setPicture" :title="userData.setName"
                    :subtitle="userData.setEmail"></v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list density="compact" nav>
                    <v-list-item v-for="item in links" :key="item.text" :prepend-icon="item.icon" :title="item.title"
                        :to="item.route" link>
                    </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { useAuthStore } from '@/store/authStore';
export default {
    setup() {
        const userData = useAuthStore()
        return {userData}
    },
    data() {
        return {
            drawer: true,
            links: [
                { icon: "mdi-home", title: "Home", route: "/home" },
                { icon: "mdi-file-multiple", title: "Products", route: "/product" },
                { icon: "mdi-post", title: "Blog", route: "/blog" }
            ]
        }
    },
    methods: {
        logOut(){
            const authStore=useAuthStore()
            authStore.logout()
            this.$router.push('/login')
        }
    },
}
</script>
