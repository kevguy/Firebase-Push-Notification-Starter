module.exports=function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="/dist/",n(n.s=10)}([function(e,n){e.exports=require("rxjs/Rx")},function(e,n){e.exports=require("firebase/auth")},function(e,n){e.exports=require("firebase/app")},function(e,n){e.exports=require("firebase/database")},function(e,n){e.exports=require("isomorphic-fetch")},function(e,n){e.exports=require("firebase/messaging")},function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("googleapis")},function(e,n){e.exports=require("bcrypt-nodejs")},function(e,n){e.exports=require("jsonwebtoken")},function(e,n,t){"use strict";function r(e){return 0===j.apps.length&&(console.log(e),j.initializeApp(e)),j.database()}function o(){return{apiKey:process.env.FIREBASE_API_KEY,authDomain:process.env.FIREBASE_DOMAIN_KEY,databaseURL:process.env.FIREBASE_DATABASE_URL,projectId:process.env.FIREBASE_PROJECT_ID,storageBucket:process.env.FIREBASE_STORAGE_BUCKET,messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID}}function i(){return{type:"service_account",project_id:"kevchat-a5b6f",private_key_id:"dc4806e84c1c43064e683884b9e62a2bb12e3319",private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDU4J75tKyjWSQX\nWL4qww8i6xW51NTEdxxZXmYt3WuYpCpfFzpYU40KggPsTGl55cqzoOY3Py7g1mjm\nbTwCAujc7w2ceQnoAodZmQy9V8q3ygb+1rtNjjQF0SIAN3eoYbrXBfNYAhlrZS3G\n8mTJdvbsBsfYXn+NbazXzIvEuI2RZyRZkMtLNd+LklCfF9dIGX9Z/hyRIikqYt49\npanK8iTBI/ux6W62RPIfpuPWvUCdabVOJTfZ19qJLsi3S5kzqRTwzeTFU+fa3SUv\n9cUBdnmWEgfmWo9I8/6s+Hdt5R+QkrrMgfn0DOd0HD5x5zkwAdS+Sk87eVCOtUny\nb9zlofFNAgMBAAECggEAXFJwT95eEte5kdCAZN5EpcGrofTeM7humImaqeCB5eio\noaXavWy62ehKGESJZ/7TOrUYsrQZuhPy2aBdKoglgo/AaPCLbc4O8jowrrsw5SVe\nhE4PXFLEWBN7efmUUPfVhqSDhVMfwBZY1JPSRxdrfjBwonNVQTpkABErOq1JZFm6\nt2qHNFDMspwhYrbChYZN9Ijbvpv64XiejYM/rP/+Dpb5o1LwpyL6vJ8Z0xj9g65l\ncQZcITXgdi+lQDzbCR9sQ+2n/xlMiutFTsFqhL6giuQcNU/eD0l6wp4wPj8PqRMr\n3fLgPdErdTlB7rYPo1No3fuGAoz8yo9UpwLykjhCdwKBgQD3EmrJ6CHueyNqj7ek\nlHivjdSbyxjCeMwur5M1w+dqKBwDXAOtQ+sBm0IZ8fZHLCxJFhlAM6ejlCZiF0O2\nij2r2lr4X8/IW2ESeOTXJx8mvuLIA0T7865GupLM6hYoztodVTUsdv3uTz2/wmlR\nPWZecz7TTVd6QvPfsaOtY2wccwKBgQDckeGkP2D6XDSo538G1vtlD+aK+EDA4XcN\nmrXrLHbaMFxwjr5/w0g14h3x6gxIJwvGe5d2CwVk4zUEcihO1d+tfgePr4vKiuAp\nKQGrO0bu0FC9smIN/1GUjHYhzIqUWHeryA8CQQTbHs0OVm5hIfhKW7RGPl24oZBK\nC7I8XnoLPwKBgQCVhEOzpBLEqygnmIldw6u1MXN0RFfbeBa4OfAwHTmx+EvbjJd9\nBxj0g+xgnxiWwZibMhBd1eShDUqdGc8UbFwd36olnHW1nfcEorx5p2cmn2XF/JSG\nlFTm4IluEEsQrv03uxTOr8PDr5iCrzfkve9xQPTIEonZpyLGQE34463NGQKBgFkb\nZjjgkeES1wNVYm/08eLGJbEG0cIaU+pfEhdMA0fqOa4PPM6Iqed6zfYpQ4TyoUMy\nMuIxWaCEWarOI5KVvKNuQse9d4//wsdeFZqDfAiGh9fa9NoKx35nsGG/LEz54H65\nd7bFZZzQOK8OI9GB07jWi2HFWD96pbwENaFF2bApAoGBANUnVJxW0fJMh/9sYwQH\nmedP7aV7nLIFdG988p53wdvQN7CF40wCOckvW/bG/I83a7dibSj274EYSIa1deWb\nCWS+UsiNqMKgQgtzk4Id4AmLF0AVksJKH36+cP2PLexNdocL4Ku9T71IqsZn0JvC\nWaIK9klqvoH0aLg5XOJw5Zyg\n-----END PRIVATE KEY-----\n",client_email:"firebase-adminsdk-7fhc2@kevchat-a5b6f.iam.gserviceaccount.com",client_id:"112694782557192835677",auth_uri:"https://accounts.google.com/o/oauth2/auth",token_uri:"https://accounts.google.com/o/oauth2/token",auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",client_x509_cert_url:"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7fhc2%40kevchat-a5b6f.iam.gserviceaccount.com"}}function s(e){return 0===j.apps.length&&j.initializeApp(e),j.auth().signInWithEmailAndPassword(process.env.FIREBASE_EMAIL,process.env.FIREBASE_PASSWORD).catch(function(e){var n=e.code,t=e.message;return console.error("Sign in failed ("+n+"): "+t),e})}function u(e){return q(this,void 0,void 0,function(){var n,t,r,o,i;return K(this,function(s){switch(s.label){case 0:return n=e.userId,t=e.token,r=e.lang,console.log("createNotificationKey "),o="zh-hk"===r?"zh_hk":"en",[4,M("https://android.googleapis.com/gcm/notification",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({operation:"create",notification_key_name:n+"_"+o,registration_ids:[t]})}).then(function(e){return e.json()}).catch(function(e){console.error("userGroups: failed to create notification key: "+e)})];case 1:return i=s.sent(),console.log("notification key is: "+i),console.log(i),console.log(n+"_"+o),[2,i.notification_key]}})})}function a(e){return q(this,void 0,void 0,function(){var n,t,r,o;return K(this,function(i){switch(i.label){case 0:return n=e.userId,t=e.lang,console.log("inside retrieveNotificationKey"),r="zh-hk"===t?"zh_hk":"en",[4,M("https://android.googleapis.com/gcm/notification?notification_key_name="+n+"_"+r,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({})}).then(function(e){return e.json()}).then(function(e){if(e.error)throw new Error(e.error);return e}).catch(function(e){console.error("userGroups: failed to retrieve notification key from userId "+n+": "+e)})];case 1:return o=i.sent(),console.info(o),o?[2,o.notification_key]:[2,!1]}})})}function c(e,n){return q(this,void 0,void 0,function(){var t,i,c,f,l,d,p,h,v;return K(this,function(g){switch(g.label){case 0:return t=n.userId,i=n.token,c=n.lang,f=n.type,console.log(i),l="zh-hk"===c?"zh_hk":"en",[4,a(n)];case 1:return d=g.sent(),console.log("retrieveNotificationKey: "+d),d?[3,3]:[4,u(n)];case 2:return d=g.sent(),[3,5];case 3:return console.log(e+"ing token to device group"),[4,M("https://android.googleapis.com/gcm/notification",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({operation:e,notification_key_name:t+"_"+l,notification_key:d,registration_ids:[i]})}).then(function(e){return e.text()}).then(function(e){if(console.log(e),JSON.parse(e).error)throw new Error(e);return e}).catch(function(n){console.error("userGroups: failed to "+e+" token "+i+" to notification key: "+d),console.log(n)})];case 4:d=g.sent(),g.label=5;case 5:return d?(console.log("saving stuff to database"),p=r(o()),[4,s(o())]):[3,8];case 6:return h=g.sent(),console.log("signed in"),v=p.ref("deviceGroup/"+t+"_"+l).push(),console.log("saving stuff to database"),[4,p.ref("deviceGroup/"+t+"_"+l+"/"+v.key).set({type:f,token:i})];case 7:g.sent(),g.label=8;case 8:return[2,d]}})})}function f(e){return q(this,void 0,void 0,function(){return K(this,function(n){switch(n.label){case 0:return[4,c("add",e)];case 1:return[2,n.sent()]}})})}function l(e,n){return z(this,void 0,void 0,function(){var t;return J(this,function(r){switch(r.label){case 0:return[4,M("https://fcm.googleapis.com/fcm/send",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_SERVER_KEY}),body:JSON.stringify({to:e,notification:n})}).then(function(e){return e.json()}).then(function(e){if(e.error)throw new Error(e);return e})];case 1:return t=r.sent(),[2,t]}})})}function d(e){var n=(r(o()),{title:e.title,body:e.message}),t={userId:e.userId,lang:e.lang};return F.Observable.fromPromise(a(t)).flatMap(function(e){return console.info("found notification id: "+e),F.Observable.fromPromise(l(e,n))}).flatMap(function(e){return F.Observable.of(C({},e,{status:"success"}))})}function p(e,n,t,r){var o;d(e).subscribe(function(e){o={status:"success",result:e}},function(e){o={status:"failure",result:e},t.send(JSON.stringify(o))},function(){console.info(o),t.send(JSON.stringify(o))})}function h(){return new Promise(function(e,n){var t=i();new D.auth.JWT(t.client_email,void 0,t.private_key,Q,void 0).authorize(function(t,r){if(t)return void n(t);console.log("fuck"),console.log(r),e(r.access_token)})})}function v(e,n){return L(this,void 0,void 0,function(){var t,r;return Y(this,function(o){switch(o.label){case 0:return[4,h()];case 1:return t=o.sent(),console.log(t),r=M(process.env.FIREBASE_PUSH_NOTIFICATION_WEB,{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer "+t}),body:JSON.stringify({message:{token:e,notification:n}})}).then(function(e){return e.json()}).then(function(e){if(console.log(e),e.error)throw new Error(e)}).catch(function(e){console.error(e)}),[2,r]}})})}function g(e,n){return L(this,void 0,void 0,function(){return Y(this,function(e){return[2,"foo"]})})}function b(e,n){return L(this,void 0,void 0,function(){return Y(this,function(e){return[2,"foo"]})})}function y(e,n,t){return L(this,void 0,void 0,function(){var r;return Y(this,function(o){switch(o.label){case 0:switch(r=e){case"web":return[3,1];case"android":return[3,3];case"ios":return[3,5]}return[3,7];case 1:return[4,v(n,t)];case 2:return[2,o.sent()];case 3:return[4,g(n,t)];case 4:return[2,o.sent()];case 5:return[4,b(n,t)];case 6:return[2,o.sent()];case 7:return[2]}})})}function w(e){var n={title:e.title,body:e.message};return F.Observable.fromPromise(y(e.type,e.token,n)).flatMap(function(){return F.Observable.of({status:"success",msg:"message sent to token "+e.token})})}function m(e,n,t,r){var o;w(e).subscribe(function(e){o={status:"success",result:e}},function(e){o={status:"failure",result:e}},function(){console.info(o),t.send(JSON.stringify(o))})}function k(e,n){return U(this,void 0,void 0,function(){var t,r;return W(this,function(i){switch(i.label){case 0:return[4,s(o())];case 1:return t=i.sent(),[4,e.ref("/users/"+n).once("value")];case 2:return r=i.sent(),[2,r.val()]}})})}function E(e){return F.Observable.create(function(n){X.findOneAndUpdate({token:e.token},e,{upsert:!0,new:!0},function(e,t){e&&(console.log(e),n.error({status:"failure",msg:"database error"})),n.next({status:"success",msg:"token saved",result:t}),n.complete()})})}function I(e){return F.Observable.create(function(n){ne.find({userId:e},function(e,t){e&&n.error({status:"failure",msg:"database error",err:e});var r=t.map(function(e){return e.deviceGroup});n.next(r),n.complete(),console.log(t)})})}function _(e){return F.Observable.create(function(n){ne.findOne({deviceGroup:e.deviceGroup},function(t,r){t&&n.error({status:"failure",msg:"database error",err:t});var o;if(r){var i=r.tokens.concat([e.token]).reduce(function(e,n){return e.indexOf(n)<0&&e.push(n),e},[]);o={deviceGroup:r.deviceGroup,userId:r.userId,tokens:i}}else o={deviceGroup:e.deviceGroup,userId:e.userId,tokens:[e.token]};ne.findOneAndUpdate({deviceGroup:e.deviceGroup},o,{upsert:!0,new:!0},function(t,r){t&&n.error({status:"failure",msg:"database error",err:t}),n.next({status:"success",msg:"token saved to device group "+e.deviceGroup,result:r}),n.complete()})})})}function S(e){return console.log(e),F.Observable.fromPromise(f(e)).flatMap(function(e){return F.Observable.of({status:"success",msg:"created notification key successfully",notification_key:e})}).do(function(){console.log("created notification key")})}function x(e,n,t,r){var o=(e.userId,e.token,e.lang,{status:"success",result:[]}),i="zh-hk"===e.lang?"zh_hk":"en",s=e.userId+"_"+i,u=S(e),a=E(e),c=_({deviceGroup:s,userId:e.userId,token:e.token});I(e.userId).flatMap(function(){return u}).flatMap(function(e){return F.Observable.merge(a,c)}).subscribe(function(e){o.result.push(e)},function(e){o.status="failure",o.result.push({status:"failure",result:e}),t.send(JSON.stringify(o))},function(){t.send(JSON.stringify(o))})}function A(e,n,t,i){return te(this,void 0,void 0,function(){var n,i,s;return re(this,function(u){switch(u.label){case 0:return i=r(o()),[4,k(i,e)];case 1:return s=u.sent(),n={status:"success",result:s},t.send(JSON.stringify(n)),[2]}})})}function O(e,n,t,r){var o={status:"success",result:[]};I(e).subscribe(function(e){o.result.push(e)},function(e){o.status="failure",o.result.push({status:"failure",result:e}),t.send(JSON.stringify(o))},function(){t.send(JSON.stringify(o))})}function G(e,n,t){var r=new ue({userId:e.body.userId,password:e.body.password});ue.findOne({userId:e.body.userId},function(o,i){if(o&&n.send({status:"failure",msg:"database error"}),i)return void n.send({status:"failure",msg:"Account with that userId "+e.body.userId+" already exists."});r.save(function(e){if(e)return t(e);var o=ae.sign({id:r._id},"linkinpark",{expiresIn:86400});n.send({status:"success",auth:!0,token:o})})})}function N(e,n,t){ue.findOne({userId:e.body.userId},function(t,r){if(t)return n.status(500).send("Error on the server.");if(!r)return n.status(404).send("No user found.");if(!oe.compareSync(e.body.password,r.password))return n.status(401).send({auth:!1,token:null});var o=ae.sign({id:r._id},"linkinpark",{expiresIn:86400});n.status(200).send({auth:!0,token:o})})}function P(e,n,t){var r=e.headers["x-access-token"];if(!r)return n.status(401).send({auth:!1,message:"No token provided."});ae.verify(r,"linkinpark",function(e,t){if(e)return n.status(500).send({auth:!1,message:"Failed to authenticate token."});n.status(200).send({auth:!0,message:"Authenticated with token!",decoded:t})})}function T(e,n,t,r){ue.findOne({userId:e},function(e,n){if(e)return r(e);n?t.send({status:"found",msg:"Account with that user id already exists."}):t.send({status:"not found",msg:"Account with that user id is available."})})}function B(e){return ce(this,void 0,void 0,function(){var n,t;return fe(this,function(r){return(n=e.headers["x-access-token"])?(t=new Promise(function(e,t){ae.verify(n,"linkinpark",function(n,t){n&&e(-1),e(1)})}),[2]):[2,-1]})})}function R(e){var n=this;e.use(function(e,t,r){return ce(n,void 0,void 0,function(){var n,o;return fe(this,function(i){switch(i.label){case 0:return(e.url.indexOf("/user/")>=0||e.url.indexOf("/api/")>=0)&&e.url.indexOf("/user/login")<0&&e.url.indexOf("/user/signup")<0?(console.log("verifying token"),n=e.headers["x-access-token"],n?[4,new Promise(function(e,t){ae.verify(n,"linkinpark",function(n,t){n&&e(!1),e(!0)})})]:[2,t.status(401).send({auth:!1,message:"No token provided."})]):[3,2];case 1:return o=i.sent(),(console.log("finishing verifying token"),o)?(r(),[3,3]):[2,t.status(500).send({auth:!1,message:"Failed to authenticate token."})];case 2:r(),i.label=3;case 3:return[2]}})})}),e.get("/api/device-group/:userId",function(e,n,t){O(e.params.userId,e,n,t)}),e.post("/api/direct-message",function(e,n,t){var r=e.body;m({title:r.title,message:r.message,token:r.token,type:r.type},e,n,t)}),e.post("/api/custom-message",function(e,n,t){var r=e.body;p({userId:r.userId,title:r.title,message:r.message,lang:r.lang},e,n,t)}),e.post("/api/token",function(e,n,t){console.log("handling api/token");var r=e.body;x({type:r.type,lang:r.lang,token:r.token,userId:r.userId},e,n,t)}),e.get("/api/tokens/:userId",function(e,n,t){A(e.params.userId,e,n,t)}),e.post("/user/signup",function(e,n,t){G(e,n,t)}),e.get("/user/check/:userId",function(e,n,t){T(e.params.userId,e,n,t)}),e.post("/user/login",function(e,n,t){N(e,n,t)}),e.post("/user/auth",function(e,n,t){P(e,n,t)})}Object.defineProperty(n,"__esModule",{value:!0});var F=t(0),j=t(2);t(3),t(1);global.XMLHttpRequest=t(11).XMLHttpRequest;var M=t(4),q=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(s,u)}a((r=r.apply(e,n||[])).next())})},K=this&&this.__generator||function(e,n){function t(e){return function(n){return r([e,n])}}function r(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&t[0]?"return":t[0]?"throw":"next"])&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[0,s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(e,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},z=(t(7),t(5),this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(s,u)}a((r=r.apply(e,n||[])).next())})}),J=this&&this.__generator||function(e,n){function t(e){return function(n){return r([e,n])}}function r(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&t[0]?"return":t[0]?"throw":"next"])&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[0,s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(e,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},C=this&&this.__assign||Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++){n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},D=t(7),Q="https://www.googleapis.com/auth/firebase.messaging",L=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(s,u)}a((r=r.apply(e,n||[])).next())})},Y=this&&this.__generator||function(e,n){function t(e){return function(n){return r([e,n])}}function r(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&t[0]?"return":t[0]?"throw":"next"])&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[0,s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(e,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},U=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(s,u)}a((r=r.apply(e,n||[])).next())})},W=this&&this.__generator||function(e,n){function t(e){return function(n){return r([e,n])}}function r(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&t[0]?"return":t[0]?"throw":"next"])&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[0,s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(e,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},Z=t(6),H=new Z.Schema({userId:String,token:String,lang:String,type:String},{timestamps:!0}),V=Z.model("Token",H),X=V,$=new Z.Schema({deviceGroup:String,userId:String,tokens:[String]},{timestamps:!0}),ee=Z.model("DeviceGroup",$),ne=ee,te=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(s,u)}a((r=r.apply(e,n||[])).next())})},re=this&&this.__generator||function(e,n){function t(e){return function(n){return r([e,n])}}function r(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&t[0]?"return":t[0]?"throw":"next"])&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[0,s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(e,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},oe=t(8),ie=new Z.Schema({userId:String,password:String},{timestamps:!0});ie.pre("save",function(e){var n=this;if(!n.isModified("password"))return e();oe.genSalt(10,function(t,r){if(t)return e(t);oe.hash(n.password,r,void 0,function(t,r){if(t)return e(t);n.password=r,e()})})}),ie.methods.comparePassword=function(e,n){oe.compare(e,this.password,function(e,t){n(e,t)})};var se=Z.model("User",ie),ue=se,ae=t(9);n.verifyAuthToken=B,n.default=R;var ce=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(s,u)}a((r=r.apply(e,n||[])).next())})},fe=this&&this.__generator||function(e,n){function t(e){return function(n){return r([e,n])}}function r(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&t[0]?"return":t[0]?"throw":"next"])&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[0,s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=n.call(e,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u}},function(e,n){e.exports=require("xmlhttprequest")}]);