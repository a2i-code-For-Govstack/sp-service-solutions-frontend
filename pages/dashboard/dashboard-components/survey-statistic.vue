<template>
    <div class="survey_stat_block">        
        <label>Online Survey Overview</label>
        <div class="row">
            
            <div class="col-md-4">
                <div class="content_block">
                    <nuxt-link :to="{path: '/dashboard/online-surveys?type=1'}">
                        <div class="icon purple">
                            <i class="fa fa-running"></i>
                        </div>
                        <div v-if="pre_loader" class="mt-3">
                            <FormBlockLoader :cols="1" :height="50" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="50" :r2_h="0" />
                        </div>
                        <div v-else class="total">{{ countable_data.total_ongoing?$parent.count_data_view(countable_data.total_ongoing):0 }}</div>
                        <div class="title"><small>Ongoing</small></div>
                    </nuxt-link>
                </div>
            </div>

            <div class="col-md-4">
                <div class="content_block">
                    <nuxt-link :to="{path: '/dashboard/online-surveys?type=2'}">
                        <div class="icon green">
                            <i class="fa fa-check"></i>
                        </div>
                        <div v-if="pre_loader" class="mt-3">
                            <FormBlockLoader :cols="1" :height="50" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="50" :r2_h="0" />
                        </div>
                        <div v-else class="total">{{ countable_data.total_completed?$parent.count_data_view(countable_data.total_completed):0 }}</div>
                        <div class="title"><small>Completed</small></div>
                    </nuxt-link>
                </div>
            </div>            

            <div class="col-md-4">
                <div class="content_block">
                    <div class="icon darkorange">
                        <i class="fa fa-university"></i>
                    </div>
                    <div v-if="pre_loader" class="mt-3">
                        <FormBlockLoader :cols="1" :height="50" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="50" :r2_h="0" />
                    </div>
                    <div v-else class="total">{{ countable_data.total_organization?$parent.count_data_view(countable_data.total_organization):0 }}</div>
                    <div class="title"><small>Organization</small></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SurveyStatBlock',
    data(){
        return {
            pre_loader: false,
            countable_data: []
        }
    },
    mounted () {
        // this.get_test();
        this.get_data();
    },
    methods: {
        get_test: function(){
            this.$axios.get('/stat-report/online-survey').then( res => {
                console.log('get', res)
            }).catch(e => {
                // console.log(e)
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.pre_loader = false;
            });
        },
        get_data: function(){
            this.pre_loader = true
            this.$axios.get('/api/data-report/online-survey/stat-report' + (localStorage.getItem('req_from')?'?req_from=' + localStorage.getItem('req_from'):''), this.$parent.header_config).then( async (response) => {
                console.log('Get Data', response.data)
                this.countable_data = response.data.data
                this.pre_loader = false;
            }).catch(e => {
                // console.log(e)
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.pre_loader = false;
            });
        }
    }
}
</script>
<style scoped>
    .survey_stat_block{
        position: relative;
        display: block;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;        
    }
    .survey_stat_block label{
        display: block; padding: 8px 12px;
        border-bottom: 1px solid #ddd;        
    }
    .content_block{
        display: block;
        text-align: center;
        padding: 15px
    }    
    .content_block a{
        display: block
    }
    .content_block .total{
        display: block;
        color: #333;
        font-size: 24px;
        line-height: 28px;
        margin-top: 18px;
        transition: all 0.4s
    }
    .content_block a:hover .total{
        font-size: 28px;
        transform: rotate(-360deg)
    }
    .content_block .title{
        white-space: nowrap;
        transition: all 0.4s
    }
    .content_block a:hover .title{
        font-size: 12px; font-weight: bold; margin-top: 2px
    }
    .content_block .icon{
        display: inline-block;
        position: relative;
        font-size: 18px;
        width: 40px; height: 40px; line-height: 40px;
        text-align: center;
        border-radius: 5px;        
    }
    .content_block .icon::after{
        position: absolute;
        content: '';
        width: 56px;
        height: 56px;
        border-radius: 5px;
        bottom: 0;
        top: -8px;
        right: 0;
        left: -8px;
    }
    .content_block .icon.purple{
        background-color:#62317e40;
        color: #62317e;
    }
    .content_block .icon.purple::after{
        background-color: #62317e20
    }
    .content_block .icon.green{
        background-color: #33663340;
        color: #363;
    }
    .content_block .icon.green::after{
        background-color: #33663320
    }
    .content_block .icon.skyblue{
        background-color: #179ec640;
        color: #179ec6
    }
    .content_block .icon.skyblue::after{
        background-color: #179ec620;
    }
    .content_block .icon.darkorange{
        background-color: #ff880040;
        color: #ff8800
    }
    .content_block .icon.darkorange::after{
        background-color: #ff880020
    }
</style>