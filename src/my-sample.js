// uploader
let picture = new DataTransfer();
let ajaxConfig = {
  ajaxRequester: function (config, uploadFile, pCall, sCall, eCall) {
    $('#create_tour_activity').prop('disabled', true);
    let progress = 0
    let interval = setInterval(async () => {
      progress += 10;
      pCall(progress)
      if (progress >= 100) {
        clearInterval(interval)
        const windowURL = window.URL || window.webkitURL;

        let dataUrl = await compressImage(uploadFile.file, 50) // 50% quality image

        var blobBin = atob(dataUrl.split(',')[1]);
        var array = [];
        for (var i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        var blob_file = new Blob([new Uint8Array(array)], {
          type: 'image/jpeg'
        });

        const fileInput = document.getElementById('supporting_picture');
        attach_file = new File([blob_file], Math.random().toString(16).slice(2) + '.jpeg' ,{type:"image/jpeg", lastModified:new Date().getTime()}); // create new file
        picture.items.add(attach_file);
        fileInput.files = picture.files; // set input file hidden

        sCall({
          data: windowURL.createObjectURL(blob_file)
        })
        $('#create_tour_activity').prop('disabled', false);
        // eCall("上传异常")
      }
    }, 300)
  }
}


// value defaultValue
// [
//   {
//     name: 'sample',
//     url: 'http://localhost/image/sample.jpeg'
//   }
// ]

$("#picture").uploader({
  multiple: true,
  defaultValue: <?= str_replace('"', "'", json_encode($arr_new)) ?>,
  ajaxConfig: ajaxConfig
})
