import { AsliderBarStatus } from '@/types/system'
import { defineStore } from 'pinia'

export const SystemStore = defineStore('SystemStore', {
    state () {
        return {
            layout: '',
            sliderStatus: AsliderBarStatus.OPEN,
            loading: false
        }
    },
    getters: {
        getLayout (state) {
            return state.layout
        }
    }
})
