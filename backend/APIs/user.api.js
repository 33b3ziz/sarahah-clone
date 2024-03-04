const { userValidation } = require('../middleware/validation/user.validation')
const {signUp,signIn, verifyEmail}=require('../services/user.services')
const router=require('express').Router()
router.post('/signUp',userValidation,signUp)
router.post('/signIn',signIn)
router.get('/verifyEmail/:token',verifyEmail)
module.exports=router