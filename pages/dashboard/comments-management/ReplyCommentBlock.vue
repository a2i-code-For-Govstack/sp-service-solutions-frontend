<template>
    <div class="reply_comment_block">
        <div class="black_mask_overlay"></div>
        <div class="content">
            <span class="close_btn" @click="$parent.close_popup()">x</span>
            <div v-if="$parent.comment_reply_list" class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>sl</th>
                            <th>Comment</th>
                            <th>Reply With</th>
                            <th>Reply By User</th>
                            <th>Date Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in $parent.comment_reply_list" :key="index">
                            <td>{{ (index+1) }}</td>
                            <td>
                                <label class="m-0"><small><b>Subject:</b></small></label>
                                <div>{{ item.subject }}</div>
                                <label class="m-0 mt-2"><small><b>Comment:</b></small></label>                                
                                <div v-html="item.comment"></div>
                            </td>
                            <td>
                                {{ item.reply_media }}
                            </td>
                            <td>
                                <div>
                                    <label class="m-0 mt-2"><small><b>Name:</b></small></label>
                                    {{ item.created_by_info?item.created_by_info.user_info.full_name:'' }}
                                </div>
                                <div>
                                    <label class="m-0 mt-2"><small><b>Email:</b></small></label>
                                    {{ item.created_by_info?item.created_by_info.email:'' }}
                                </div>
                                <div>
                                    <label class="m-0 mt-2"><small><b>Designation:</b></small></label>
                                    {{ item.created_by_info?item.created_by_info.designation:'' }}
                                </div>
                            </td>
                            <td>{{ item.created_at }}</td>
                        </tr>
                    </tbody>
                </table>                    
            </div>
            <template v-else>                
                <div v-if="$parent.reply_media=='email'" class="reply_to">To: {{ formData.data.user_name }} &lt;{{ formData.data.user_email }}&gt;</div>
                <div v-if="$parent.reply_media=='sms'" class="reply_to">To: {{ formData.data.user_name }} ({{ formData.data.contact_no }})</div>

                <div class="reply_subject mt-2">
                    <label>Enter Subject</label>
                    <div><input type="text" placeholder="Enter subject" class="form-control" v-model="formData.subject" ref="reply_subject" /></div>
                </div>
                <div class="reply_comment mt-3">
                    <label>Enter Your Comment</label>
                    <div v-if="$parent.reply_media=='email'" ref="reply_comment">
                        <vue-editor v-model="formData.comment" />
                    </div>
                    <div v-if="$parent.reply_media=='sms'" ref="reply_comment">
                        <textarea class="sms_text_block" style="width: 100%" rows="3" v-model="formData.comment" />
                    </div>
                    <select name="" class="form-control" id="" v-model="selected" v-on:change="toggle" @click="load_pre_define_text">
                        <option value="" disabled>Select a predefine text</option>
                        <option v-for="item in items" :key="item.message">{{ item.text }}</option>
                    </select>

                </div>
                <div class="row">
                    <div class="col-md-6 mt-3" align="left">
                        <span @click="submit_pre_define_text" class="submit_btn">
                            <i class="fa fa-comment"></i> Add text
                        </span>
                    </div>

                    <div class="col-md-6 mt-3" align="right">
                        <span v-if="submit_pre_loader">
                            <i class="fa fa-cog fa-spin"></i> Submitting...Wait
                        </span>
                        <span v-else class="submit_btn" @click="submit_comment">
                            <template v-if="$parent.reply_media=='email'">
                                <i class="fa fa-paper-plane"></i> E-mail Submit
                            </template>
                            <template v-if="$parent.reply_media=='sms'">
                                <i class="fa fa-comment"></i> SMS Submit
                            </template>
                        </span>
                        <!-- <span @click="submit_rating" class="submit_btn">
                            <i class="fa fa-comment"></i> Rating
                        </span> -->
                    </div>
                </div>
                <!-- {{ $parent.reply_comment_info.comment }} -->
                <div v-if="rating_popup_form" class="alert_box_block">
                    <div class="content_box">
                        <div class="action_btn_block">
                            <RatingForm v-if="rating_popup_form" />
                        </div>
                    </div>
                </div>
                <div v-if="pre_define_text_form" class="alert_box_block">
                    <div class="content_box">
                        <div class="action_btn_block">
                            <PreDefineText v-if="pre_define_text_form" />
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
    </div>
