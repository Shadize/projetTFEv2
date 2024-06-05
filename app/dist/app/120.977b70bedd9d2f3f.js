"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[120],{4120:(N,v,l)=>{l.r(v),l.d(v,{ShelveDetailPageComponent:()=>u,ShelveListPageComponent:()=>d,StockDetailPageComponent:()=>U,StockShelveDetailComponent:()=>W});var g=l(1635),t=l(4438),_=l(6970),m=l(4842),c=l(3834),S=l(6186),D=l(6064),f=l(6714),k=function(n){return n.ADD="ADD",n}(k||{});class d{constructor(){this.router=(0,t.WQX)(_.Ix),this.stockService=(0,t.WQX)(D.QJ),this.stockUtils=(0,t.WQX)(D.FW),this.productService=(0,t.WQX)(f.b),this.stockConfig$=(0,t.EWP)(()=>this.genStockConfigs(this.stockService.list$())),this.actions$=(0,t.vPA)(this.getAction())}ngOnInit(){this.productService.list(),this.stockService.list()}onActionClicked(i){const e=i.data;switch(i.action){case S.jg.EDIT:this.handleEdit(e.id);break;case S.jg.DELETE:this.handleDelete(e.id)}}onStockRowClicked(i){this.router.navigate([c.Sb.STOCK_DETAIL.replace(":id",i.id)]).then()}actioncCliked(i){this.router.navigate([c.Sb.ADMIN_SHELVE_CREATE]).then()}genStockConfigs(i){return this.stockUtils.getDataTableConfig(i??[])}handleDetail(i){this.router.navigate([c.Sb.ADMIN_SHELVE_DETAIL.replace(":id",i)]).then()}handleEdit(i){this.router.navigate([c.Sb.ADMIN_SHELVE_UPDATE.replace(":id",i)]).then()}handleDelete(i){this.stockService.delete(i)}getAction(){return[{icon:"fa-plus",action:k.ADD,isDisabled:!1}]}static#t=this.\u0275fac=function(e){return new(e||d)};static#e=this.\u0275cmp=t.VBU({type:d,selectors:[["app-shelve-list-page"]],standalone:!0,features:[t.aNF],decls:2,vars:3,consts:[[3,"actionClicked","title","actions"],[3,"actionClicked","rowClicked","config"]],template:function(e,o){1&e&&(t.j41(0,"app-card",0),t.bIt("actionClicked",function(a){return o.actioncCliked(a)}),t.j41(1,"app-data-table",1),t.bIt("actionClicked",function(a){return o.onActionClicked(a)})("rowClicked",function(a){return o.onStockRowClicked(a)}),t.k0s()()),2&e&&(t.Y8G("title","feature.shelve-list.title")("actions",o.actions$()),t.R7$(),t.Y8G("config",o.stockConfig$()))},dependencies:[c.up,m.h,c.ib],styles:[".band[_ngcontent-%COMP%]{background:var(--theme-standard-bg);margin:20px -18px;border-top:1px solid var(--theme-eee);border-bottom:1px solid var(--theme-eee);height:20px}"]})}(0,g.Cg)([(0,c.ZD)({title:"common.delete-form.confirm-title",message:"common.delete-form.confirm-message"})],d.prototype,"handleDelete",null);var r=l(8758),$=l(7376),h=l(8236),y=l(6126),T=l(1238),C=l(8141),p=l(7679),E=l(3190),b=l(758);function A(n,i){1&n&&t.nrm(0,"app-detail-not-found",1),2&n&&t.Y8G("message","feature.shelve-detail.not-found")}function P(n,i){if(1&n&&(t.j41(0,"span"),t.EFF(1),t.nI1(2,"translate"),t.k0s()),2&n){const e=i.$implicit;t.R7$(),t.SpI(" ",t.bMT(2,1,"admin-feature.product-form."+e.control+"."+e.error),"")}}function x(n,i){if(1&n&&(t.j41(0,"div",6),t.Z7z(1,P,3,3,"span",null,t.Vm6),t.k0s()),2&n){const e=t.XpG(3);t.R7$(),t.Dyx(e.errors$())}}function G(n,i){if(1&n){const e=t.RV6();t.j41(0,"app-card",5),t.bIt("actionClicked",function(s){t.eBV(e);const a=t.XpG(2);return t.Njj(a.actionCardClicked(s))}),t.DNE(1,x,3,0,"div",6),t.j41(2,"app-form-builder",7),t.bIt("cancel",function(){t.eBV(e);const s=t.XpG(2);return t.Njj(s.cancel())})("formGroupSet",function(s){t.eBV(e);const a=t.XpG(2);return t.Njj(a.setFormGroup(s))})("formSubmitted",function(s){t.eBV(e);const a=t.XpG(2);return t.Njj(a.onFormSubmitted(s))}),t.k0s()()}if(2&n){const e=t.XpG(2);t.Y8G("title","feature.consumption-form")("actions",e.consumptionActions$()),t.R7$(),t.vxM(1,e.errors$().length>0?1:-1),t.R7$(),t.Y8G("config",e.consumptionFormConfig$())}}function I(n,i){if(1&n){const e=t.RV6();t.j41(0,"app-card",2)(1,"app-data-table",3),t.bIt("actionClicked",function(s){t.eBV(e);const a=t.XpG(2);return t.Njj(a.onActionClicked(s))}),t.k0s()()}if(2&n){const e=t.XpG(2);t.Y8G("title","feature.consumption-list"),t.R7$(),t.Y8G("config",e.consumptionDataTableConfig$())}}function R(n,i){if(1&n){const e=t.RV6();t.j41(0,"app-card",2),t.nI1(1,"translate"),t.j41(2,"app-data-table",3),t.bIt("actionClicked",function(s){t.eBV(e);const a=t.XpG();return t.Njj(a.consume(s))}),t.k0s()(),t.DNE(3,G,3,4,"app-card",4)(4,I,2,2)}if(2&n){const e=t.XpG();t.FS9("title",t.i5U(1,3,"feature.shelve-detail.title-data",e.detail$())),t.R7$(2),t.Y8G("config",e.productDataTableConfig()),t.R7$(),t.vxM(3,e.isAddingConsumption$()?3:4)}}class u{constructor(){this.stockService=(0,t.WQX)(r.QJ),this.stockUtils=(0,t.WQX)(r.FW),this.shelveUtils=(0,t.WQX)(r.O9),this.shelveService=(0,t.WQX)(r.R4),this.productUtils=(0,t.WQX)(f.u),this.productService=(0,t.WQX)(f.b),this.consumptionUtils=(0,t.WQX)(h.CU),this.consumptionService=(0,t.WQX)(y.p),this.productConsume$=(0,t.vPA)(null),this.securityService=(0,t.WQX)(T.iJ),this.detail$=(0,t.EWP)(()=>this.getShelveDetail(this.stockService.list$())),this.productDataTableConfig=(0,t.EWP)(()=>this.genConfig(this.detail$())),this.consumptionFormConfig$=(0,t.EWP)(()=>this.genFormConfigs()),this.isAddingConsumption$=(0,t.vPA)(!1),this.consumptionDataTableConfig$=(0,t.EWP)(()=>this.genConsumptionTableConfig(this.detail$())),this.errors$=(0,t.vPA)([]),this.consumptionActions$=(0,t.EWP)(()=>this.getConsumptionActions(this.isAddingConsumption$()))}ngOnInit(){this.consumptionService.listByShelve(this.id)}onActionClicked(i){const e=i.data;switch(i.action){case h.MI.DELETE:this.handleDelete(e.id);break;case h.MI.DELIVERED:this.handleDeliver(e.id)}}handleDelete(i){this.consumptionService.delete(i).pipe((0,C.M)(()=>{this.stockService.list(),this.isAddingConsumption$.set(!1)})).subscribe()}handleDeliver(i){}genFormConfigs(){return this.consumptionUtils.getEmpty(),this.consumptionUtils.getDataFormConfig(this.consumptionUtils.getEmptyFormData(),"feature.admin.consumption.title-add")}genConfig(i){return this.productUtils.getShelveDetailDataConfig(i.products)}genConsumptionTableConfig(i){return this.consumptionUtils.getDataTableConfig((0,$.flatten)(i.products.map(e=>e.consumptions)),!0)}getShelveDetail(i){return i?this.shelveUtils.getShelveDetailFromStock(i,this.id):(this.stockService.list(),this.shelveUtils.getEmpty())}consume(i){this.productConsume$.set(i.data),this.selectedQuantity=1,this.isAddingConsumption$.set(!0)}onFormSubmitted(i){if(i.consumption_type===E.c.RESERVATION&&0===i.delivery_date.length)return void this.errors$.set([{control:"delivery_date",error:"needed",value:!0}]);const e=this.productConsume$(),o=this.shelveUtils.getShelveForProduct(this.stockService.list$(),e),s=this.createConsumption(i,o,e);this.updateProductAndConsumption(e,s,o)}setFormGroup(i){this.formGroup=i}cancel(){this.isAddingConsumption$.set(!1)}actionCardClicked(i){switch(i.action){case p.BA.SAVE:this.onFormSubmitted(this.formGroup.value);break;case p.BA.CANCEL:this.cancel()}}getConsumptionActions(i){return i?[{icon:"fa-regular fa-floppy-disk",action:p.BA.SAVE,isDisabled:!1},{icon:"fa-regular fa-arrow-rotate-left",action:p.BA.CANCEL,isDisabled:!1}]:[{icon:"fa-regular fa-plus",action:p.BA.ADD,isDisabled:!1}]}createConsumption(i,e,o){console.log("product",o);const s={order_date:(0,b.qg)(i.order_date,"dd-MM-yyyy",new Date),order_date_str:"",delivery_date_str:"",quantity:this.selectedQuantity,is_reserved:"RESERVATION"===i.consumption_type,is_delivered:"RESERVATION"!==i.consumption_type,consumption_type:i.consumption_type,type:o.type,status:h.Kz.ACTIVE,shelve:e.str,shelve_reference:e.id,author:this.securityService.account$(),productName:`${o.title} ${o.str}`,id:"",str:"",isEmpty:!1};return s.delivery_date=i.consumption_type===E.c.RESERVATION?(0,b.qg)(i.delivery_date,"yyyy-MM-dd",new Date):new Date,s}updateProductAndConsumption(i,e,o){i.quantity-=this.selectedQuantity,i.consumptions.push(e);const s=this.productUtils.toUpdatePayload(i,this.stockUtils.toDTOS(this.stockService.list$()),o.id,this.consumptionUtils.toDTOS(i.consumptions));this.productService.update(s,!1).pipe((0,C.M)(()=>this.stockService.list())).subscribe(()=>{this.isAddingConsumption$.set(!1),this.stockService.list()})}static#t=this.\u0275fac=function(e){return new(e||u)};static#e=this.\u0275cmp=t.VBU({type:u,selectors:[["app-shelve-detail-page"]],inputs:{id:"id"},standalone:!0,features:[t.aNF],decls:3,vars:1,consts:[[1,"flexos"],[3,"message"],[3,"title"],[3,"actionClicked","config"],[3,"title","actions"],[3,"actionClicked","title","actions"],[1,"error-card-pan"],[3,"cancel","formGroupSet","formSubmitted","config"]],template:function(e,o){1&e&&(t.j41(0,"div",0),t.DNE(1,A,1,1,"app-detail-not-found",1)(2,R,5,6),t.k0s()),2&e&&(t.R7$(),t.vxM(1,o.detail$()?2:1))},dependencies:[c.ib,m.h,m.D9,c.g0,c.up,c.$l],styles:[".flexos[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}"]})}function X(n,i){if(1&n&&t.nrm(0,"app-stock-detail",0),2&n){const e=t.XpG();t.Y8G("detail",e.detail$())}}(0,g.Cg)([(0,c.ZD)({title:"common.cancel-form.confirm-title",message:"common.cancel-form.confirm-message"})],u.prototype,"cancel",null);let U=(()=>{class n{constructor(){this.stockService=(0,t.WQX)(r.QJ),this.detail$=(0,t.vPA)(null)}ngOnInit(){this.stockService.detail(this.id).pipe((0,C.M)(e=>this.detail$.set(e))).subscribe()}static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275cmp=t.VBU({type:n,selectors:[["app-stock-detail-page"]],inputs:{id:"id"},standalone:!0,features:[t.aNF],decls:1,vars:1,consts:[[3,"detail"]],template:function(o,s){1&o&&t.DNE(0,X,1,1,"app-stock-detail",0),2&o&&t.vxM(0,s.detail$()?0:-1)},dependencies:[r.r0]})}return n})();function j(n,i){1&n&&(t.j41(0,"app-card"),t.nrm(1,"app-detail-not-found",0),t.k0s()),2&n&&(t.R7$(),t.Y8G("message","feature.shelve-detail.not-found"))}function F(n,i){if(1&n){const e=t.RV6();t.j41(0,"app-card",1)(1,"app-data-table",2),t.bIt("rowClicked",function(s){t.eBV(e);const a=t.XpG();return t.Njj(a.goToDetail(s))}),t.k0s()()}if(2&n){const e=t.XpG();t.Y8G("title",e.list$()[0].rack),t.R7$(),t.Y8G("config",e.shelveDataTableConfig$())}}let W=(()=>{class n{constructor(){this.stockService=(0,t.WQX)(r.QJ),this.shelveUtils=(0,t.WQX)(r.O9),this.router=(0,t.WQX)(_.Ix),this.list$=(0,t.EWP)(()=>this.getShelveDetail(this.stockService.list$())),this.shelveDataTableConfig$=(0,t.EWP)(()=>this.genConfig(this.list$()))}ngOnInit(){this.stockService.detail(this.id)}genConfig(e){return this.shelveUtils.getDataTableConfig(e)}getShelveDetail(e){if(e){const o=(0,$.flatten)(e.map(a=>a.shelves)),s=o.find(a=>a.id===this.id);return s?o.filter(a=>a.locationReference===s.locationReference):[]}return this.stockService.list(),[this.shelveUtils.getEmpty()]}goToDetail(e){this.router.navigate([c.Sb.SHELVE_DETAIL.replace(":id",e.id)])}static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275cmp=t.VBU({type:n,selectors:[["app-stock-shelve-detail"]],inputs:{id:"id"},standalone:!0,features:[t.aNF],decls:2,vars:1,consts:[[3,"message"],[3,"title"],[3,"rowClicked","config"]],template:function(o,s){1&o&&t.DNE(0,j,2,1,"app-card")(1,F,2,2),2&o&&t.vxM(0,s.list$()?1:0)},dependencies:[c.ib,c.up,c.g0]})}return n})()}}]);