<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-3 col-md-3 col-lg-2 pr-1 pr-lg-3 pl-2 pl-lg-3">
                    <div class="main-logo">
                        <Logo />
                    </div>
                </div>

                <!-- <div class="col-0 col-md-0 col-lg-2 d-none d-lg-block">                
                </div>

                <div class="col-0 col-md-0 col-lg-2 d-none d-lg-block">
                </div> -->

                <div class="col-9 col-md-9 col-lg-10 pl-1 pl-lg-3 pr-1 pr-lg-3">
                    
                    <div class="row">
                        <div class="col-md-12 pl-1 pl-md-3 pr-2 pr-md-3 d-none d-md-block" align="right">                            
                            <ul class="header_menu">
                                <li>
                                    <div class="srch-input">
                                        <input type="index" v-model="keyword" placeholder="খুঁজুন..." @keyup.enter="goto_srch_page" :class="{active:keyword!==''}" />
                                        <i class="fa fa-search" @click="goto_srch_page"></i>
                                    </div>
                                </li>
                                <template v-if="$store.state.menu_items_info.header_menus.length>0">
                                    <li v-for="(menu,index) in $store.state.menu_items_info.header_menus" :key="index">
                                        <a v-if="menu.link_type==1" :href="menu.external_url" target="_blank">{{ menu.title_bn }}</a>
                                        <nuxt-link v-else :to="{ path: '/' + menu.slug_name }">{{ menu.title_bn }}</nuxt-link>
                                    </li>
                                </template>
                                <!-- <li><a href="#"><i class="fa fa-info-circle"></i>আমাদের সম্পর্কে</a></li> -->
                                <li><a href="/all-partners"><!--<i class="fa fa-handshake"></i>-->সহযোগী প্রতিষ্ঠান</a></li>
                                <li v-if="$store.state.menu_items_info.footer_menus && $store.state.menu_items_info.footer_menus[0]">
                                    <nuxt-link :to="{ path: '/' + $store.state.menu_items_info.footer_menus[0].slug_name }">
                                        <span class="btn-border blinking">{{ $store.state.menu_items_info.footer_menus[0].title_bn }}</span>
                                    </nuxt-link>
                                </li>
                                <!-- <li><a href="/feedback"><span class="btn-border"><i class="fa fa-comments"></i>মতামত</span></a></li> -->

                                <li>
                                    <div class="d-md-block" v-if="$store.state.auth_info.loggedIn && $store.state.auth_info.user_data">
                                        <LoginUserInfo />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-12 d-block d-md-none">
                            <button class="navbar-toggler menu-toggler mb_menu mr-2 float-right" type="button" data-toggle="collapse" data-target="#navbarHeaderMenu" aria-controls="navbarHeaderMenu" aria-expanded="false" aria-label="Toggle navigation"><span class="dark-blue-text"><i class="fas fa-bars fa-1x"></i></span></button>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        <div :class="['collapse','navbar-collapse']" id="navbarHeaderMenu">
            <ul class="header_menu">
                <li>
                    <div class="srch-input mt-2 mb-2">
                        <input type="index" v-model="keyword" placeholder="খুঁজুন" @keyup.enter="goto_srch_page" />
                        <i class="fa fa-search" @click="goto_srch_page"></i>
                    </div>
                </li>
                <template v-if="$store.state.menu_items_info.header_menus.length>0">
                    <li v-for="(menu,index) in $store.state.menu_items_info.header_menus" :key="index">
                        <a v-if="menu.link_type==1" :href="menu.external_url" target="_blank">{{ menu.title_bn }}</a>
                        <nuxt-link v-else :to="{ path: '/' + menu.slug_name }">{{ menu.title_bn }}</nuxt-link>
                    </li>
                </template>
                <li><a href="/all-partners">সহযোগী প্রতিষ্ঠান</a></li>
                <!-- <li><a href="/feedback" class="btn-border">মতামত</a></li> -->
                <li v-if="$store.state.menu_items_info.footer_menus && $store.state.menu_items_info.footer_menus[0]">
                    <nuxt-link :to="{ path: '/' + $store.state.menu_items_info.footer_menus[0].slug_name }">
                        <span class="btn-border blinking">{{ $store.state.menu_items_info.footer_menus[0].title_bn }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </header>
</template>
<script>
import Logo from '~/components/Logo'
import LoginUserInfo from './LoginUserInfo'
export default {
    name: 'HeaderBlock',
    components:{
        Logo,
        LoginUserInfo
    },
    data() {
        return {            
            'keyword': ''
        }
    },
    methods: {
        goto_srch_page: function(){
            if(this.keyword==''){
                this.$toast.error('Please enter something fro search', {icon: "Warning"});
                return false
            }
            
            var element = document.getElementById("navbarHeaderMenu");
            element.classList.remove("show");
            
            this.$router.push('/search?keyword=' + this.keyword)
        }             
    }
}
</script>
<style scoped>
    header{
        display: block;
        background-color: #ffffff;
        /* height: 60px; */
        box-shadow: 0 0 5px #333333;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }
    .container,.row,.main-logo{
        height: 60px;
    }
    .header_menu{
        display: inline-block;
        margin: 0; padding: 0;
        list-style: none;
    }
    .header_menu > li{
        /* display: inline-block; */
        float: left;
        padding: 0 10px;
        cursor: pointer;
    }
    .header_menu > li >>> a{
        display: block;
        font-size: 16px;
        line-height: 60px;
        color: #666;
        transition: all 0.4s;
    }
    .header_menu > li >>> .btn-border{
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 25px;
        line-height: 24px;
        text-align: center;
        padding: 3px 15px;
        min-width: 80px;
        transition: all 0.4s;
    }
    .header_menu > li:hover >>> a{
        color: purple
    }
    .header_menu > li:hover >>> .btn-border{
        background-color: purple;
        border-color: purple;
        font-size: 14px;
        color: #ffffff
    }
    #navbarHeaderMenu{
        box-shadow: 0 3px 5px #666;
        background-color: #fff;
    }
    .srch-input{
        position: relative;
        width: 100%;
        line-height: 60px;
        cursor: auto;
    }
    .srch-input >>> input{
        padding: 8px 40px 8px 15px;
        border-radius: 25px;
        border: 1px solid #dddddd;
        background-color: #f7f7f7;
        color: #666;
        outline: none;
        width: 50%;
        line-height: 18px;
        transition: all 0.4s;
    }
    .srch-input >>> input::placeholder{
        color: #999
    }
    .srch-input >>> input:focus,
    .srch-input >>> input.active{
        background-color: #fff;
        width: 100%;
    }
    .srch-input >>> i{
        position: absolute;
        font-size: 18px;
        color: #999;
        right: 12px;
        top: 0px;
        line-height: 60px;
        cursor: pointer;
    }
    .konnect-live{ margin-top: 12px;}
    .mb_menu{ border:1px solid #ccc;}
    .blinking{
        animation:blinkingText 1.2s infinite;
    }
    .blinking:hover{
        animation:none
    }
    @keyframes blinkingText{
        0%{     color: purple;    }
        49%{    color: purple; }
        60%{    color: transparent; }
        99%{    color:transparent;  }
        100%{   color: purple;    }
    }
    @media (max-width: 575.98px) {
        .header_menu{ width:100%; background:#fff; padding:0 0 15px 0;}
        .header_menu>li { display:block; width: 100%; clear: both;}
        .header_menu>li>a { line-height:30px; font-size:14px;}
        .srch-input{            
            line-height: 30px;
        }
        .srch-input >>> input{            
            width: 100%;            
        }
        .srch-input >>> i{            
            line-height: 36px;
        }
        .btn-border{
            margin-top: 5px;
        }
        .menu-toggler{
            color: #888;
            padding: 5px 10px;        
            margin-top: 13px;
        }
        .login_user_info{
            max-width: 200px;
        }
    }
</style>