<template>
    <div class="login_user_info clearfix">
        <div class="img float-left">
            <img v-if="$store.state.auth_info.user_data.user_info.icon!==null" :src="$imageUrl('user-profile-icon' + '/' + $store.state.auth_info.user_data.user_info.icon)" />
            <img v-else-if="$store.state.auth_info.user_data.user_info.profile_photo!==null" :src="$imageUrl('user-profile-photo' + '/' + $store.state.auth_info.user_data.user_info.profile_photo)" />
            <img v-else src="~/assets/images/teacher.png" />
        </div>
        <div class="user_info float-left">
            <div v-if="$store.state.auth_info.user_data.partner_info" class="user_name">{{ $store.state.auth_info.user_data.partner_info.name }}</div>
            <div v-else-if="$store.state.auth_info.user_data.name" class="user_name">{{ $store.state.auth_info.user_data.name }}</div>
            <div class="action_btn">
                <span class="dashbaord_btn" @click="goto_dashboard($store.state.auth_info.user_data.type)">Dashboard</span>
                <span class="logout_btn" @click="user_logout">Logout</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'LoginUserInfoBlock',
    methods: {
        ...mapActions({            
            userLogout: 'auth_info/LOGOUT_REQ',
        }),
        goto_dashboard: function(user_type){
            if(user_type==2) this.$router.push('/partner');
            else if(user_type==1) this.$router.push('/admin');
        },
        user_logout: function(){
            localStorage.removeItem('user_info');
            this.userLogout();
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
    .login_user_info{
        max-width: 350px;
        padding: 5px 0;
    }
    .login_user_info .img{
        display: block;
        display: block;
        width: 50px;
        height: 50px;
        background-color: #eee;
        border-radius: 50%;
        overflow: hidden;
    }
    .login_user_info .img >>> img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 50%;
    }
    .login_user_info .user_info{
        display: block;
        width: calc(100% - 60px);
        margin-left: 10px;
    }
    .login_user_info .user_info .user_name{
        display: block; height: 20px; overflow: hidden;
        text-align: left;
    }
    .login_user_info .user_info .action_btn{
        text-align: left; margin-top: 5px;
    }
    .login_user_info .user_info .action_btn > span{
        display: inline-block; font-size: 10px;
        background-color: purple; color: #fff;
        border-radius: 15px 5px; padding: 2px 10px;
        cursor: pointer;
        transition: all 0.4s;
    }
    .login_user_info .user_info .action_btn > span.logout_btn{
        background-color: #006699; margin-left: 5px;
    }
    .login_user_info .user_info .action_btn > span:hover{
        background-color: rebeccapurple;
    }
</style>