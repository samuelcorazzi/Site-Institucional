/* garaante que o cod so sera executado quando a tela terminar de fazer todo o load */
window.addEventListener("load", () => {
  const imagens = document.querySelector(".carrossel-imagens");
  const total = imagens.children.length; /* conta quantas "img" tem dentro do container */
  let janela = 0;

  /* setInterval seta o time do carrossel*/
  setInterval(() => {
    janela = (janela + 1) % total; /* adc mais 1 e quando o resto for 0 ele volta do inicio */
    imagens.style.transform = `translateX(-${janela * 100}%)`; /* faz janela * 100 o resultado negativo ele transiciona para x (esquerda) */
  }, 4000);
});
