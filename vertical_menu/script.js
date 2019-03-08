// source: https://www.addthis.com/get/share/#menu

$(document).ready(function() {

    // show relevant project image when hovering over menu item:
    $('.nav-menu__item').each(function(index) {
        $(this).hover(function() {
            $('.nav-text__tagline').hide();
            $(`.project${index+1}-img`).addClass('show');
        }, function(){
            $(`.project${index+1}-img`).removeClass('show');
            $('.nav-text__tagline').show();
        });
    })

})