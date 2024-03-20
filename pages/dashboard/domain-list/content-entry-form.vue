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
                        <label>Site Name (Bangla)</label>
                        <div><input type="text" placeholder="Enter site name (bangla)" class="form-control" v-model="formData.sitename_bn" ref="sitename_bn" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Site Name (English)</label>
                        <div><input type="text" placeholder="Enter site name (english)" class="form-control" v-model="formData.sitename_en" ref="sitename_en" /></div>
                    </div>
                    <!-- <div class="mb-4">
                        <label>Domain ID</label>
                        <div><input type="number" min="1" placeholder="i.e; 1" class="form-control" v-model="formData.domain_id" ref="domain_id" /></div>
                    </div> -->
                    <div class="mb-4">
                        <label>Domain URL</label>
                        <div><input type="text" placeholder="Enter domain URL" class="form-control" v-model="formData.sub_domain" ref="sub_domain" /></div>
                    </div>
                    
                    <div class="mb-4">
                        <label>Alias</label>
                        <div><input type="text" placeholder="Enter alias" class="form-control" v-model="formData.alias" ref="alias" /></div>
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
                            <option value="">Select one</option>
                            <template v-for="(item,index) in domain_group_list" >
                                <option :key="index" :value="item.id">{{ item.group_title }}</option>
                            </template>
                        </select>
                    </div>
                    <!-- <div class="mb-4">
                        <label>Cluster</label>
                        <div><input type="number" min="1" placeholder="i.e; 1" class="form-control" v-model="formData.cluster" ref="cluster" /></div>
                    </div> -->
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
                domain_id: '',
                sub_domain: '',
                sitename_en: '',
                sitename_bn: '',
                domain_group_id: '',
                alias: '',
                cluster: '',
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
            
            this.$axios.get('/api/domain-list/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)
                let getData = response.data;

                this.formData = {
                    sitename_bn: getData.sitename_bn,
                    sitename_en: getData.sitename_en,
                    domain_group_id: getData.domain_group_id?getData.domain_group_id:'',
                    sub_domain: getData.sub_domain,
                    domain_id: getData.domain_id,
                    alias: getData.alias,
                    cluster: getData.cluster,
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

            if(this.formData.sitename_bn.trim()==''){
                this.$toast.error('Please enter site name (bangla)', {icon: "Warning"});
                this.$refs.sitename_bn.focus();
                return false;
            }else if(this.formData.sitename_en.trim()==''){
                this.$toast.error('Please enter site name (english)', {icon: "Warning"});
                this.$refs.sitename_en.focus();
                return false;
            }else if(this.formData.domain_group_id==''){
                this.$toast.error('Please choose domain group', {icon: "Warning"});
                this.$refs.domain_group_id.focus();
                return false;
            }else if(this.formData.sub_domain.trim()==''){
                this.$toast.error('Please enter sub domain', {icon: "Warning"});
                this.$refs.sub_domain.focus();
                return false;
            }/*else if(this.formData.domain_id==''){
                this.$toast.error('Please enter domain ID', {icon: "Warning"});
                this.$refs.domain_id.focus();
                return false;
            }else if(this.formData.alias.trim()==''){
                this.$toast.error('Please enter alias', {icon: "Warning"});
                this.$refs.alias.focus();
                return false;
            }else if(this.formData.cluster==''){
                this.$toast.error('Please enter cluster', {icon: "Warning"});
                this.$refs.cluster.focus();
                return false;
            }*/

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
                
                await this.$parent.domainSubmit(submit_data);
                
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
                sub_domain: '',
                sitename_en: '',
                sitename_bn: '',
                domain_group_id: '',
                alias: '',
                cluster: '',
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