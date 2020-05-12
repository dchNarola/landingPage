new WOW().init();
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 400) {
        $(".navbar").addClass("darkheader");
    }
    else {
        $(".navbar").removeClass("darkheader");
    }
});

// $.sidebarMenu($('.sidebar-menu'));

/* Owl slider */
$('.team-carousel').owlCarousel({
    loop:true,
    nav:false,
    dots:false,
    items:4,
    autoplay:false,
    autoplayTimeout:5000,
    autoplayHoverPause:false,
    responsive:{
        0:{
            items:1
        },
        420:{
            items:2
        },
        575:{
            items:2
        },
        767:{
            items:2
        },
        1000:{
            items:4
        }
    }
})




function scroll_to_class(element_class, removed_height) {
    var scroll_to = $(element_class).offset().top - removed_height;
    if($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({scrollTop: scroll_to}, 0);
    }
}

function bar_progress(progress_line_object, direction) {
    var number_of_steps = progress_line_object.data('number-of-steps');
    var now_value = progress_line_object.data('now-value');
    var new_value = 0;
    if(direction == 'right') {
        new_value = now_value + ( 100 / number_of_steps );
    }
    else if(direction == 'left') {
        new_value = now_value - ( 100 / number_of_steps );
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

    jQuery(document).ready(function() {    
        /* Form */
        $('.step-form fieldset:first').fadeIn('slow');
       
        $('.step-form input[type="text"], .step-form input[type="password"], .step-form textarea, .step-form select').on('focus', function() {
            $(this).removeClass('input-error');
        });
        
        // next step   
        $('.step-form .btn-next , .mobile-dropdown .dropdown-item').on('click', function() {
            var parent_fieldset = $(this).parents('fieldset');
            var next_step = true;
            // navigation steps / progress steps
       
            var current_active_step = $(this).parents('.step-form').find('.step-action.active');
       
            var progress_line = $(this).parents('.step-form').find('.step-line');
            
            // fields validation
            // parent_fieldset.find('input[type="text"], input[type="password"], textarea , select').each(function() {
            //     if( $(this).val() == "" ) {
            //         $(this).addClass('input-error');
            //         next_step = false;
            //     }
            //     else {
            //         $(this).removeClass('input-error');
            //     }
            // });
            // fields validation
            
            if( next_step ) {
                parent_fieldset.fadeOut(400, function() {
                    // change icons
                    current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                    // progress bar
                    bar_progress(progress_line, 'right');
                    // show next step
                    $(this).next().fadeIn();
                    // scroll window to beginning of the form
       
                    scroll_to_class( $('.step-form'), 20 );
                });
            }
        });
        
        // previous step   
        $('.step-form .btn-previous').on('click', function() {
            // navigation steps / progress steps
       
            var current_active_step = $(this).parents('.step-form').find('.f1-step.active');
       
            var progress_line = $(this).parents('.step-form').find('.f1-progress-line');
            
            $(this).parents('fieldset').fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
                // progress bar
                bar_progress(progress_line, 'left');
                // show previous step
                $(this).prev().fadeIn();
                // scroll window to beginning of the form
       
                scroll_to_class( $('.step-form'), 8 );
            });
        });
        
        // submit   
        $('.step-form').on('submit', function(e) {
            
            // fields validation
            $(this).find('input[type="text"], input[type="password"], textarea').each(function() {
                if( $(this).val() == "" ) {
                    e.preventDefault();
                    $(this).addClass('input-error');
                }
                else {
                    $(this).removeClass('input-error');
                }
            });
            // fields validation
        });
        
        // $(function() {
        //     $('#step-select').change(function(){
        //         $('.step-form fieldset').hide();
        //         $('#' + $(this).val()).show();
        //         // $('#' + $(this).val()).show();
        //     });
        // });
    
});
// $(document).ready(function(){
//     $(".mobile-dropdown ").click(function(){
//        var this = $(this).val().show();  
//     })
// });

$(document).ready(function(){
    $(".mobile-dropdown select").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".stp-field").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".stp-field").hide();
            }
        });
    }).change();
});