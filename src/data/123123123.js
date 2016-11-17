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