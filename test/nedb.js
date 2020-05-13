// 加载模块
const nedb = require('nedb');
 
// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
  filename: './static/data.db',
  autoload: true
});
 
// 插入单项
db.insert({
  name: 'tom'
}, (err, ret) => {});
 
// 插入多项
db.insert(
  [
    { name: 'tom' },
    { name: 'jerry' }
  ]
, (err, ret) => {});
 
// 查询单项
db.findOne({
  name: 'tom'
}, (err, ret) => {});
