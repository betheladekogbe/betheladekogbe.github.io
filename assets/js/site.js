(function () {
  "use strict";
  const desktop = document.getElementById("portfolio-desktop");
  if (!desktop) return;
  const win = desktop.querySelector("#desktop-window");
  const title = desktop.querySelector("#desktop-window-title");
  const triggers = [...desktop.querySelectorAll("[data-open-panel]")];
  const panels = [...desktop.querySelectorAll("[data-panel-content]")];
  const close = desktop.querySelector("[data-close-panel]");
  const labels = {welcome:"Welcome",work:"Projects",about:"About Me",journal:"Journal",contact:"Contact"};
  let lastTrigger = null;
  function openPanel(name, focusWindow) {
    if (!Object.prototype.hasOwnProperty.call(labels,name)) return;
    win.hidden = false;
    title.textContent = labels[name];
    panels.forEach(panel => {panel.hidden = panel.dataset.panelContent !== name;});
    triggers.forEach(link => {
      const active = link.dataset.openPanel === name;
      link.setAttribute("aria-expanded",String(active));
      if (active) link.setAttribute("aria-current","true");
      else link.removeAttribute("aria-current");
    });
    if (focusWindow) win.focus({preventScroll:true});
  }
  triggers.forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    lastTrigger = link;
    openPanel(link.dataset.openPanel,true);
  }));
  close.addEventListener("click", () => {
    win.hidden = true;
    triggers.forEach(link => {link.setAttribute("aria-expanded","false");link.removeAttribute("aria-current");});
    if (lastTrigger) lastTrigger.focus({preventScroll:true});
  });
  desktop.addEventListener("keydown", event => {
    if (event.key === "Escape" && !win.hidden) {
      event.preventDefault();
      close.click();
    }
  });
  openPanel("welcome",false);
})();
