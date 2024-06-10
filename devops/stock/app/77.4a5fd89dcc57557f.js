"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[77],{5077:(g,s,t)=>{t.r(s),t.d(s,{MemberListPageComponent:()=>c});var e=t(1635),a=t(4438),u=t(6970),o=t(1238),l=t(3834),h=t(7461),f=t(4842);class c{constructor(){this.router=(0,a.WQX)(u.Ix),this.securityService=(0,a.WQX)(o.iJ),this.credentialUtils=(0,a.WQX)(o.hL),this.config$=(0,a.EWP)(()=>this.genConfigs(this.securityService.list$())),this.actions$=(0,a.vPA)(this.getAction())}ngOnInit(){this.securityService.list()}addItem(){this.router.navigate([l.Sb.ADMIN_MEMBER_CREATE]).then()}actioncCliked(i){this.router.navigate([l.Sb.ADMIN_MEMBER_CREATE]).then()}onActionsClicked(i){const n=i.data;switch(i.action){case h.lm.EDIT:this.handleEdit(n.id);break;case h.lm.DELETE:this.handleDelete(n.id)}}onRowClicked(i){console.log("onRowClicked",i)}genConfigs(i){return this.credentialUtils.getDataTableConfig(i,!0)}handleDetail(){console.log("show detail")}handleEdit(i){this.router.navigate([l.Sb.ADMIN_MEMBER_UPDATE.replace(":id",i)]).then()}handleDelete(i){this.securityService.delete(i)}getAction(){return[{icon:"fa-plus",action:h.lm.ADD,isDisabled:!1}]}static#e=this.\u0275fac=function(n){return new(n||c)};static#t=this.\u0275cmp=a.VBU({type:c,selectors:[["app-member-list-page"]],standalone:!0,features:[a.aNF],decls:2,vars:3,consts:[[3,"actionClicked","title","actions"],[3,"actionClicked","rowClicked","config"]],template:function(n,r){1&n&&(a.j41(0,"app-card",0),a.bIt("actionClicked",function(p){return r.actioncCliked(p)}),a.j41(1,"app-data-table",1),a.bIt("actionClicked",function(p){return r.onActionsClicked(p)})("rowClicked",function(p){return r.onRowClicked(p)}),a.k0s()()),2&n&&(a.Y8G("title","feature.member-list.title")("actions",r.actions$()),a.R7$(),a.Y8G("config",r.config$()))},dependencies:[l.up,f.h,l.ib]})}(0,e.Cg)([(0,l.ZD)({title:"admin-feature-member-delete.confirm-title",message:"admin-feature-member-delete.confirm-message"})],c.prototype,"handleDelete",null)},1238:(g,s,t)=>{t.d(s,{hL:()=>l.h,k7:()=>u.k,iJ:()=>l.i,Js:()=>o.a}),t(8839),t(1866);var u=t(4539),o=t(3300),l=t(9277)},1866:(g,s,t)=>{t.r(s),t.d(s,{ParameterPageComponent:()=>c});var e=t(4438),a=t(177),u=t(8994),o=t(3834),l=t(7461),h=t(6970);function f(d,i){if(1&d&&(e.j41(0,"div",2)(1,"div",3)(2,"div",4),e.EFF(3),e.nI1(4,"labelWithParam"),e.k0s(),e.j41(5,"div",5),e.EFF(6),e.k0s()(),e.j41(7,"div",3)(8,"div",4),e.EFF(9),e.nI1(10,"labelWithParam"),e.k0s(),e.j41(11,"div",5),e.EFF(12),e.k0s()(),e.j41(13,"div",3)(14,"div",4),e.EFF(15),e.nI1(16,"labelWithParam"),e.k0s(),e.j41(17,"div",5),e.EFF(18),e.k0s()(),e.j41(19,"div",3)(20,"div",4),e.EFF(21),e.nI1(22,"labelWithParam"),e.k0s(),e.j41(23,"div",5),e.EFF(24),e.nI1(25,"labelWithParam"),e.k0s()(),e.j41(26,"div",3)(27,"div",4),e.EFF(28),e.nI1(29,"labelWithParam"),e.k0s(),e.j41(30,"div",5),e.EFF(31),e.nI1(32,"labelWithParam"),e.k0s()()()),2&d){const n=i.ngIf;e.R7$(3),e.JRh(e.bMT(4,10,"security-feature.parameter-page.label.id")),e.R7$(3),e.JRh(n.id),e.R7$(3),e.JRh(e.bMT(10,12,"security-feature.parameter-page.label.username")),e.R7$(3),e.JRh(n.username),e.R7$(3),e.JRh(e.bMT(16,14,"security-feature.parameter-page.label.mail")),e.R7$(3),e.JRh(n.mail),e.R7$(3),e.JRh(e.bMT(22,16,"security-feature.parameter-page.label.firstname")),e.R7$(3),e.JRh(e.bMT(25,18,n.firstname?n.firstname:"security-feature.parameter-page.label.firstname-empty")),e.R7$(4),e.JRh(e.bMT(29,20,"security-feature.parameter-page.label.lastname")),e.R7$(3),e.JRh(e.bMT(32,22,n.lastname?n.lastname:"security-feature.parameter-page.label.firstname-empty"))}}let c=(()=>{class d{constructor(){this.router=(0,e.WQX)(h.Ix),this.securityService=(0,e.WQX)(u.i),this.actions$=(0,e.vPA)(this.getAction())}ngOnInit(){}actioncCliked(n){switch(n.action){case l.lm.LOGOUT:this.securityService.logOut();break;case l.lm.EDIT:this.router.navigate([o.Sb.ADMIN_MEMBER_UPDATE.replace(":id",n.data.id)]).then()}}getAction(){return[{icon:"fa-pencil",action:l.lm.EDIT,isDisabled:!1},{icon:"fa-arrow-up-left-from-circle",action:l.lm.LOGOUT,isDisabled:!1}]}static#e=this.\u0275fac=function(r){return new(r||d)};static#t=this.\u0275cmp=e.VBU({type:d,selectors:[["app-parameter-page"]],standalone:!0,features:[e.aNF],decls:2,vars:4,consts:[[3,"actionClicked","actions","title","params"],["class","table",4,"ngIf"],[1,"table"],[1,"row"],[1,"cell","cell-label"],[1,"cell","cell-value"]],template:function(r,m){1&r&&(e.j41(0,"app-card",0),e.bIt("actionClicked",function(v){return m.actioncCliked(v)}),e.DNE(1,f,33,24,"div",1),e.k0s()),2&r&&(e.Y8G("actions",m.actions$())("title","security-feature.parameter-page.title")("params",m.securityService.account$()),e.R7$(),e.Y8G("ngIf",m.securityService.account$()))},dependencies:[a.MD,a.bT,o.ib,o.Sd],styles:[".table[_ngcontent-%COMP%]{display:flex;flex-direction:column}.table[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-direction:row;border-bottom:1px solid var(--theme-eee)}.table[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .cell[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.cell-label[_ngcontent-%COMP%]{width:200px;font-size:10px;text-transform:uppercase;color:var(--theme-primary);letter-spacing:1.3px;padding:10px 10px 10px 0}.cell-value[_ngcontent-%COMP%]{flex:2;color:var(--theme--input-text)}.button-area[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;padding-top:30px}.button-area[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:250px}.band[_ngcontent-%COMP%]{background:var(--theme-standard-bg);margin:20px -18px;border-top:1px solid var(--theme-eee);border-bottom:1px solid var(--theme-eee);height:20px}"]})}return d})()},9277:(g,s,t)=>{t.d(s,{h:()=>e.h,i:()=>a.i});var e=t(8016),a=t(8994)}}]);