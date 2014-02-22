var Tab = {
    history: [],
    
    current: null,
    
    time: 500,
    
    init: function()
    {
        //Stato iniziale
//       var state = {
//           href: location.href,
//       };
//       history.pushState(state, 'state', location.href);
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
        
        $(window).on('popstate', function(event){
            event.preventDefault();
            var state = event.originalEvent.state;
            if(state != null)
                window.location.assign(state.href);
            else
                window.location.assign(window.location.href);
        });
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
        
        link.click(Tab.loadPage);
    },

    
    loadPage: function(event)
    {
        event.preventDefault();
        $(document.body).css('cursor', 'wait');
        var link = $(this);
        
        if(!link.prop('setted'))
        {
            var dataUrl = $(this).attr('href');
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
        Tab.pushHistory(link);
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

    pushHistory: function(link)
    {
        link = $(link);
        var id = link.attr('id');
        var state = {
            href: link.attr('href'),
            link_id: id,
        };
        history.pushState(state, 'state', link.attr('href'));
    }
};

$(document).ready(Tab.init());