var express = require('express');
var router = express.Router();
var adhhelpers=require('../helpers/adminHelpers/adminlogin')

const verifyLogin=(req,res,next)=>{
  if(req.session.adminloggedIn){
    next()
  }else{
    res.redirect('/admin/login')
  }
}
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('adminLogin')
});

router.get("/",verifyLogin,(req,res)=>{
  res.render("admin")
})

router.post('/login',(req,res)=>{
  console.log(req.body)
  adhhelpers.login(req.body).then((response)=>{
    if(response.status){
      req.session.admin= response.val
      console.log(response.val)
      req.session.adminloggedIn=true
    }
    res.redirect('/admin')  
  })
})


router.get('/signup', function(req, res, next) {
  res.render('adminsignup');
});

router.post('/signup',(req,res)=>{
  adhhelpers.register(req.body).then((response)=>{
    console.log(response)
  })
})

router.get('/routes',verifyLogin, function(req, res, next) {
  res.render('adminRoutes');
});


router.get('/buses',verifyLogin, function(req, res, next) {
  res.render('adminBuses');
});

router.get('/reservation',verifyLogin, function(req, res, next) {
  res.render('adminReservation');
});


router.get('/adminUsers',verifyLogin, function(req, res, next) {
  res.render('adminUsers');
});

router.get('/feedback',verifyLogin, function(req, res, next) {
  res.render('adminfeedback');
});



module.exports = router;
