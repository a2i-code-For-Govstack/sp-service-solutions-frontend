<template>
    <div class="content_list_view table-responsive">
        <div class="filter_option_block">
            <span>Filters</span>
            <ul>
                <li @click="filter_by_type('')">
                    <i v-if="$parent.sel_polling_type==''" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>All</span>
                </li>
                <li @click="filter_by_type(1)">
                    <i v-if="$parent.sel_polling_type==1" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Ongoing</span>
                </li>
                <li @click="filter_by_type(2)">
                    <i v-if="$parent.sel_polling_type==2" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Completed</span>
                </li>
            </ul>
        </div>
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Options</th>
                    <th nowrap>Total Votes</th>
                    <th width="20%">Info</th>
                    <th style="text-align:center" width="80">Status</th>
                    <th width="80"></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length>0">
                    <tr v-for="(item,index) in data" :key="index">
                        <td align="center">{{ index+1 }}</td>
                        <td width="20%">{{ item.poll_title }}</td>
                        <td width="25%">
                            <!-- <div v-html="item.description"></div> -->
                            <template v-if="item.description">
                                <read-more more-str="Read more" :text="item.description" less-str="Read less" :max-chars="250"></read-more>
                            </template>
                        </td>
                        <td width="35%">
                            <div class="option_block" v-for="(option_item,option_index) in item.poll_options" :key="'opt-'+option_index">
                                <div class="img">
                                    <img v-if="option_item.option_photo_info && option_item.option_photo_info.content" :src="option_item.option_photo_info.content" />
                                    <i v-else class="fa fa-image"></i>
                                </div>
                                <div class="option_title">
                                    <div>
                                        <span>{{ option_item.option_title }}</span>
                                        <small v-if="item.total_votes>0 && option_item.option_result">({{ ((option_item.option_result.votes*100)/item.total_votes).toFixed(2) }}%)</small>
                                        <span v-if="option_item.req_explain" class="explain_btn pl-2" @click="get_explain_list(option_item)"><i class="fa fa-eye" title="Explain List"></i></span>
                                    </div>
                                    <div v-if="item.total_votes>0 && option_item.option_result" class="votes">
                                        <span class="progress" :style="{width: (((option_item.option_result.votes*100)/item.total_votes)).toFixed(2) + '%'}"></span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td align="center">{{ item.total_votes }}</td>
                        <td>
                            <div>Category: <span v-if="item.cat_info">{{ item.cat_info.category_name }}</span><span v-else><em>[Not Provided]</em></span></div>
                            <div class="domain_list_block">Domain: <template v-if="item.domain_info.length>0 && item.domain_info[0].sub_domain">
                                <span v-for="(dv,di) in item.domain_info" :key="'domain-' + di">{{ dv.sub_domain }}</span>
                            </template><span v-else><em>[Not Provided]</em></span></div>
                            <div class="domain_list_block">Group Domain: <template v-if="item.domain_group_info.length>0 && (item.domain_info.length==0 || !item.domain_info[0].sub_domain)">
                                <span v-for="(dv,di) in item.domain_group_info" :key="'domain-group-' + di">{{ dv.group_title }}</span>
                            </template><span v-else><em>[Not Provided]</em></span></div>
                            <!-- <div>Type: <span v-if="item.type">Schedule</span><span v-else>Open</span></div> -->
                            <div v-if="item.type">
                                <div>Start: {{ item.start_time | luxon:format('dd MMMM, yyyy - hh:mm a') }}</div>
                                <div>End: {{ item.end_time | luxon:format('dd MMMM, yyyy - hh:mm a') }}</div>
                            </div>
                        </td>
                        <td align="center">
                            <span class="status">
                                <i :class="['far','fa-check-circle',{active:item.status}]"></i>
                            </span>
                        </td>
                        <td nowrap align="center">
                            <div class="action_block">
                                <template v-if="($parent.$parent.$parent.role_access.edit_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.edit))">
                                    <span @click="edit_item(item.id)"><i class="fa fa-edit"></i></span>
                                </template>
                                <a :href="`http://polling.portal.gov.bd/opinion-poll?id=${item.id}&host=bangladesh.gov.bd`" target="_blank"><i class="fa fa-external-link-alt"></i></a>
                                <!-- <template v-if="($parent.$parent.$parent.role_access.delete_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.delete))">
                                    <span @click="del_item(item.id)"><i class="fa fa-trash-alt"></i></span>
                                </template> -->
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr><td colspan="8" align="center"><i class="fa fa-info-circle"></i> There is no data</td></tr>
                </template>
            </tbody>
        </table>

        <ExplainCommentList :poll_id="sel_poll_id" :poll_option_id="sel_poll_option_id" v-if="explain_list_view" />
    </div>
