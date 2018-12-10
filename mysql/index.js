var mysql=require("mysql");

var config={
    port:"3306",
    host:"localhost",
    user:"root",
    password:"root",
    database:"zk2e",
    connectionLimit:100//可以连接100次
}

var connection=mysql.createPool(config);
/**
 *
 *
 * @param {字符串} //sql
 * @param {数组}// query
 * @param {回调函数} fn
 */
module.exports=function(sql,query,fn){

    
    fn=fn?fn:query;
    query=query||[];

    connection.getConnection((err,connect)=>{
        if(err){
            fn(err)
        }else{
            connect.query(sql,query,(err,result)=>{
                queryBack(err,result);
                connect.release();    
            })
        }
    })

    function queryBack(err,result){
        if(err){
            fn(err);
        }else{
            fn(null,result);
        }
    }
}
