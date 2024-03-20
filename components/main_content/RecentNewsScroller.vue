<template>
    <div id="recent_news_block">
        <div class="container">
            <div class="scroller clearfix">
                <label class="caption float-left">সর্বশেষ :</label>
                <div class="list float-left">
                    <div v-if="pre_loader">
                        <div class="pre_loader">
                            <ul class="clearfix">
                                <li>
                                    <FormBlockLoader :cols="1" :height="6" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="5" :r2_h="0" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- <marquee v-else behavior="scroll" scrollamount="3" scrolldelay="30" direction="left" onmouseover="stop();" onmouseout="start();"> -->
                    <marquee-text :duration="30" :paused="paused">
                        <ul class="clearfix" @mouseover="paused=true" @mouseout="paused=false">
                            <li v-for="(news,index) in $store.state.news_info.public_data" :key="index">
                                <a :href="news.link" target="_blank"><i class="far fa-circle"></i> {{ news.title }}</a>
                            </li>
                            <!-- <li><a href="https://corona.gov.bd" target="_blank"><i class="far fa-circle"></i> করোনা সম্পর্কিত সর্বশেষ তথ্য</a></li> -->
                        </ul>
                    </marquee-text>
                    <!-- </marquee> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'RecentNewsScroller',
    data(){
        return {
            pre_loader: false,
            paused: false,
            limit: 10
        }
    },
    mounted(){
        if(this.$store.state.news_info.public_data.length==0) this.load_content();
    },
    methods: {
        ...mapActions({
            newsContentList: 'news_info/LOAD_DATA'
        }),
        async load_content(){
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));

            this.pre_loader = true

            // setup request data
            let request_data = {                
                access_token: getTokenType.access_token,
                limit: this.limit                
            }

            await this.newsContentList(request_data);

            this.pre_loader = false
        }
    }
}
</script>
<style scoped>
    #recent_news_block{
        padding: 15px 0 0 0;
        border-bottom: 1px solid #ddd;
    }
    .scroller{
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }
    .caption{
        margin: 0;
        width: 70px;
        font-family: "Hind Siliguri Light";
        font-size: 18px;
        font-weight: bold;
        color: #CD0000
    }
    .list{
        width: calc(100% - 70px);
        overflow: hidden;
    }
    .list ul{ 
        list-style: none; margin: 0; padding: 0;
    }
    .list ul >>> li{
        float: left; margin: 0 10px;
        padding-top: 1px;
        font-size: 16px;
        color: purple;
    }
    .pre_loader ul >>> li{
        width: calc(100% - 70px); margin: 0;
    }
    .list ul >>> li a{
        color: purple;
    }
    .list ul li >>> i{
        position: relative;
        color: #999; font-size: 10px; margin-right: 5px;
        top: -1px;
    }
</style>