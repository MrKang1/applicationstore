<script lang="ts" setup>
const client_id = "Yc.SelfHelpService"
const redirect_url = window.location.origin+"/redirectlogin"

let endUrl = "http://10.0.7.32:15000"
// if (window.location.href.match('yctest')) {
//     endUrl = "http://10.0.7.32:15000"
// } else {
//     endUrl = "https://sso.yuechenggroup.com"
// }
let genUrl = endUrl
let url = `${genUrl}/connect/authorize?client_id=${client_id}&response_type=code&scope=StaffInfo&redirect_uri=${redirect_url}`
window.location.href = url
</script>
