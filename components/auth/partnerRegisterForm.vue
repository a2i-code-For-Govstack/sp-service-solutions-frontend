<template>
    <div id="register_reg_form" class="eng_font">
        <div class="form_block">
            <div v-if="success_msg" class="success_msg">
                <span class="icon"><i class="fa fa-check-circle fa-4x"></i></span>
                <p>Your request has been submitted. Please check you email and confirm your registration.</p>
            </div>
            <div v-else class="row">
                <div class="col-md-12">
                    <div class="form-input mt-3">
                        <label>Partner Name <sup>*</sup></label>
                        <input v-model="form_data.partner_name" class="form-control" placeholder="Enter partner name" @keyup.enter="form_submit" ref="partner_name_input_form" />
                    </div>
                </div>                
                <div class="col-md-6">
                    <div class="form-input mt-3">
                        <label>Login ID <sup>*</sup></label>
                        <input v-model="form_data.login_id" class="form-control" placeholder="Enter login ID" @keyup.enter="form_submit" ref="login_id_input_form" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-input mt-3">
                        <label>E-mail <sup>*</sup></label>
                        <input v-model="form_data.email" class="form-control" placeholder="Enter E-mail address" @keyup.enter="form_submit" ref="email_input_form" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-input mt-3">
                        <label>Password <sup>*</sup></label>
                        <input type="password" v-model="form_data.password" class="form-control" placeholder="Enter password" @keyup.enter="form_submit" ref="password_input_form" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-input mt-3">
                        <label>Confirm Password <sup>*</sup></label>
                        <input type="password" v-model="confirm_password" class="form-control" placeholder="Confirm password" @keyup.enter="form_submit" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!success_msg" class="form_footer">
            <div class="row">
                <div class="col-md-8">
                    <div :class="['msg',{err : !submit_status}]" v-html="submit_msg"></div>
                </div>
                <div class="col-md-4 clearfix">
                    <div class="submit_btn float-right" @click="form_submit"><i class="fa fa-check-circle"></i> Register <i class="fas fa-sign-in-alt"></i></div>
                </div>
            </div>
            <div class="auth_info">
                <div>By signing up, you agree to our <a href="#">Terms of Service.</a></div>
                <div>Already have an account? <span class="auth_btn" @click="$parent.sel_form_block(1)">Login</span></div>                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PartnerRegFormBlock',
    data(){
        return {
            form_data: {
                partner_name: '',
                login_id: '',
                email: '',
                password: ''
            },
            confirm_password: '',
            submit_status: '',
            submit_msg: '',
            success_msg: false
        }
    },
    methods: {
        async form_submit(){
            var url = '/api/partner/register';
            this.submit_msg = ''

            if(this.form_data.partner_name==''){
                this.$toast.error('Please enter partner name', {icon: "Warning"});
                this.$refs.partner_name_input_form.focus()
                return false;
            }else if(this.form_data.login_id==''){
                this.$toast.error('Please enter login ID', {icon: "Warning"});
                this.$refs.login_id_input_form.focus()
                return false;
            }else if(this.form_data.email==''){
                this.$toast.error('Please enter email address', {icon: "Warning"});
                this.$refs.email_input_form.focus()
                return false;
            }else if(this.form_data.password==''){
                this.$toast.error('Please enter password', {icon: "Warning"});
                this.$refs.password_input_form.focus()
                return false;
            }else if(this.form_data.password!==this.confirm_password){
                this.$toast.error('Password mismatch', {icon: "Warning"});
                return false;
            }

            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            
            this.$parent.req_submit = true;
            this.$axios.post(url, this.form_data,{
                headers: {
                    'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // console.log('Get data',response.data)
                
                this.submit_status = response.data.status;
                
                if(this.submit_status){
                    this.success_msg = true;
                }
                else this.submit_msg = '<i class="fa fa-check-circle"></i> E-mail already exist</div>';

                this.$parent.req_submit = false;
                this.form_reset();
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "error_outline"});
                this.submit_msg = '';
                this.submit_status = '';
                this.$parent.req_submit = false;
            });
        },
        form_reset(){
            this.form_data = {
                'partner_name': '',
                'login_id': '',
                'email': '',
                'password': ''
            }            
            this.confirm_password = ''
        }
    }
}
</script>
<style scoped>
    #register_reg_form .form_block{
        padding: 0 20px 20px 20px;
    }
    .success_msg{
        display: block; text-align: center;
        padding: 15%
    }
    .success_msg .icon{
        font-size: 20px;
        color: #4da67ccc;
        margin-bottom: 15px;
        display: block;
    }
    #register_reg_form label{
        font-size: 12px;
        font-weight: bold;
        color: #999999
    }
    #register_reg_form input{
        font-size: 12px        
    }
    .form_footer{
        border-top: 1px solid #dddddd;
        padding: 10px 20px;
    }
    .submit_btn{
        line-height: 37px;
        display: inline-block;
        padding: 0 15px;
        color: #444;
        font-size: 14px;
        font-weight: 600;
        background-color: #fbcd41;        
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