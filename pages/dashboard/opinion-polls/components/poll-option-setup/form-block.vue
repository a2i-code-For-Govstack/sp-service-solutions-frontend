<template>
    <div class="poll_option_form_block">
        <div class="mb-4">            
            <label>Option title</label>
            <div class="text_editor_block">
                <div><input type="text" placeholder="Enter option title" class="form-control" v-model="$parent.option_arr[cur_index].option_title" ref="option_title" /></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-4">                
                <label>Choose Image (optional)</label>
                <div v-if="$parent.option_arr[cur_index].option_photo_info" class="photo_block">            
                    <div class="img">
                        <img :src="$parent.option_arr[cur_index].option_photo_info.content" />
                        <span class="close_btn" @click="$parent.del_photo_entry(cur_index)">x</span>
                    </div>
                </div>
                <div v-else class="photo_add_item">
                    <div @click="$parent.add_photo_entry">
                        <i class="fa fa-plus-circle"></i>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <label>Explaination Required</label>
                <div class="exp_switch_block">
                    <SwithcBtn :status="$parent.option_arr[cur_index].req_explain" :index="'req_explain'" />
                    <input type="hidden" v-model="$parent.option_arr[cur_index].req_explain" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SwithcBtn from '@/components/action_buttons/SwitchBtn'
export default {
    name: 'ProductInfoFormBlock',
    props: ['data','cur_index'],
    components: {
        SwithcBtn
    },
    methods: {
        switch_data(index,status){
            this.$parent.option_arr[this.cur_index][index] = status
        }
    }
}
</script>
<style scoped>
    .poll_option_form_block{
        display: block;
        padding: 15px; background-color: #f7f7f7;
        border-bottom: 1px solid #ddd;
        transition: all 0.4s;
    }
    .photo_block{
        display: block;
    }        
    .photo_block .img{
        position: relative;
        background-color: #f7f7f7;
        width: 100px; height: 100px;
        border: 1px solid #ddd
    }
    .photo_block .img > img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .photo_block .img > .close_btn{
        position: absolute;
        width: 20px; height: 20px; line-height: 18px;
        right: 5px; top: -5px; text-align: center;
        font-size: 12px;
        border: 1px solid #ddd;
        border-radius: 50%;
        background-color: #fff;
        color: #8800cd;
        cursor: pointer;
        transition: all 0.4s;
    }
    .photo_block .img > .close_btn:hover{        
        color: #CD0000;
    }
    .photo_add_item > div{
        display: inline-block;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        background-color: #f7f7f7;
        font-size: 26px;
        color: #ccc;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .exp_switch_block{
        display: block;
        /* background-color: #fff;
        padding: 15px */
    }
</style>