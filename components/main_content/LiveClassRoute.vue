<template>
    <div id="live_class_route_block">
        <div class="tab_list">
            <label>লাইভ ক্লাস রুটিন</label>
        </div>
        <div class="content_block mt-3">
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'LiveClassRouteBlock'
}
</script>
<style scoped>
    #live_class_route_block{
        display: block;
        padding: 20px 0 0 20px;
    }
    .tab_list{
        font-size: 20px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        border-bottom: 3px solid #ddd;
    }
    .tab_list > label{
        padding: 10px 0;
        color: #666666;
        border-bottom: 3px solid #666666;
        margin-bottom: -3px;
    }
    .content_block label{
        display: block;
        background-color: #eee;
        padding: 3px 15px;
        border-radius: 25px;
    }
    .content_block ul{
        padding-left: 20px;
    }
</style>