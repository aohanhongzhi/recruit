<template>
  <div class="container">
    <div class="userForm">
      <h3>注册leader直聘</h3>
      <el-form :model="hrInfo" status-icon :rules="hrrules" ref="hrInfo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="hrInfo.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="hrInfo.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="hrInfo.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="hrInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model.number="hrInfo.code" style="width: 200px;padding-right: 10px;"></el-input>
          <el-button  @click="sendCode">
            {{this.msg}}
          </el-button>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="hrInfo.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: -2.2rem" @click="finderSubmit('hrInfo')">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="footer-tip2">
      <i class="el-icon-back" @click="backIndex">返回</i>
      <span class="toLogin">已有账号？<span @click="toLogin">直接登录</span></span>
      </div>
    </div>
  </div>
</template>

<style>
@import "../assets/Animate/animate.min.css";

html * {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.container {
  border: 1px solid #ededed;
  width: 100%;
  background: url("../assets/bgimg.jpg") no-repeat;
  background-size: 100% 100%;
  min-height: 1000px;
}

.userForm {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #ededed;
  width: 450px;
  height: 580px;
  margin: 150px auto 150px auto;
  box-shadow: 0px 5px 8px #888;
  border-radius: 8px;
}

.userForm h3 {
  color: #888;
  margin-top: 25px;
}

.demo-ruleForm {
  position: relative;
  top: 14px;
  left: -14px;
  padding: 14px;
}

.toLogin {
  color: #5a5a5a;
  font-size: 14px;
}

.toLogin span {
  color: #5a5a5a;
  cursor: pointer;
}

.el-icon-back {
  font-size: 14px;
  color: #5a5a5a;
  cursor: pointer;
}
.footer-tip2 {
  margin: auto 30px auto 40px;
  display: flex;
  justify-content: space-between;
}
</style>

<script>
/* eslint-disable indent */

import fetch from "../api/fetch";

export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.hrInfo.checkPass !== "") {
          this.$refs.hrInfo.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.hrInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isRegister: false,
      msg: "发送验证码",
      count: "",
      timer: null,
      show: true,
      confirmCode: "",
      options: [],
      hrInfo: {
        password: "",
        checkPass: "",
        phone: "",
        username: "",
        email: "",
        code: ""
      },
      hrrules: {
        code: [{ validator: checkCode, trigger: "blur" }],
        username: [{ validator: validUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.addHrRegister();
  },
  methods: {
    addHrRegister() {
      let form = document.getElementsByClassName("userForm")[0];
      form.classList.add("animated");
      form.classList.add("bounceInDown");
    },
    toLogin() {
      this.$router.push({ name: "login" });
    },
    backIndex() {
      this.$router.push({ name: "index" });
    },
    sendCode() {
      const TIME_COUNT = 60;
      fetch
        .getCode(this.hrInfo.phone)
        .then(res => {
          if (res.status === 200) {
            this.confirmCode = res.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.msg = this.count + "s后发送";
            if (this.count === 0) {
              this.msg = "发送验证码";
            }
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    hrSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    },
    finderSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let res = {
            email: this.hrInfo.email,
            phone: this.hrInfo.phone,
            password: this.hrInfo.password,
            username: this.hrInfo.username
          };
          fetch
            .userRegister(res)
            .then(res => {
              if (res.status == 200) {
                console.log("验证码", this.confirmCode, this.hrInfo.code);
                if (this.confirmCode == this.hrInfo.code) {
                  this.$message({
                    message: "注册成功",
                    type: "success"
                  });
                  this.$router.push({ name: "login" });
                } else if (res.data.code == 1004) {
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                  });
                } else {
                  this.$message({
                    message: "验证码错误",
                    type: "warning"
                  });
                }
              }
            })
            .catch(e => {
              this.$message({
                message: "注册失败",
                type: "warning"
              });
            });
        }
      });
    }
  }
};
</script>
