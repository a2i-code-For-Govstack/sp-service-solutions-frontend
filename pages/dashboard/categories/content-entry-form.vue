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
                        <label>Category Name</label>
                        <div><input type="text" placeholder="Enter category name" class="form-control" v-model="formData.category_name" @keyup="slug_config" ref="category_name" /></div>
                    </div>
                    <div class="mb-4">
                        <label>Slug</label>
                        <div><input type="text" placeholder="Enter slug" class="form-control" v-model="formData.slug" readonly /></div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <label>Icon</label>
                            <IconInputBlock />
                        </div>
                        <div class="col-md-6">
                            <label>Status</label>
                            <SwithcBtn :status="formData.status" :index="'status'" />
                            <input type="hidden" v-model="formData.status" />
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
                    <div class="item_block">
                        <label>Parent category</label>
                        <select v-model="formData.parent_id" class="form-control parent-dropdown" size="7">
                            <option value="null" :selected="{selected:formData.parent_id}">No parent</option>
                            <template v-for="(item,index) in category_list" >
                                <option v-if="item.id!==edit_content_id" :key="index" :value="item.id">{{ item.category_name }}</option>
                            </template>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import IconInputBlock from './components/icon_input_block'
import SwithcBtn from '@/components/action_buttons/SwitchBtn'
export default {
    name: 'ContentEntryFromBlock',
    props: {
        edit_content_id: Number
    },
    components: {
        SwithcBtn,
        IconInputBlock
    },    
    data(){
        return {
            form_loader: false,
            formData: {
                category_name: '',                
                slug: '',
                parent_id: null,
                icon: null,
                exist_icon: null,
                status: true
            },
            req_submit: false,
            form_action: 'save'            
        }
    },
    computed: {
        form_submit_status () {
            return this.$store.state.form_submit_status        
        },
        category_list () {
            return this.$parent.contents
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
    },
    methods: {
        switch_data(index,status){
            this.formData[index] = status
        },
        slug_config(){            
            this.formData.slug = this.$strSlug(this.formData.category_name)
        },
        async load_req_data(id){
            this.form_loader = true;
            
            this.$axios.get('/api/categories/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)
                let getData = response.data;

                this.formData = {
                    category_name: getData.category_name,                
                    slug: getData.slug,
                    parent_id: getData.parent_id,
                    icon: getData.icon,
                    exist_icon: getData.exist_icon,
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

            if(this.formData.category_name.trim()==''){
                this.$toast.error('Please enter category name', {icon: "Warning"});
                this.$refs.category_name.focus();
                return false;
            } else if(this.formData.slug.trim()==''){
                this.$toast.error('Please enter slug', {icon: "Warning"});
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
                
                await this.$parent.categorySubmit(submit_data);
                
                // console.log('Response data', this.$store.state.category_info.get_data)
                
                this.req_submit = false;
                this.$parent.load_data();                

                await this.$swal("Good job!", "Data has been "+ (this.form_action == 'save'?'inserted':'updated') +" successfully.", "success");

                if(this.form_action == 'save'){
                    this.form_reset();
                    this.$parent.add_new_entity(false)
                }else{
                    this.formData.exist_icon = this.$store.state.category_info.get_data['icon']
                }
            }            
        },
        form_reset(){
            this.formData = {
                category_name: '',                
                slug: '',
                parent_id: null,
                icon: null,
                exist_icon: null,
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
    .info_block .parent-dropdown{
        margin: 0; padding: 0
    }
    .info_block .parent-dropdown >>> option{
        padding: 10px
    }
</style>