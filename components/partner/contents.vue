<template>
    <div class="container clearfix" id="video_content_block">
        <div class="tab_list">
            <span :class="[{'active':sel_tab_item==1}]" @click="sel_tab_item=1"><i class="fa fa-tv"></i>লাইভ ক্লাস</span>
            <span :class="['ml-4',{'active':sel_tab_item==2}]" @click="sel_tab_item=2"><i class="fa fa-video"></i> ধারণকৃত ক্লাস</span>
            <span :class="['ml-4',{'active':sel_tab_item==3}]" @click="sel_tab_item=3"><i class="fa fa-heart"></i> অন্যান্য ভিডিও</span>
        </div>
        <div class="content_list mt-3">
            <div class="row">
                <div v-for="(n,i) in 3" :key="i" class="col-md-2">
                    <div class="item">
                        <div class="content_img">
                            <div class="overlap"></div>
                            <div class="icon">
                                <i class="fa fa-play"></i>
                            </div>
                            <img v-if="n==1" src="http://admin.muktopaath.gov.bd/cache-images/219x145x1/uploads/images/dXNlci0zNjQvaW1hZ2UtMTk4ODMzLTE1NzcxMTcwMTA=.jpg" />
                            <img v-if="n==2" src="http://admin.muktopaath.gov.bd/cache-images/219x145x1/uploads/images/dXNlci0zNjQvaW1hZ2UtMTk4ODMzLTE1NzcxMTY2MDc=.jpg" />
                            <img v-if="n==3" src="http://admin.muktopaath.gov.bd/cache-images/219x145x1/uploads/images/dXNlci0zNjQvaW1hZ2UtMTk4ODMzLTE1NzcxMTczODM=.jpg" />

                        </div>
                        <div class="content_title">
                            <img v-if="n==1" src="~/assets/images/10-Min-School-logo.png" />
                            <img v-if="n==2" src="~/assets/images/10-Min-School-logo.png" />
                            <img v-if="n==3" src="~/assets/images/10-Min-School-logo.png" />
                            <p class="content_for">English Fundamental</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VideoContentBlock',
    data(){
        return {
            sel_tab_item: 1
        }
    }
}
</script>
<style scoped>
    #video_content_block{
        margin-top: 12px;
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
    .content_list .content_img{
        display: block;
        position: relative;
        height: 120px;
        background-color: #ccc;
    }
    .content_list .content_img .overlap{
        position: absolute;
        background-color: #00000080;
        width: 100%; height: 100%;
        z-index: 1;
    }
    .content_list .content_img .icon{
        position: absolute;
        top: 25%;
        left: 34%;
        z-index: 2;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        font-size: 22px;
        text-align: center;
        background-color: #fff;
        color: #d47dbd;
        border: 3px solid #b5b5b5;
    }
    .content_list .content_img .icon:before{
        top: -11px;
        left: -11px;
        width: 30px;
        height: 30px;
        border: 1px solid #f7971d;
        border-radius: 50%;
        background: #f7971d80;
        animation: circle 1.3s ease-out infinite;
    }
    .content_list .content_img >>> img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    .content_list .content_title{
        margin-top: 5px;
        border-left: 2px solid #ddd; padding-left: 8px
    }
    .content_list .content_title img{max-height: 40px;margin-bottom: 5px;}

    @keyframes circle{0%{opacity:1;transform:scale(.2)}to{opacity:0;transform:scale(1.8)}}
</style>