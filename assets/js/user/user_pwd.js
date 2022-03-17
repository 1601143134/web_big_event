 $(function () {  
     //自定义密码验证
 var form = layui.form
 //form.verify 数组形式 定义校验规则 
 form.verify({
    pwd:[/^[\S]{6,12}$/     //第一个参数为校验规则
    ,'密码必须6到12位，且不能出现空格'] ,    //第二个为提示信息
    
    rePwd:function (value) {   //形参value拿到的是输入框的值（谁应用这条规则拿谁的值）
        var pwd = $('[name=newPwd]').val()
        if( pwd !== value){
            return '两次密码不一致'
        }
    },
    samePwd:function (value) {
       if(value === $('[name=oldPwd]').val()){
           return '新旧密码不能相同！'
       }
    }

 })

 $('.layui-form').on('submit',function (e) {  
     e.preventDefault()
     $.ajax({
         method:'POST',
         url:'/my/updatepwd',
         data:$(this).serialize(),
         success:function (res) {
            if(res.status !== 0){
                return layui.layer.msg('更新密码失败！')
            }
            layui.layer.msg('更新密码成功！')
            //DOM元素操作重置表单
            $('.layui-form')[0].reset()
         }
     })
 })







 })
