<template>
    <nav class="main-dashboard-nav">
        <nuxt-link :to="{ path: '/' + $store.state.dashboard.prefix }" :class="['nav-item',{active:this.$route.name==
        $store.state.dashboard.prefix}]"><span class="icon"><i class="fa fa-chart-line"></i></span> {{ $store.state.dashboard.name }}</nuxt-link>
        <template v-for="(list,caption) in dashboard_featured_list">
            <label v-if="!particular_domain_access" :key="caption">{{ caption }}</label>
            <template v-for="(item,index) in list">
                <template v-if="access_featured_list[index]">
                    <nuxt-link v-if="item.position=='dashboard-left-nav'"
                        :key="caption + '-' + index"
                        :to="{ path: item.path }"
                        :class="['nav-item',{active:current_route==item.route}]">
                        <span class="icon" v-html="item.icon"></span> {{ item.name }}
                    </nuxt-link>
                </template>
            </template>
        </template>
    </nav>
</template>
<script>
export default {
    name: 'DashboardNavigation',
    computed: {
        current_route: function(){
            return this.$route.name
        },
        dashboard_featured_list(){            
            return this.$store.state.dashboard_featured_list;
        },
        access_featured_list(){
            return this.$store.state.feature_access_list;
        },
        particular_domain_access: function(){
            if(localStorage.getItem('req_from')) return true
            else return false
        }
    }
}
</script>
<style scoped>
    .main-dashboard-nav{
        position: relative;
        width: 100%; height: calc(100% - 60px);
        overflow-y: auto;
    }
    .main-dashboard-nav >>> label{
        display: block;
        padding: 5px 20px 3px;
        margin: 2px;
        color: lightblue;
        font-weight: bold;
        /* border-bottom: 1px solid #dddddd; */
    }
    .main-dashboard-nav .nav-item{
        display: block;
        padding: 10px 10px 8px 20px;
        font-size: 14px;
        text-decoration: none;
        color: #ccc;
        font-weight: 600;
        transition: all 0.4s
    }
    .main-dashboard-nav .nav-item:hover,
    .main-dashboard-nav .nav-item.active{
        border-left: 3px solid lightpink;
        padding-left: 17px;
        color: white !important;
    }
    .main-dashboard-nav .nav-item .icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: left;
    }
    .main-dashboard-nav .nav-item i{
        color: #eee;
    }
    .main-dashboard-nav .nav-item:hover i,
    .main-dashboard-nav .nav-item.active i{
        color: lightpink;
    }
</style>