(function ($) {

    $('.scrollbar-macosx').scrollbar();

    var symptoms = [];

    $(document).on('click', '.sidebar .box ul li label', function (e) {

        e.preventDefault();

        var el = $(this);
        var symptom = el.find('input[type="checkbox"]').data('symptom');

        if (symptoms.length >= 0 && symptoms.indexOf(symptom) == -1) {
            el.parent('li').addClass('active');
            symptoms.push(symptom);
        } else {
            el.parent('li').removeClass('active');
            symptoms.pop(symptom);
        }

        console.log(symptoms);
    });

})(jQuery);