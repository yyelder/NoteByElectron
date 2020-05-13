new Vue({
    el: '#app',
      data: function() {
        return { 
          visible: false,
          dialogFormVisible:false,
          form: {
            name: '',
            state: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          formLabelWidth: '120px',
          activeName:'',     //当前选中笔记
          activeId:'',       //当前选中文章
          articleTitle:'',   //当前选中文章名称
          currentRow: '',    //当前文章行
          topcommand:false,
          updateArticle:false,
          tabPosition: require('../static/config.json').position,
          notetitle:[],
          note:[]     
        }
      },
      created(){
        //dbtitle   dbcontent
        // var E = window.wangEditor
        // var editor = new E('#editor')
        // // 或者 var editor = new E( document.getElementById('editor') )
        // editor.create()
        this.initNote()
      },
      methods:
        {
          initNote(){   //初始化笔记标题
            var _this = this
            _this.notetitle = []
            dbtitle.find({}, function (err, docs){
              console.log(docs)
              try {
                this.activeName = docs[0]._id
              } catch (error) {
                return 
              }
              for (let index = 0; index <docs.length; index++) {
                  // console.log((index+1)+":"+docs[index].notename)
                  _this.notetitle.push({notename:docs[index].notename,_id:docs[index]._id})
                  // htmllet += '<el-tab-pane label="'+docs[index].title+'">用户管理</el-tab-pane>'
                  // document.getElementById("doctitle").innerHTML = htmllet;   
              }
            })
          },
          //加载标题数据
          setCurrent:(row)=>{
            // document.getElementById('singleTable')[0].setCurrentRow(row);
            console.log("111")
          },
          handleCurrentChange(val) {     //选中当前文章  执行显示文章到富文本
            this.currentRow = val;
            console.log(this.currentRow)
            try {
              this.articleTitle = this.currentRow.title
              if(this.currentRow._id){
                docInsertArticle(this.currentRow._id)
              }
            } catch (error) {
              console.log(error)
            }
            
          },
          handRight(row, column, event){     //右键当前笔记文章  显示了文章id
              console.log("当前文章id"+row._id)
              this.activeId = row._id  
              window.activeId = this.activeId;
          },
        handleCommand1(command) {    //命令
          this.$message('click on item ' + command);
          if(command == "addNoteTitle"){
            this.addNoteTitle()
          }
        },
        handleCommand2(command) {   //切换布局
          this.$message('click on item ' + command);
          this.tabPosition = command
          this.position = command
          // if(command === "top"){this.topcommand=true}else{this.topcommand=false}
        },
        updateNote(){     //更新笔记
          // db.remove({  _id: this.currentRow._id }, {}, function (err, numRemoved) {
          //   // numRemoved = 1
          // });
          dbcontent.update({
            _id: this.currentRow._id
          }, {$set: { content: editor.txt.html(),title:this.articleTitle,}}, (err, ret) => {
              this.$notify({
                title: '保存成功',
                message: '你成功的更新保存一篇文章',
                type: 'success'
              });
          });
          this.updateArticle = true
          this.initArticle()
          this.updateArticle = false
        },
        addNote(){            //添加笔记
          dbcontent.insert({
              notename:this.activeName,
              title:this.articleTitle,
              content: editor.txt.html()
          }, (err, ret) => {
            this.$notify({
              title: '添加成功',
              message: '你成功的添加一篇文章',
              type: 'success'
            });
          })
          this.initArticle()
        },
        handleClick(tab, event){ //每次切换笔记的执行  
          console.log("当前笔记id"+tab.name);
          window.activeName = tab.name
          this.activeName = tab.name   //选中笔记提交成全局变量
          this.initArticle()
        },
        initArticle(){   //初始化+获得笔记数据
            _this = this
            _this.note = []
            if(!this.updateArticle)  //如果不更新文章
            {
              _this.currentRow = ''
              _this.articleTitle = ''
              editor.txt.clear()
            }
            dbcontent.find({ "notename": this.activeName, }, function (err, docs) {
              console.log(docs)
              for (let index = 0; index <docs.length; index++) {
                console.log((index+1)+":"+docs[index].notename)
                _this.note.push({notename:docs[index].notename,title:docs[index].title,_id:docs[index]._id})
                
              }
          });
          window.note = _this.note  //选中笔记内容提交成全局变量（没用到）
        },
        addNoteTitle(){
          this.dialogFormVisible = true
        },
        closeDialog(){
          this.dialogFormVisible = false

          console.log(this.form)
            dbtitle.insert({
              notename:this.form.name,
              descripte:this.form.state,
              _id: 't'+((this.notetitle).length+1)
          }, (err, ret) => {
            this.$notify({
              title: '添加成功',
              message: '你成功的添加一个笔记',
              type: 'success'
            });
          })
          console.log("关闭django")
          this.initNote()
        }
      },
      mounted(){
        window.addNoteTitle = this.addNoteTitle;
        window.initNote = this.initNote;
        window.initArticle = this.initArticle;
      }
  })