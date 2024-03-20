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
                            <td>{{ item.created_at }}</td>
                        </tr>
                    </tbody>
                </table>                    
            </div>
            <template v-else>                
                <div class="reply_to">To: {{ formData.data.user_name }} &lt;{{ formData.data.user_email }}&gt;</div>
                <div class="reply_subject mt-2">
                    <label>Enter Subject</label>
                    <div><input type="text" placeholder="Enter subject" class="form-control" v-model="formData.subject" ref="reply_subject" /></div>
                </div>
                <div class="reply_comment mt-3">
                    <label>Enter Your Comment</label>
                    <div ref="reply_comment">
                        <vue-editor v-model="formData.comment" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mt-3">
                    </div>
                    <div class="col-md-6 mt-3" align="right">
                        <span v-if="submit_pre_loader">
                            <i class="fa fa-cog fa-spin"></i> Submitting...Wait
                        </span>
                        <span v-else class="submit_btn" @click="submit_comment">
                            <i class="fa fa-paper-plane"></i> Submit
                        </span>
                    </div>
                </div>
                <!-- {{ $parent.reply_comment_info }} -->
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReplyCommentBlock',    
    data(){
        return {
            submit_pre_loader: false,            
            formData: {
                data: this.$parent.reply_comment_info.comment_rel_info,
                subject: '',
                comment: '',
                status: 0
            }
        }
    },
    methods: {
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

                this.$axios.post('/api/reply-comments', this.formData, this.$parent.$parent.header_config).then( (response) => {
                    console.log('Get Data', response.data)
                    this.$swal("Good job!", "Comment has been replied successfully.", "success");
                    this.formData.comment = '';
                    this.submit_pre_loader = false
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