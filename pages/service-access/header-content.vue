<template>
    <div class="header_container">
        <div class="srch_block">
            <div class="icon"><i class="fa fa-search"></i></div>
            <div class="srch_input_block">
                <input type="text" placeholder="search for an entry..." v-model="keyword" />
            </div>
        </div>
        <div class="page_highlight">
            <span><i class="fa fa-signal"></i> {{ title }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HeaderContainer',
    props: ['title'],
    data(){
        return {
            keyword: ''
        }
    },
    methods: {
    }
}
</script>
<style scoped>
    .header_container{        
        display: flex;
        letter-spacing: 0px;
        min-width: 44rem;
    }
    /* .header_container > div:first-child{
        margin-right: 10px;
    } */
    .header_container > div:nth-child(1){
        display: flex;
        flex: 2 1 0%;
    }
    .header_container > div:nth-child(1) input{
        position: relative;
        width: 100%;
        border: none;
        height: calc(100% - 2px);
        outline: none; color: #666;
    }
    .header_container .icon{
        margin-right: 15px;
        font-size: 20px;
        color: #bbb;
    }
    .header_container .srch_input_block{
        width: 100%
    }
    .back_block{
        cursor: pointer
    }
    .back_block > .text{
        padding-right: 25px;
        border-right: 1px solid #ddd;
    }
    .page_highlight{
        margin: 0 12px;
    }
    .page_highlight > span{        
        background-color: #dbf6ff;
        border: 1px solid #84d7d8;
        padding: 2px 15px;
        border-radius: 5px;
        font-size: 13px;
        color: #477bdf;
    }
    .page_highlight > span i{
        padding-right: 5px;
        font-size: 10px;
    }
    .user_login_info{
        display: flex;        
        padding-top: 10px;
    }
    .user_login_info .photo{
        margin: 0 10px;
        width: 40px;
        height: 40px;
        line-height: 38px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 50%;
    }
    .info > div{
        line-height: 20px;
        font-size: 13px;
    }
    .info > div.action_btn{
        font-size: 12px; color: #006699;
        cursor: pointer;
        transition: all 0.4s;
    }
    .info > div.action_btn:hover{
        color: #CD0000
    }
</style>