$(function () {
  filterShow('area');
  filterShow('price');
  filterShow('screen');
  filterShow('sort');


  $('.filter-list-type-left').find('ul li').on('click', function () {
    var self = $(this);
    self.addClass('active');
    self.siblings('li').removeClass('active');
  });

  selectFilter('right');
  selectFilter('mid');

  // 过滤-功能过滤
  $('.filter-list-top-sub li').on('click', function () {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
  // 过滤-重置功能过滤已选条件
  $('#reset').on('click', function () {
    $('.filter-list-top-sub li').removeClass('active');
  });

  $('#confirm').on('click', function () {
    $('.filter-list-screen').addClass('hide').removeClass('show');
    $('.filter-bar-screen').removeClass('active');
    $('.filter-bar-screen').find('i').text('\ue613');
  });
});

// 过滤条件框显示/隐藏
function filterShow(type) {
  $('.filter-bar-'+ type).on('click', function () {
    var self = $(this);
    if ($('.filter-list-'+ type).hasClass('hide')) {
      $('.filter-list-'+ type).addClass('show').removeClass('hide');
      $('.filter-list-'+ type).siblings('.filter-list').addClass('hide').removeClass('show');
      self.addClass('active');
      self.find('i').text('\ue616');
      self.siblings().removeClass('active');
      self.siblings().find('i').text('\ue613');
    } else {
      $('.filter-list-'+ type).addClass('hide').removeClass('show');
      self.removeClass('active');
      self.find('i').text('\ue613');
    }
  });
}

function selectFilter(type) {
  $('.filter-list-type-'+ type).find('ul li').on('click', function () {
    var self = $(this);
    self.addClass('active');
    self.find('i').addClass('show').removeClass('hide');
    self.siblings('li').removeClass('active');
    self.siblings('li').find('i').removeClass('show').addClass('hide');
  });
}








