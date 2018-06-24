tinymce.init({
    selector: 'textarea#content',
    plugins: [
        'advlist autoresize autolink lists link image charmap preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools toc'
    ],
    toolbar1: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
    toolbar2: 'preview | forecolor backcolor emoticons |  fontselect fontsizeselect',
    image_title: true,
    image_advtab: true,
    automatic_uploads: true,
    images_upload_url: '',
    file_picker_types: 'image',
    file_picker_callback: function(cb, value, meta) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function() {
            const file = this.files[0];
            const id = 'blobid' + (new Date()).getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const blobInfo = blobCache.create(id, file);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri(), { title: file.name });
        };
        input.click();
    }
});
$(".select2").select2();