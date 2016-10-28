$(function () {
  // 滚动显示 浮动搜索条
  $(window).scroll(function () {
    var scrollHeight = $(this).scrollTop();
    if (scrollHeight > 270) {
      $('#float-search').css({
        top: 0
      });
    } else {
      $('#float-search').css({
        top: '-100px'
      });
    }
  });

  // 显示地区选择菜单
  $('#selectArea').on('click', function () {
    if ($('#areaList').hasClass('hide')) {
      $('#areaList').removeClass('hide').addClass('show');
    }
  });

  // 选择地区
  $('#areaList li').on('click', function () {
    $('#selectArea span').text($(this).text());
    $('#areaList').removeClass('show').addClass('hide');
  });
});

