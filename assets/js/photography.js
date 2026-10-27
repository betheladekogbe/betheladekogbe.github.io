(function () {
  "use strict";
  const grid = document.getElementById("photography-gallery");
  if (!grid) return;

  const initialCards = Array.from(grid.querySelectorAll("[data-photo-card]"));
  const dialog = document.getElementById("photography-lightbox");
  const image = document.getElementById("photography-lightbox-image");
  const count = document.getElementById("photography-lightbox-count");
  const shuffleButton = document.getElementById("photography-reshuffle");
  let cards = initialCards.slice();
  let index = 0;
  let lastOpener = null;

  function shuffle() {
    // Fisher–Yates: a different order on each visit and button press.
    for (let i = cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    const fragment = document.createDocumentFragment();
    cards.forEach(card => fragment.appendChild(card));
    grid.appendChild(fragment);
  }

  function show(number) {
    if (!cards.length) return;
    index = (number + cards.length) % cards.length;
    const photo = cards[index].querySelector("img");
    image.src = cards[index].href;
    image.alt = photo ? photo.alt : "Portfolio photograph";
    count.textContent = (index + 1) + " / " + cards.length;
  }

  function close() {
    if (dialog.open) dialog.close();
    image.removeAttribute("src");
    if (lastOpener) lastOpener.focus();
  }

  cards.forEach(card => card.addEventListener("click", event => {
    if (typeof dialog.showModal !== "function") return; // A normal image link works as fallback.
    event.preventDefault();
    lastOpener = card;
    show(cards.indexOf(card));
    dialog.showModal();
  }));

  shuffle();
  if (shuffleButton) shuffleButton.addEventListener("click", shuffle);
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", close);
  dialog.querySelector("[data-lightbox-previous]").addEventListener("click", () => show(index - 1));
  dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => show(index + 1));
  dialog.addEventListener("click", event => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(index - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(index + 1); }
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    if (lastOpener) lastOpener.focus();
  });
})();
