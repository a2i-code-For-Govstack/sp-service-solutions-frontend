<template>
    <div class="comment_view_block">
        <!-- <div v-html="get_comment"></div> -->
        <read-more more-str="Read more" :text="get_comment" less-str="Read less" :max-chars="250"></read-more>
    </div>
</template>
<script>
export default {
    name: 'CommentViewBlock',
    props: ['data'],
    data(){
        return {
            get_comment: this.data
        }
    },
    methods: {

    }
}
</script>
<style scoped>
    .comment_view_block >>> div > span{
        display: inline-block;
        font-size: 12px;
        border-bottom: 1px dashed #999;
    }
</style>