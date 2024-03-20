<template>
    <div id="rating_form" class="eng_font">
        <div class="form_block">
            <div class="row">            
                <div class="col-md-12">
                    <div class="form-input">
                        <select name="" class="form-control" id="" v-model="selected" v-on:change="toggle">
                            <option value="" disabled><small>Select predefine review</small></option>
                            <option v-for="(item, index) in items" :value="item.id" :key="index">{{ item.message }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!success_msg" class="form_footer">
            <div class="row">
                <div class="col-md-12 clearfix">
                    <div class="submit_btn float-right" @click="form_submit"><i class="fa fa-check-circle"></i> Submit Review</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            formData: {
                comment_id: this.$parent.reply_comment_id,
                comment: this.selected,
            },
            submit_msg: '',
            success_msg: false,
            items: [
                { message: 'Irrelevant', id: 1},
                { message: 'Important', id: 2}
            ],
            selected: '', 
        }
    },
    
    methods: {
       toggle(){
            this.formData.comment = this.selected;
        },
        async form_submit(){
            var url = '/api/comments/review';
            this.submit_msg = '';

            this.$axios.post(url, this.formData,this.$parent.$parent.header_config).then((response) => {

                this.success_msg                = true;
                this.$parent.alert_box_block    = false;
                this.$parent.rating_popup_form  = false;
                this.$parent.$parent.load_data();
            }).catch(e => {
                console.log(e);
                this.$toast.error('Select a review', {icon: "error_outline"});
                this.submit_msg = '';
            });
        },
        close_popup(){
            this.$parent.rating_popup_form = false;
        }
    }
}
</script>
<style scoped>
    #rating_form{
        .form_block{
            padding: 0 20px 20px 20px;
            input{
                font-size: 12px;
                background-color: #3d46a7;
                border: 1px solid #3d46a7;
                color: #fff;
                padding: 5px 10px;
                height: auto;        
            }
        }
    }
    
    .form_footer{
        /* border-top: 1px solid #dddddd; */
        padding: 10px 20px;
        :deep(.msg){
            font-size: 12px;
            line-height: 36px;
            .succ{
                color: #c4ffe3
            }
            .err{
                color: #ffdbdb
            }
        }
    }
    .submit_btn{
        line-height: 30px;
        display: block;
        padding: 0 15px;
        color: #eee;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        background-color: #f05a24;
        border-radius: 25px;
        /* border-left: 1px solid #fbcd41; */
        cursor: pointer;
        transition: all 0.4s;
        &:hover{
            color: #fff;
            background-color: #CD0000;
        }
        & > i{
            color: #eee; margin-right: 5px;
            transition: all 0.4s
        }
        &:hover > i{
            color: #fff
        }
    }
    ::-webkit-input-placeholder { /* Edge */
        color: #bbbbbb;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #bbbbbb;
    }

    ::placeholder {
        color: #bbbbbb;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>