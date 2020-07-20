//每次调用$.get()  或者$.POST() 或者$.ajax()的时候会先调用这个ajaxPrefilter函数 
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //发起AJAX自动拼接根目录
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url)




    //为统一有权限接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {

        options.headers = { Authorization: localStorage.getItem('token') || '' }

    }




    //全局统一挂载complete回调函数
    options.complete = function(res) {



        //在complete 回调函数中，可以使res.responseJSON拿到服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
                //2.强制跳转到登录界面
            location.href = '/login.html'
        }
    }



})