<template>
    <div class="sso_auth_client_block">
        <div v-if="pre_loader">
            <i class="fa fa-cog fa-spin"></i> Checking...Wait
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'SsoAuthClientBlock',
    data(){
        return {
            pre_loader: false
        }
    },
    computed: {
        header_config (){
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            let obj = {
                headers: {
                    'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getTokenType.access_token
                }
            };
            return obj;
        }
    },
    mounted(){
        if (localStorage.getItem('user_info')){
            if(localStorage.getItem('req_from') !== this.$route.query.req_from) {
                localStorage.removeItem('user_info')
                localStorage.removeItem('req_from')
                // localStorage.setItem('req_from') = this.$route.query.req_from
                this.oauth_client_check()

            }
            this.set_auth_req_from(true)
            this.$router.push('/')
        }else this.oauth_client_check()
    },
    methods: {
        ...mapMutations({
            set_login_status: 'auth_info/LOGIN_STATUS',
            set_login_user_data: 'auth_info/ADD_USER_DATA',
            set_auth_req_from: 'AUTH_REQ_FROM_STATUS'
        }),
        oauth_client_check(){
            let url = '/api/oauth-client-check';

            let data = {
                req_from: this.$route.query.req_from,
                app_id: this.$route.query.app_id,
                secret_key: this.$route.query.secret_key,
                user_info: {
                    name: this.$route.query.name,
                    email: this.$route.query.email,
                    phone: this.$route.query.phone,
                }
            }

            if(data.req_from=='' || data.app_id=='' || data.secret_key=='') return false

            this.pre_loader = true
            
            this.domain_info = [];
            this.$axios.post(url, data, this.header_config).then( (response) => {
                console.log(response)
                if(response.data.status=='1'){
                    localStorage.setItem('user_info',JSON.stringify(response.data.user_info));
                    localStorage.setItem('req_from',data.req_from)                

                    this.set_login_status(true)
                    this.set_login_user_data(response.data.user_info)
                    this.set_auth_req_from(true)
                }else{
                    localStorage.removeItem('user_info')
                    localStorage.removeItem('req_from')
                    this.$toast.error('Unauthorized', {icon: "Error"})
                }
                
                this.pre_loader = false
                
                this.$router.push('/')
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "oauth_error_outline"})
                this.pre_loader = false
            });
        }
    }
}
</script>
<style scoped>
    .sso_auth_client_block{
        margin: 0 auto;
        text-align: center;
        padding-top: 15%;
        font-size: 18px;
    }
    .sso_auth_client_block > div{
        display: inline-block;
        padding: 5px 15px;
        border: 1px solid #ddd;
        border-radius: 25px;
    }
</style>