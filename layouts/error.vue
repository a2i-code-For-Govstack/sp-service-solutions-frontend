<template>
    <div class="error_page_block">        
        <div class="content_display">
            <div class="container" align="center">
                <h4><i class="fa fa-ino-circle"></i> You have visited wrong page.</h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ErrorPageBlock'
}
</script>
<style scoped>
    .error_page_block{
        display: block;
        margin-top: 60px;
    }
    .error_page_block >>> h4{
        font-family:"Hind Siliguri Light";
        font-weight: bolder;
        font-size: 20px;
    }
    .content_display{
        background-color: #ffffff;
        background-image: linear-gradient(to bottom, #eeeeee, transparent);
        padding: 25px 0
    }
</style>