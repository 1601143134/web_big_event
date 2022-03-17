//注意：每次调用$.get()或者$.post $.ajax()的时候
//会先调用ajaxPrefilter 这个函数，在login.js之前导入
//在这个函数中，可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {  
    //★ 拼接根路径！
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为 /my 开头的api(有权限的接口) 配置请求头 headers
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    //全局挂载 complete 回调函数
    options.complete = function (res) {  
         //在ccomplete函数中，可以使用res.responseJSON拿到服务器响应回来的数据
         if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //强制清空localstorage
            localStorage.removeItem('token')
            //强制跳回login页面
            location.href = '/codelib/login.html'
        }
    }
    
    
})