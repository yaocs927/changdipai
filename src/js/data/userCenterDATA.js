/*
====================
用户中心  js数据传输
====================
*/

$(function () {

  // 登录状态 页面跳转
  var loginStatus = $.fn.cookie('loginStatus');
  console.log(loginStatus);
  if (loginStatus === '1') {
    var tokenNum = $.fn.cookie('tokenNum');
    var userId = $.fn.cookie('userId');
    console.log($.fn.cookie('tokenNum'));
    getUserInfo(userId, tokenNum);
    $('#logoutBtn').removeClass('hide').addClass('active');
  } else {
    console.log('未登录');
  }

  // getUserInfo(userId, tokenNum);

  // 用户数据 订单、红包等
  $('.projectBuilding').on('click', function () {
    $('#popup').removeClass('hide').addClass('show');
    $('#tip').text('栏目建设中，您可以使用其他功能');
    setTimeout(function () {
      $('#popup').removeClass('show').addClass('hide');
    }, 1200);
  });

  // 退出登录
  $('#logoutBtn').on('click', function () {
    $.fn.cookie('tokenNum', null, {
      expires: -1
    });
    $.fn.cookie('userId', null, {
      expires: -1
    });
    $.fn.cookie('loginStatus', '-1');
    $('#popup').removeClass('hide').addClass('show');
    $('#tip').text('已成功退出！');
    setTimeout(function () {
      $('#popup').removeClass('show').addClass('hide');
      window.location.href = 'login.html';
    }, 800);

  });
});


/*
====================
函数部分
====================
*/

// 读取用户信息
function getUserInfo(userId, tokenNum) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/user/get',
    data: {
      'id': userId,
      'token': tokenNum
    },
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      $('#userName').text(data.data.name);
      console.log(data);
    }
  });
}