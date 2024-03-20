<template>
        <div class="container clearfix">
            <div class="row">
    <div class="col-sm">
              <div class="login_user_block">
            <div class="container clearfix">
                <div class="img">
                    <img src="http://admin.muktopaath.gov.bd/public/images/initial/logo/5dee93d10f9f9.png" alt="User Photo" title="User Photo" />
                </div>
            </div><!--end .container-->
        </div><!--end .login_user_block-->
    </div>
    <div class="col-sm">
      <div  class="user_info" >
                    <div class="user_name"><h1 style="white-space: nowrap">Robi 10 Minute School</h1>
                    <p>রবি- টেন মিনিট স্কুল বাংলাদেশের সর্ববৃহৎ অনলাইন শিক্ষা প্রতিষ্ঠান, যেখানে প্রতিদিন প্রায় ১০ লক্ষ শিক্ষার্থীকে ওয়েবসাইট, ফেইসবুক ও অ‍্যাপের মাধ্যমে বিনামূল্যে শিক্ষা দান করা হয়।</p></div>
                    <div class="user_designation"></div>
                </div><!--end .user_info-->
    </div> 
    <div class="col-sm">
      <ul class="links" style="float: right;">
          <li><i class="fab fa-youtube" style="color: red"></i></li>
          <li><i class="fab fa-facebook-square" style="color: blue"></i></li>
          <li><i class="fab fa-twitter" style="color: blue"></i></li>
          <li><i class="fa fa-globe" style="color: blue"></i></li>
      </ul>
    </div>
  </div>

        <div class="container clearfix">
            <div class="left_block">
                <MainDashboardNav />
            </div><!--end .left_block-->

            <div class="right_block">
                <Breadcrumb v-if="$route.name!=='dashboard'" />
                <nuxt-child />
            </div><!--end .right_block-->
        </div><!--end .container-->
    </div><!--end #dashboard-->
</template>



<style scoped>
#dashboard{
        position: relative;
    }
    .user_info h1{
        color:#85144b;
        font-weight: bold;
    }
    .user_info p{
        color: #91238E;
    }
    #dashboard .banner_block{
        position: relative;
        width: 100%;
        height: 150px;
        overflow: hidden;
    }
    #dashboard .banner_block .mask_overlay{
        position: absolute;        
        bottom: 0;
        width: 100%;
        height: 100px;
        transition: all 0.4s;             
        background-image: linear-gradient(to top, #00000080, transparent);
    }
    #dashboard .banner_block >>> img{
        width: 100%;
        height: 100%;
        object-fit: cover
    }

    .links li{
        display: inline;;
    }
    .links li i{
        cursor: pointer;
         background-color: #F1F3F4;
 border-radius: 50%;
 border: 1x solid red;
 padding:10px;
    }
</style>