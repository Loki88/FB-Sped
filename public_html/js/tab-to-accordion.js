var TabToAccordion = {
    init: function()
    {
        $('.current').prop('setted', true);
        this.current = $('.current');
        var accordion_links = $('.tab_pane').find('a:not(.close)');
        var accordion_links_close = $('.tab_pane').find('.close');
        
        for(var i=0; i<tab_links.length; i++)
        {
            var link = $(tab_links[i]);
            $(link.data('target')).prop('tabLink', link);
            link.click(TabToAccordion.tabClick);
            var accordionLink = $(accordion_links[i]);
            accordionLink.click(TabToAccordion.accordionOpenClick);
            var accordionClose = $(accordion_links_close[i]);
            accordionClose.click(TabToAccordion.accordionCloseClick);
        }
        
        $(window).on('fluidGrid', function(){
            TabToAccordion.restoreTab();
        });
        
        $(window).on('noMobile', function(){
            TabToAccordion.restoreTab();
        });
    },
    
    restoreTab: function()
    {
        var panel = $(this.current);
        panel.find('a').removeAttr('style');
        panel.find('.tab_page').removeAttr('style');
    },
    
    tabClick: function(event)
    {
        event.preventDefault();
        console.log('tab click');
        TabToAccordion.loadPage($(this));
    },
    
    accordionCloseClick: function(event)
    {
        event.preventDefault();
        console.log('accordion close  click');
        var link = $(this);
        var panel = link.parent();
        
        link.prev('a').css('display', 'block');
        link.hide();
        panel.children('.tab_page').slideUp(600);
    },
    
    accordionOpenClick: function(event)
    {
        event.preventDefault();
        console.log('accordion open click');
        
    },
    
    loadPage: function(link)
    {
        $(document.body).css('cursor', 'wait');
        link = $(link);
        var panel;
        if(link.parent().hasClass('menu-button'))
            panel = $(link.data('target'));
        else
            panel = link.parent();
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
        if(!panel.hasClass('current'))
        {
            current.children('.tab_page').hide(400, function(){
                current.removeClass('current');
            });
            TabToAccordion.current = panel;
            $('.tab_controls').children('.selected').removeClass('selected');
            var link = $(panel.prop('tabLink'));
            link.parent().addClass('selected');
            panel.addClass('current');
            panel.show(400);
            $(document.body).css('cursor', 'auto');
        }
    },
    
};

$(document).ready(TabToAccordion.init());