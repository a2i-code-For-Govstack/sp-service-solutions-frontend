<template>
    <div class="explain_comment_list_block">
        <div class="black_mask_overlay"></div>
        <div class="content">
            <span class="close_btn" @click="$parent.close_popup()">x</span>
            <label><i class="far fa-comments"></i> Polling comments</label>
            <TableContentLoader v-if="content_loader" :cols="5" />
            <div v-else-if="contents.length>0" class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th width="5%">sl</th>
                            <th width="70%">Comment</th>                            
                            <th width="25%">Date Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in contents" :key="index">
                            <td>{{ (index+1) }}</td>
                            <td>
                                <div v-html="item.comments"></div>
                            </td>
                            <td>{{ item.created_at }}</td>
                        </tr>
                    </tbody>
                </table>                    
            </div>
            <div v-else class="pt-4 pb-4" align="center">
                <div><i class="fa fa-box-open fa-4x"></i></div>
                <div class="p-2">Empty</div>
            </div>

            <div v-if="pagination_show" class="row mt-3">
                <div class="col-md-12 mb-3" align="center">
                    <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
                </div>
                <div class="col-md-12">
                    <Pagination :config="pagination_config" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ExplainCommentListBlock',
    props: ['poll_id','poll_option_id'],
    data(){
        return {
            content_loader: false,
            pagination_show: false,
            contents: [],
            pagination_config: {
                data: [],
                lang: 'en',
                align: 'center',
                action: this.load_data
            },
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            limit: 10
        }
    },
    mounted(){
        this.load_data();
    },
    methods: {
        async load_data(pg=this.cur_page){
            let url = '/api/explain-comment-list?poll_id='+ this.poll_id +'&poll_option_id='+ this.poll_option_id + (this.limit>0?'&limit=' + this.limit:'') + (pg>1?'&page=' + pg:'');

            this.content_loader = true
            this.pagination_show = false
            this.contents = [];
            this.$http.$get(url, this.$parent.$parent.header_config).then( (response) => {
                console.log(response)
                if(response.data.length>0){
                    this.contents = response.data
                    this.pagination_config.data = response.meta
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
<style scoped>
    .explain_comment_list_block{
        position: fixed;
        width: 100%; height: 100%;
        left: 0; top: 0;
        padding-bottom: 25px;
        overflow-y: auto;
        z-index: 998;
    }
    .black_mask_overlay{
        position: fixed;
        left: 0; bottom: 0;
        width: 100%; height: 100%;
        /* background-image: linear-gradient(to top, #000000cc, transparent); */
        background-color: #00000099;
        z-index: 999;
    }
    .content{
        position: relative;
        background-color: #ffffff;        
        width: 60%;
        left: 20%;
        top: 10%;
        padding: 15px;
        min-height: 100px;
        border-radius: 5px 5px 0 0;
        box-shadow: 0 0 15px #000;        
        z-index: 1000;
    }
    .content > label{
        font-size: 18px;
        /* font-weight: bold; */
        color: #444;
    }
    .close_btn{
        position: absolute;
        background-color: #ffffff;
        right: -10px; top: -10px;
        width: 30px; height: 30px;
        line-height: 30px; text-align: center;
        border-radius: 50%; box-shadow: 0 0 5px #666;
        cursor: pointer;
    }
</style>