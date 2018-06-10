let $uploadCrop = $('#upload-avatar').croppie({
    enableExif: false,
    viewport: {
        width: 150,
        height: 150
    },
    boundary: {
        width: 200,
        height: 200
    }
});

$('#upload').on('change', function () {
    if (this.files && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            $('.upload-avatar').addClass('ready');
            $uploadCrop.croppie('bind', {
                url: e.target.result,
                // points: [200,200,200,200]
            }).then(function(){
                console.log('jQuery bind complete');
            });
        };

        reader.readAsDataURL(this.files[0]);
    } else {
        alert('Sorry - you\'re browser doesn\'t support the FileReader API')
    }
});

$('.upload-avatar-result').on('click', function (ev) {
    $uploadCrop.croppie('result', {
        type: 'canvas',
        size: 'viewport',
        format: 'jpeg'
    }).then(function (resp) {
        console.log(resp);
    });
});
