/*
====================
详情页 JS数据获取
====================
*/

$(function () {
  getPlace();
});


/*
====================
函数部分
====================
*/

function getPlace(id) {
  $.ajax({
    type: 'GET',
    url: '../../data/test.json',
    // dateType: 'JSONP',
    // jsonp: 'callback',
    success: function (getData) {
      var data = getData;
      var placeDetail = data.data.service;
      // 场地相册
      $.each(placeDetail.album.photo, function (i, cur) {
        $('#placePhotoList').append('<div class="swiper-slide img-wrapper-box-list" style="background-image: url(' + cur.url + '); background-repeat: no-repeat; background-position: center center;">Slide 2</div>');
      });
      var mySwiper = new Swiper ('.swiper-container', {
        pagination : '.swiper-pagination',
        paginationType : 'fraction'
      });
      // 场地名
      $('#placeName').text(placeDetail.name);
      // 场地地址
      $('#placeAddress').text(placeDetail.address);
      // 场地价格
      $('#placeMainPrice h4').text(placeDetail.name.substr(0,10));
      $.each(placeDetail.offer, function (i, cur) {
        $('#placePriceList').append('<div class="detail-price-sub-list-item clearfix">' +
        '<p class="detail-price-sub-list-item-left">' + cur.name + '</p>' +
        '<div class="detail-price-sub-list-item-right"><i>￥</i>' + cur.price + '<i>/天</i></div>' +
        '</div>');
      });
      // 场地面积
      $('#placeSize').text(placeDetail.area);
      // 场地介绍
      $('#placeIntroduce').text(placeDetail.brief[0].content);
      // 显示更多介绍
      var placeIntroduce = $('#placeIntroduce');
      var piText = placeIntroduce.text();
      if (piText.length > 100) {
        placeIntroduce.attr('data-content', piText);
        placeIntroduce.html(piText.substring(0, 100) + '...');
        piText = placeIntroduce.text();
      }
      // 场地设施
      $.each(placeDetail.amenity, function (i, cur) {
        $('#placeAmenity').append('<li><i class="cdp-iconfont">' + cur.view + '</i><span>' + cur.name + '</span></li>');
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
    }
  });
}






