(()=>{"use strict";let e=[];function t(){return e}function n(t){e=t}const a=e=>{const[t,n,a]=e.split("/").map(Number);return new Date(a,n-1,t)};let c=[];function s(e){const t={title:e,tasks:[]};c.push(t)}function i(e){const t=c.map((e=>e.title.trim().toLowerCase())).indexOf(e.trim().toLowerCase());-1!==t?c.splice(t,1):alert("Project not found.")}function o(){return c}function l(e){return c.find((t=>t.title===e))}function d(e){console.log(e.completed),e.completed=!e.completed,console.log(e.completed)}function r(e,t){const n=t.tasks.map((e=>e.title.trim().toLowerCase())).indexOf(e.trim().toLowerCase());-1!==n?t.tasks.splice(n,1):alert("Task not found.")}function m(){return o().flatMap((e=>e.tasks))}let u=[];function v(){return u}const p=e=>`${String(e.getDate()).padStart(2,"0")}/${String(e.getMonth()+1).padStart(2,"0")}/${e.getFullYear()}`,g=e=>{const[t,n,a]=e.split("/").map(Number);return new Date(a,n-1,t)},f=()=>{const e=new Date;return p(e)};function E(e){const t=(e=>{switch(e){case"Today":return"today";case"This Week":return"week";case"This Month":return"month";case"Overdue":return"overdue";case"All Tasks":return"all";default:return"project"}})(e);switch(t){case"project":(e=>{const t=l(e);u=t.tasks,n(u)})(e);break;case"today":(()=>{const e=m(),t=f();u=e.filter((e=>e.dueDate===t)),n(u)})();break;case"week":(()=>{const e=m(),{start:t,end:a}=(()=>{const e=new Date,t=e.getDate()-e.getDay(),n=new Date(e.setDate(t)),a=new Date(e.setDate(t+6));return{start:p(n),end:p(a)}})();u=e.filter((e=>e.dueDate>=t&&e.dueDate<=a)),n(u)})();break;case"month":(()=>{const e=m();let{start:t,end:a}=(()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),n=new Date(e.getFullYear(),e.getMonth()+1,0);return{start:p(t),end:p(n)}})();t=g(t),a=g(a),u=e.filter((e=>{const n=g(e.dueDate);return n>=t&&n<=a})),n(u)})();break;case"overdue":(()=>{const e=m(),t=f();u=e.filter((e=>e.dueDate<t&&!e.completed)),n(u)})();break;case"all":u=m(),n(u);break;default:return}}function L(){const e=o();localStorage.setItem("projects",JSON.stringify(e))}let k={status:!1,oldTitle:""};function y(e,t){k.status=e,k.oldTitle=t}let B={status:!1,oldTitle:"",projectTitle:""};function h(e,t,n){B.status=e,B.oldTitle=t,B.projectTitle=n}function T(){return B}const D=document.getElementById("menuBtn"),I=document.getElementById("menuBar"),C=document.getElementById("closeBtn"),N=document.getElementById("blackBackground"),b=document.getElementById("addTaskBtn"),w=document.getElementById("formContainer"),j=document.getElementById("addTaskForm"),M=document.getElementById("taskPriority"),x=document.getElementById("selected"),P=document.getElementById("dropDown"),$=P.getElementsByClassName("option"),S=document.getElementById("addProjectBtn"),H=document.getElementById("addProjectForm"),F=document.getElementsByClassName("cancelBtn"),O=document.getElementsByClassName("confirmBtn"),A=document.getElementsByClassName("filter"),Y=document.getElementById("sortingInput"),W=document.getElementById("orderBtn"),J=document.getElementById("arrow"),U=document.getElementById("sortBtn"),q=document.getElementById("heading"),z=()=>{D.addEventListener("click",(()=>{I.classList.toggle("active"),N.classList.toggle("active")})),C.addEventListener("click",(()=>{I.classList.remove("active"),N.classList.remove("active")})),N.addEventListener("click",(()=>{I.classList.remove("active"),N.classList.remove("active")}))},G=()=>{b.addEventListener("click",(()=>{const e=O[1];h(!1,"",""),ee("","","","Medium"),e.innerText="Add Task",te()})),x.addEventListener("click",(()=>{P.classList.toggle("active")}));for(let e=0;e<$.length;e++)$[e].addEventListener("click",(()=>{M.value=$[e].innerText,ne($[e].innerText),P.classList.remove("active")}));w.addEventListener("click",(()=>{w.classList.remove("active"),j.classList.remove("active"),H.classList.remove("active")})),F[1].addEventListener("click",(()=>{w.classList.remove("active"),j.classList.remove("active")})),j.addEventListener("click",(e=>{e.stopPropagation()})),j.addEventListener("submit",(e=>{e.preventDefault(),function(){const e=document.getElementById("taskTitle").value,t=document.getElementById("taskDescription").value,n=document.getElementById("taskDueDate").value,a=document.getElementById("taskPriority").value,c=l(document.getElementById("projectSelect").value);!1===B.status?function(e,t,n,a,c){const s={title:e,description:t,dueDate:n,priority:a,completed:!1,project:c.title};c.tasks.push(s)}(e,t,n,a,c):function(e,t,n,a,c,s){const i=function(e,t){return t.tasks.find((t=>t.title===e))}(e,t);i?(i.title=n||i.title,i.description=a||i.description,i.dueDate=c||i.dueDate,i.priority=s||i.priority):alert("Task not found.")}(B.oldTitle,c,e,t,n,a),L(),ce()}(),w.classList.remove("active"),j.classList.remove("active")}))},K=()=>{S.addEventListener("click",(()=>{const e=O[0];_(""),e.innerText="Add Project",y(!1,"")})),F[0].addEventListener("click",(()=>{w.classList.remove("active"),H.classList.remove("active")})),H.addEventListener("click",(e=>{e.stopPropagation()})),H.addEventListener("submit",(e=>{e.preventDefault(),function(){const e=document.getElementById("projectTitle").value.trim();!1===k.status?s(e):function(e,t){l(e).title=t}(k.oldTitle,e),L(),Z(),ce()}(),w.classList.remove("active"),H.classList.remove("active")}))},Q=()=>{A[0].addEventListener("click",(e=>{e.preventDefault(),E("Today"),ae("Today",v()),X(),R(e.target.parentNode),I.classList.remove("active"),N.classList.remove("active")})),A[1].addEventListener("click",(e=>{e.preventDefault(),E("This Week"),ae("This Week",v()),X(),R(e.target.parentNode),I.classList.remove("active"),N.classList.remove("active")})),A[2].addEventListener("click",(e=>{e.preventDefault(),E("This Month"),ae("This Month",v()),X(),R(e.target.parentNode),I.classList.remove("active"),N.classList.remove("active")})),A[3].addEventListener("click",(e=>{e.preventDefault(),E("Overdue"),ae("Overdue",v()),X(),R(e.target.parentNode),I.classList.remove("active"),N.classList.remove("active")})),A[4].addEventListener("click",(e=>{e.preventDefault(),E("All Tasks"),ae("All Tasks",v()),X(),R(e.target.parentNode),I.classList.remove("active"),N.classList.remove("active")}))};function R(e){for(let t=0;t<A.length;t++)A[t]===e?A[t].classList.add("active"):A[t].classList.remove("active")}const V=()=>{Y.addEventListener("change",(()=>{U.click()})),W.addEventListener("click",(()=>{J.classList.contains("fa-chevron-down")?(J.classList.replace("fa-chevron-down","fa-chevron-up"),W.value="asc"):(J.classList.replace("fa-chevron-up","fa-chevron-down"),W.value="desc"),U.click()})),U.addEventListener("click",(()=>{const n=Y.value,c=W.value,s=q.innerText;!function(t,n){"Default"==t?(e=v(),e="asc"===n?e:e.reverse()):e.sort(((e,c)=>{let s=0;switch(t){case"Name":i=e.title,o=c.title,s=i.localeCompare(o,void 0,{sensitivity:"base"});break;case"Date":s=((e,t)=>a(e)-a(t))(e.dueDate,c.dueDate);break;case"Priority":s=((e,t)=>{const n={High:1,Medium:2,Low:3};return n[e.priority]-n[t.priority]})(e,c);break;case"Status":s=e.completed-c.completed;break;default:return 0}var i,o;return"asc"===n?-s:s}))}(n,c),ae(s,t())}))};function X(){Y.value="Default",J.classList.replace("fa-chevron-up","fa-chevron-down"),W.value="desc"}function Z(){const e=o(),n=document.getElementById("projectsList"),a=document.getElementById("menuBar"),c=document.getElementById("blackBackground");n.replaceChildren();for(let s=0;s<e.length;s++){const o=e[s].title,l=document.createElement("li");l.className="filter";const d=document.createElement("a");d.innerHTML=`<i class="fa-solid fa-bars-progress"></i> ${o}`,d.addEventListener("click",(e=>{e.preventDefault(),R(e.target.parentNode),E(o);const n=t();ae(o,n),a.classList.remove("active"),c.classList.remove("active")})),l.appendChild(d);const r=document.createElement("button");r.className="editBtn",r.innerHTML='<i class="fa-solid fa-pen-to-square"></i>',r.addEventListener("click",(()=>{const e=document.getElementsByClassName("confirmBtn")[0];y(!0,o),_(o),e.innerText="Update Project"})),l.appendChild(r);const m=document.createElement("button");m.className="deleteBtn",m.innerHTML='<i class="fa-solid fa-trash"></i>',m.addEventListener("click",(()=>{const e=document.getElementById("defaultActiveLink");i(o),Z(),R(e),E("Today"),ae("Today",t()),X()})),l.appendChild(m),n.appendChild(l)}}function _(e){const t=document.getElementById("formContainer"),n=document.getElementById("addProjectForm");document.getElementById("projectTitle").value=e,t.classList.add("active"),n.classList.add("active")}function ee(e,t,n,a){const c=document.getElementById("formContainer"),s=document.getElementById("addTaskForm"),i=document.getElementById("taskTitle"),o=document.getElementById("taskDescription"),l=document.getElementById("taskDueDate"),d=document.getElementById("taskPriority");i.value=e,o.value=t,l.value=n,d.value=a,ne(a),c.classList.add("active"),s.classList.add("active")}function te(){const e=o(),t=document.getElementById("projectSelect"),n=T(),a=n.status,c=n.projectTitle;if(!1===a){t.replaceChildren(),t.innerHTML='<option value="" disabled selected hidden>Select Project</option>';for(let n=0;n<e.length;n++)t.innerHTML+=`<option value="${e[n].title}">${e[n].title}</option>`}else t.replaceChildren(),t.innerHTML=`<option value="${c}" selected>${c}</option>`}function ne(e){const t=document.getElementById("selected");t.replaceChildren(),t.innerHTML=`<div class="flag ${e}"></div> ${e}`}function ae(e,t=[]){document.getElementById("heading").innerText=e,document.getElementById("tasksCounter").innerHTML=`<i class="fa-solid fa-check"></i> ${t.length} ${1===t.length?"task":"tasks"}`;const n=document.getElementById("content");n.replaceChildren();for(let e=0;e<t.length;e++){const a=t[e],c=document.createElement("li");a.completed?c.classList.add("task","checked"):c.classList.add("task");const s=document.createElement("div");s.className="basicInfos";const i=document.createElement("button");i.className="checkBtn",i.innerHTML='<i class="fa-solid fa-circle-check"></i>',i.addEventListener("click",(()=>{d(a),L(),ce()})),s.appendChild(i);const o=document.createElement("h3");o.innerText=a.title,s.appendChild(o),c.appendChild(s);const m=document.createElement("div");m.className="moreInfos";const u=document.createElement("p");u.className="description",u.innerText=a.description,m.appendChild(u);const v=document.createElement("div");v.className="priority",v.innerHTML=`<div class="flag ${a.priority}"></div> <span>${a.priority}</span>`,m.appendChild(v);const p=document.createElement("span");p.className="date",p.innerText=a.dueDate,m.appendChild(p);const g=document.createElement("div");g.className="taskButtons";const f=document.createElement("button");f.className="editTaskBtn",f.innerText="Edit",f.addEventListener("click",(()=>{const e=document.getElementsByClassName("confirmBtn")[1];h(!0,a.title,a.project),ee(a.title,a.description,a.dueDate,a.priority),te(),e.innerText="Update Task"})),g.appendChild(f);const E=document.createElement("button");E.className="deleteTaskBtn",E.innerText="Delete",E.addEventListener("click",(()=>{const e=l(a.project);r(a.title,e),L(),ce()})),g.appendChild(E),m.appendChild(g),c.appendChild(m),n.appendChild(c)}}function ce(){const e=document.getElementById("heading").innerText;E(e),ae(e,t()),X()}const se=document.getElementById("taskDueDate");var ie;flatpickr(se,{dateFormat:"d/m/Y",minDate:"today"}),ie=JSON.parse(localStorage.getItem("projects"))||[],c=ie,n([]),0==o().length&&s("My Project"),Z(),E("Today"),ae("Today",t()),z(),G(),K(),Q(),V()})();