// Attach callback when http://url#/item appears in the addressbar
// This callback will fire every time the page navigates to or refreshes at #/item
TouchyJS.Nav.changed('item', function(page, data){
    // page argument irrelevant cause we know it's "item"
    
    // Store the item id sent in the url hash.
    // e.g http://url#/item/123 (data[0] returns 123)
    var id = data && data[0] || '';
    
    // get item specific data from server
    $.getJSON('data/item.js?id='+id, function(response){
        // Update item title and conten in page
        $('#item h2')[0].innerHTML = 'Item #'+id;
        $('#item p')[0].innerHTML = response.content;
    });
});

// Attach callback every time a url hash changes
// It's a catch all and returns the page id and data if sent via url hash
TouchyJS.Nav.changed(function(page, data){
    // Construct a title using the page and data arguments
    // e.g "search" or "item #1"
    var title = page;
    data && data.length && (title+= " #"+data[0]);
    
    // Update the header title 
    $('h1')[0].innerHTML = title;
});

// Attach a callback for a specific navigation event
// In this case, the callback will fire everytime the "item" page comes into view
TouchyJS.Nav.attachCallback('item', 'in', function(){
    // Show the back button in the header
    $('.btn-back').show();
});


// In this case, the callback will fire everytime the "search" page comes into view
TouchyJS.Nav.attachCallback('search', 'in', function(){
    // Hide the back button in the header
    $('.btn-back').hide();
});

// Events.ready fires when TouchyJS has initialized all of it's components and is ready for use
// We need this so we know it is safe to access the TouchyJS.Searchbar object
TouchyJS.Events.ready(function(){
    // Store query if it was sent via the url querystring
    var q = TouchyJS.params.query;
    
    // If it was
    if (q){
        // Set the Searchbar's value
        TouchyJS.Searchbar.setValue(q);
    }
});

// Specified in <tml:searchbar> onsubmit attribute.
// Fires when clicking on the "search" key on the keyboard
function search(q){
    // If the query wasnt sent as an argument, get it from the searchbar
    !q && (q = TouchyJS.Searchbar.getValue());
    
    // Navigate to "search" page. If already there, nothing will happen
    TouchyJS.Nav.goTo("search");
    
    // Remove current item list and show "loading.."
    var $page = $("#search div");
    $page.find("ul").remove();
    var $ul = $("<ul>");
    $page.append($ul);
    $page.find(".loading").show();
    
    // get search results
    $.getJSON('data/search.js?q='+q, function(response){
        // hide "loading..."
        $page.find(".loading").hide();
        
        // Render list items in to the page with their corresponding data
        response.items.forEach(function(data){
            var $li = $("<li><a href='' onclick='TouchyJS.Nav.goTo(\"item\", {\"id\": \""+data.id+"\"}); return false;'>"+data.title+"</li>");
            $ul.append($li);
        });
    });    
}
