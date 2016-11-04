// 主页数据获取 JS文件
var curCityId = "";
$(function () {
  // 获取城市列表
  getCategory('city', 'areaList');



  // 获取选中城市 ID
  $('#areaList').on('click', 'li', function () {
    curCityId = $(this).attr('data-curId');
  });


  // 点击开始搜索
  $('.searchStart').on('click', function () {
    window.location.href = 'searchStart.html?and=' + curCityId;
  });
});



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

      // 显示默认城市
      var defaultCityName = $('#areaList li').eq(0).text();
      console.log(defaultCityName);
      curCityId = $('#areaList li').eq(0).attr('data-curId');
      $('#selectArea span').text(defaultCityName);
      $('#selectArea span').attr('data-curId', curCityId);
    }
  });
}