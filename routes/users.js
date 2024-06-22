var express = require('express');
var router = express.Router();
const loginsignup=require('../helpers/registerandlogin/userlogin')


/* GET users listing. */

const verifyLogin=(req,res,next)=>{
  if(req.session.userloggedIn){
    next()
  }else{
    res.redirect('/gym-owner/login')
  }
}
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login',(req,res)=>{
 loginsignup.login(req.body).then((response)=>{
  if(response.status){
    req.session.user= response.val
    console.log(response.val)
    req.session.userloggedIn=true
  }  
  res.redirect("/users/booking");
 })
})



router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup',(req,res)=>{
  loginsignup.register(req.body).then((response)=>{
    console.log(response)
  })
})

router.get('/booking', function(req, res, next) {
  res.render('homepage');
});

module.exports = router;
