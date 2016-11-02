$(function () {
  // 详情--地图
  var point = [];
  var point1 = $('#placeName').attr('data-jd');
  var point2 = $('#placeName').attr('data-wd');
  point.push(point1);
  point.push(point2);
  var name = $('#placeName').attr('data-name');
  var map = new AMap.Map('map', {
    zoomEnable:false,
    level: 15,
    center: point
  });
  // 标记点
  var marker = new AMap.Marker({
    map: map,
    position: point
  });
  marker.setMap(map);

  // 点击显示大地图
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

  // 显示更多介绍
  var placeIntroduce = $('.placeIntroduce');
  var piText = $('.placeIntroduce').text();
  if (piText.length > 100) {
    placeIntroduce.attr('name', piText);
    placeIntroduce.html(piText.substring(0, 100) + '...');
  }
  $('#moreIntroduce').on('click', function () {
    if ($('.placeIntroduce').text().length > 110) {
      placeIntroduce.html(placeIntroduce.attr('name').substring(0, 100) + '...');
    } else {
      placeIntroduce.html(placeIntroduce.attr('name'));
    }
  });

  // 显示更多设施
  var num = $('.detail-part-facilities-list li');
  for (var i = 8; i < num.length; i++) {
    num.eq(i).hide();
  }
  $('#moreFacilities').on('click', function () {
    for (var i = 8; i < num.length; i++) {
      num.eq(i).toggle();
    }
  });
});








