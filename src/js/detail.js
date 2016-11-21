/*
====================
详情页 JS交互
====================
*/

$(function () {

  // 点击显示大地图
  // $('.bigMap').on('click', function (e) {
  //   marker.markOnAMAP({
  //     name: name,
  //     position: marker.getPosition()
  //   });
  // });
  //

  // 显示价格列表
  $('.detail-price').on('click', function () {
    if ($('.detail-price-sub').hasClass('hide')) {
      $('.detail-price-sub').addClass('show').removeClass('hide');
      $(this).find('.open').text('\ue616');
    } else {
      $('.detail-price-sub').addClass('hide').removeClass('show');
      $(this).find('.open').text('\ue613');
    }
  });

  // 显示更多介绍
  // var placeIntroduce = $('.placeIntroduce');
  // var piText = $('.placeIntroduce').text();
  // if (piText.length > 100) {
  //   placeIntroduce.attr('name', piText);
  //   placeIntroduce.html(piText.substring(0, 100) + '...');
  // }
  // $('#moreIntroduce').on('click', function () {
  //   if ($('.placeIntroduce').text().length > 110) {
  //     placeIntroduce.html(placeIntroduce.attr('name').substring(0, 100) + '...');
  //   } else {
  //     placeIntroduce.html(placeIntroduce.attr('name'));
  //   }
  // });

  // 显示更多介绍
  var placeIntroduce = $('#placeIntroduce');
  var piText = placeIntroduce.text();
  $('#moreIntroduce').on('click', function () {
    if (piText.length > 110) {
      placeIntroduce.html(placeIntroduce.attr('data-content').substring(0, 100) + '...');
      piText = placeIntroduce.text();
    } else {
      placeIntroduce.html(placeIntroduce.attr('data-content'));
      piText = placeIntroduce.text();
    }
  });

});