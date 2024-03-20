<template>
    <div id="register_login_form" class="eng_font">
        <div class="form_block">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-input mt-3">
                        <label>E-mail or Login ID</label>
                        <input v-model="form_data.login_id" class="form-control" placeholder="Enter E-mail or Login ID" @keyup.enter="form_submit" />
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-input mt-3">
                        <label>Password</label>
                        <input type="password" v-model="form_data.password" class="form-control" placeholder="Enter password" @keyup.enter="form_submit" />
                    </div>
                </div>
            </div>
        </div>
        <div class="form_footer">
            <div class="row">
                <div class="col-md-12">
                    <div :class="['msg',{err : submit_status=='error'}]" v-html="submit_msg"></div>
                </div>
                <div class="col-md-12 clearfix">
                    <div class="submit_btn" @click="form_submit"><i class="fa fa-check-circle"></i> Login <i class="fas fa-sign-in-alt"></i></div>
                </div>
            </div>
            <!-- <div class="auth_info">
                <div>By signing up, you agree to our <a href="#">Terms of Service.</a></div>
                <div>You have no account? <span class="auth_btn" @click="$parent.sel_form_block(2)">Register</span></div>
            </div> -->
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'PartnerLoginFormBlock',
    props: ['base_path'],
    data(){
        return {
            form_data: {
                login_id: '',
                password: ''
            },
            submit_status: '',
            submit_msg: ''
        }
    },
    methods: {
        ...mapActions({
            partnerLogin: 'auth_info/PARTNER_LOGIN_REQ'
        }),
        async form_submit(){

            if(this.form_data.login_id==''){
                this.$toast.error('Please enter email or login ID', {icon: "Warning"});
                return false;
            }else if(this.form_data.password==''){
                this.$toast.error('Please enter password', {icon: "Warning"});
                return false;
            } 

            this.$parent.req_submit = true;
            
            await this.partnerLogin(this.form_data);

            if(this.$store.state.auth_info.user_data && (this.$store.state.auth_info.user_data.length>0 || this.$store.state.auth_info.user_data.id)){
                var user_data = this.$store.state.auth_info.user_data
                localStorage.setItem('user_info', JSON.stringify(user_data))
                
                this.$parent.req_submit = false;
                // this.$parent.popup_close();
                // this.$router.push('/partner');
                this.$router.push('/' + this.base_path);
            }else{
                this.submit_msg = this.$store.state.auth_info.login_err_msg;
                this.submit_status = '';
                this.$parent.req_submit = false;
            }
        }
    }
}
</script>
<style scoped>
    #register_login_form .form_block{
        padding: 0 20px 20px 20px;
    }
    #register_login_form label{
        font-size: 12px;
        font-weight: bold;
        color: #999999
    }
    #register_login_form input{
        font-size: 12px        
    }
    .form_footer{
        border-top: 1px solid #dddddd;
        padding: 10px 20px;
    }
    .form_footer >>> .msg{
        font-size: 12px;
        line-height: 36px;
    }
    .form_footer >>> .msg .succ{
        color: #007f44
    }
    .form_footer >>> .msg .err{
        color: #CD0000
    }
    .submit_btn{
        line-height: 37px;
        display: block;
        padding: 0 15px;
        color: #444;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        background-color: #fbcd41;
        border-left: 1px solid #fbcd41;
        cursor: pointer;
        transition: all 0.4s
    }
    .submit_btn:hover{
        color: #fff
    }
    .submit_btn > i{
        color: #737260; margin-right: 5px;
        transition: all 0.4s
    }
    .submit_btn:hover > i{
        color: #fff
    }
    .auth_info{
        display: block;
        text-align: right;
        font-size: 10px;
        margin-top: 10px
    }
    .auth_info .auth_btn{
        color: #006699;
        cursor: pointer;
    }
    .auth_info .auth_btn:hover{
        text-decoration: underline
    }
</style>