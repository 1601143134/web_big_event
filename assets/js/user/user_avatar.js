$(function () {  
      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比--指定裁剪框的大小
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  var layer = layui.layer

  //为上传按钮绑定点击事件
  $('#btnChooseImage').on('click',function () {  
      $('#file').click()
  })

  //为文件选择框绑定change事件---当选择的文件发生变化触发
  $('#file').on('change',function (e) {  
    // 获取用户选择的文件
    var filelist = e.target.files
    if(filelist.length === 0){
        return layer.msg('请选择照片！')
    }

    //拿到用户选择的照片---用户文件图片保存在files 伪数组里
    var file = e.target.files[0]

    //将文件转化为路径
    var newImageUrl = URL.createObjectURL(file)

    //重新初始化裁剪区域
    $image
        .cropper('destroy')     //销毁旧的裁剪区域
        .attr('src',newImageUrl)//重新设置图片路径
        .cropper(options)       //重新初始化裁剪区域

  })

  //将裁剪后的图片输出为base64格式的图片，并上传到服务器
  $('#btnUpload').on('click',function () {  
      //拿到用户裁剪后的图片
      var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

      // 将图片上传到服务器
      $.ajax({
          method:'POST',
          url:'/my/update/avatar',
          data:{
              avatar:dataURL
          },
          success:function (res) {
             if(res.status !== 0){
                 return layer.msg('更换头像失败！')
             }
             layer.msg('更换头像成功！')
             window.parent.getUserinfo()
          }
      })

  })




})