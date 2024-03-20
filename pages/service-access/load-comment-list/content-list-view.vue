<template>
    <div class="content_list_view table-responsive">
        <ReplyCommentBlock v-if="reply_popup_block" />
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th width="15%">Commenter Info</th>
                    <th width="40%">Comment Info</th>
                    <th>Device Info</th>                    
                    <th style="text-align:center" width="80">Reply</th>
                    <th style="text-align:center" width="80">Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length>0">
                    <tr v-for="(item,index) in data" :key="index">
                        <td align="center">{{ index+1 }}</td>
                        <td>
                            <div v-if="item.comment_rel_info && item.comment_rel_info.user_name">Name: {{ item.comment_rel_info.user_name }}</div>
                            <div v-if="item.comment_rel_info && item.comment_rel_info.user_email">
                                <div>E-mail: {{ item.comment_rel_info.user_email }}</div>
                                <div class="reply_email_btn" @click="reply_email(item)"><i class="fa fa-paper-plane"></i> Reply to mail</div>
                            </div>
                            <div v-if="item.comment_rel_info && item.comment_rel_info.contact_no">Contact No: {{ item.comment_rel_info.contact_no }}</div>
                        </td>
                        <td>
                            <div>URL: <span v-if="item.comment_rel_info && item.comment_rel_info.url"><a :href="'//' + item.comment_rel_info.url" target="_blank">{{ item.comment_rel_info.url }}</a></span><span v-else><em>[ Unknown ]</em></span></div>
                            <hr class="p-1 m-1" />
                            <div v-html="item.comment"></div>
                        </td>
                        <td>
                            <div>IP: {{ item.ip_addr }}</div>
                            <div>Device Info: {{ item.device_info }}</div>
                        </td>
                        <td align="center">
                            <span class="status">
                                <i :class="['far','fa-check-circle',{active:item.comment_reply_info.length>0}]"></i><br>
                                <i v-if="item.comment_reply_info.length>0" class="fa fa-eye" @click="load_reply_list(item.comment_reply_info)"></i>
                            </span>
                        </td>
                        <td align="center">
                            <span class="status">
                                <i :class="['far','fa-check-circle',{active:item.status}]"></i><br>
                                <i v-if="item.comment_rel_info && item.comment_rel_info.flag_rpt_type_id" class="fa fa-flag flag_status" :title="item.comment_rel_info.flag_rpt_info.type_title"></i>
                            </span>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr><td colspan="6" align="center"><i class="fa fa-info-circle"></i> There is no data</td></tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
import ReplyCommentBlock from './ReplyCommentBlock'
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    components: {
        ReplyCommentBlock
    },
    data(){
        return {
            comment_reply_list: '',
            reply_popup_block: false,
            reply_comment_info: []
        }
    },
    methods: {
        load_reply_list: function(data){
            this.reply_popup_block = true
            this.comment_reply_list = data
        },
        reply_email: function(obj){
            this.reply_comment_info = obj
            this.reply_popup_block = true
        },
        close_popup(){
            this.reply_popup_block = false
            this.reply_comment_info = []
        }
    }
}
</script>
<style scoped>
    .content_list_view > table{
        border: 1px solid #ddd
    }
    .reply_email_btn{
        display: inline-block;
        padding: 2px 15px;
        margin: 5px 0;
        background-color: #882988;
        color: #ffffff;
        font-size: 11px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.4s;
    }
    .status > i{
        font-size: 18px;
        color: #ccc
    }
    .status > i.active{
        color: #5dad5d
    }
    .flag_status{
        margin-top: 5px;
        color: #ff8e8e !important;
    }
    .action_block > span{
        display: inline-block;
        margin: 0 5px;
    }
</style>