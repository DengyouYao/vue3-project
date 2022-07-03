<!-- 大乐透彩票 -->
<template>
  <div>
    <div id="main" class="main">
      <div class="input-number">
        <p style="font-size: 20px">请输入你预测的几个号:</p>
        <p style="font-size: 16px">
          <span style="color: #f54646">红区1-35;</span>
          <span style="color: #39f">蓝区1-12</span>
        </p>
        <div class="inputs">
          <input v-for="(item, idx) in 5" :key="idx" class="input red" type="number" v-model="fontInputVal[idx]" @blur="checkVal(1, idx)" />
          <span>-</span>
          <input v-for="(item, idx) in 2" :key="idx" class="input blue" type="number" v-model="backInputVal[idx]" @blur="checkVal(2, idx)" />
        </div>
      </div>
      <div class="get-number">
        <p style="font-size: 20px">预测号码为：</p>
        <div class="list" id="numberList">
          <div class="item">
            <span class="red" v-for="(item, idx) in fontNumber" :key="idx">{{ item.toString().padStart(2, 0) }}</span>
            <span class="blue" v-for="(item, idx) in backNumber" :key="idx">{{ item.toString().padStart(2, 0) }}</span>
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
    checkVal(type, idx) {
      if (type == 1) {
        let value = this.fontInputVal[idx]
        this.fontInputVal[idx] = value > 35 || value < 1 ? '' : (value - 0).toString().padStart(2, 0)
      } else {
        let value = this.backInputVal[idx]
        this.backInputVal[idx] = value > 12 || value < 1 ? '' : (value - 0).toString().padStart(2, 0)
      }
    },
    // 随机得到号码
    getNumber() {
      let fontArr = [] // 前区
      let backArr = [] // 后区
      this.fontInputVal.map((ele) => {
        if (fontArr.indexOf(ele - 0) < 0) {
          fontArr.push(ele - 0)
        }
      })
      this.backInputVal.map((ele) => {
        if (backArr.indexOf(ele) < 0) {
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
      this.fontNumber = fontArr
      this.backNumber = backArr
    }
  }
}
</script>

<style scoped lang="scss">
/* @import url(); 引入css类 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

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
  bottom: 60px;
  padding: 10px 60px;
  text-align: center;
  background-image: linear-gradient(#ed5555, #f57474);
  border-radius: 20px;
  font-weight: bolder;
  color: #fff;
}

.input-number {
  width: 100%;
}

.input-number .inputs {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}

.input-number .inputs input {
  width: 40px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 6px;
  background: none;
  outline: none;
}

.input-number .inputs .red {
  border: 1px solid #f54646;
  color: #f54646;
}

.input-number .inputs .blue {
  border: 1px solid #39f;
  color: #39f;
}

input:focus {
  border: none;
}

.get-number {
  margin-top: 20px;
  width: 100%;
}

.get-number .list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.get-number .list .item {
  display: flex;
}

.get-number .list .item span {
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  font-weight: bold;
  /*颜色渐变效果*/

  color: #fff;
  margin-right: 5px;
}

.get-number .list .item .btn {
  color: #000;
  margin-left: 10px;
  border: 1px solid rgb(77, 76, 76);
  border-radius: 5px;
}

.get-number .list .item .red {
  background: radial-gradient(circle at 15px 20px, #f54646, #fff);
}

.get-number .list .item .blue {
  background: radial-gradient(circle at 15px 20px, #39f, #fff);
}
</style>
