<template>
    <div class="item_block">
        <a :href="item.view_link_type=='1'?item.content_link:'/show-learning-material/' + item.id" :target="item.view_link_type=='1'?'_blank':'_self'">
            <div class="item">
                <div class="content_img">
                    <img :src="$imageUrl('learning-material/partner-'+ item.partner_info.id +'/'+ item.cover_photo_url)" />
                </div>
            </div>
        </a>        
    </div>
</template>
<script>
export default {
    name: 'LearningMaterialCardDisplayBlock',
    props: ['item']
}
</script>
<style scoped>
    .item_block .content_img{
        display: block;
        width:100%;
    }
    .item_block .content_img >>> img{
        width: 100%; max-height: 200px;
    }
    .item_block .content_title{
        border-left: 2px solid #ddd; padding-left: 8px
    }
</style>