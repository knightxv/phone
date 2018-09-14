<template>
<div>
  <div class="form-wrap">
    <div class="textarea-wrap">
      <textarea
        v-model="form.intro" :rows="5" 
        placeholder="请在这里反馈您的问题"
        width="100%"
        :maxlength="maxlength"
      ></textarea>
    </div>
    <div class="feedback-list-item">
      <mt-cell title="微信或手机号">
        <input class="item-input" v-model="form.mobile" type="text" placeholder="选填,便于给您回复">
      </mt-cell>
    </div>
    <div class="feedback-list-item">
      <mt-cell @click.native="showPicker" title="发生时间" is-link :value="showSelectVal()"></mt-cell>
    </div>
    <div class="list-item btn-wrap">
      <mt-button @click="submit" size="large" type="primary">提交</mt-button>
    </div>
  </div>
  <mt-datetime-picker
    ref="picker"
    year-format="{value}"
    month-format="{value}月"
    date-format="{value}日"
    hour-format="{value}点"
    minute-format="{value}分"
    @confirm="onConfirmSelectTime"
  >
  </mt-datetime-picker>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Feedback extends Vue {
  data() {
    return {
      form: {
        intro: '',
        mobile: '',
        // TODO: todo img upload [vue-croppa]
        // introImgs: [],
      },
      selectTime: '',
      maxlength: 200,
    };
  }
  onConfirmSelectTime(selectTime: Date) {
    this.$data.selectTime = selectTime;
  }
  showPicker() {
    (this.$refs.picker as any).open();
  }
  showSelectVal() {
    if (!this.$data.selectTime) {
      return '选填';
    }
    return this.$app.helps.formatDate(this.$data.selectTime);
  }
  submit() {
    let selectTime;
    if (this.$data.selectTime) {
      selectTime = this.$data.selectTime.getTime() / 1000;
    }
    const submitForm = Object.assign({}, this.$data.form, {
      selectTime,
    });
    console.log(submitForm);
    this.$message.success('感谢您的反馈');
    this.$router.back();
  }
}
</script>

<style scoped lang="less">
.textarea-wrap {
  padding: 20px 15px;
  background: #fff;
}
textarea {
  box-sizing: border-box;
  padding: 10px 6px;
  width: 100%;
}
.form-wrap {
  margin-top: 20px;
}
.item-input {
  border: none;
  text-align: right;
}
.feedback-list-item {
  background: #fff;
  margin-top: 20px;
}
.btn-wrap {
  margin-top: 30px;
}
</style>