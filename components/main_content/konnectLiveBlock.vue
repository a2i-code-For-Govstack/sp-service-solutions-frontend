<template>
    <div id="konnect_cont_block">
        <a target="_blank" href="http://konnect.edu.bd/my-school">
            <img class="img-fluid" src="~/assets/images/konnect-live.jpg">
        </a>
    </div>
</template>
<script>
export default {
    name: 'konnectLiveBlock'
}
</script>
<style scoped>
    #konnect_cont_block{
        text-align: center;margin: -35px 0 0 -100px;position: relative;
    }
    #konnect_cont_block img{ max-height: 40px;}
    @media (max-width: 575.98px) {
        #konnect_cont_block{
            margin: 0 auto;
        }
        #konnect_cont_block img{ max-height: 30px;}
    }
    @media (min-width: 768px) {
        #konnect_cont_block{
            margin: -10px auto 0;
        }
    }
    @media (min-width: 992px) {
        #konnect_cont_block{
            margin: -10px auto 0;
        }
    }
</style>