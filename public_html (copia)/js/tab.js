var Tab = {
    history: [],
    
    current: null,
    
    time: 500,
    
    time_accordion: 800,
    
    init: function()
    {
        //Stato iniziale
       this.initLink = $('.current').children('.tab-link');
       console.log(this.initLink);
       var state = {
           href: location.href,
           link_id: 'init',
           'open': true,
       };
       History.replaceState(state, $(document.body.title).text(), location.href);
       //Recuperare il menù della tab e collegare ogni bottone al relativo spazio in cui visualizzare il contenuto
       var tab_elements = $('.tab-element');
       for(var i=0; i<tab_elements.length; i++)
       {
           var element = $(tab_elements[i]);
           console.log('tab-element', element);
           Tab.prepareElement(element, i);
       }
       $(window).on('fluidGrid', function(event){
            var link = $(Tab.current);
            var state = link.prop('state');
            if(!state.open)
            {
                var page = $(link.prop('page'));
                var element = link.parent('.tab-element');
                element.addClass('section group current');
                
                state.open = true;
                link.prop('state', state);
                page.show();
            }   
        });
        $(window).on('noMobile', function(event){
            var link = $(Tab.current);
            var state = link.prop('state');
            if(!state.open)
            {
                var page = $(link.prop('page'));
                var element = link.parent('.tab-element');
                element.addClass('section group current');
                state.open = true;
                link.prop('state', state);
                page.show();
            }  
        });
        
        History.Adapter.bind(window,'statechange',function(){
            Tab.updateContent(History.getState());
        });
    },
    
    updateContent: function(state)
    {
        var link;
        var id = state.data.link_id;
        console.log('state', state);
        if(id === 'init')
            link = $(Tab.initLink);
        else
            link = $(state.data.link_id);
        link.prop('state', state.data);
        Tab.loadPage(link);
    },
    
    prepareElement: function(element, i)
    {
        element = $(element);
        
        var link = $(element.find('.tab-link')[0]);
        console.log('preparing link', link);
        var id = 'tab_link_'+i;
        link.attr('id', id);
        var state = {
            href: link.attr('href'),
            link_id: '#'+id,
            'open': false
        };
        if(element.hasClass('current'))
        {
            Tab.current = link;
            link.prop('page', element.find('.tab-page')[0]);
            link.prop('setted', true);
            state.open = true;
        }
        else
        {
            link.after('<div class="tab-page">');
            var page = $(element.find('.tab-page')[0]);
            link.prop('page', page);
            link.prop('setted', false);
        }
        
        
        link.prop('state', state);
        link.click(Tab.pushHistory);
    },

    
    loadPage: function(link)
    {
        $(document.body).css('cursor', 'wait');
        link = $(link);
        if(!link.prop('setted'))
        {
            var dataUrl = link.attr('href');
            $.ajax({
                type: "GET",
                url: dataUrl,
                dataType: 'html',
                success: function(data, status, jqXHR){
                    if(data !== undefined)
                    {
                        var content = $(data).find('.tab-page');
                        link.next('.tab-page').remove();
                        link.after($(content));
                        content.hide();
                        link.prop('page', link.next('.tab-page'));
                        link.prop('setted', true);
                        
                    }
                },
                complete: function()
                {
                    Tab.changePage(link);
                }
            });
        }
        else
        {
            console.log("action");
            Tab.changePage(link);
        }
    },
    
    changePage: function(link)
    {
        link = $(link);
        var width = $(document).width();
        if(width > 481)
        {
            Tab.manageTab(link);
        }
        else
        {
            Tab.accordion(link);
        }
        
    },
    
    manageTab: function(link)
    {
        var currentLink = $(Tab.current);
        Tab.current = link;
        var state = currentLink.prop('state');
        $(currentLink.prop('page')).fadeOut(Tab.time, function(){
            currentLink.parent('.tab-element').removeClass('section group current');
            state.open = false;
            currentLink.prop('state', state);
            var element = link.parent('.tab-element');
            element.addClass('section group current');
            var page = $(link.prop('page'));
            page.fadeIn(Tab.time, function(){
                $(document.body).css('cursor', 'auto');
            });
        });
    },
    
    accordion: function(link)
    {
        var link = $(link);
        
        var state = link.prop('state');
        if(!state.open)
        {
            //L'elemento deve essere chiuso
            var page = $(link.prop('page'));
            console.log('close accordion');
            page.slideUp(Tab.time_accordion, function(){
                $(document.body).css('cursor', 'auto');
            });
            link.parent('.tab-element').removeClass('section group current');
        }
        else{
            //L'elemento deve essere aperto
            var currentLink = $(Tab.current);
            
            if(link.is(currentLink))
            {   
                //Non esiste un altro elemento aperto
                console.log('open one');
                $(link.prop('page')).slideDown(Tab.time_accordion, function(){
                   link.parent('.tab-element').addClass('section group current');
                   
               });
                Tab.current = link;
            }
            else
            {
                //Esiste un elemento aperto che deve essere chiuso
                var currentLinkState = currentLink.prop('state');
                currentLinkState.open = false;
                currentLink.prop('state', currentLinkState);
                console.log('open different accordion')
                $(currentLink.prop('page')).slideUp(Tab.time_accordion, function(){
                   currentLink.parent('.tab-element').removeClass('section group current');
               });

               link.parent('.tab-element').addClass('section group current');
               $(link.prop('page')).slideDown(Tab.time_accordion, function(){
                    $(document.body).css('cursor', 'auto');
                    
                });
                Tab.current = link;
           }
        }
    },

    pushHistory: function(event)
    {
        event.preventDefault();
        link = $(this);
        console.log('link', link);
        var link_state = link.prop('state');
        if(link_state.open)
            link_state.open = false;
        else
            link_state.open = true;
        
        console.log('link state', link_state);
        History.pushState(link_state, link.data('title'), link.attr('href'));
    }
};

$(document).ready(Tab.init());