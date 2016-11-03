$(function () {
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

});