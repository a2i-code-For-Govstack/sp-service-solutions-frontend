<template>
    <footer class="mt-2 mt-sm-5">
        <!-- <div :class="['feedback_btn',{active:$route.name=='feedback'}]" @click="feedback_request">
            <span><i class="fa fa-comments"></i> Feedback</span>
        </div> -->
        <div class="footer_top_block">
            <div class="bottom_bg_overlay">
                <img src="~/assets/images/top-banner-footer-bg.png" />
            </div>
        </div>
        <div class="container mt-3 mb-3">
            <!-- <div v-if="!($store.state.auth_info.loggedIn && $store.state.auth_info.user_data)" class="partner_btn_block">
                <label @click="partner_auth_modal">পার্টনার লগইন</label>
            </div> -->
            <div class="row">
                <div class="col-md-4 col-sm-6">
                    <div class="copyright-info">
                        <p class="mb-3 mb-sm-0"><span class="pr-3 mb-2">পরিকল্পনা ও বাস্তবায়নে :</span>
                            <a target="_blank" href="https://moedu.gov.bd">শিক্ষা মন্ত্রণালয়</a>,
                            <a target="_blank" href="https://mopme.gov.bd">প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়</a>,
                            <a target="_blank" href="https://a2i.gov.bd">এটুআই</a>,
                            <a target="_blank" href="https://ictd.gov.bd">তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ</a>
                        </p>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6">
                    <div v-if="$store.state.menu_items_info.footer_menus.length>0" class="copyright-info">
                        <p class="mb-3 mb-sm-0"><span class="pr-3 mb-2">প্রয়োজনীয় লিংকস :</span>
                            <ul class="footer-menu-list clearfix">
                                <li v-for="(menu,index) in $store.state.menu_items_info.footer_menus" :key="index" class="clearfix">
                                    <span v-if="index>0">, </span>
                                    <a v-if="menu.link_type==1" :href="menu.external_url" target="_blank">{{ menu.title_bn }}</a>
                                    <nuxt-link v-else :to="{ path: '/' + menu.slug_name }">{{ menu.title_bn }}</nuxt-link>
                                </li>
                            </ul>                            
                            <!-- <a target="_blank" href="#">ইউনিসেফ,</a>
                            <a target="_blank" href="#">ব্র্যাক,</a>
                            <a target="_blank" href="#">টেন মিনিট স্কুল,</a>
                            <a target="_blank" href="#">আলোকিত হৃদয় ফাউন্ডেশন,</a>
                            <a target="_blank" href="#">দূরবীন ফাউন্ডেশন,</a>
                            <a target="_blank" href="#">জাগো ফাউন্ডেশন,</a>
                            <a target="_blank" href="#">লাইট অফ হোপ,</a>
                            <a target="_blank" href="#">রুম টু রীড,</a>
                            <a target="_blank" href="#">সেভ দ্যা চিল্ড্রেন,</a>
                            <a target="_blank" href="#">টিচ্ আইটি</a> -->
                        </p>
                    </div>
                </div>
                <div class="clearfix visible-sm"></div>
                <div class="col-md-3 col-sm-6 d-flex align-items-end">
                    <div class="copyright-info pt-1 text-right" style="width:100%">
                        <p class="mb-0">কারিগরী সহায়তা :
                            <a href="https://www.orangebd.com" target="_blank">
                                <img src="~/assets/images/orange.png" alt="OrangeBD" class="footer-logo img-responsive align-top">
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!--USER TYPE REMOVE BUTTON-->
        <div class="init_user_type_btn" v-if="init_user_type_show">
            <span class="close_init_user" @click="remove_current_init_user"><i class="fa fa-times"></i></span>
            <span class="img" v-if="init_user_type==1">
                <img src="~/assets/images/student.png" />
            </span>
            <span class="img" v-else-if="init_user_type==2">
                <img src="~/assets/images/teacher.png" />
            </span>
            <span class="img" v-else-if="init_user_type==3">
                <img src="~/assets/images/mother.png" />
            </span>
        </div>
    </footer>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'FooterBlock',
    data(){
        return {
            init_user_type_show: false,
            init_user_type: ''
        }
    },
    mounted() {
        if(localStorage.getItem('init_user_type')!=null){
            this.init_user_type_show = true;
            this.init_user_type = localStorage.getItem('init_user_type');
        }
        
        if(this.$store.state.menu_items_info.footer_menus.length==0) this.load_menu_items();
    },
    methods: {
        ...mapActions({
            footerMenuList: 'menu_items_info/LOAD_FOOTER_MENUS',
        }),
        async load_menu_items(){
            let oauth_token = JSON.parse(localStorage.getItem('oauth_token'));

            // setup request data
            let request_data = {
                access_token: oauth_token.access_token
            }

            await this.footerMenuList(request_data);
        },
        feedback_request: function(){
            if(this.$route.name!=="feedback") this.$router.push('/feedback');
        },
        partner_auth_modal: function(){
            this.$parent.partner_auth_modal = true
        },
        remove_current_init_user: function(){
            localStorage.removeItem('init_user_type');
            this.init_user_type_show = false;
            this.$parent.init_modal_show = true;
        }
    }
}
</script>
<style scoped>
    .feedback_btn{
        position: fixed;
        display: inline-block;
        top: 45%;
        left: 0;
        width: 30px;
        transition: all 0.4s;
        transform: rotate(90deg);
        z-index: 10;
    }
    .feedback_btn > span{
        display: inline-block;
        width: 100px;
        text-align: center;
        padding: 5px;
        cursor: pointer;
        background-color: #ccc;
    }
    .feedback_btn.active > span {
        background-color: #ab2288;
        color: #fff;
    }
    .footer_top_block{
        position: relative;
        min-height: 70px;
        background-color: #eee;
        background-image: linear-gradient(to bottom, #fff, transparent);
    }
    .partner_btn_block{
        margin-top: -30px;
        margin-bottom: 20px;
        position: relative;
        text-align: center;
        transition: all 0.4s;
    }
    .partner_btn_block > label{
        font-size: 16px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        background-color: #892c85;
        color: #ffffff;
        padding: 5px 20px;
        border-radius: 25px 15px;
        cursor: pointer;
        transition: all 0.4s;
    }
    .partner_btn_block > label:hover{
        background-color: rebeccapurple;
        font-size: 18px;
    }
    .bottom_bg_overlay{
        position: absolute;
        bottom: -5px; left: 0; width: 100%;
    }
    .bottom_bg_overlay >>> img{
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    .pd-left-0 {
        padding-left: 0px !important;
    }
    .copyright-info a img.footer-logos {
        height: 30px;
        width: auto;
        padding: 0px 10px;
        border-right: 1px dashed #ccc;
    }
    .copyright-info p span{ display: block; font-weight: bold;}
    .copyright-info p a{ color:currentColor;}
    .copyright-info p a:hover{ text-decoration: underline;}
    .footer-menu-list{
        list-style: none; margin: 0; padding: 0;
    }
    .footer-menu-list >>> li{
        float: left;
    }
    .footer-menu-list >>> li span{
        float: left; margin-right: 5px;
    }
    .footer-menu-list >>> li a{
        float: left;
    }
    .init_user_type_btn{
        position: fixed;
        left: 10px; bottom: 10px;
        width: 50px; height: 50px;
        background-color: #ffffff;
        border: 1px solid #cccccc;
        border-radius: 50%;
    }
    .init_user_type_btn .img{
        width: 100%; height: 100%;
    }
    .init_user_type_btn >>> img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    .init_user_type_btn .close_init_user{
        position: absolute;
        right: -5px; top: -5px;
        width: 20px; height: 20px; line-height: 20px;
        text-align: center; cursor: pointer;
        color: #CD0000; font-size: 10px;
        background-color: #fff; border: 1px solid #CD0000;
        border-radius: 50%;
    }
    @media (max-width: 575.98px){
        .footer_top_block{ min-height:25px;}
    }

</style>