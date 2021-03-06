function uploadFile(target) {
    if (target.files[0].name != null) {
        $('#upload').removeAttr("disabled");
    }
    else {
        $("#upload").attr("disabled", true);
    }
    document.getElementById("file-name").value = target.files[0].name;
}

function loadImage() {
    var input = document.getElementById("my-file-selector");
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {

            $('#img-upload').attr('src', e.target.result);
            $('#img-upload').css("display", "block");
            $('#img-delete').css("display", "block");
        }

        reader.readAsDataURL(input.files[0]);
    }
}



var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
$(document).ready(function () {



    var image = getUrlParameter('image');
    if (image != null) {
        $('#img-main').attr('src', image);
    }

    $('#font').fontselect().change(function () {

        // replace + signs with spaces for css
        var font = $(this).val().replace(/\+/g, ' ');

        // split font into family and weight
        font = font.split(':');
        // set family on paragraphs 
        $('#text-upload').css('font-family', font[0]);
    });
    // $('#img-upload, #text-upload').on('mousedown', function () {
    //     $(this).addClass('active').parents().on('mousemove', function (e) {
    //         $('.active').offset({
    //             top: e.pageY - $('.active').outerHeight() / 2,
    //             left: e.pageX - $('.active').outerWidth() / 2
    //         }).on('mouseup', function () {
    //             $(this).removeClass('active');
    //         });
    //     });

    //     return false;
    // });


    $('.shirt-allinfo').click(function () {
        $('#img-main').attr('src', $(this).find('img').attr('src'));
    });
    $('#img-delete').click(function () {
        $('#img-delete').css('display', 'none');
        $('#img-upload').css("display", "none");
    });
    $('#text-delete').click(function () {
        $('.custom-text-area').css('display', 'none');
        $('#text-upload').css("display", "none");
        $('#text').val('');
    });

    $('#btn-shirt').click(function () {
        if ($('#table-shirt').is(':hidden')) {
            $('#table-shirt').show();
            $('#btn-shirt').css('background', '#009ddc');
            $('#btn-shirt').css('color', '#fff');
        }
        else {
            $('#table-shirt').hide();
            $('#btn-shirt').css('background', '#fff');
            $('#btn-shirt').css('color', '#009ddc');
        }
    });
    $('#btn-image').click(function () {
        if ($('#table-image').is(':hidden')) {
            if ($('#table-text').is(':visible'))
                $('#table-text').hide();
            $('#table-image').show();
            $('#btn-image').css('background', '#009ddc');
            $('#btn-image').css('color', '#fff');
            $('#btn-text').css('background', '#fff');
            $('#btn-text').css('color', '#009ddc');
        }
        else {
            $('#table-image').hide();
            $('#btn-image').css('background', '#fff');
            $('#btn-image').css('color', '#009ddc');
        }
    });
    $('#btn-text').click(function () {
        if ($('#table-text').is(':hidden')) {
            if ($('#table-image').is(':visible'))
                $('#table-image').hide();
            $('#table-text').show();
            $('#btn-text').css('background', '#009ddc');
            $('#btn-text').css('color', '#fff');
            $('#btn-image').css('background', '#fff');
            $('#btn-image').css('color', '#009ddc');
        }
        else {
            $('#table-text').hide();
            $('#btn-text').css('background', '#fff');
            $('#btn-text').css('color', '#009ddc');
        }

    });

    $('#text').keyup(function () {
        $('#text-upload').css("display", "block");
        $(".custom-text-area").css("display", "block");
        $('#text-upload').html($(this).val());
        if (!$("#text").val()) {
            $('.custom-text-area').css('display', 'none');
            $('#text-upload').css("display", "none");
        }
    });

    var demo4 = $('.colorpickerplus-dropdown .colorpickerplus-container');
    demo4.colorpickerembed();
    demo4.on('changeColor', function (e, color) {
        var el = $('.color-fill-icon', $('#demo4'));
        $('#text-upload').css('color', color);
        if (color == null) {
            //when select transparent color
            el.addClass('colorpicker-color');
        } else {
            el.removeClass('colorpicker-color');
            el.css('background-color', color);
        }
    });


    interact('#img-upload').draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event

    }).resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 50 },
        },

        inertia: true,
    })
        .on('resizemove', function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

        });
    interact('#text-upload').draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
    });
    function dragMoveListener(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    $("#btn-save").click(function () {
        html2canvas(document.querySelector(".pos-image")).then(canvas => {
            // document.body.appendChild(canvas);
            // console.log(canvas.toDataURL());
            var imagedata = canvas.toDataURL('image/png');
           
            
        });
        
    });

    
});



