import { defineStore } from 'pinia'

export const UserStore = defineStore('UserStore', {
    state () {
        return {
            token: ''
        }
    },
    getters: {
        getToken (state) {
            return state.token
        }
    }
})
