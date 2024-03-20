<template>
    <div class="comments_management_block">
        <ContentHeader :title="title" :total_rows="total_rows" :add_button_hide="'true'" />
        <nuxt-child ref="container_block" />
    </div>
</template>
<script>
import ContentHeader from '../dashboard/header-content-block'
export default {
    name: 'CommentsManagementBlock',
    props: ['title'],
    components: {
        ContentHeader
    },
    data(){
        return {
            get_title: this.title,
            total_rows: 0
        }
    },
    watch: {
        $route(to,from){
            this.$parent.title = 'Comments Management'
        }
    },
    mounted(){
        this.$parent.title = 'Comments Management'
    }
}
</script>
<style scoped>

</style>