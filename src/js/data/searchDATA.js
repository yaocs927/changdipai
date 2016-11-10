/*
====================
搜索结果页 JS数据获取
====================
*/

var curCityId = null, //全局变量 当前城市 id
  curAndData = null, //全局变量 当前 and 搜索条件
  keyWord = null; //全局变量 当前关键词

  var curAreaId;

$(function () {

  // 页面载入
  curAndData = $.fn.cookie('curAndData');
  keyWord = $.fn.cookie('keyWord');
  console.log('当前搜索: ?and=' + curAndData + '&kw=' + keyWord);
  search(curAndData, keyWord); // 初始搜索

  // window.location.href = 'search.html?and=' + curAndData + '&kw=' + keyWord;
  // history.replaceState('search.html', null, 'search.html?and=' + curAndData + '&kw=' + keyWord);
  // history.pushState('search.html', null, 'search.html?and=' + curAndData + '&kw=' + keyWord);
  // window.addEventListener("popstate",function() {
    // console.log(history.state);
    // location.reload();
  // });

  // 存储数据
  var andCityAreaArr = [], // 搜索条件(城市+区域)数据暂存数组
    andCityAreaStr = null, // 搜索条件(城市+区域)数据
    andCityAreaFunctionArr = [], // 搜索条(城市+区域+功能)件数据暂存数组
    andCityAreaFunctionStr = null; // 搜索条件(城市+区域+功能)数据


  /*
  ====================
  城市选择相关
  ====================
  */

  var filterCityId = []; // 当前城市 id 暂存数组

  // 读取 cookie 中城市 id
  curCityId = $.fn.cookie('curCityId');
  filterCityId.push(curCityId);
  getCategory('city', 'getCity'); // 获取城市列表  并设置已选城市

  // 切换城市
  $('#getCity').on('click', 'li', function () {
    $('#selectArea em').text($(this).text());
    $('.top-search-list').addClass('hide').removeClass('show');
    curCityId = $(this).attr('data-curid');
    $.fn.cookie('curCityId', curCityId); // 存储当前城市 id 至 cookie
    $.fn.cookie('curAndData', curCityId); // 更新当前 and 搜索条件至  cookie
    filterCityId = [];
    filterCityId.push(curCityId);
    search(curCityId); // 按城市搜索场地
    console.log('当前搜索城市：' + curCityId);
    getAreaTypeList('region', 'getAreaTypeList-region');
    getAreaTypeList('circle', 'getAreaTypeList-circle');
  });


  /*
  ====================
  区域过滤相关
  ====================
  */

  var filterAreaId = []; // 当前区域 id 暂存数组

  // 区域过滤 菜单数据
  var menu = [{
    "tag": "region",
    "name": "行政区"
  }, {
    "tag": "circle",
    "name": "商圈"
  }];

  // 生成 区域过滤 菜单
  $.each(menu, function (i, cur) {
    $('#getAreaType').append('<li data-tagName="' + cur.tag + '">' + cur.name + '<i class="cdp-iconfont">\ue615</i></li>');
  });
  $('#getAreaType li').eq(0).addClass('active');

  // 区域过滤
  $('#getAreaType').on('click', 'li', function () { // 区域列表切换
    var self = $(this);
    var curTagName = self.attr('data-tagName');
    self.addClass('active');
    self.siblings('li').removeClass('active');
    $('#getAreaTypeList-' + curTagName + '').addClass('show').removeClass('hide');
    $('#getAreaTypeList-' + curTagName + '').siblings().addClass('hide').removeClass('show');
  });
  $('#getAreaTypeList').on('click', 'li', function () { // 选择相应区域
    filterAreaId = [];
    var selfId = $(this).attr('data-curid'); // 获取当前区域的 id
    if (selfId === 'no') {
      filterAreaId = [];
    } else {
      filterAreaId.push(selfId);
    }

    // 进行过滤
    andCityAreaArr = filterCityId.concat(filterAreaId, filterFunctionId);
    andCityAreaStr = andCityAreaArr.join(',');
    $.fn.cookie('curAndData', andCityAreaStr); // 更新当前 and 搜索条件至  cookie
    console.log('当前搜索条件：' + andCityAreaStr);
    search(andCityAreaStr);
    // window.location.href = 'search.html?and=' + andCityAreaStr + '&kw=';
  });


  /*
  ====================
  功能过滤相关
  ====================
  */

  var filterFunctionId = []; // 当前功能 id 暂存数组

  getFunction('event', 'getEvent'); // 功能过滤-用途 菜单
  getFunction('amenity', 'getAmenity'); // 功能过滤-设施 菜单

  // 功能过滤
  $('.filter-list-top-sub').on('click', 'li', function () {
    var self = $(this);
    var selfId = self.attr('data-curid'); // 获取当前功能的 id
    if (!self.hasClass('active')) {
      filterFunctionId.push(selfId);
      $(this).addClass('active');
    } else {
      var num;
      for (var i = 0; i < filterFunctionId.length; i++) {
        num = filterFunctionId.indexOf(selfId);
      }
      filterFunctionId.splice(num, 1);
      $(this).removeClass('active');
    }
    console.log(filterFunctionId);
  });

  $('#confirm').on('click', function () { // 确定功能 过滤
    andCityAreaArr = filterFunctionId.concat(filterCityId, filterAreaId);
    var andCityAreaStr = andCityAreaArr.join(',');
    $.fn.cookie('curAndData', andCityAreaStr); // 更新当前 and 搜索条件至  cookie
    console.log('当前搜索条件：' + andCityAreaStr);
    search(andCityAreaStr);
    // window.location.href = 'search.html?and=' + andCityAreaStr + '&kw=';
  });


});


