(function(t){function e(e){for(var a,s,r=e[0],l=e[1],c=e[2],d=0,v=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&v.push(o[s][0]),o[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(v.length)v.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(a=!1)}a&&(i.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},o={app:0},i=[];function s(t){return r.p+"js/"+({}[t]||t)+"."+{"chunk-2d0d2ac9":"6acb2eb0","chunk-2d0d6ae6":"9c88db74"}[t]+".js"}function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise((function(e,a){n=o[t]=[e,a]}));e.push(n[2]=a);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=s(t);var c=new Error;i=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,n[1](c)}o[t]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(e)},r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"147f":function(t,e,n){"use strict";n("a30c")},"1d76":function(t,e,n){t.exports=n.p+"img/unnamed.bfa072b8.png"},"1ea5":function(t,e,n){},"291d":function(t,e,n){"use strict";n("8aeb")},"2dfb":function(t,e,n){},"3d93":function(t,e,n){"use strict";n("2dfb")},"3dfd":function(t,e,n){"use strict";n.d(e,"a",(function(){return qt}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[n("Topbar",{attrs:{leftButtons:[]}}),n("v-main",[n("Main")],1)],1)},o=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"mt-10"},[n("Topbar",{attrs:{leftButtons:t.appButtons}}),n("v-tabs",{attrs:{"icons-and-text":"","fixed-tabs":""}},[n("v-tabs-slider"),n("v-tab",{attrs:{href:"#jobs"}},[t._v(" Jobs "),n("v-icon",[t._v("mdi-hammer")])],1),n("v-tab",{attrs:{href:"#environment"}},[t._v(" Environment "),n("v-icon",[t._v("mdi-earth")])],1),n("v-tab-item",{attrs:{value:"jobs"}},[n("Jobs")],1),n("v-tab-item",{attrs:{value:"environment"}},[n("Environment")],1)],1)],1)},s=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app-bar",{staticClass:"mb-12",attrs:{app:"",dark:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"5"}},[a("h1",{staticClass:"d-flex align-center"},[t._v(" Cronos ")])]),a("v-col",{attrs:{cols:"2"}},[a("v-img",{staticClass:"logo-margin mx-auto",attrs:{height:"140px",width:"140px",src:n("1d76")}})],1),a("v-col",{attrs:{cols:"5"}},[a("v-row",{attrs:{align:"center",justify:"end"}},t._l(t.leftButtons,(function(e){return a("v-btn",{key:e.name,staticClass:"mx-1",attrs:{outlined:"",tile:"",color:e.color},on:{click:function(n){return n.stopPropagation(),t.openModal(e.modal)}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-"+t._s(e.icon))]),t._v(t._s(e.name))],1)})),1)],1)],1),a(t.modal,{tag:"component"})],1)},l=[],c=(n("d3b7"),{name:"Topbar",data:function(){return{modalFile:null,showDialog:!1}},props:{leftButtons:Array},computed:{modal:function(){var t=this;return this.modalFile?function(){return n("cc1e")("./".concat(t.modalFile))}:null}},methods:{openModal:function(t){this.modalFile=t,qt.$emit("openModal",!0)}}}),d=c,u=(n("d112"),n("2877")),v=n("6544"),b=n.n(v),f=n("40dc"),m=n("8336"),p=n("62ad"),h=n("132d"),k=n("adda"),x=n("0fd9"),_=Object(u["a"])(d,r,l,!1,null,null,null),g=_.exports;b()(_,{VAppBar:f["a"],VBtn:m["a"],VCol:p["a"],VIcon:h["a"],VImg:k["a"],VRow:x["a"]});var w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{staticClass:"text-center"},[n("v-col",{attrs:{cols:"12"}},[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.jobHeaders,items:t.jobs,"items-per-page":15},scopedSlots:t._u([{key:"item",fn:function(e){return[n("tr",[n("td",{attrs:{align:"start"}},[t._v(t._s(e.item.name))]),n("td",{attrs:{align:"start"}},[t._v(t._s(e.item.schedule))]),n("td",{attrs:{align:"start"}},[t._v(t._s(e.item.command))]),n("td",{attrs:{align:"start"}},[t._v(t._s(new Date(e.item.timestamp).toUTCString()))]),n("td",{attrs:{align:"end"}},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var o=a.on,i=a.attrs;return[n("v-btn",t._g(t._b({staticClass:"mx-1",attrs:{elevation:"2",icon:"","x-small":"",tile:"",color:"green"},on:{click:function(n){return t.onButtonClick(e.item)}}},"v-btn",i,!1),o),[n("v-icon",{attrs:{dark:""}},[t._v("mdi-play")])],1)]}}],null,!0)},[n("span",[t._v("Run now")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var o=a.on,i=a.attrs;return[n("v-btn",t._g(t._b({staticClass:"mx-1",attrs:{elevation:"2",icon:"",disabled:e.item.stopped,"x-small":"",tile:"",color:"yellow"},on:{click:function(n){return t.onButtonClick(e.item)}}},"v-btn",i,!1),o),[n("v-icon",{attrs:{dark:""}},[t._v("mdi-stop")])],1)]}}],null,!0)},[n("span",[t._v("Disable")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var o=a.on,i=a.attrs;return[n("v-btn",t._g(t._b({staticClass:"mx-1",attrs:{elevation:"2",icon:"","x-small":"",tile:"",color:"blue"},on:{click:function(n){return t.editJob(e.index,e.item)}}},"v-btn",i,!1),o),[n("v-icon",{attrs:{dark:""}},[t._v("mdi-pen")])],1)]}}],null,!0)},[n("span",[t._v("Edit")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var o=a.on,i=a.attrs;return[n("v-btn",t._g(t._b({staticClass:"mx-1",attrs:{elevation:"2",icon:"","x-small":"",tile:"",color:"red"},on:{click:function(n){return t.delJob(e.item)}}},"v-btn",i,!1),o),[n("v-icon",{attrs:{dark:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[n("span",[t._v("Delete")])])],1)])]}}])})],1),n("EditJob")],1)},j=[],J=(n("96cf"),n("1da1")),V=n("2b0e"),C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{staticClass:"mx-auto",attrs:{"max-width":"50%",persistent:""},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("Job",{attrs:{job:t.job},scopedSlots:t._u([{key:"actions",fn:function(){return[null!=t.job?n("div",[n("div",[t._v("Next execution in: "+t._s(t.job.schedule))]),t.isModified?n("div",[t._v("Not saved*")]):t._e()]):t._e(),n("v-spacer"),n("v-btn",{attrs:{disabled:!t.isModified,color:"success"},on:{click:t.saveJob}},[t._v("Save")]),n("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:t.close}},[t._v("Close")])]},proxy:!0}])}),n("AreYouSureToSave"),n("AreYouSureToDiscard")],1)},O=[],y=n("7b48"),E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return null!=t.modifiedJob?n("v-card",[n("v-list-item",{attrs:{id:"name"}},[n("v-list-item-icon",[n("v-icon",[t._v("mdi-calendar-check")])],1),n("v-list-item-subtitle",[n("v-text-field",{staticClass:"input-monospace",attrs:{name:"name",spellcheck:"false",disabled:!t.editable},model:{value:t.modifiedJob.name,callback:function(e){t.$set(t.modifiedJob,"name",e)},expression:"modifiedJob.name"}})],1)],1),n("v-list-item",{attrs:{id:"command"}},[n("v-list-item-icon",[n("v-icon",[t._v("mdi-console-line")])],1),n("v-list-item-subtitle",[n("v-text-field",{staticClass:"input-monospace",attrs:{name:"command",label:"Command",spellcheck:"false",value:t.job.command,disabled:!t.editable}})],1)],1),n("v-list-item",{attrs:{id:"schedule"}},[n("v-list-item-icon",[n("v-icon",[t._v("mdi-calendar-clock")])],1),n("v-list-item-subtitle",[n("v-text-field",{staticClass:"input-monospace",attrs:{name:"schedule",label:"Schedule",spellcheck:"false",value:t.job.schedule,disabled:!t.editable}})],1)],1),n("v-list-item",{attrs:{id:"mail"}},[n("v-list-item-icon",[n("v-icon",[t._v("mdi-email")])],1),n("Email",{attrs:{expanded:t.mailExpanded,editable:t.editable}})],1),n("v-list-item",{attrs:{id:"hooks"}},[n("v-list-item-icon",[n("v-icon",[t._v("mdi-hook")])],1),n("Hooks",{attrs:{hooks:t.job.hooks||[],expanded:t.hooksExpanded,editable:t.editable}})],1),n("v-card-actions",[t._t("actions")],2)],1):t._e()},S=[],$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{width:"100%"}},[n("v-expansion-panels",{attrs:{value:t.expanded?0:"",accordion:!1,tile:"",disabled:!t.editable}},[n("v-expansion-panel",[n("v-expansion-panel-header",[n("v-row",{attrs:{justify:"start"}},[n("v-col",{attrs:{md:"1"}},[n("v-switch",{staticClass:"little-switch",attrs:{value:t.mail,disabled:!t.editable}})],1),n("v-col",{attrs:{align:"start"}},[t.mail?n("span",[t._v("mail config")]):n("span",[t._v("No mail configured")])])],1)],1),n("v-expansion-panel-content",[n("v-text-field",{staticClass:"input-monospace",attrs:{name:"mail",label:"Mail",spellcheck:"false",value:"",disabled:!t.editable}})],1)],1)],1)],1)},H=[],T={props:{expanded:Boolean,editable:Boolean},data:function(){return{mail:null}}},B=T,M=(n("3d93"),n("b0af")),P=n("cd55"),D=n("49e2"),A=n("c865"),N=n("0393"),R=n("b73d"),I=n("8654"),L=Object(u["a"])(B,$,H,!1,null,"247e58e0",null),F=L.exports;b()(L,{VCard:M["a"],VCol:p["a"],VExpansionPanel:P["a"],VExpansionPanelContent:D["a"],VExpansionPanelHeader:A["a"],VExpansionPanels:N["a"],VRow:x["a"],VSwitch:R["a"],VTextField:I["a"]});var U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{width:"100%"}},[n("v-expansion-panels",{attrs:{value:t.expanded?0:"",accordion:!1,tile:"",disabled:!t.editable}},[n("v-expansion-panel",[n("v-expansion-panel-header",[t.editedHooks.length?n("span",[t._v(t._s(t.countOfEnabledHooks)+" enabled of "+t._s(t.countOfHooks)+" configured")]):n("span",[t._v("No hooks configured")])]),n("v-expansion-panel-content",[t._l(t.editedHooks,(function(e,a){return n("v-row",{key:a},[n("v-col",{attrs:{md:"1"}},[n("v-switch",{attrs:{disabled:!t.editable},model:{value:e.enabled,callback:function(n){t.$set(e,"enabled",n)},expression:"hook.enabled"}})],1),n("v-col",[n("v-text-field",{staticClass:"input-monospace",attrs:{name:"hookname",label:"Name",spellcheck:"false",autocomplete:"false",disabled:!t.editable},model:{value:e.name,callback:function(n){t.$set(e,"name",n)},expression:"hook.name"}})],1),n("v-col",[n("v-text-field",{staticClass:"input-monospace",attrs:{name:"command",label:"Command",spellcheck:"false",autocomplete:"false",disabled:!t.editable},model:{value:e.command,callback:function(n){t.$set(e,"command",n)},expression:"hook.command"}})],1),n("v-col",{attrs:{md:"1"}},[t.editable?n("v-btn",{attrs:{small:"",fab:""},on:{click:function(e){return t.delHook(a)}}},[n("v-icon",{attrs:{color:"red"}},[t._v("mdi-delete")])],1):t._e()],1)],1)})),n("v-row",[n("v-col",{attrs:{md:"11"}}),n("v-col",{attrs:{md:"1"}},[t.editable?n("v-btn",{attrs:{color:"success",fab:"",dark:"",small:""},on:{click:t.addHook}},[n("v-icon",[t._v("mdi-plus-circle-outline")])],1):t._e()],1)],1)],2)],1)],1)],1)},Y=[],q=(n("99af"),n("4de4"),n("2909")),z={props:{hooks:Array,expanded:Boolean,editable:Boolean},data:function(){return{editedHooks:this.hooks}},computed:{countOfEnabledHooks:function(){return this.editedHooks.filter((function(t){return t.enabled})).length},countOfHooks:function(){return this.editedHooks.length}},methods:{saveHooks:function(){qt.$emit("saveHooks",this.editedHooks)},addHook:function(){this.editedHooks=[].concat(Object(q["a"])(this.editedHooks),[{name:"",command:"",enabled:!1}]),this.saveHooks()},delHook:function(t){this.editedHooks=this.editedHooks.filter((function(e,n){return n!=t})),this.saveHooks()}}},G=z,K=(n("147f"),Object(u["a"])(G,U,Y,!1,null,"7a68c260",null)),Q=K.exports;b()(K,{VBtn:m["a"],VCard:M["a"],VCol:p["a"],VExpansionPanel:P["a"],VExpansionPanelContent:D["a"],VExpansionPanelHeader:A["a"],VExpansionPanels:N["a"],VIcon:h["a"],VRow:x["a"],VSwitch:R["a"],VTextField:I["a"]});var W={props:{job:{type:Object},editable:{type:Boolean,default:!0},mailExpanded:{type:Boolean,default:!1},hooksExpanded:{type:Boolean,default:!1}},data:function(){return{index:null,modifiedJob:null}},created:function(){this.setJobs(this.job);var t=this;qt.$on("saveHooks",(function(e){t.modifiedJob.hooks=e}))},watch:{modifiedJob:{deep:!0,handler:function(t){return qt.$emit("jobModified",t),t}},job:{handler:function(t){var e=JSON.stringify(t),n=JSON.stringify(this.modifiedJob);e!=n&&this.setJobs(t)}}},methods:{setJobs:function(t){this.originalJob=y["default"].cloneObj(t),this.modifiedJob=y["default"].cloneObj(t)}},components:{Email:F,Hooks:Q}},X=W,Z=(n("fc14"),n("99d9")),tt=n("da13"),et=n("34c3"),nt=n("5d23"),at=Object(u["a"])(X,E,S,!1,null,null,null),ot=at.exports;b()(at,{VCard:M["a"],VCardActions:Z["a"],VIcon:h["a"],VListItem:tt["a"],VListItemIcon:et["a"],VListItemSubtitle:nt["b"],VTextField:I["a"]});var it=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{staticClass:"mx-auto",attrs:{"max-width":"80%"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[null!=t.newJob&&null!=t.originalJob?n("v-card",[t._v(" Are you sure to save these changes? "),n("v-row",[n("v-col",{attrs:{m6:""}},[t._v(" Current job "),n("Job",{attrs:{job:t.originalJob,editable:!1,mailExpanded:!0,hooksExpanded:!0}})],1),n("v-col",{attrs:{m6:""}},[t._v(" New job to save "),n("Job",{attrs:{job:t.newJob,editable:!1,mailExpanded:!0,hooksExpanded:!0}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"success"},on:{click:function(e){return t.saveJob(t.newJob)}}},[t._v("Save")]),n("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:t.close}},[t._v("Close")])],1)],1):t._e()],1)},st=[],rt={components:{Job:ot},data:function(){return{originalJob:null,newJob:null,show:!1}},created:function(){var t=this;qt.$on("confirmSaveJob",(function(e,n){t.originalJob=y["default"].cloneObj(e),t.newJob=y["default"].cloneObj(n),t.show=!0}))},methods:{saveJob:function(t){var e=this;return Object(J["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.axios.post("jobs",t);case 2:qt.$emit("jobSaved",t),e.show=!1;case 4:case"end":return n.stop()}}),n)})))()},close:function(){this.show=!1}}},lt=rt,ct=(n("cc5d"),n("169a")),dt=n("2fa4"),ut=Object(u["a"])(lt,it,st,!1,null,null,null),vt=ut.exports;b()(ut,{VBtn:m["a"],VCard:M["a"],VCardActions:Z["a"],VCol:p["a"],VDialog:ct["a"],VRow:x["a"],VSpacer:dt["a"]});var bt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{staticClass:"mx-auto",attrs:{"max-width":"80%"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[null!=t.newJob&&null!=t.originalJob?n("v-card",[t._v(" There is a few changes that will be discarted, are you sure? "),n("v-row",[n("v-col",{attrs:{m6:""}},[t._v(" Current job "),n("Job",{attrs:{job:t.originalJob,editable:!1,mailExpanded:!0,hooksExpanded:!0}})],1),n("v-col",{attrs:{m6:""}},[t._v(" New job to save "),n("Job",{attrs:{job:t.newJob,editable:!1,mailExpanded:!0,hooksExpanded:!0}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"red"},on:{click:t.discardJob}},[t._v("Discard")]),n("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:t.close}},[t._v("Close")])],1)],1):t._e()],1)},ft=[],mt={components:{Job:ot},data:function(){return{originalJob:null,newJob:null,show:!1}},created:function(){var t=this;qt.$on("confirmDiscardJob",(function(e,n){t.originalJob=y["default"].cloneObj(e),t.newJob=y["default"].cloneObj(n),t.show=!0}))},methods:{discardJob:function(){this.show=!1,qt.$emit("jobDiscarted",this.job)},close:function(){this.show=!1}}},pt=mt,ht=(n("d542"),Object(u["a"])(pt,bt,ft,!1,null,null,null)),kt=ht.exports;b()(ht,{VBtn:m["a"],VCard:M["a"],VCardActions:Z["a"],VCol:p["a"],VDialog:ct["a"],VRow:x["a"],VSpacer:dt["a"]});var xt={components:{Job:ot,AreYouSureToSave:vt,AreYouSureToDiscard:kt},data:function(){return{index:null,originalJob:null,job:null,show:!1,isModified:!1}},beforeCreate:function(){var t=this;qt.$on("editJob",(function(e,n){t.index=e,t.originalJob=y["default"].cloneObj(n),t.job=y["default"].cloneObj(n),t.show=!0})),qt.$on("saveHooks",(function(e){t.job.hooks=e})),qt.$on("jobSaved",(function(e){t.job=e,t.originalJob=e,qt.$emit("saveJob",t.index,e),t.show=!1})),qt.$on("jobDiscarted",(function(){t.job=t.originalJob,t.show=!1})),qt.$on("jobModified",(function(e){t.job=e}))},watch:{job:{deep:!0,handler:function(t){var e=JSON.stringify(this.originalJob),n=JSON.stringify(this.job);return this.isModified=e!=n,t}}},methods:{saveJob:function(){qt.$emit("confirmSaveJob",this.originalJob,this.job)},close:function(){this.isModified?qt.$emit("confirmDiscardJob",this.originalJob,this.job):this.show=!1}}},_t=xt,gt=(n("6286"),Object(u["a"])(_t,C,O,!1,null,null,null)),wt=gt.exports;b()(gt,{VBtn:m["a"],VDialog:ct["a"],VSpacer:dt["a"]});var jt={name:"Jobs",components:{EditJob:wt},data:function(){return{jobs:[],jobHeaders:[{text:"Name",sortable:!0,value:"name"},{text:"Schedule",sortable:!0,value:"schedule"},{text:"Job",sortable:!0,value:"command"},{text:"Updated at",sortable:!0,value:"timestamp"},{text:"",sortable:!1,value:""}]}},beforeCreate:function(){var t=this;return Object(J["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("jobs");case 2:n=e.sent,t.jobs=n.data;case 4:case"end":return e.stop()}}),e)})))()},created:function(){var t=this;qt.$on("saveJob",(function(e,n){V["a"].set(t.jobs,e,n)}))},methods:{editJob:function(t,e){qt.$emit("editJob",t,e)},delJob:function(t){console.log("deleting",t)}}},Jt=jt,Vt=n("8fea"),Ct=n("3a2f"),Ot=Object(u["a"])(Jt,w,j,!1,null,null,null),yt=Ot.exports;b()(Ot,{VBtn:m["a"],VCol:p["a"],VDataTable:Vt["a"],VIcon:h["a"],VRow:x["a"],VTooltip:Ct["a"]});var Et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{staticClass:"text-center"},[n("v-col",{attrs:{cols:"12"}},[n("v-card-text",[n("v-textarea",{staticClass:"text-mono",attrs:{name:"env",label:"Environment variables",value:t.env,"auto-grow":!0,spellcheck:!1,hint:"Here you can set the PATH, MAILTO, MAILFROM, HOME, etc. environment variables"},on:{keyup:t.envChanged}}),n("v-btn",{staticClass:"float-right",attrs:{color:"green darken-1",text:""},on:{click:function(e){t.show=!1}}},[n("v-icon",[t._v("mdi-content-save-all")]),t._v(" Backup")],1),n("v-btn",{ref:"saveBtn",staticClass:"float-right",attrs:{color:"green darken-1",text:"",disabled:t.isSaveDisabled},on:{click:function(e){t.show=!1}}},[n("v-icon",[t._v("mdi-content-save")]),t._v(" Save")],1)],1)],1)],1)},St=[],$t={name:"Environment",data:function(){return{env:"",isSaveDisabled:!0}},beforeCreate:function(){var t=this;return Object(J["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("env");case 2:n=e.sent,t.env=n.data;case 4:case"end":return e.stop()}}),e)})))()},methods:{envChanged:function(t){this.isSaveDisabled=t.currentTarget.value==this.env}}},Ht=$t,Tt=(n("291d"),n("a844")),Bt=Object(u["a"])(Ht,Et,St,!1,null,null,null),Mt=Bt.exports;b()(Bt,{VBtn:m["a"],VCardText:Z["b"],VCol:p["a"],VIcon:h["a"],VRow:x["a"],VTextarea:Tt["a"]});var Pt={name:"Main",title:"🖥",components:{Topbar:g,Jobs:yt,Environment:Mt},data:function(){return{appButtons:[{name:"Backups",modal:"Backups",icon:"cloud-lock",color:"orange darken-1"},{name:"Settings",modal:"Settings",icon:"cog",color:"orange darken-1"}]}}},Dt=Pt,At=n("a523"),Nt=n("71a3"),Rt=n("c671"),It=n("fe57"),Lt=n("9a96"),Ft=Object(u["a"])(Dt,i,s,!1,null,null,null),Ut=Ft.exports;b()(Ft,{VContainer:At["a"],VIcon:h["a"],VTab:Nt["a"],VTabItem:Rt["a"],VTabs:It["a"],VTabsSlider:Lt["a"]});var Yt={name:"App",components:{Main:Ut,Topbar:g}},qt=new V["a"],zt=Yt,Gt=(n("034f"),n("7496")),Kt=n("f6c4"),Qt=Object(u["a"])(zt,a,o,!1,null,null,null);e["b"]=Qt.exports;b()(Qt,{VApp:Gt["a"],VMain:Kt["a"]})},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=n("bc3a"),i=n.n(o),s=n("2274"),r=n("2106"),l=n.n(r),c=n("f309");a["a"].use(c["a"]);var d=new c["a"]({theme:{dark:!0,options:{customProperties:!0},themes:{light:{primary:"#ff6633"},dark:{primary:"#ff6633",background:"#333333"}}}}),u=n("3dfd");n("7b48"),a["a"].use(l.a,i.a),a["a"].use(s["a"],{prefix:"Chronos - "}),a["a"].config.productionTip=!1,i.a.defaults.baseURL=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL,new a["a"]({vuetify:d,render:function(t){return t(u["b"])}}).$mount("#app")},6286:function(t,e,n){"use strict";n("ce21")},"7b48":function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return i}));var a=n("d4ec"),o=n("bee2"),i=function(){function t(){Object(a["a"])(this,t)}return Object(o["a"])(t,null,[{key:"cloneObj",value:function(t){return JSON.parse(JSON.stringify(t))}}]),t}()},"85ec":function(t,e,n){},"8aeb":function(t,e,n){},a30c:function(t,e,n){},adef:function(t,e,n){},cc1e:function(t,e,n){var a={"./Backups":["741d","chunk-2d0d6ae6"],"./Backups.vue":["741d","chunk-2d0d6ae6"],"./Settings":["5a07","chunk-2d0d2ac9"],"./Settings.vue":["5a07","chunk-2d0d2ac9"]};function o(t){if(!n.o(a,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=a[t],o=e[0];return n.e(e[1]).then((function(){return n(o)}))}o.keys=function(){return Object.keys(a)},o.id="cc1e",t.exports=o},cc5d:function(t,e,n){"use strict";n("e347")},ce21:function(t,e,n){},d112:function(t,e,n){"use strict";n("1ea5")},d542:function(t,e,n){"use strict";n("adef")},e347:function(t,e,n){},ec71:function(t,e,n){},fc14:function(t,e,n){"use strict";n("ec71")}});