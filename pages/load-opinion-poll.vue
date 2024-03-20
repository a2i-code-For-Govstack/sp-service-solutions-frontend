<template>
    <div class="opinion_poll_view_block">

        <div v-if="alert_box_allow" class="alert_box_block">
            <div class="content_box">
                <div class="msg">আপনি এটি জমা দেওয়ার বিষয়ে নিশ্চিত?</div>
                <div class="action_btn_block">
                    <span @click="submit_form"><i class="fa fa-check"></i> হ্যাঁ</span>
                    <span @click="alert_box_allow=false"><i class="fa fa-times"></i> না</span>
                </div>
            </div>
        </div>
        
        <div class="polling_header">
            <i class="fa fa-chart-pie"></i> অনলাইন পোলিং
        </div>
        
        <div :class="['content_block',{action_block:formData.poll_option_id}]">
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
                    <h6 align="center">এই মুহূর্তে কোনো পোল চলমান নেই</h6>
                </template>
                <template v-else>
                    <h6 class="poll_title">
                        <!-- <i class="far fa-question-circle"></i> -->
                        <span>{{ content.poll_title }}</span>
                    </h6>
                    <!-- <SocialShareBtn :data="content" /> -->
                    <div class="description" v-html="content.description"></div>
                    <div class="row">
                        <div class="col-md-6">                            
                            <ul>
                                <li v-for="(item,index) in content.poll_options" :key="index" @click="option_select(item)" :class="{active:formData.poll_option_id==item.id}">
                                    <i v-if="formData.poll_option_id==item.id" class="far fa-check-circle"></i>
                                    <i v-else class="far fa-circle"></i>
                                    <span v-if="item.option_photo_info" class="img">
                                        <img :src="item.option_photo_info.content" :title="item.option_photo_info.content_title" />
                                    </span>
                                    <span>{{ item.option_title }}</span>
                                </li>
                            </ul>
                            <template v-if="req_explain">
                                <label>কেন নির্বাচন করবেন তা ব্যাখ্যা করুন "{{ req_exp_option_title }}"?</label>
                                <div class="comments_block">
                                    <textarea-autosize
                                        :placeholder="'আপনার মন্তব্য লিখুন'"                    
                                        v-model="formData.comments"
                                        :min-height="44"
                                        :max-height="450"
                                        @keyup.enter="submit_poll"
                                        ref="comments"
                                    />
                                </div>
                            </template>
                        </div>
                        <div class="col-md-6">
                            <!-- <GChart
                                type="PieChart"
                                :data="chartData"
                                :options="chartOptions"
                            /> -->
                            <!-- <template v-if="content && content.poll_options && content.total_votes > 0">
                                <PieChart :chartOptions="canvasChartOptions" ref="pie_chart" />
                            </template> -->
                        </div>
                    </div>
                    <div v-if="content.type" class="mt-4">
                        <!-- <small>ভোটের শেষ সময় : {{ content.end_time | luxon:format('dd MMMM, yyyy - hh:mm a') }}</small> -->
                        <small>ভোটের শেষ সময় : {{ $enToBnDateTime((get_date_format(content.end_time))) }}</small>                        
                    </div>

                    <!-- <hr v-if="formData.poll_option_id" class="mt-4" /> -->
                    <div v-if="formData.poll_option_id" class="polling_footer">
                        <div class="row">
                            <template v-if="already_voted">
                                <div class="col-md-12">
                                    <div class="notify_msg" align="center"><i class="fa fa-info-circle"></i> দুঃখিত, আপনি ইতিমধ্যে ভোট দিয়েছেন ।</div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="col-md-12" align="right">
                                    <div v-if="submit_loader">
                                        <i class="fa fa-cog fa-spin"></i> জমা দেওয়া হচ্ছে ... অপেক্ষা করুন
                                    </div>
                                    <div v-else class="action_btn" @click="submit_poll">
                                        <i class="fa fa-check-circle"></i> জমা দিন
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
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
function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
}

