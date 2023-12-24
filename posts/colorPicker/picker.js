document.addEventListener('DOMContentLoaded', function () {
    const imageUploader = document.getElementById('imageUploader');
    const imageCanvas = document.getElementById('imageCanvas');
    const ctx = imageCanvas.getContext('2d');
    const selectedColor = document.getElementById('selectedColor');
    const colorBlock = document.getElementById('colorBlock');
    const cbctx = colorBlock.getContext('2d');

    imageUploader.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                imageCanvas.width = img.width;
                imageCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = event.target.result;
        }

        reader.readAsDataURL(file);
    });

    async function mouseOverCanvas(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const xDoc = e.pageX;
        const yDoc = e.pageY;
        const bitmap = await createImageBitmap(ctx.getImageData(x-2, y-2, 5, 5))
        magnify(bitmap, e.x, e.y, xDoc, yDoc);
    }

    imageCanvas.addEventListener('mousemove', mouseOverCanvas);

    imageCanvas.addEventListener('mousedown', function(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const pixel = ctx.getImageData(x, y, 1, 1);
        const data = pixel.data;
        const rgba = 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        selectedColor.innerText = rgba;
        cbctx.fillStyle = rgba;
        cbctx.fillRect(0, 0, colorBlock.width, colorBlock.height);
    })

});

function magnify(bitmap, x, y, xDoc, yDoc) {
    const magnifierLens = document.getElementById('magnifierLens');
    const ctx = magnifierLens.getContext('2d');

    magnifierLens.style.position='absolute'
    magnifierLens.style.left = xDoc - 49 + 'px';
    magnifierLens.style.top = yDoc- 49 + 'px';
    
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bitmap, 0, 0, magnifierLens.width, magnifierLens.height);
}