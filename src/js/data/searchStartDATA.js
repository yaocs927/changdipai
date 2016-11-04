$(function () {
  // 点击开始搜索
  $('.searchStart').on('click', function () {
    window.location.href = 'searchStart.html?id=' + curCityId;
  });
  getUrlData();
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