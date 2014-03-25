var TabToAccordion = {
    time: 800,
    
    init: function()
    {
        TabToAccordion.current = $('.current');
        if(TabToAccordion.current.length > 0)
        {
            TabToAccordion.current.prop('setted', true);
            TabToAccordion.current.prop('open', true);
        }
        else
            TabToAccordion.current = null;
       
        var accordion_links = $('.tab_pane').find('a:not(.close)');
        var accordion_links_close = $('.tab_pane').find('.close');
        var trasportiDesktop = $('#trasporti-desktop');
        if(trasportiDesktop.length == 0)
        {
            TabToAccordion.home = false;
             $.ajax({
                type: "GET",
                url: $('#trasporti-main').attr('href'),
                dataType: 'html',
                success: function(data, status, jqXHR){
                    if(data !== undefined)
                    {
                        var content = $(data).find('#trasporti-desktop');
                        content.css('display', 'none');
                        $('.body-background').append(content);
                    }
                }
            });
        }
        for(var i=0; i<accordion_links.length; i++)
        {
            var accordionLink = $(accordion_links[i]);
            var panel = accordionLink.parents('.tab_pane:first');
            accordionLink.prop('panel', panel);
            console.log('open panel', panel);
            accordionLink.click(TabToAccordion.accordionOpenClick);
            var accordionClose = $(accordion_links_close[i]);
            accordionClose.prop('panel', panel);
            accordionClose.click(TabToAccordion.accordionCloseClick);
            panel.prop('link', accordionLink);
        }
        TabToAccordion.pushState(true);
        
        if($(window).width() < 481)
            TabToAccordion.mobile = true;
        else
            TabToAccordion.mobile = false;
        
        $(window).on('oneColumn', function(){
            TabToAccordion.mobile = true;
            $('#trasporti-desktop').css('display', 'none');
            $('#trasporti-tab').css('display', 'block');
        });
        
        $(window).on('fluidGrid', function(){
            TabToAccordion.mobile = false;
            TabToAccordion.restoreTab();
        });
        
        $(window).on('noMobile', function(){
            TabToAccordion.mobile = false;
            TabToAccordion.restoreTab();
        });
        
        History.Adapter.bind(window,'statechange',function(){
            var State = History.getState();
            if(TabToAccordion.manualStateChange)
            {
                TabToAccordion.restoreState(State.data);
            }
            TabToAccordion.manualStateChange = true;
	});
    },
    
    restoreState: function(state){
        var link = $('.accordion-button>.open[href="'+state.href+'"]');
        if(link.length > 0 && $(document).width() < 481)
            TabToAccordion.loadPage(link);
        else
            window.location.href = state.href;
    },
    
    restoreTab: function()
    {
        console.log('While restoring, tab to accordion... ', TabToAccordion.current)
        if(TabToAccordion.current != null){
            var panel = $(this.current);

            panel.find('a').removeAttr('style');
            panel.find('.tab_page').removeAttr('style');
            panel.addClass('current');
        }
        else{
            console.log('no current entry');
            $('#trasporti-desktop').css('display', 'block');
            $('#trasporti-tab').css('display', 'none');
            var trasporti = $('#trasporti-header');
            var state = {
                href: trasporti.data('href'),
            };
            var s = History.getState();
            if(s.href != state.href)
                History.pushState(state, trasporti.data('title'), state.href);
        }
//        if(TabToAccordion.home)
//        {
//            $('#trasporti-desktop').removeAttr('style');
//            $('#trasporti-tab').removeAttr('style');
//        }
//        else{
//            $('#trasporti-desktop').css('display', 'none');
//            $('#trasporti-tab').css('display', 'block');
//        }
    },

    accordionCloseClick: function(event)
    {
        event.preventDefault();
        TabToAccordion.current = null;
        TabToAccordion.home = true;
        var link = $(this);
        var panel = link.prop('panel');
        panel.removeClass('current');
        TabToAccordion.hide(panel.children('.tab_page'));
        panel.prop('open', false);
    },
    
    accordionOpenClick: function(event)
    {
        event.preventDefault();
        TabToAccordion.loadPage($(this));
    },
    
    loadPage: function(link)
    {
        $(document.body).css('cursor', 'wait');
        link = $(link);
        var panel;
        panel = $(link.prop('panel'));
        if(!panel.prop('setted'))
        {
            var dataUrl = link.attr('href');
            $.ajax({
                type: "GET",
                url: dataUrl,
                dataType: 'html',
                success: function(data, status, jqXHR){
                    if(data !== undefined)
                    {
                        var content = $(data).find('.tab_page');
                        panel.append(content);
                        content.slideUp(0);
                        panel.prop('setted', true);
                        link.prop('panel', panel);
                    }
                },
                complete: function()
                {
                    TabToAccordion.changePage(panel);
                }
            });
        }
        else
        {
            TabToAccordion.changePage(panel);
        }
    },

    changePage: function(panel)
    {
        panel = $(panel);
        var current = $(TabToAccordion.current);
        if(!panel.is(current))
        {
            TabToAccordion.home = false;
            TabToAccordion.hide(current.children('.tab_page'), function(){
                current.removeClass('current');
            });
            current.prop('open', false);
            TabToAccordion.current = panel;
            TabToAccordion.pushState();
            $('.tab_controls').children('.selected').removeClass('selected');
            var link = $(panel.prop('tabLink'));
            link.parent().addClass('selected');
            panel.addClass('current');
            TabToAccordion.show(panel.children('.tab_page'));
            panel.prop('open', true);
            var trigger = panel.data('trigger');
            $('.tab_right_col').find('.selected').removeClass('selected');
            $(trigger).addClass('selected');
        }
        else{
            if(panel.prop('open'))
            {
                TabToAccordion.current = null;
                TabToAccordion.home = true;
                panel.children('.close').hide();
                TabToAccordion.hide(panel.children('.tab_page'));
                panel.removeClass('current');
                panel.prop('open', false);
            }   
            else
            {
                TabToAccordion.home = false;
                TabToAccordion.current = panel;
                panel.children('.close').css('display', 'table');
                TabToAccordion.show(panel.children('.tab_page'));
                panel.addClass('current');
                panel.prop('open', true);
            }
        }
        $(document.body).css('cursor', 'auto');
    },
    
    pushState: function(replace)
    {
        //semaforo per i cambiamenti di stato della pagina
        TabToAccordion.manualStateChange = false;
        var current = $(TabToAccordion.current);
        var link = $(current.prop('link'));
        var state = {
            href: link.attr('href'),
        };
        if(replace != undefined && replace)
            History.replaceState(state, current.data('title'), link.attr('href'));
        else
            History.pushState(state, current.data('title'), link.attr('href'));
    },
    
    show: function(page, f){
        if(TabToAccordion.mobile)
        {
            page.slideDown(TabToAccordion.time, f);
        }
        else{
            page.fadeIn(0, f);
        }
    },
    
    hide: function(page, f){
        if(TabToAccordion.mobile)
        {
            page.slideUp(TabToAccordion.time, f);
        }
        else{
            page.fadeOut(0, f)
        }
    }
};

$(document).ready(TabToAccordion.init());