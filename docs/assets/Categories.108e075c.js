import{d as _,o as l,c as d,b as t,t as f,r as h,u as v,a as g,l as y,x as w,F as k,E as C,s as x,e as i,L as S,B as F,p as B,q as A,k as E}from"./index.30555711.js";import{u as $}from"./category.88deb7b3.js";import{u as p,a as D}from"./global_modal.c75c4a17.js";import{_ as I}from"./_plugin-vue_export-helper.cdc0426e.js";const T={class:"odd:bg-gray-200 border-b-2 border-black hover:bg-gray-300"},R={class:"border-r-2 border-r-black text-center"},G={class:"border-r-2 border-r-black px-2"},L={class:"w-[20vw] text-xl mx-auto"},M={class:"flex justify-around"},N=t("button",{class:"my-2 text-teal-700 hover:scale-125 transition-all duration-100"},[t("i",{class:"fa-solid fa-pen-to-square"}),t("span",{class:"hidden sm:inline-block"},"\u7DE8\u8F2F")],-1),V=t("i",{class:"fa-solid fa-xmark"},null,-1),q=t("span",{class:"hidden sm:inline-block"},"\u522A\u9664",-1),j=[V,q],O=_({__name:"categoriesTableRow",props:["category","idx","store","data"],emits:["onRemoveEvent"],setup(a,{emit:o}){const e=p();function r(c){e.use_confirm(),e.set_content("\u662F\u5426\u78BA\u8A8D\u522A\u9664\u6B64\u7B46\u8CC7\u6599?"),e.set_confirm_btn_text("\u6C92\u932F!"),e.set_cancel_btn_text("\u6211\u518D\u60F3\u60F3.."),e.set_confirm_callback_fn(n,c),e.set_confirm_callback_type_async(),e.toggle()}async function n(c){await o("onRemoveEvent",c)}return(c,s)=>(l(),d("tr",T,[t("td",R,f(a.idx),1),t("td",G,f(a.category.name),1),t("td",L,[t("div",M,[N,t("button",{onClick:s[0]||(s[0]=m=>r(a.category.id)),class:"my-2 text-red-700 hover:scale-125 transition-all duration-100"},j)])])]))}}),z=a=>(B("data-v-5ce178ac"),a=a(),A(),a),H={class:"mt-4 mx-auto border-gray-100 border-2 p-4 w-[95vw] sm:w-[60vw]"},J=F('<div class="w-full mb-4 flex items-center relative" data-v-5ce178ac><div class="text-[6vw] sm:text-[3vw] font-extrabold ml-0 mx-auto" data-v-5ce178ac>\u5206\u985E\u5217\u8868</div><button class="absolute right-4 hover:animate-pulse hover:font-extrabold hover:text-green-600" data-v-5ce178ac><i class="fa-solid fa-magnifying-glass" data-v-5ce178ac></i></button><input class="w-[55vw] sm:w-auto h-[5vh] border-2 border-black rounded-full outline-none pl-4 my-2 text-xl focus:outline-4 focus:outline-offset-0 focus:outline-gray-400" type="text" placeholder="\u8F38\u5165\u95DC\u9375\u5B57..." data-v-5ce178ac></div>',1),K={class:"table-auto w-full border-[1px] border-gray-400"},P=z(()=>t("thead",{class:"text-2xl text-center font-extrabold border-b-4 border-b-black"},[t("th",{class:"w-10"},"#"),t("th",{class:"border-black border-x-2"},"\u5206\u985E\u540D\u7A31"),t("th")],-1)),Q={class:"text-xl"},U=_({__name:"categoriesTable",setup(a){let o=h(null);v();const e=$(),r=p(),n=D();g(async()=>{window.scrollTo({top:0,behavior:"smooth"}),n.start_loading();let s=await e.all();s.error||(o.value=s),n.stop_loading()});async function c(s){n.start_loading(),(await e.destroy({id:s})).error||(o.value=o.value.filter(u=>u.id!==s)),n.stop_loading(),r.hide(),r.use_alert(),r.set_content("\u8CC7\u6599\u5DF2\u6210\u529F\u522A\u9664"),r.show()}return(s,m)=>(l(),d("div",H,[J,t("table",K,[P,t("tbody",Q,[y(S,{name:"fade"},{default:w(()=>[(l(!0),d(k,null,C(i(o),(u,b)=>(l(),x(O,{key:b,category:u,idx:b+1,store:i(e),data:i(o),onOnRemoveEvent:c},null,8,["category","idx","store","data"]))),128))]),_:1})])])]))}});const W=I(U,[["__scopeId","data-v-5ce178ac"]]),et=_({__name:"Categories",setup(a){const o=v();return E(async()=>{await o.validataAdminState()}),(e,r)=>(l(),x(W))}});export{et as default};
