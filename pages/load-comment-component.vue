<template>
    <div class="comment_view_block">
        
        <div v-if="alert_box_allow" class="alert_box_block">
            <div class="content_box">
                <div class="msg">আপনি এটি জমা দেওয়ার বিষয়ে নিশ্চিত?</div>
                <div class="action_btn_block">
                    <span @click="submit_form"><i class="fa fa-check"></i> হ্যাঁ</span>
                    <span @click="alert_box_allow=false"><i class="fa fa-times"></i> না</span>
                </div>
            </div>
        </div>
        
        <div class="comment_header">
            <template v-if="sel_comment_type_index">
                <i :class="$store.state.comment_type_list[sel_comment_type_index].icon"></i>
                <span>{{ $store.state.comment_type_list[sel_comment_type_index].title }}</span>
                <div v-if="!$route.query.type_id" class="type_btn" @click="sel_comment_type_index=''">
                    <i class="fa fa-angle-left"></i> লিস্ট দেখুন
                </div>
            </template>
            <template v-else-if="get_domain_id>0">
                <i class="fa fa-check-circle"></i>
                <span>বাছাই করুন</span>
            </template>
            <template v-else-if="content_loader">
                <i class="fa fa-cog fa-spin"></i>
                <span>লোড হচ্ছে</span>
            </template>
            <template v-else>
                <i class="fa fa-info-circle"></i>
                <span>বার্তা</span>
            </template>
        </div>
        
        <div class="content_block m-4">            
            <!-- {{ flag_list }} -->
            <!-- {{ formData }} -->
            <div v-if="content_loader" class="row">
                <div class="col-md-12">
                    <div class="form_block">
                        <FormBlockLoader :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                        <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                        <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                    </div>
                </div>
            </div>
            <template v-else-if="get_domain_id>0">
                <template v-if="sel_comment_type_index">
                    <div class="mb-4">
                        <div class="content_label">
                            <label>
                                <i class="far fa-comment"></i>
                                <span>আপনার {{ $store.state.comment_type_list[sel_comment_type_index].title }} লিখুন</span>
                            </label>
                        </div>
                        <div ref="comment">
                            <vue-editor v-model="formData.comment" :editorToolbar="customToolbar" />
                        </div>
                        <div>
                            <input type="file" ref="single_file" v-on:change="onChange">
                        </div>                    
                    </div>
                    <div class="row" v-if="sel_flag_type">
                        <!-- <div class="col-md-6 mb-4">
                            <div class="content_label">
                                <label>
                                    <i class="fa fa-bars"></i>
                                    <span>Comment Type</span>
                                </label>
                            </div>
                            <select v-model="sel_comment_type_index">
                                <option v-for="(item,id) in $store.state.comment_type_list" :value="id" :key="id">{{ item.title }}</option>
                            </select> -->
                            <!-- <div class="comment_type">
                                <span @click="sel_comment_type=0"><i v-if="sel_comment_type==0" class="far fa-check-circle"></i><i v-else class="far fa-circle"></i> General</span>
                                <span @click="sel_comment_type=1"><i v-if="sel_comment_type==1" class="far fa-check-circle"></i><i v-else class="far fa-circle"></i> Flag</span>                            
                            </div> -->
                        <!-- </div> -->
                        <div class="col-md-12 mb-4">                            
                            <div class="content_label">
                                <label>
                                    <i class="far fa-flag"></i>
                                    <span>ফ্ল্যাগ রিপোর্ট টাইপ বাছাই করুন</span>
                                </label>
                            </div>
                            <select v-model="formData.comment_rel_info.flag_rpt_type_id">
                                <template v-if="flag_list">
                                    <option value="null">বাছাই করুন</option>
                                    <option v-for="(item,key) in flag_list" :value="item.id" :key="key">{{ item.type_title }}</option>
                                </template>
                            </select>                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="mb-4">
                                <div class="content_label">
                                    <label>
                                        <i class="far fa-address-book"></i>
                                        <span>আপনার নাম</span>
                                    </label>
                                </div>
                                <div><input type="text" placeholder="আপনার নাম লিখুন" maxlength="60" v-model="formData.comment_rel_info.user_name" ref="user_name" /></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-4">
                                <div class="content_label">
                                    <label>
                                        <i class="far fa-envelope"></i>
                                        <span>আপনার ইমেইল</span>
                                    </label>
                                </div>
                                <div><input type="text" placeholder="আপনার ইমেইল লিখুন" maxlength="60" v-model="formData.comment_rel_info.user_email" ref="user_email" /></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-4">
                                <div class="content_label">
                                    <label>
                                        <i class="fa fa-phone-alt"></i>
                                        <span>আপনার কন্টাক্ট নম্বর</span>
                                    </label>
                                </div>
                                <div><input type="text" placeholder="আপনার কন্টাক্ট নম্বর লিখুন" maxlength="15" v-model="formData.comment_rel_info.contact_no" ref="contact_no" /></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <vue-recaptcha :sitekey="reCaptchaKey"></vue-recaptcha>
                        </div>
                        <div class="col-md-6 mb-4" align="right">
                            <div v-if="submit_loader">
                                <i class="fa fa-cog fa-spin"></i> জমা দেওয়া হচ্ছে ... অপেক্ষা করুন
                            </div>
                            <div v-else class="action_btn" @click="check_submit">
                                <i class="fa fa-check-circle"></i> জমা দিন
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>                    
                    <div class="type_list_block">
                        <template v-for="(item,index) in $store.state.comment_type_list">
                            <div v-if="item.status" :key="index" @click="comment_type_click(item,index)">
                                <div v-if="item.image" class="image">
                                    <img :src="item.image" :title="item.title" />
                                </div>
                                <div v-else class="icon"><i :class="item.icon"></i></div>
                                <div class="title">{{ item.title }}</div>
                            </div>
                        </template>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="empty_content mb-3" align="center">
                    <i class="fa fa-box-open fa-4x"></i>
                </div>
                <h6 align="center">এই সাইটটি এই বৈশিষ্ট্যটি অ্যাক্সেস করার অনুমতি নেই ।</h6>
            </template>
            
        </div>

        <div v-if="otp_popup_form" class="alert_box_block">
            <div class="content_box">
                <div class="action_btn_block">
                    <OtpVerification v-if="otp_popup_form" />
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import OtpVerification from '../components/auth/otpVerificationForm.vue';
import VueRecaptcha from 'vue-recaptcha';
export default {
    name: 'CommentViewBlock',
    components: {
        VueRecaptcha,
        OtpVerification
    },
    data(){
        return {
            reCaptchaKey: process.env.reCaptcha_KEY,
            content_loader: true,
            submit_loader: false,
            alert_box_allow: false,
            otp_popup_form: false,
            formData: {                 
                comment: '',
                status: false,
                comment_rel_info: {
                    user_name: '',
                    user_email: '',
                    contact_no: '',
                    url: '',
                    domain_id: null,
                    type_id: '',
                    flag_rpt_type_id: null
                }                
            },
            single_file: '',

            sel_comment_type_index: '',
            flag_list: [],
            get_domain_id: null,
            full_path: '',
            // sel_comment_type: 0,
            customToolbar: [
                ["bold", "italic", "underline"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                [{ color: [] }, { background: [] }],
                // ["link", "image", "video"],
                ["link"],
                // ["clean"]
            ],
        }
    },
    computed: {
        sel_flag_type: function(){
            // let getCommentTypeId = this.formData.comment_rel_info.type_id
            if(this.$store.state.comment_type_list[this.sel_comment_type_index].flag) return true
            else return false
        }
    },
    mounted(){
        if(this.$route.query.type_id){
            this.sel_comment_type_index = this.$route.query.type_id
            this.formData.comment_rel_info.type_id = this.$store.state.comment_type_list[this.sel_comment_type_index].id
        }
        this.full_path = this.$route.query.req_from + this.$route.query.path;
        this.formData.comment_rel_info.url = this.full_path        

        // get domain id
        this.get_domain_info();

        // load flag report types
        this.load_flag_rpt_types();        
    },
    methods:{
        /**
         * Get upload file to single_file
         */
        onChange(e) {
            this.single_file = e.target.files[0];
        },
        comment_type_click: function(data,index){
            if(data.external_url) window.open(data.external_url)
            else {
                this.sel_comment_type_index = index
                this.formData.comment_rel_info.type_id = data.id
            }
        },
        get_domain_info: function(){
            let url = '/api/load-domain-info';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            let data = {
                req_from: this.$route.query.req_from
            }
            
            this.$axios.post(url, data, {
                headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getTokenType.access_token
                }
            }).then( (response) => {
                console.log(response)
                if(response.data){
                    this.get_domain_id = response.data.data.id
                    this.formData.comment_rel_info.domain_id = this.get_domain_id
                }
                this.content_loader = false
            }).catch(e => {
                this.$toast.error('Content load failed!!!', {icon: "error_outline"})
            });
        },
        async load_flag_rpt_types(){            
            let url = '/api/load-flag-rpt-types';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));

            this.flag_list = [];
            this.$axios.get(url, {
                headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getTokenType.access_token
                }
            }).then( (response) => {
                console.log(response)
                this.flag_list = response.data.data
            }).catch(e => {
                this.$toast.error('Content load failed!!!', {icon: "error_outline"})
            });
        },
        /**
         * Send request for OTP
         */
        async request_for_otp() {
            this.otp_popup_form = true
            let url = '/api/otp-request';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));                     
            
            if(this.formData.comment_rel_info.user_email){
                let email = this.formData.comment_rel_info.user_email
                let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if(!email_regex.test(email)){
                    this.$toast.error('Invalid email address', {icon: "error_outline"});
                    return false;
                }
            }
            
            let request_data = {
                contact_no: this.formData.comment_rel_info.contact_no,
                email: this.formData?.comment_rel_info?.user_email ? this.formData.comment_rel_info.user_email : '',
            } 
            this.$axios.post(url, request_data, {
                headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getTokenType.access_token
                }
            }).then((response) => {
                console.log(response.data);
                localStorage.setItem('contact_number', response.data.contact_number)
                this.otp_code = response.data;
                this.$toast.success('Code has been sent', {icon: "success"});             
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "error_outline"});
            });
        },
        /**
         * Check upload data validition
         */
        async check_submit(){
            let user_name = this.formData.comment_rel_info.user_name.trim();
            let user_email = this.formData.comment_rel_info.user_email.trim();
            let contact_no = this.formData.comment_rel_info.contact_no.trim();
            
            if(this.formData.comment.trim()==''){
                this.$toast.error('আপনার মন্তব্য লিখুন', {icon: "সতর্কতা"});
                this.$refs.comment.focus();
                return false;
            }else if(user_name==''){
                this.$toast.error('আপনার নাম লিখুন', {icon: "সতর্কতা"});
                this.$refs.user_name.focus();
                return false;
            }else if(user_email=='' && contact_no==''){
                this.$toast.error('আপনার ইমেইল অথবা কন্টাক্ট নম্বর লিখুন', {icon: "সতর্কতা"});
                this.$refs.user_email.focus();
                return false;
            }else if(user_email!=='' && !this.$validateEmail(user_email)){
                this.$toast.error('বৈধ ইমেইল ঠিকানা লিখুন', {icon: "সতর্কতা"});
                this.$refs.user_email.focus();
                return false;
            }else if(contact_no!=='' && !this.$validateContactNumber(contact_no)){
                this.$toast.error('বৈধ কন্টাক্ট নম্বর  লিখুন', {icon: "সতর্কতা"});
                this.$refs.contact_no.focus();
                return false;
            }else if(this.single_file.size > 2048 * 2048){
                this.$toast.error('দয়া করে উপলোডকৃত ফাইল টা ২ মেগাবাইট এর কম দিন', {icon: "সতর্কতা"});
                this.$refs.single_file.focus();
                return false;
            }

            this.request_for_otp()
            // this.submit_form();
        },
        async submit_form(){
            let url = '/api/submit-comment';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            this.submit_loader = true;
            this.alert_box_allow = false;

            const new_form_data = new FormData();
            new_form_data.append('single_file',this.single_file);
            new_form_data.append('comment',this.formData.comment);
            new_form_data.append('status',this.formData.status ? 1: 0);
            new_form_data.append('user_name',this.formData.comment_rel_info.user_name);
            new_form_data.append('user_email',this.formData.comment_rel_info.user_email);
            new_form_data.append('contact_no',this.formData.comment_rel_info.contact_no);
            new_form_data.append('url',this.formData.comment_rel_info.url);
            new_form_data.append('domain_id',this.formData.comment_rel_info.domain_id);
            new_form_data.append('type_id',this.formData.comment_rel_info.type_id);
            new_form_data.append('flag_rpt_type_id',this.formData.comment_rel_info.flag_rpt_type_id);
            
            this.$axios.post(url, new_form_data, {
                headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
                'X-XSRF-TOKEN': getTokenType.access_token
                }
            }).then( async response => {
                console.log(response)
                this.submit_loader = false

                if(response.data.status=="success"){
                    this.$swal("ধন্যবাদ", "তথ্য সফলভাবে পোস্ট করা হয়েছে ।", "success");
                    this.otp_popup_form = false;
                    this.alert_box_allow = false;
                    this.form_reset();
                    // closeCommentSection();
                }else{
                    this.$swal("দুঃখিত !!!", "কিছু ভুল হয়েছে, সঠিক তথ্য সহ জমা দিন", "warning");
                }
            }).catch(e => {
                this.$toast.error('Submit failed!!!', {icon: "error_outline"})
                this.submit_loader = false
            });
        },
        form_reset(){
            this.formData = {
                comment: '',
                status: false,
                comment_rel_info: {
                    user_name: '',
                    user_email: '',
                    contact_no: '',
                    url: this.full_path,
                    domain_id: this.get_domain_id,
                    type_id: this.$route.query.type_id?this.$store.state.comment_type_list[this.$route.query.type_id].id:'',
                    flag_rpt_type_id: null
                }
            }
        }
    }
}
</script>
<style scoped>
    .comment_view_block{
        font-family:"Hind Siliguri Light";
    }
    .alert_box_block{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0; top: 0;
        background: #00000080;
        z-index: 999
    }
    .alert_box_block > .content_box{
        position: relative;
        background: #fff;
        border-radius: 5px;
        padding: 15px 25px;
        /* left: 25%; */
        /* top: 35%; */
        width: 50%;
        box-shadow: 0 0 5px #000;
    }
    .alert_box_block > .content_box > .msg{
        padding: 10px; font-size: 16px
    }
    .alert_box_block > .content_box > .action_btn_block{
        text-align: right;
        margin-top: 15px;
    }
    .alert_box_block > .content_box > .action_btn_block > span{
        display: inline-block; margin: 0 5px;
        padding: 5px 15px;
        background-color: #363;
        color: #fff; border-radius: 25px;
        cursor: pointer;
        transition: all 0.4s
    }
    .alert_box_block > .content_box > .action_btn_block > span:hover{
        background-color: rgb(0, 150, 0);
    }
    .alert_box_block > .content_box > .action_btn_block > span > i{
        margin-right: 5px;
    }
    .alert_box_block > .content_box > .action_btn_block > span:last-child{
        background-color: #CD0000;
    }
    .alert_box_block > .content_box > .action_btn_block > span:last-child:hover{
        background-color: #b32e2e
    }
    input,select{
        width: 100%;
        border: 1px solid #cdcdcd;
        padding: 10px;
        outline: none
    }
    .content_label{
        display: block;
        background-color: #eee;
        padding: 0 15px;        
        border: 1px solid #cdcdcd;
        border-bottom: none;
        font-size: 14px;
        /* font-weight: bold; */
        color: #423442;
        border-radius: 3px 3px 0 0;
    }    
    .content_label label{
        display: flex;
        height: 40px;
        margin: 0;
    }
    .content_label label i,
    .content_label label span{
        align-self: center;
    }
    .content_label label i{
        padding-right: 10px;
        font-size: 16px;
        color: #999
    }
    .comment_header{
        position: fixed;
        left: 0; top: 0;
        width: 100%; background-color: purple;
        height: 60px; line-height: 60px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        font-size: 22px;
        color: #fff;
        z-index: 999;
    }
    .comment_header > .type_btn{
        position: absolute;
        display: flex; height: 60px; font-size: 18px;
        color: #fff; cursor: pointer;
        left: 25px; top: 0; line-height: 60px;
    }
    .comment_header > .type_btn > i,
    .comment_header > .type_btn > span{
        align-self: center;
    }
    .comment_header > .type_btn > i{
        margin-right: 5px; font-size: 19px
    }
    .comment_header > i{
        color: rgb(185, 102, 185)
    }
    .content_block{
        display: block;
        margin-top: 80px !important
    }
    .empty_content{
        display: block;        
    }
    .empty_content > i{
        color: #ddd;
        font-size: 10em;
    }
    .type_list_block{
        display: block;
        text-align: center;
        margin-top: 15%;
    }
    .type_list_block > div{
        display: inline-block;
        height: 100px; line-height: 36px;
        min-width: 100px;
        font-size: 14px;        
        background-color: #f7f7f7;
        border: 1px solid #ddd;
        color: purple; padding: 0 15px;
        border-radius: 3px; margin: 15px;
        transition: all 0.4s;
        cursor: pointer;
    }
    .type_list_block > div:hover{
        background-color: purple;
        border-color: purple;
        color: #fff
    }
    .type_list_block > div .image{
        display: inline-block;
        margin-top: 15px;
        width: 36px; height: 36px;
    }
    .type_list_block > div .image > img{
        width: 100%; height: 100%; object-fit: contain;
    }
    .type_list_block > div .icon{
        margin-top: 15px;
        font-size: 26px;
    }
    .type_list_block > div .title{
        font-size: 16px        
    }
    .comment_type{
        padding: 8px 10px;
        border: 1px solid #cdcdcd;
        /* border-radius: 3px; */
    }
    .comment_type > span{
        display: inline-block;
        cursor: pointer;
    }
    .comment_type > span:last-child{
        margin-left: 10px;
    }
    .action_btn{
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        outline: 0px;
        background-color: #b100f7;
        color: #fff;
        border: none;
        padding: 5px 15px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.4s;
    }
    .action_btn i{
        margin-right: 5px;
    }
    .action_btn:hover{
        background-color: #7a0099;
    }
</style>