</template>
<script>
import RatingForm from '/components/RatingForm.vue';
import PreDefineText from '/components/PreDefineText.vue';
export default {
    name: 'ReplyCommentBlock',

    components: {
        RatingForm,
        PreDefineText
    }, 

    data(){
        return {
            submit_pre_loader: false,

            rating_popup_form: false,
            alert_box_block: false,
            pre_define_text_form:false,

            items: [],
            selected: '', 

            formData: {
                data: this.$parent.reply_comment_info.comment_rel_info,
                subject: '',
                comment: '',
                reply_media: this.$parent.reply_media,
                status: 0,
            }
        }
    },
    mounted(){
        this.formData.subject ='Reply:' + this.$subString(this.$parent.reply_comment_info.comment)
    },
    methods: {
        load_pre_define_text() {
            var domain_id = this.formData.data.domain_id
            var url = '/api/pre-define-text/index/' + domain_id
            
            this.$axios.get(url, this.$parent.$parent.header_config).then( (response) => {
                this.items = response.data
                }).catch(e => {
                    console.log(e)
                    this.$toast.error('Failed!!!', {icon: "error_outline"})
                });
        },
        toggle(){
            this.formData.comment = this.selected
        },
        submit_pre_define_text() {
            this.alert_box_allow = true;
            this.pre_define_text_form = true;
        },
        submit_rating() {
            this.alert_box_allow = true;
            this.rating_popup_form = true;
        },
        submit_comment: function(){
            if(this.formData.subject.trim()==''){
                this.$toast.error('Please enter subject', {icon: "Warning"});
                this.$refs.reply_subject.focus();
                return false;
            }
            else if(this.formData.comment.trim()==''){
                this.$toast.error('Please enter comment', {icon: "Warning"});
                this.$refs.reply_comment.focus();
                return false;
            }

            if(confirm('Are you sure to submit it?')){
                this.submit_pre_loader = true
                this.$axios.post('/api/comments/reply', this.formData, this.$parent.$parent.header_config).then( (response) => {
                    console.log('Get Data', response.data)

                    if(this.formData.reply_media=='sms' && !response.data.status){
                        this.$swal("Warning!", response.data.msg);
                    }else this.$swal("Good job!", "Comment has been replied successfully.", "success");
                    this.formData.comment = '';
                    this.submit_pre_loader = false;
                    this.$parent.close_popup();
                }).catch(e => {
                    console.log(e)
                    this.$toast.error('Failed!!!', {icon: "error_outline"})
                    this.submit_pre_loader = false
                });
            }
        }
    }
}
</script>
<style scoped>
    .alert_box_block{
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
        left: 25%;
        top: 35%;
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
    .reply_comment_block{
        position: fixed;
        width: 100%; height: 100%;
        left: 0; top: 0;
        padding-bottom: 25px;
        overflow-y: auto;
        z-index: 998;
    }
    .black_mask_overlay{
        position: fixed;
        left: 0; bottom: 0;
        width: 100%; height: 100%;
        /* background-image: linear-gradient(to top, #000000cc, transparent); */
        background-color: #00000099;
        z-index: 999;
    }
    .content{
        position: relative;
        background-color: #ffffff;        
        width: 60%;
        left: 20%;
        top: 10%;
        padding: 15px;
        min-height: 100px;
        border-radius: 5px 5px 0 0;
        box-shadow: 0 0 15px #000;        
        z-index: 1000;
    }
    .reply_subject > label{
        display: block;
        margin-bottom: .5rem;
        padding-top: 8px;        
        border-top: 1px solid #ddd;
    }
    .sms_text_block{
        padding: 15px;
        border-radius: 3px;
    }
    .submit_btn{
        display: inline-block;
        padding: 3px 10px;
        background-color: purple;
        color: #ffffff; font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.4s;
    }
    .submit_btn:hover{
        background-color: rgb(77, 0, 128);
    }
    .close_btn{
        position: absolute;
        background-color: #ffffff;
        right: -10px; top: -10px;
        width: 30px; height: 30px;
        line-height: 30px; text-align: center;
        border-radius: 50%; box-shadow: 0 0 5px #666;
        cursor: pointer;
    }
</style>