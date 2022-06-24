import moment from 'moment'
import { App } from 'vue'

const filter = {
    setDates (date: Date | string | null | undefined, format = 'YYYY-MM-DD HH:mm', isNullStr = '') {
        if (date) {
            return moment(date).format(format)
        }
        return isNullStr
    }
}
export default {
    install (app:App<Element>) {
        app.config.globalProperties.$filters = filter
    }
}
