const express = require('express')
const sha1 = require('sha1')
const userRouter = express.Router()
userRouter.post('/login',(req, res) => {
    const {username,password} = req.body
    if(username === 'qiaojing' && '6ce51de8db9a89b373c61716514f5483e9116688' === sha1(password)) {
        req.session.user = {
            username
        }
        res.status(200).json({
            err_code:  0,
            message: 'login success'
        })
    } else {
        res.status(401).json({
            err_code:  1,
            message: 'username or password error'
        })
    }
})

module.exports = userRouter

//6ce51de8db9a89b373c61716514f5483e9116688
