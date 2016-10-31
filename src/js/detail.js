$(function () {
  // 详情--地图
  var point = [121.380343,31.137456];
  var name = '娄山关路';
  var map = new AMap.Map('map', {
    zoomEnable:false,
    dragEnable: false,
    level: 15,
    center: point
  });
  // 标记点
  var marker = new AMap.Marker({
    map: map,
    position: point
  });
  marker.setMap(map);

  $('.bigMap').on('click', function (e) {
    marker.markOnAMAP({
      name: name,
      position: marker.getPosition()
    });
  });

  $('.detail-price').on('click', function () {
    if ($('.detail-price-sub').hasClass('hide')) {
      $('.detail-price-sub').addClass('show').removeClass('hide');
      $(this).find('.open').text('\ue616');
    } else {
      $('.detail-price-sub').addClass('hide').removeClass('show');
      $(this).find('.open').text('\ue613');
    }
  });

});








