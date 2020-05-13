var mysql = require('mysql');  
  
// 创建一个数据库连接池  
var pool = mysql.createPool({  
  connectionLimit: 50,  
  host:"127.0.0.1",  
  port:"3306", 
  user: "root",  
  password: "root",  
  database: "note" 
});  
  
/** 
 * 执行SQL，增、删、改、查全用这一个函数 
 * 参数： 
 *  sql：要执行的SQL语句 
 *  P：参数，如果没有可不传，可以是数组或对象类型 
 *  C：回调函数，执行成功后调用的语句 
 */  
exports.query = function (sql, P, C) {  
  var params = [];  
  var callback;  
  
  if (arguments.length == 2 && typeof arguments[1] == 'function') {  
    callback = P;  
  } else if (arguments.length == 3 && Array.isArray(arguments[1]) && typeof arguments[2] == 'function') {  
    params = P;  
    callback = C;  
  } else {  
    //会导致程序崩溃退出。  
    throw new Error('对不起，参数个数不匹配或者参数类型错误');  
  }  
  
  
  // 从池子里面拿一个可以使用的连接  
  pool.getConnection(function (err, connection) {  
    if(err){  
      callback.apply(null,[err]);  
      return;  
    }  
      
    connection.query(sql, params, function () {  
      // 使用完毕之后，将该连接释放回连接池  
      connection.release();  
      callback.apply(null, arguments);  
    });  
  });  
};  