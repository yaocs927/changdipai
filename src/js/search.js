$(function () {
  filterShow('area');
  filterShow('price');
  filterShow('screen');
  filterShow('sort');
});

function filterShow(type) {
  $('.filter-bar-'+ type).on('click', function () {
    var self = $(this);
    if ($('.filter-list-'+ type).hasClass('hide')) {
      $('.filter-list-'+ type).addClass('show').removeClass('hide');
      $('.filter-list-'+ type).siblings('.filter-list').addClass('hide').removeClass('show');
      self.addClass('active');
      self.find('i').text('\ue616');
      self.siblings().removeClass('active');
      self.siblings().find('i').text('\ue613');
    } else {
      $('.filter-list-'+ type).addClass('hide').removeClass('show');
      self.removeClass('active');
      self.find('i').text('\ue613');
    }
  });
}