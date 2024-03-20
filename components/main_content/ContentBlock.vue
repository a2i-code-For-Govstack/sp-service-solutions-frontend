<template>
    <div id="content_block" class="mt-4">
        <div class="tab_list">
            <span :class="[{'active':sel_tab_item==1}]" @click="sel_tab_content(1)"><i class="fa fa-book"></i> ই-বুক</span>
            <span :class="['ml-4',{'active':sel_tab_item==2}]" @click="sel_tab_content(2)"><i class="fa fa-database"></i> ডিজিটাল কন্টেন্ট</span>
            <span :class="['ml-4',{'active':sel_tab_item==7}]" @click="sel_tab_content(7)"><i class="fa fa-info-circle"></i> অন্যান্য</span>
        </div>
        <div class="content_list mt-3">
            <div v-if="pre_loader">
                <div class="pre_loader">
                    <div class="row">
                        <div class="col-md-2" v-for="(n,i) in 6" :key="'list-' + i">
                            <FormBlockLoader :cols="1" :height="400" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="400" :r2_h="0" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div class="col-md-2" v-for="(item,index) in items" :key="index">
                    <LearningMaterialCardView :item="item" />
                </div>
            </div>
        </div><!--end .content_list-->

        <div class="more_btn_block">
            <nuxt-link :to="{ path: '/all-learning-materials/' + sel_tab_item }"><i class="fa fa-link"></i> {{ more_btn_caption[sel_tab_item] }} <i class="fa fa-angle-right"></i></nuxt-link>
        </div>
    </div>
</template>
<script>
import LearningMaterialCardView from '~/components/content_display/LearningMaterialCardView'
export default {
    name: 'ContentBlock',
    components: {
        LearningMaterialCardView
    },
    data(){
        return {
            pre_loader: false,
            items: [],
            sel_tab_item: 1,
            more_btn_caption: {
                1: 'সকল ই-বুক',
                2: 'সকল ই-কন্টেন্ট',
                7: 'আরো অন্যান্য'
            },
            limit: 6
        }
    },
    mounted(){
        this.load_content();
    },
    methods: {
        sel_tab_content: function(val){
            if(this.sel_tab_item!==val){
                this.sel_tab_item = val;
                this.load_content();
            }
        },
        async load_content(){
            var url = '/api/load-learning-material/' + this.sel_tab_item + '/' + this.limit + '?for_student=1';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));

            this.pre_loader = true

            this.$axios.get(url,{
                headers: {
                    'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log('Get Learning Material data',response.data)
                if(response.data.data.length>0){
                    this.items = response.data.data;
                    this.pre_loader = false;
                }else if(this.sel_tab_item==1){
                    this.sel_tab_item=2;
                    this.pre_loader = false;
                    this.load_content();
                }else if(this.sel_tab_item==2){
                    this.sel_tab_item=7;
                    this.pre_loader = false;
                    this.load_content();
                }else this.pre_loader = false;
            });
        }
    }
}
</script>
<style scoped>
    #content_block{
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
        margin: 15px 0;
    }
    .more_btn_block > a{
        position: absolute;
        right: 0;
        top: -10px;
        background-color: #fff;
        display: inline-block;
        padding-left: 15px;
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
    @media (max-width: 575.98px){
        .tab_list {
            font-size: 12px;
        }
    }
</style>