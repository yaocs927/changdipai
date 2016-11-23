/*
====================
详情页 JS数据获取
====================
*/

var curPlaceId = null;

$(function () {
  // 获取当前场地ID
  var curPlaceId = location.search.substring(location.search.indexOf('=') + 1);
  // curPlaceId = $.fn.cookie('curPlaceId');
  getPlace(curPlaceId);
});


/*
====================
函数部分
====================
*/

function getPlace(id) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/api/v2/service/get?id=' + id,
    dateType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = getData;
      var placeDetail = data.data.service;
      var citycode = [{
        'cityName': '上海',
        'cityCode': '021'
      }, {
        'cityName': '北京',
        'cityCode': '010'
      }];
      // 场地相册
      $.each(placeDetail.album.photo, function (i, cur) {
        $('#placePhotoList').append('<div class="swiper-slide img-wrapper-box-list" style="background-image: url(http://m.changdipai.com/' + cur.url + '); background-repeat: no-repeat; background-position: center center;"></div>');
      });
      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      });
      // 场地名
      $('#placeName').text(placeDetail.name);
      // 场地地址
      $('#placeAddress').text(placeDetail.address);
      // 场地小图片
      $('#placeSmallPic').css({
        'background-image': 'url(http://m.changdipai.com/' + placeDetail.album.cover.url + ')',
        'background-repeat': 'no-repeat',
        'background-position': 'center center'
      });
      // 场地价格
      $('#placeMainPrice h4').text(placeDetail.name.substr(0, 10));
      $.each(placeDetail.offer, function (i, cur) {
        $('#placePriceList').append('<div class="detail-price-sub-list-item clearfix">' +
          '<p class="detail-price-sub-list-item-left">' + cur.name + '<i>' + cur.brief + '</i></p>' +
          '<div class="detail-price-sub-list-item-right"><i>￥</i>' + cur.price + '<i>/天</i></div>' +
          '</div>');
      });
      // 场地面积
      $('#placeSize').text(placeDetail.area);
      // 场地介绍
      var oldContentStr = placeDetail.brief[0].content;
      var newContentStr;
      if (oldContentStr.indexOf('\r') >= 0 || oldContentStr.indexOf('\n') >= 0) {
        newContentStr = oldContentStr.replace(/\r\n/g, '<br />');
      }
      $('#placeIntroduce').text(newContentStr);
      $('#placeIntroduce').attr('data-content', newContentStr);
      // 显示更多介绍
      var placeIntroduce = $('#placeIntroduce');
      var piText = placeIntroduce.text();
      if (piText.length > 100) {
        placeIntroduce.html(piText.substring(0, 100) + '...');
        piText = placeIntroduce.text();
      }
      // 场地设施
      $.each(placeDetail.category.amenity, function (i, cur) {
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
      // 场地客服
      if (placeDetail.user.avatar === undefined || placeDetail.user.avatar === null || !placeDetail.user.avatar) {
        $('#placeServiceAvatar').css({
          'background-image': 'url(../../img/user-avatar1.png)',
          'background-repeat': 'no-repeat',
          'background-position': 'center center'
        });
      } else {
        $('#placeServiceAvatar').css({
          'background-image': 'url(http://m.changdipai.com/' + placeDetail.user.avatar + ')',
          'background-repeat': 'no-repeat',
          'background-position': 'center center'
        });
      }
      $('#placeServiceName').text(placeDetail.user.name);
      // 地图
      var cityM = placeDetail.category.city[0].name;
      var cityC = null;
      $.each(citycode, function (j, curc) {
        if (curc.cityName === cityM) {
          cityC = curc.cityCode;
        }
      });
      var map = new AMap.Map("map", {
        resizeEnable: true,
        zoom: 15,
        zoomEnable: false
      });
      AMap.plugin('AMap.Geocoder', function () {
        var geocoder = new AMap.Geocoder({
          city: cityC
        });
        var marker = new AMap.Marker({
          map: map,
          bubble: true
        });
        geocoder.getLocation(placeDetail.address, function (status, result) {
          if (status == 'complete' && result.geocodes.length) {
            marker.setPosition(result.geocodes[0].location);
            map.setCenter(marker.getPosition());
          } else {
            console.log('NO');
          }
        });
      });
    }
  });
}