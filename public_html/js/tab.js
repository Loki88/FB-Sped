var Tab = {
    history: [],
    
    current: null,
    
    time: 500,
    
    init: function()
    {
        //Stato iniziale
       this.initLink = $('.current').children('.tab-link');
       console.log(this.initLink);
       var state = {
           href: location.href,
           link_id: 'init',
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
            if(!link.prop(open))
            {
                var page = $(link.prop('page'));
                var element = link.parent('.tab-element');
                element.addClass('section group current');
                page.show();
            }   
        });
        $(window).on('noMobile', function(event){
            var link = $(Tab.current);
            if(!link.prop(open))
            {
                var page = $(link.prop('page'));
                var element = link.parent('.tab-element');
                element.addClass('section group current');
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
        console.log(state);
        var id = state.data.link_id;
        console.log(id);
        if(id === 'init')
            link = $(Tab.initLink);
        else
            link = $(state.data.link_id);
        console.log(link);
        Tab.loadPage(link);
    },
    
    prepareElement: function(element, i)
    {
        element = $(element);
        
        var link = $(element.find('.tab-link')[0]);
        var id = 'tab_link_'+i;
        link.attr('id', id);
        if(element.hasClass('current'))
        {
            Tab.current = link;
            link.prop('page', element.find('.tab-page')[0]);
            link.prop('setted', true);
        }
        else
        {
            link.after('<div class="tab-page">');
            var page = $(element.find('.tab-page')[0]);
            link.prop('page', page);
            link.prop('setted', false);
        }
        
        var state = {
            href: link.attr('href'),
            link_id: '#'+id,
        };
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
            Tab.changePage(link);
    },
    
    changePage: function(link)
    {
        var link = $(link);
        var currentLink = $(Tab.current);
        var width = $(document).width();
        if(width > 481)
        {
            Tab.current = link;
            
            $(currentLink.prop('page')).fadeOut(Tab.time, function(){
                currentLink.parent('.tab-element').removeClass('section group current');
                currentLink.prop('open', false);
                var element = link.parent('.tab-element');
                element.addClass('section group current');
                var page = $(link.prop('page'));
                page.fadeIn(Tab.time, function(){
                    page.prop('open', true);
                    $(document.body).css('cursor', 'auto');
                });
            });
        }
        else
        {
            Tab.accordion(link);
        }
        
    },
    
    accordion: function(link)
    {
        var link = $(link);
        var currentLink = $(Tab.current);
        if(link.parent('.tab-element').hasClass('current'))
        {
            var page = $(link.prop('page'));
            page.slideUp(Tab.time, function(){
                page.parent('.tab-element').removeClass('section group current');
                $(document.body).css('cursor', 'auto');
                link.prop('open', false);
            });
        }
        else{
            Tab.current = link;
            if(currentLink != undefined)
            {    $(currentLink.prop('page')).slideUp(Tab.time, function(){
                   currentLink.parent('.tab-element').removeClass('section group current');
                   currentLink.prop('open', false);
               });
               link.parent('.tab-element').addClass('section group current');
                $(link.prop('page')).slideDown(Tab.time, function(){
                    $(document.body).css('cursor', 'auto');
                    link.prop('open', true);
                });
            }
            else
               $(link.prop('page')).slideDown(Tab.time, function(){
                   link.parent('.tab-element').addClass('section group current');
                   link.prop('open', true);
               });
            
        }
//        $(currentLink.prop('page')).slideToggle()
    },
        
    closeAccordion: function(link)
    {
        link = $(link);
        $(link.prop('page')).slideUp(Tab.time);
        link.prop('open', false);
        link.parent('.tab-element').removeClass('section group current');
    },

    pushHistory: function(event)
    {
        event.preventDefault();
        link = $(this);
        
        History.pushState(link.prop('state'), link.data('title'), link.attr('href'));
    }
};

$(document).ready(Tab.init());