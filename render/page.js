var E = window.wangEditor
var editor = new E('#editortoolbar','#editorcontent')  
// 或者 var editor = new E( document.getElementById('editor') )
editor.customConfig.zIndex = 100

editor.customConfig.pasteFilterStyle = false
editor.customConfig.onchange = function (html) {
    // html 即变化之后的内容
    console.log(html)
}
editor.customConfig.pasteTextHandle = function (content) {
    // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
    console.log("粘贴了文本")
    return content
}
editor.customConfig.linkImgCallback = function (url) {
    console.log(url) // url 即插入图片的地址
    return url
}
editor.customConfig.onblur = function (html) {
    // html 即编辑器中的内容  鼠标点击富文本以外的区域
    console.log('onblur', html)
}
editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
editor.create()



//   docInsertTitle()
//docInsertArticle('O3Pw4WWBNAGx6h3M')

// document.getElementById('btn').addEventListener('click', function () {
//     // 如果未配置 editor.customConfig.onchange，则 editor.change 为 undefined
//     // dialog.showSaveDialog({
//     //     title:'保存文件',
//     // }).then(result=>{
//     //     console.log(result.filePath)
//     //     // fs.writeFileSync(result.filePath,editor.txt.html()) //保存html文件   
//     // })
//     // 插入单项
//     docInsertTest()
// })



var rightTemplate = [
	{label:'新建笔记本',accelerator:'ctrl+n',click:function(){
        addNoteTitle()
    }},
	{label:'删除整个笔记本',accelerator:'ctrl+d',click:function(){
        console.log("正在删除笔记本"+activeName)
        dbtitle.remove({
            "_id": activeName
        }, (err, ret) => {})
        initNote()  //初始化标题
    }},
    {label:'删除当前文章',accelerator:'ctrl+v',click:function(){
        console.log("正在删除文章"+activeId)
        dbcontent.remove({
            "_id": activeId
        }, (err, ret) => {})
        initArticle()  //初始化文章
    }}
]
var m = remote.Menu.buildFromTemplate(rightTemplate)
window.addEventListener('contextmenu',function(e){
	e.preventDefault()
	m.popup({window:remote.getCurrentWindow()})
})