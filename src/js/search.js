/*
====================
搜索结果页  js交互
====================
*/

$(function () {
  // 设置过滤条件下拉列表高度
  var screenH = $(window).height();
  $('.filter-list').css('height', (screenH - 80) + 'px');

  // 过滤条件下拉列表显示/隐藏
  filterShow('area');
  filterShow('price');
  filterShow('screen');
  filterShow('sort');

  // 过滤-选择区域、价格、排序条件
  $('.filter-list-type-left').find('ul li').on('click', function () {
    var self = $(this);
    self.addClass('active');
    self.siblings('li').removeClass('active');
  });
  selectFilter('area');
  selectFilter('price');
  selectFilter('sort');

  // 过滤-功能过滤
  // $('.filter-list-top-sub').on('click', 'li', function () {
  //   if (!$(this).hasClass('active')) {
  //     $(this).addClass('active');
  //   } else {
  //     $(this).removeClass('active');
  //   }
  // });

  // 过滤-重置功能过滤
  $('#reset').on('click', function () {
    $('.filter-list-top-sub li').removeClass('active');
  });
  // 过滤-确定功能过滤
  $('#confirm').on('click', function () {
    $('.filter-list-screen').addClass('hide').removeClass('show');
    $('.filter-bar-screen').removeClass('active');
    $('.filter-bar-screen').find('i').text('\ue613');
  });
});


/*
====================
函数部分
====================
*/

// 过滤条件框显示/隐藏
function filterShow(type) {
  $('.filter-bar-' + type).on('click', function () {
    var self = $(this);
    // if ($('.filter-list-'+ type).hasClass('hide')) {
    $('.filter-list-' + type).addClass('show').removeClass('hide');
    $('.filter-list-' + type).siblings('.filter-list').addClass('hide').removeClass('show');
    self.addClass('active');
    self.find('i').text('\ue616');
    self.siblings().removeClass('active');
    self.siblings().find('i').text('\ue613');
    // } else {
    // $('.filter-list-'+ type).addClass('hide').removeClass('show');
    // self.removeClass('active');
    // self.find('i').text('\ue613');
    // }
  });
}

// 过滤条件选择
function selectFilter(type) {
  $('.filter-list-' + type + '-option').find('ul').on('click', 'li', function () {
    var self = $(this);
    self.addClass('active');
    self.find('i').addClass('show').removeClass('hide');
    self.siblings('li').removeClass('active');
    self.siblings('li').find('i').removeClass('show').addClass('hide');
    self.parents('.filter-list').addClass('hide').removeClass('show');
    $('.filter-bar-' + type).removeClass('active');
    $('.filter-bar-' + type).find('i').text('\ue613');
  });
}