<template>
    <div class="container clearfix" id="content_block">
        <div class="tab_list">
            <span :class="[{'active':sel_tab_item==1}]" @click="sel_tab_item=1"><i class="fa fa-globe" aria-hidden="true"></i>সাম্প্রতিক কার্যক্রম
</span>
            <!-- <span :class="['ml-4',{'active':sel_tab_item==2}]" @click="sel_tab_item=2"><i class="fab fa-android"></i> সকল অ্যাপ</span> -->
            <span :class="['ml-4',{'active':sel_tab_item==2}]" @click="sel_tab_item=2"><i class="fa fa-edit"></i> অন্যান্য কার্যক্রম</span>
        </div>
        <div class="content_list mt-3">
            <div class="row">
                <div v-for="(n,i) in 6" :key="i" class="col-md-2">
                    <div class="item">
                        <div class="content_block">
                            <nuxt-link to="/partners/muktopaath">
      <a class="item" v-if="n==1" href="#">
                                <img src="http://admin.muktopaath.gov.bd/public/images/currentactivities/5e00cfc984fed.png" />
                                <p>The GSMA Glomo award for the Best Mobile Innovation for Education and Learning at the Mobile World Congress (MWC) 2017. </p>
                            </a>
    </nuxt-link>
                            
                            <a class="item" v-if="n==2" href="https://jaago.com.bd/">
                                <img src="http://admin.muktopaath.gov.bd/public/images/currentactivities/5e00ce052ab9c.png" />
                                <p>Special Mention in the GIST Tech-I at Silicon Valley in 2016. </p>
                            </a>
                            <a class="item" v-if="n==3" href="http://konnect.edu.bd/">
                                <img src="http://admin.muktopaath.gov.bd/public/images/currentactivities/5e00cd7b33274.jpeg" />
                                <p>10 Minute School wins Swiss Embassy Award </p>
                            </a>
                            <a class="item" v-if="n==4" href="https://10minuteschool.com/">
                                <img src="http://admin.muktopaath.gov.bd/public/images/currentactivities/5e00cd7b33274.jpeg" />
                                <p>10 Minute School wins BRAC Manthan Award </p>
                            </a>
                            <a class="item" v-if="n==5" href="#">
                                <img src="http://admin.muktopaath.gov.bd/cache-images/219x145x1/uploads/images/dXNlci0zNjQvaW1hZ2UtMTk4ODMzLTE1NzcxMTYyNDQ=.jpg" />
                                <p>Seminar to be held on tuesday </p>
                            </a>
                            <a class="item" v-if="n==6" href="https://jaago.com.bd/">
                                <img src="http://admin.muktopaath.gov.bd/public/images/currentactivities/5e00cd7b33274.jpeg" />
                                <p>New class session to be start from june 2020</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LinkBlock',
    data(){
        return {
            sel_tab_item: 1
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
    .content_list .content_block{
        display: block;
        width:100%;
        position:relative;
    }
    .content_list .content_block >>> img{
        width: 100%; min-height: 130px; border-radius:10px;
    }
    .content_list .content_block .item{
        display: block;
        background-color: #efefef;
        color: #666;
        border-radius: 10px;
        border-bottom: 1px solid #ddd;
        text-align: center;
        transition: all 0.4s;
    }
    .content_list .content_block .item:hover{
        color: #3b5998
    }
    .content_list .content_block .item .caption{
        margin-top: 3px;
    }
    .content_list .content_block .item .iconz{
        margin-bottom: 3px;
    }
    .content_list .content_block .item .iconz i {
        margin: 5px;
        font-size: 20px;
        transition: all 0.4s;
    }
    .content_list .content_block .item:hover .iconz i.fa-android{
        color: #a4c639
    }
    .content_list .content_block .item:hover .iconz i.fa-facebook{
        color: #3b5998;
    }
    .content_list .content_block .item:hover .iconz i.fa-apple{
        color: #fd9426
    }
    .content_list .content_block .item:hover .iconz i.fa-youtube{
        color: #ff0000
    }
    .content_list .content_title{
        border-left: 2px solid #ddd; padding-left: 8px
    }
    .content_list .content_block span{
        position:absolute;
        right:8px;
        bottom:8px;
    }
    .content_list .content_block span img{
        width: 25px;
        height: 30px;
        min-height: 30px;
        border-radius: 0px;
    }
</style>