/*
====================
函数部分
====================
*/

// 获取类目（城市）
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

// 获取 区域过滤 列表
function getAreaTypeList(tagName, id) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/category/search?tag=' + tagName,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      $('#' + id).find('.unlimited').siblings().remove();
      var data = JSON.parse(getData);
      var citys = data.data.category;
      $.each(citys, function (i, cur) {
        if (cur.pid === curCityId) {
          $('#' + id + ' .unlimited').after('<li data-curid="' + cur.id + '">' + cur.name + '<i class="cdp-iconfont hide">\ue617</i></li>');
        }
      });
    }
  });
}

// 获取 功能过滤 列表
function getFunction(tagName, id) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/category/search?tag=' + tagName,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      var data = JSON.parse(getData);
      var citys = data.data.category;
      $.each(citys, function (i, cur) {
        $('#' + id).append('<li data-curid="' + cur.id + '">' + cur.name + '</li>');
      });
    }
  });
}

// 根据搜索起始页条件 搜索(初始搜索)
function initSearch(searchStr) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/service/search' + searchStr,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      $('#searchResult').empty();
      var data = JSON.parse(getData);
      var placeItem = data.data.service;
      if (placeItem.length === 0) {
        console.log('暂无搜索结果');
        $('#searchResult').append('<div class="no-more">' +
          '<div class="no-more-info">抱歉，没有符合条件的场馆<br />建议您修改条件或点击下方按钮进行咨询</div>' +
          '<a href="demand.html" class="no-more-btn">为我定制</a>' +
          '</div>');
      } else {
        $.each(placeItem, function (i, cur) {
          var id = cur.id,
            title = cur.name,
            price = cur.price,
            cover = cur.cover,
            address = cur.address;
          $('#searchResult').append('<a href="detail.html" class="place-item" data-placeid="' + id + '" id="place-item-' + id + '">' +
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
    }
  });
}

// 搜索/过滤
function search(and, kw) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/changdipai/service/search?and=' + and + '&kw=' + kw,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      // window.location.href = 'search.html?and=' + curAndData + '&kw=' + keyWord;
      $('#searchResult').empty();
      var data = JSON.parse(getData);
      var placeItem = data.data.service;
      if (placeItem.length === 0) {
        console.log('暂无搜索结果');
        $('#searchResult').append('<div class="no-more">' +
          '<div class="no-more-info">抱歉，没有符合条件的场馆<br />建议您修改条件或点击下方按钮进行咨询</div>' +
          '<a href="demand.html" class="no-more-btn">为我定制</a>' +
          '</div>');
      } else {
        $.each(placeItem, function (i, cur) {
          var id = cur.id,
            title = cur.name,
            price = cur.price,
            cover = cur.cover,
            address = cur.address;
          $('#searchResult').append('<a href="detail.html" class="place-item" data-placeid="' + id + '" id="place-item-' + id + '">' +
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
    }
  });
}