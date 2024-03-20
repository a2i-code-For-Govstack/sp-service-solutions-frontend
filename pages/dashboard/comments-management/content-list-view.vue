<template>
    <div class="content_list_view table-responsive">
        <div class="filter_option_block">
            <span>Filters</span>
            <ul>
                <li @click="filter_by_type('')">
                    <i v-if="$parent.sel_comment_type == ''" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>All</span>
                </li>
                <li @click="filter_by_type(1)">
                    <i v-if="$parent.sel_comment_type == 1" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Comments</span>
                </li>
                <li @click="filter_by_type(2)">
                    <i v-if="$parent.sel_comment_type == 2" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Feedbacks</span>
                </li>
                <li @click="filter_by_type(3)">
                    <i v-if="$parent.sel_comment_type == 3" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Suggestions</span>
                </li>
                <!-- <li @click="filter_by_type(4)">
                    <i v-if="$parent.sel_comment_type==4" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Complains</span>
                </li> -->
                <li @click="filter_by_type(10)">
                    <i v-if="$parent.sel_comment_type == 10" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Flag Report</span>
                </li>
            </ul>

            <span>&nbsp;</span>

            <ul>
                <li @click="filter_by_reply('')">
                    <i v-if="$parent.sel_comment_reply == ''" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>All</span>
                </li>
                <li @click="filter_by_reply(1)">
                    <i v-if="$parent.sel_comment_reply == 1" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Reply</span>
                </li>
                <li @click="filter_by_reply(2)">
                    <i v-if="$parent.sel_comment_reply == 2" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Not Answered</span>
                </li>
                <li class="date__field">
                    <input class="mr-1" type="date" v-model="start_date">
                    <input type="date" v-model="end_date">
                    <i @click="filter_by_date(start_date, end_date)" class="fa fa-search" style="padding:0px 6px"></i>
                </li>
            </ul>

            <!-- <ul>
                <li @click="device_info_show?device_info_show=false:device_info_show=true">
                    <i v-if="device_info_show" class="far fa-check-square"></i>
                    <i v-else class="far fa-square"></i>
                    <span class="ml-2">Device Info Show</span>
                </li>
            </ul> -->
            <ul>
                <li @click="filter_by_review(1)">
                    <i v-if="$parent.sel_review_status == 1" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Irrelevant</span>
                </li>

                <li @click="filter_by_review(2)">
                    <i v-if="$parent.sel_review_status == 2" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Important</span>
                </li>

                <li>
                    <!-- <select v-model="$parent.sel_review_status" @change="filter_by_review">
                        <option value="">Choose</option>
                        <option value="1">Re-elevant</option>
                        <option value="2">Important</option>
                    </select> -->
                </li>
            </ul>
        </div>
        <ReplyCommentBlock v-if="reply_popup_block" />
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th width="15%">Commenter Info</th>
                    <th width="40%">Comment Info</th>
                    <th v-if="device_info_show">Device Info</th>
                    <th style="text-align:center" width="80">Reply</th>
                    <th style="text-align:center" width="80">Status</th>
                    <th style="text-align:center" width="80">Review</th>
                    <!-- <th width="80"></th> -->
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length > 0">
                    <template v-for="(item, index) in data">
                        <tr :key="index" :class="{ green_row: item.comment_reply_info.length > 0 }">
                            <td align="center">{{ index + 1 }}</td>
                            <td>
                                <div v-if="item.comment_rel_info && item.comment_rel_info.user_name">Name: {{
                                    item.comment_rel_info.user_name }}</div>
                                <div v-if="item.comment_rel_info && item.comment_rel_info.user_email">
                                    <div>E-mail: {{ item.comment_rel_info.user_email }}</div>
                                    <div class="reply_email_btn" @click="reply_email(item)"><i
                                            class="fa fa-paper-plane"></i> Reply to mail</div>
                                </div>
                                <div v-if="item.comment_rel_info && item.comment_rel_info.contact_no">
                                    <div>Contact No: {{ item.comment_rel_info.contact_no }}</div>
                                    <div class="reply_sms_btn" @click="reply_sms(item)"><i class="fa fa-comment"></i> Reply
                                        to SMS</div>
                                </div>
                            </td>
                            <td>
                                <div>URL: <span v-if="item.comment_rel_info && item.comment_rel_info.url"><a
                                            :href="'//' + item.comment_rel_info.url" target="_blank">{{
                                                item.comment_rel_info.url.substring(0, 50) + ".." }}</a></span><span
                                        v-else><em>[
                                            Unknown ]</em></span></div>
                                <div v-if="item.comment_rel_info && getCommentTypeTitle[item.comment_rel_info.type_id]">
                                    <small>Type: {{ getCommentTypeTitle[item.comment_rel_info.type_id] }}</small>
                                </div>
                                <hr class="pt-1 pb-1 mt-1 mb-1" />
                                <CommentViewBlock :data="item.comment" />
                                <a :href="'https://polling-api.portal.gov.bd/storage/media-gallery/' + item.file"
                                    target="__blank" v-if="item.file">{{ item.file }}</a>
                                <hr class="pt-1 pb-1 mt-1 mb-1" />
                                <div align="right">
                                    <small>Created: {{ item.created_at }}</small>
                                </div>
                            </td>
                            <td v-if="device_info_show">
                                <div>IP: {{ item.ip_addr }}</div>
                                <div>Device Info: {{ item.device_info }}</div>
                            </td>
                            <td align="center">
                                <span class="status">
                                    <i
                                        :class="['far', 'fa-check-circle', { active: item.comment_reply_info.length > 0 }]"></i>
                                    <i v-if="item.comment_reply_info.length > 0" class="fa fa-eye active"
                                        @click="load_reply_list(item.comment_reply_info)"></i>
                                </span>
                            </td>
                            <td align="center">
                                <span class="status">
                                    <i :class="['far', 'fa-check-circle', { active: item.status }]"></i><br>
                                    <i v-if="item.comment_rel_info && item.comment_rel_info.flag_rpt_type_id"
                                        class="fa fa-flag flag_status"
                                        :title="item.comment_rel_info.flag_rpt_info.type_title"></i>
                                </span>
                            </td>

                            <td align="center">
                                <div v-if="item.comment_review_info !== null" class="review_btn"
                                    v-on:mouseover="mouseover(item)" v-on:mouseleave="mouseleave(item)">
                                    {{ item.comment_review_info?.review == 1 ? 'Irrelevant' : 'Important' }}
                                </div>
                                <div v-else class="reply_email_btn" @click="onload_review(item)">Review</div>
                            </td>
                            <!-- <td align="center">
                                <div class="action_block">
                                    <template v-if="($parent.$parent.$parent.role_access.edit_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.edit))">
                                        <span @click="edit_item(item.id)"><i class="fa fa-edit"></i></span>
                                    </template>
                                    <template v-if="($parent.$parent.$parent.role_access.delete_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.delete))">
                                        <span @click="del_item(item.id)"><i class="fa fa-trash-alt"></i></span>
                                    </template>
                                </div>
                            </td> -->
                        </tr>
                    </template>
                    <div v-if="rating_popup_form" class="alert_box_block">
                        <div class="content_box">
                            <span class="close_btn float-right" @click="close_popup">x</span>
                            <div class="action_btn_block">
                                <RatingForm v-if="rating_popup_form" />
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="7" align="center"><i class="fa fa-info-circle"></i> There is no data</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
import ReplyCommentBlock from './ReplyCommentBlock'
import CommentViewBlock from './CommentViewBlock'
import RatingForm from '/components/RatingForm.vue'
export default {
    name: 'ContentListView',
    props: ['data', 'content_loader'],
    components: {
        ReplyCommentBlock,
        CommentViewBlock,
        RatingForm
    },
    data() {
        return {
            rating_popup_form: false,
            alert_box_block: false,
            reply_comment_id: '',
            device_info_show: false,
            comment_reply_list: '',
            reply_popup_block: false,
            reply_comment_info: [],
            reply_media: '',
            review_by: '',
            filter_date: '',
            start_date: '',
            end_date: '',
        }
    },
    computed: {
        getCommentTypeTitle: function () {
            let obj = {}
            let getList = this.$store.state.comment_type_list
            for (var index in getList) {
                let v = getList[index]
                obj[v.id] = v.title;
            }
            return obj
        },

    },
    methods: {
        mouseover: function (data) {
            this.review_by = data.comment_review_info?.created_by_info?.user_info?.full_name;
        },
        mouseleave: function () {
            this.review_by = '';
        },
        onload_review(data) {
            this.reply_comment_id = data.comment_rel_info.comment_id;
            this.rating_popup_form = true;
        },
        load_reply_list: function (data) {
            this.reply_popup_block = true
            this.comment_reply_list = data
        },
        reply_email: function (obj) {
            this.reply_comment_info = obj
            this.reply_popup_block = true
            this.comment_reply_list = ''
            this.reply_media = 'email'
        },
        reply_sms: function (obj) {
            this.reply_comment_info = obj
            this.reply_popup_block = true
            this.comment_reply_list = ''
            this.reply_media = 'sms'
        },
        filter_by_reply: function (val) {
            if (this.$route.query.page) delete this.$route.query['page']

            if (val == '') {
                let query = Object.assign({}, this.$route.query);
                delete query['reply'];
                this.$router.replace({ query });
            } else {
                let obj = {}; obj['reply'] = val;
                this.$router.push({ query: Object.assign({}, this.$route.query, obj) });
            }
            this.$parent.sel_comment_reply = val
        },
        filter_by_type: function (val) {
            if (this.$route.query.page) delete this.$route.query['page']

            if (val == '') {
                let query = Object.assign({}, this.$route.query);
                delete query['type'];
                this.$router.replace({ query });
            } else {
                let obj = {}; obj['type'] = val;
                this.$router.push({ query: Object.assign({}, this.$route.query, obj) });
            }
            this.$parent.sel_comment_type = val
        },
        filter_by_review: function (val) {
            if (this.$route.query.page) delete this.$route.query['page']

            if (val == '') {
                let query = Object.assign({}, this.$route.query);
                delete query['review'];
                this.$router.replace({ query });
            } else {
                let obj = {}; obj['review'] = val;
                this.$router.push({ query: Object.assign({}, this.$route.query, obj) });
            }
            // this.$parent.sel_review_status = val
        },

        getPostDateFormat(d) {
            let date = new Date(d);
            let hours = date.getHours();
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${date.getFullYear()}-${date.getDate().toString().padStart(2, 0)}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
        },
        filter_by_date(start_date, end_date) {

            // var result = data.map(item => ({ date: item.created_at }));
            // var result = data.filter((item) => {
            //     return item.created_at.toLowerCase().includes(el)
            // });
            // this.$parent.load_data()
            this.$emit('dateFilter', { start_date: start_date, end_date: end_date });

        },
        edit_item: function (val) {
            this.$parent.edit_content_id = val
            this.$parent.add_new_entity(true)
            this.$parent.$parent.$parent.edit_route(val)
        },
        del_item: function (id) {
            if (confirm('Are you sure to delete it?')) {
                this.$axios.get('/api/comments/delete/' + id, this.$parent.header_config).then((response) => {
                    console.log('Get Data', response.data)
                    this.$swal("Good job!", "Data has been deleted successfully.", "success");
                    this.$parent.load_data();
                }).catch(e => {
                    console.log(e)
                    this.$toast.error('Failed!!!', { icon: "error_outline" })
                });
            }
        },
        close_popup() {
            this.reply_popup_block = false;
            this.reply_comment_info = [];
            this.rating_popup_form = false;
        }
    }
}
</script>
<style scoped>
.date__field{
    display: flex;
    align-items: center;
}
input[type=date]{
    width: 88px;
}
.alert_box_block {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #00000080;
    z-index: 999
}

