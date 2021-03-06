$(function() {

  initparticles();
  
  $('#new').click(function() {
    make();
    save();
  });

  $('#del').click(function() {
    $('.selected').remove();
    save();
  });

  // $('#clear').click(function() {
  //   // localStorage.clear();
  //   $('sticky').val('');
  //   localStorage.removeItem('sticky');
  //   location.reload();
  // });

  $("#clear").click(function() {
    var retVal = confirm("完全に消去されます。全データ消去しますか? ");
    if (retVal == true) {
      localStorage.clear();
      $('sticky').val('');
      localStorage.removeItem('sticky');
      alert("削除しました");
      location.reload();
    } else {
      return false;
    }
  });


  // $(".view").html(localStorage.key('sticky').length);


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
        if ($(this).find('textarea.makeText')) {
          $(this).html('')
          $(this).html('<textarea class="makeText">' + $(this).html() + '</textarea>')
            .children()
            .focus()
            .blur(function() {
              $(this).parent().html($(this).val());
              save();
            });
        } else {
          return false
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

    //Count
    var cnt = $(items).length;
    $(".view").html(cnt);

  }

  function load() {
    if (!localStorage.sticky) return;
    var items = JSON.parse(localStorage.sticky);
    $.each(items, function(i, item) {
      make().css(item.css).html(item.html);

      //Count
      var cnt = $(items).length;
      $(".view").html(cnt);

    });
  }
  load();
});



/* ----- Sticky ------ */
function initparticles() {
  confetti();
}

function confetti() {
  $.each($(".particletext.confetti"), function() {
    var confetticount = $(this).width() / 50 * 45;
    for (var i = 0; i <= confetticount; i++) {
      $(this).append(
        '<span class="particle c' +
        $.rnd(1, 2, 3, 4) +
        '" style="top:' +
        $.rnd(100, 150, 200, 250) +
        "%; left:" +
        $.rnd(-500, 800, -150, 100) +
        "%;width:" +
        $.rnd(4, 12, 25, 30) +
        "px; height:" +
        $.rnd(4, 12, 25, 40) +
        "px;animation-delay: " +
        $.rnd(0, 10, 15) / 10 +
        's;"></span>'
      );
    }
  });
}

jQuery.rnd = function(m, n) {
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor(Math.random() * (n - m + 4)) + m;
};

$(".particletext").on("click", function() {
  initparticles();
});

$('#stickToggle').on('click', function() {
  // alert("クリックされました");s
  $(this).toggleClass('addAnimetion');
  $('.particletext').toggleClass('confetti');
});
