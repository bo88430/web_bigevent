//每次调用$.get()  或者$.POST() 或者$.ajax()的时候会先调用这个ajaxPrefilter函数 
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //发起AJAX自动拼接根目录
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url)
})