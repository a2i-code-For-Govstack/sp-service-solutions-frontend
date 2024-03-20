<template>
    <div class="opinion_poll_view_block">        
        
        <div class="polling_header">
            <i class="fa fa-chart-pie"></i> অনলাইন পোলিং হিস্ট্রি
        </div>
        
        <div class="content_block m-4">
            <div class="content_list_view table-responsive">
                <div class="filter_option_block">
                    <span>ফিল্টার</span>
                    <ul>
                        <li @click="sel_polling_type=''">
                            <i v-if="sel_polling_type==''" class="far fa-check-circle"></i>
                            <i v-else class="far fa-circle"></i>
                            <span>সব</span>
                        </li>
                        <li @click="sel_polling_type=1">
                            <i v-if="sel_polling_type==1" class="far fa-check-circle"></i>
                            <i v-else class="far fa-circle"></i>
                            <span>চলমান</span>
                        </li>
                        <li @click="sel_polling_type=2">
                            <i v-if="sel_polling_type==2" class="far fa-check-circle"></i>
                            <i v-else class="far fa-circle"></i>
                            <span>সমাপ্ত</span>
                        </li>
                    </ul>
                </div>
                <TableContentLoader v-if="content_loader" :cols="5" />
                <table v-else class="table table-striped">
                    <thead>
                        <tr>
                            <th style="text-align:center" width="50">ক্রমিক</th>
                            <th>শিরোনাম</th>
                            <th>বিবরণ</th>
                            <th>অপশনস</th>
                            <th nowrap>মোট ভোট</th>
                            <th width="20%">আরও তথ্য</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="contents.length>0">
                            <tr v-for="(item,index) in contents" :key="index">
                                <td align="center">{{ $enToBnNumber(index+1) }}</td>
                                <td width="20%">{{ item.poll_title }}</td>
                                <td width="25%">
                                    <!-- <div v-html="item.description"></div> -->
                                    <template v-if="item.description">
                                        <read-more more-str="Read more" :text="item.description" less-str="Read less" :max-chars="250"></read-more>
                                    </template>
                                </td>
                                <td width="35%">
                                    <div class="option_block" v-for="(option_item,option_index) in item.poll_options" :key="'opt-'+option_index">
                                        <div class="img">
                                            <img v-if="option_item.option_photo_info && option_item.option_photo_info.content" :src="option_item.option_photo_info.content" />
                                            <i v-else class="fa fa-image"></i>
                                        </div>
                                        <div class="option_title">
                                            <div>
                                                <span>{{ option_item.option_title }}</span>
                                                <small v-if="item.total_votes>0 && option_item.option_result">({{ $enToBnNumber(((option_item.option_result.votes*100)/item.total_votes).toFixed(2)) }}%)</small> 
                                            </div>
                                            <div v-if="item.total_votes>0 && option_item.option_result" class="votes">
                                                <span class="progress" :style="{width: (((option_item.option_result.votes*100)/item.total_votes)).toFixed(2) + '%'}"></span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td align="center">{{ $enToBnNumber(item.total_votes) }}</td>
                                <td>
                                    <!-- <div>Category: <span v-if="item.cat_info">{{ item.cat_info.category_name }}</span><span v-else><em>[Not Provided]</em></span></div> -->
                                    <div class="domain_list_block">ডোমেইন: <template v-if="item.domain_info.length>0">
                                        <span v-for="(dv,di) in item.domain_info" :key="'domain-' + di">{{ dv.sub_domain }}</span>
                                    </template><span v-else><em>[সরবরাহ করা হয়নি]</em></span></div>
                                    <!-- <div>প্রকার: <span v-if="item.type">নির্ধারিত</span><span v-else>খোলা</span></div> -->
                                    <div v-if="item.type">
                                        <div>শুরু: {{ item.start_time | luxon:format('dd MMMM, yyyy - hh:mm a') }}</div>
                                        <div>শেষ: {{ item.end_time | luxon:format('dd MMMM, yyyy - hh:mm a') }}</div>
                                    </div>                                    
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr><td colspan="7" align="center"><i class="fa fa-info-circle"></i> There is no data</td></tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div v-if="pagination_show" class="row mt-3">
                <!-- <div class="col-md-12 mb-3" align="center">
                    <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
                </div> -->
                <div class="col-md-12">
                    <Pagination :config="pagination_config" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OpinionPollViewBlock',    
    data(){
        return {
            content_loader: true,
            pagination_show: false,
            contents: [],            
            pagination_config: {
                data: [],
                lang: 'bn',
                align: 'center',
                action: ''
            },
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            limit: 10,
            sel_polling_type: ''
        }
    },
    watch: {
        $route(to, from){
            this.load_data(to.query.page?to.query.page:1);
        },
        sel_polling_type: function(){
            this.load_data();
        }
    },
    computed:{
        header_config (){
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            let obj = {
                headers: {
                    'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getTokenType.access_token
                }
            };
            return obj;
        }
    },
    mounted(){
        this.load_data();
    },
    methods:{
        async load_data(pg=this.cur_page){
            let url = '/api/load-opinion-polls-history'+ (this.limit>0?'?limit=' + this.limit:'') + (pg>1?'&page=' + pg:'') + '&req_from=' + this.$route.query.req_from;

            this.content_loader = true
            this.pagination_show = false
            this.contents = [];
            this.$axios.post(url, {
                req_status: this.sel_polling_type
            },this.header_config).then( (response) => {
                console.log(response)
                if(response.data.data.length>0){
                    this.contents = response.data.data
                    this.pagination_config.data = response.data.meta                    
                    this.pagination_show = true
                }
                this.content_loader = false                
                this.cur_page = pg
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.content_loader = false
            });
        }
    }
}
</script>
<style scoped>
    .opinion_poll_view_block{
        font-family:"Hind Siliguri Light";
        color: #333
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
    .filter_option_block{
        display: flex;
        height: 40px;
        border: 1px solid #ddd;
        background-color: #eee;
        margin-bottom: 15px;
        padding: 0 15px;
        border-radius: 3px;
    }
    .filter_option_block > span,
    .filter_option_block > ul{
        align-self: center;
    }
    .filter_option_block > span{
        padding-right: 15px; color: #444; font-size: 14px; border-right: 1px solid #ccc;
    }
    .filter_option_block > ul{
        display: flex;        
        list-style: none;
        margin: 0; padding: 0;
        margin-left: auto;
        height: 30px
    }
    .filter_option_block > ul > li{
        /* display: flex; */
        align-self: center;
        /* height: 100%; */
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        margin-left: 10px
    }
    .filter_option_block > ul > li > i,
    .filter_option_block > ul > li > span{
        align-self: center;
    }
    .filter_option_block > ul > li > i{
        position: relative; font-size: 18px; top: 2px; color: #999
    }
    .content_list_view > table{
        border: 1px solid #ddd
    }
    .option_block{
        display: flex;
        margin-bottom: 10px;
        width: 100%;
    }
    .option_block > div{
        align-self: center;        
    }
    .option_block:last-child{
        margin-bottom: 0;
    }
    .option_block > div.img{
        display: inline-block;
        width: 36px;
        height: 36px;
        line-height: 34px;
        background-color: #fff;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #ddd;
        margin-right: 8px;
        overflow: hidden;
    }
    .option_block > div.img > img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    .option_block > div.img > i{
        color: #bbb;
    }
    .option_title > div{
        display: flex;
    }
    .option_title > div > span,
    .option_title > div > small{
        align-self: center;
    }
    .option_title > div > small{
        margin-left: 5px;
    }
    .option_title > div > .explain_btn{
        cursor: pointer;
        margin-left: auto;
        color: #999;
        transition: all 0.4s;
    }
    .option_title > div > .explain_btn:hover{
        color: purple;
    }
    .option_title > .votes{
        display: inline-block; position: relative;
        width: 150px; height: 10px;
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 25px;
        overflow: hidden;
    }
    .option_title > .votes > .progress{
        position: absolute; left: 0; top: 0;
        background-image: linear-gradient(to right, purple, darkorange);
        height: 100%;
    }
    .domain_list_block >>> span{
        display: inline-block;
        padding: 1px 10px; font-size: 12px; background-color: #ddd;
        margin: 0 5px 5px 0; border: 1px solid #ccc; border-radius: 25px;
    }
    .status > i{
        font-size: 18px;
        color: #ccc
    }
    .status > i.active{
        color: #5dad5d
    }
    .action_block > span{
        display: inline-block;
        margin: 0 5px;
    }
</style>