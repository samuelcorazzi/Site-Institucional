window.addEventListener("load", () => {
  const slide = document.querySelector(".carrossel-Slide");
  const total = slide.children.length;
  let janela = 0;

  setInterval(() => {
    janela = (janela + 1) % total;
    slide.style.transform = `translateX(-${janela * 100}%)`;
  }, 4000);
});
