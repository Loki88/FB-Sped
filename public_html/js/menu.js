//Listener che trasforma l'evento resize in eventi legati ai breakpoints
$(window).resize(function() {
    //c'è un cambiamento di zoom
    var newSize = {
        width: $(document).width(),
        height: $(document).height(),
        zoom: window.devicePixelRatio
    };
    if(newSize.width <= 480)
    {
        //La finestra è ridimensionata per gli smartphone portrait
        $(window).trigger('oneColumn', newSize);
    }
    else if(newSize.width > 480 && newSize.width < 769) {
        //La finestra è ridimensionata per i tablet portrait e gli smartphone landscape
        $(window).trigger('fluidGrid', newSize);
    }
    else{
        //La finestra è ridimensionata per ogni altro dispositivo
        $(window).trigger('noMobile', newSize);
    }
});

$(window).on('oneColumn', function(event, size) {
    console.log('one column layout');
    console.log('width', size.width);
});
    
$(window).on('fluidGrid', function(event, size) {
    console.log('Fluid grid layout');
    console.log('width', size.width);
});
    
$(window).on('noMobile', function(event, size) {
    console.log('Desktop layout');
    console.log('width', size.width);
});


var Menu = {
    init: function()
    {
        var menu = $('#menu');
        var open = $('#open');
        var close = $('#close');
        
        menu.prop('openButton', open);
        menu.prop('closeButton', close);
        
        open.prop('menu', menu);
        close.prop('menu', menu);
        
        open.prop('closeButton', close);
        close.prop('openButton', open);
        
        if(open.css('display') != 'none')
            menu.prop('open', false);
        else if(close.css('display') != 'none')
            menu.prop('open', true);
        menu.prop('mobile', false);
        var windowWidth = $(document).width();
        if(windowWidth < 769)
        {
            //menù mobile
            Menu.prepareMenu(menu);
            menu.prop('mobile', true);
        }
        else
        {
            menu.prop('mobile', false);
        }
        $(window).on('fluidGrid', Menu.menuMobile);
        $(window).on('oneColumn', Menu.menuMobile);
        $(window).on('noMobile', Menu.menuDesktop);
    },
    
    menuMobile: function(event, size)
    {
        
        var menu = $('#menu');
        Menu.prepareMenu(menu);
    },
    
    menuDesktop: function(event, size)
    {
        var menu = $('#menu');
        Menu.rollbackMenu(menu);
    },
    
    prepareMenu: function(menu)
    {
        menu = $(menu);
        menu.prop('mobile', false);
        var open = menu.prop('openButton');
        var close = menu.prop('closeButton');

        open.click(function(event){
            event.preventDefault();
            menu.parent().addClass('menuMobileVisible');
            menu.hide();
            open.hide();
            close.css('display', 'inline-block');
            close.show();

            menu.slideDown(700);

        });
        
        close.click(function(event){
            event.preventDefault();
            close.hide();
            open.show();
            
            menu.slideUp(800, function(){
                menu.parent().removeClass('menuMobileVisible');
            });

        });
    },
    
    rollbackMenu: function(menu)
    {
        menu = $(menu);
        menu.prop('mobile', false);
        var open = menu.prop('openButton');
        var close = menu.prop('closeButton');
        
        //Ripristina il menu per la versione desktop e tablet landscape
        menu.parent().removeClass('menuMobileVisible');
//        menu.css('display', 'block');
        
        open.removeAttr('style');
        close.removeAttr('style');
        
        menu.removeAttr('style');
    }
};

$(document).ready(Menu.init);