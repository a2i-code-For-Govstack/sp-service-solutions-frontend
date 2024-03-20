<template>
  <div class="main-block">    
    <div v-if="loggedIn || loginStatus" class="container">
      <div v-if="$store.state.auth_info.loggedIn && $store.state.auth_info.user_data">
        <AdminBlock />
      </div>
      <div v-else>
        <SpinkitDoubleBounceLoader />
      </div>
    </div>
    <div v-else>
      <LoginForm :base_path='base_path' />
    </div>
  </div>
</template>

<script>
  import AdminBlock from './dashboard'
  import LoginForm from './dashboard/login-form'
  export default {
    name: 'MainBlock',
    scrollToTop: true,
    components: {
      AdminBlock,
      LoginForm
    },
    data(){
      return {
        loggedIn: true,
        base_path: 'dashboard',
        advance_srch_modal: false
      }
    },
    computed: {
        loginStatus: function(){
            if(this.$store.state.auth_info.loggedIn) return true
            else return false
        }
    },
    mounted(){
        if(localStorage.getItem('user_info') == null) this.loggedIn = false
        else this.loggedIn = true

        if(this.loggedIn && this.loginStatus && this.$route.name=='index') this.$router.push('/dashboard')
    }
  }
</script>

<style scoped>
</style>
