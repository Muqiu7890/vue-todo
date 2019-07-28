const express = require('express')
const sha1 = require('sha1')
const userRouter = express.Router()
userRouter.post('/user/login',(req, res, next) => {
    const {username,password} = req.body
    if(username === 'qiaojing' && '6ce51de8db9a89b373c61716514f5483e9116688' === sha1(password)) {
        req.session.user = {username}
        res.status(200).json({
            success:  1,
            data: {
                username: 'qiaojing'
            }
        })
        next()
    } else {
        res.status(400).json({
            success:  0,
            message: 'username or password error'
        })
    }
})

module.exports = userRouter

//6ce51de8db9a89b373c61716514f5483e9116688
