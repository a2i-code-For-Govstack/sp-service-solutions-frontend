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
                        <label>Mail Host <span>*</span></label>
                        <div><input type="text" placeholder="Enter mail host" class="form-control" v-model="formData.mail_host" ref="mail_host" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Mail Port <span>*</span></label>
                        <div><input type="number" placeholder="i.e; 587" class="form-control" v-model="formData.mail_port" ref="mail_port" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Mail Username <span>*</span></label>
                        <div><input type="text" placeholder="Enter mail username" class="form-control" v-model="formData.mail_username" ref="mail_username" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Mail Password <span>*</span></label>
                        <div><input type="text" placeholder="Enter mail password" class="form-control" v-model="formData.mail_password" ref="mail_password" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Mail Encryption <span>*</span></label>
                        <div><input type="text" placeholder="i.e; tls" class="form-control" v-model="formData.mail_encryption" ref="mail_encryption" /></div>
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
                        <label>Choose Domain Group</label>                        
                        <select v-model="formData.domain_group_id" class="form-control parent-dropdown" ref="domain_group_id">
                            <option value="">Empty Group</option>
                            <template v-for="(item,index) in domain_group_list" >
                                <option :key="index" :value="item.id">{{ item.group_title }}</option>
                            </template>
                        </select>
                    </div>
                    <div>
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
            domain_group_list: [],
            formData: {
                mail_host: '',
                mail_port: '',
                mail_username: '',
                mail_password: '',
                mail_encryption: '',
                domain_group_id: '',
                status: true
            },
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

        // Load domain groups
        this.load_domain_groups();
    },
    methods: {
        switch_data(index,status){
            this.formData[index] = status
        },
        async load_domain_groups(){
            let url = '/api/domain-groups';
            
            this.domain_group_list = [];
            this.$axios.get(url, this.$parent.header_config).then( (response) => {
                console.log(response)
                this.domain_group_list = response.data.data
            }).catch(e => {
                this.$toast.error('Doamin group load failed!!!', {icon: "error_outline"})
            });
        },
        async load_req_data(id){
            this.form_loader = true;
            
            this.$axios.get('/api/smtp-setup/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)
                let getData = response.data;

                this.formData = {
                    mail_host: getData.mail_host,
                    mail_port: getData.mail_port,
                    mail_username: getData.mail_username,
                    mail_password: getData.mail_password,
                    mail_encryption: getData.mail_encryption,
                    domain_group_id: getData.domain_group_id?getData.domain_group_id:'',
                    status: getData.status
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

            if(this.formData.mail_host.trim()==''){
                this.$toast.error('Please enter mail host', {icon: "Warning"});
                this.$refs.mail_host.focus();
                return false;
            }else if(this.formData.mail_port.trim()==''){
                this.$toast.error('Please enter mail port', {icon: "Warning"});
                this.$refs.mail_port.focus();
                return false;
            }else if(this.formData.mail_username.trim()==''){
                this.$toast.error('Please enter mail username', {icon: "Warning"});
                this.$refs.mail_username.focus();
                return false;
            }else if(this.formData.mail_password.trim()==''){
                this.$toast.error('Please enter mail password', {icon: "Warning"});
                this.$refs.mail_password.focus();
                return false;
            }else if(this.formData.mail_encryption.trim()==''){
                this.$toast.error('Please enter mail encryption', {icon: "Warning"});
                this.$refs.mail_encryption.focus();
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
                
                await this.$parent.smtpSetupSubmit(submit_data);
                
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
                mail_host: '',
                mail_port: '',
                mail_username: '',
                mail_password: '',
                mail_encryption: '',
                domain_group_id: '',
                status: true
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