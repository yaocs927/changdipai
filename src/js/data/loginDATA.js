/*
====================
用户登入，注册 JS数据获取
====================
*/

var tokenNum = null; // 验证令牌存储
var loginStatus = null; // 登录状态值存储

$(function () {

  // 验证手机号
  $('#userPhone').on('change', function () {
    var userPhoneNum = $(this).val();
    checkPhone(userPhoneNum);
  });

  // 验验证码
  $('#vaildateNum').on('change', function () {
    var vaildateNum = $(this).val();
    checkVaildateNum(vaildateNum);
  });

  // 登入/注册
  $('#loginBtn').on('click', function () {
    var userInfo = $('#loginForm').serialize();
    var userPhoneNum = $('#userPhone').val();
    var vaildateNum = $('#vaildateNum').val();
    checkPhone(userPhoneNum);
    checkVaildateNum(vaildateNum);
    if (!userPhoneNum) {
      $('#popup').removeClass('hide').addClass('show');
      $('#tip').text('请填写手机号！');
      setTimeout(function () {
        $('#popup').removeClass('show').addClass('hide');
      }, 1000);
    } else if (!vaildateNum) {
      $('#popup').removeClass('hide').addClass('show');
      $('#tip').text('请填写验证码！');
      setTimeout(function () {
        $('#popup').removeClass('show').addClass('hide');
      }, 1000);
    } else {
      login(userInfo);
    }
  });

  // 发送验证码
  $('#sendVaildateNum').on('click', function () {
    var uid = $('#userPhone').val();
    vaildateNum(uid);
  });
});


/*
====================
函数部分
====================
*/

// 登录/注册 函数
function login(userInfo) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/user/login',
    data: userInfo + '&token=' + tokenNum,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      console.log(getData);
      var data = JSON.parse(getData);
      tokenNum = data.data.token;
      var userId = data.data.user.id;
      console.log(userId);
      // 存储 服务器 返回 新token
      $.fn.cookie('tokenNum', tokenNum);
      $.fn.cookie('userId', userId);
      $.fn.cookie('loginStatus', '1');
      window.location.href = 'userCenter.html';
    }
  });
}

// 发送验证码
function vaildateNum(uid) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/user/mac',
    data: {
      'uid': uid
    },
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      tokenNum = data.data.token;
      // 存储 动态验证码 返回 token
      $.fn.cookie('tokenNum', tokenNum);
    }
  });
}

// 检测手机号
function checkPhone(numData) {
  var reg = /^1[3|4|5|7|8][0-9]{9}$/;
  if (!reg.test(numData)) {
    $('#popup').removeClass('hide').addClass('show');
    $('#tip').text('请填写正确的11位手机号！');
    setTimeout(function () {
      $('#popup').removeClass('show').addClass('hide');
    }, 1000);
  }
}

// 检测验证码
function checkVaildateNum(numData) {
  var reg = /^[0-9]{4,6}$/;
  if (!reg.test(numData)) {
    $('#popup').removeClass('hide').addClass('show');
    $('#tip').text('请填写正确的6位验证码！');
    setTimeout(function () {
      $('#popup').removeClass('show').addClass('hide');
    }, 1000);
  }
}