import { mapState, mapActions } from 'vuex'
import { DateTime } from 'luxon'
import PieChart from '@/components/chart/pie'
import SocialShareBtn from '@/components/SocialShareBtn'
export default {
    name: 'OpinionPollViewBlock',
    components: {
        PieChart,
        SocialShareBtn
    },
    data(){
        return {
            content_loader: true,
            submit_loader: false,
            alert_box_allow: false,
            already_voted: false,
            req_explain: false,
            req_exp_option_title: '',
            poll_cache_str: 'np-poll-',
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
                poll_id: '',
                poll_option_id: '',
                comments: ''
            },
            getOptionIndex: {},
            chartData: [],
            chartOptions: {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit',                    
                },
                // is3D: true,
                // pieHole: 0.4,
                slices: {},
                legend: {
                    position: 'top',
                    textStyle: {
                        color: '#006699',
                        fontSize: 12
                    }
                }
            },
            canvasChartOptions: {
                theme: "light1",
                animationEnabled: true,
                // title:{
                //     text: "Chart of polling result"
                // },
                legend:{
                    cursor: "pointer",
                    // fontFamily: "SolaimanLipi",
                    fontFamily: "Hind Siliguri Light",
                    // fontSize: 14,
                    itemclick: explodePie
                },
                // subtitles: [{
                //     text: "Performance",
                //     fontStyle: "bold",
                //     verticalAlign: "center",
                //     dockInsidePlotArea: true
                // },{
                //     text: "Legend (On Hover)",
                //     fontStyle: "bold",
                //     verticalAlign: "top",
                //     horizontalAlign: "right",
                //     dockInsidePlotArea: true
                // }],
                toolTip:{
                    enabled: true,
                },
                data: [{
                    type: "doughnut",
                    innerRadius: '20',
                    showInLegend: false,
                    // toolTipContent: "{name}: <strong>{avg}%</strong>",
                    indexLabel: "{name} - {avg}%",
                    // indexLabelFontFamily: "SolaimanLipi",
                    indexLabelFontFamily: "Hind Siliguri Light",
                    // mousemove: function(e){
                    //     // Update the subtitle
                    //     e.chart.subtitles[0].set("text", e.dataPoint.label + " (" + e.dataPoint.y + "%)");
                    //     e.chart.subtitles[0].set("fontColor", e.dataPoint.color);

                    //     // Update the legend
                    //     e.chart.subtitles[1].set("text", e.dataPoint.legendLabel);
                    //     e.chart.subtitles[1].set("fontColor", e.dataPoint.color);
                    // },                    
                    dataPoints: [/*{
                        "y": 90,
                        "label": "In Range",
                        "color": "#218340",
                        // "legendLabel": "(Temp ≤ + 1°F)"
                    },{
                        "y": 7,
                        "label": "In Tolerance",
                        "color": "#F7B731",
                        "legendLabel": "(+ 1°F < Temp <= 2°F)"
                    },{
                        "y": 3,
                        "label": "Above Setpoint",
                        "color": "#A62337",
                        "legendLabel": "(Temp > + 2°F)"
                    }*/]
                }]
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
            loadOpinionData: 'opinion_polls_info/LOAD_DATA'
        }),
        get_date_format: function(dateStr){
            return DateTime.fromISO(dateStr).toFormat('dd MMMM, yyyy - hh:mm a')
        },
        option_select: function(data){
            // console.log(data)
            this.formData.poll_id = data.poll_id
            this.formData.poll_option_id = data.id
            if(data.req_explain){
                this.req_explain = true
                this.req_exp_option_title = data.option_title
            }else{
                this.req_explain = false
                this.req_exp_option_title = ''
            }            
        },
        chartOptionsDataSetup: function(poll_options){
            var i = 0, max_index = -1, max_val = -1;
            this.chartData[i++] = ['option','votes'];
            this.canvasChartOptions.data[0].dataPoints = []
            poll_options.forEach(v => {                        
                let get_vote = v.option_result?parseFloat(v.option_result.votes):0;
                if(get_vote>max_val){
                    max_index = i; max_val = get_vote;
                }
                this.getOptionIndex[v.id] = i
                this.chartData[i++] = [v.option_title,get_vote];

                let getAvgValue = ((get_vote * 100) / this.content.total_votes).toFixed(2);

                let obj = {
                    "y": getAvgValue,
                    "avg": this.$enToBnNumber(getAvgValue),
                    "value": get_vote,
                    "label": v.option_title,
                    "name": v.option_title,
                    // "color": "#F7B731",
                    // "legendLabel": "(+ 1°F < Temp <= 2°F)"
                }
                this.canvasChartOptions.data[0].dataPoints.push(obj);
            });

            this.chartOptions.slices[max_index - 1] = {offset: 0.2}
            this.canvasChartOptions.data[0].dataPoints[max_index - 1].exploded = true;
            // console.log('ChartData', this.chartData)
            // console.log('ChartOptions',this.chartOptions)
        },
        async load_data(pg=this.cur_page){
            let data = {
                req_from: this.$route.query.req_from,
                page: pg
            }
            this.content_loader = true
            this.pagination_show = false
            await this.loadOpinionData(data);            
            this.content = this.$store.state.opinion_polls_info.load_data
            console.log('Content', this.content)            

            if(this.content){
                if(Object.keys(this.$store.state.opinion_polls_info.load_paginate_data).length>0){                
                    this.pagination_config.data = this.$store.state.opinion_polls_info.load_paginate_data
                    if(this.pagination_config.data.total>1) this.pagination_show = true
                    this.cur_page = pg
                }

                if(localStorage.getItem(this.poll_cache_str + this.content.id)) this.already_voted = true

                if(this.content.poll_options && this.content.total_votes > 0){

                    let poll_options = this.content.poll_options;
                    console.log('Options', poll_options)
                    
                    /**
                     * POLL OPTIONS
                     */                
                    if(poll_options.length>0){
                        this.chartOptionsDataSetup(poll_options)
                    }

                    this.formData.poll_id = this.content.id
                }
            }
            this.content_loader = false
        },
        async submit_poll(){
            if(this.req_explain && this.formData.comments.trim()==''){
                this.$toast.error('মন্তব্য লিখুন', {icon: "সতর্কতা"});
                return false;
            }

            this.alert_box_allow = true
        },
        async submit_form(){
            let url = '/api/submit-online-poll';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            this.submit_loader = true
            this.alert_box_allow = false

            this.formData.req_from = this.$route.query.req_from;
            // console.log(this.formData)
            
            this.$axios.post(url, this.formData , {
                headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getTokenType.access_token
                }
            }).then( async response => {
                console.log(response)
                let get_sel_option_index = this.getOptionIndex[this.formData.poll_option_id]
                if(this.content.poll_options[get_sel_option_index - 1].option_result) this.content.poll_options[get_sel_option_index - 1].option_result.votes++
                else{
                    let obj = {
                        poll_id: this.formData.poll_id,
                        poll_option_id: this.formData.poll_option_id,
                        votes: 1
                    }
                    this.content.poll_options[get_sel_option_index - 1].option_result = obj
                }
                this.content.total_votes++

                let poll_options = this.content.poll_options
                this.chartOptionsDataSetup(poll_options)
                
                this.$refs.pie_chart.load_data()

                await this.$swal("ধন্যবাদ", "আপনার মতামত সফলভাবে জমা দেওয়া হয়েছে ।", "success");

                localStorage.setItem(this.poll_cache_str + this.formData.poll_id, true);

                this.already_voted = true
                
                this.form_reset();
                this.submit_loader = false
            }).catch(e => {
                console.log(e)
                // this.$toast.error('Submit failed!!!', {icon: "error_outline"})
                this.submit_loader = false
            });
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
    .opinion_poll_view_block{
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
        position: fixed;
        left: 0;
        top: 60px;
        width: 100%;
        background-color: #fff;
        height: calc(100% - 60px);
        padding: 15px;
        overflow-y: auto;
    }
    .content_block.action_block{
        height: calc(100% - 115px);
    }
    .content_block > div{
        overflow: hidden
    }
    .empty_content{
        display: block;        
    }
    .empty_content > i{
        color: #ddd;
        font-size: 10em;
    }  
    .poll_title{
        display: block;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }
    .description{
        /* font-family: SolaimanLipi; */
    }  
    ul{
        list-style: none;
        /* font-family: SolaimanLipi; */
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
    .polling_footer{
        position: fixed;
        bottom: 0px;
        left: 0;
        padding: 10px 15px;
        width: 100%;
        border-top: 1px solid #ddd;
        background-color: #fff;
        box-shadow: 0 0 10px #ccc;
    }
    .action_btn{
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        outline: 0px;
        background-color: #800080;
        color: #fff;
        border: none;
        padding: 3px 15px;
        font-size: 12px;
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
    .opinion_poll_view_block >>> .pagination_block{
        /* font-family: 'SolaimanLipi' !important; */
    }

    @media (max-width: 480px){
        .alert_box_block > .content_box{            
            left: 10%;
            width: 80%;
        }
    }
</style>