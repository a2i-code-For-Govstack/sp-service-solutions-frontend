<template>
    <div class="PollListBlock">
        <template v-if="$store.state.add_new_status">
            <ContentEntryForm :edit_content_id="edit_content_id" />
        </template>

        <template v-else>
            <ContentList :data="contents" :content_loader="content_loader" />
            
            <div v-if="pagination_show" class="row mt-3">
                <div class="col-md-12 mb-3" align="center">
                    <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
                </div>
                <div class="col-md-12">
                    <Pagination :config="pagination_config" />
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import ContentEntryForm from './content-entry-form'
import ContentList from './content-list-view'
export default {
    name: 'PollListBlock',
    components: {
        ContentEntryForm,
        ContentList
    },
    data(){
        return {
            content_loader: false,
            pagination_show: false,
            contents: [],
            edit_content_id: this.$route.query.id?parseInt(this.$route.query.id):null,
            domain_info: [],            
            pagination_config: {
                data: [],
                lang: 'en',
                align: 'center',
                action: ''
            },
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            limit: 10
        }
    },
    computed: {
        header_config (){
            let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            let obj = {
                headers: {
                    'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getTokenType.access_token
                }
            };
            return obj;
        }
    },
    watch: {
        $route(to, from){
            if(!this.$store.state.add_new_status){
                this.load_data(to.query.page?to.query.page:1);
            }
        }
    },
    mounted(){
        if(!this.$store.state.add_new_status){
            this.load_domain_info();
            this.load_data();
        }
    },
    methods: {
        async load_domain_info(){
            let url = '/api/load-domain-info';

            let data = {
                req_from: this.$route.query.req_from
            }
            
            this.domain_info = [];
            this.$axios.post(url, data, this.header_config).then( (response) => {
                console.log(response)
                this.domain_info = response.data.data
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "domain_info_error_outline"})
            });
        },
        async load_data(pg=this.cur_page){
            let url = '/api/load-opinion-polls'+ (this.limit>0?'?limit=' + this.limit:'') + (pg>1?'&page=' + pg:'');

            let data = {
                req_from: this.$route.query.req_from,
                app_id: this.$route.query.app_id,
                secret_key: this.$route.query.secret_key
            }

            if(data.req_from=='' || data.app_id=='' || data.secret_key=='') return false

            this.content_loader = true
            this.pagination_show = false
            this.contents = [];
            this.$axios.post(url, data, this.header_config).then( (response) => {
                console.log(response)
                if(response.data && response.data.status==2){
                    this.$parent.$parent.access = false
                }else if(response.data && response.data.data.length>0){
                    this.contents = response.data.data
                    this.pagination_config.data = response.data.meta
                    this.$parent.total_rows = this.pagination_config.data.total
                    this.pagination_show = true                    
                }
                
                this.content_loader = false                
                this.cur_page = pg
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.content_loader = false
            });
        }
    }
}
</script>