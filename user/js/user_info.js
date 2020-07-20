$(function() {
    var layer = layui.layer
    var form = layui.form
    form.verify({



        nickname: function(value) {
            if (value.length > 6)
                return "昵称长度需要在1-6个字符之间"

        }
    })
    initUserInfo()
        //初始化用户的基本信息
    function initUserInfo() {


        $.ajax({


            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                /* console.log(res) */


                form.val('formUserInfo', res.data) /*  第一个是form命名的名称，第二个是OBJ的参数 */

            }
        })

    }


    //重置表单的数据
    $('#btnReset').on('click', function(e) {
        e. //阻止默认事件
            //preventDefault()[dom标准写法(ie678不兼容)]
            //ie678用returnValue
            //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
        preventDefault()
        initUserInfo() /* 调用函数恢复到刚进去的样子 */
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
                    //调取函数以后，更新以后换取页面的头像和昵称等信息
            }
        })
    })

})