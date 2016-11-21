/*
====================
全局  js交互
====================
*/

$(function () {

  var screenW = $(window).width();
  var screenH = $(window).height();

  // 设置提示信息弹出层 宽高
  $('#popup').css({
    'width': screenW + 'px',
    'height': screenH + 'px'
  });

  // 返回上一页
  $('#goBack').on('click', function () {
    history.back(-1);
  });

  // 顶部菜单/搜索条  点击展开菜单
  $('.top-search-menu').on('click', function () {
    if ($('.top-search-list').hasClass('hide')) {
      $('.top-search-list').addClass('show').removeClass('hide');
    } else {
      $('.top-search-list').addClass('hide').removeClass('show');
    }
  });



  // 登录状态页面跳转
  // $('.userBtn').on('click', function () {
  //   var loginStatus = $.fn.cookie('loginStatus');
  //     if (loginStatus) {
  //       window.location.href = 'userCenter.html';
  //     } else {
  //       window.location.href = 'login.html';
  //     }
  // });
  $('.linkLogin').on('click', function () {
    var loginStatus = $.fn.cookie('loginStatus');
    if (loginStatus !== '1') {
      window.location.href = 'login.html';
    }
  });


});






























