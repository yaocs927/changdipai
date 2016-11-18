/*
====================
搜索结果页 JS数据获取
====================
*/

var curCityId = null, //全局变量 当前城市 id
  curAndData = null, //全局变量 当前 and 搜索条件
  curOrData = null, //全局变量 当前 or 搜索条件
  keyWord = null; //全局变量 当前关键词

  var curAreaId;

$(function () {

  // 页面载入
  curAndData = $.fn.cookie('curAndData');
  keyWord = $.fn.cookie('keyWord') === null ? '' : $.fn.cookie('keyWord');
  curOrData = $.fn.cookie('curOrData') === null ? '' : $.fn.cookie('curOrData');
  search(curAndData, curOrData, keyWord); // 初始搜索


  /*
  ====================
  城市选择相关
  ====================
  */

  // 存储数据
  var andCityAreaArr = [], // 搜索条件(城市+区域)数据暂存数组
  andCityAreaStr = null, // 搜索条件(城市+区域)数据
  andCityAreaFunctionArr = [], // 搜索条(城市+区域+功能)件数据暂存数组
  andCityAreaFunctionStr = null; // 搜索条件(城市+区域+功能)数据

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
    // curOrData = '';
    search(curCityId, curOrData, keyWord); // 按城市搜索场地
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
    andCityAreaArr = filterCityId.concat(filterAreaId);
    andCityAreaStr = andCityAreaArr.join(',');
    $.fn.cookie('curAndData', andCityAreaStr); // 更新当前 and 搜索条件至  cookie
    curOrData = $.fn.cookie('curOrData') === null ? '' : $.fn.cookie('curOrData');
    search(andCityAreaStr, curOrData, keyWord);
    // window.location.href = 'search.html?and=' + andCityAreaStr + '&kw=';
  });


  /*
  ====================
  功能过滤相关
  ====================
  */

  var filterAmenityId = []; // 当前设施 id 暂存数组
  var filterEventId = []; // 当前类型 id 暂存数组

  getFunction('event', 'getEvent'); // 功能过滤-用途 菜单
  getFunction('amenity', 'getAmenity'); // 功能过滤-设施 菜单

  // 类型过滤
  $('#getEvent').on('click', 'li', function () {
    var self = $(this);
    var selfId = self.attr('data-curid'); // 获取当前功能的 id
    if (!self.hasClass('active')) {
      filterEventId.push(selfId);
      $(this).addClass('active');
    } else {
      var num;
      for (var i = 0; i < filterEventId.length; i++) {
        num = filterEventId.indexOf(selfId);
      }
      filterEventId.splice(num, 1);
      $(this).removeClass('active');
    }
  });

  // 设施过滤
  $('#getAmenity').on('click', 'li', function () {
    var self = $(this);
    var selfId = self.attr('data-curid'); // 获取当前功能的 id
    if (!self.hasClass('active')) {
      filterAmenityId.push(selfId);
      $(this).addClass('active');
    } else {
      var num1;
      for (var j = 0; j < filterAmenityId.length; j++) {
        num1 = filterAmenityId.indexOf(selfId);
      }
      filterAmenityId.splice(num1, 1);
      $(this).removeClass('active');
    }
  });

  $('#confirm').on('click', function () { // 确定功能 过滤
    andCityAreaArr = filterAmenityId.concat(filterCityId, filterAreaId);
    var andCityAreaStr = andCityAreaArr.join(',');
    $.fn.cookie('curAndData', andCityAreaStr); // 更新当前 and 搜索条件至  cookie
    var orEventIdStr = filterEventId.join(',');
    $.fn.cookie('curOrData', orEventIdStr); // 更新当前 or 搜索条件至  cookie
    search(andCityAreaStr, orEventIdStr, keyWord);
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
    url: 'http://m.changdipai.com/api/v2/category/search?tag=' + tagName,
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
    url: 'http://m.changdipai.com/api/v2/category/search?tag=' + tagName,
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

// 搜索/过滤
function search(and, or, kw) {
  $.ajax({
    type: 'GET',
    url: 'http://m.changdipai.com/api/v2/service/search?and=' + and + '&or=' + or + '&kw=' + kw,
    dataType: 'JSONP',
    jsonp: 'callback',
    success: function (getData) {
      $('#searchResult').empty();
      var data = JSON.parse(getData);
      var placeIdList = data.data.service; // 场地 ID 列表
      console.log(placeIdList);
      if (placeIdList.length === 0) {
        $('#searchResult').append('<div class="no-more">' +
          '<div class="no-more-info">抱歉，没有符合条件的场馆<br />建议您修改条件或点击下方按钮进行咨询</div>' +
          '<a href="demand.html" class="no-more-btn">为我定制</a>' +
          '</div>');
      } else {
        var start = 0;
        var end = 5;
        var num = 5;
        for (var i = 0; i < placeIdList.slice(start, end).length; i++) {
          var cur = placeIdList[i];
          console.log('1搜： ' + cur.id);
          getPlaceItemInfo(cur.id);
        }
        start = end;
        end = end + num;
        $(window).scroll(function(){
          var scrollH = $(window).scrollTop();
          var documentH = $(document).height();
          var windowH = $(window).height();
          if (scrollH / (documentH - windowH) > 0.95 ) {
            var newArr = placeIdList.slice(start, end);
            for (var j = 0; j < newArr.length; j++) {
              var cur1 = newArr[j];
              console.log('2搜： ' + cur1.id);
              getPlaceItemInfo(cur1.id);
            }
            start = end;
            end = end + num;
            // if (start >= placeIdList.length) {
              // $('#searchResult').append('<div class="no-more">' +
              //   '<div class="no-more-info">无更多符合条件的场地<br />没有满意的？点击下方按钮进行咨询</div>' +
              //   '<a href="demand.html" class="no-more-btn">为我定制</a>' +
              //   '</div>');
            // }
          }
        });
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
      $('#searchResult').append('<a href="javascript:;" class="place-item" data-placeid="' + placeItemInfo.id + '" id="place-item-' + id + '">' +
        '<div class="place-item-img" style="background-image: url(http://m.changdipai.com/' + placeItemInfo.cover + '); background-repeat: no-repeat; background-position: center center;">' +
        // '<span class="corner-info"><img src="img/corner-info-1.png" alt="打折"></span>' +
        '<span class="placeType-info"></span>' +
        '<span class="collection cdp-iconfont">&#xe625;</span>' +
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