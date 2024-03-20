<template>
    <div class="service_access_page">
        <div v-if="!access" class="access_deny">
            <div class="icon"><i class="fa fa-box-open fa-4x"></i></div>
            <div class="msg">Not allowed to access from this domain</div>
        </div>
        <template v-else>
            <div class="header_block">
                <HeaderBlock :title="get_title()" />
            </div>
            <div class="content_block">
                <nuxt-child :title="get_title()" />                    
            </div>
        </template>
        <div class="footer_block">
            <FooterBlock />
        </div>
    </div>
</template>
<script>
import HeaderBlock from './service-access/header-content'
import FooterBlock from './dashboard/footer'
export default {
    name: 'ServiceAccessPage',
    components: {
        HeaderBlock,        
        FooterBlock
    },
    head () {
        return {
            title: 'Service Content Dashboard',
            meta: [
                { hid: 'description', name: 'description', content: 'Welcome to service content dashboard' }
            ]
        }
    },
    data(){
        return {
            access: true,
            title: this.$route.name,
            cur_path: this.$route.path,
            total_rows: 0
        }
    },
    watch: {
        $route(to, from) {
            this.title = to.name
            this.cur_path = to.path            
        }
    },
    methods: {
        get_title: function(){
            return this.title.replace(this.$store.state.dashboard.prefix + '-','').replace(/-/g,' ');
        }
    }
}
</script>
<style scoped>
    .header_block{
        position: fixed;
        top: 0; left: 0; width: 100%; padding: 0 24px;
        height: 60px; line-height: 60px; border-bottom: 1px solid #ddd;
        background-color: #fff;
        box-shadow: rgba(40, 42, 49, 0.16) 0px 1px 2px 0px;
        z-index: 99;
    }
    .footer_block{
        position: fixed;
        bottom: 0; left: 0; width: 100%; padding: 0 24px;
        height: 40px; line-height: 40px; border-top: 1px solid #ddd;
        background-color: #fff;
        /* box-shadow: rgba(40, 42, 49, 0.16) 0px 1px 2px 0px; */
        z-index: 99;
    }
    .content_block{
        display: block;
        position: relative;
        margin-top: 60px;
        margin-bottom: 30px;
        padding: 24px;
    }
    .access_deny{
        display: block;
        margin: 5% auto;
        text-align: center;
    }
    .access_deny .icon{
        font-size: 26px;
        color: #ccc;
        margin-bottom: 15px;
    }
    .logo{
        width: 100%;
        height: 60px;
        padding: 10px 15px;
        background-color: #62317e;
    }
    .logo > img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>