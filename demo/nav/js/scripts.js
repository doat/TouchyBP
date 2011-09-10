TouchyJS.Nav.changed('item', function(page, data){
    var id = data[0];
    $.getJSON('data/item.js?id='+id, function(response){
        $('#item h2')[0].innerHTML = 'Item #'+id;
        $('#item p')[0].innerHTML = response.content;
    });
});
TouchyJS.Nav.changed(function(page, data){
    var title = page;
    data && data.length && (title+= " #"+data[0]); 
    $('h1')[0].innerHTML = title;
});

TouchyJS.Nav.attachCallback('item', 'in', function(){
    $('.btn-back').show();
});
TouchyJS.Nav.attachCallback('search', 'in', function(){
    $('.btn-back').hide();
});

TouchyJS.Events.ready(function(){
    var q = TouchyJS.params.query;
    if (q){
        TouchyJS.Searchbar.setValue(q);
    }
});

function search(q){
    !q && (q = TouchyJS.Searchbar.getValue());
    TouchyJS.Nav.goTo("search");
    var $page = $("#search div");
    $page.find("ul").remove();
    var $ul = $("<ul>");
    $page.append($ul);
    $page.find(".loading").show();
    
    $.getJSON('data/search.js?q='+q, function(response){
        $page.find(".loading").hide();
        response.items.forEach(function(data){
            var $li = $("<li><a href='' onclick='TouchyJS.Nav.goTo(\"item\", {\"id\": \""+data.id+"\"}); return false;'>"+data.title+"</li>");
            $ul.append($li);
        });
    });    
}
