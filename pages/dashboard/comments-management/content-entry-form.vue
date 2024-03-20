<template>
    <div class="content_entry_form_block">
        <RainbowLoader v-if="req_submit" />
        <div class="row">
            <div class="col-md-8">
                <div v-if="form_loader" class="row">
                    <div class="col-md-12">
                        <div class="form_block">
                            <FormBlockLoader :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                        </div>
                    </div>
                </div>
                <div v-else class="form_block">
                    <div class="mb-4">
                        <label>User Name</label>
                        <div><input type="text" placeholder="Enter user name" class="form-control" v-model="formData.comment_rel_info.user_name" ref="user_name" /></div>
                    </div>
                    <div class="mb-4">
                        <label>User Email</label>
                        <div><input type="text" placeholder="Enter user email" class="form-control" v-model="formData.comment_rel_info.user_email" ref="user_email" /></div>
                    </div>
                    <div class="mb-4">
                        <label>User Contact Number</label>
                        <div><input type="text" placeholder="Enter contact number" class="form-control" v-model="formData.comment_rel_info.contact_no" ref="contact_no" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Enter Your Comment</label>
                        <div ref="comment">
                            <vue-editor v-model="formData.comment" />
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="col-md-4">
                <div v-if="form_loader" class="row">
                    <div class="col-md-12">
                        <div class="info_block">
                            <FormBlockLoader :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                        </div>
                    </div>
                </div>
                <div v-else class="info_block">
                    <div class="mb-4">
                        <label>Flag report type (optional)</label>
                        <select v-model="formData.comment_rel_info.flag_rpt_type_id" class="form-control">
                            <option value="null">Select One</option>
                            <template v-if="flag_list.length>0">
                                <option v-for="(item,key) in flag_list" :key="key" :value="item.id">{{ item.type_title }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label>Status</label>
                        <SwithcBtn :status="formData.status" :index="'status'" />
                        <input type="hidden" v-model="formData.status" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SwithcBtn from '@/components/action_buttons/SwitchBtn'
export default {
    name: 'ContentEntryFromBlock',
    props: {
        edit_content_id: Number
    },
    components: {
        SwithcBtn
    },    
    data(){
        return {
            form_loader: false,
            formData: {                
                comment: '',
                status: true,
                comment_rel_info: {
                    user_name: '',
                    user_email: '',
                    contact_no: '',
                    url: '',
                    domain_id: null,
                    flag_rpt_type_id: null
                }
            },
            flag_list: [],
            req_submit: false,
            form_action: 'save'
        }
    },
    computed: {
        form_submit_status () {
            return this.$store.state.form_submit_status        
        }
    },
    watch: {
        edit_content_id (val) {
            if(val) this.load_req_data(val);
        },
        form_submit_status (status) {
            if(status) this.formSubmit();        
        }
    },
    mounted(){
        if(this.edit_content_id) this.load_req_data(this.edit_content_id);
        if(this.$store.state.form_submit_status) this.formSubmit();

        // load flag report types
        this.load_flag_rpt_types();
    },
    methods: {
        switch_data(index,status){
            this.formData[index] = status
        },
        async load_flag_rpt_types(){            
            let url = '/api/flag-rpt-types';
            
            this.flag_list = [];
            this.$axios.get(url, this.$parent.header_config).then( (response) => {
                console.log(response)
                this.flag_list = response.data.data
            }).catch(e => {
                this.$toast.error('Content load failed!!!', {icon: "error_outline"})
            });
        },
        async load_req_data(id){
            this.form_loader = true;
            
            this.$axios.get('/api/comments/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)
                let getData = response.data;

                let getCommentRelInfo = {
                    user_name: '',
                    user_email: '',
                    contact_no: '',
                    url: '',
                    domain_id: null,
                    flag_rpt_type_id: null
                }
                
                if(getData.comment_rel_info!==null) getCommentRelInfo = getData.comment_rel_info;

                this.formData = {
                    comment: getData.comment,
                    status: getData.status,
                    comment_rel_info: getCommentRelInfo,
                }

                this.form_loader = false;
                this.form_action = 'update';
            }).catch(e => {
                console.log(e)
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.form_loader = false;
            });
        },
        async formSubmit(){
            this.$parent.form_submit_state(false)

            let user_name = this.formData.comment_rel_info.user_name.trim();
            let user_email = this.formData.comment_rel_info.user_email.trim();
            let contact_no = this.formData.comment_rel_info.contact_no.trim();
            if(user_name==''){
                this.$toast.error('Please enter user name', {icon: "Warning"});
                this.$refs.user_name.focus();
                return false;
            }else if(user_email=='' && contact_no==''){
                this.$toast.error('Please enter email or contact number', {icon: "Warning"});
                this.$refs.user_email.focus();
                return false;
            }else if(user_email!=='' && !this.$validateEmail(user_email)){
                this.$toast.error('Please enter valid email address', {icon: "Warning"});
                this.$refs.user_email.focus();
                return false;
            }else if(contact_no!=='' && !this.$validateContactNumber(contact_no)){
                this.$toast.error('Please enter valid contact number', {icon: "Warning"});
                this.$refs.contact_no.focus();
                return false;
            }else if(this.formData.comment.trim()==''){
                this.$toast.error('Please enter comment', {icon: "Warning"});
                this.$refs.comment.focus();
                return false;
            }

            if(confirm('Are you sure to submit it?')){
                // setup submitted data
                let submit_data = {
                    id: this.$parent.user_id,
                    access_token: this.$parent.user_access_token,
                    data: this.formData,
                    action: this.form_action,
                    edit_id: this.edit_content_id
                }

                // call for submit
                this.req_submit = true;
                
                await this.$parent.commentSubmit(submit_data);
                
                this.req_submit = false;
                this.$parent.load_data();                
                
                await this.$swal("Good job!", "Data has been "+ (this.form_action == 'save'?'inserted':'updated') +" successfully.", "success");

                if(this.form_action == 'save'){
                    this.form_reset();
                    this.$parent.add_new_entity(false)
                }
            }            
        },
        form_reset(){
            this.formData = {
                comment: '',
                status: true,
                comment_rel_info: {
                    user_name: '',
                    user_email: '',
                    contact_no: '',
                    url: '',
                    domain_id: null,
                    flag_rpt_type_id: null
                }
            }
        }
    }
}
</script>
<style scoped>
    .form_block,.info_block{
        display: block;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 20px;
    }
</style>