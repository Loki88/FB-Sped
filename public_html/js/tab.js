var Tab = {
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
       //Creare un iframe di altezza 0 e visibilità nascosta per ogni link della tab
       
       //Associare ad ogni link della tab l'iframe relativo
       
       //Associare ad ogni iframe un listener dell'evento ready per sostituire il contenuto della pagina con quello dell'iframe
       
       
       
    },
    
    prepareElement: function(element)
    {
        element = $(element);
        
        var link = $(element.find('.tab-link')[0]);
        
        if(element.hasClass('current'))
            link.prop('page', element.find('.tab-page')[0]);
        else
        {
            link.after('<div class="tab-page">');
            var page = $(element.find('.tab-page')[0]);
            link.prop('page', page);
            page.hide();
        }
        
        link.click(Tab.loadPage);
    },
    
    loadPage: function(event)
    {
        $.ajax({
            
        })
    }

};

$(document).ready(Tab.init());