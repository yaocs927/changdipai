$(function () {
  // 获取城市并选中当前城市
  getCategory('city', 'getCity');
  var curHref = location.href;
  
  // 点击开始搜索
  // $('.searchStart').on('click', function () {
  //   window.location.href = 'searchStart.html?id=' + curCityId;
  // });
  // getUrlData();
});

// 获取地址栏参数
function getUrlData() {
  var name, value;
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
      console.log(value);
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
        $('#' + id).append('<i data-curId="' + cur.id + '">' + cur.name + '</i>');
      });

      // 显示默认城市
      // var defaultCityName = $('#areaList li').eq(0).text();
      // console.log(defaultCityName);
      // curCityId = $('#areaList li').eq(0).attr('data-curId');
      // $('#selectArea span').text(defaultCityName);
      // $('#selectArea span').attr('data-curId', curCityId);
    }
  });
}