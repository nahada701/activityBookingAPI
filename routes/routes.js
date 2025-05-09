const express=require('express')
const { userRegistrationController, userLoginController } = require('../controllers/userController')
const { addActivityController, getAllActivityController, bookActivityController } = require('../controllers/activityController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router=new express.Router()

router.post('/register',userRegistrationController)

router.post('/login',userLoginController)

router.post('/activity/add',addActivityController)

router.get('/activity/allActivities',getAllActivityController)

router.post('/activity/book/:activityId',jwtMiddleware,bookActivityController)
module.exports=router
