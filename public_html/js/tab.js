var Tab = {
    history: [],
    
    current: null,
    
    init: function()
    {
       //Recuperare il menù della tab e collegare ogni bottone al relativo spazio in cui visualizzare il contenuto
       var tab_elements = $('.tab-element');
       console.log('tab_elements', tab_elements.length);
       for(var i=0; i<tab_elements.length; i++)
       {
           var element = $(tab_elements[i]);
           console.log('tab-element', element);
           Tab.prepareElement(element, i);
       }
    },
    
    prepareElement: function(element)
    {
        element = $(element);
        
        var link = $(element.find('.tab-link')[0]);
        
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
    },
    
    changePage: function(link)
    {
        var link = $(link);
        var currentLink = $(Tab.current);
        var width = $(document).width();
        if(width > 481)
        {
            Tab.current = link;
            $(currentLink.prop('page')).fadeOut(800, function(){
                currentLink.parent('.tab-element').removeClass('section group current');
                var element = link.parent('.tab-element');
                element.addClass('section group current');
                var page = $(link.prop('page'));
                console.log('page', page);
                page.fadeIn(800, function(){
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
            page.slideUp(800, function(){
                page.parent('.tab-element').removeClass('section group current');
                $(document.body).css('cursor', 'auto');
            });
            Tab.current = null;
        }
        else{
            Tab.current = link;
            if(currentLink != undefined)
            {    $(currentLink.prop('page')).slideUp(800, function(){
                   currentLink.parent('.tab-element').removeClass('section group current');
               });
               link.parent('.tab-element').addClass('section group current');
                $(link.prop('page')).slideDown(800, function(){
                    $(document.body).css('cursor', 'auto');
                });
            }
            else
               $(link.prop('page')).slideDown(800, function(){
                   link.parent('.tab-element').addClass('section group current');
               });
            
        }
//        $(currentLink.prop('page')).slideToggle()
    },
        
    closeAccordion: function(link)
    {
        link = $(link);
        $(link.prop('page')).slideUp(800);
        link.parent('.tab-element').removeClass('section group current');
    },

    pushHistory: function(link)
    {
        
    }

};

$(document).ready(Tab.init());