<template>
    <div class="social_share_btn_block">
        <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :style="{backgroundColor: network.color}"
            :url="sharing.url"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
        >
            <i :class="network.icon"></i>
            <span>{{ network.name }}</span>
        </ShareNetwork>
        <!-- <div class="list">
            <div @click="social_share('fb')">
                <i class="fab fa-facebook-f"></i>
                <span>facebook</span>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "SocialShareBtnBlock",
    props: ['data'],
    data () {
        return {
            sharing: {
                url: `http://polling.portal.gov.bd/opinion-poll?id=` + this.data.id + '&host=' + this.$route.query.req_from,
                title: this.data.poll_title,
                quote: this.data.poll_description,
                hashtags: 'opinion,poll',
                twitterUser: 'BangladeshGov'
            },
            networks: [
                // { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
                // { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
                // { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
                // { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
                { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
                // { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
                // { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
                // { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
                // { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
                // { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
                { network: 'messenger', name: 'Messenger', icon: 'fab fah fa-lg fa-facebook-messenger', color: '#0084ff' },
                // { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
                // { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
                // { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
                // { network: 'quora', name: 'Quora', icon: 'fab fah fa-lg fa-quora', color: '#a82400' },
                // { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
                { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
                // { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
                // { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
                // { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
                // { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
                { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
                // { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
                // { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
                // { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
                { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
                // { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
                // { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
                // { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' }
            ]
        }
    },
    methods: {
        social_share: function(type){
            let url = ''
            if(type=='fb'){
                url = 'https://www.facebook.com/sharer.php?t=' + encodeURIComponent(this.sharing.title) + '&u=' + encodeURIComponent(this.sharing.url)
                // alert(url)                
            }else if(type=='twitter'){
                url = 'http://twitter.com/share?text='+ encodeURIComponent(this.data.product_title) +'&url='+ encodeURIComponent(process.env.BASE_URL + this.$route.fullPath) + (this.data.tag_info.length>0?'&hashtags=' + this.data.tag_info[0].tag_title:'')
            }

            window.open (url,'','width=500, height=500, scrollbars=yes, resizable=no');
        }
    }
}
</script>
<style scoped>
    .social_share_btn_block >>> a{
        display: inline-block;
        margin-left: 7px;
        margin-bottom: 7px;
        border-radius: 3px;
        color: #fff
    }
    .social_share_btn_block >>> a:first-child{
        margin-left: 0
    }
    .social_share_btn_block >>> a > i{
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        border-right: 1px solid #ddd;
    }
    .social_share_btn_block >>> a > span{
        display: inline-block;
        padding: 0 10px 0 5px;
        line-height: 30px;
    }
</style>