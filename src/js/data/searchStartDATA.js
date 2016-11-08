var curCityId = null;
$(function () {
  // 读取城市 id
  curCityId = $.fn.cookie('curCityId');
  console.log('首页选择城市id：' + curCityId);
  // 获取城市并选中当前城市
  getCategory('city', 'getCity');

  // 存储搜索条件
  var andArr = [];       // 搜索条件临时数组
  var kw = null;         // 填写关键词搜索
  var andStr = null;     // 搜索条件字符串

  // 未重新选择城市时 保持原城市 id
  andArr.push(curCityId);
  andStr = andArr.join(',');
  console.log('未重新选择城市id：' + andStr);

  // 重新选择城市 获取新 id
  $('#getCity').on('click', 'i', function () {
    $(this).addClass('active').siblings().removeClass('active');
    curCityId = $(this).attr('data-curid');
    // 更新 cookie 城市数据
    $.fn.cookie('curCityId', curCityId);
    andArr = [];    // 清除原城市 id 数据
    andArr.push(curCityId);
    andStr = andArr.join(',');
    console.log('新选择城市id：' + andStr);
  });

  // 获取快速搜索列表
  getCategory('event', 'getEvent');
  // 选择快速搜索 获取 id
  $('#getEvent').on('click', 'i', function () {
    curCityId = $(this).attr('data-curid');
    andArr.push(curCityId);
    andStr = andArr.join(',');
    console.log('搜索条件id：' + andStr);
    // search(andStr);
    window.location.href = 'search.html?and=' + andStr;
  });

  // 点击开始搜索
  $('.searchStart').on('click', function () {
    console.log(andStr);
    // search(andStr);
    kw = $('#top-search-text').val();
    window.location.href = 'search.html?and=' + andStr + '&kw=' + kw;
  });
});

// 获取地址栏参数
function getUrlData() {
  var name;
  var value;
  var str = location.href; //取得整个地址栏
  var num = str.indexOf("?");
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
  var arr = str.split("&"); //各个参数放到数组里
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      this[name] = value;
    }
  }
}

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
        $('#' + id).append('<i data-curid="' + cur.id + '">' + cur.name + '</i>');
      });

      // 根据首页城市参数选中默认城市
      var cityList = $('#getCity').find('i');
      $('#getCity').find('i').each(function () {
        if ($(this).attr('data-curid') == curCityId) {
          $(this).addClass('active');
        }
      });
    }
  });
}


































