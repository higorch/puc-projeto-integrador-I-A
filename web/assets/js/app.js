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

        $.ajax({
            data: JSON.stringify({
                symptoms: symptoms
            }),
            type: "POST",
            url: "/api/pre-diagnostico",
            contentType: 'application/x-www-form-urlencoded',
            success: function (data) {

                var output = '';

                $.each(data.response, function (index, value) {
                    output += "<div class='box'>";
                    output += "<p>Você tem <b>" + value.probability + "%</b> dos sintomas de <b>" + value.title + "</b></p>";
                    output += "<div class='progressbar'>";
                    output += "<span class='bg'></span>";
                    output += "<span class='bar' style='width: calc(100% - " + value.probability + "%);'></span>";
                    output += "</div>";
                    output += "</div>";
                });

                if (data.response.length > 0) {
                    $('.body .results').html(output).show();
                    $('.body .section-title').show();
                    $('.body .alert').hide();
                } else {
                    $('.body .results').html('').hide();
                    $('.body .section-title').hide();
                    $('.body .alert').show();
                }

            },
        });

    });

})(jQuery);