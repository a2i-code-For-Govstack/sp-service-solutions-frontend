<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <div class="main-logo">
                        <a href="/"><Logo /></a>
                    </div>
                </div>

                <div class="col-3">
                </div>

                <div class="col-2">
                    <div class="student-login-btn">
                       <i class="fa fa-user-graduate"></i> শিক্ষার্থী
                    </div>
                </div>
                <div class="col-2">
                    <div class="teacher-login-btn">
                        <i class="fa fa-user-tie"></i> শিক্ষক
                    </div>
                </div>
                <div class="col-2">
                    <div class="guardian-login-btn">
                        <i class="fa fa-user-secret"></i> অভিভাবক
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import Logo from '~/components/Logo'
export default {
    name: 'HeaderBlock',
    components:{
        Logo
    }
}
</script>
<style scoped>
    header{
        display: block;
        background-color: #ffffff;
        height: 60px;
        box-shadow: 0 0 5px #333333;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }
    .container,.row,.main-logo{
        height: 100%;
    }
    .student-login-btn,
    .teacher-login-btn,
    .guardian-login-btn{
        display: block;        
        position: relative;
        padding: 10px 15px;
        border-radius: 15px 5px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        margin-top: 6px;
        cursor: pointer;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
    }
    .student-login-btn i,
    .teacher-login-btn i,
    .guardian-login-btn i{
        position: absolute;
        left: -20px;
        bottom: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        border-radius: 50%;        
    }
    .student-login-btn{
        background-color: purple;
    }
    .student-login-btn:hover{
        background-color: indianred;
    }
    .student-login-btn i{
        color: purple;
        border: 1px solid purple;
    }
    .student-login-btn:hover i{
        color: indianred;
        border: 1px solid indianred;
    } 
    .teacher-login-btn{
        background-color: green;
    }
    .teacher-login-btn:hover{
        background-color: lightcoral;
    }
    .teacher-login-btn i{
        color: green;
        border: 1px solid green;
    }
    .teacher-login-btn:hover i{
        color: lightcoral;
        border: 1px solid lightcoral;
    }
    .guardian-login-btn{
        background-color: #006699;
    }
    .guardian-login-btn:hover{
        background-color: lightcoral;
    }
    .guardian-login-btn i{
        color: #006699;
        border: 1px solid #006699;
    }
    .guardian-login-btn:hover i{
        color: lightcoral;
        border: 1px solid lightcoral;
    }
</style>