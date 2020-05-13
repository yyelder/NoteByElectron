// 数据库操作
const nedb = require('nedb');

//文件
const {dialog} = require('electron').remote;
//导入remote
const {remote} = require('electron')

// this.path = dialog.showOpenDialog({properties: ['openFile']})[0];
let buf = new Buffer(1024);

// const fs = require('fs');

const dbcontent = new nedb({
    filename: './static/content.db',
    autoload: true
  });
const dbtitle = new nedb({
    filename: './static/title.db',
    autoload: true
});

//根据id加载文章
docInsertArticle = function(id){
    dbcontent.findOne({ _id: id }, function (err, docs) {
        editor.txt.html(docs.content)
    });
}

//测试
docInsertTest = function(){
    dbcontent.insert({
        notename:"123",
        title:"123",
        content: editor.txt.html()
    }, (err, ret) => {
        console.log("insert success")
    }).catch(err=>{
        console.log(err)
    })
}

