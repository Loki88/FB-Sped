var TabToAccordion = {
    time: 800,
    
    init: function()
    {
        TabToAccordion.current = $('.current');
        if(TabToAccordion.current.length > 0)
        {
            TabToAccordion.current.prop('nav_position', $('#breadcrumb'));
            TabToAccordion.current.prop('setted', true);
            TabToAccordion.current.prop('open', true);
        }
        else
            TabToAccordion.current = null;
       
        var accordion_links = $('.tab_pane').find('a:not(.close)');
        var accordion_links_close = $('.tab_pane').find('.close');

        for(var i=0; i<accordion_links.length; i++)
        {
            var accordionLink = $(accordion_links[i]);
            var panel = accordionLink.parents('.tab_pane:first');
            accordionLink.prop('panel', panel);
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
        
        $(window).on('fluidGrid', function(){
            TabToAccordion.mobile = false;
            TabToAccordion.restoreTab();
        });
        
        $(window).on('oneColumn', function(){
            TabToAccordion.mobile = true;
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
        var panel = $(this.current);
        var link = panel.find('a');
        link.removeAttr('style');
        link.attr("style", "");
        var page = panel.find('.tab_page');
        page.removeAttr('style');
        page.attr("style", "");
        panel.addClass('current');
    },

    accordionCloseClick: function(event)
    {
        event.preventDefault();
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
                        var breadcrumb = $(data).find('#breadcrumb');
                        panel.append(content);
                        panel.prop('nav_position', breadcrumb);
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
            $('#breadcrumb').replaceWith($(panel.prop('nav_position')));
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
                TabToAccordion.home = true;
                panel.children('.close').hide();
                TabToAccordion.hide(panel.children('.tab_page'));
                panel.removeClass('current');
                panel.prop('open', false);
            }   
            else
            {
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