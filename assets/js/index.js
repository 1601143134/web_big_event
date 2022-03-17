$(function () {  
    getUserinfo()

    $('#btnLogout').on('click',function () {  
        //提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            // 清楚localstorage 存储的数据 token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/codelib/login.html'
            //关闭confirm询问框
            layer.close(index);
          });
    })
})


//获取用户的基本信息--需要在headers请求头进行身份认证
function getUserinfo() {  
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //headers 就是请求头配置对象，以/my 开头的api需要配置请求头
        // headers:{        优化进 $.ajaxPrefilter() 函数
        //     // 获取localstorage 对应的数据
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function (res) {
        //    console.log(res);
        if(res.status !== 0){
            return layui.layer.msg('获取用户信息失败')
        }
        //调用 renderAvatar 渲染用户头像
        renderAvatar(res.data)
        }
        // complete:function (res) {    优化进 $.ajaxPrefilter() 函数
        //     //在ccomplete函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //强制清空localstorage
        //         localStorage.removeItem('token')
        //         //强制跳回login页面
        //         location.href = '/codelib/login.html'
        //     }

        // }
    })
}

//渲染用户头像
function renderAvatar(user) {
   //获取用户的名称
   var name = user.nickname || user.username
   //设置欢迎的文本
   $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
   //按需渲染用户头像
   if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
   }else{
        $('.layui-nav-img').hide()
        //★ 直接用name[0],将name字符串当做数组来用，可以获取第一个字符
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
   }
}