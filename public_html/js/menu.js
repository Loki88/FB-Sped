//
//$(document).ready(function(){
//    
//    $('#dropdown').slideUp();
//    var open1 = $('#open1');
//    var open2 = $('#open2');
//    var close1 = $('#close1');
//    var close2 = $('#close2');
//        function slideMenu(event)
//        {   
//            $('#open1').unbind('click');
//            $('#close1').unbind('click');
//            $('#open2').unbind('click');
//            $('#close2').unbind('click');
//            var viewport = {
//                width  : $(window).width(),
//                height : $(window).height()
//            };
//            if(viewport.width <= 768)
//            {
//                $('#menu1').slideUp();
//                $('#menu1').css('left', 0);
//                $('#menu1').children('li').css('height', '2em');
//                $('#menu1').data('slide', false);
//                console.log('resize smart');
//                open1.click(function(event){
//                    console.log('open1 click');
//                    event.preventDefault();
//                    var menu = $('#menu1');
//                    menu.slideDown(400);
//                    open1.hide();
//                    var close = $('#close1');
//                    close1.prop('id', 'open1');
//                    close1.click(function(event){
//                        event.preventDefault();
//                        close1.prop('id', 'close1');
//                        open1.show();
//                        menu.slideUp(400);
//                    });
//
//                });
//            }
//            else{
//                $('#menu1').show();
//                open1.prop('id', 'open1');
//                close1.prop('id', 'close1');
//                
//            }
//        }
//        $(window).resize(slideMenu());
//        slideMenu();
//        
//    $('#dropdown').data('slide', false).css('display', 'block');
//    $('#trasporti').hover(function(event){
//        event.preventDefault();
//        $('#dropdown').slideToggle(400);
//        if($('#dropdown').data('slide'))
//            $('#dropdown').data('slide', false);
//        else
//            $('#dropdown').data('slide', true);
//
//    });
//    $('#open2').click(function(event){
//        event.preventDefault();
//        if(!$('#dropdown').data('slide'))
//            $('#dropdown').slideToggle(400);
//    });
//});