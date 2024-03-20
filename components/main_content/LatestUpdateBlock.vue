<template>
    <div id="latest_update_block">
        <div class="tab_list">
            <label>সর্বশেষ আপডেট</label>
        </div>
        <div class="content_block mt-3">
            <div class="row">
                <div class="col-md-4">
                    <label><img src="~/assets/images/partners/connect-logo.png" alt="Connect" title="Connect" /></label>
                    <ul>
                        <li>লিংক ১</li>
                        <li>লিংক ২</li>
                        <li>লিংক ৩</li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <label><img src="~/assets/images/partners/10ms-logo.webp" alt="10 MINUTE SCHOOL" title="10 MINUTE SCHOOL" /></label>
                    <ul>
                        <li>লিংক ১</li>
                        <li>লিংক ২</li>
                        <li>লিংক ৩</li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <label><img src="~/assets/images/partners/unicef-logo.png" alt="UNICEF" title="UNICEF" /></label>
                    <ul>
                        <li>লিংক ১</li>
                        <li>লিংক ২</li>
                        <li>লিংক ৩</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ContentUpdateBlock'
}
</script>
<style scoped>
    #latest_update_block{
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
</style>