<template>
    <div class="content_list_view table-responsive">
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Icon</th>
                    <th style="text-align:center" width="80">Status</th>
                    <th width="80"></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length>0">
                    <template v-for="(item,index) in data">
                        <DataListView :item="item" :child_sign="''" :sl="index+1" :key="'c-' + index" />
                        <template v-if="item.sub_categories && item.sub_categories.length>0">
                            <template v-for="(sub_item,sub_index) in item.sub_categories">
                                <DataListView :item="sub_item" :sl="''" :child_sign="'---'" :key="'sc-' + index + '-' + sub_index" />
                            </template>
                        </template>
                    </template>
                </template>
                <template v-else>
                    <tr><td colspan="6" align="center"><i class="fa fa-info-circle"></i> There is no data</td></tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
import DataListView from './components/data-list'
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    components: {
        DataListView
    },
    methods: {
        edit_item: function(val){            
            this.$parent.edit_content_id = val
            this.$parent.add_new_entity(true)
            this.$parent.$parent.$parent.edit_route(val)
        },
        del_item: function(id){
            if(confirm('Are you sure to delete it?')){
                this.$axios.get('/api/categories/delete/' + id, this.$parent.header_config).then( (response) => {
                    console.log('Get Data', response.data)
                    this.$swal("Good job!", "Data has been deleted successfully.", "success");
                    this.$parent.load_data();
                }).catch(e => {
                    console.log(e)
                    this.$toast.error('Failed!!!', {icon: "error_outline"})
                });
            }
        }
    }
}
</script>
<style scoped>
    .content_list_view > table{
        border: 1px solid #ddd
    }
    .content_list_view > table >>> td{
        vertical-align: middle;
    }
    .action_block > span{
        display: inline-block;
        margin: 0 5px;
    }
</style>