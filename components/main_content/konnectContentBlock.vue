<template>
    <div id="konnect_cont_block" class="mt-4 mb-1">
        <div class="row">
            <div class="col-md-3">
                <a href="http://konnect.edu.bd">
                    <img class="img-fluid" src="~/assets/images/konnect/logo.png">
                </a>
            </div>
            <div class="col-md-9 konnect_cont">
                <a target="_blank" href="http://konnect.edu.bd/life-skills"><img src="~/assets/images/konnect/Life-Skill.png" class="img-fluid"></a>
                <a target="_blank" href="http://konnect.edu.bd/comic/main"><img src="~/assets/images/konnect/comics.png" class="img-fluid"></a>
                <a target="_blank" href="http://konnect.edu.bd/student/uploads"><img src="~/assets/images/konnect/upload.png" class="img-fluid"></a>
                <!-- <a target="_blank" href="#"><img src="~/assets/images/konnect/more-content.png" class="img-fluid"></a> -->
                <a target="_blank" href="http://konnect.edu.bd/book/main"><img src="~/assets/images/konnect/book.png" class="img-fluid"></a>
                <a target="_blank" href="http://konnect.edu.bd/experiment/main"><img src="~/assets/images/konnect/matha_khatao.png" class="img-fluid"></a>
                <a target="_blank" href="http://konnect.edu.bd/film/main"><img src="~/assets/images/konnect/movie.png" class="img-fluid"></a>
                <a target="_blank" href="http://konnect.edu.bd"><img src="~/assets/images/konnect/matha_khatao1.png" class="img-fluid"></a>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'konnectContentBlock'
}
</script>
<style scoped>
    #konnect_cont_block{
        display: block;
        padding:15px;
        /* margin:0px 0 0 20px; */
        background:url('.~assets/images/konnect/konnect_bg.jpg') no-repeat left top;
        background-size: cover;
    }
    .konnect_cont a{ margin:0 12px;}
    .konnect_cont img{ max-height: 70px;}
    @media (max-width: 575.98px) {
        #konnect_cont_block img{
            margin-bottom: 10px;
            max-height: 50px;
        }
    }
</style>