$(function () {
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

  $('#selectArea').on('touchstart', function (e) {
    $('#areaList').show();
    e.stopPropagation();
  });
  $('#areaList li').on('touchstart', function (e) {
    $('#selectArea span').text($(this).text());
    $('#areaList').hide();
    e.stopPropagation();
  });
});

new Vue({
  el: '#cdp-index',
  data: {
    areas: ['上海', '北京', '南京', '苏州']
  }
});