<template>
    <div class="chart_view_block">
        <div id="chartContainer" ref="chartContainer"></div>
        <!-- <span class="hide_trial_top_left"></span>
        <span class="hide_trial_bottom_left"></span>
        <span class="hide_logo"></span> -->
    </div>
</template>
<script>	
    export default {
        name: 'PieChartBlock',
        props: ['chartOptions'],
        mounted() {
            this.load_data();
        },
        methods: {
            load_data(){
                var CanvasJS = require('~/assets/js/jquery.canvasjs.min');
                var chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
                chart.render();
            }
        }
    }
</script>
<style scoped>
    .chart_view_block{
        position: relative;
        width: 100%; height: 200px
    }
    #chartContainer{
        display: block;
        width: 100%;
        height: 100%;
        padding: 15px
    }
    .chart_view_block > .hide_logo{
        position: absolute;
        background-color: #fff;
        right: -15px;
        bottom: -15px;
        width: 65px;
        height: 20px;
        z-index: 5;
    }
    .chart_view_block > .hide_trial_top_left{
        position: absolute;
        background-color: #fff;
        left: 0;
        top: 15px;
        width: 76px;
        height: 12px;
        z-index: 5;
    }
    .chart_view_block > .hide_trial_bottom_left{
        position: absolute;
        background-color: #fff;
        left: 0;
        bottom: -15px;
        width: 76px;
        height: 12px;
        z-index: 5;
    }
</style>