</template>
<script>
import ExplainCommentList from './ExplainCommentList'
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    components: {        
        ExplainCommentList
    },
    data(){
        return {
            sel_poll_id: '',
            sel_poll_option_id: '',
            explain_list_view: false            
        }
    },    
    methods: {
        filter_by_type: function(val){
            if(this.$route.query.page) delete this.$route.query['page']

            if(val==''){
                let query = Object.assign({}, this.$route.query);
                delete query['type'];
                this.$router.replace({ query });
            }else{
                let obj = {}; obj['type'] = val;
                this.$router.push({ query: Object.assign({}, this.$route.query, obj) });
            }
            this.$parent.sel_polling_type = val
        },
        edit_item: function(val){
            this.$parent.edit_content_id = val
            this.$parent.add_new_entity(true)
            this.$parent.$parent.$parent.edit_route(val)
        },
        del_item: function(id){
            if(confirm('Are you sure to delete it?')){
                this.$axios.get('/api/opinion-polls/delete/' + id, this.$parent.header_config).then( (response) => {
                    console.log('Get Data', response.data)
                    this.$swal("Good job!", "Data has been deleted successfully.", "success");
                    this.$parent.load_data();
                }).catch(e => {
                    console.log(e)
                    this.$toast.error('Failed!!!', {icon: "error_outline"})                
                });
            }
        },
        get_explain_list: function(data){
            this.explain_list_view = true
            this.sel_poll_id = data.poll_id
            this.sel_poll_option_id = data.id
        },
        close_popup(){
            this.explain_list_view = false            
        }
    }
}
</script>
<style scoped>
    .filter_option_block{
        display: flex;
        height: 40px;
        border: 1px solid #ddd;
        background-color: #eee;
        margin-bottom: 15px;
        padding: 0 15px;
        border-radius: 3px;
    }
    .filter_option_block > span,
    .filter_option_block > ul{
        align-self: center;
    }
    .filter_option_block > span{
        padding-right: 15px; color: #444; font-size: 14px; border-right: 1px solid #ccc;
    }
    .filter_option_block > ul{
        display: flex;        
        list-style: none;
        margin: 0; padding: 0;
        margin-left: auto;
        height: 30px
    }
    .filter_option_block > ul > li{
        /* display: flex; */
        align-self: center;
        /* height: 100%; */
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        margin-left: 10px
    }
    .filter_option_block > ul > li > i,
    .filter_option_block > ul > li > span{
        align-self: center;
    }
    .filter_option_block > ul > li > i{
        position: relative; font-size: 18px; top: 2px; color: #999
    }
    .content_list_view > table{
        border: 1px solid #ddd
    }
    .option_block{
        display: flex;
        margin-bottom: 10px;
        width: 100%;
    }
    .option_block > div{
        align-self: center;        
    }
    .option_block:last-child{
        margin-bottom: 0;
    }
    .option_block > div.img{
        display: inline-block;
        width: 36px;
        height: 36px;
        line-height: 34px;
        background-color: #fff;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #ddd;
        margin-right: 8px;
        overflow: hidden;
    }
    .option_block > div.img > img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    .option_block > div.img > i{
        color: #bbb;
    }
    .option_title > div{
        display: flex;
    }
    .option_title > div > span,
    .option_title > div > small{
        align-self: center;
    }
    .option_title > div > .explain_btn{
        cursor: pointer;
        margin-left: auto;
        color: #999;
        transition: all 0.4s;
    }
    .option_title > div > .explain_btn:hover{
        color: purple;
    }
    .option_title > .votes{
        display: inline-block; position: relative;
        width: 150px; height: 10px;
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 25px;
        overflow: hidden;
    }
    .option_title > .votes > .progress{
        position: absolute; left: 0; top: 0;
        background-image: linear-gradient(to right, purple, darkorange);
        height: 100%;
    }
    .domain_list_block >>> span{
        display: inline-block;
        padding: 1px 10px; font-size: 12px; background-color: #ddd;
        margin: 0 5px 5px 0; border: 1px solid #ccc; border-radius: 25px;
    }
    .status > i{
        font-size: 18px;
        color: #ccc
    }
    .status > i.active{
        color: #5dad5d
    }
    .action_block > span{
        display: inline-block;
        margin: 0 5px;
    }
</style>