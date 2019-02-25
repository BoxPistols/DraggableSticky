$(function() {
  $('#new').click(function() {
    make();
    save();
  });

  $('#del').click(function() {
    $('.selected').remove();
    save();
  });

  function make() {
    var sticky = $('<div class="sticky">Drag & Double Click!</div>');
    sticky.appendTo('body')
      .css('background-color', $('#color').val())
      .draggable({stop: save})
      .dblclick(function() {
      $(this).html('<textarea>' + $(this).html() + '</textarea>')
        .children()
        .focus()
        .blur(function() {
        $(this).parent().html($(this).val());
        save();
      });
    }).mousedown(function() {
      $('.sticky').removeClass('selected');
      $(this).addClass('selected');
    });
    return sticky;
  }

  function save() {
    var items = [];
    $('.sticky').each(function() {
      items.push({
        css: {
          left: $(this).css('left'),
          top: $(this).css('top'),
          backgroundColor: $(this).css('background-color')
        },
        html: $(this).html()
      });
    });
    localStorage.sticky = JSON.stringify(items);
  }

  function load() {
    if (!localStorage.sticky) return;
    var items = JSON.parse(localStorage.sticky);
    $.each(items, function(i, item) {
      make().css(item.css).html(item.html);
    });
  }
  load();
});