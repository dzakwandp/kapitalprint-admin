import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth',{
    state:()=>({
        isLoggedIn: false,
        name:null,
        contact:null,
        image:null
    }),
    actions:{
        login(response){
            this.isLoggedIn=true
            this.name=response.name
            this.contact=response.contact
            this.image=response.image
        },
        logout(){
            this.isLoggedIn=false,
            this.name=null,
            this.contact=null,
            this.image=null
        }
    },
    getters:{
        setName(){
            return this.name
        },
        setEmail(){
            return this.contact
        },
        setPicture(){
            return this.image
        }
    },
    persist: true
})