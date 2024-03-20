<template>
  <div>
    <div v-if="pre_loader">
      <div class="init_loader">
        <SpinkitLoader />
      </div>
    </div>
    <div v-else>
      <nuxt />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { createSEOMeta } from "@/utils/seo";
export default {
  name: 'DefaultLayout',
  head(){    
    return {
      title: this.siteTitle,
      meta: createSEOMeta(this.metaContent),
      link: [{ rel: "canonical", href: process.env.BASE_URL + this.$route.fullPath}],
    }
  },
  data(){
    return {
      pre_loader: true
    }
  },
  watch: {
    siteTitle: function(val){}
  },
  computed: {
    siteTitle: function(){
      if(this.$route.name=='opinion-poll') return this.$store.state.opinion_polls_info.get_data.poll_title
      else if(this.$store.state.site_basic_config_data.website_title) return this.$store.state.site_basic_config_data.website_title
      else return process.env.APP_NAME + ' | Home Page'
    },
    metaContent: function(){
      let obj = {}
      if(this.$route.name=='opinion-poll') {
        const { poll_title, description, cover_photo } = this.$store.state.opinion_polls_info.get_data        
        obj = {
            title: poll_title,
            description: description,            
            image: cover_photo?cover_photo:'',
            url: process.env.BASE_URL + this.$route.fullPath
        }
      }else{
        obj = {
            title: this.siteTitle,
            description: this.$store.state.site_basic_config_data?this.$store.state.site_basic_config_data.website_desc:'',
            keywords: this.$store.state.site_basic_config_data?this.$store.state.site_basic_config_data.meta_keywords:'',
            image: process.env.BASE_URL + '/_ipx/logo.png',
            url: process.env.BASE_URL + this.$route.fullPath 
        }
      }

      return obj
    }
  },
  mounted(){
    this.initial_load();    
  },
  methods: {
    ...mapActions({
        getOauthToken: 'oauth_token/GET_TOKEN_INFO',
        getUserInfo: 'auth_info/GET_USER_INFO'
    }),
    async initial_load(){
      // Oauth token check
      if($nuxt.isOnline && localStorage.getItem('oauth_token') == null){
          await this.getOauthToken()
          // console.log('C T')
          if(this.$store.state.oauth_token.data[0]!==undefined){
              let oauth_token = this.$store.state.oauth_token.data[0]
              localStorage.setItem('oauth_token', JSON.stringify(oauth_token))
          }
      }else{
          let oauth_token = JSON.parse(localStorage.getItem('oauth_token'));

          // Overrides `Authorization` header with new value
          this.$axios.setHeader('Authorization', oauth_token.token_type + ' ' + oauth_token.access_token)

          // Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
          this.$axios.setHeader('Content-Type', 'application/json', ['post'])          
      }

      // call for get job seeker info
      if(this.$store.state.auth_info.user_data.length==0) await this.getUserInfo()
      
      this.pre_loader = false;
    }
  }
}
</script>
<style scoped>
  .init_loader{
    position: fixed;
    top:0; left: 0;
    width: 100%;
    height: 100%;
    padding: 10% 0;
    background-color: #eeeeee;
  }
</style>
