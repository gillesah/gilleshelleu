const openBtn = document.getElementById("openBtn");
const videoPopup = document.getElementById("videoPopup");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => {
  videoPopup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  videoPopup.style.display = "none";
});
videoPopup.addEventListener("click", (event) => {
  if (event.target === videoPopup) {
    videoPopup.style.display = "none";
  }
});
