$(function() {
        //调用getUserInfo函数获取用户基本信息
        getUserInfo()
            //点击退出的功能
        var layer = layui.layer
        $('#btnLogout').on('click', function() {

            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //1.清空本地存储的token数据
                localStorage.removeItem('token')
                    //2.跳转到登录页
                location.href = 'login.html'
                layer.close(index) //关闭询问框
            });

        })










    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /*  headers: {
             Authorization: localStorage.getItem('token') || '' //获取token的值的方法


         },  */ //就是请求头配置对象
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data) //调用renderAvata渲染用户头像
        },
        //不论成功或者失败都需要调用这个函数，防止用户直接输入index.html直接进入，这个是必须要登录过后才能进去
        //在baseApi。js中挂载 
        /*    complete: function(res) {



            //在complete 回调函数中，可以使res.responseJSON拿到服务器响应的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //1.强制清空token
                localStorage.removeItem('token')
                    //2.强制跳转到登录界面
                location.href = '/login.html'
            }
        }
 */
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
        // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}