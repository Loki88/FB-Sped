var TabToAccordion = {
    init: function()
    {
        TabToAccordion.current = $('.current');
        TabToAccordion.current.prop('setted', true);
        TabToAccordion.current.prop('open', true);
       
        var accordion_links = $('.tab_pane').find('a:not(.close)');
        var accordion_links_close = $('.tab_pane').find('.close');
        
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
        $(window).on('fluidGrid', function(){
            TabToAccordion.restoreTab();
        });
        
        $(window).on('noMobile', function(){
            TabToAccordion.restoreTab();
        });
        
        History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
            var State = History.getState(); // Note: We are using History.getState() instead of event.state
            History.log(State.data, State.title, State.url);
            if(TabToAccordion.manualStateChange)
            {
                TabToAccordion.restoreState(State.data);
            }
            TabToAccordion.manualStateChange = true;
	});
    },
    
    restoreState: function(state){
        console.log('href', state.href);
        var link = $('.accordion-button>.open[href="'+state.href+'"]');//.find('[href="'+state.href+'"]:first');
        TabToAccordion.loadPage(link);
    },
    
    restoreTab: function()
    {
        var panel = $(this.current);
        panel.find('a').removeAttr('style');
        panel.find('.tab_page').removeAttr('style');
        panel.addClass('current');
        var trigger = panel.data('trigger');
        $('.tab_right_col').find('.selected').removeClass('selected');
        $(trigger).addClass('selected');
    },

    
    accordionCloseClick: function(event)
    {
        event.preventDefault();
        console.log('accordion close  click');
        var link = $(this);
        var panel = link.prop('panel');
        panel.removeClass('current');
        panel.children('.tab_page').slideUp(600);
        panel.prop('open', false);
    },
    
    accordionOpenClick: function(event)
    {
        event.preventDefault();
        console.log('accordion open click');
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
            current.children('.tab_page').slideUp(400, function(){
                current.removeClass('current');
            });
            current.prop('open', false);
            TabToAccordion.current = panel;
            TabToAccordion.pushState();
            $('.tab_controls').children('.selected').removeClass('selected');
            var link = $(panel.prop('tabLink'));
            link.parent().addClass('selected');
            panel.addClass('current');
            panel.children('.tab_page').slideDown(400);
            panel.prop('open', true);
            
        }
        else{
            if(panel.prop('open'))
            {
                panel.children('.close').hide();
                panel.children('a:not(.close)').show();
                panel.children('.tab_page').slideUp(400);
                panel.removeClass('current');
                panel.prop('open', false);
            }   
            else
            {
                panel.children('a:not(.close)').hide();
                panel.children('.close').css('display', 'table');
                panel.children('.tab_page').slideDown(400);
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
        console.log('current to state', current);
        var link = $(current.prop('link'));
        console.log('link to state', link);
        var state = {
            href: link.attr('href'),
        };
        if(replace != undefined && replace)
            History.replaceState(state, current.data('title'), link.attr('href'));
        else
            History.pushState(state, current.data('title'), link.attr('href'));
    }
};

$(document).ready(TabToAccordion.init());