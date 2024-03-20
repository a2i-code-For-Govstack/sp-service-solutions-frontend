<template>
    <div id="course_content_block" class="mt-3">
        <div class="tab_list">
            <span :class="[{'active':sel_tab_item==1}]" @click="sel_tab_item=1">শিক্ষার্থীর কোর্সসমূহ </span>
        </div>
        <div class="content_list mt-3">
            <div v-if="pre_loader">
                <div class="pre_loader">
                    <div class="row">
                        <div class="col-md-2" v-for="(n,i) in 6" :key="'list-' + i">
                            <FormBlockLoader :cols="1" :height="300" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="300" :r2_h="0" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div class="col-md-2" v-for="(item,index) in items" :key="index">
                    <CourseCardView :item="item" />
                </div>                

                <!-- <div v-for="(n,i) in 6" :key="i" class="col-md-2">
                    <div class="item">
                        <div class="content_img">                            
                           <a v-if="n==1" href="http://muktopaath.gov.bd/course-details/126"> <img src="~/assets/images/teacher/course1.jpeg" /> </a>
                           <a v-if="n==2" href="http://muktopaath.gov.bd/course-details/109"> <img src="~/assets/images/teacher/course2.jpg" /> </a>
                           <a v-if="n==3" href="http://muktopaath.gov.bd/course-details/156"> <img src="~/assets/images/teacher/course3.jpg" /> </a>
                           <a v-if="n==4" href="http://muktopaath.gov.bd/course-details/203"> <img src="~/assets/images/teacher/course4.jpg" /> </a>
                           <a v-if="n==5" href="http://muktopaath.gov.bd/course-details/202"> <img src="~/assets/images/teacher/course5.jpg" /> </a>
                           <a v-if="n==6" href="http://muktopaath.gov.bd/course-details/191"> <img src="~/assets/images/teacher/course6.jpg" /> </a>
                        </div>
                        <div class="content_title">
                            <img v-if="n==1" src="~/assets/images/Muktopaath-logo.png" />
                            <img v-if="n==2" src="~/assets/images/save-the-children.png" />
                            <img v-if="n==3" src="~/assets/images/save-the-children.png" />
                            <img v-if="n==4" src="~/assets/images/10-Min-School-logo.png" />
                            <img v-if="n==5" src="~/assets/images/10-Min-School-logo.png" />
                            <img v-if="n==6" src="~/assets/images/10-Min-School-logo.png" />
                            <p  v-if="n==1" class="content_for">(BTT) বেসিক টিচার্স ট্রেনিং কোর্স- ৫ম ব্যাচ</p>
                            <p  v-if="n==2" class="content_for">নিউমেরেসি বুস্ট অনলাইন প্রশিক্ষণ কোর্স</p>
                            <p  v-if="n==3" class="content_for">পড়তে শেখার নির্দেশনা</p>
                            <p  v-if="n==4" class="content_for">English Fundamentals</p>
                            <p  v-if="n==5" class="content_for">Writing Masterclass</p>
                            <p  v-if="n==6" class="content_for">Business English</p>

                        </div>
                    </div>
                </div> -->
            </div>

            <div class="more_btn_block">
                <nuxt-link :to="{ path: '/all-courses?for_student=1' }"><i class="fa fa-link"></i> শিক্ষার্থীর সব কোর্সসমূহ <i class="fa fa-angle-right"></i></nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import CourseCardView from '~/components/content_display/CourseCardView'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'CourseContentBlockStudent',
    components: {
        CourseCardView
    },
    data(){
        return {
            pre_loader: false,
            items: [],
            sel_tab_item: 1,
            limit: 6
        }
    },
    mounted(){
        this.load_content();
    },
    methods: {
        ...mapActions({
            courseList: 'course_info/GET_DATA'
        }),        
        async load_content(){
            var url = '/api/load-course/' + this.limit + '?for_student=1';
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));

            this.pre_loader = true

            this.$axios.get(url,{
                headers: {
                    'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log('Get Course data',response.data)
                this.items = response.data.data                
                this.pre_loader = false
            });
        }
    }
}
</script>
<style scoped>
    #course_content_block{
        padding: 0px 0 0 0px;
    }
    .tab_list{
        font-size: 20px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        border-bottom: 3px solid #ddd;
    }
    .tab_list > span{
        display: inline-block;
        padding-bottom: 10px;
        cursor: pointer;
        position: all 0.4s;
    }
    .tab_list > span:hover,
    .tab_list > span.active{
        color: purple;
        border-bottom: 3px solid purple;
        margin-bottom: -3px;
    }
    .tab_list > span i{
        margin-right: 5px;
    }
    .content_list .content_img{
        display: block;
        position: relative;
        height: 120px;
        background-color: #ccc;
    }
    .content_list .content_img .overlap{
        position: absolute;
        background-color: #00000080;
        width: 100%; height: 100%;
        z-index: 1;
    }
    .content_list .content_img .icon{
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
    .content_list .content_img .icon:before{
        top: -11px;
        left: -11px;
        width: 30px;
        height: 30px;
        border: 1px solid #f7971d;
        border-radius: 50%;
        background: #f7971d80;
        animation: circle 1.3s ease-out infinite;
    }
    .content_list .content_img >>> img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    .content_list .content_title{
        margin-top: 5px;
        border-left: 2px solid #ddd; padding-left: 8px
    }
    .content_list .content_title img{max-height: 40px;margin-bottom: 5px;}

    .more_btn_block{
        text-align: right;
        border-bottom: 10px solid #efefef;
        position: relative;
        margin: 25px 0 0 0;
    }
    .more_btn_block > a{
        position: absolute;
        right: 0;
        top: -15px;
        background-color: #fff;
        display: inline-block;
        padding: 5px 0px 5px 15px;
        font-size: 20px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        border-radius: 50px;
        color: purple;
        transition: all 0.4s;
    }
    .more_btn_block > a:hover{
        color: #006699;
    }

    @keyframes circle{0%{opacity:1;transform:scale(.2)}to{opacity:0;transform:scale(1.8)}}

    @media (max-width: 575.98px) {
        .content_list .content_img{
            height: 150px;
        }
    }
</style>