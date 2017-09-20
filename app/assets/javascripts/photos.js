Dropzone.options.newPhoto = {
  init: function () {
    this.on('addedfile', function (e) {
      $('.dropzone').addClass('dz-started');
    });
  },
  paramName: "photo[image]",
  previewsContainer: ".dz-previews",
  thumbnailWidth: 180,
  thumbnailHeight: 180,
  maxFiles: 3,
  previewTemplate: '<div class="card dz-preview dz-file-preview mb-4"><img data-dz-thumbnail class="card-img-top" /><div class="progress dz-upload"><div class="progress-bar dz-upload" role="progressbar" data-dz-uploadprogress></div></div></div>'
};
