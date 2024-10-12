import{_ as c,u as h,i as l,r as d,o as g,c as p,a as r,z as a,j as b}from"./index-xoV0-Lal.js";import{Q as f,s as x}from"./shuffleArray-DvT5pwC-.js";const y={name:"TestsQuestions",components:{Question:f},data(){return{test:[],question:{},currentPage:1,totalPages:1,remainingTime:JSON.parse(localStorage.getItem("remainingTime"))||30*60,timer:null,toast:h()}},mounted(){this.getTest(),this.$store.dispatch("clearAnswers"),this.startTimer()},methods:{getTest(){l.get(`/tests/${this.$route.params.id}`,{headers:{Authorization:`Bearer ${this.$store.state.token}`}}).then(e=>{const s=e.data.map(i=>(Object.keys(i).forEach(t=>{i[t]===null&&delete i[t]}),i));this.test=x(s),this.totalPages=this.test.length,this.question=this.test[0]}).catch(e=>{e.response&&e.response.status===401&&(this.toast.error("خطأ: غير مصرح به"),this.$store.commit("logout"),this.$router.push("/login"))})},ChangeQuestion(e){this.currentPage=e,this.question=this.test[this.currentPage-1]},startTimer(){this.timer=setInterval(()=>{this.remainingTime>0?(this.remainingTime--,localStorage.setItem("remainingTime",this.remainingTime)):(localStorage.removeItem("remainingTime"),this.submitAnswers())},1e3)},submitAnswers(){l.post(`/tests/${this.$route.params.id}`,this.$store.state.answers,{headers:{Authorization:`Bearer ${this.$store.state.token}`,"Content-Type":"application/json"}}).then(e=>{const s=e.data.message;clearInterval(this.timer),this.toast.success(s),this.$router.push("/dashboard")}).catch(e=>{console.log(e),e.response&&e.response.status===401?(this.toast.error("خطأ: غير مصرح به"),this.$store.commit("logout"),this.$router.push("/login")):this.toast.error(e.response.error)})},formatTimer(){return parseInt(this.remainingTime/60)}},watch:{currentPage(e){this.ChangeQuestion(e)}},beforeUnmount(){clearInterval(this.timer)}},_={class:"w-full flex justify-center items-center flex-col gap-10"},w={class:"questions w-full px-4 flex flex-col gap-4 items-center justify-center max-w-3xl"},v={class:"text-lg font-bold text-primary"},T={class:"buttons flex flex-col gap-4 mt-10 w-full justify-center items-center"},P={class:"flex gap-4"},Q=["disabled"],k={class:"current-page p-2 rounded-md bg-primary text-white"},A=["disabled"];function C(e,s,i,u,t,o){const m=d("Question");return g(),p("div",_,[r("div",w,[r("p",v," الوقت المتبقي : "+a(o.formatTimer())+" دقائق ",1),b(m,{question:t.question,index:t.currentPage},null,8,["question","index"])]),r("div",T,[r("div",P,[r("button",{class:"btn btn-primary border border-primary rounded-md p-2 hover:bg-primary hover:text-white duration-300 disabled:cursor-not-allowed disabled:opacity-50",onClick:s[0]||(s[0]=n=>o.ChangeQuestion(t.currentPage+1)),disabled:t.currentPage===t.totalPages}," التالي ",8,Q),r("div",k,a(t.currentPage)+" / "+a(t.totalPages),1),r("button",{class:"btn btn-primary border border-primary rounded-md p-2 hover:bg-primary hover:text-white duration-300 disabled:cursor-not-allowed disabled:opacity-50",onClick:s[1]||(s[1]=n=>o.ChangeQuestion(t.currentPage-1)),disabled:t.currentPage===1}," السابق ",8,A)]),r("button",{onClick:s[2]||(s[2]=(...n)=>o.submitAnswers&&o.submitAnswers(...n)),class:"btn btn-primary border bg-primary text-white rounded-md p-2 hover:bg-white hover:text-primary hover:border-primary duration-300 w-48"}," إرسال الاجابات ")])])}const j=c(y,[["render",C]]);export{j as default};