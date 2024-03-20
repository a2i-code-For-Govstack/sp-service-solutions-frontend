<template>
  <div id="pre_define_text_form" class="eng_font">
    <span class="close_btn" @click="close_popup">x</span>
    <div class="form_block">
      <div class="row">
        <div class="col-md-12">
          <div class="form-input">
            <label class="float-left">Text</label>
            <textarea
              v-model="formData.text"
              class="form-control"
              placeholder="Enter Text"
              @keyup.enter="form_submit"
            ></textarea>
            <!-- <label>Status</label>
            <input type="checkbox" id="checkbox" v-model="formData.status" /> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="!success_msg" class="form_footer">
      <div class="row">
        <div class="col-md-12 clearfix">
          <div class="submit_btn float-right" @click="form_submit">
            <i class="fa fa-check-circle"></i> Submit
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        text: "",
        status: true,
        domain_id: this.$parent.$parent.reply_comment_info.comment_rel_info.domain_id,
      },
      submit_msg: "",
      success_msg: false,
    };
  },

  methods: {
    async form_submit() {
      var url = "/api/pre-define-text/store";
      let getTokenType = JSON.parse(localStorage.getItem("user_info"));

      this.submit_msg = "";

      this.$axios
        .post(url, this.formData, {
          headers: {
            Authorization: "Bearer " + getTokenType.token,
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": getTokenType.token,
          },
        })
        .then((response) => {
          // console.log('Get data',response.data);
          this.success_msg = true;
          this.$parent.alert_box_block = false;
          this.$parent.pre_define_text_form = false;
          this.$parent.$parent.$parent.load_data();
        })
        .catch((e) => {
          console.log(e);
          this.$toast.error("Created a pre define text!!", {
            icon: "error_outline",
          });
          this.submit_msg = "";
        });
    },
    close_popup() {
      this.$parent.pre_define_text_form = false;
    },
  },
};
</script>
<style scoped>
#pre_define_text_form {
  .form_block {
    padding: 0 20px 20px 20px;
    input {
      font-size: 12px;
      background-color: #3d46a7;
      border: 1px solid #3d46a7;
      color: #fff;
      padding: 5px 10px;
      height: auto;
    }
  }
}

.form_footer {
  /* border-top: 1px solid #dddddd; */
  padding: 10px 20px;
  :deep(.msg) {
    font-size: 12px;
    line-height: 36px;
    .succ {
      color: #c4ffe3;
    }
    .err {
      color: #ffdbdb;
    }
  }
}
.submit_btn {
  line-height: 30px;
  display: block;
  padding: 0 15px;
  color: #eee;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  background-color: #f05a24;
  border-radius: 25px;
  /* border-left: 1px solid #fbcd41; */
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    color: #fff;
    background-color: #cd0000;
  }
  & > i {
    color: #eee;
    margin-right: 5px;
    transition: all 0.4s;
  }
  &:hover > i {
    color: #fff;
  }
}
.close_btn {
  position: absolute;
  background-color: #ffffff;
  right: -10px;
  top: -10px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 0 5px #666;
  cursor: pointer;
}
::-webkit-input-placeholder {
  /* Edge */
  color: #bbbbbb;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #bbbbbb;
}

::placeholder {
  color: #bbbbbb;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>