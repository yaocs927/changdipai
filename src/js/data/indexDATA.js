/*
====================
首页 JS数据获取
====================
*/

var curCityId = null, //全局变量 当前城市 id
  curPlaceId = null, //全局变量 当前场地 id
  curAndData = null; //全局变量 当前 and 搜索条件

$(function () {

  getCategory('city', 'areaList'); // 获取城市列表
  getHandPick('handpick', 'fastSearch'); // 获取推荐

  // 切换城市
  $('#areaList').on('click', 'li', function () {
    curCityId = $(this).attr('data-curid');
    $.fn.cookie('curCityId', curCityId); // 存储当前城市 id 至 cookie
    search(curCityId); // 切换城市重新获取首页热门场馆
  });

  // 推荐
  $('#fastSearch').on('click', 'li', function () {
    var curId = $(this).attr('data-curid');
    $.fn.cookie('curAndData', curCityId + ',' + curId); // 更新当前 and 搜索条件至  cookie

    window.location.href = 'search.html';
  });

  // 开始搜索
  $('.searchStart').on('click', function () {
    window.location.href = 'searchStart.html';
  });

  // 查看场地详情
  $('#hostPlaceList').on('click', 'a', function () {
    curPlaceId = $(this).attr('data-placeid');
    console.log(placeId);
    $.fn.cookie('curPlaceId', curPlaceId); // 存储当前场地 id 至 cookie
    window.location.href = 'detail.html';
  });

});


/*
====================
函数部分
====================
*/

// 获取类目
function getCategory(tagName, id) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/category/search?tag=' + tagName,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      var citys = data.data.category;
      $('#' + id).empty();
      $.each(citys, function (i, cur) {
        $('#' + id).append('<li data-curid="' + cur.id + '">' + cur.name + '</li>');
      });

      // 显示默认城市（上海）
      var defaultCityName = $('#areaList li').eq(0).text();
      curCityId = $('#areaList li').eq(0).attr('data-curid');
      $.fn.cookie('curCityId', curCityId);
      $('#selectArea span').text(defaultCityName);
      $('#selectArea span').attr('data-curid', curCityId);
      search(curCityId); // 获取默认热门场馆
    }
  });
}

// 获取推荐
function getHandPick(tagName, id) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/category/search?tag=' + tagName,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      var handpick = data.data.category;
      $.each(handpick, function (i, cur) {
        $('#' + id).append('<li class="recommend-item swiper-slide" data-curid="' + cur.id + '">' +
          '<a href="javascript:;" style="background-image: url(http://m.changdipai.com/' + cur.view + '); background-repeat: no-repeat; background-position: center center;"></a>' +
          '<div class="recommend-item-title">' + cur.name + '</div>' +
          '</li>');
      });

      var mySwiper = new Swiper('.swiper-container-recommend', {
        slidesPerView: 'auto',
        // paginationClickable: true,
        spaceBetween: 12
      });
    }
  });
}

// 获取热门场地
function search(and, kw) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/service/search?and=' + and + '&kw=' + kw,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      $('#hostPlace').siblings().remove(); // 清空热门列表
      var data = JSON.parse(getData);
      var placeItem = data.data.service;
      $.each(placeItem, function (i, cur) {
        var id = cur.id,
          title = cur.name,
          price = cur.price,
          cover = cur.cover,
          address = cur.address;
        $('#hostPlace').after('<a href="javascript:;" class="place-item" data-placeid="' + id + '" id="place-item-' + id + '">' +
          '<div class="place-item-img" style="background-image: url(http://m.changdipai.com/' + cover + '); background-repeat: no-repeat; background-position: center center;">' +
          // '<span class="corner-info"><img src="img/corner-info-1.png" alt="打折"></span>' +
          '<span class="placeType-info"></span>' +
          '<span class="collection cdp-iconfont">&#xe625;</span>' +
          '</div>' +
          '<div class="place-item-info">' +
          '<h3 class="clearfix">' +
          '<span class="place-item-info-title">' + title + '</span>' +
          '<span class="place-item-info-price"><i>￥</i>' + price + '<i>/天</i></span>' +
          '</h3>' +
          '<p class="place-item-info-detail">' + address + '</p>' +
          '</div></a>');

        var amenity = cur.amenity.slice(0, 3);
        $.each(amenity, function (i, cur) {
          $('#place-item-' + id).find('span.placeType-info').append('<i>' + cur.name + '</i>');
        });
      });
    }
  });
}