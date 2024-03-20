<template>
    <div class="item_block">
        <a :href="item.view_link_type=='1'?item.content_link:'/content/' + item.id" :target="item.view_link_type=='1'?'_blank':'_self'">
            <div class="item">
                <div class="content_img">
                    <!-- <div class="overlap"></div> -->
                    <div :class="['content_type_title',
                        {'live_video':item.category=='video' && item.content_type_id==1},
                        {'recorded_video':item.category=='video' && item.content_type_id==2}
                    ]">
                        <span>{{ $store.state.content_type_list[item.category][item.content_type_id] }}</span>
                    </div>
                    <div v-if="item.category=='video'" :class="['icon',{live:item.content_type_id==1}]">
                        <span v-if="item.content_type_id==1"><i class="fa fa-microphone-alt"></i></span>
                        <span v-else><i class="fa fa-play"></i></span>
                    </div>
                    <img v-if="item.cover_photo_external_link!==null && item.cover_photo_external_link!==''" :src="item.cover_photo_external_link" />
                    <img v-else-if="item.category=='video' && item.cover_photo_url!==null" :src="$imageUrl('video-content/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                    <img v-else-if="item.category=='learning' && item.cover_photo_url!==null" :src="$imageUrl('learning-material/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                    <img v-else-if="item.category=='course' && item.cover_photo_url!==null" :src="$imageUrl('course/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                    <img v-else-if="item.category=='blog' && item.cover_photo_url!==null" :src="$imageUrl('blog/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                    <img v-else-if="item.category=='app' && item.cover_photo_url!==null" :src="$imageUrl('app/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                    <img v-else-if="item.category=='assessment' && item.cover_photo_url!==null" :src="$imageUrl('assessment/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                    <img v-else-if="item.category=='class-routine' && item.cover_photo_url!==null" :src="$imageUrl('class-routine/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                    <i v-else class="fa fa-images default_icon"></i>
                </div>
                <div class="content_summary_block">
                    <div class="partner_info clearfix">
                        <span class="logo float-left">
                            <img v-if="item.partner_info.icon!==null" :src="$imageUrl('user-profile-icon' + '/' + item.partner_info.icon)" />
                            <i v-else class="fa fa-university"></i>
                        </span>
                        <span class="partner_name float-left">{{ item.partner_info.name }}</span>
                    </div>
                    <div class="content_title">
                        <p class="title">{{ item.content_title }}</p>
                        <p v-if="item.non_academic_title">{{ item.non_academic_title }}</p>
                        <p v-else class="content_for">
                            <template v-if="item.subject_id!==null">
                                <span v-if="item.education_class_id">{{ item.education_class_id.title_bn }}</span>
                                <span v-if="item.education_class_id && item.subject_id"> । </span>
                                <span v-if="item.subject_id">{{ item.subject_id.title_bn }}</span>
                            </template>
                            <template v-else-if="item.for_classes.length>0">
                                <template v-for="(class_info,class_index) in item.for_classes">
                                    <span :key="'separator-' + class_index" v-if="class_index>0">, </span>
                                    <span :key="'class-' + class_index">{{ class_info.title_bn }}</span>
                                </template>
                            </template>
                            <span v-else-if="item.education_class_id">{{ item.education_class_id.title_bn }}</span>
                        </p>
                        <div v-if="item.category=='video' && item.content_type_id==1 && item.start_time!==null && item.end_time!==null">
                            <p>
                                <span>ক্লাস শুরু: </span>
                                <span v-html="date_time_display(item.start_time)"></span>
                            </p>
                            <p>
                                <span>ক্লাস শেষ: </span>
                                <span v-html="date_time_display(item.end_time)"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        <!-- <div class="clearfix d-block d-sm-none"></div>
        <div class="mb-3 d-block d-sm-none"></div> -->
    </div>
</template>
<script>
export default {
    name: 'VideoCardDisplayBlock',
    props: ['item'],
    methods: {
        date_time_display: function(val){
            let d = new Date(val);
            let date = [
                    ('0' + d.getDate()).slice(-2),
                    ('0' + (d.getMonth() + 1)).slice(-2),
                    d.getFullYear()
                ].join('-');
            // console.log(date);
            return this.$enToBnNumber(date + ' ' + d.getHours() + ':' + d.getMinutes());
        }
    }
}
</script>
<style scoped>
    .item_block >>> a{
        display: block;
        color: #666;
    }
    .item_block .content_img{
        display: block;
        position: relative;
        height: 165px;
        background-color: #ccc;
        text-align: center;
    }
    .item_block .content_img .overlap{
        position: absolute;
        background-color: #00000040;
        width: 100%; height: 100%;
        z-index: 1;
    }
    .item_block .content_img .content_type_title{
        position: absolute;
        font-family:"Hind Siliguri Light";
        font-weight: bolder;
        background-color: #ffe422;
        padding: 5px 15px 5px 10px;
        top: 10px;
        left: 0px;
        z-index: 10;
    }
    .item_block .content_img .content_type_title.live_video{
        background-color: #CD0000;
        color: #fff;
    }
    .item_block .content_img .content_type_title.recorded_video{
        background-color: #00b5a2;
        color: #fff;
    }
    .item_block .content_img .content_type_title::after,
    .item_block .content_img .content_type_title::before {
        content: "";
        position: absolute;
    }
    .item_block .content_img .content_type_title::before{
        width: 7px;
        height: 37px;
        top: 0;
        left: -6.5px;
        padding: 0 0 7px;
        background: inherit;
        border-radius: 5px 0 0 5px;
    }
    .item_block .content_img .content_type_title::after {
        width: 5px;
        height: 5px;
        bottom: -5px;
        left: -4.5px;
        background: #f26822;
        border-radius: 5px 0 0 5px;
    }
    .item_block .content_img .icon{
        position: absolute;
        bottom: 15px;
        right: 15px;
        z-index: 2;
        border-radius: 50%;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        width: 60px;
        height: 60px;
        padding: 8px;
        line-height: 44px;
        border: 2px solid #ffffff80;
        border-radius: 50%;
    }
    .item_block .content_img .icon.live{
        border: 2px solid rgba(255,255,255,0.8);
        width: 80px;
        height: 80px;
        line-height: 60px;
        font-size: 22px;
        padding: 10px;
    }
    .item_block .content_img .icon >>> span{
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        background-color: #CD0000;
        -webkit-border-radius: inherit;
        border-radius: inherit;        
    }
    .item_block .content_img .icon.live >>> span{
        -webkit-animation: 1.5s infinite play-btnPulse;
        animation: 1.5s infinite play-btnPulse;
    }
    .item_block .content_img .icon >>> i{
        /* border-radius: 50%;
        background-color: #fff; */
        margin-left: 3px;
    }
    .item_block .content_img .icon.live >>> i{
        margin: 0;
    }
    .item_block .content_img >>> img{
        width: 100%; height: 100%;
        object-fit: contain;
    }
    .item_block .content_img >>> i.default_icon{
        line-height: 150px;
        font-size: 82px;
        color: #eee;
    }
    .item_block .content_summary_block{
        padding: 10px; background-color: #fff;
        border: 1px solid #dddddd;
        border-top: none; text-align: left;
    }
    .item_block .partner_info{
        display: block;
        font-size: 12px;
        font-weight: bold;
        color: #666;
        margin: 5px 0;
        /* background-color: #efefef; */
    }
    .item_block .partner_info > .logo{
        width: 50px;
        height: 30px;
        /* background-color: #f7f7f7; */
        margin-right: 8px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
    .item_block .partner_info > .logo >>> img{
        width: 100%; height: 100%; object-fit: contain;
    }
    .item_block .partner_info > .logo >>> i{
        font-size: 18px; width: 30px; height: 30px; font-size: 14px; line-height: 30px; color: #666; background-color: #eeeeee;
        border-radius: 50%;
    }
    .item_block .partner_info > .partner_name{
        width: calc(100% - 58px);
        height: 30px; overflow: hidden;
        line-height: 30px;
    }
    .item_block .content_title{
        margin-top: 7px;
    }
    .item_block .content_title >>> p{
        margin: 0; padding: 0;
    }
    .item_block .content_title img{max-height: 40px;margin-bottom: 5px;}

    @keyframes circle{0%{opacity:1;transform:scale(.2)}to{opacity:0;transform:scale(1.8)}}
    @keyframes play-btnPulse {
        0% {
            -webkit-box-shadow: 0 0 0 0 rgba(255,255,255,.7);
            box-shadow: 0 0 0 0 rgba(255,255,255,.7);
        }
        100% {
            -webkit-box-shadow: 0 0 0 2em rgba(255,255,255,0);
            box-shadow: 0 0 0 2em rgba(255,255,255,0);
        }
    }
</style>