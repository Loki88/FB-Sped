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
    else if(newSize.width > 480 && newSize.width <= 768) {
        //La finestra è ridimensionata per i tablet portrait e gli smartphone landscape
        $(window).trigger('fluidGrid', newSize);
    }
    else{
        //La finestra è ridimensionata per ogni altro dispositivo
        $(window).trigger('noMobile', newSize);
    }
});

//$(window).on('oneColumn', function(event, size) {
//    console.log('one column layout');
//    console.log('width', size.width);
//});
//    
//$(window).on('fluidGrid', function(event, size) {
//    console.log('Fluid grid layout');
//    console.log('width', size.width);
//});
//    
//$(window).on('noMobile', function(event, size) {
//    console.log('Desktop layout');
//    console.log('width', size.width);
//});


var Navigation = {
    
    time: 600,
    
    init: function()
    {
        var menu = $('#menu');
        var openMenu = $('#open');
        var closeMenu = $('#close');
        Navigation.menu = menu;
        menu.prop('openButton', openMenu);
        menu.prop('closeButton', closeMenu);
//        openMenu.prop('menu', menu);
//        closeMenu.prop('menu', menu);
        var lang = $('#lang-menu');
        var openLang = $('#lang-open');
        var closeLang = $('#lang-close');
        Navigation.lang = lang;
        lang.prop('openButton', openLang);
        lang.prop('closeButton', closeLang);
        
        if(closeMenu.css('display') != 'none')
            menu.prop('open', true);
        else
            menu.prop('open', false);
        if(closeLang.css('display') != 'none')
            lang.prop('open', true);
        else
            lang.prop('open', false);
        menu.prop('mobile', false);
        lang.prop('mobile', false);
        var windowWidth = $(document).width();
        if(windowWidth <= 768)
        {
            //barra di navigazione mobile
            Navigation.prepareMenu();
            menu.prop('mobile', true);
            Navigation.prepareLang();
            lang.prop('mobile', true);
        }
        $(window).on('fluidGrid', Navigation.menuMobile);
        $(window).on('oneColumn', Navigation.menuMobile);
        $(window).on('noMobile', Navigation.menuDesktop);
    },
    
    menuMobile: function(event, size)
    {
        Navigation.prepareMenu();
        Navigation.prepareLang();
    },
    
    menuDesktop: function(event, size)
    {
        Navigation.rollbackMenu();
        Navigation.rollbackLang();
    },
    
    prepareLang: function()
    {
        var lang = $(Navigation.lang);
        var open = $(lang.prop('openButton'));
        var close = $(lang.prop('closeButton'));
        lang.parent().addClass('languageMobileVisible');
        lang.hide();
        open.css('display', 'block');
        open.show();
        close.hide();
        
        open.click(function(event){
            event.preventDefault();
//            menu.hide();
            
            Navigation.closeMenu();
            lang.slideDown(Navigation.time);
            open.hide();
//            close.css('display', 'block');
            close.show();
            lang.prop('open', true);
        });
        
        close.click(function(event){
            event.preventDefault();
            open.show();
            close.hide();
            lang.slideUp(Navigation.time);
            lang.prop('open', false);
        });
    },
    
    rollbackLang: function()
    {
        var lang = $(Navigation.lang);
        lang.prop('mobile', false);
        var open = $(lang.prop('openButton'));
        var close = $(lang.prop('closeButton'));
        
        //Ripristina il menu per la versione desktop e tablet landscape
        lang.removeClass('languageMobileVisible');
//        lang.css('display', 'block');
        lang.removeAttr('style');
        lang.attr("style", "");
        open.removeAttr('style');
        close.removeAttr('style');
        
        
    },
    
    prepareMenu: function()
    {
        var menu = $(Navigation.menu);
        var open = $(menu.prop('openButton'));
        var close = $(menu.prop('closeButton'));
        open.click(function(event){
            event.preventDefault();
//            menu.hide();
            Navigation.closeLang();
            menu.parent().addClass('menuMobileVisible');
            menu.hide();
            
            menu.slideDown(Navigation.time);
            open.hide();
            close.css('display', 'block');
            close.show();
            menu.prop('open', true);
        });
        
        close.click(function(event){
            event.preventDefault();
            close.hide();
            open.css('display', 'block');
            open.show();
            
            menu.slideUp(Navigation.time, function(){
                menu.parent().removeClass('menuMobileVisible');
            });
            menu.prop('open', false);
        });
    },
    
    rollbackMenu: function()
    {
        var menu = $(Navigation.menu);
        menu.prop('mobile', false);
        var open = $(menu.prop('openButton'));
        var close = $(menu.prop('closeButton'));
        
        //Ripristina il menu per la versione desktop e tablet landscape
        menu.parent().removeClass('menuMobileVisible');
        menu.css('display', 'block');
        
        open.removeAttr('style');
        close.removeAttr('style');
        
        menu.removeAttr('style');
    },
    
    closeMenu: function()
    {
        var menu = $(Navigation.menu);
        console.log('close menu', menu);
        console.log('menu open', menu.prop('open'));
        if(menu.prop('open'))
            $(menu.prop('closeButton')).click();
    },
    
    closeLang: function()
    {
        var lang = $(Navigation.lang);
        if(lang.prop('open'))
            $(lang.prop('closeButton')).click();
    }
};

$(document).ready(Navigation.init);