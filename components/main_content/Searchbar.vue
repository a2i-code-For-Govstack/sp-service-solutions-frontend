<template>
  <div class="container clearfix mt-3">
      <div class="search-container">
      <form action="#">
        <input type="text" placeholder="খুঁজুন" name="search">
        <button type="button" @click="doexpand" ><i class="fa fa-caret-down" aria-hidden="true"></i></button>
      </form>
    </div>
    <div class="search-container" v-if="expand">
      <div class="expand" style="background: white">
  <div class="row">
      <div class="col-sm">
        <div class="group_block">
              <label>শিক্ষার স্তর</label>
              <ul class="list">
                  <li :class="[{active:sel_edu_level==''}]">
                      <i :class="['far',{'fa-check-circle':sel_edu_level==''},{'fa-circle':sel_edu_level!=''}]"></i>
                      <span>সকল</span>
                  </li>
                  <template v-if="$store.state.edu_level_info.data.length>0">
                    <li v-for="(item,index) in $store.state.edu_level_info.data" :key="index" :class="[{active:sel_edu_level==item.id}]">
                        <i :class="['far',{'fa-check-circle':sel_edu_level==item.id},{'fa-circle':sel_edu_level!=item.id}]"></i>
                        <span>{{ item.title_bn }}</span>
                    </li>
                  </template>
              </ul>
          </div>
      </div>
      <div class="col-sm">
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
      </div>
      <div class="col-sm">
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
    </div>
          <div class="group_block clearfix">
            <button type="button" class="btn btn-primary btn-sm float-right"><span><i class="fa fa-search" aria-hidden="true"></i></span> সার্চ</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
            return {
                expand: false,
                sel_edu_level: '',
            sel_class: '',
            sel_subject: ''
            }
        },
        methods: {
            doexpand: function(){
                if(this.expand == false){
                    this.expand = true
                }else if(this.expand == true){
                    this.expand = false
                }

            }
        }
}
</script>

<style scoped>
.expand{
  padding: 10px;
  font-size: 17px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  float: left;
  color: black;
  box-shadow: 0 0 10px #719ECE;
  width: calc(100% - 10px);
  background: #f1f1f1;
}
#filter_block{
    position: sticky;
}
#filter_block .group_block{
    display: block;
    padding-top: 15px;
}
.group_block button i{
  margin-right: 5px;
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
.list ul >>> li.active{
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
#level_e, #class_e,#subject_e{
  padding: 10px;
  font-size: 17px;
  border: 1px solid #F1F3F4;
  float: left;
  color: black;
  width: 100%;
  background: #f1f1f1;
}
.search-container{
   margin-left: 0px;
}
input:focus {
  background: white;
  color: black;
}
#level_e  input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid grey;
}
#subject_e  input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid grey;
}
#class_e  input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid grey;
}

.search-container >>> input{
  padding: 10px;
  font-size: 17px;
  border: 1px solid #F1F3F4;
  float: left;
  color: black;
  background: url('https://img.icons8.com/ios/500/search--v1.png') no-repeat scroll 7px 7px;
  width: calc(100% - 40px);
  background: #f1f1f1;
}
.search-container input:focus {
    outline: none !important;
    background: white;
    border:1px solid white;
    box-shadow: 0 0 10px #719ECE;
}
::-webkit-input-placeholder {
  color: grey;
}
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  display: block;
  width: 33%;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}
.search-container button {
  float: left;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #F1F3F4;
  border-left: none;
  cursor: pointer;
  width:40px;
  height:47px;
}
.search-container button:focus {outline:0;}
</style>
