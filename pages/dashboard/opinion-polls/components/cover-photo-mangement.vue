<template>
    <div v-show="popup_content_show" class="black_overlay">
        <div class="white_overlay">
            <label>Photo Content Form</label>                
            <span class="close_btn" @click="popup_close">x</span>
            <div class="content">
                <PhotoGalleryContent :content_type="'photo'" :selected_arr="[]" ref="popup_content_block" />
            </div>
        </div>
    </div>
</template>
<script>
import PhotoGalleryContent from '../../media-galleries/components/galley-content-view'
export default {
    name: 'PopupBlock',
    components: {
        PhotoGalleryContent
    },
    data(){
        return {
            popup_content_show: false
        }
    },
    methods: {
        popup_close: function(){
            this.popup_content_show=false
            document.body.classList.remove('popup_open')
        },
        add_content: function(obj){
            console.log(obj)
            this.$parent.formData.cover_photo = obj.content
        }
    }
}
</script>
<style scoped>
    .white_overlay{
        width: 80%;
        left: 10%;
        top: 10%;
        min-height: 450px;
        /* max-height: 100%; */
    }
    .content{
        display: block;
        width: 100%;
        height: 100%;
    }
</style>