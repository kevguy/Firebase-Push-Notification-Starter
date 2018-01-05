module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=7)}([function(e,t){e.exports=require("rxjs/Rx")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t){e.exports=require("firebase/messaging")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("googleapis")},function(e,t){e.exports=require("bcrypt-nodejs")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,n){"use strict";function r(e){return V(this,void 0,void 0,function(){var t,n,r,o,s;return L(this,function(i){switch(i.label){case 0:return t=e.userId,n=e.token,r=e.lang,console.log("createNotificationKey "),o="zh-hk"===r?"zh_hk":"en",[4,U("https://android.googleapis.com/gcm/notification",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({operation:"create",notification_key_name:t+"_"+o,registration_ids:[n]})}).then(function(e){return e.json()}).catch(function(e){console.error("userGroups: failed to create notification key: "+e)})];case 1:return s=i.sent(),console.log("notification key is: "+s),console.log(s),console.log(t+"_"+o),[2,s.notification_key]}})})}function o(e){return V(this,void 0,void 0,function(){var t,n,r,o;return L(this,function(s){switch(s.label){case 0:return t=e.userId,n=e.lang,console.log("inside retrieveNotificationKey"),r="zh-hk"===n?"zh_hk":"en",[4,U("https://android.googleapis.com/gcm/notification?notification_key_name="+t+"_"+r,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({})}).then(function(e){return e.json()}).then(function(e){if(e.error)throw new Error(e.error);return e}).catch(function(e){console.error("userGroups: failed to retrieve notification key from userId "+t+": "+e)})];case 1:return o=s.sent(),console.info(o),o?[2,o.notification_key]:[2,!1]}})})}function s(e,t){return V(this,void 0,void 0,function(){var n,s,i,u,a,c;return L(this,function(f){switch(f.label){case 0:return n=t.userId,s=t.token,i=t.lang,u=t.type,console.log(s),a="zh-hk"===i?"zh_hk":"en",[4,o(t)];case 1:return c=f.sent(),console.log("retrieveNotificationKey: "+c),c?[3,3]:[4,r(t)];case 2:return c=f.sent(),[3,5];case 3:return console.log(e+"ing token to device group"),[4,U("https://android.googleapis.com/gcm/notification",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_MESSAGING_SENDER_ID}),body:JSON.stringify({operation:e,notification_key_name:n+"_"+a,notification_key:c,registration_ids:[s]})}).then(function(e){return e.text()}).then(function(e){if(console.log(e),JSON.parse(e).error)throw new Error(e);return e}).catch(function(t){console.error("userGroups: failed to "+e+" token "+s+" to notification key: "+c),console.log(t)})];case 4:c=f.sent(),f.label=5;case 5:return[2,c]}})})}function i(e){return V(this,void 0,void 0,function(){return L(this,function(t){switch(t.label){case 0:return[4,s("add",e)];case 1:return[2,t.sent()]}})})}function u(e){return V(this,void 0,void 0,function(){return L(this,function(t){switch(t.label){case 0:return[4,s("remove",e)];case 1:return[2,t.sent()]}})})}function a(e,t){return H(this,void 0,void 0,function(){var n;return X(this,function(r){switch(r.label){case 0:return[4,U("https://fcm.googleapis.com/fcm/send",{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY,project_id:process.env.FIREBASE_SERVER_KEY}),body:JSON.stringify({to:e,notification:t})}).then(function(e){return e.json()}).then(function(e){if(e.error)throw new Error(e);return e})];case 1:return n=r.sent(),[2,n]}})})}function c(e){var t={title:e.title,body:e.message},n={userId:e.userId,lang:e.lang};return Z.Observable.fromPromise(o(n)).flatMap(function(e){return Z.Observable.fromPromise(a(e,t))}).flatMap(function(e){return Z.Observable.of($({},e,{status:"success"}))})}function f(e,t,n,r){var o;c(e).subscribe(function(e){o={status:"success",result:e}},function(e){o={status:"failure",result:e},n.send(JSON.stringify(o))},function(){n.send(JSON.stringify(o))})}function l(){return{type:"service_account",project_id:"kevchat-a5b6f",private_key_id:"dc4806e84c1c43064e683884b9e62a2bb12e3319",private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDU4J75tKyjWSQX\nWL4qww8i6xW51NTEdxxZXmYt3WuYpCpfFzpYU40KggPsTGl55cqzoOY3Py7g1mjm\nbTwCAujc7w2ceQnoAodZmQy9V8q3ygb+1rtNjjQF0SIAN3eoYbrXBfNYAhlrZS3G\n8mTJdvbsBsfYXn+NbazXzIvEuI2RZyRZkMtLNd+LklCfF9dIGX9Z/hyRIikqYt49\npanK8iTBI/ux6W62RPIfpuPWvUCdabVOJTfZ19qJLsi3S5kzqRTwzeTFU+fa3SUv\n9cUBdnmWEgfmWo9I8/6s+Hdt5R+QkrrMgfn0DOd0HD5x5zkwAdS+Sk87eVCOtUny\nb9zlofFNAgMBAAECggEAXFJwT95eEte5kdCAZN5EpcGrofTeM7humImaqeCB5eio\noaXavWy62ehKGESJZ/7TOrUYsrQZuhPy2aBdKoglgo/AaPCLbc4O8jowrrsw5SVe\nhE4PXFLEWBN7efmUUPfVhqSDhVMfwBZY1JPSRxdrfjBwonNVQTpkABErOq1JZFm6\nt2qHNFDMspwhYrbChYZN9Ijbvpv64XiejYM/rP/+Dpb5o1LwpyL6vJ8Z0xj9g65l\ncQZcITXgdi+lQDzbCR9sQ+2n/xlMiutFTsFqhL6giuQcNU/eD0l6wp4wPj8PqRMr\n3fLgPdErdTlB7rYPo1No3fuGAoz8yo9UpwLykjhCdwKBgQD3EmrJ6CHueyNqj7ek\nlHivjdSbyxjCeMwur5M1w+dqKBwDXAOtQ+sBm0IZ8fZHLCxJFhlAM6ejlCZiF0O2\nij2r2lr4X8/IW2ESeOTXJx8mvuLIA0T7865GupLM6hYoztodVTUsdv3uTz2/wmlR\nPWZecz7TTVd6QvPfsaOtY2wccwKBgQDckeGkP2D6XDSo538G1vtlD+aK+EDA4XcN\nmrXrLHbaMFxwjr5/w0g14h3x6gxIJwvGe5d2CwVk4zUEcihO1d+tfgePr4vKiuAp\nKQGrO0bu0FC9smIN/1GUjHYhzIqUWHeryA8CQQTbHs0OVm5hIfhKW7RGPl24oZBK\nC7I8XnoLPwKBgQCVhEOzpBLEqygnmIldw6u1MXN0RFfbeBa4OfAwHTmx+EvbjJd9\nBxj0g+xgnxiWwZibMhBd1eShDUqdGc8UbFwd36olnHW1nfcEorx5p2cmn2XF/JSG\nlFTm4IluEEsQrv03uxTOr8PDr5iCrzfkve9xQPTIEonZpyLGQE34463NGQKBgFkb\nZjjgkeES1wNVYm/08eLGJbEG0cIaU+pfEhdMA0fqOa4PPM6Iqed6zfYpQ4TyoUMy\nMuIxWaCEWarOI5KVvKNuQse9d4//wsdeFZqDfAiGh9fa9NoKx35nsGG/LEz54H65\nd7bFZZzQOK8OI9GB07jWi2HFWD96pbwENaFF2bApAoGBANUnVJxW0fJMh/9sYwQH\nmedP7aV7nLIFdG988p53wdvQN7CF40wCOckvW/bG/I83a7dibSj274EYSIa1deWb\nCWS+UsiNqMKgQgtzk4Id4AmLF0AVksJKH36+cP2PLexNdocL4Ku9T71IqsZn0JvC\nWaIK9klqvoH0aLg5XOJw5Zyg\n-----END PRIVATE KEY-----\n",client_email:"firebase-adminsdk-7fhc2@kevchat-a5b6f.iam.gserviceaccount.com",client_id:"112694782557192835677",auth_uri:"https://accounts.google.com/o/oauth2/auth",token_uri:"https://accounts.google.com/o/oauth2/token",auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",client_x509_cert_url:"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7fhc2%40kevchat-a5b6f.iam.gserviceaccount.com"}}function d(){return new Promise(function(e,t){var n=l();new ee.auth.JWT(n.client_email,void 0,n.private_key,te,void 0).authorize(function(n,r){if(n)return void t(n);console.log("fuck"),console.log(r),e(r.access_token)})})}function p(e,t){return ne(this,void 0,void 0,function(){var n,r;return re(this,function(o){switch(o.label){case 0:return[4,d()];case 1:return n=o.sent(),console.log(n),r=U(process.env.FIREBASE_PUSH_NOTIFICATION_WEB,{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer "+n}),body:JSON.stringify({message:{token:e,notification:t}})}).then(function(e){return e.json()}).then(function(e){if(console.log(e),e.error)throw new Error(e)}).catch(function(e){console.error(e)}),[2,r]}})})}function h(e,t){return ne(this,void 0,void 0,function(){return re(this,function(e){return[2,"foo"]})})}function g(e,t){return ne(this,void 0,void 0,function(){return re(this,function(e){return[2,"foo"]})})}function b(e,t,n){return ne(this,void 0,void 0,function(){var r;return re(this,function(o){switch(o.label){case 0:switch(r=e){case"web":return[3,1];case"android":return[3,3];case"ios":return[3,5]}return[3,7];case 1:return[4,p(t,n)];case 2:return[2,o.sent()];case 3:return[4,h(t,n)];case 4:return[2,o.sent()];case 5:return[4,g(t,n)];case 6:return[2,o.sent()];case 7:return[2]}})})}function v(e){var t={title:e.title,body:e.message};return Z.Observable.fromPromise(b(e.type,e.token,t)).flatMap(function(){return Z.Observable.of({status:"success",msg:"message sent to token "+e.token})})}function m(e,t,n,r){var o;v(e).subscribe(function(e){o={status:"success",result:e}},function(e){o={status:"failure",result:e}},function(){console.info(o),n.send(JSON.stringify(o))})}function y(e){return Z.Observable.create(function(t){ue.findOneAndUpdate({token:e.token},e,{upsert:!0,new:!0},function(e,n){e&&(console.log(e),t.error({status:"failure",msg:"database error"})),t.next({status:"success",msg:"token saved",result:n}),t.complete()})})}function k(e){return Z.Observable.create(function(t){ue.findOne({token:e},function(e,n){e&&(console.log(e),t.error({status:"failure",msg:"database error"})),t.next(n),t.complete()})})}function w(e){return Z.Observable.create(function(t){ue.find({userId:e},function(e,n){console.log("findTokensStreams"),e&&t.error({status:"failure",msg:"database error"}),console.log(n),t.next(n),t.complete()})})}function O(e){return Z.Observable.create(function(t){fe.find({userId:e},function(e,n){e&&t.error({status:"failure",msg:"database error",err:e});var r=n.map(function(e){return e.deviceGroup});t.next(r),t.complete()})})}function _(e){return Z.Observable.create(function(t){fe.findOne({deviceGroup:e},function(e,n){e&&t.error({status:"failure",msg:"database error",err:e}),t.next(n.tokens),t.complete()})}).flatMap(function(e){if(e){var t=e.map(function(e){return k(e)});return Z.Observable.merge.apply(Z.Observable,t).reduce(function(e,t){return e.concat([t])},[])}return Z.Observable.of([])})}function I(e,t){return _(t).flatMap(function(n){if(console.log("in checkTokenFromDeviceGroupStream flatmap"),console.log(n),n.length>0){return n.map(function(e){return e.token}).indexOf(e)>=0?Z.Observable.of({deviceGroup:t,found:!0}):Z.Observable.of({deviceGroup:t,found:!1})}return Z.Observable.of({deviceGroup:t,found:!1})})}function S(e){return Z.Observable.create(function(t){fe.findOne({deviceGroup:e.deviceGroup},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n});var o;if(r){var s=r.tokens.concat([e.token]).reduce(function(e,t){return e.indexOf(t)<0&&e.push(t),e},[]);o={deviceGroup:r.deviceGroup,userId:r.userId,tokens:s}}else o={deviceGroup:e.deviceGroup,userId:e.userId,tokens:[e.token]};fe.findOneAndUpdate({deviceGroup:e.deviceGroup},o,{upsert:!0,new:!0},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n}),t.next({status:"success",msg:"token saved to device group "+e.deviceGroup,result:r}),t.complete()})})})}function E(e){return Z.Observable.create(function(t){fe.findOne({deviceGroup:e.deviceGroup},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n}),r||t.error({status:"failure",msg:"record not found"});var o;1===r.tokens.length?fe.remove({deviceGroup:e.deviceGroup},function(n){n&&t.error({status:"failure",msg:"database error",err:n}),t.next({status:"success",msg:"token deleted from device group "+e.deviceGroup}),t.complete()}):(o={deviceGroup:r.deviceGroup,userId:r.userId,tokens:r.tokens.filter(function(t){return t!==e.token})},fe.findOneAndUpdate({deviceGroup:e.deviceGroup},o,{upsert:!0,new:!0},function(n,r){n&&t.error({status:"failure",msg:"database error",err:n}),t.next({status:"success",msg:"token deleted from device group "+e.deviceGroup}),t.complete()}))})})}function x(e,t){var n="https://iid.googleapis.com/iid/v1/"+e+"/rel/topics/"+t;return fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY}}).then(function(e){return e.json()})}function G(e,t){return fetch("https://iid.googleapis.com/iid/v1:batchRemove",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY},body:JSON.stringify({to:"/topics/"+t,registration_tokens:[e]})}).then(function(e){return e.text()})}function N(e,t){return fetch("https://fcm.googleapis.com/fcm/send",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"key="+process.env.FIREBASE_SERVER_KEY},body:JSON.stringify({to:"/topics/"+t,notification:e})}).then(function(e){return e.json()})}function A(e){return console.log(e),Z.Observable.fromPromise(i(e)).flatMap(function(e){return Z.Observable.of({status:"success",msg:"created notification key successfully",notification_key:e})}).do(function(){console.log("created notification key")})}function T(e,t,n,r){var o=(e.userId,e.token),s=(e.lang,{status:"success",result:[]}),i="zh-hk"===e.lang?"zh_hk":"en",u=e.userId+"_"+i,a=A(e),c=y(e),f=S({deviceGroup:u,userId:e.userId,token:e.token});k(o).flatMap(function(t){return console.log("querying token info for first loading"),console.log(t),t.hasOwnProperty("token")?O(e.userId).flatMap(function(){return a}).flatMap(function(e){return Z.Observable.merge(c,f)}):Z.Observable.of({status:"success",msg:"token already exists in database"})}).flatMap(function(e){return Z.Observable.fromPromise(x(o,"test"))}).flatMap(function(e){return Z.Observable.fromPromise(x(o,"welcome__"+i))}).flatMap(function(e){console.info("after subscribeTokenToTopic"),console.log(e);var t={body:"qwerty",title:"qwerty"};return Z.Observable.fromPromise(N(t,"test"))}).flatMap(function(e){return console.info("after sendMsgToTopic"),console.log(e),Z.Observable.of({status:"success",msg:"success"})}).subscribe(function(e){s.result.push(e)},function(e){s.status="failure",s.result.push({status:"failure",result:e}),n.send(JSON.stringify(s))},function(){n.send(JSON.stringify(s))})}function P(e,t,n,r){console.log("retrieveTokensHandler");var o={status:"success",result:""};w(e).subscribe(function(e){o.result=e},function(e){o.status="failure",o.result={status:"failure",result:e},n.send(JSON.stringify(o))},function(){n.send(JSON.stringify(o))})}function M(e,t,n,r){var o={status:"success",result:[]};O(e).subscribe(function(e){o.result=e},function(e){o.result={status:"failure",result:e},n.send(JSON.stringify(o))},function(){n.send(JSON.stringify(o))})}function j(e,t,n,r){var o={status:"success",result:""};_(e).subscribe(function(e){o.result=e},function(e){o.status="failure",o.result=e,n.send(JSON.stringify(o))},function(){n.send(JSON.stringify(o))})}function z(e){var t="zh-hk"===e.lang?"zh_hk":"en",n=e.userId+"_"+t,r=A(e),o=y(e),s=S({deviceGroup:n,userId:e.userId,token:e.token});return r.flatMap(function(e){return o}).flatMap(function(e){return s})}function J(e){var t="zh-hk"===e.lang?"zh_hk":"en",n=e.userId+"_"+t;return Z.Observable.fromPromise(u(e)).flatMap(function(t){return console.log("\n\n\n\n"),console.log("after removeToken"),console.log(t),E({deviceGroup:n,userId:e.userId,token:e.token})})}function B(e,t,n){var r,o,s=e.body,i=s.userId,u=s.token,a=s.targetLang,c="zh-hk"===a?"zh_hk":"en",f=i+"_"+c,l="broadcast__"+c,d={status:"success",result:""};k(u).flatMap(function(e){return o=e,Z.Observable.of(o)}).flatMap(function(e){return O(i)}).flatMap(function(e){if(e.length>0){var t=e.map(function(e){return I(u,e)});return Z.Observable.merge.apply(Z.Observable,t).filter(function(e){return console.log(e),e.found}).reduce(function(e,t){return t.found?t.deviceGroup:e},"")}return Z.Observable.throw("Original Device Group Not Found")}).flatMap(function(e){return r=e,J({type:o.type,token:u,userId:i,lang:o.lang})}).flatMap(function(e){return z({type:o.type,token:u,userId:i,lang:a})}).flatMap(function(e){var t="zh-hk"===o.lang?"zh_hk":"en";return console.log("unsubscribing token from broadcast__"+t),Z.Observable.fromPromise(G(o.token,"broadcast__"+t))}).flatMap(function(e){return console.log("subscribing token to "+l),Z.Observable.fromPromise(x(o.token,l))}).flatMap(function(e){return console.log("token info"),console.log(o),y({type:o.type,lang:a,token:o.token,userId:o.userId})}).flatMap(function(e){return Z.Observable.of({status:"success",msg:"Device Group changed from "+r+" to "+f})}).subscribe(function(e){d.result=e},function(e){d.status="failure",d.result={status:"failure",result:e},t.send(JSON.stringify(d))},function(){t.send(JSON.stringify(d))})}function R(e,t,n){var r=new he({userId:e.body.userId,password:e.body.password});he.findOne({userId:e.body.userId},function(o,s){if(o&&t.send({status:"failure",msg:"database error"}),s)return void t.send({status:"failure",msg:"Account with that userId "+e.body.userId+" already exists."});r.save(function(e){if(e)return n(e);var o=ge.sign({id:r._id},"linkinpark",{expiresIn:86400});t.send({status:"success",auth:!0,token:o})})})}function F(e,t,n){he.findOne({userId:e.body.userId},function(n,r){if(n)return t.status(500).send("Error on the server.");if(!r)return t.status(404).send("No user found.");if(!le.compareSync(e.body.password,r.password))return t.status(401).send({auth:!1,token:null});var o=ge.sign({id:r._id},"linkinpark",{expiresIn:86400});t.status(200).send({auth:!0,token:o})})}function q(e,t,n){var r=e.headers["x-access-token"];if(!r)return t.status(401).send({auth:!1,message:"No token provided."});ge.verify(r,"linkinpark",function(e,n){if(e)return t.status(500).send({auth:!1,message:"Failed to authenticate token."});t.status(200).send({auth:!0,message:"Authenticated with token!",decoded:n})})}function C(e,t,n,r){he.findOne({userId:e},function(e,t){if(e)return r(e);t?n.send({status:"found",msg:"Account with that user id already exists."}):n.send({status:"not found",msg:"Account with that user id is available."})})}function K(e,t,n,r){var o=e.topic,s=e.msg,i={status:"success",result:""};Z.Observable.fromPromise(N(s,o)).flatMap(function(e){return e.error?Z.Observable.throw("fail to send message"):Z.Observable.of("message sent")}).subscribe(function(e){i.result=e},function(e){i.status="failure",i.result.push({status:"failure",result:e}),n.send(JSON.stringify(i))},function(){n.send(JSON.stringify(i))})}function D(e,t,n,r){var o={status:"success",result:""},s=e.lang,i=e.msg,u="zh-hk"===s?"zh_hk":"en";Z.Observable.fromPromise(N(i,"broadcast__"+u)).flatMap(function(e){return e.error?Z.Observable.throw("fail to send message"):Z.Observable.of("message sent")}).subscribe(function(e){o.result=e},function(e){o.status="failure",o.result.push({status:"failure",result:e}),n.send(JSON.stringify(o))},function(){n.send(JSON.stringify(o))})}function Q(e,t,n){var r={status:"success",result:""},o=[{topic:"broadcast__en",msg:{title:"Welcome",body:"Welcome to Ice Ice Baby"}},{topic:"broadcast__zh_hk",msg:{title:"你好",body:"歡迎加入Ice Ice Baby"}}],s=o.map(function(e){var t=e.topic,n=e.msg;return Z.Observable.fromPromise(N(n,t)).flatMap(function(e){return e.error?Z.Observable.throw("fail to send message"):Z.Observable.of("message sent")})});Z.Observable.merge.apply(Z.Observable,s).reduce(function(e,t){return e+t},"").subscribe(function(e){r.result=e},function(e){r.status="failure",r.result.push({status:"failure",result:e}),t.send(JSON.stringify(r))},function(){t.send(JSON.stringify(r))})}function Y(e){return be(this,void 0,void 0,function(){var t,n;return ve(this,function(r){return(t=e.headers["x-access-token"])?(n=new Promise(function(e,n){ge.verify(t,"linkinpark",function(t,n){t&&e(-1),e(1)})}),[2]):[2,-1]})})}function W(e){var t=this;e.use(function(e,n,r){return be(t,void 0,void 0,function(){var t,o;return ve(this,function(s){switch(s.label){case 0:return(e.url.indexOf("/user/")>=0||e.url.indexOf("/api/")>=0)&&e.url.indexOf("/user/login")<0&&e.url.indexOf("/user/signup")<0?(console.log("verifying token"),t=e.headers["x-access-token"],t?[4,new Promise(function(e,n){ge.verify(t,"linkinpark",function(t,n){t&&e(!1),e(!0)})})]:[2,n.status(401).send({auth:!1,message:"No token provided."})]):[3,2];case 1:return o=s.sent(),(console.log("finishing verifying token"),o)?(r(),[3,3]):[2,n.status(500).send({auth:!1,message:"Failed to authenticate token."})];case 2:r(),s.label=3;case 3:return[2]}})})}),e.get("/api/device-group/groups/:userId",function(e,t,n){M(e.params.userId,e,t,n)}),e.get("/api/device-group/tokens/:userId/:lang",function(e,t,n){var r="zh-hk"===e.params.lang?"zh_hk":"en";j(e.params.userId+"_"+r,e,t,n)}),e.post("/api/device-group/change-lang",function(e,t,n){B(e,t,n)}),e.post("/api/direct-message",function(e,t,n){var r=e.body;m({title:r.title,message:r.message,token:r.token,type:r.type},e,t,n)}),e.post("/api/custom-message",function(e,t,n){f(e.body,e,t,n)}),e.post("/api/topic-message",function(e,t,n){K(e.body,e,t,n)}),e.post("/api/broadcast-message",function(e,t,n){D(e.body,e,t,n)}),e.post("/api/welcome-message",function(e,t,n){Q(e,t,n)}),e.post("/api/token",function(e,t,n){console.log("handling api/token");var r=e.body;T({type:r.type,lang:r.lang,token:r.token,userId:r.userId},e,t,n)}),e.get("/api/tokens/:userId",function(e,t,n){console.log("/api/tokens/:userId"),console.log(e.params.userId),P(e.params.userId,e,t,n)}),e.post("/user/signup",function(e,t,n){R(e,t,n)}),e.get("/user/check/:userId",function(e,t,n){C(e.params.userId,e,t,n)}),e.post("/user/login",function(e,t,n){F(e,t,n)}),e.post("/user/auth",function(e,t,n){q(e,t,n)})}Object.defineProperty(t,"__esModule",{value:!0});var Z=n(0),U=(n(8),n(9),n(1)),V=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function u(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,u)}a((r=r.apply(e,t||[])).next())})},L=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,s=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(i=a.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){a.label=n[1];break}if(6===n[0]&&a.label<i[1]){a.label=i[1],i=n;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(n);break}i[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(e,a)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,u,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},H=(n(4),n(2),this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function u(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,u)}a((r=r.apply(e,t||[])).next())})}),X=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,s=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(i=a.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){a.label=n[1];break}if(6===n[0]&&a.label<i[1]){a.label=i[1],i=n;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(n);break}i[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(e,a)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,u,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},$=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},ee=(n(10),n(4)),te="https://www.googleapis.com/auth/firebase.messaging",ne=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function u(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,u)}a((r=r.apply(e,t||[])).next())})},re=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,s=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(i=a.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){a.label=n[1];break}if(6===n[0]&&a.label<i[1]){a.label=i[1],i=n;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(n);break}i[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(e,a)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,u,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},oe=n(3),se=new oe.Schema({userId:String,token:String,lang:String,type:String},{timestamps:!0}),ie=oe.model("Token",se),ue=ie,ae=new oe.Schema({deviceGroup:String,userId:String,tokens:[String]},{timestamps:!0}),ce=oe.model("DeviceGroup",ae),fe=ce,le=n(5),de=new oe.Schema({userId:String,password:String},{timestamps:!0});de.pre("save",function(e){var t=this;if(!t.isModified("password"))return e();le.genSalt(10,function(n,r){if(n)return e(n);le.hash(t.password,r,void 0,function(n,r){if(n)return e(n);t.password=r,e()})})}),de.methods.comparePassword=function(e,t){le.compare(e,this.password,function(e,n){t(e,n)})};var pe=oe.model("User",de),he=pe,ge=n(6);t.verifyAuthToken=Y,t.default=W;var be=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function u(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,u)}a((r=r.apply(e,t||[])).next())})},ve=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,s=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(i=a.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){a.label=n[1];break}if(6===n[0]&&a.label<i[1]){a.label=i[1],i=n;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(n);break}i[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(e,a)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,u,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u}},function(e,t){e.exports=require("firebase/database")},function(e,t){e.exports=require("firebase/auth")},function(e,t){e.exports=require("firebase/app")}]);