import{d as _,r,a as f,b as v,o as p,c as x,e,w as u,v as i,u as c,i as m,f as w,F as h,g as b}from"./index.9de64b22.js";const y=_("admin",()=>{const a=r(!1);function n(){return a.value}function t(s){console.log(s)}return{isLoggedIn:n,login:t}}),B=e("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"},null,-1),C={class:"flex flex-col w-[100vw] h-[100vh] justify-center items-center"},F={class:"bg-gray-100 rounded-md shadow-md shadow-black border-t-[1px] relative"},k=e("div",{class:"absolute z-10 bg-yellow-200 shadow-md shadow-yellow-700 top-[-17%] left-0 right-0 w-[120px] h-[120px] rounded-[100%] mx-auto text-center flex justify-center"},[e("div",{class:"leading-[120px] text-[60px]"},[e("i",{class:"fa-solid fa-user"})])],-1),j={class:"relative flex flex-col w-[70vw] h-auto px-6 md:w-[40vw]"},V=e("div",{class:"text-4xl text-center mt-16 mb-4"},"\u5F8C\u53F0\u767B\u5165",-1),A=e("div",{class:"text-center bg-gray-400 rounded-sm mt-4 leading-[10vh] h-[9vh] text-lg"},"\u5FD8\u8A18\u5BC6\u78BC?",-1),L=f({__name:"loginForm",setup(a){const n=y();let t=r(null),s=r(null);v(()=>{});function g(){let d={name:t.value,password:s.value};n.login(d)}return(d,o)=>(p(),x(h,null,[B,e("div",C,[e("div",F,[k,e("form",j,[V,u(e("input",{"onUpdate:modelValue":o[0]||(o[0]=l=>m(t)?t.value=l:t=l),class:"outline-none border-2 border-gray-300 w-full h-[40px] rounded-md px-2 mb-4",type:"text",placeholder:"\u5E33\u865F"},null,512),[[i,c(t)]]),u(e("input",{"onUpdate:modelValue":o[1]||(o[1]=l=>m(s)?s.value=l:s=l),class:"outline-none border-2 border-gray-300 w-full h-[40px] rounded-md px-2 mb-4",type:"password",placeholder:"\u5BC6\u78BC"},null,512),[[i,c(s)]]),e("button",{onClick:o[2]||(o[2]=w(l=>g(),["prevent"])),class:"outline-none hover:bg-slate-400 border-2 border-gray-300 bg-slate-600 text-white text-2xl w-full h-[7vh] rounded-md px-2 mt-10"},"\u767B\u5165")]),A])])],64))}}),M=e("div",{class:"fixed w-full h-full bg-gray-700 -z-50"},null,-1),z=f({__name:"Login",setup(a){return(n,t)=>(p(),x(h,null,[M,b(L)],64))}});export{z as default};
