/*
====================
首页 JS数据获取
====================
*/

var curCityId = null, //全局变量 当前城市 id
  curPlaceId = null, //全局变量 当前场地 id
  keyword = '',
  curAndData = null; //全局变量 当前 and 搜索条件

$(function () {

  getCategory('city', 'areaList'); // 获取城市列表
  getHandPick('handpick', 'fastSearch'); // 获取推荐

  // 切换城市
  $('#areaList').on('click', 'li', function () {
    curCityId = $(this).attr('data-curid');
    $.fn.cookie('curCityId', curCityId); // 存储当前城市 id 至 cookie
    search(curCityId, keyword); // 切换城市重新获取首页热门场馆
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
    url: 'http://m.changdipai.com/api/v2/category/search?tag=' + tagName,
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
      search(curCityId, keyword); // 获取默认热门场馆
    }
  });
}

// 获取推荐
function getHandPick(tagName, id) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/api/v2/category/search?tag=' + tagName,
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

// 搜索场地 获取 场地 ID
function search(and, wd) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/api/v2/service/search?and=' + and + '&wd=' + wd,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      $('#hostPlaceListss').empty(); // 清空热门列表
      var data = JSON.parse(getData);
      var placeIdList = data.data.service; // 场地 ID 列表
      // $.each(placeIdList, function (i, cur) {
      //   getPlaceItemInfo(cur.id);
      // });
      for (var i = 0; i < placeIdList.slice(0, 10).length; i++) {
        var cur = placeIdList[i];
        getPlaceItemInfo(cur.id);
      }
    }
  });
}

// 获取场地列表信息
function getPlaceItemInfo(id) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/api/v2/service/preview?id=' + id,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      var placeItemInfo = data.data.service;
      $('#hostPlaceListss').append('<a href="detail.html" class="place-item" data-placeid="' + placeItemInfo.id + '" id="place-item-' + id + '">' +
        '<div class="place-item-img" style="background-image: url(http://m.changdipai.com/' + placeItemInfo.cover + '); background-repeat: no-repeat; background-position: center center;">' +
        // '<span class="corner-info"><img src="img/corner-info-1.png" alt="打折"></span>' +
        '<span class="placeType-info"></span>' +
        // '<span class="collection cdp-iconfont">&#xe625;</span>' +
        '</div>' +
        '<div class="place-item-info">' +
        '<h3 class="clearfix">' +
        '<span class="place-item-info-title">' + placeItemInfo.name + '</span>' +
        '<span class="place-item-info-price"><i>￥</i>' + placeItemInfo.price + '<i>/天</i></span>' +
        '</h3>' +
        '<p class="place-item-info-detail">' + placeItemInfo.address + '</p>' +
        '</div></a>');

      var amenity = placeItemInfo.category.amenity;
      if (amenity === undefined) {
        // console.log('暂无标签');
      } else {
        $.each(amenity.slice(0, 3), function (i, cur) {
          $('#place-item-' + id).find('span.placeType-info').append('<i>' + cur.name + '</i>');
        });
      }
    }
  });
}













