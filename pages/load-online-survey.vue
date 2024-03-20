<template>
    <div class="online_survey_view_block">        
        
        <div class="polling_header">
            <i class="fa fa-chart-pie"></i> অনলাইন জরিপ
        </div>
        
        <div class="content_block m-4">
            <div v-if="content_loader" class="row">
                <div class="col-md-6">
                    <div class="form_block">
                        <FormBlockLoader :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="15" :r2_h="45" />

                        <br />
                        <template v-for="(n,i) in 4">
                            <FormBlockLoader :key="i" :cols="1" :height="25" :r1="true" :r2="false" :r1_w="50" :r2_w="0" :r1_h="15" :r2_h="0" />
                        </template>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form_block">
                        <FormBlockLoader :cols="1" :height="200" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="180" :r2_h="0" />
                    </div>
                </div>
            </div>
            <div v-else>
                <!-- {{ content }} -->
                <template v-if="!content">
                    <div class="empty_content mb-3" align="center">
                        <i class="fa fa-box-open fa-4x"></i>
                    </div>
                    <h6 align="center">এই ডোমেনটির জন্য কোনও জরিপ পাওয়া যায়নি</h6>
                </template>
                <template v-else>
                    <h6 class="survey_title">
                        <!-- <i class="far fa-question-circle"></i> -->
                        <span>{{ content.survey_title }}</span>
                    </h6>
                    <div class="description" v-html="content.description"></div>
                    <div v-if="content.type" class="mt-2">
                        <small>জরিপে অংশগ্রহনের শেষ সময় : {{ content.end_time | luxon:format('dd MMMM, yyyy - hh:mm a') }}</small>
                    </div>
                    <div class="embed_form mt-3" v-html="load_embed_code(content.embed_code)"></div>
                </template>

                <div v-if="pagination_show" class="row">
                    <!-- <div class="col-md-12 mb-3" align="center">
                        <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
                    </div> -->
                    <div class="col-md-12 mt-4">
                        <Pagination :config="pagination_config" />
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'OnlineSurveyViewBlock',    
    data(){
        return {
            content_loader: true,
            submit_loader: false,
            alert_box_allow: false,
            already_voted: false,
            req_explain: false,
            req_exp_option_title: '',
            survey_cache_str: 'mygov-survey-',
            content: [],
            pagination_show: false,
            pagination_config: {
                data: [],
                lang: 'bn',
                align: 'center',
                action: ''
            },
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            formData: {
                survey_id: '',                
                comments: ''
            }
        }
    },
    watch: {
        $route(to, from){
            this.load_data(to.query.page?to.query.page:1);
        }
    },
    mounted(){
        this.load_data();
    },
    methods:{
        ...mapActions({
            loadSurveyData: 'online_survey_info/LOAD_DATA'
        }),
        load_embed_code: function(html){            
            var parser = new DOMParser();

            var parsedIframe = parser.parseFromString(html, "text/html");
            let iFrame = parsedIframe.getElementsByTagName("iframe");
            let getSrc = iFrame[0].src

            return '<object data="' + getSrc + '" type="text/html"  style="width:100%;height:100vh;"></object>';
        },
        async load_data(pg=this.cur_page){
            let data = {
                req_from: this.$route.query.req_from,
                page: pg
            }
            this.content_loader = true
            this.pagination_show = false
            await this.loadSurveyData(data);            
            this.content = this.$store.state.online_survey_info.load_data
            console.log('Content', this.content)            

            if(this.content){
                if(Object.keys(this.$store.state.online_survey_info.load_paginate_data).length>0){                
                    this.pagination_config.data = this.$store.state.online_survey_info.load_paginate_data
                    if(this.pagination_config.data.total>1) this.pagination_show = true
                    this.cur_page = pg
                }                

                this.formData.survey_id = this.content.id                
            }
            this.content_loader = false
        },
        async submit_survey(){
            if(this.req_explain && this.formData.comments.trim()==''){
                this.$toast.error('মন্তব্য লিখুন', {icon: "সতর্কতা"});
                return false;
            }

            this.alert_box_allow = true
        },
        form_reset(){
            this.req_explain = false
            this.req_exp_option_title = ''
            this.formData.poll_option_id = ''
            this.formData.comments = ''
        }
    }
}
</script>
<style scoped>
    .online_survey_view_block{
        font-family:"Hind Siliguri Light";
        color: #333
    }
    .alert_box_block{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0; top: 0;
        background: #00000080;
        z-index: 999
    }
    .alert_box_block > .content_box{
        position: relative;
        background: #fff;
        border-radius: 5px;
        padding: 15px 25px;
        left: 25%;
        top: 35%;
        width: 50%;
        box-shadow: 0 0 5px #000;
    }
    .alert_box_block > .content_box > .msg{
        padding: 10px; font-size: 16px
    }
    .alert_box_block > .content_box > .action_btn_block{
        text-align: right;
        margin-top: 15px;
    }
    .alert_box_block > .content_box > .action_btn_block > span{
        display: inline-block; margin: 0 5px;
        padding: 5px 15px;
        background-color: #363;
        color: #fff; border-radius: 25px;
        cursor: pointer;
        transition: all 0.4s
    }
    .alert_box_block > .content_box > .action_btn_block > span:hover{
        background-color: rgb(0, 150, 0);
    }
    .alert_box_block > .content_box > .action_btn_block > span > i{
        margin-right: 5px;
    }
    .alert_box_block > .content_box > .action_btn_block > span:last-child{
        background-color: #CD0000;
    }
    .alert_box_block > .content_box > .action_btn_block > span:last-child:hover{
        background-color: #b32e2e
    }
    .polling_header{
        position: fixed;
        left: 0; top: 0;
        width: 100%; background-color: purple;
        height: 60px; line-height: 60px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        font-size: 22px;
        color: #fff;
        z-index: 999;
    }
    .polling_header > i{
        color: rgb(185, 102, 185)
    }
    .content_block{
        display: block;
        margin-top: 80px !important
    }
    .empty_content{
        display: block;        
    }
    .empty_content > i{
        color: #ddd;
        font-size: 10em;
    }  
    .survey_title{
        display: block;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }
    .description{
        font-family: SolaimanLipi;
    }  
    ul{
        list-style: none;
        font-family: SolaimanLipi;
        padding: 0;
        margin-top: 15px;
        margin-left: 0;
    }
    ul li{
        display: flex;
        margin: 10px 0;
        cursor: pointer;
        transition: all 0.4s;
    }
    ul li > i{
        align-self: center;
        color: #ccc;
        font-size: 18px;
        margin-right: 5px;
    }
    ul li > span{
        align-self: center;
    }
    ul li .img{        
        display: inline-block;
        margin-right: 5px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid #ddd;
        background-color: #ddd;
        overflow: hidden;
    }
    ul li .img > img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    ul li:hover,
    ul li.active,
    ul li:hover > i,
    ul li.active > i{
        color: purple;        
    }
    .comments_block{
        display: block;
        width: 100%;
    }
    .comments_block > textarea{
        width: 100%;
        border: 1px solid #ddd;
        padding: 10px; border-radius: 3px;
        font-size: 12px;
    }
    .embed_form >>> object{
        background-color: #eee;        
        padding: 10px 0; border: 1px solid #ddd;
    }
    .action_btn{
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        outline: 0px;
        background-color: #b100f7;
        color: #fff;
        border: none;
        padding: 5px 15px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.4s;
    }
    .action_btn i{
        margin-right: 5px;
    }
    .action_btn:hover{
        background-color: #7a0099;
    }
    .notify_msg{
        display: block;
        padding: 5px 15px;
        background-color: #f7f7ff;
        border: 1px solid #ddd;
        border-radius: 5px;
        color: #CD0000;
    }    
    .online_survey_view_block >>> .pagination_block{
        font-family: 'SolaimanLipi' !important;
    }
</style>