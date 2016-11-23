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
    if (uid.match(/^1[3|4|5|7|8][0-9]{9}$/)) {
      console.log(uid);
      time($(this));
      vaildateNum(uid);
    } else {
      checkPhone(uid);
    }
  });
});


/*
====================
函数部分
====================
*/

var wait=60;
function time(o) {
  if (wait === 0) {
    o.removeClass('disabled');
    o.removeAttr('disabled');
    o.val('重新发送');
    wait = 60;
  } else {
    o.addClass("disabled");
    o.attr('disabled', true);
    o.val('重新发送 ' + wait + ' s');
    wait--;
    setTimeout(function() {
      time(o);
    },
    1000);
    return false;
  }
}

// 登录/注册 函数
function login(userInfo) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/api/v2/user/login',
    data: userInfo + '&token=' + tokenNum,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      var statusNum = data.status;
      console.log(statusNum);
      if (statusNum.toString().match(/^2[0-9]{2}$/)) {
        tokenNum = data.data.token;
        var userId = data.data.user.id;
        // 存储 服务器返回新token
        $.fn.cookie('tokenNum', tokenNum);
        $.fn.cookie('userId', userId);
        $.fn.cookie('loginStatus', '1');
        window.location.href = 'userCenter.html';
      } else {
        $('#popup').removeClass('hide').addClass('show');
        $('#tip').text('发生错误了！');
        setTimeout(function () {
          $('#popup').removeClass('show').addClass('hide');
          history.go(0);
        }, 1000);
      }
    }
  });
}

// 发送验证码
function vaildateNum(uid) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/api/v2/user/mac',
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