var Trasporti = {
    init: function()
    {
        this.menu = $('#page-menu');
        var content = $('.paragraph');
        this.contentBox = content.parent();
        this.display = $('#responsive-pane');
        var menuSelected = this.menu.children('.selected');
        menuSelected.prop("content", content);
        menuSelected.prop("display", this.display);
        menuSelected.click(this.replaceParagraph);
        var menuItems = this.menu.find(':not(.selected)');
        for(var i=0; i < menuItems.length; i++)
        {
            var menuItem = $(menuItems[i]);
            this.getParagraph(menuItem);
            menuItem.prop("display", this.display);
            menuItem.click(this.replaceParagraph);
        }
        
        $(window).resize(new function(event){
            var contentParent = content.parent('div');
            if($(this).width() <= 480)
                for(var i=0; i < menuItems.length; i++)
                {
                    var menuItem = $(menuItems[i]);
                    this.getParagraph(menuItem);
                    menuItem.prop("display", this.display);
                    menuItem.click(this.replaceParagraph);
                }
        });
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