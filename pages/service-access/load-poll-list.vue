<template>
    <div class="domain_opinion_polls_block">
        <ContentHeader :title="title" :total_rows="total_rows" />
        <nuxt-child ref="container_block" />
    </div>
</template>
<script>
import ContentHeader from '../dashboard/header-content-block'
export default {
    name: 'DomainOpinionPollsBlock',
    props: ['title'],
    components: {
        ContentHeader
    },
    data(){
        return {            
            total_rows: 0
        }
    },
    watch: {
        $route(to,from){
            this.$parent.title = 'Opinion Poll'
        }
    },
    mounted(){
        this.$parent.title = 'Opinion Poll'
    }
}
</script>
<style scoped>

</style>