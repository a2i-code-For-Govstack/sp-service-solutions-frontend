<template>
    <div class="content_list_view table-responsive">
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th>Domain Group Info</th>
                    <th>Credentails</th>
                    <th>Widget Script</th>
                    <th style="text-align:center" width="80">Status</th>
                    <th width="80"></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length>0">
                    <tr v-for="(item,index) in data" :key="index">
                        <td align="center">{{ index+1 }}</td>
                        <td nowrap>
                            <div v-if="item.domain_group_info">{{ item.domain_group_info.group_title }}</div>
                        </td>
                        <td>
                            <div>App Id: {{ item.app_id }}</div>
                            <div>Secret Key: {{ item.secret_key }}</div>
                        </td>
                        <td>
                            <code>
                                &lt;script src="{{ $parent.base_url }}/js/service.access.script.js" defer&gt;&lt;/script&gt;&lt;script&gt;var __app_id = '{{ item.app_id }}',__secret_key = '{{ item.secret_key }}'&lt;/script&gt;
                            </code>
                        </td>
                        <td align="center">
                            <span class="status">
                                <i :class="['far','fa-check-circle',{active:item.status}]"></i>
                            </span>
                        </td>
                        <td align="center">
                            <div class="action_block">
                                <span @click="edit_item(item.id)"><i class="fa fa-edit"></i></span>
                                <span @click="del_item(item.id)"><i class="fa fa-trash-alt"></i></span>
                            </div>
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
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    methods: {
        edit_item: function(val){
            this.$parent.edit_content_id = val
            this.$parent.add_new_entity(true)
            this.$parent.$parent.$parent.edit_route(val)
        },
        del_item: function(id){
            if(confirm('Are you sure to delete it?')){
                this.$axios.get('/api/domain-access-credentials/delete/' + id, this.$parent.header_config).then( (response) => {
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