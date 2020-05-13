$(function () {


    $stickyNavigation.removeClass('d-none');
    $stickyNavigation.slideUp(0);
    checkScroll();


    $(window).scroll(checkScroll);

    $('#menu-open').on('click', function () {
        $('#responsive-nav ol').toggleClass('active');
    });

    
 
});


let sticky = false;
const $stickyNavigation = $('#sticky-navigation');
const $description = $('#description');
const $navigation = $('#navigation');

const checkScroll = () => {
    const inBottom = heightDescription();

        if (inBottom && !sticky) {
            sticky = true;
            stickyNavigation();
        }
        if (!inBottom && sticky) {
            sticky = false;
            unStickyNavigation();
        }
}

const stickyNavigation = () => {
    $description.addClass('position-fixed').removeClass('position-absolute');
    $navigation.slideUp('fast');
    $stickyNavigation.slideDown('fast');
}

const unStickyNavigation = () => {
    $description.removeClass('position-fixed').addClass('position-absolute');
    $navigation.slideDown('fast');
    $stickyNavigation.slideUp('fast');
}

const heightDescription = () => {
    const $descriptionHeight = $description.height();
    return scrollOnDescription($descriptionHeight);
}

const scrollOnDescription = (height) => {
    return $(window).scrollTop() > $(window).height() - (height * 2);
}