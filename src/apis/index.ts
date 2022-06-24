import axios from './axios'
export const proxy = {
    sso: '/sso',
    ssoResponse (path: string) {
        return this.sso + path
    },
    portal: '/portal',
    portalResponse (path: string) {
        return this.portal + path
    },
    rongyun: '/rongyun-admin',
    rongResponse (path: string) {
        return this.rongyun + path
    },
    doc: '/doc',
    docResponse (path: string) {
        return this.doc + path
    }
}
// 示例代码
export const getTalkUserInfo = <T extends object | undefined | string | null, D> (params: T): Promise<D> => axios.post(proxy.rongResponse('/api/services/app/User/UserInfo'), params)
