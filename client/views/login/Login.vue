<template>
    <form class="login-form" @submit="doSubmit">
        <h1>
            <span>Login</span>
            <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
        </h1>
        <input
                type="text"
                class="login-input"
                placeholder="Username"
                v-model="username"
        >
        <input
                type="password"
                class="login-input"
                placeholder="Password"
                autocomplete="new-password"
                v-model="password"
        >
        <button type="submit" class="login-btn">登 录</button>
    </form>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Login",
        metaInfo: {
            title: 'Login'
        },
        data() {
            return {
                username: '',
                password: '',
                errorMsg: ''
            }
        },
        methods: {
            ...mapActions(['login']),
            validate() {
                if (!this.username.trim()) {
                    this.errorMsg = '姓名不能为空'
                    return false
                }
                if (!this.password.trim()) {
                    this.errorMsg = '密码不能为空'
                    return false
                }
                this.errorMsg = ''
                return true
            },
            doSubmit(e) {
                e.preventDefault()
                if (this.validate()) {
                    console.log({
                        username: this.username,
                        password: this.password
                    })
                    this.login({
                        username: this.username,
                        password: this.password
                    }).then(() => {
                        this.$router.replace('/app')
                    })
                }


            }
        }
    }
</script>

<style lang="stylus" scoped>
    .login-form
        display flex
        flex-direction column
        align-items flex-start
        width 350px
        margin 0 auto
        padding 20px
        background-color #fff
        h1
            font-weight 500
            color rgb(55, 94, 99)

    .login-input
        appearance none
        padding 0 10px
        line-height 30px
        margin-bottom 20px
        border 1px solid #aaa
        width 90%
        border-radius 0
        box-shadow 0 0 0

    .login-btn
        appearance none
        width 30%
        line-height 30px
        text-align center
        margin 0 auto
        background-color #DEB887
        color #fff
        cursor pointer
        border-color #DEB887
        transition all .3s
        &:hover
            border-color #EE9A49
            background-color #EE9A49

    .error-msg
        font-size 12px
        color red

    @media screen and (max-width: 600px) {
        .login-form {
            width 90%
        }

        .login-input {
            line-height 40px
        }
    }
</style>