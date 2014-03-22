function isMobile(){return ('ontouchstart' in document.documentElement);}

var Carousel = {
    init: function(){
        if(isMobile())
        {
            var gallery = $('.gallery');
            var controls = $('.gallery .controls');
            controls.detach();
            var checked = gallery.find('input:checked');
            Carousel.carousel = gallery.children('.carousel');
            Carousel.inputs = gallery.find('input')
            Carousel.index = Carousel.inputs.index(checked);
            Carousel.carousel.css({'cursor': 'pointer', 'z-index': 3});
            Carousel.carousel.swipe({
                swipeLeft: Carousel.forward,
                swipeRight: Carousel.backward
            });
//            Carousel.carousel.swipeleft(Carousel.forward);
//            Carousel.carousel.swiperight(Carousel.backward);
        }
    },
    
    forward: function(event){
        if( Carousel.index > Carousel.inputs.length - 1 )
            Carousel.index = 0;
        else
            Carousel.index += 1;
        $(Carousel.inputs[Carousel.index]).prop('checked', true);
    },
    
    backward: function(event){
        if( Carousel.index == 0 )
            Carousel.index = Carousel.inputs.length - 1;
        else
            Carousel.index -= 1;
        $(Carousel.inputs[Carousel.index]).prop('checked', true);
    },

}

//$(document).on('pageinit pageshow', Carousel.init);

$(document).ready(Carousel.init);