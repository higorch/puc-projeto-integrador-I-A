(function ($) {

    var symptoms = [];
    var audio = new Audio("mp3/meme.mp3");

    // obter sintomas
    $.get("/api/sintomas", function (data) {

        var output = "<ul>";
        $.each(data, function (index, value) {
            output += "<li>";
            output += "<label>";
            output += "<img src='" + value.icon + "' alt='" + value.title + "'>";
            output += "<span class='text'>" + value.title + "</span>";
            output += "<input type='checkbox' data-symptom='" + index + "'>";
            output += "</label>";
            output += "</li>";
        });
        output += "</ul>";

        $('.sidebar .box .symptoms').html(output);
        $('.scrollbar-macosx').scrollbar();

    });

    // enviar sintomas e obter pre-resultado
    $(document).on('click', '.sidebar .box ul li label', function (e) {

        e.preventDefault();

        var el = $(this);
        var symptom = el.find('input[type="checkbox"]').data('symptom');

        if (symptoms.includes(symptom)) {
            var index = symptoms.indexOf(symptom);
            if (index > -1) {
                symptoms.splice(index, 1);
            }
            el.parent('li').removeClass('active');
        } else {
            symptoms.push(symptom);
            el.parent('li').addClass('active');
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

        console.log(symptoms);
    });

})(jQuery);