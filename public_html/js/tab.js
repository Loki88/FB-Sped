var Tab = {
    init: function()
    {
       //Recuperare il menù della tab e collegare ogni bottone al relativo spazio in cui visualizzare il contenuto
       
       //Creare un iframe di altezza 0 e visibilità nascosta per ogni link della tab
       
       //Associare ad ogni link della tab l'iframe relativo
       
       //Associare ad ogni iframe un listener dell'evento ready per sostituire il contenuto della pagina con quello dell'iframe
       
       
       
    },
    
    getParagraph: function(item)
    {
        var dataUrl = $(item).data('paragraph');
        console.log(dataUrl);
        var paragraph = null;
        $.ajax({
            type: "GET",
            url: dataUrl,
            dataType: 'html',
            success: function(data, status, jqXHR){
                console.log(data);
                if(data !== undefined)
                {
                    $(item).prop('content', data);
                    
                }
            }
        });
        
        return paragraph;
    },
    
    replaceParagraph: function(event)
    {
        event.preventDefault();
        var button = $(this);
        $('#page-menu .selected').removeClass('selected');
        button.addClass('selected');
        var display = button.prop('display');
        var content = button.prop('content');
        $('.paragraph').slideDown(1400);
        $(display).html(content);
        $('#transport-img').attr("src", button.data("img"));
    },

};

$(document).ready(Trasporti.init());