.alert_box_block>.content_box {
    position: relative;
    background: #fff;
    border-radius: 5px;
    padding: 15px 25px;
    left: 25%;
    top: 35%;
    width: 50%;
    box-shadow: 0 0 5px #000;
}

.alert_box_block>.content_box>.action_btn_block {
    text-align: right;
    margin-top: 15px;
}

.review_btn {
    display: inline-block;
    padding: 2px 15px;
    margin: 5px 0;
    background-color: #882988;
    color: #ffffff;
    font-size: 11px;
    border-radius: 25px;
    transition: all 0.4s;
}

.close_btn {
    height: 20px;
    width: 20px;
    background: #000;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    font-weight: bold;
    cursor: pointer;
}

.filter_option_block {
    display: flex;
    height: 40px;
    border: 1px solid #ddd;
    background-color: #eee;
    margin-bottom: 15px;
    padding: 0 15px;
    border-radius: 3px;
}

.filter_option_block>span,
.filter_option_block>ul {
    align-self: center;
}

.filter_option_block>span {
    padding-right: 15px;
    color: #444;
    font-size: 14px;
    border-right: 1px solid #ccc;
}

.filter_option_block>ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: auto;
    height: 30px
}

.filter_option_block>ul>li {
    /* display: flex; */
    align-self: center;
    /* height: 100%; */
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    margin-left: 10px
}

.filter_option_block>ul>li>i,
.filter_option_block>ul>li>span {
    align-self: center;
}

.filter_option_block>ul>li>i {
    position: relative;
    font-size: 18px;
    top: 2px;
    color: #999
}

.content_list_view>table {
    border: 1px solid #ddd
}

.reply_email_btn,
.reply_sms_btn {
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

.reply_sms_btn {
    background-color: #5dad5d;
}

.status>i {
    font-size: 18px;
    color: #ccc
}

.status>i.active {
    color: #5dad5d
}

.flag_status {
    margin-top: 5px;
    color: #ff8e8e !important;
}

.action_block>span {
    display: inline-block;
    margin: 0 5px;
}

tr.green_row {
    background-color: #5dad5d40 !important
}

tr.green_row td {
    border-color: #33663340 !important
}
</style>