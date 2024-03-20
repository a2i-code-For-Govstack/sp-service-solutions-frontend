<template>
    <div id="latest_update_block">
        <div class="container">
            <div v-if="view_active" class="close_routine">
                <i class="fa fa-times" @click="view_active=false"></i>
            </div>
            <div :class="['tab_list',{inactive:!view_active}]">
                <label @click="view_active=true"><i class="fa fa-calendar-alt"></i> ক্লাস রুটিন</label>
            </div>
            <div v-if="view_active" class="content_block mt-3">
                <full-calendar :events="events" :header="header" :config="config" ref="calendar" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'classRoutineBlock',
    data(){
        return {
            events: [],
            header: {},
            config: {
                locale: 'en',
                weekends: false,
                weekStartOn: 1
            },
            view_active: false
        }
    }
}
</script>
<style scoped>
    #latest_update_block{
        display: block;
    }
    .close_routine{
        margin-top: -35px;
        position: relative;
        text-align: center;
        transition: all 0.4s;
    }
    .close_routine > i{
        font-size: 30px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        line-height: 47px;
        border: 3px solid #892c85;
        cursor: pointer;
        display: inline-block;
        color: #892c85;
    }
    .tab_list{
        font-size: 20px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        border-bottom: 3px solid #ddd;
        text-align: center;
        transition: all 0.4s;
    }
    .tab_list.inactive {
        margin-top: -35px;
        position: relative;
        border: none;
    }
    .tab_list > label{
        padding: 10px 0;
        color: #666666;
        border-bottom: 3px solid #666666;
        margin-bottom: -3px;
        transition: all 0.4s;
    }
    .tab_list.inactive > label{
        background-color: #892c85;
        color: #ffffff;
        padding: 5px 20px;
        border-radius: 25px 15px;
        cursor: pointer;
    }
    .tab_list.inactive > label:hover{
        background-color: rebeccapurple;
        font-size: 16px;
    }
    .tab_list.inactive > label i{
        margin-right: 10px;
        font-size: 26px;
        position: relative;
        top: 3px;
    }
    .content_block label{
        display: inline-block;
        /* background-color: #eee; */
        border: 1px solid #eee;
        padding: 5px 15px;
        border-radius: 25px;
        height: 30px;
        text-align: left;
    }
    .content_block label >>> img{
        max-width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .content_block ul{
        padding-left: 20px;
    }
    @media (max-width: 575.98px) {
        .tab_list.inactive {
            margin-top:0px;
        }
        .tab_list{ font-size: 15px;}
        .tab_list.inactive > label i{
            font-size: 20px;
            top: 3px;
        }
    }
</style>