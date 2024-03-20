<template>
    <div class="comments_management_block">
        <ContentHeader :title="title" :total_rows="total_rows" :add_button_hide="'true'" />
        <nuxt-child ref="container_block" />
    </div>
</template>
<script>
import ContentHeader from './header-content-block'
export default {
    name: 'CommentsManagementBlock',
    props: ['title'],
    components: {
        ContentHeader
    },
    data(){
        return {            
            total_rows: 0
        }
    }
}
</script>
<style scoped>

</style>