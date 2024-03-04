const { auth } = require('../middleware/authentication/auth');
const { addMessage, getMessages } = require('../services/message.services')

const router=require('express').Router()
router.post('/addMessage',addMessage);
router.get('/getMessages',auth,getMessages);
module.exports=router