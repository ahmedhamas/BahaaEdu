import{_ as C,s as y,N as k,p as v,l as B,m as V,q as N,t as $,x as z,u as A,i as _,r as l,o as i,c as p,a as c,j as s,b as g,w as a,d as L,e as n,F as R,y as j,z as b}from"./index-xoV0-Lal.js";import{C as H}from"./Card-CRavKj_2.js";const S={name:"Tests",components:{Card:H,FwbPagination:y,FwbA:k,FwbTable:v,FwbTableBody:B,FwbTableCell:V,FwbTableHead:N,FwbTableHeadCell:$,FwbTableRow:z},data(){return{tests:[],limit:30,currentPage:1,totalPages:1,toast:A(),results:[]}},mounted(){this.getTests(),this.latestResults()},methods:{getTests(){_.get(`/tests/all/${this.limit*this.currentPage}`,{headers:{Authorization:`Bearer ${this.$store.state.token}`}}).then(t=>{this.tests=t.data,this.totalPages=Math.ceil(t.data.length/this.limit)}).catch(t=>{t.response&&t.response.status===401&&(this.toast.error("خطأ: غير مصرح به"),this.$store.commit("logout"),this.$router.push("/login"))})},latestResults(){_.get("/tests/results",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(t=>{this.results=t.data}).catch(t=>{t.response&&t.response.status===401&&(this.toast.error("خطأ: غير مصرح به"),this.$store.commit("logout"),this.$router.push("/login"))})}}},q={class:"w-full grid place-items-center"},D={class:"tests mt-10 max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col gap-5"},E={class:"tests grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"},I={class:"page-navigation w-full flex justify-center"};function M(t,e,U,G,o,m){const f=l("Card"),h=l("FwbPagination"),d=l("fwb-table-head-cell"),w=l("fwb-table-head"),u=l("fwb-table-cell"),x=l("fwb-table-row"),T=l("fwb-table-body"),F=l("fwb-table");return i(),p("main",q,[c("div",D,[e[4]||(e[4]=c("h2",{class:"text-xl font-bold mb-4"},"الاختبارات",-1)),c("div",E,[s(f,{data:o.tests},null,8,["data"])]),c("div",I,[s(h,{dir:"ltr",class:"mt-4 mx-auto",modelValue:o.currentPage,"onUpdate:modelValue":e[0]||(e[0]=r=>o.currentPage=r),"total-pages":o.totalPages,onPageChange:m.getTests,nextLabel:"التالي",previousLabel:"السابق"},null,8,["modelValue","total-pages","onPageChange"])]),o.results.length>0?(i(),g(F,{key:0},{default:a(()=>[s(w,null,{default:a(()=>[s(d,{class:"text-start"},{default:a(()=>e[1]||(e[1]=[n("رقم الاختبار")])),_:1}),s(d,{class:"text-start"},{default:a(()=>e[2]||(e[2]=[n("العنوان")])),_:1}),s(d,{class:"text-start"},{default:a(()=>e[3]||(e[3]=[n("النتيجة")])),_:1})]),_:1}),s(T,null,{default:a(()=>[(i(!0),p(R,null,j(o.results,(r,P)=>(i(),g(x,{key:r.id},{default:a(()=>[s(u,{class:"text-start"},{default:a(()=>[n(b(P+1),1)]),_:2},1024),s(u,{class:"text-start"},{default:a(()=>[n(b(r.test_name),1)]),_:2},1024),s(u,{class:"text-start"},{default:a(()=>[n(b(r.result),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})):L("",!0)])])}const O=C(S,[["render",M]]);export{O as default};