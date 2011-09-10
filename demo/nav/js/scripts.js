Doat.Nav.changed('item', function(page, data){
    var id = data[0];
    $.getJSON('data/item.js?id='+id, function(response){
        $('#item h2')[0].innerHTML = 'Item #'+id;
        $('#item p')[0].innerHTML = response.content;
    });
});
Doat.Nav.changed(function(page, data){
    var title = page;
    data && data.length && (title+= " #"+data[0]); 
    $('h1')[0].innerHTML = title;
});

Doat.Nav.attachCallback('item', 'in', function(){
    $('.btn-back').show();
});
Doat.Nav.attachCallback('search', 'in', function(){
    $('.btn-back').hide();
});

Doat.Events.ready(function(){
    var q = Doat.params.query;
    if (q){
        Doat.Searchbar.setValue(q);
    }
});

function search(q){
    !q && (q = Doat.Searchbar.getValue());
    Doat.Nav.goTo("search");
    var $page = $("#search div");
    $page.find("ul").remove();
    var $ul = $("<ul>");
    $page.append($ul);
    $page.find(".loading").show();
    
    $.getJSON('data/search.js?q='+q, function(response){
        $page.find(".loading").hide();
        response.items.forEach(function(data){
            var $li = $("<li><a href='' onclick='Doat.Nav.goTo(\"item\", {\"id\": \""+data.id+"\"}); return false;'>"+data.title+"</li>");
            $ul.append($li);
        });
    });    
}
