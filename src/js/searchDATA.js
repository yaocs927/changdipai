// 搜索页数据获取 JS文件
var cityId = "";
$(function () {
  // 顶部菜单/搜索条  点击选择地区
  $('#getCity').on('click', 'li', function () {
    $('.top-search-area-name em').text($(this).text());
    $('.top-search-list').addClass('hide').removeClass('show');
  });

  // 获取城市
  getCategory('city', 'getCity');
  $('#getCity').on('click', 'li', function () {
    cityId = $(this).attr('data-curId');
    getAreaTypeList('region', 'getAreaTypeList-region');
  });


  // 区域过滤菜单
  var menu = [{
    "tag": "region",
    "name": "行政区"
  }, {
    "tag": "circle",
    "name": "商圈"
  }];
  $.each(menu, function (i, cur) {
    $('#getAreaType').append('<li data-tagName="'+ cur.tag +'">' + cur.name + '<i class="cdp-iconfont">\ue615</i></li>');
  });
  $('#getAreaType li').eq(0).addClass('active');
  $('#getAreaType').on('click', 'li', function () {
    var self = $(this);
    var tagName = self.attr('data-tagName');
    self.addClass('active');
    self.siblings('li').removeClass('active');
    getAreaTypeList(tagName, 'getAreaTypeList-'+ tagName +'');
  });
});


/**
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
        $('#' + id).append('<li data-curId="' + cur.id + '">' + cur.name + '</li>');
      });
    }
  });
}

// 获取区域过滤列表
function getAreaTypeList(tagName, id) {
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
        if (cur.pid === cityId) {
          console.log(cur);
          $('#' + id).append('<li data-curId="' + cur.id + '">' + cur.name + '</li>');
        }
      });
    }
  });
}