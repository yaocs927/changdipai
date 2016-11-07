// 主页数据获取 JS文件
var curCityId = null;
var placeId = null;
$(function () {
  // 获取城市列表
  getCategory('city', 'areaList');

  // 获取选中城市 ID
  $('#areaList').on('click', 'li', function () {
    curCityId = $(this).attr('data-curid');
    // 切换城市重新获取首页热门场馆
    $('#hostPlace').siblings().remove();  // 清空原有的推荐列表
    search(curCityId);
  });



  // 点击开始搜索
  $('.searchStart').on('click', function () {
    // 存储城市 id 至 cookie
    $.fn.cookie('curCityId', curCityId);
    window.location.href = 'searchStart.html?and=' + curCityId;
  });


});

/**
 *
 * 函数部分
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

      // 显示默认城市
      var defaultCityName = $('#areaList li').eq(0).text();
      curCityId = $('#areaList li').eq(0).attr('data-curid');
      $('#selectArea span').text(defaultCityName);
      $('#selectArea span').attr('data-curid', curCityId);
      // 获取首页热门场馆
      search(curCityId);
    }
  });
}


// 搜索
function search(and, kw) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/service/search?and=' + and + '&kw=' + kw,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      var placeItem = data.data;
      var amenity = data.data.amenity;
      $.each(data.data, function (i, cur) {
        var id = cur.id,
          title = cur.name,
          address = cur.address;
        $('#hostPlace').after('<a href="detail.html" class="place-item" data-placeid="' + id + '" id="place-item-' + id + '">' +
          '<div class="place-item-img">' +
          // '<span class="corner-info"><img src="img/corner-info-1.png" alt="打折"></span>' +
          '<span class="placeType-info"></span>' +
          '<span class="collection cdp-iconfont">&#xe625;</span>' +
          '</div>' +
          '<div class="place-item-info">' +
          '<h3 class="clearfix">' +
          '<span class="place-item-info-title">' + title + '</span>' +
          '<span class="place-item-info-price"><i>￥</i>2000<i>/天</i></span>' +
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