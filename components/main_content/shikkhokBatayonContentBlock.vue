<template>
    <div id="shikkhok_cont_block" class="mt-3 mb-1">
        <div class="row">
            <div class="col-3 col-sm-3 shikkho-logo pr-1 pr-sm-3">
                <a target="_blank" href="https://www.teachers.gov.bd/">
                    <img src="~/assets/images/shikkhok-batayon-logo.png" class="img-fluid">
                </a>
            </div>
            <div class="col-12 col-sm-2 d-none d-sm-block">
            </div>
            <div class="col-9 col-sm-7 shikkhok_cont">
                <div class="row">
                    <div class="col-3 col-sm-3 d-flex justify-content-center pr-1 pr-sm-3 pl-1 pl-sm-3">
                        <a target="_blank" href="https://www.teachers.gov.bd/model-content">
                            <img src="~/assets/images/content.png" class="img-fluid d-block mx-auto">
                            <h5 class="mb-0">মডেল কনটেন্ট</h5>
                        </a>
                    </div>
                    <div class="col-3 col-sm-3 d-flex justify-content-center pr-1 pr-sm-3 pl-1 pl-sm-3">
                        <a target="_blank" href="https://www.teachers.gov.bd/content/innovation_story">
                            <img src="~/assets/images/invention.png" class="img-fluid d-block mx-auto">
                            <h5 class="mb-0">উদ্ভাবনের গল্প</h5>
                        </a>
                    </div>
                    <div class="col-3 col-sm-3 d-flex justify-content-center pr-1 pr-sm-3 pl-1 pl-sm-3">
                        <a target="_blank" href="https://www.teachers.gov.bd/content/news">
                            <img src="~/assets/images/conversation.png" class="img-fluid d-block mx-auto">
                            <h5 class="mb-0">খবর-দার</h5>
                        </a>
                    </div>
                    <div class="col-3 col-sm-3 d-flex justify-content-center pr-1 pr-sm-3 pl-1 pl-sm-3">
                        <a target="_blank" href="https://www.teachers.gov.bd/blog">
                            <img src="~/assets/images/blog.png" class="img-fluid d-block mx-auto">
                            <h5 class="mb-0">খোলা জানালা (ব্লগ)</h5>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'shikkhokBatayonContentBlock'
}
</script>
<style scoped>
    #shikkhok_cont_block{
        background:url('.~assets/images/shikkhok-batayon.jpg') no-repeat left top;
        background-size: 100% 100%;
        padding:15px;
    }
    .shikkho-logo img{ max-width: 85%;}
    .shikkhok_cont img{ max-height: 65px;}
    .shikkhok_cont h5{ font-size: 16px; color: #000;}
    @media (max-width: 575.98px) {
        .shikkhok_cont img{ max-height: 30px;}
        .shikkhok_cont h5{ font-size: 12px;}
        #shikkhok_cont_block{
            padding:5px;
        }
    }
</style>