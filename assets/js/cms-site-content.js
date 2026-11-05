// Render editable content from _data/site_content.json without changing page layouts.
(()=> {
  "use strict";
  const d=window.SWITCH_CMS_SITE;
  if(!d)return;
  const q=(selector,scope=document)=>scope.querySelector(selector);
  const qa=(selector,scope=document)=>Array.from(scope.querySelectorAll(selector));
  const set=(element,value)=>{if(element&&value!==undefined&&value!==null)element.textContent=String(value)};
  const picture=(element,path)=>{
    if(element&&path){element.removeAttribute("data-image-key");element.src=path}
  };
  const paragraph=(text)=>{const p=document.createElement("p");p.textContent=text;return p};
  // Home navigation tiles: retain Switch iconography and button behavior.
  for(const item of d.home?.tiles||[]){
    const tile=qa(".home-tile").find(e=>e.dataset.home===item.page);
    if(!tile)continue;
    set(q(".tile-title span",tile),item.title);
    set(q(".tile-descriptor",tile),item.description);
    picture(q(".tile-art img",tile),item.image);
  }
  // About page.
  if(d.about){
    const a=q("#screen-about"), hero=q(".about-hero",a);
    set(q(".eyebrow",hero),d.about.eyebrow);
    set(q("h2",hero),d.about.heading);
    const intro=q(".about-hero > div:first-child",a);
    const existing=qa("p",intro),texts=d.about.intro||[];
    for(let i=0;i<Math.max(existing.length,texts.length);i++){
      if(i<texts.length){const node=existing[i]||paragraph("");if(!existing[i])intro.appendChild(node);set(node,texts[i])}
      else existing[i].remove();
    }
    picture(q(".about-portrait",a),d.about.portrait);
    set(q(".about-footer > span",a),d.about.location);
    const blockContainers=qa(".about-blocks",a);
    let k=0;
    for(const container of blockContainers){
      for(const block of qa(".about-block",container)){
        const item=(d.about.blocks||[])[k++];
        if(item){set(q("h3",block),item.title);set(q("p",block),item.text)}
        else block.remove();
      }
    }
  }
  // Resume: update live articles and allow adding/removing entries within each section.
  if(d.resume){
    const r=q("#screen-resume"),head=q(".resume-headline-copy",r);
    set(q(".resume-overline",head),d.resume.eyebrow);
    set(q("h2",head),d.resume.heading);
    set(q("p",head),d.resume.description);
    const tags=q(".resume-tags",r);
    if(tags&&Array.isArray(d.resume.tags))tags.replaceChildren(...d.resume.tags.map(value=>{const span=document.createElement("span");span.textContent=value;return span}));
    for(const link of qa(".resume-download-action,.resume-page-end a",r))if(d.resume.pdf)link.href=d.resume.pdf;
    const sections=[
      {container:q(".resume-entry-list",r),items:(d.resume.entries||[]).filter(x=>!x.extra),extra:false},
      {container:q(".resume-additional-list",r),items:(d.resume.entries||[]).filter(x=>x.extra),extra:true}
    ];
    for(const section of sections){
      if(!section.container)continue;
      const existing=qa("article.resume-entry",section.container);
      const template=existing[0];
      section.items.forEach((item,i)=>{
        const article=existing[i]||(template?template.cloneNode(true):null);
        if(!article)return;
        if(!existing[i])section.container.appendChild(article);
        article.classList.toggle("resume-extra-entry",section.extra);
        set(q(".resume-entry-date",article),item.date);
        set(q(".resume-entry-copy h3",article),item.title);
        set(q(".resume-employer",article),item.employer);
        const list=q(".resume-job-highlights",article);
        if(list&&Array.isArray(item.highlights))list.replaceChildren(...item.highlights.map(value=>{const li=document.createElement("li");li.textContent=value;return li}));
        picture(q(".resume-job-image",article),item.image);
      });
      existing.slice(section.items.length).forEach(el=>el.remove());
    }
    const edu=q(".resume-education-grid",r);
    if(edu){
      const existing=qa(".resume-feature-entry",edu),template=existing[0],items=d.resume.education||[];
      items.forEach((item,i)=>{
        const article=existing[i]||(template?template.cloneNode(true):null);
        if(!article)return;
        if(!existing[i])edu.appendChild(article);
        set(q("small",article),item.category);
        set(q("h3",article),item.title);
        qa("p",article).forEach(p=>p.remove());
        for(const line of item.lines||[])article.appendChild(paragraph(line));
      });
      existing.slice(items.length).forEach(el=>el.remove());
    }
  }
  // Contact modal, email links and display text. Keep the copy button behavior
  // synchronized via the site script's central email reference.
  if(d.contact){
    const c=q("#contact-overlay");
    set(q("#contact-title",c),d.contact.heading);
    set(q(".modal-msg > p:not(.notice)",c),d.contact.message);
    set(q("#copy-feedback",c),d.contact.email);
    if(d.contact.email){
      for(const a of qa('a[href^="mailto:"]'))a.href="mailto:"+d.contact.email;
    }
  }
})();
