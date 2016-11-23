/*
====================
搜索起始页 JS数据获取
====================
*/

var curCityId = null, // 当前城市 id
  curAndData = null, // 当前 and 搜索条件
  curOrData = null, // 当前 or 搜索条件
  keyWord = null; // 搜索关键词

$(function () {

  // 存储数据
  var curAndArr = [], // 当前搜索条件临时数组
    andCityIdArr = [], // 搜索条件--城市  临时数组
    andOtherIdArr = [], // 搜索条件--类型  临时数组
    andOtherIdStr = null; // 搜索条件--类型  字符串

  // 页面载入
  curCityId = $.fn.cookie('curCityId'); // 读取当前城市 id
  getCategory('city', 'getCity'); // 获取城市列表并选中当前城市
  getCategory('event', 'getEvent'); // 获取快速搜索列表
  // $.fn.cookie('curAndData', curCityId); // 未重新选择城市时 当前 and (城市)搜索条件

  // 重新选择城市
  $('#getCity').on('click', 'i', function () {
    $(this).addClass('active').siblings().removeClass('active');
    curCityId = $(this).attr('data-curid');
    $.fn.cookie('curCityId', curCityId); // 更新当前城市 id 至  cookie
  });

  // 快速搜索
  var curFastSearchId = null;
  $('#getEvent').on('click', 'i', function () {
    curFastSearchId = $(this).attr('data-curid');
    $.fn.cookie('curAndData', null, { // 当前 and 搜索条件失效
      expires: -1
    });
    $.fn.cookie('curOrData', curFastSearchId);
    window.location.href = 'search.html?and=' + curCityId + '&or=' + curFastSearchId + '&wd=';
  });

  // 点击搜索
  $('.searchStart').on('click', function () {
    keyWord = $('#top-search-text').val();
    $.fn.cookie('keyWord', keyWord); // 存储当前关键词
    $.fn.cookie('curOrData', null, { // 当前 or 搜索条件失效
      expires: -1
    });
    $.fn.cookie('curAndData', null, { // 当前 and 搜索条件失效
      expires: -1
    });
    window.location.href = 'search.html?and=' + curCityId + '&or=' + '&wd=' + keyWord;
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
        $('#' + id).append('<i data-curid="' + cur.id + '">' + cur.name + '</i>');
      });

      // 根据 cookie 参数选中默认城市
      var cityList = $('#getCity').find('i');
      $('#getCity').find('i').each(function () {
        if ($(this).attr('data-curid') == curCityId) {
          $(this).addClass('active');
        }
      });
    }
  });
}