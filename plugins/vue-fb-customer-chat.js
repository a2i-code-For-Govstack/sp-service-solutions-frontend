import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

Vue.use(VueFbCustomerChat, {
  page_id: 113296347017041, //  change 'null' to your Facebook Page ID,
  theme_color: '#35ce64', // theme color in HEX
  locale: 'en_US', // default 'en_US'
})