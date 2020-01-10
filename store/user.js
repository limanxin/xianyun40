// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {},
}) 
export const mutations = {
    // 保存用户信息到state
    setUserInfo(state, data){
        state.userInfo = data;
    },
    // //清除用户数据
    // cleanUserInfo(state,info){

    // }
};

export const actions = {
    login(store,data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            // console.log(res.data);
            this.$router.back();
            store.commit('setUserInfo', res.data)
            return true
        })
    },
    //发送手机验证码
    sendCaptcha(store,data){
        return this.$axios({
            url: "/captchas",
            method: 'POST',
            data: {
                tel: data
            }
        })
    },
    register(store,data){
        return this.$axios({
            url: "/accounts/register",
            method: 'POST',
            data
        }).then(res=>{
            this.$router.back();
            store.commit('setUserInfo', res.data);
            return true;
        })
    },
    // 注册的请求
    // register(store, data){
    //     return this.$axios({
    //         url: "/accounts/register",
    //         method: 'POST',
    //         data
    //     }).then(res => {
    //         // 登录成功后返回上一个页面
    //         this.$router.back();
    //         // 调用user下的mutations的方法
    //         store.commit("setUserInfo", res.data);

    //         return true;
    //     })
    // }
};