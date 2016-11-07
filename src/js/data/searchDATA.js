// 搜索页数据获取 JS文件
var curCityId = "";
$(function () {
  // 设置过滤列表高度
  var H = $(window).height();
  $('.filter-list').css('height', (H - 80) + 'px');

  // 读取城市 id
  curCityId = $.fn.cookie('curCityId');
  console.log('首页选择城市id：' + curCityId);
  // 获取城市
  getCategory('city', 'getCity');

  // 顶部菜单/搜索条  点击选择地区 并获取过滤条件
  $('#getCity').on('click', 'li', function () {
    $('#selectArea em').text($(this).text());
    curCityId = $(this).attr('data-curid');
    $.fn.cookie('curCityId', curCityId);
    console.log('新选择城市id：' + curCityId);
    $('.top-search-list').addClass('hide').removeClass('show');
    getAreaTypeList('region', 'getAreaTypeList-region');
    getAreaTypeList('circle', 'getAreaTypeList-circle');
    // getAreaTypeList('metro', 'getAreaTypeList-metro');
  });


  // 区域过滤菜单 数据
  var menu = [{
    "tag": "region",
    "name": "行政区"
  }, {
    "tag": "circle",
    "name": "商圈"
  }];
  // 生成区域过滤菜单
  $.each(menu, function (i, cur) {
    $('#getAreaType').append('<li data-tagName="'+ cur.tag +'">' + cur.name + '<i class="cdp-iconfont">\ue615</i></li>');
  });
  $('#getAreaType li').eq(0).addClass('active');


  $('#getAreaType').on('click', 'li', function () {
    var self = $(this);
    var tagName = self.attr('data-tagName');
    console.log(tagName);
    self.addClass('active');
    self.siblings('li').removeClass('active');
    $('#getAreaTypeList-'+ tagName +'').addClass('show').removeClass('hide');
    $('#getAreaTypeList-'+ tagName +'').siblings().addClass('hide').removeClass('show');
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

      // 根据 cookie 城市参数选中默认城市
      $('#getCity').find('li').each(function () {
        if ($(this).attr('data-curid') == curCityId) {
          $(this).addClass('active');
          $('#selectArea em').text($(this).text());
          // 获取该城市 过滤条件
          getAreaTypeList('region', 'getAreaTypeList-region');
          getAreaTypeList('circle', 'getAreaTypeList-circle');
        }
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
        if (cur.pid === curCityId) {
          console.log(cur);
          $('#' + id).append('<li data-curId="' + cur.id + '">' + cur.name + '<i class="cdp-iconfont hide">\ue617</i></li>');
        }
      });
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
      console.log(data);
    }
  });
}






