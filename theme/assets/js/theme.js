'use strict';

// Cache
var body = $('body');
var mainSlider = $('#main-slider');
var imageCarousel = $('.img-carousel');
var imageCarouselSize = $('.img-carousel > .item').size();
var partnersCarousel = $('#partners');
var testimonialsCarousel = $('#testimonials');
var topProductsCarousel = $('#top-products-carousel');
var featuredProductsCarousel = $('#featured-products-carousel');
var sidebarProductsCarousel = $('#sidebar-products-carousel');
var hotDealsCarousel = $('#hot-deals-carousel');
var owlCarouselSelector = $('.header-slider');
var owlCarouselTestimonial = $('.testimonial-carousel');
var isotopeContainer = $('.isotope');
var isotopeFiltrable = $('#filtrable a');
var toTop = $('#to-top');
var hover = $('.thumbnail');
var navigation = $('.navigation');
var superfishMenu = $('ul.sf-menu');
var priceSliderRange = $('#slider-range');

jQuery(document).ready(function(){
    owlCarouselSelector.owlCarousel({
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });

    owlCarouselTestimonial.owlCarousel({
        items:2,
        loop:true,
        autoplay:true,
        autoplayTimeout:4000,
        autoplayHoverPause:true
    });
});

$("#btn_solicitud").attr("disabled", true);
$("#boton_enviar").attr("disabled", true);

// Slide in/out with fade animation function
jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};
//
jQuery.fn.slideFadeIn  = function(speed, easing, callback) {
    return this.animate({opacity: 'show', height: 'show'}, speed, easing, callback);
};
jQuery.fn.slideFadeOut  = function(speed, easing, callback) {
    return this.animate({opacity: 'hide', height: 'hide'}, speed, easing, callback);
};



function validateContact(event){
    document.getElementById("error").style.display = "none";            
    var errors = "";

    var contact_name = $("#txt_nombre").val();   
    var contact_email_address = $("#txt_email").val();
    var contact_phone = $("#txt_telefono").val();
    var txt_asunto = $("#txt_asunto").val();
    var txt_comentario = $("#txt_comentario").val();
    var v = $("#recaptcha").getResponse();

    if(contact_name == ""){
        errors+= 'Porfavor proporcione su nombre.';
    }
    else if(contact_email_address == ""){
        errors+= 'Porfavor proporcione su correo.';
    }
    else if(contact_phone == ""){
        errors+= 'Porfavor proporcione su número de telefono.';
    }

    if(v.length > 0)
    {              
      $("#boton_enviar").removeAttr("disabled");
    }

    if(errors)
    {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = errors;
        // Aqui evitamos que el formulario haga el submit
        event.preventDefault();
        return false;               
    }
    else{
        loader();
        return true;
    }
}

function validateCotizacion(event){
    document.getElementById("error").style.display = "none";            
    var errors = "";

    var contact_name = $("#txt_nombre_bottom").val();   
    var contact_email_address = $("#txt_email_bottom").val();
    var contact_phone = $("#txt_telefono_bottom").val();
    var v = $("#recaptcha").getResponse();

    if(contact_name == ""){
        errors+= 'Porfavor proporcione su nombre.';
    }
    else if(contact_email_address == ""){
        errors+= 'Porfavor proporcione su correo.';
    }
    else if(contact_phone == ""){
        errors+= 'Porfavor proporcione su número de telefono.';
    }

    if(v.length > 0)
    {              
      $("#btn_solicitud").removeAttr("disabled");
    }

    if(errors)
    {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = errors;
        // Aqui evitamos que el formulario haga el submit
        event.preventDefault();
        return false;               
    }
    else{
        loader();
        return true;
    }
}

function validateCaptcha() 
{
    var v = grecaptcha.getResponse();
    if(v.length > 0)
    {              
        $("#btn_solicitud").removeAttr("disabled");
    }
}

function validateCaptchaContacto() 
{
    var v = grecaptcha.getResponse();
    if(v.length > 0)
    {              
        $("#boton_enviar").removeAttr("disabled");
    }
}

jQuery(document).ready(function () {
    // countdown
    // ---------------------------------------------------------------------------------------
    if ($().countdown) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('#dealCountdown1').countdown({until: austDay});
        $('#dealCountdown2').countdown({until: austDay});
        $('#dealCountdown3').countdown({until: austDay});
    }
});