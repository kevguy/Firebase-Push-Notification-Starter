webpackJsonp([3],{40:function(t,e,s){var n=s(41);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s(3)("e2b70846",n,!0)},41:function(t,e,s){e=t.exports=s(2)(void 0),e.push([t.i,"",""])},42:function(t,e,s){var n=s(43);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s(3)("28f5e088",n,!0)},43:function(t,e,s){e=t.exports=s(2)(void 0),e.push([t.i,"\n.separating-line {\n  border-bottom-color: rgba(0, 0, 0, 0.12);\n}\n.token--wrap-text {\n  overflow-wrap: break-word;\n}\n.token-list--table-body {\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 300px;\n  display: grid;\n  max-width: 100%;\n}\n.token-list--table-row {\n  display: inline-block;\n  white-space: normal;\n  margin-bottom: 8px;\n}\n",""])},47:function(t,e,s){"use strict";function n(t){s(42)}function i(t){s(40)}Object.defineProperty(e,"__esModule",{value:!0});var o=this&&this.__awaiter||function(t,e,s,n){return new(s||(s=Promise))(function(i,o){function r(t){try{c(n.next(t))}catch(t){o(t)}}function a(t){try{c(n.throw(t))}catch(t){o(t)}}function c(t){t.done?i(t.value):new s(function(e){e(t.value)}).then(r,a)}c((n=n.apply(t,e||[])).next())})},r=this&&this.__generator||function(t,e){function s(t){return function(e){return n([t,e])}}function n(s){if(i)throw new TypeError("Generator is already executing.");for(;c;)try{if(i=1,o&&(r=o[2&s[0]?"return":s[0]?"throw":"next"])&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[0,r.value]),s[0]){case 0:case 1:r=s;break;case 4:return c.label++,{value:s[1],done:!1};case 5:c.label++,o=s[1],s=[0];continue;case 7:s=c.ops.pop(),c.trys.pop();continue;default:if(r=c.trys,!(r=r.length>0&&r[r.length-1])&&(6===s[0]||2===s[0])){c=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){c.label=s[1];break}if(6===s[0]&&c.label<r[1]){c.label=r[1],r=s;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(s);break}r[2]&&c.ops.pop(),c.trys.pop();continue}s=e.call(t,c)}catch(t){s=[6,t],o=0}finally{i=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}var i,o,r,a,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},a={name:"registration",data:function(){return{userId:"",password:""}},created:function(){},mounted:function(){console.info("registration mounted")},computed:{isAuth:function(){return this.$store.state.isAuth}},watch:{},methods:{signUp:function(){return o(this,void 0,void 0,function(){var t,e,s,n;return r(this,function(i){switch(i.label){case 0:return this.userId&&this.password?(t={userId:this.userId,password:this.password},e="/user/signup",[4,fetch(e,{credentials:"same-origin",method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)})]):[2];case 1:return s=i.sent(),n=this,[4,s.json()];case 2:return n.result=i.sent(),console.log(this.result),this.result.auth?(this.$store.commit("SAVE_AUTH_TOKEN",this.result.token),this.$store.commit("SAVE_USER_ID",this.userId),this.$store.commit("SET_AUTH")):this.$store.commit("RESET_AUTH"),[2]}})})},login:function(){return o(this,void 0,void 0,function(){var t,e,s,n;return r(this,function(i){switch(i.label){case 0:return this.userId&&this.password?(t={userId:this.userId,password:this.password},e="/user/login",[4,fetch(e,{credentials:"same-origin",method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)})]):[2];case 1:return s=i.sent(),n=this,[4,s.json()];case 2:return n.result=i.sent(),console.log(this.result),this.result.auth?(this.$store.commit("SAVE_AUTH_TOKEN",this.result.token),this.$store.commit("SAVE_USER_ID",this.userId),this.$store.commit("SET_AUTH"),this.$router.push({path:"device-group-info"})):this.$store.commit("RESET_AUTH"),[2]}})})},testAuth:function(){return o(this,void 0,void 0,function(){var t,e,s;return r(this,function(n){switch(n.label){case 0:return t="/user/auth",[4,fetch(t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","x-access-token":this.$store.state.authToken},body:JSON.stringify({})})];case 1:return e=n.sent(),s=this,[4,e.json()];case 2:return s.result=n.sent(),console.log(this.result),[2]}})})}}},c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdc-card"},[t._m(0),s("section",{staticClass:"mdc-card__primary"},[s("form",{attrs:{action:"#"}},[s("div",[s("div",{staticClass:"mdc-form-field"},[s("div",{staticClass:"mdc-text-field",attrs:{"data-mdc-auto-init":"MDCTextField"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userId,expression:"userId"}],staticClass:"mdc-text-field__input",attrs:{id:"token-dest-user-id",type:"text"},domProps:{value:t.userId},on:{input:function(e){e.target.composing||(t.userId=e.target.value)}}}),s("label",{staticClass:"mdc-text-field__label",attrs:{for:"token-dest-user-id"}},[t._v("\n              User ID\n            ")]),s("div",{staticClass:"mdc-text-field__bottom-line"})])]),s("div",{staticClass:"mdc-form-field"},[s("div",{staticClass:"mdc-text-field",attrs:{"data-mdc-auto-init":"MDCTextField"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"mdc-text-field__input",attrs:{id:"token-dest-user-id",type:"text"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),s("label",{staticClass:"mdc-text-field__label",attrs:{for:"token-dest-user-id"}},[t._v("\n              Password\n            ")]),s("div",{staticClass:"mdc-text-field__bottom-line"})])])])])]),s("hr",{staticClass:"mdc-list-divider separating-line"}),s("section",{staticClass:"mdc-card__actions"},[s("button",{staticClass:"mdc-button mdc-button--compact mdc-card__action",on:{click:function(e){t.signUp()}}},[t._v("Sign Up")]),s("button",{staticClass:"mdc-button mdc-button--compact mdc-card__action",on:{click:function(e){t.login()}}},[t._v("Log in")]),s("button",{directives:[{name:"show",rawName:"v-show",value:t.isAuth,expression:"isAuth"}],staticClass:"mdc-button mdc-button--compact mdc-card__action",on:{click:function(e){t.testAuth()}}},[t._v("Test Auth")])])])},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"mdc-card__primary"},[s("h1",{staticClass:"mdc-card__title mdc-card__title--large"},[t._v("Sign Up")]),s("h2",{staticClass:"mdc-card__subtitle"},[t._v("Sign up for an user account")])])}],u={render:c,staticRenderFns:l},d=u,m=s(1),p=n,h=m(a,d,!1,p,null,null),f=h.exports,_={name:"authentication-page",mounted:function(){console.info("authentication page mounted")},computed:{hasToken:function(){return""!==this.$store.state.deviceToken}},components:{Registration:f}},v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"demo-grid mdc-layout-grid"},[s("div",{staticClass:"mdc-layout-grid__inner"},[s("div",{staticClass:"demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet"},[s("Registration")],1),s("div",{staticClass:"demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet"})])])},g=[],b={render:v,staticRenderFns:g},w=b,y=s(1),x=i,C=y(_,w,!1,x,null,null);e.default=C.exports}});