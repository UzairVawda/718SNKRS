const imagePicker = document.getElementById("productImage");
const imagePreview = document.getElementById("productImagePreview");

function updateImagePreview() {
  const files = imagePicker.files;
  if (!files || files.length === 0) {
    imagePreview.style.display = "none";
    return;
  }
  const pickedFile = files[0];
  const srcURL = URL.createObjectURL(pickedFile);
  imagePreview.src = srcURL;
  imagePreview.style.display = "block";
}

imagePicker.addEventListener("click", updateImagePreview);
