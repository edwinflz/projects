$(function () {

    let sticky = false;

    $stickyNavigation.removeClass('d-none');
    $stickyNavigation.slideUp(0);


    $(window).scroll(() => {
        const inBottom = heightDescription();

        if (inBottom && !sticky) {
            sticky = true;
            stickyNavigation();
        }
        if (!inBottom && sticky) {
            sticky = false;
            unStickyNavigation();
        }
    });

    $('#menu-open').on('click', function () {
        $('#responsive-nav ol').toggleClass('active');
    });

    
 
});

const $stickyNavigation = $('#sticky-navigation');
const $description = $('#description');
const $navigation = $('#navigation');

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