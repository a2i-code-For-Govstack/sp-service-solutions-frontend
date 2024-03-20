<template>
    <div id="video_content_block" class="mt-3">
        <div class="tab_list">
            <span :class="[{'active':sel_tab_item==1}]" @click="sel_tab_content(1)"><i class="fa fa-tv"></i> লাইভ ক্লাস</span>
            <span :class="['ml-2 ml-md-4',{'active':sel_tab_item==2}]" @click="sel_tab_content(2)"><i class="fa fa-video"></i> ধারণকৃত ক্লাস</span>
            <span :class="['ml-2 ml-md-4',{'active':sel_tab_item==3}]" @click="sel_tab_content(3)"><i class="fa fa-align-left"></i> অন্যান্য ভিডিও</span>
        </div>
        <div class="content_list mt-3">
            <div v-if="pre_loader">
                <div class="pre_loader">
                    <div class="row">
                        <div class="col-md-2" v-for="(n,i) in 6" :key="'list-' + i">
                            <FormBlockLoader :cols="1" :height="300" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="300" :r2_h="0" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div class="col-md-2" v-for="(item,index) in items" :key="index">
                    <VideoCardView :item="item" />
                </div>
            </div>
        </div><!--end .content_list-->

        <div class="more_btn_block">
            <nuxt-link :to="{ path: '/all-video-contents/' + sel_tab_item }"><i class="fa fa-link"></i> {{ more_btn_caption[sel_tab_item] }} <i class="fa fa-angle-right"></i></nuxt-link>
        </div>
    </div>
</template>
<script>
import VideoCardView from '~/components/content_display/VideoCardView'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'VideoContentBlock',
    components: {
        VideoCardView
    },
    data(){
        return {
            pre_loader: false,
            items: [],
            sel_tab_item: 1,
            more_btn_caption: {
                1: 'সব লাইভ ক্লাস',
                2: 'সকল ধারণকৃত ক্লাস',
                3: 'আরো অন্যান্য ভিডিও'
            },
            limit: 6
        }
    },
    mounted(){
        this.load_content();
    },
    methods: {
        ...mapActions({
            videoContentList: 'video_content_info/GET_DATA'
        }),
        sel_tab_content: function(val){
            if(this.sel_tab_item!==val){
                this.sel_tab_item = val;
                this.load_content();
            }
        },
        async load_content(){
            var url = '/api/load-video-content/' + this.sel_tab_item + '/' + this.limit + '?for_student=1';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));

            this.pre_loader = true

            this.$axios.get(url,{
                headers: {
                    'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log('Get Video data',response.data)
                if(response.data.data.length>0){
                    this.items = response.data.data;
                    this.pre_loader = false;
                }else if(this.sel_tab_item<3){
                    this.sel_tab_item++;
                    this.pre_loader = false;
                    this.load_content();
                } else this.pre_loader = false;
            });
        }
    }
}
</script>
<style scoped>
    #video_content_block{
        padding: 0;
    }
    .tab_list{
        font-size: 20px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        border-bottom: 3px solid #ddd;
    }
    .tab_list > span{
        display: inline-block;
        padding-bottom: 10px;
        cursor: pointer;
        position: all 0.4s;
    }
    .tab_list > span:hover,
    .tab_list > span.active{
        color: purple;
        border-bottom: 3px solid purple;
        margin-bottom: -3px;
    }
    .tab_list > span i{
        margin-right: 5px;
    }
    .more_btn_block{
        text-align: right;
        border-bottom: 10px solid #efefef;
        position: relative;
        margin: 15px 0 25px 0;
    }
    .more_btn_block > a{
        position: absolute;
        right: 0;
        top: -15px;
        background-color: #fff;
        display: inline-block;
        padding: 5px 0px 5px 15px;
        font-size: 20px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        border-radius: 50px;
        color: purple;
        transition: all 0.4s;
    }
    .more_btn_block > a:hover{
        color: #006699;
    }

    @media (max-width: 575.98px) {
        .tab_list{
            font-size: 12px;
        }
    }
</style>
