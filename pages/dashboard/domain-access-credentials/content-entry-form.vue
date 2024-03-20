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
                    <!-- <div class="mb-4">
                        <label>Domain ID</label>
                        <div><DomainManagement /></div>
                    </div> -->
                    <div class="mb-4">
                        <label>Choose Domain Group</label>                        
                        <select v-model="formData.domain_group_id" class="form-control parent-dropdown" ref="domain_group_id">
                            <option value="">Select one</option>
                            <template v-for="(item,index) in domain_group_list" >
                                <option :key="index" :value="item.id">{{ item.group_title }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label>App ID <span v-if="app_id_loader"><i class="fa fa-cog fa-spin"></i> Generating...wait</span><span v-else class="generate_btn" @click="generate_app_id"><i class="fa fa-refresh"></i> Generate</span></label>
                        <div><input type="text" placeholder="App ID" class="form-control" v-model="formData.app_id" disabled readonly ref="app_id" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Secret Key <span v-if="secret_key_loader"><i class="fa fa-cog fa-spin"></i> Generating...wait</span><span v-else class="generate_btn" @click="generate_secret_key"><i class="fa fa-refresh"></i> Generate</span></label>
                        <div><input type="text" placeholder="Secret Key" class="form-control" v-model="formData.secret_key" disabled readonly ref="secret_key" /></div>
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
import DomainManagement from './components/domain-management'
import SwithcBtn from '@/components/action_buttons/SwitchBtn'
export default {
    name: 'ContentEntryFromBlock',
    props: {
        edit_content_id: Number
    },
    components: {
        DomainManagement,
        SwithcBtn
    },    
    data(){
        return {
            form_loader: false,
            app_id_loader: false,
            secret_key_loader: false,
            domain_group_list: [],
            formData: {
                domain_group_id: '',
                app_id: '',
                secret_key: '',
                status: true
            },
            domains: [],
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
        async generate_app_id(){
            const url = `/api/domain-access-credentials/generate?term=app_id`
            this.app_id_loader = true

            let getReponseData = await this.$http.$get(url, this.$parent.header_config);

            this.formData.app_id = getReponseData.data

            this.app_id_loader = false
        },
        async generate_secret_key(){
            const url = `/api/domain-access-credentials/generate?term=secret_key`
            this.secret_key_loader = true

            let getReponseData = await this.$http.$get(url, this.$parent.header_config);

            this.formData.secret_key = getReponseData.data

            this.secret_key_loader = false
        },
        async load_req_data(id){
            this.form_loader = true;
            
            this.$axios.get('/api/domain-access-credentials/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)
                let getData = response.data;

                this.formData = {                    
                    domain_id: getData.domain_id,
                    app_id: getData.app_id,
                    secret_key: getData.secret_key,
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

            if(this.formData.domain_id==''){
                this.$toast.error('Please choose domain', {icon: "Warning"});
                return false;
            }else if(this.formData.app_id==''){
                this.$toast.error('Please generate app ID', {icon: "Warning"});
                return false;
            }else if(this.formData.secret_key==''){
                this.$toast.error('Please generate secret Key', {icon: "Warning"});                
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
                
                await this.$parent.domainAccessCredentialSubmit(submit_data);
                
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
                domain_id: '',
                app_id: '',
                secret_key: '',
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
    .generate_btn{
        display: inline-block;
        margin-left: 5px;
        font-size: 10px;
        padding: 1px 8px;
        background-color: #006699;
        color: #fff; border-radius: 25px;
        cursor: pointer;
    }
    .generate_btn:hover{
        background-color: #CD0000;
    }
</style>