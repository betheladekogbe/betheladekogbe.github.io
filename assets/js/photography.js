(function () {
  "use strict";
  const grid = document.getElementById("photography-gallery");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll("[data-photo-card]"));
  const buttons = Array.from(document.querySelectorAll("[data-photo-filter]"));
  const dialog = document.getElementById("photography-lightbox");
  const image = document.getElementById("photography-lightbox-image");
  const count = document.getElementById("photography-lightbox-count");
  const lightboxEditBadge = document.getElementById("photography-lightbox-edit-badge");
  const showing = document.getElementById("photography-showing");
  const shuffleButton = document.getElementById("photography-reshuffle");
  let shuffled = cards.slice();
  let visible = cards.slice();
  let index = 0;
  let lastOpener = null;

  function shuffle() {
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const fragment = document.createDocumentFragment();
    shuffled.forEach(card => fragment.appendChild(card));
    grid.appendChild(fragment);
    const selected = buttons.find(button => button.getAttribute("aria-pressed") === "true");
    filter(selected ? selected.dataset.photoFilter : "all");
  }

  // Broader gallery filters preserve existing fine-grained categories on every image.
  const filterGroups = {
    "portraits": ["portraits"],
    "events-outdoors": ["events", "concerts", "outdoors"],
    "behind-the-scenes": ["behind-the-scenes"],
    "edit-only": ["edit-only"]
  };

  function matchesFilter(card, category) {
    if (category === "all") return true;
    const categories = (card.dataset.categories || "").split(" ");
    return (filterGroups[category] || []).some(tag => categories.includes(tag));
  }

  function filter(category) {
    visible = shuffled.filter(card => matchesFilter(card, category));
    shuffled.forEach(card => { card.hidden = !visible.includes(card); });
    buttons.forEach(button => {
      const active = button.dataset.photoFilter === category;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
    showing.textContent = visible.length + " " + (visible.length === 1 ? "photograph" : "photographs");
  }

  function show(number) {
    if (!visible.length) return;
    index = (number + visible.length) % visible.length;
    const card = visible[index];
    image.src = card.href;
    const img = card.querySelector("img");
    image.alt = img ? img.alt : "Portfolio photograph";
    count.textContent = (index + 1) + " / " + visible.length;
    if (lightboxEditBadge) lightboxEditBadge.hidden = card.dataset.editOnly !== "true";
  }

  function close() { if (dialog.open) dialog.close(); }

  cards.forEach(card => card.addEventListener("click", event => {
    if (typeof dialog.showModal !== "function") return;
    event.preventDefault();
    lastOpener = card;
    show(visible.indexOf(card));
    dialog.showModal();
  }));

  // Selecting an already-active filter clears it and restores the full gallery.
  buttons.forEach(button => button.addEventListener("click", () => {
    const category = button.getAttribute("aria-pressed") === "true" ? "all" : button.dataset.photoFilter;
    filter(category);
  }));
  document.querySelectorAll("[data-filter-count]").forEach(span => {
    const kind = span.dataset.filterCount;
    const total = cards.filter(card => matchesFilter(card, kind)).length;
    span.textContent = "(" + total + ")";
    if (kind === "edit-only") {
      const button = span.closest("[data-photo-filter]");
      if (button) button.hidden = total === 0;
    }
  });

  shuffle();
  if (shuffleButton) shuffleButton.addEventListener("click", shuffle);
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", close);
  dialog.querySelector("[data-lightbox-previous]").addEventListener("click", () => show(index - 1));
  dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => show(index + 1));
  dialog.addEventListener("click", event => { if (event.target === dialog) close(); });
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(index - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(index + 1); }
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    if (lastOpener) lastOpener.focus();
  });
})();