var express = require('express');
var router = express.Router();

var query=require("../mysql");
/* GET home page. */
router.get('/api/get/list', function(req, res, next) {
    let {page,page_size,type}=req.query;  
    console.log(page,page_size,type);
    console.log(type,"type");
    var sqlCount=`select count(*) from list where type=?`;
    var total;
    query(sqlCount,[type],(err,result)=>{

      if(err){
        res.json({code:0,msg:err});
      }else{
          // res.json({code:1,msg:result});
          //  console.log(result,"result");
          queryBack()
          total=Math.ceil(result[0]["count(*)"]/page_size);
          console.log(total);
      }

    })
    function  queryBack(){
        var start=(page-1)*page_size;
        var sql=`select * from list where type=? limit ${start},${page_size} `;
        query(sql,[type],(err,result)=>{
          if(err){
            res.json({code:0,msg:error});
          }else{
              res.json({code:1,msg:result,total:total});
              console.log(result);
          }

        })
    }

});

module.exports = router;
