<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 移除乘机人按钮 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item, index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`"
            @change="handleInsurance(item.id)"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span>{{allPrice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], // 保险数据
      contactName: "", // 联系人名字
      contactPhone: "", // 联系人电话
      captcha: "000000", // 验证码
      invoice: false, // 发票
      seat_xid: "", // 座位的id
      air: "" // 航班的id
    };
  },
  props: {
    // 接收机票信息
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    allPrice(){
      let price = 0
      //机票的单价
      price += this.data.seat_infos.org_settle_price
      //燃油费
      price += this.data.airport_tax_audlet
      //保险
      price += this.insurances.length*30
      //根据乘机人的数量翻倍
      price *= this.users.length
      // 传递给store
      this.$store.commit('air/setAllPrice',price)
      return ''
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users = [
        ...this.users,
        {
          username: "",
          id: ""
        }
      ];
    },
    // 选择保险
    handleInsurance(id) {
      // 存在则去除
      if (this.insurances.indexOf(id) > -1) {
        let arr = this.insurances.slice(0);
        arr.splice(this.insurances.indexOf(id), 1);
        this.insurances = arr;
      } else {
        // 不存在添加到insurances
        this.insurances.push(id);
      }
    },
    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.contactPhone) {
        this.$message.error("手机号码不能为空");
        return;
      }
      if (this.contactPhone.length !== 11) {
        this.$message.error("手机号码格式错误");
        return;
      }
      this.$store.dispatch("user/sendCaptcha", this.contactPhone).then(res => {
        this.$message.success("发送成功");
      });
    },

    // 提交订单
    handleSubmit() {
      //   console.log(this.insurances);
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: false,
        captcha: this.captcha,
        seat_xid: this.$route.query.seat_xid, // 座位的id
        air: this.$route.query.id // 航班的id
      };
      console.log(data);
      // 创建订单接口
      this.$axios({
        url: "/airorders",
        method: "POST",
        headers: {
          // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data
      }).then(res => {
        // console.log(res);
        const {id} = res.data.data
        this.$router.push({
          path:"/air/pay",
          query:{
            id
          }
        })
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>