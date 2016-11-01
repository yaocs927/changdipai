var icon = [{
  'view': '\ue60f',
  'name': '电脑'
}, {
  'view': '\ue67e',
  'name': '游戏机'
}, {
  'view': '\ue62a',
  'name': '按摩'
}, {
  'view': '\ue62b',
  'name': '停车场'
}, {
  'view': '\ue62c',
  'name': '电视'
}, {
  'view': '\ue65f',
  'name': 'SPA'
}, {
  'view': '\ue662',
  'name': '吧台'
}, {
  'view': '\ue662',
  'name': '吧台'
}, {
  'view': '\ue662',
  'name': '吧台'
}, {
  'view': '\ue662',
  'name': '吧台'
}, {
  'view': '\ue662',
  'name': '吧台'
}, {
  'view': '\ue662',
  'name': '吧台'
}, {
  'view': '\ue662',
  'name': '吧台'
}, {
  'view': '\ue662',
  'name': '吧台'
}];

$(function () {
  var cdp = new Vue({
    el: '#cdp',
    data: {
      test: '',
      curOption: '',
      areas: ['上海', '北京', '南京', '苏州'],
      icons: icon,
      no: false
    },
    methods: {
      // test
      testing: function () {
        this.curOption = 11;
      },
      // 定位
      getLocation: function () {
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
              document.getElementById('curCity').innerHTML= cityinfo;
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
      },
      // 点击 显示隐藏
      show: function () {
        if (this.no === false) {
          this.no = true;
        } else {
          this.no = false;
        }
      },
      // 选择城市
      selectOption: function (e) {
        // 获取当前点击对象 $(e.target)
        this.curOption = $(e.target).text();
        this.no = false;
      },
      // 返回上一页
      goBack: function () {
        history.back(-1);
      }
    }
  });
  cdp.getLocation();
});