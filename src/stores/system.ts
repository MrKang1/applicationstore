import { defineStore } from 'pinia'

export const SystemStore = defineStore('SystemStore', {
    state () {
        return {
            layout: ''
        }
    },
    getters: {
        getLayout (state) {
            return state.layout
        }
    }
})
