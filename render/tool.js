//添加文章成功
InsertSuccess = function(){
    this.$notify({
        title: '添加成功',
        message: '你成功的添加一篇文章',
        type: 'success'
      });
}
//保存文章成功
SavetSuccess = function(){
    this.$notify({
        title: '保存成功',
        message: '你成功的更新保存一篇文章',
        type: 'success'
      });
}