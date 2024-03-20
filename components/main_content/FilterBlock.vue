<template>
    <div id="filter_block">
        <div class="group_block">
            <label>শিক্ষার স্তর</label>
            <ul class="list">
                <li :class="[{active:sel_edu_level==''}]">
                    <i :class="['far',{'fa-check-circle':sel_edu_level==''},{'fa-circle':sel_edu_level!=''}]"></i>
                    <span>সকল</span>
                </li>
                <li v-for="(item,val) in $store.state.edu_level_list" :key="val" :class="[{active:sel_edu_level==val}]">
                    <i :class="['far',{'fa-check-circle':sel_edu_level==val},{'fa-circle':sel_edu_level!=val}]"></i>
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>

        <div class="group_block">
            <label>শ্রেণী</label>
            <ul class="list">
                <li :class="[{active:sel_class==''}]">
                    <i :class="['far',{'fa-check-circle':sel_class==''},{'fa-circle':sel_class!=''}]"></i>
                    <span>সকল</span>
                </li>
                <li v-for="(item,val) in $store.state.class_list" :key="val" :class="[{active:sel_class==val}]">
                    <i :class="['far',{'fa-check-circle active':sel_class==val},{'fa-circle':sel_class!=val}]"></i>
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>

        <div class="group_block">
            <label>বিষয়</label>
            <ul class="list">
                <li :class="[{active:sel_subject==''}]">
                    <i :class="['far',{'fa-check-circle':sel_subject==''},{'fa-circle':sel_subject!=''}]"></i>
                    <span>সকল</span>
                </li>
                <li v-for="(item,val) in $store.state.subject_list" :key="val" :class="[{active:sel_subject==val}]">
                    <i :class="['far',{'fa-check-circle active':sel_subject==val},{'fa-circle':sel_subject!=val}]"></i>
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FilterBlock',
    data(){
        return {
            sel_edu_level: '',
            sel_class: '',
            sel_subject: ''
        }
    }
}
</script>
<style scoped>
    #filter_block{
        position: sticky;
    }
    #filter_block .group_block{
        display: block;
        padding-top: 15px;
    }
    .group_block label{
        font-size: 20px;
        font-family: "Hind Siliguri Light";
        font-weight: bold;
        background-color: #fff;
        padding-right: 8px;
    }
    .group_block ul{
        padding: 0;
        list-style: none;
    }
    ul >>> li{
        font-size: 16px;
        cursor: pointer;
    }
    ul >>> li.active{
        color: #932793;
        font-weight: bold;
    }
    ul >>> li i{
        color: #ccc;
        font-size: 20px;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
    ul >>> li.active i{
        color: #932793
    }
</style>