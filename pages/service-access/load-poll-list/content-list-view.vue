<template>
    <div class="content_list_view table-responsive">
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th>Title</th>
                    <th>Options</th>
                    <th nowrap>Total Votes</th>
                    <th>Info</th>
                    <th style="text-align:center" width="80">Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length>0">
                    <tr v-for="(item,index) in data" :key="index">
                        <td align="center">{{ index+1 }}</td>
                        <td width="20%">{{ item.poll_title }}</td>
                        <td width="40%">
                            <div class="option_block" v-for="(option_item,option_index) in item.poll_options" :key="'opt-'+option_index">
                                <div class="img">
                                    <img v-if="option_item.option_photo_info && option_item.option_photo_info.content" :src="option_item.option_photo_info.content" />
                                    <i v-else class="fa fa-image"></i>
                                </div>
                                <div class="option_title">
                                    <div>{{ option_item.option_title }} <small v-if="item.total_votes>0 && option_item.option_result">({{ ((option_item.option_result.votes*100)/item.total_votes).toFixed(2) }}%)</small></div>
                                    <div v-if="item.total_votes>0 && option_item.option_result" class="votes">
                                        <span class="progress" :style="{width: (((option_item.option_result.votes*100)/item.total_votes)).toFixed(2) + '%'}"></span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td align="center">{{ item.total_votes }}</td>
                        <td>
                            <div>Category: <span v-if="item.cat_info">{{ item.cat_info.category_name }}</span><span v-else><em>[Not Provided]</em></span></div>
                            <div class="domain_list_block">Domain: <template v-if="item.domain_info.length>0">
                                <span v-for="(dv,di) in item.domain_info" :key="'domain-' + di">{{ dv.sub_domain }}</span>
                            </template><span v-else><em>[Not Provided]</em></span></div>
                            <div>Type: <span v-if="item.type">Schedule</span><span v-else>Open</span></div>
                            <div v-if="item.type">
                                <div>Start: {{ item.start_time | luxon:diffForHumans }}</div>
                                <div>End: {{ item.end_time | luxon:diffForHumans }}</div>
                            </div>
                        </td>
                        <td align="center">
                            <span class="status">
                                <i :class="['far','fa-check-circle',{active:item.status}]"></i>
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
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    methods: {
    }
}
</script>
<style scoped>
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