$(function () {
    //1-实现登录注册的切换
    $('#link_reg').on('click',function () {  
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function () {  
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form 对象
    var form = layui.form
    var layer = layui.layer

    //2-通过form.verify()函数自定义校验规则
    form.verify({
        //用数组的形式定义 pwd 校验规则
        pwd:[/^[\S]{6,12}$/,
        '密码必须6到12位，且不能出现空格'] ,

        //校验两次密码是否一致
        repwd:function (value) {   //形参value拿到的是密码确认框的值
            var pwd = $('.reg-box [name=password]').val()
            if( pwd !== value){
                return '两次密码不一致'
            }
        }
    })

    //3-监听注册表单的提交事件
     

    $('#form-reg').on('submit',function (e) {
        var data = {username:$('#form-reg [name=username]').val(),
        password:$('#form-reg [name=password]').val()}
        
        //★ 阻止默认的提交行为
        e.preventDefault()
        // console.log(data);
        $.post('/api/reguser',
        data,function (res) {  
            if(res.status !== 0){
                //使用layer 提示信息
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录')
            //模拟人的点击行为，切换到登录界面
            $('#link_login').click()
        })
    })

    //4-监听登录表单的提交事件
    $('#form-login').on('submit',function (e) {  
        
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //$(this).serialize() 快速获取表单数据
            data:$(this).serialize(),
            success:function (res) {  
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                //token 用于有权限接口的身份认证
                //将登陆成功得到的token值存入localstorage
                localStorage.setItem('token',res.token) 
                // console.log(res.token);
                
                location.href = '/codelib/index.html'
            }
        })
    })
    

    
    
})