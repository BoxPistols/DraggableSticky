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

  // window.addEventListener("keydown", handleKeydown);
  //
  // function handleKeydown(event) {
  //   var keyCode = event.keyCode;
  //   if (keyCode == 8 + 91) {
  //     $('.selected').remove();
  //     save();
  //   }
  // };

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
      // .dblclick(function() {
      //   $(this).html('<textarea class="makeText">' + $(this).html() + '</textarea>')
      //     .children()
      //     .focus()
      //     .blur(function() {
      //       $(this).parent().html($(this).val());
      //       save();
      //     });
      // })
      $(".sticky").data("dblTap",false).click(function(){
        if($(this).data("dblTap")){
          //ダブルタップ時の命令
          console.log("ダブルタップ");
          $(this).data("dblTap",false);

          $('.sticky').removeClass('selected');

           $(this).addClass('selected');

           $(this).html('<textarea class="makeText">' + $(this).html() + '</textarea>')
             .children()
             .focus()
             .blur(function() {
               $(this).parent().html($(this).val());
               save();
             });

        }else{
          $(this).data("dblTap",true);

          $('.sticky').removeClass('selected');
          
        }
        setTimeout(function(){
          $(".sticky").data("dblTap",false);

          $('.sticky').removeClass('selected');

        },500);
      })

      // .mousedown(function() {
      //   $('.sticky').removeClass('selected');
      //   $(this).addClass('selected');
      // });
    return sticky;
  }

// FIXME
  // $(."sticky").data("dblTap",false).click(function(){
  // 	if($(this).data("dblTap")){
  // 		//ダブルタップ時の命令
  // 		console.log("ダブルタップ");
  // 		$(this).data("dblTap",false);
  // 	}else{
  // 		$(this).data("dblTap",true);
  // 	}
  // 	setTimeout(function(){
  // 		$(".sticky").data("dblTap",false);
  // 	},500);
  // })

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
