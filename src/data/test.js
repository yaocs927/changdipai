/*
====================
功能过滤相关
====================
*/

var filterFunctionId = []; // 当前功能 id 暂存数组
var filterAmenityId = []; // 当前功能 id 暂存数组
var filterEventId = []; // 当前功能 id 暂存数组

getFunction('event', 'getEvent'); // 功能过滤-用途 菜单
getFunction('amenity', 'getAmenity'); // 功能过滤-设施 菜单

// 功能过滤
getFunctionId('getEvent');
getFunctionId('getAmenity');

$('#confirm').on('click', function () { // 确定功能 过滤
  andCityAreaArr = filterAmenityId.concat(filterCityId, filterAreaId);
  var andCityAreaStr = andCityAreaArr.join(',');
  $.fn.cookie('curAndData', andCityAreaStr); // 更新当前 and 搜索条件至  cookie
  var orEventIdStr = filterEventId.join(',');
  $.fn.cookie('curOrData', orEventIdStr); // 更新当前 or 搜索条件至  cookie
  console.log('当前搜索条件：' + andCityAreaStr);
  search(andCityAreaStr, orEventIdStr);
  // window.location.href = 'search.html?and=' + andCityAreaStr + '&kw=';
});


function getFunctionId(id) {
  $('#' + id).on('click', 'li', function () {
    var self = $(this);
    var selfId = self.attr('data-curid'); // 获取当前功能的 id
    if (id === 'getEvent') {
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
      console.log('filterEventId:' + filterEventId);
    } else if (id === getAmenity) {
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
      console.log('filterAmenityId:' + filterAmenityId);
    }
  });
}