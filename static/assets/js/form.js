const API="https://formoid.net/api/push",keys={index:"<KEY>"},isDebug=!0;class FormService{constructor(){this.form=document.querySelector(".form"),this.inputs=this.form.querySelectorAll('input:not([id="agreement"]), textarea'),this.button=this.form.querySelector("button")}setup(){this.form.addEventListener("submit",(async t=>{t.preventDefault();const e=document.body.getAttribute("lang");let s=document.body.getAttribute("page").slice(0,-5);s=""===s?"index":s;const i={email:keys[s]??keys.index,form:{title:"Form Data",data:[["page",s],["language",e]]}};this.inputs.forEach((t=>i.form.data.push([t.name,t.value]))),this.sendRequest(i)}))}sendRequest(t){this.sendNotification("success")}sendNotification(t){this.form.querySelectorAll(".notification").forEach((e=>{e.classList.contains(t)&&(e.classList.add("show"),this.button.disabled=!0,setTimeout((()=>{e.classList.remove("show"),this.button.disabled=!1}),3e3))}))}}const formService=new FormService;formService.setup();