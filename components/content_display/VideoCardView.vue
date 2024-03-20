<template>
    <div class="item_block">
        <a :href="item.view_link_type=='1'?item.content_link:'/show-video-content/' + item.id" :target="item.view_link_type=='1'?'_blank':'_self'">
            <div class="item">
                <div class="content_img">
                    <div class="overlap"></div>
                    <div class="icon">
                        <i class="fa fa-play"></i>
                    </div>
                    <img :src="$imageUrl('video-content/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                </div>
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
                    <p v-else class="content_for"><span v-if="item.education_class_id">{{ item.education_class_id.title_bn }}</span><span v-if="item.education_class_id && item.subject_id"> । </span><span v-if="item.subject_id">{{ item.subject_id.title_bn }}</span></p>
                </div>
            </div>
        </a>
        <div class="clearfix d-block d-sm-none"></div>
        <div class="mb-3 d-block d-sm-none"></div>
    </div>
</template>
<script>
export default {
    name: 'VideoCardDisplayBlock',
    props: ['item','ext_link']
}
</script>
<style scoped>
    .item_block >>> a{
        color: #666;
    }
    .item_block .content_img{
        display: block;
        position: relative;
        height: 120px;
        background-color: #ccc;
    }
    .item_block .content_img .overlap{
        position: absolute;
        background-color: #00000080;
        width: 100%; height: 100%;
        z-index: 1;
    }
    .item_block .content_img .icon{
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
    .item_block .content_img .icon:before{
        top: -11px;
        left: -11px;
        width: 30px;
        height: 30px;
        border: 1px solid #f7971d;
        border-radius: 50%;
        background: #f7971d80;
        animation: circle 1.3s ease-out infinite;
    }
    .item_block .content_img >>> img{
        width: 100%; height: 100%;
        object-fit: cover;
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
        width: 30px;
        height: 30px;
        /* background-color: #f7f7f7; */
        margin-right: 8px;
        text-align: center;
    }
    .item_block .partner_info > .logo >>> img{
        width: 100%; height: 100%; object-fit: contain;
    }
    .item_block .partner_info > .logo >>> i{
        font-size: 18px; width: 30px; height: 30px; font-size: 14px; line-height: 30px; color: #666; background-color: #eeeeee;
        border-radius: 50%;
    }
    .item_block .partner_info > .partner_name{        
        width: calc(100% - 38px);
        height: 30px; overflow: hidden;
        line-height: 30px;
    }
    .item_block .content_title{
        margin-top: 5px;
        border-left: 2px solid #ddd; padding-left: 8px
    }
    .item_block .content_title >>> p{
        margin: 0; padding: 0;
    }
    .item_block .content_title img{max-height: 40px;margin-bottom: 5px;}

    @keyframes circle{0%{opacity:1;transform:scale(.2)}to{opacity:0;transform:scale(1.8)}}
</style>