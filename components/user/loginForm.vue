<template>
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        const validateUsername = (rule, value, callback) => {
			const reg = /^1[3-9][0-9]{9}$/;
			// 正则下面的test方法返回布尔值
			if (reg.test(value)) {
				// 验证通过
				callback();
			} else {
				callback("手机号码格式错误");
			}
		};
        return {
            // 表单数据
            form: {
                username: "",   // 登录用户名/手机
                password: ""    // 登录密码
            },
            // 表单规则
            rules: {
                username: [
                { validator: validateUsername, trigger: "blur" }
            ],
            password: [
                { 
                    required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                },
            ],
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
        //    console.log(this.form)
            // 验证表单
        this.$refs['form'].validate((valid) => {
            // 为true表示没有错误
            if (!valid) return;
                // this.$axios({
                //     url: "/accounts/login",
                //     method: "POST",
                //     data: this.form
                // }).then(res => {
                //     // console.log(res.data);
                //     this.$store.commit('user/setUserInfo', res.data)
                // })
                this.$store.dispatch('user/login', this.form).then(res=>{
                    // console.log(res);
                    if (res===true) {
                        this.$message.success('登录成功，返回上一个页面')
                    }
                    
                })
        })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>