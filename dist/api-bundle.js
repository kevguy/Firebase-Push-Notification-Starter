module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=6)}([function(e,t){e.exports=require("rxjs/Rx")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("firebase/messaging")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t){e.exports=require("bcrypt-nodejs")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,n){"use strict";function r(e){return ce.Observable.create(function(t){le.findOneAndUpdate({token:e.token},e,{upsert:!0,new:!0},function(e,n){e&&t.error({status:"failure",msg:"database error"}),t.next({status:"success",msg:"token saved",result:n}),t.complete()})})}function o(e){return ce.Observable.create(function(t){le.findOne({token:e},function(e,n){e&&t.error({status:"failure",msg:"database error"}),t.next(n),t.complete()})})}function i(e){return ce.Observable.create(function(t){le.find({userId:e},function(e,n){e&&t.error({status:"failure",msg:"database error"}),n?t.next(n):t.next([]),t.complete()})})}function s(e){return ce.Observable.create(function(t){ae.find({userId:e},function(e,n){e&&t.error({status:"failure",msg:"database error",err:e});var r=n.map(function(e){return e.deviceGroup});t.next(r),t.complete()})})}function u(e){return ce.Observable.create(function(t){ae.findOne({deviceGroup:e},function(e,n){e&&t.error({status:"failure",msg:"database error",err:e}),n?t.next(n.tokens):t.next([]),t.complete()})}).flatMap(function(e){if(e){var t=e.map(function(e){return o(e)});return ce.Observable.merge.apply(ce.Observable,t).reduce(function(e,t){return e.concat([t])},[])}return ce.Observable.of([])})}function a(e,t){return u(t).flatMap(function(n){if(n.length>0){return n.map(function(e){return e.token}).indexOf(e)>=0?ce.Observable.of({deviceGroup:t,found:!0}):ce.Observable.of({deviceGroup:t,found:!1})}return ce.Observable.of({deviceGroup:t,found:!1})})}function c(e){return ce.Observable.create(function(t){ae.findOne({deviceGroup:e.deviceGroup},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n});var o;if(r){var i=r.tokens.concat([e.token]).reduce(function(e,t){return e.indexOf(t)<0&&e.push(t),e},[]);o={deviceGroup:r.deviceGroup,userId:r.userId,tokens:i}}else o={deviceGroup:e.deviceGroup,userId:e.userId,tokens:[e.token]};ae.findOneAndUpdate({deviceGroup:e.deviceGroup},o,{upsert:!0,new:!0},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n}),t.next({status:"success",msg:"token saved to device group "+e.deviceGroup,result:r}),t.complete()})})})}function f(e){return ce.Observable.create(function(t){ae.findOne({deviceGroup:e.deviceGroup},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n}),r||t.error({status:"failure",msg:"record not found"});var o;1===r.tokens.length?ae.remove({deviceGroup:e.deviceGroup},function(n){n&&t.error({status:"failure",msg:"database error",err:n}),t.next({status:"success",msg:"token deleted from device group "+e.deviceGroup}),t.complete()}):(o={deviceGroup:r.deviceGroup,userId:r.userId,tokens:r.tokens.filter(function(t){return t!==e.token})},ae.findOneAndUpdate({deviceGroup:e.deviceGroup},o,{upsert:!0,new:!0},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n}),t.next({status:"success",msg:"token deleted from device group "+e.deviceGroup}),t.complete()}))})})}function d(e){return he[e]}function l(e,t){return e+"_"+d(t)}function p(e){return"broadcast__"+d(e)}function h(e,t,n,r){var o={status:"success",result:""};e.subscribe(function(e){o.result=e},function(e){o.status="failure",o.result=e,n.send(JSON.stringify(o))},function(){n.send(JSON.stringify(o))})}function v(e){return ve(this,void 0,void 0,function(){var t,n,r,o,i;return be(this,function(s){switch(s.label){case 0:return t=e.userId,n=e.token,r=e.lang,o=d(r),[4,pe("https://android.googleapis.com/gcm/notification",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({operation:"create",notification_key_name:t+"_"+o,registration_ids:[n]})}).then(function(e){return e.json()}).catch(function(e){throw console.error("[DeviceGroup/createNotificationKey]: failed to create notification key: "+e),new Error(e)})];case 1:return i=s.sent(),[2,i.notification_key]}})})}function b(e){return ve(this,void 0,void 0,function(){var t,n,r,o;return be(this,function(i){switch(i.label){case 0:return t=e.userId,n=e.lang,r=d(n),[4,pe("https://android.googleapis.com/gcm/notification?notification_key_name="+t+"_"+r,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({})}).then(function(e){return e.json()}).then(function(e){if(e.error)throw console.error("[DeviceGroup/retrieveNotificationKey]: failed to retrieve notification key from userId "+t+": "+e.error),new Error(e.error);return e})];case 1:return o=i.sent(),o?[2,o.notification_key]:[2,!1]}})})}function g(e,t){return ve(this,void 0,void 0,function(){var n,r,o,i,s,u;return be(this,function(a){switch(a.label){case 0:return n=t.userId,r=t.token,o=t.lang,i=t.type,s=d(o),[4,b(t)];case 1:return u=a.sent(),u?[3,3]:[4,v(t)];case 2:return u=a.sent(),[3,5];case 3:return[4,pe("https://android.googleapis.com/gcm/notification",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({operation:e,notification_key_name:n+"_"+s,notification_key:u,registration_ids:[r]})}).then(function(e){return e.text()}).then(function(t){if(JSON.parse(t).error)throw console.error("[DeviceGroup/retrieveNotificationKey]: failed to "+e+" token "+r+" to notification key: "+u),new Error(t);return t})];case 4:u=a.sent(),a.label=5;case 5:return[2,u]}})})}function m(e){return ve(this,void 0,void 0,function(){return be(this,function(t){switch(t.label){case 0:return[4,g("add",e)];case 1:return[2,t.sent()]}})})}function y(e){return ve(this,void 0,void 0,function(){return be(this,function(t){switch(t.label){case 0:return[4,g("remove",e)];case 1:return[2,t.sent()]}})})}function k(e,t){return ve(this,void 0,void 0,function(){var n;return be(this,function(r){switch(r.label){case 0:return[4,pe("https://fcm.googleapis.com/fcm/send",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_SERVER_KEY}),body:JSON.stringify({to:e,notification:t})}).then(function(e){return e.json()}).then(function(e){if(e.error)throw console.error("[DeviceGroup/sendNotification]: error: "+e.error),new Error(e);return e})];case 1:return n=r.sent(),[2,n]}})})}function w(e,t){var n="https://iid.googleapis.com/iid/v1/"+e+"/rel/topics/"+t;return fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY}}).then(function(e){return e.json()})}function I(e,t){return fetch("https://iid.googleapis.com/iid/v1:batchRemove",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY},body:JSON.stringify({to:"/topics/"+t,registration_tokens:[e]})}).then(function(e){return e.text()})}function E(e,t){return fetch("https://fcm.googleapis.com/fcm/send",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY},body:JSON.stringify({to:"/topics/"+t,notification:e})}).then(function(e){return e.json()})}function _(e){return ce.Observable.fromPromise(m(e)).map(function(e){return{status:"success",msg:"created notification key successfully",notification_key:e}})}function O(e,t){var n=d(t);return ce.Observable.merge(ce.Observable.fromPromise(w(e,"test")),ce.Observable.fromPromise(w(e,"welcome__"+n))).last()}function S(e){var t=l(e.userId,e.lang),n=r(e),o=c({deviceGroup:t,userId:e.userId,token:e.token});return _(e).flatMap(function(e){return ce.Observable.merge(n,o)}).last()}function x(e,t,n,r){h(i(e),t,n,r)}function G(e,t,n,r){var i=(e.userId,e.token),s=e.lang;d(e.lang),l(e.userId,e.lang);h(o(i).flatMap(function(t){return t.hasOwnProperty("token")?S(e):ce.Observable.of(1)}).flatMap(function(e){return O(i,s)}).flatMap(function(e){return ce.Observable.fromPromise(E({body:"qwerty",title:"qwerty"},"test"))}).map(function(e){return{status:"success",msg:"successfully saved token"}}),t,n,r)}function A(e){e.post("/api/token",function(e,t,n){G(e.body,e,t,n)}),e.get("/api/tokens/:userId",function(e,t,n){x(e.params.userId,e,t,n)})}function P(e){var t="zh-hk"===e.lang?"zh_hk":"en",n=e.userId+"_"+t,o=_(e),i=r(e),s=c({deviceGroup:n,userId:e.userId,token:e.token});return o.flatMap(function(e){return i}).flatMap(function(e){return s})}function N(e){var t="zh-hk"===e.lang?"zh_hk":"en",n=e.userId+"_"+t;return ce.Observable.fromPromise(y(e)).flatMap(function(t){return f({deviceGroup:n,userId:e.userId,token:e.token})})}function T(e,t,n){var i,u,c=e.body,f=c.userId,d=c.token,l=c.targetLang,p="zh-hk"===l?"zh_hk":"en",h=f+"_"+p,v="broadcast__"+p,b={status:"success",result:""};o(d).flatMap(function(e){return u=e,ce.Observable.of(u)}).flatMap(function(e){return s(f)}).flatMap(function(e){if(e.length>0){var t=e.map(function(e){return a(d,e)});return ce.Observable.merge.apply(ce.Observable,t).filter(function(e){return e.found}).reduce(function(e,t){return t.found?t.deviceGroup:e},"")}return ce.Observable.throw("Original Device Group Not Found")}).flatMap(function(e){return i=e,N({type:u.type,token:d,userId:f,lang:u.lang})}).flatMap(function(e){return P({type:u.type,token:d,userId:f,lang:l})}).flatMap(function(e){var t="zh-hk"===u.lang?"zh_hk":"en";return ce.Observable.fromPromise(I(u.token,"broadcast__"+t))}).flatMap(function(e){return ce.Observable.fromPromise(w(u.token,v))}).flatMap(function(e){return r({type:u.type,lang:l,token:u.token,userId:u.userId})}).flatMap(function(e){return ce.Observable.of({status:"success",msg:"Device Group changed from "+i+" to "+h})}).subscribe(function(e){b.result=e},function(e){b.status="failure",b.result={status:"failure",result:e},t.send(JSON.stringify(b))},function(){t.send(JSON.stringify(b))})}function j(e,t,n){var r=new ke({userId:e.body.userId,password:e.body.password});ke.findOne({userId:e.body.userId},function(o,i){if(o&&t.send({status:"failure",msg:"database error"}),i)return void t.send({status:"failure",msg:"Account with that userId "+e.body.userId+" already exists."});r.save(function(e){if(e)return n(e);var o=we.sign({id:r._id},"linkinpark",{expiresIn:86400});t.send({status:"success",auth:!0,token:o})})})}function M(e,t,n){ke.findOne({userId:e.body.userId},function(n,r){if(n)return t.status(500).send("Error on the server.");if(!r)return t.status(404).send("No user found.");if(!ge.compareSync(e.body.password,r.password))return t.status(401).send({auth:!1,token:null});var o=we.sign({id:r._id},"linkinpark",{expiresIn:86400});t.status(200).send({auth:!0,token:o})})}function R(e,t,n){var r=e.headers["x-access-token"];if(!r)return t.status(401).send({auth:!1,message:"No token provided."});we.verify(r,"linkinpark",function(e,n){if(e)return t.status(500).send({auth:!1,message:"Failed to authenticate token."});t.status(200).send({auth:!0,message:"Authenticated with token!",decoded:n})})}function B(e,t,n,r){ke.findOne({userId:e},function(e,t){if(e)return r(e);t?n.send({status:"found",msg:"Account with that user id already exists."}):n.send({status:"not found",msg:"Account with that user id is available."})})}function F(e){var t={title:e.title,body:e.message},n={userId:e.userId,lang:e.lang};return ce.Observable.fromPromise(b(n)).flatMap(function(e){return ce.Observable.fromPromise(k(e,t))}).flatMap(function(e){return ce.Observable.of(Ie({},e,{status:"success"}))})}function z(e,t,n,r){h(s(e),t,n,r)}function C(e,t,n,r){h(u(e),t,n,r)}function J(e,t,n,r){h(F(e),t,n,r)}function K(e){e.get("/api/device-group/groups/:userId",function(e,t,n){z(e.params.userId,e,t,n)}),e.get("/api/device-group/tokens/:userId/:lang",function(e,t,n){var r="zh-hk"===e.params.lang?"zh_hk":"en";C(e.params.userId+"_"+r,e,t,n)}),e.post("/api/custom-message",function(e,t,n){J(e.body,e,t,n)})}function q(){return{type:"service_account",project_id:"kevchat-a5b6f",private_key_id:"dc4806e84c1c43064e683884b9e62a2bb12e3319",private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDU4J75tKyjWSQX\nWL4qww8i6xW51NTEdxxZXmYt3WuYpCpfFzpYU40KggPsTGl55cqzoOY3Py7g1mjm\nbTwCAujc7w2ceQnoAodZmQy9V8q3ygb+1rtNjjQF0SIAN3eoYbrXBfNYAhlrZS3G\n8mTJdvbsBsfYXn+NbazXzIvEuI2RZyRZkMtLNd+LklCfF9dIGX9Z/hyRIikqYt49\npanK8iTBI/ux6W62RPIfpuPWvUCdabVOJTfZ19qJLsi3S5kzqRTwzeTFU+fa3SUv\n9cUBdnmWEgfmWo9I8/6s+Hdt5R+QkrrMgfn0DOd0HD5x5zkwAdS+Sk87eVCOtUny\nb9zlofFNAgMBAAECggEAXFJwT95eEte5kdCAZN5EpcGrofTeM7humImaqeCB5eio\noaXavWy62ehKGESJZ/7TOrUYsrQZuhPy2aBdKoglgo/AaPCLbc4O8jowrrsw5SVe\nhE4PXFLEWBN7efmUUPfVhqSDhVMfwBZY1JPSRxdrfjBwonNVQTpkABErOq1JZFm6\nt2qHNFDMspwhYrbChYZN9Ijbvpv64XiejYM/rP/+Dpb5o1LwpyL6vJ8Z0xj9g65l\ncQZcITXgdi+lQDzbCR9sQ+2n/xlMiutFTsFqhL6giuQcNU/eD0l6wp4wPj8PqRMr\n3fLgPdErdTlB7rYPo1No3fuGAoz8yo9UpwLykjhCdwKBgQD3EmrJ6CHueyNqj7ek\nlHivjdSbyxjCeMwur5M1w+dqKBwDXAOtQ+sBm0IZ8fZHLCxJFhlAM6ejlCZiF0O2\nij2r2lr4X8/IW2ESeOTXJx8mvuLIA0T7865GupLM6hYoztodVTUsdv3uTz2/wmlR\nPWZecz7TTVd6QvPfsaOtY2wccwKBgQDckeGkP2D6XDSo538G1vtlD+aK+EDA4XcN\nmrXrLHbaMFxwjr5/w0g14h3x6gxIJwvGe5d2CwVk4zUEcihO1d+tfgePr4vKiuAp\nKQGrO0bu0FC9smIN/1GUjHYhzIqUWHeryA8CQQTbHs0OVm5hIfhKW7RGPl24oZBK\nC7I8XnoLPwKBgQCVhEOzpBLEqygnmIldw6u1MXN0RFfbeBa4OfAwHTmx+EvbjJd9\nBxj0g+xgnxiWwZibMhBd1eShDUqdGc8UbFwd36olnHW1nfcEorx5p2cmn2XF/JSG\nlFTm4IluEEsQrv03uxTOr8PDr5iCrzfkve9xQPTIEonZpyLGQE34463NGQKBgFkb\nZjjgkeES1wNVYm/08eLGJbEG0cIaU+pfEhdMA0fqOa4PPM6Iqed6zfYpQ4TyoUMy\nMuIxWaCEWarOI5KVvKNuQse9d4//wsdeFZqDfAiGh9fa9NoKx35nsGG/LEz54H65\nd7bFZZzQOK8OI9GB07jWi2HFWD96pbwENaFF2bApAoGBANUnVJxW0fJMh/9sYwQH\nmedP7aV7nLIFdG988p53wdvQN7CF40wCOckvW/bG/I83a7dibSj274EYSIa1deWb\nCWS+UsiNqMKgQgtzk4Id4AmLF0AVksJKH36+cP2PLexNdocL4Ku9T71IqsZn0JvC\nWaIK9klqvoH0aLg5XOJw5Zyg\n-----END PRIVATE KEY-----\n",client_email:"firebase-adminsdk-7fhc2@kevchat-a5b6f.iam.gserviceaccount.com",client_id:"112694782557192835677",auth_uri:"https://accounts.google.com/o/oauth2/auth",token_uri:"https://accounts.google.com/o/oauth2/token",auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",client_x509_cert_url:"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7fhc2%40kevchat-a5b6f.iam.gserviceaccount.com"}}function D(){return new Promise(function(e,t){var n=q();new Ee.auth.JWT(n.client_email,void 0,n.private_key,_e,void 0).authorize(function(n,r){if(n)return void t(n);e(r.access_token)})})}function Q(e,t){return Oe(this,void 0,void 0,function(){var n,r;return Se(this,function(o){switch(o.label){case 0:return[4,D()];case 1:return n=o.sent(),r=pe(process.env.FIREBASE_PUSH_NOTIFICATION_WEB,{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer "+n}),body:JSON.stringify({message:{token:e,notification:t}})}).then(function(e){return e.json()}).then(function(e){if(e.error)throw new Error(e)}).catch(function(e){console.error(e)}),[2,r]}})})}function W(e,t){return Oe(this,void 0,void 0,function(){return Se(this,function(e){return[2,"foo"]})})}function Y(e,t){return Oe(this,void 0,void 0,function(){return Se(this,function(e){return[2,"foo"]})})}function Z(e,t,n){return Oe(this,void 0,void 0,function(){var r;return Se(this,function(o){switch(o.label){case 0:switch(r=e){case"web":return[3,1];case"android":return[3,3];case"ios":return[3,5]}return[3,7];case 1:return[4,Q(t,n)];case 2:return[2,o.sent()];case 3:return[4,W(t,n)];case 4:return[2,o.sent()];case 5:return[4,Y(t,n)];case 6:return[2,o.sent()];case 7:return[2]}})})}function U(e){var t={title:e.title,body:e.message};return ce.Observable.fromPromise(Z(e.type,e.token,t)).map(function(){return{status:"success",msg:"message sent to token "+e.token}})}function V(e,t,n,r){var o;U(e).subscribe(function(e){o={status:"success",result:e}},function(e){o={status:"failure",result:e}},function(){n.send(JSON.stringify(o))})}function L(e){e.post("/api/direct-message",function(e,t,n){var r=e.body;V({title:r.title,message:r.message,token:r.token,type:r.type},e,t,n)})}function H(e,t){return ce.Observable.fromPromise(E(e,"test")).flatMap(function(e){return e.error?ce.Observable.throw("fail to send message"):ce.Observable.of("message sent")})}function X(e,t,n,r){h(H(e.msg,e.topic),t,n,r)}function $(e,t,n,r){var o=e.map(function(e){return{topic:p(e.lang),msg:e.msg}}).map(function(e){return H(e.msg,e.topic)});h(ce.Observable.merge.apply(ce.Observable,o).reduce(function(e,t){return e+t},""),t,n,r)}function ee(e,t,n){$([{lang:"en",msg:{title:"Welcome",body:"Welcome to Ice Ice Baby"}},{lang:"zh-hk",msg:{title:"你好",body:"歡迎加入Ice Ice Baby"}}],e,t,n)}function te(e,t,n){h(H(e.body,"test"),e,t,n)}function ne(e){e.post("/api/topic-message",function(e,t,n){X(e.body,e,t,n)}),e.post("/api/broadcast-message",function(e,t,n){$(e.body,e,t,n)}),e.post("/api/welcome-message",function(e,t,n){ee(e,t,n)}),e.post("/api/test-message",function(e,t,n){te(e,t,n)})}function re(e){return xe(this,void 0,void 0,function(){var t,n;return Ge(this,function(r){return(t=e.headers["x-access-token"])?(n=new Promise(function(e,n){we.verify(t,process.env.JWT_SECRET,function(t,n){t&&e(-1),e(1)})}),[2]):[2,-1]})})}function oe(e){var t=this;e.use(function(e,n,r){return xe(t,void 0,void 0,function(){var t,o;return Ge(this,function(i){switch(i.label){case 0:return(e.url.indexOf("/user/")>=0||e.url.indexOf("/api/")>=0)&&e.url.indexOf("/user/login")<0&&e.url.indexOf("/user/signup")<0?(t=e.headers["x-access-token"],t?[4,new Promise(function(e,n){we.verify(t,process.env.JWT_SECRET,function(t,n){t&&e(!1),e(!0)})})]:[2,n.status(401).send({auth:!1,message:"No token provided."})]):[3,2];case 1:return(o=i.sent())?(r(),[3,3]):[2,n.status(500).send({auth:!1,message:"Failed to authenticate token."})];case 2:r(),i.label=3;case 3:return[2]}})})}),K(e),e.post("/api/device-group/change-lang",function(e,t,n){T(e,t,n)}),L(e),ne(e),A(e),e.post("/user/signup",function(e,t,n){j(e,t,n)}),e.get("/user/check/:userId",function(e,t,n){B(e.params.userId,e,t,n)}),e.post("/user/login",function(e,t,n){M(e,t,n)}),e.post("/user/auth",function(e,t,n){R(e,t,n)})}Object.defineProperty(t,"__esModule",{value:!0});var ie=n(1),se=new ie.Schema({deviceGroup:String,userId:String,tokens:[String]},{timestamps:!0}),ue=ie.model("DeviceGroup",se),ae=ue,ce=n(0),fe=new ie.Schema({userId:String,token:String,lang:String,type:String},{timestamps:!0}),de=ie.model("Token",fe),le=de,pe=(n(2),n(3)),he={"zh-hk":"zh_hk",en:"en"},ve=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,u)}a((r=r.apply(e,t||[])).next())})},be=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[0,s.value]),n[0]){case 0:case 1:s=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,i=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){a.label=n[1];break}if(6===n[0]&&a.label<s[1]){a.label=s[1],s=n;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(n);break}s[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(e,a)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},ge=n(4),me=new ie.Schema({userId:String,password:String},{timestamps:!0});me.pre("save",function(e){var t=this;if(!t.isModified("password"))return e();ge.genSalt(10,function(n,r){if(n)return e(n);ge.hash(t.password,r,void 0,function(n,r){if(n)return e(n);t.password=r,e()})})}),me.methods.comparePassword=function(e,t){ge.compare(e,this.password,function(e,n){t(e,n)})};var ye=ie.model("User",me),ke=ye,we=n(5),Ie=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},Ee=(n(7),n(8)),_e="https://www.googleapis.com/auth/firebase.messaging",Oe=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,u)}a((r=r.apply(e,t||[])).next())})},Se=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[0,s.value]),n[0]){case 0:case 1:s=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,i=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){a.label=n[1];break}if(6===n[0]&&a.label<s[1]){a.label=s[1],s=n;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(n);break}s[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(e,a)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u};t.verifyAuthToken=re,t.default=oe;var xe=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,u)}a((r=r.apply(e,t||[])).next())})},Ge=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[0,s.value]),n[0]){case 0:case 1:s=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,i=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){a.label=n[1];break}if(6===n[0]&&a.label<s[1]){a.label=s[1],s=n;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(n);break}s[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(e,a)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,s,u,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u}},function(e,t){e.exports=require("firebase/app")},function(e,t){e.exports=require("googleapis")}]);