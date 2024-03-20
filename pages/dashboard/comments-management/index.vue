<template>
    <div class="tags_block_container">
        <template v-if="$store.state.add_new_status">
            <ContentEntryForm :edit_content_id="edit_content_id" />
        </template>

        <template v-else>
            <ContentList :data="contents" :content_loader="content_loader" @dateFilter="receivedDateFilter" />

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
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'TagsBlockContainer',
    components: {
        ContentEntryForm,
        ContentList
    },
    data() {
        return {
            content_loader: false,
            pagination_show: false,
            contents: [],
            edit_content_id: this.$route.query.id ? this.$route.query.id : null,
            pagination_config: {
                data: [],
                lang: 'en',
                align: 'center',
                action: ''
            },
            cur_page: (this.$route.query.page > 0 ? this.$route.query.page : 1),
            limit: 10,
            user_id: this.$store.state.auth_info.user_data.id,
            user_access_token: this.$store.state.auth_info.user_data.token,
            sel_comment_type: '',
            sel_comment_reply: '',
            sel_review_status: '',
            filter_start_date: '',
            filter_end_date: ''
        }
    },
    watch: {
        $route(to, from) {
            if (to.query.type) this.sel_comment_type = to.query.type
            if (to.query.reply) this.sel_comment_reply = to.query.reply
            if (to.query.review) this.sel_review_status = to.query.review
            this.load_data(to.query.page ? to.query.page : 1)
        },
        get_search_info: function () {
            this.load_data();
        },
        sel_comment_type: function () {
            this.load_data();
        },
        sel_comment_reply: function () {
            this.load_data();
        },
        filter_start_date: function () {
            this.load_data();
        },
        filter_end_date: function () {
            this.load_data();
        },

    },
    computed: {
        get_search_info: function () {
            return this.$store.state.search_keyword;
        },
        header_config() {
            let obj = {
                headers: {
                    'Authorization': 'Bearer ' + this.user_access_token,
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': this.user_access_token
                }
            };
            return obj;
        }
    },
    mounted() {
        if (this.$route.query.keyword) this.$parent.$parent.keyword = this.$route.query.keyword
        if (this.$route.query.type) this.sel_comment_type = this.$route.query.type
        if (this.$route.query.reply) this.sel_comment_reply = this.$route.query.reply
        if (this.$route.query.review) this.sel_review_status = this.$route.query.review
        this.load_data();
    },
    beforeDestroy() {
        this.$parent.$parent.keyword = ''
        let obj = {}
        this.$router.push({ path: this.$router.path, query: Object.assign({}, this.$route.query, obj) })
    },
    methods: {
        receivedDateFilter(data) {
            this.filter_start_date = data.start_date;
            this.filter_end_date = data.end_date;
            console.log('parent', data.start_date, data.end_date);
        },
        ...mapActions({
            commentSubmit: 'comment_info/DATA_SUBMIT'
        }),
        ...mapMutations({
            add_new_entity: 'ADD_NEW_STATUS',
            form_submit_state: 'FORM_SUBMIT_STATUS'
        }),
        async load_data(pg = this.cur_page) {
            let url = '/api/comments' + (this.limit > 0 ? '?limit=' + this.limit : '') + (pg > 1 ? '&page=' + pg : '') + (this.$parent.$parent.req_from_external_domain && localStorage.getItem('req_from') ? '&req_from=' + localStorage.getItem('req_from') : '') + (this.$parent.$parent.role_access.view_others == '0' ? '&own_result=true' : '') + (this.$route.query.keyword ? '&keyword=' + this.$route.query.keyword : '') + (this.sel_comment_type ? '&req_status=' + this.sel_comment_type : '') + (this.sel_comment_reply ? '&reply_status=' + this.sel_comment_reply : '') + (this.sel_review_status ? '&review_status=' + this.sel_review_status : '') + (this.filter_start_date ? '&filter_data_from=' + this.filter_start_date : '') + (this.filter_end_date ? '&filter_data_to=' + this.filter_end_date : '')

            this.content_loader = true
            this.pagination_show = false
            this.contents = [];
            this.$axios.get(url, this.header_config).then((response) => {
                console.log(response)
                if (response.data.data.length > 0) {
                    this.contents = response.data.data
                    this.pagination_config.data = response.data.meta
                    this.$parent.total_rows = this.pagination_config.data.total
                    this.pagination_show = true
                }
                this.content_loader = false
                this.cur_page = pg
            }).catch(e => {
                this.$toast.error('Failed!!!', { icon: "error_outline" })
                this.content_loader = false
            });
        }
    }
}
</script>
<style scoped></style>