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
                        <label>Survey Title</label>
                        <div><input type="text" placeholder="Enter survey title" class="form-control" v-model="formData.survey_title" ref="survey_title" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Description</label>
                        <div ref="description">
                            <vue-editor v-model="formData.description" :editorToolbar="customToolbar" />
                        </div>
                    </div>
                    <div class="mb-4">
                        <label>Embed Code</label>
                        <div class="text_area" ref="embed_code">
                            <textarea-autosize
                                :placeholder="'Enter embed code'"                    
                                v-model="formData.embed_code"
                                :min-height="30"
                                :max-height="450"                                
                            />
                        </div>
                    </div>
                    <div>
                        <label>Status</label>
                        <SwithcBtn :status="formData.status" :index="'status'" />
                        <input type="hidden" v-model="formData.status" />
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
                    <div class="item_block mb-4">
                        <label>Choose category</label>
                        <select v-model="formData.cat_id" class="form-control parent-dropdown">
                            <option value="">Select one</option>
                            <template v-for="(item,index) in category_list" >
                                <option :key="index" :value="item.id">{{ item.category_name }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="item_block mb-4">
                        <label>Choose type</label>
                        <select v-model="formData.type" class="form-control parent-dropdown">
                            <option value="0">Open</option>
                            <option value="1">Schedule</option>
                        </select>
                    </div>
                    <template v-if="formData.type=='1'">
                        <div class="item_block mb-4">
                            <label>Choose start date time</label>
                            <datetime type="datetime" input-class="datetime_input" v-model="formData.start_time" zone="Asia/Dhaka" />
                        </div>
                        <div class="item_block mb-4">
                            <label>Choose end date time</label>
                            <datetime type="datetime" input-class="datetime_input" v-model="formData.end_time" zone="Asia/Dhaka"></datetime>
                        </div>
                    </template>
                    <div v-if="!$parent.$parent.$parent.req_from_external_domain" class="item_block">
                        <div class="mb-4">
                            <label>Allow Domains</label>

                            <div class="option_block mb-3">
                                <span @click="allow_domain_type=1">
                                    <i v-if="allow_domain_type==1" class="far fa-check-circle"></i>
                                    <i v-else class="far fa-circle"></i>
                                    Domains
                                </span>
                                <span @click="allow_domain_type=2" class="ml-2">
                                    <i v-if="allow_domain_type==2" class="far fa-check-circle"></i>
                                    <i v-else class="far fa-circle"></i>
                                    Group Domains
                                </span>
                            </div>

                            <template v-if="allow_domain_type==1">
                                <DomainManagement />
                            </template>
                            <template v-else>
                                <DomainGroupManagement />
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DomainManagement from './components/domain-management'
import DomainGroupManagement from './components/domain-group-management.vue'
import SwithcBtn from '@/components/action_buttons/SwitchBtn'
export default {
    name: 'ContentEntryFromBlock',
    props: {
        edit_content_id: Number
    },
    components: {
        DomainManagement,
        DomainGroupManagement,        
        SwithcBtn
    },    
    data(){
        return {
            form_loader: false,
            formData: {
                survey_title: '',
                description: '',
                embed_code: '',
                cat_id: '',
                group_ids: [],
                domain_ids: [],                
                start_time: '',
                end_time: '',
                type: 0,
                status: true
            },
            category_list: [],
            domains: [],
            domain_groups: [],
            allow_domain_type: 1,
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

        // load categories
        this.load_categories();

        // alert(this.$parent.$parent.$parent.req_from_external_domain)

        // load domain info
        if(this.$parent.$parent.$parent.req_from_external_domain && !this.edit_content_id) this.load_domain_info();
    },
    methods: {
        switch_data(index,status){
            this.formData[index] = status
        },
        async load_domain_info(){
            let url = '/api/load-domain-info';           
            // alert(url)            
            this.$axios.post(url,{req_from: localStorage.getItem('req_from')},this.$parent.header_config).then( (response) => {
                console.log(response)
                this.formData.domain_ids.push(response.data.data.id)
            }).catch(e => {
                this.$toast.error('Category load failed!!!', {icon: "error_outline"})
            });
        },
        async load_categories(){            
            let url = '/api/categories';
            
            this.category_list = [];
            this.$axios.get(url, this.$parent.header_config).then( (response) => {
                console.log(response)
                this.category_list = response.data.data
            }).catch(e => {
                this.$toast.error('Category load failed!!!', {icon: "error_outline"})
            });
        },
        async load_req_data(id){
            this.form_loader = true;
            
            this.$axios.get('/api/online-surveys/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)
                let getData = response.data.data;

                /**
                 *  Selected Domains
                 */
                let getDomains = [], domainList = [];
                if(getData.domain_info.length>0){
                    getData.domain_info.forEach((v,i) => {
                        if(v.sitename_bn){
                            getDomains[i] = {};
                            getDomains[i]['id'] = v.id;
                            getDomains[i]['tiClasses'] = [];
                            getDomains[i]['text'] = v.sitename_bn + ' (' + v.sub_domain + ')'
                            getDomains[i]['tiClasses'][0] = 'ti-valid'
                            domainList.push(v.id)
                        }
                    });
                }
                this.domains = getDomains


                /**
                 *  Selected Groups
                 */
                let getDomainGroups = [], domainGroupList = [];                
                if(getData.domain_group_info.length>0){
                    if(!getData.domain_info[0].sitename_bn){
                        this.allow_domain_type = 2
                        getData.domain_group_info.forEach((v,i) => {
                            getDomainGroups[i] = {};
                            getDomainGroups[i]['id'] = v.id;
                            getDomainGroups[i]['tiClasses'] = [];
                            getDomainGroups[i]['text'] = v.group_title
                            getDomainGroups[i]['tiClasses'][0] = 'ti-valid'
                            domainGroupList.push(v.id)
                        });
                    }
                }
                this.domain_groups = getDomainGroups

                this.formData = {
                    survey_title: getData.survey_title,
                    description: getData.description,
                    embed_code: getData.embed_code,
                    cat_id: getData.cat_id,
                    group_ids: domainGroupList,
                    domain_ids: domainList,                    
                    start_time: getData.start_time?getData.start_time:'',
                    end_time: getData.end_time?getData.end_time:'',
                    type: getData.type,
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

            if(this.formData.survey_title.trim()==''){
                this.$toast.error('Please enter survey title', {icon: "Warning"});
                this.$refs.survey_title.focus();
                return false;
            }else if(this.formData.embed_code.trim()==''){
                this.$toast.error('Please enter embed code', {icon: "Warning"});
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
                
                await this.$parent.onlineSurveySubmit(submit_data);
                
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
                survey_title: '',
                description: '',
                embed_code: '',
                cat_id: '',
                group_ids: [],
                domain_ids: [],                
                start_time: '',
                end_time: '',
                type: 0,
                status: true
            },
            this.allow_domain_type = 1
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
    
    .info_block .parent-dropdown{
        margin: 0; padding: 0 10px
    }
    .info_block .parent-dropdown >>> option{
        padding: 10px
    }
    .item_block >>> .datetime_input{
        display: block;
        width: 100%;
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
    .text_area >>> textarea{
        border: 1px solid #ddd;
        font-size: 13px;
        border-radius: 3px;
        padding: 15px;
        width: 100%;
    }
    .text_area >>> textarea:focus,
    .text_area >>> textarea:active{
        border-color: #ccc;
    }
    .option_block{
        display: block
    }
    .option_block > span{
        cursor: pointer
    }
</style>