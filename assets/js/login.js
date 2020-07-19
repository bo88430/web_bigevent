$(function() {

    //点击去注册账号
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })









    //去登陆链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //导入自定义的验证方式 从layui中获取form对象
    var layer = layui.layer
    var form = layui.form
        //通过form自定义校验规则
        //自定义一个校验规则 通过form.verify()
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两次密码是否一致的规则
            repwd:
            //通过形参拿到确认密码框的内容 还需要知道密码框的内容  然后进行等于比较
                function(value) {
                var pwd = $('.reg-box [name = password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }



        })
        //监听注册表单接口事件

    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
                //阻止默认事件
                //preventDefault()[dom标准写法(ie678不兼容)]
                //ie678用returnValue
                //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
            var data = {
                    username: $('#form_reg [name = username]').val(),
                    password: $('#form_reg [name = password]').val()
                }
                //将数据定义出来，必须放在这个函数内，放在外面不能被执行
            $.post('/api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功,请登录')
                        //模拟人的点击，注册以后自动跳转到登录
                    $('#link_login').click()

                })


        })
        //监听登录表单的提交数据
    $('#form_login').submit(function(e) {
        e.preventDefault() //阻止默认事件
        $.ajax({
            url: '/api/login', //http://ajax.frontend.itheima.net  放在了baseApi.js中
            method: 'POST',
            data: $(this).serialize(),
            //快速获取表单信息
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = 'index.html'

            }



        })
    })


})