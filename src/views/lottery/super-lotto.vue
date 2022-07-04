<!-- 大乐透彩票 -->
<template>
  <div>
    <div id="main" class="main">
      <div class="input-number">
        <p style="font-size: 20px">请输入你预测的几个号:</p>
        <div class="tips">
          <p style="font-size: 16px">
            <span style="color: #f54646">红区1-35;</span>
            <span style="color: #39f">蓝区1-12</span>
          </p>
          <p class="clear" @click="clearInput">清空</p>
        </div>
        <div class="inputs">
          <input v-for="(item, idx) in 5" :key="idx" class="input red" type="number" v-model="fontInputVal[idx]" @blur="checkVal(1, idx)" />
          <span>-</span>
          <input v-for="(item, idx) in 2" :key="idx" class="input blue" type="number" v-model="backInputVal[idx]" @blur="checkVal(2, idx)" />
        </div>
      </div>
      <div class="get-number">
        <div class="header">
          <p style="font-size: 20px">预测号码为：</p>
          <p style="font-size: 16px; color: red" @click="clearNumberList">清空</p>
        </div>
        <div class="list">
          <div class="item" v-for="(item, idx) in numberList" :key="idx">
            <span class="red" v-for="(val, idx1) in item.fontNumber" :key="idx1">{{ val.toString().padStart(2, 0) }}</span>
            <span class="blue" v-for="(val, idx1) in item.backNumber" :key="idx1">{{ val.toString().padStart(2, 0) }}</span>
            <span class="btn remove" @click="removeNum(idx)">移除</span>
            <span class="btn update" @click="updateNum(idx)">更新</span>
          </div>
        </div>
      </div>
      <div class="btns" @click="getNumber">获取号码</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      fontInputVal: [],
      backInputVal: [],
      numberList: [],
      fontNumber: [],
      backNumber: []
    }
  },
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 清空输入
    clearInput() {
      this.fontInputVal = []
      this.backInputVal = []
    },
    // 清空号码列表
    clearNumberList() {
      this.numberList = []
    },
    // 输入框值校验
    checkVal(type, idx) {
      if (type == 1) {
        let value = this.fontInputVal[idx]
        this.fontInputVal[idx] = value >= 1 && value <= 35 ? (value - 0).toString().padStart(2, 0) : ''
      } else {
        let value = this.backInputVal[idx]
        this.backInputVal[idx] = value >= 1 && value <= 12 ? (value - 0).toString().padStart(2, 0) : ''
      }
    },
    // 移除当前号码
    removeNum(idx) {
      if (idx < 0) return
      this.numberList.splice(idx, 1)
    },
    // 生成号码list
    getNumber() {
      let { fontArr, backArr } = this.getRandomNumber()
      this.numberList.push({
        fontNumber: fontArr,
        backNumber: backArr
      })
    },
    // 更新当前号码
    updateNum(idx) {
      if (idx < 0) return
      let { fontArr, backArr } = this.getRandomNumber()
      this.numberList.splice(idx, 1)
      this.numberList.splice(idx, 0, {
        fontNumber: fontArr,
        backNumber: backArr
      })
    },
    // 随机得到号码
    getRandomNumber() {
      let fontArr = [] // 前区
      let backArr = [] // 后区
      this.fontInputVal.map((ele) => {
        if (ele && fontArr.indexOf(ele - 0) < 0) {
          fontArr.push(ele - 0)
        }
      })
      this.backInputVal.map((ele) => {
        if (ele && backArr.indexOf(ele) < 0) {
          backArr.push(ele - 0)
        }
      })
      while (fontArr.length < 5) {
        let random = Math.floor(Math.random() * 35 + 1) // 生成[1,35] 之间 数字
        if (fontArr.indexOf(random) > -1) continue
        fontArr.push(random)
      }
      fontArr.sort((a, b) => a - b)
      while (backArr.length < 2) {
        let random = Math.floor(Math.random() * 12 + 1) // 生成[1,12] 之间 数字
        if (backArr.indexOf(random) > -1) continue
        backArr.push(random)
      }
      backArr.sort((a, b) => a - b)
      return { fontArr, backArr }
    }
  }
}
</script>

<style scoped lang="scss">
/* @import url(); 引入css类 */

.main {
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btns {
  position: absolute;
  bottom: 45px;
  padding: 10px 60px;
  text-align: center;
  background-image: linear-gradient(#ed5555, #f57474);
  border-radius: 20px;
  font-weight: bolder;
  color: #fff;
}

.input-number {
  width: 100%;
  text-align: left;
  .tips {
    display: flex;
    justify-content: space-between;
    .clear {
      color: red;
    }
  }
  .inputs {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    input {
      width: 40px;
      height: 30px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      border-radius: 6px;
      background: none;
      outline: none;
    }
    .red {
      border: 1px solid #f54646;
      color: #f54646;
    }
    .blue {
      border: 1px solid #39f;
      color: #39f;
    }
  }
}

.get-number {
  margin-top: 20px;
  width: 100%;
  text-align: left;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 270px);
    overflow-x: hidden;
    overflow-y: scroll;
    .item {
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 50%;
        font-weight: bold;
        /*颜色渐变效果*/
        color: #fff;
      }
      .red {
        background: radial-gradient(circle at 15px 20px, #f54646, #fff);
      }
      .blue {
        background: radial-gradient(circle at 15px 20px, #39f, #fff);
      }
      .btn {
        height: 25px;
        line-height: 25px;
        border-radius: 8px;
        font-size: 13px;
      }
      .update {
        background: green;
      }
      .remove {
        background: red;
      }
    }
  }
  .list::-webkit-scrollbar {
    display: none;
  }
}
</style>
