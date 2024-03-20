<template>
    <div id="auth_code_confirmation_form" class="eng_font">
        <h4 v-if="!success_msg" class="caption">Check Your Message</h4>
        <p v-if="!success_msg" class="info">A 6-digit confirmation code has been sent to your mobile.</p>
        <div class="form_block">
            <div v-if="success_msg" class="success_msg">
                <span class="icon"><i class="fa fa-check-circle fa-4x"></i></span>
                <p class="auth_info">বাংলাদেশ পোলিং সিস্টেম এ আপনার কমেন্ট সফলভাবে পাঠানো হয়েছে।</p>
            </div>
            <div v-else class="row">            
                <div class="col-md-12">
                    <div class="form-input mt-3">
                        <label>Enter Code</label>
                        <div class="code_block clearfix">
                            <input :id="'code-' + i" :class="{'active':code[i]!==''}" v-for="(n,i) in 6" :key="'code-'+i" v-model="code[i]" class="form-control" maxlength="1" @keyup="onKeyup" @paste="onPaste" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!success_msg" class="form_footer">
            <div class="row">
                <div class="col-md-12">
                    <div :class="['msg',{err : submit_status=='error'}]" v-html="submit_msg"></div>
                </div>
                <div class="col-md-12">
                    <h1 v-show="elementVisible" class="hideElement"> Please wait for 5 minutes </h1>
                </div>
                <div class="col-md-12 clearfix">
                    <div class="submit_btn float-right" @click="form_submit"><i class="fa fa-check-circle"></i> Verify OTP <i class="fas fa-sign-in-alt"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            code: {
                0: '',
                1: '',
                2: '',
                3: '',
                4: '',
                5: ''
            },
            form_data: {
                auth_code: '',
                user_id: '',
                contact_number: ''
            },
            submit_status: '',
            submit_msg: '',
            success_msg: false,
            elementVisible: true
        }
    },
    created() {
        setTimeout(() => this.elementVisible = false, 5000)
    },
    methods: {
        async sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        code_check: function(index){
            if(!this.isNumber(this.code[index])) this.code[index] = ''
            // else this.$refs['code-' + (index+1)].$el.focus();
        },
        isNumber: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        async onPaste(event){
            let e = event;
            let getCode = (event.clipboardData || window.clipboardData).getData('text');
            // console.log(getCode)
            for(var i=0;i<getCode.length; i++){
                let pattern = /^\d+$/;
                let num = pattern.test(getCode[i])
                // console.log(getCode[i],'=',num)
                if(num){
                    this.code[i] = getCode[i]
                    document.getElementById('code-' + i).value = getCode[i]
                    document.getElementById('code-' + i).focus()
                    await this.sleep(50)
                }
            }
        },
        onKeyup(event){
            event.target.value = event.target.value.replace(/[^0-9]/g,'')
            // console.log(event.keyCode)
            
            if((event.keyCode >= 48 && event.keyCode <= 57)||(event.keyCode >= 96&&event.keyCode<=105)){
                const next = event.target.nextElementSibling                
                
                if(next === null) return
                event.target.nextElementSibling.focus()
            } else if(event.keyCode==8) {
                const previous = event.target.previousElementSibling                
                
                if(previous === null) return
                event.target.previousElementSibling.focus()
            }
            return
        },
        async form_submit(){
            var url = '/api/otp-verify';
            this.submit_msg = ''

            var code_missing = 0;
            var contact_number = localStorage.getItem('contact_number');
            this.form_data.contact_number = contact_number; 
            for(var i=0; i<6; i++){
                if(this.code[i]==''){
                    code_missing = 1; //return true;
                }
            }

            if(code_missing==1){
                this.$toast.error('Please enter your OTP', {icon: "Warning"});                
                return false;
            }

            let get_auth_code = ''
            for(let ci in this.code){
                get_auth_code = get_auth_code + this.code[ci]                
            }
            this.form_data.auth_code = get_auth_code; 
            
            this.$axios.post(url, this.form_data,this.$parent.header_config).then((response) => {
                // console.log('Get data',response.data)
                if(response.data.code == 404 && response.data.status == 0){
                    this.$toast.error(response.data.message, {icon: "error_outline"});
                    this.submit_msg = response.data.message;
                    this.submit_status = 'error';
                    return false;
                }else{ 
                    this.$parent.submit_form();
                    this.$parent.alert_box_allow = true;
                    this.success_msg = true;
                }
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "error_outline"});
                this.submit_msg = '';
                this.submit_status = '';
            });
        }
    }
}
</script>
<style scoped>
    .msg.err{
        color: #ff0000;
    }
    #auth_code_confirmation_form{
        .form_block{
            padding: 0 20px 20px 20px;
            input{
                font-size: 12px;
                background-color: #3d46a7;
                border: 1px solid #3d46a7;
                color: #fff;
                padding: 5px 10px;
                height: auto;        
            }
        }
        .caption{
            font-size: 14px;
            font-weight: bold;
            color: #666666;
            margin: 20px 0 0 20px;
        }
        .info{
            padding: 10px 0 0 20px;
            font-size: 12px;
            color: #666666;
        }
        label{
            font-size: 12px;
            font-weight: bold;
            color: #666666
        }
        input{
            font-size: 12px        
        }
    }
    .code_block{
        display: flex;
        flex-wrap: nowrap;
        & > input{
            margin-left: 7px;
            text-align: center; 
            padding: 5px; 
            font-size: 18px !important; 
            background-color: #eeeeee;
            &:first-child{
                margin-left: 0
            }
            &.active{
                background-color: #ffffff
            }
        }
    }
    .new_password{
        text-align: right;        
        & > span{
            display: inline-block;
            color: #006699; cursor: pointer;
        }
    }
    .success_msg{
        display: block; text-align: center;
        padding: 15%;
        .icon{
            font-size: 20px;
            color: #fff;
            margin-bottom: 15px;
            display: block;
        }
    }
    .form_footer{
        /* border-top: 1px solid #dddddd; */
        padding: 10px 20px;
        :deep(.msg){
            font-size: 12px;
            line-height: 36px;
            .succ{
                color: #c4ffe3
            }
            .err{
                color: #ffdbdb
            }
        }
    }
    .submit_btn{
        line-height: 30px;
        display: block;
        padding: 0 15px;
        color: #eee;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        background-color: #f05a24;
        border-radius: 25px;
        /* border-left: 1px solid #fbcd41; */
        cursor: pointer;
        transition: all 0.4s;
        &:hover{
            color: #fff;
            background-color: #CD0000;
        }
        & > i{
            color: #eee; margin-right: 5px;
            transition: all 0.4s
        }
        &:hover > i{
            color: #fff
        }
    }
    .auth_info{
        display: block;
        text-align: center;
        font-size: 11px;
        margin-top: 10px;
        .auth_btn{
            color: rgb(255, 249, 170);
            cursor: pointer;
            &:hover{
                text-decoration: underline
            }
        }
    }
    ::-webkit-input-placeholder { /* Edge */
        color: #bbbbbb;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #bbbbbb;
    }

    ::placeholder {
        color: #bbbbbb;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
    .alert_box_block{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .hideElement{
        font-size: 1rem;
    }
</style>