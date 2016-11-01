$(function () {
  // 滚动显示 浮动搜索条
  $(window).scroll(function () {
    var scrollHeight = $(this).scrollTop();
    if (scrollHeight > 270) {
      $('#float-search').css({
        top: 0
      });
    } else {
      $('#float-search').css({
        top: '-100px'
      });
    }
  });

  // 定位
  var map, citysearch;
  //加载地图，调用浏览器定位服务
  map = new AMap.Map('container1');
  map.plugin('AMap.CitySearch', function () {
    citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity();
    AMap.event.addListener(citysearch, "complete", function (result) {
      if (result && result.city && result.bounds) {
        var cityinfo = result.city;
        var citybounds = result.bounds;
        document.getElementById('curCity').innerHTML = cityinfo;
        console.log(cityinfo);
        //地图显示当前城市
        map.setBounds(citybounds);
      } else {
        // document.getElementById('result').innerHTML = "您当前所在城市：" + result.info + "";
        console.log("您当前所在城市：" + result.info + "");
      }
    });
    AMap.event.addListener(citysearch, "error", function (result) {
      alert(result.info);
    });
  });

  // 显示地区选择菜单
  $('#selectArea').on('click', function () {
    if ($('#areaList').hasClass('hide')) {
      $('#areaList').removeClass('hide').addClass('show');
    }
  });

  // 选择地区
  $('#areaList li').on('click', function () {
    $('#selectArea span').text($(this).text());
    $('#areaList').removeClass('show').addClass('hide');
  });
});