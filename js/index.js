$(function() {
  $('#new').click(function() {
    make();
    save();
  });

  $('#del').click(function() {
    $('.selected').remove();
    save();
  });

  // $('.close').click(function() {
  //   $('.selected').remove();
  //   save();
  // });

  $('#clear').click(function() {
    // localStorage.clear();
    $('sticky').val('');
    localStorage.removeItem('sticky');
    location.reload();
  });


  // alert( localStorage.length );

  window.addEventListener("keydown", handleKeydown);

  function handleKeydown(event) {
    var keyCode = event.keyCode;
    if (keyCode == 8 + 91) {
      $('.selected').remove();
      save();
    }
  };

  $(window).keydown(function(e) {
    if (event.shiftKey) {
      if (e.keyCode === 8) {
        $('.selected').remove();
        save();
      }
    }
  });

  function make() {
    var sticky = $('<div class="sticky">Drag & Double Click!</div>');
    sticky.appendTo('body')
      .css('background-color', $('#color').val())
      .css('height', $('#ht').val())
      .draggable({
        stop: save
      })

      .dblclick(function() {

        if ($(this).find('textarea')) {

          // setTimeout(function() {
          //   $(this).html('write..').fadeIn();
          // },  3000)

          $(this).html('')


          $(this).html('<textarea class="makeText">' + $(this).html() + '</textarea>')
            .children()
            .focus()
            .blur(function() {
              $(this).parent().html($(this).val());
              save();
            });
          // return false
        } else {

          // $(this).html('<textarea class="makeText">' + $(this).html() + '</textarea>')
          //   .children()
          //   .focus()
          //   .blur(function() {
          //     $(this).parent().html($(this).val());
          //     save();
          //   });

        }

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
          backgroundColor: $(this).css('background-color'),
          height: $(this).css('height')
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
