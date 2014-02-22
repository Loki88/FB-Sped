
//var documentSize = {
//    width: $(document).width(),
//    height: $(document).height(),
//    zoom: window.devicePixelRatio,
//};

//Listener che trasforma l'evento resize in eventi legati ai breakpoints
$(window).resize(function() {
    //c'è un cambiamento di zoom
    var newSize = {
        width: $(document).width(),
        height: $(document).height(),
        zoom: window.devicePixelRatio
    };
    if(newSize.width < 482)
    {
        //La finestra è ridimensionata per gli smartphone portrait
        $(window).trigger('oneColumn', newSize);
    }
    else if(newSize.width > 481 && newSize.width < 770) {
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
        var menu = $('#menu1');
        var open = $('#open1');
        var close = $('#close1');
        
        menu.prop('openButton', open);
        menu.prop('closeButton', close);
        
        open.prop('menu', menu);
        close.prop('menu', menu);
        
        open.prop('closeButton', close);
        close.prop('openButton', open);
        
        if(open.css('display') == 'block')
            menu.prop('open', false);
        else if(close.css('display') == 'block')
            menu.prop('open', true);

        var windowWidth = $(document).width();
        if(windowWidth < 770)
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
        var menu = $('#menu1');
        if(!menu.prop('mobile'))
            Menu.prepareMenu(menu);
    },
    
    menuDesktop: function(event, size)
    {
        var menu = $('#menu1');
        if(menu.prop('mobile'))
            Menu.rollbackMenu(menu);
    },
    
    prepareMenu: function(menu)
    {
        menu = $(menu);
        menu.prop('mobile', true);
        var open = menu.prop('openButton');
        var close = menu.prop('closeButton');
        menu.addClass('menuMobileVisible');
        
        open.css('display', 'inline-block');
        close.css('display', 'inline-block');
        
        if(menu.prop('open') != undefined)
        {
            
            if(menu.prop('open'))
            {
                close.show();
                open.hide();
                menu.show();
            }
            else
            {
                close.hide();
                open.show();
                menu.hide();
            }
        }
        else
        {
            open.show();
            close.hide();
            menu.hide();
            menu.prop('open', false);
        }

        open.click(function(event){
            event.preventDefault();
            
            open.hide();
            
            close.show();

            if(!menu.prop('open'))
                menu.slideDown(800);

        });
        
        close.click(function(event){
            event.preventDefault();
            
            close.hide();
            
            open.show();

            if(!menu.prop('open'))
                menu.slideUp(800);

        });
    },
    
    rollbackMenu: function(menu)
    {
        menu = $(menu);
        menu.prop('mobile', false);
        var open = menu.prop('openButton');
        var close = menu.prop('closeButton');
        
        //Ripristina il menu per la versione desktop e tablet landscape
        menu.removeClass('menuMobileVisible');
        menu.css('display', 'inline-block');
        
        open.hide();
        close.hide();
        
        menu.show();
    }
};

$(document).ready(Menu.init);