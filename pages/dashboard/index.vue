<template>
    <div class="dashboard-container">
        <!-- {{ this.$store.state.feature_access_list }} -->
        <div class="row">
            <div class="col-md-9">
                <PollingStatisticBlock v-if="$store.state.feature_access_list[1]" />                
                <CommentingStatisticBlock v-if="$store.state.feature_access_list[3]" class="mt-4" />
                <SurveyStatisticBlock v-if="$store.state.feature_access_list[2]" class="mt-4" />
            </div>
            <div class="col-md-3">
                <label>How to integrate a service to your system</label>
                <div>
                    <small>Copy the following script and paste on the head section</small>
                </div>
                <div class="script_list">
                    <ul>
                        <li v-if="$store.state.feature_access_list[1]">
                            <label @click="npop_show?npop_show=false:npop_show=true">Online Polling Script <i v-if="npop_show" class="fa fa-angle-up"></i><i v-else class="fa fa-angle-down"></i></label>                        
                            <div v-if="npop_show">
                                <code>
                                    &lt;script src="{{ this.base_url }}/js/npop.script.js" defer&gt;&lt;/script&gt;
                                </code>
                            </div>
                        </li>
                        <li v-if="$store.state.feature_access_list[3]">
                            <label @click="npos_show?npos_show=false:npos_show=true">Online Survey Script <i v-if="npos_show" class="fa fa-angle-up"></i><i v-else class="fa fa-angle-down"></i></label>                        
                            <div v-if="npos_show">
                                <code>
                                    &lt;script src="{{ this.base_url }}/js/npos.script.js" defer&gt;&lt;/script&gt;
                                </code>
                            </div>
                        </li>
                        <li v-if="$store.state.feature_access_list[2]">
                            <label @click="npc_show?npc_show=false:npc_show=true">Comment Management Tools <i v-if="npc_show" class="fa fa-angle-up"></i><i v-else class="fa fa-angle-down"></i></label>
                            <div v-if="npc_show">
                                <code>
                                    &lt;script src="{{ this.base_url }}/js/npc.script.js" defer&gt;&lt;/script&gt;
                                </code>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PollingStatisticBlock from './dashboard-components/polling-statistic'
import SurveyStatisticBlock from './dashboard-components/survey-statistic'
import CommentingStatisticBlock from './dashboard-components/comments-statistic'
export default {
    name: 'DashboardContainer',
    components: {
        PollingStatisticBlock,
        SurveyStatisticBlock,
        CommentingStatisticBlock
    },
    data(){
        return {
            npop_show: false,
            npos_show: false,
            npc_show: false,
            base_url : process.env.BASE_URL,
            user_access_token: this.$store.state.auth_info.user_data.token
        }
    },
    computed:{
        header_config (){
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
    methods: {
        count_data_view: function(num){
            let val = num;
            if(num>=1000*1000) val = (num/(1000*1000)).toFixed(1) + 'M'
            else if(num>=1000) val = (num/1000).toFixed(1) + 'K'
            return val
        }
    }
}
</script>
<style scoped>
    .script_list{
        display: block;
    }
    .script_list > ul{
        list-style: none; padding: 0
    }
    .script_list > ul > li label{
        display: block;
        font-size: 12px;
        font-weight: bold;
        margin-top: 15px;
        margin-bottom: 5px;
        cursor: pointer
    }
    .script_list > ul > li code{
        display: block;
        background-color: #fff; padding: 10px;
        border-radius: 3px;
        border: 1px solid #ddd
    }
</style>