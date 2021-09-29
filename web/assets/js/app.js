(function ($) {

    $('.scrollbar-macosx').scrollbar();

    var symptoms = [];
    var audio = new Audio("mp3/meme.mp3");

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

        var qtdSymptom = $('.symptoms ul li').length;
        var qtdSymptomActive = $('.symptoms ul li.active').length;

        if (qtdSymptom == qtdSymptomActive) {
            $('.body .meme').show();
            audio.play();
        } else {
            $('.body .meme').hide();
            audio.pause();
        }

        console.log(qtdSymptomActive, qtdSymptom);
    });

})(jQuery);