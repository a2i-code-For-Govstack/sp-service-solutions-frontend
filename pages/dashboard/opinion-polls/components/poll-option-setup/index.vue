<template>
    <div class="poll_option_setup_block">
        <label>Option Setup ({{ option_arr.length }})</label>
        <div class="info_form_block mt-1">
            <div v-if="option_arr.length==0" class="empty_block">
                <i class="fa fa-box-open fa-4x"></i>
                <div>No entry yet. Click on the button below to add one.</div>
            </div>
            <div v-else>
                <div class="info_list" v-for="(item,index) in option_arr" :key="index">
                    <HeaderBlock :cur_index="index" :title="item.option_title" />
                    <FromBlock v-if="selected_info_index==index" :data="item" :cur_index="index" />
                </div>
            </div>
            <div class="add_btn_block">                
                <span @click="add_new_entry"><i class="fa fa-plus"></i> Add New Entry</span>
            </div>
        </div>

        <PopupBlock ref="popup_block" />
    </div>
</template>
<script>
import HeaderBlock from './header-block'
import FromBlock from './form-block'
import PopupBlock from './popup-block'
export default {
    name: 'PollOptionSetupBlock',
    components: {
        HeaderBlock,
        FromBlock,
        PopupBlock
    },
    data(){
        return {
            option_arr: this.$parent.formData.poll_options,
            selected_info_index: -1
        }
    },
    computed: {        
    },
    mounted(){        
    },
    methods: {        
        add_new_entry: function(){
            let obj = {                
                id: '',
                option_title:'',
                option_photo_info: '',
                poll_id: '',
                req_explain: false
            }

            this.option_arr.push(obj);
            this.selected_info_index = this.option_arr.length - 1;
        },
        add_photo_entry: function(){
            document.body.classList.add('popup_open');
            this.$refs.popup_block.popup_content_show = true
        },
        del_photo_entry: function(index){
            // delete this.photo_arr[index]
            if(confirm('Are you sure to delete it?')) this.option_arr[index].option_photo_info = ''
        },        
        select_entry: function(index){
            if(this.selected_info_index==index) this.selected_info_index = -1
            else this.selected_info_index = index
        },
        del_entry: function(index){
            // delete this.option_arr[index]
            if(confirm('Are you sure to delete it?')) this.option_arr.splice(index, 1)
        }
    }
}
</script>
<style scoped>
    .info_form_block{
        display: block;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
    .empty_block{
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    .empty_block > i{
        margin: 5px 0 15px;
        color: #ccc;
    }    
    .add_btn_block{
        padding: 10px 15px;        
        text-align: center;
    }    
    .add_btn_block > span{
        display: block;
        font-size: 12px; font-weight: bold; color: blueviolet;
        text-transform: uppercase; cursor: pointer;
        transition: all 0.4s;
    }
    .add_btn_block > span:hover{
        color: #006699;
    }
</style>