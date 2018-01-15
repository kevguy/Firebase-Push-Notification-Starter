module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("rxjs/Rx");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getLangKey;
/* harmony export (immutable) */ __webpack_exports__["b"] = getDeviceGroupName;
/* harmony export (immutable) */ __webpack_exports__["a"] = getBroadcastTopicName;
/* harmony export (immutable) */ __webpack_exports__["d"] = handler;
var LangMap = {
    'zh-hk': 'zh_hk',
    'en': 'en'
};
function getLangKey(lang) {
    return LangMap[lang];
}
function getDeviceGroupName(userId, lang) {
    return userId + '_' + getLangKey(lang);
}
function getBroadcastTopicName(lang) {
    return 'broadcast' + '__' + getLangKey(lang);
}
/**
 * Handles the Observable given and sends appropriate response
 * the message will be in device's chosen language
 * @param stream {Observable<any>} the Observable
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function handler(stream, req, res, next) {
    var payload = {
        status: 'success',
        result: ''
    };
    stream.subscribe(function (result) { payload.result = result; }, function (err) {
        payload.status = 'failure';
        payload.result = err;
        res.send(JSON.stringify(payload));
    }, function () { res.send(JSON.stringify(payload)); });
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = saveTokenStream;
/* harmony export (immutable) */ __webpack_exports__["b"] = queryTokenStream;
/* harmony export (immutable) */ __webpack_exports__["a"] = findTokensStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Token__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);


function saveTokenStream(data) {
    // const token = new Token({
    //   userId: data.userId,
    //   token: data.token,
    //   lang: data.lang,
    //   type: data.type
    // });
    // The upsert = true option creates the object if it doesn't exist. defaults to false.
    // https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
    var stream = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
        __WEBPACK_IMPORTED_MODULE_0__models_Token__["a" /* default */].findOneAndUpdate({ token: data.token }, data, { upsert: true, new: true }, function (err, existingToken) {
            if (err) {
                console.log(err);
                observer.error({ status: 'failure', msg: 'database error' });
            }
            observer.next({ status: 'success', msg: 'token saved', result: existingToken });
            observer.complete();
        });
    })
        .do(function (res) {
        console.info("[TokenController/saveTokenStream]: token saved to database");
    });
    return stream;
}
;
function queryTokenStream(token) {
    var stream = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
        __WEBPACK_IMPORTED_MODULE_0__models_Token__["a" /* default */].findOne({ token: token }, function (err, result) {
            if (err) {
                console.log(err);
                observer.error({ status: 'failure', msg: 'database error' });
            }
            observer.next(result);
            observer.complete();
        });
    })
        .do(function (res) {
        console.info("[TokenController/queryTokenStream]: queried token");
    });
    return stream;
}
function findTokensStream(userId) {
    var stream = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
        __WEBPACK_IMPORTED_MODULE_0__models_Token__["a" /* default */].find({ userId: userId }, function (err, records) {
            if (err) {
                observer.error({ status: 'failure', msg: 'database error' });
            }
            if (records) {
                observer.next(records);
            }
            else {
                observer.next([]);
            }
            observer.complete();
        });
    })
        .do(function (res) {
        console.info("[TokenController/findTokensStream]: found token");
    });
    return stream;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = queryDeviceGroupStream;
/* harmony export (immutable) */ __webpack_exports__["d"] = queryTokenListFromDeviceGroupStream;
/* harmony export (immutable) */ __webpack_exports__["b"] = checkTokenFromDeviceGroupStream;
/* harmony export (immutable) */ __webpack_exports__["a"] = addTokenToDeviceGroupStream;
/* harmony export (immutable) */ __webpack_exports__["e"] = removeTokenFromDeviceGroupStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TokenController__ = __webpack_require__(2);



function queryDeviceGroupStream(userId) {
    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
        __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__["a" /* default */].find({ userId: userId }, function (err, result) {
            console.log('queryDeviceGroupStream');
            if (err) {
                observer.error({ status: 'failure', msg: 'database error', err: err });
            }
            var itemsToBeSent = result.map(function (item) { return (item.deviceGroup); });
            observer.next(itemsToBeSent);
            observer.complete();
        });
    })
        .do(function (res) { console.info("[queryDeviceGroupStream]: " + res); });
}
function queryTokenListFromDeviceGroupStream(deviceGroup) {
    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
        __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__["a" /* default */].findOne({ deviceGroup: deviceGroup }, function (err, result) {
            console.log('queryTokenListFromDeviceGroupStream');
            if (err) {
                observer.error({ status: 'failure', msg: 'database error', err: err });
            }
            if (result) {
                observer.next(result.tokens);
            }
            else {
                observer.next([]);
            }
            observer.complete();
        });
    })
        .do(function (res) { console.info("[queryTokenListFromDeviceGroupStream]: list of tokens " + res); })
        .flatMap(function (result) {
        if (result) {
            var streams = result.map(function (item) { return Object(__WEBPACK_IMPORTED_MODULE_2__TokenController__["b" /* queryTokenStream */])(item); });
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"], streams).reduce(function (acc, curr) { return acc.concat([curr]); }, []);
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of([]);
    })
        .do(function (res) {
        console.info("[queryTokenListFromDeviceGroupStream]: retrieved tokens info: ");
        console.info(res);
    });
}
function checkTokenFromDeviceGroupStream(token, deviceGroup) {
    // query token list from device group, then verify if token exists
    var stream = queryTokenListFromDeviceGroupStream(deviceGroup)
        .flatMap(function (result) {
        console.log('in checkTokenFromDeviceGroupStream flatmap');
        console.log(result);
        if (result.length > 0) {
            var arr = result.map(function (item) { return item.token; });
            if (arr.indexOf(token) >= 0) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of({
                    deviceGroup: deviceGroup,
                    found: true
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of({
                    deviceGroup: deviceGroup,
                    found: false
                });
            }
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of({
                deviceGroup: deviceGroup,
                found: false
            });
        }
    })
        .do(function (result) {
        console.info("[checkTokenFromDeviceGroupStream]: tokenlist");
        console.info(result);
    });
    return stream;
}
function addTokenToDeviceGroupStream(data) {
    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
        __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__["a" /* default */].findOne({ deviceGroup: data.deviceGroup }, function (err, existingGroup) {
            console.log('addTokenToDeviceGroupStream');
            if (err) {
                observer.error({ status: 'failure', msg: 'database error', err: err });
            }
            var deviceGroupData;
            console.log('existingGroup');
            console.log(existingGroup);
            if (existingGroup) {
                // https://stackoverflow.com/questions/31775150/node-js-mongodb-the-immutable-field-id-was-found-to-have-been-altered
                var newTokensArr = existingGroup.tokens.concat([data.token]).reduce(function (a, b) {
                    if (a.indexOf(b) < 0)
                        a.push(b);
                    return a;
                }, []);
                deviceGroupData = {
                    deviceGroup: existingGroup.deviceGroup,
                    userId: existingGroup.userId,
                    tokens: newTokensArr
                };
            }
            else {
                deviceGroupData = {
                    deviceGroup: data.deviceGroup,
                    userId: data.userId,
                    tokens: [data.token]
                };
            }
            __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__["a" /* default */].findOneAndUpdate({ deviceGroup: data.deviceGroup }, deviceGroupData, { upsert: true, new: true }, function (err, existingGroup) {
                if (err) {
                    observer.error({ status: 'failure', msg: 'database error', err: err });
                }
                observer.next({ status: 'success', msg: "token saved to device group " + data.deviceGroup, result: existingGroup });
                observer.complete();
            });
        });
    })
        .do(function (res) {
        console.info("[addTokenToDeviceGroupStream]: token saved to device group " + data.deviceGroup);
    });
}
function removeTokenFromDeviceGroupStream(data) {
    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
        __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__["a" /* default */].findOne({ deviceGroup: data.deviceGroup }, function (err, existingGroup) {
            console.log('removeTokenFromDeviceGroupStream');
            console.log(existingGroup);
            console.log(data.deviceGroup);
            if (err) {
                observer.error({ status: 'failure', msg: 'database error', err: err });
            }
            if (!existingGroup) {
                observer.error({ status: 'failure', msg: 'record not found' });
            }
            var deviceGroupData;
            if (existingGroup.tokens.length === 1) {
                // delete the record
                __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__["a" /* default */].remove({ deviceGroup: data.deviceGroup }, function (err) {
                    if (err) {
                        observer.error({ status: 'failure', msg: 'database error', err: err });
                    }
                    observer.next({ status: 'success', msg: "token deleted from device group " + data.deviceGroup });
                    observer.complete();
                });
            }
            else {
                deviceGroupData = {
                    deviceGroup: existingGroup.deviceGroup,
                    userId: existingGroup.userId,
                    tokens: existingGroup.tokens.filter(function (item) { return (item !== data.token); })
                };
                __WEBPACK_IMPORTED_MODULE_0__models_DeviceGroup__["a" /* default */].findOneAndUpdate({ deviceGroup: data.deviceGroup }, deviceGroupData, { upsert: true, new: true }, function (err, existingGroup) {
                    if (err) {
                        observer.error({ status: 'failure', msg: 'database error', err: err });
                    }
                    observer.next({ status: 'success', msg: "token deleted from device group " + data.deviceGroup });
                    observer.complete();
                });
            }
        });
    })
        .do(function (res) {
        console.info("[removeTokenFromDeviceGroupStream]: token saved to device group " + data.deviceGroup);
    });
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("firebase/messaging");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = retrieveNotificationKey;
/* harmony export (immutable) */ __webpack_exports__["a"] = addToken;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeToken;
/* harmony export (immutable) */ __webpack_exports__["d"] = sendNotification;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_messaging__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_messaging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_messaging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/**
 * Create notification key for a user's group
 * @param userId {string} user's user id
 * @param token {string} user's token for firebase
 * @param lang {string} chosen language ('en' or 'zh-hk')
 * @returns {Promise<any>} success/fail status
 * note that this needs at least one token to work
 * https://firebase.google.com/docs/cloud-messaging/js/device-group
 */
function createNotificationKey(record) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, token, lang, langKey, notificationKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.info('[DeviceGroup/createNotificationKey]: createNotificationKey()');
                    console.info(record);
                    userId = record.userId, token = record.token, lang = record.lang;
                    langKey = __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getLangKey */](lang);
                    return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__('https://android.googleapis.com/gcm/notification', {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': "key=" + process.env.FIREBASE_SERVER_KEY,
                                'project_id': process.env.FIREBASE_MESSAGING_SENDER_ID
                            }),
                            body: JSON.stringify({
                                'operation': 'create',
                                'notification_key_name': userId + "_" + langKey,
                                'registration_ids': [token]
                            })
                        })
                            .then(function (res) { return res.json(); })
                            .catch(function (err) {
                            console.error("[DeviceGroup/createNotificationKey]: failed to create notification key: " + err);
                            throw new Error(err);
                        })];
                case 1:
                    notificationKey = _a.sent();
                    console.info("[DeviceGroup/createNotificationKey]: notification key is: " + notificationKey);
                    return [2 /*return*/, notificationKey['notification_key']];
            }
        });
    });
}
/**
 * Retrieve user's notification key for their device group
 * @param userId {string} user's user id
 * @param lang {string} chosen language ('en' or 'zh-hk')
 * @returns {Promise<any>} retrieved data, undefined if record can't be found
 */
function retrieveNotificationKey(record) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, lang, langKey, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.info('[DeviceGroup/retrieveNotificationKey]: retrieveNotificationKey()');
                    console.info(record);
                    userId = record.userId, lang = record.lang;
                    langKey = __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getLangKey */](lang);
                    return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__("https://android.googleapis.com/gcm/notification?notification_key_name=" + userId + "_" + langKey, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': "key=" + process.env.FIREBASE_SERVER_KEY,
                                'project_id': process.env.FIREBASE_MESSAGING_SENDER_ID
                            }),
                            body: JSON.stringify({})
                        })
                            .then(function (res) { return res.json(); })
                            .then(function (res) {
                            if (res.error) {
                                console.error("[DeviceGroup/retrieveNotificationKey]: failed to retrieve notification key from userId " + userId + ": " + res.error);
                                // throw new Error(res.error);
                                return undefined;
                            }
                            return res;
                        })];
                case 1:
                    result = _a.sent();
                    console.info("[DeviceGroup/retrieveNotificationKey]: notification key is: " + result);
                    if (result) {
                        return [2 /*return*/, result['notification_key']];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
/**
 * Token operation to a user's device group
 * @param operator {string} add/remove
 * @param record {TokenRecord} record
 * @returns {Promise<any>} success/fail status
 */
function tokenOp(operator, record) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, token, lang, type, langKey, notificationKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.info("[DeviceGroup/tokenOp]: tokenOp(): " + operator);
                    console.info(record);
                    userId = record.userId, token = record.token, lang = record.lang, type = record.type;
                    langKey = __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* getLangKey */](lang);
                    return [4 /*yield*/, retrieveNotificationKey(record)];
                case 1:
                    notificationKey = _a.sent();
                    console.info("[DeviceGroup/tokenOp]: trying to retrieve notificationkey: " + notificationKey);
                    if (!!notificationKey) return [3 /*break*/, 3];
                    return [4 /*yield*/, createNotificationKey(record)];
                case 2:
                    notificationKey = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    console.info("[DeviceGroup/tokenOp]: " + operator + "ing token to device group");
                    return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__('https://android.googleapis.com/gcm/notification', {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': "key=" + process.env.FIREBASE_SERVER_KEY,
                                'project_id': process.env.FIREBASE_MESSAGING_SENDER_ID
                            }),
                            body: JSON.stringify({
                                'operation': operator,
                                'notification_key_name': userId + "_" + langKey,
                                'notification_key': notificationKey,
                                'registration_ids': [token]
                            })
                        })
                            .then(function (res) { return res.text(); })
                            .then(function (res) {
                            console.info("[DeviceGroup/tokenOp]: response is " + operator);
                            var response = JSON.parse(res);
                            if (response.error) {
                                console.error("[DeviceGroup/retrieveNotificationKey]: failed to " + operator + " token " + token + " to notification key: " + notificationKey);
                                throw new Error(res);
                            }
                            return res;
                        })];
                case 4:
                    notificationKey = _a.sent();
                    _a.label = 5;
                case 5: 
                // if (notificationKey) {
                //   console.log('saving stuff to database');
                //   const database = setupDatabase(getConfig());
                //   const signInResult = await signIn(getConfig());
                //   console.log('signed in');
                //   // save to database
                //   const newChildRef = database.ref(`deviceGroup/${userId}_${langKey}`).push();
                //   // console.log(`new key is ${newChildRef.key}`)
                //
                //   // this should work too
                //   // return newChildRef.set({ type, token });
                //   console.log('saving stuff to database');
                //   await database.ref(`deviceGroup/${userId}_${langKey}/${newChildRef.key}`).set({ type, token });
                // }
                return [2 /*return*/, notificationKey];
            }
        });
    });
}
/**
 * Add token to a user's device group
 * @param record {TokenRecord} record
 * @returns {Promise<any>} success/fail status
 */
function addToken(record) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenOp('add', record)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Remove token from user's device group
 * @param record {TokenRecord} record
 * @returns {Promise<any>} retrieved data, undefined if record can't be found
 */
function removeToken(record) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenOp('remove', record)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Send push notification to a device group
 * @param type {TokenType} the type of the token according to platform
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
function sendNotification(notificationKey, msg) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.info("[DeviceGroup/sendNotification]: sendNotification()");
                    return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__('https://fcm.googleapis.com/fcm/send', {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': "key=" + process.env.FIREBASE_SERVER_KEY,
                                'project_id': process.env.FIREBASE_SERVER_KEY
                            }),
                            body: JSON.stringify({
                                to: notificationKey,
                                notification: msg,
                            })
                        })
                            .then(function (res) { return res.json(); })
                            .then(function (result) {
                            if (result.error) {
                                console.error("[DeviceGroup/sendNotification]: error: " + result.error);
                                throw new Error(result);
                            }
                            return result;
                        })];
                case 1:
                    result = _a.sent();
                    // .catch((err) => { console.error(err); return err; });
                    return [2 /*return*/, result];
            }
        });
    });
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export topicsSubscriptionStream */
/* harmony export (immutable) */ __webpack_exports__["a"] = addTokenStream;
/* harmony export (immutable) */ __webpack_exports__["c"] = removeTokenStream;
/* harmony export (immutable) */ __webpack_exports__["b"] = saveTokenStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__database_controllers_TokenController__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_controllers_DeviceGroupController__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__topicSubscription__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notificationKey__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__custom_firebase_push_notification_device_group__ = __webpack_require__(6);







/**
 * Create Observable for subscribing token to the `test` topic
 * and the broadcast topic for corresponding language
 * @param token {string} user's token
 * @param lang {LangType} user's chosen language
 * @returns {Observable} the Observable
 */
function topicsSubscriptionStream(token, lang) {
    var topicName = __WEBPACK_IMPORTED_MODULE_3__index__["a" /* getBroadcastTopicName */](lang);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].merge(Object(__WEBPACK_IMPORTED_MODULE_4__topicSubscription__["a" /* subscribeTopicStream */])(token, 'test'), Object(__WEBPACK_IMPORTED_MODULE_4__topicSubscription__["a" /* subscribeTopicStream */])(token, topicName))
        .last()
        .do(function (res) {
        console.info("[saveToken/topicsSubscriptionStream]: token subscribed to test and " + topicName);
    });
}
function addTokenStream(record) {
    var userId = record.userId, token = record.token, lang = record.lang;
    var deviceGroupName = __WEBPACK_IMPORTED_MODULE_3__index__["b" /* getDeviceGroupName */](record.userId, record.lang);
    // since token doesn't exist in database
    // find notification key for the device group and save the token to Firebase
    // save the token to MongoDB (both Token and DeviceGroup)
    var saveTokenStream = __WEBPACK_IMPORTED_MODULE_1__database_controllers_TokenController__["c" /* saveTokenStream */](record)
        .do(function (res) {
        console.info("[saveToken/addTokenStream]: token saved to token database");
    });
    var addTokenToDeviceGroupStream = __WEBPACK_IMPORTED_MODULE_2__database_controllers_DeviceGroupController__["a" /* addTokenToDeviceGroupStream */]({
        deviceGroup: deviceGroupName,
        userId: record.userId,
        token: record.token
    })
        .do(function (res) {
        console.info("[saveToken/addTokenStream]: token saved to device group database");
    });
    return Object(__WEBPACK_IMPORTED_MODULE_5__notificationKey__["a" /* createNotificationKeyStream */])(record)
        .flatMap(function (result) { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].merge(saveTokenStream, addTokenToDeviceGroupStream); })
        .last()
        .flatMap(function (result) { return topicsSubscriptionStream(token, lang); });
}
function removeTokenStream(record) {
    var deviceGroupName = __WEBPACK_IMPORTED_MODULE_3__index__["b" /* getDeviceGroupName */](record.userId, record.lang);
    var topicName = __WEBPACK_IMPORTED_MODULE_3__index__["a" /* getBroadcastTopicName */](record.lang);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"]
        .fromPromise(__WEBPACK_IMPORTED_MODULE_6__custom_firebase_push_notification_device_group__["b" /* removeToken */](record))
        .flatMap(function (result) { return Object(__WEBPACK_IMPORTED_MODULE_4__topicSubscription__["b" /* unsubscribeTopicStream */])(record.token, topicName); })
        .flatMap(function (res) { return __WEBPACK_IMPORTED_MODULE_2__database_controllers_DeviceGroupController__["e" /* removeTokenFromDeviceGroupStream */]({
        deviceGroup: deviceGroupName,
        userId: record.userId,
        token: record.token
    }); });
}
function saveTokenStream(record) {
    var userId = record.userId, token = record.token, lang = record.lang;
    var stream = __WEBPACK_IMPORTED_MODULE_1__database_controllers_TokenController__["b" /* queryTokenStream */](token)
        .do(function (res) {
        console.info("[saveToken]: queried if token exists in database");
    })
        .flatMap(function (res) {
        console.log(res);
        if (!res || !res.hasOwnProperty('token')) {
            return addTokenStream(record);
        }
        // token is found in MongoDb, see if need to change lang
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].of(1); // dummy value indicating token is found in MongoDb
    })
        .do(function (res) {
        console.info("[saveToken]: token updated/created");
    })
        .map(function (result) { return ({
        status: 'success',
        msg: 'successfully saved/created token'
    }); });
    return stream;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = subscribeTokenToTopic;
/* harmony export (immutable) */ __webpack_exports__["d"] = unsubscribeFromTopic;
/* harmony export (immutable) */ __webpack_exports__["a"] = sendMsgToTopic;
/* harmony export (immutable) */ __webpack_exports__["b"] = sendMsgToTopics;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(9);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

// https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
/**
 * success => {}
 * fail => { error: '...' }
 */
function subscribeTokenToTopic(token, topic) {
    var url = "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic;
    var result = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "key=" + process.env.FIREBASE_SERVER_KEY
        }
    })
        .then(function (res) { return res.json(); });
    return result;
}
// https://stackoverflow.com/questions/42947506/unsubscribe-from-a-topic-in-fcm-web
function unsubscribeFromTopic(token, topic) {
    var url = "https://iid.googleapis.com/iid/v1:batchRemove";
    var result = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "key=" + process.env.FIREBASE_SERVER_KEY
        },
        body: JSON.stringify({
            to: "/topics/" + topic,
            registration_tokens: [token]
        })
    })
        .then(function (res) { return res.text(); });
    return result;
}
/**
 * //Success example:
 * {
 *   "message_id": "1023456"
 * }
 *
 * //failure example:
 * {
 *   "error": "TopicsMessageRateExceeded"
 * }
 */
function sendMsgToTopic(msg, topic) {
    return __awaiter(this, void 0, void 0, function () {
        var url, result;
        return __generator(this, function (_a) {
            url = "https://fcm.googleapis.com/fcm/send";
            result = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "key=" + process.env.FIREBASE_SERVER_KEY
                },
                body: JSON.stringify({
                    to: "/topics/" + topic,
                    // priority: 'high',
                    notification: msg
                })
            })
                .then(function (res) { return res.json(); });
            return [2 /*return*/, result];
        });
    });
}
/**
 * Send message to multiple topics
 */
function sendMsgToTopics(msg, topics) {
    return __awaiter(this, void 0, void 0, function () {
        var url, condition, accessToken, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://fcm.googleapis.com/v1/projects/" + process.env.FIREBASE_PROJECT_ID + "/messages:send";
                    condition = topics
                        .reduce(function (acc, topic) { return "|| '" + topic + "' in topics " + acc; }, '')
                        .substr(3);
                    console.info(condition);
                    return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getAccessTokenPromise */])()];
                case 1:
                    accessToken = _a.sent();
                    result = fetch(url, {
                        method: 'POST',
                        // headers: {
                        //   'Content-Type': 'application/json',
                        //   'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
                        // },
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + accessToken
                        }),
                        body: JSON.stringify({
                            "message": {
                                "condition": condition,
                                "notification": msg
                            }
                        })
                    })
                        .then(function (res) { return res.json(); });
                    return [2 /*return*/, result];
            }
        });
    });
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setupMessaging */
/* harmony export (immutable) */ __webpack_exports__["a"] = getAccessTokenPromise;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_messaging__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_messaging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase_messaging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(21);
// https://firebase.google.com/docs/web/setup
// https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
// https://firebase.googleblog.com/2016/08/sending-notifications-between-android.html
// https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
// https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native



var google = __webpack_require__(22);
/**
 * Setup Firebase Real-time database
 * @param config {FirebaseConfig} the firebase config
 * @return {Messaging} the firebase database
 */
function setupMessaging(config) {
    if (__WEBPACK_IMPORTED_MODULE_0_firebase_app__["apps"].length === 0) {
        console.log(config);
        __WEBPACK_IMPORTED_MODULE_0_firebase_app__["initializeApp"](config);
    }
    return __WEBPACK_IMPORTED_MODULE_0_firebase_app__["messaging"]();
}
// https://firebase.google.com/docs/cloud-messaging/auth-server
var SCOPES = 'https://www.googleapis.com/auth/firebase.messaging';
function getAccessTokenPromise() {
    return new Promise(function (resolve, reject) {
        var key = Object(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* getServiceAccountInfo */])();
        var jwtClient = new google.auth.JWT(key.client_email, undefined, // null,
        key.private_key, SCOPES, undefined);
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            console.log('fuck');
            console.log(tokens);
            resolve(tokens.access_token);
        });
    });
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createNotificationKeyStream;
/* harmony export (immutable) */ __webpack_exports__["b"] = retrieveNotificationKeyStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_device_group__ = __webpack_require__(6);


/**
 * Create Observable for adding token to a the user's device group
 * and creating notification key for a user's group.
 * It doesn't matter a device group already exists or not,
 * notification key changes all the time
 * @param record {TokenRecord} user's token record
 * @returns {Observable} the Observable
 */
function createNotificationKeyStream(record) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"]
        .fromPromise(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_device_group__["a" /* addToken */](record))
        .do(function (result) {
        console.info("[notificationKey/createNotificationKeyStream]: created notification key (" + result.notification_key + ")");
    });
}
function retrieveNotificationKeyStream(record) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"]
        .fromPromise(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_device_group__["c" /* retrieveNotificationKey */](record))
        .do(function (result) {
        console.info("[notificationKey/retrieveNotificationKey]: retrieved notification key " + result);
    });
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = directMessageStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_individual_device__ = __webpack_require__(28);


function directMessageStream(data) {
    var customMessage = {
        title: data.title,
        body: data.message,
    };
    var stream = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"]
        .fromPromise(Object(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_individual_device__["a" /* default */])(data.type, data.token, customMessage))
        .map(function (result) {
        return ({
            status: 'success',
            msg: "message sent to token " + data.token,
            perf: result
        });
    });
    return stream;
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["verifyAuthToken"] = verifyAuthToken;
/* harmony export (immutable) */ __webpack_exports__["default"] = apiRoutes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_change_lang__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_database_controllers_UserController__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_device_group__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_direct_message__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_topic_op__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_token_op__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_performance_test__ = __webpack_require__(33);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








// verifyAuthToken
// -1 no token provided
// 1 ok
// -1 failed to authenticate token
function verifyAuthToken(req) {
    return __awaiter(this, void 0, void 0, function () {
        var token, jwtPromise;
        return __generator(this, function (_a) {
            token = (req.headers['x-access-token']);
            if (!token)
                return [2 /*return*/, -1];
            jwtPromise = new Promise(function (resolve, reject) {
                __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__["verify"](token, process.env.JWT_SECRET, function (err, decoded) {
                    if (err)
                        resolve(-1);
                    resolve(1);
                });
            });
            return [2 /*return*/];
        });
    });
}
;
function apiRoutes(app) {
    var _this = this;
    app.use(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var token_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((req.url.indexOf('/user/') >= 0 ||
                        req.url.indexOf('/api/') >= 0) &&
                        req.url.indexOf('/user/login') < 0 &&
                        req.url.indexOf('/user/signup') < 0)) return [3 /*break*/, 2];
                    // verify token
                    console.log('verifying token');
                    token_1 = (req.headers['x-access-token']);
                    if (!token_1)
                        return [2 /*return*/, res.status(401).send({ auth: false, message: 'No token provided.' })];
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__["verify"](token_1, process.env.JWT_SECRET, function (err, decoded) {
                                if (err)
                                    resolve(false);
                                // res.status(200).send(decoded);
                                // res.status(200).send({ auth: true, message: 'Authenticated with token.' });
                                resolve(true);
                            });
                        })];
                case 1:
                    result = _a.sent();
                    console.log('finishing verifying token');
                    if (result) {
                        next();
                    }
                    else {
                        return [2 /*return*/, res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    next();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Device-Group-related API
    Object(__WEBPACK_IMPORTED_MODULE_3__api_device_group__["a" /* default */])(app);
    /*
     * Handles /api/device-group/change-lang
     * changes chosen language of a language to another
     */
    app.post('/api/device-group/change-lang', function (req, res, next) {
        Object(__WEBPACK_IMPORTED_MODULE_0__api_change_lang__["a" /* default */])(req, res, next);
    });
    // Direct-Message-related API
    Object(__WEBPACK_IMPORTED_MODULE_4__api_direct_message__["a" /* default */])(app);
    // Topic-related API
    Object(__WEBPACK_IMPORTED_MODULE_5__api_topic_op__["a" /* default */])(app);
    // Token-related API
    Object(__WEBPACK_IMPORTED_MODULE_6__api_token_op__["a" /* default */])(app);
    app.get('/performance-test/:time', function (req, res, next) {
        // const msg: FirebaseMsg = {
        //   title: 'Test',
        //   body: 'Message'
        // };
        var tmp = {
            title: 'Test',
            message: 'Message',
            token: 'fBFtm56fJoY:APA91bEwS3k9R0y30QoosOyPuugzr0ee-OihYE3-N9p1TL-K4aX3r4WQdD2oMAu2wDqGQIWfWYOomZ3Ad4ChbGAupfhREH42erfvAuOgOWmNaJxg0XH6W6ZDOMJZnaR_CEG9jTaxofJQ',
            type: 'web'
        };
        Object(__WEBPACK_IMPORTED_MODULE_7__api_performance_test__["a" /* default */])(tmp, parseInt(req.params.time), req, res, next);
    });
    /********************
     * User-related API *
     ********************/
    app.post('/user/signup', function (req, res, next) {
        __WEBPACK_IMPORTED_MODULE_1__api_database_controllers_UserController__["d" /* signupUserHandler */](req, res, next);
    });
    app.get('/user/check/:userId', function (req, res, next) {
        __WEBPACK_IMPORTED_MODULE_1__api_database_controllers_UserController__["b" /* checkUserHandler */](req.params.userId, req, res, next);
    });
    app.post('/user/login', function (req, res, next) {
        __WEBPACK_IMPORTED_MODULE_1__api_database_controllers_UserController__["c" /* loginHandler */](req, res, next);
    });
    app.post('/user/auth', function (req, res, next) {
        __WEBPACK_IMPORTED_MODULE_1__api_database_controllers_UserController__["a" /* authHandler */](req, res, next);
    });
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export addAndRemoveToken */
/* unused harmony export checkTokenFromDeviceGroupStream */
/* harmony export (immutable) */ __webpack_exports__["a"] = changeLang;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__database_controllers_DeviceGroupController__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__database_controllers_TokenController__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_saveToken__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



// import * as userGroups from './custom-firebase/database/userGroups';


function addAndRemoveToken(tokenInfo, targetLang) {
    var record = {
        type: tokenInfo.type,
        token: tokenInfo.token,
        userId: tokenInfo.userId,
        lang: tokenInfo.lang
    };
    var addStream = Object(__WEBPACK_IMPORTED_MODULE_3__utils_saveToken__["a" /* addTokenStream */])(__assign({}, record, { lang: targetLang }))
        .do(function (result) {
        console.info("[Change Lang]: added token to " + targetLang + " and subscribed to the right topic");
    });
    var removeStream = Object(__WEBPACK_IMPORTED_MODULE_3__utils_saveToken__["c" /* removeTokenStream */])(record)
        .do(function (result) {
        console.info("[Change Lang]: removed token from " + tokenInfo.lang + " and unsubscribed from the right topic");
    });
    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].concat(removeStream, addStream).last();
}
/**
 * Loop through a list of device groups and find if a token exists inside
 * Note that it'll only find one even if the token is in multiple device groups
 * @param token {string} the token
 * @param deviceGroups {string[]} the list of deviceGroups
 * @returns {Observable<any>} the observable
 */
function checkTokenFromDeviceGroupStream(token, deviceGroups) {
    // find the device group the token belongs to
    // for each deviceGroup
    var streams = deviceGroups.map(function (deviceGroup) { return __WEBPACK_IMPORTED_MODULE_0__database_controllers_DeviceGroupController__["b" /* checkTokenFromDeviceGroupStream */](token, deviceGroup); });
    var stream = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"], streams).filter(function (result) { return result.found; })
        .reduce(function (acc, curr) {
        if (curr.found)
            return curr.deviceGroup;
        return acc;
    }, '');
    return stream;
}
/**
 * Handles /api/device-group/change-lang
 * @param deviceGroup {string} the device group name
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function changeLang(req, res, next) {
    var _a = req.body, userId = _a.userId, token = _a.token, targetLang = _a.targetLang;
    var langKey = __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* getLangKey */](targetLang);
    var targetGroupName = __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* getDeviceGroupName */](userId, targetLang);
    var targetTopicName = __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* getBroadcastTopicName */](targetLang);
    var originalGroupName;
    var tokenInfo;
    var stream = __WEBPACK_IMPORTED_MODULE_1__database_controllers_TokenController__["b" /* queryTokenStream */](token)
        .do(function (res) {
        console.info("[Change Lang]: queried token info");
        tokenInfo = res;
    })
        .flatMap(function (result) { return __WEBPACK_IMPORTED_MODULE_0__database_controllers_DeviceGroupController__["c" /* queryDeviceGroupStream */](userId); })
        .do(function (res) { console.info("[Change Lang]: queried device groups"); })
        .flatMap(function (result) {
        // find the device group the token belongs to
        if (result.length > 0) {
            return checkTokenFromDeviceGroupStream(token, result);
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw('Original Device Group Not Found');
    })
        .do(function (result) {
        console.info("[Change Lang]: found matched device group: " + result);
        originalGroupName = result;
    })
        .flatMap(function (res) { return addAndRemoveToken(tokenInfo, targetLang); })
        .flatMap(function (result) { return __WEBPACK_IMPORTED_MODULE_1__database_controllers_TokenController__["c" /* saveTokenStream */]({
        type: tokenInfo.type,
        lang: targetLang,
        token: tokenInfo.token,
        userId: tokenInfo.userId
    }); })
        .do(function (result) { console.info("[Change Lang]: saved token to database"); })
        .map(function (result) { return ({
        status: 'success',
        msg: "Device Group changed from " + originalGroupName + " to " + targetGroupName
    }); });
    __WEBPACK_IMPORTED_MODULE_4__utils__["d" /* handler */](stream, req, res, next);
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

var deviceGroupSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose__["Schema"]({
    deviceGroup: String,
    userId: String,
    tokens: [String]
}, { timestamps: true });
var DeviceGroup = __WEBPACK_IMPORTED_MODULE_0_mongoose__["model"]('DeviceGroup', deviceGroupSchema);
/* harmony default export */ __webpack_exports__["a"] = (DeviceGroup);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

var tokenSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose__["Schema"]({
    userId: String,
    token: String,
    lang: String,
    type: String
}, { timestamps: true });
var Token = __WEBPACK_IMPORTED_MODULE_0_mongoose__["model"]('Token', tokenSchema);
/* harmony default export */ __webpack_exports__["a"] = (Token);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = subscribeTopicStream;
/* harmony export (immutable) */ __webpack_exports__["b"] = unsubscribeTopicStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_topic__ = __webpack_require__(8);


/**
 * Create Observable for subscribing token to a topic
 * @param token {string} user's token
 * @param topicName {string} topic name
 * @returns {Observable} the Observable
 */
function subscribeTopicStream(token, topicName) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_topic__["c" /* subscribeTokenToTopic */](token, topicName));
    // TODO: save result to database
}
/**
 * Create Observable for unsubscribing token from a topic
 * @param token {string} user's token
 * @param topicName {string} topic name
 * @returns {Observable} the Observable
 */
function unsubscribeTopicStream(token, topicName) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_topic__["d" /* unsubscribeFromTopic */](token, topicName));
    // TODO: remove result from database
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("firebase/app");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getConfig */
/* harmony export (immutable) */ __webpack_exports__["a"] = getServiceAccountInfo;
function getConfig() {
    return {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_DOMAIN_KEY,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    };
}
function getServiceAccountInfo() {
    return {
        "type": "service_account",
        "project_id": "kevchat-a5b6f",
        "private_key_id": "dc4806e84c1c43064e683884b9e62a2bb12e3319",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDU4J75tKyjWSQX\nWL4qww8i6xW51NTEdxxZXmYt3WuYpCpfFzpYU40KggPsTGl55cqzoOY3Py7g1mjm\nbTwCAujc7w2ceQnoAodZmQy9V8q3ygb+1rtNjjQF0SIAN3eoYbrXBfNYAhlrZS3G\n8mTJdvbsBsfYXn+NbazXzIvEuI2RZyRZkMtLNd+LklCfF9dIGX9Z/hyRIikqYt49\npanK8iTBI/ux6W62RPIfpuPWvUCdabVOJTfZ19qJLsi3S5kzqRTwzeTFU+fa3SUv\n9cUBdnmWEgfmWo9I8/6s+Hdt5R+QkrrMgfn0DOd0HD5x5zkwAdS+Sk87eVCOtUny\nb9zlofFNAgMBAAECggEAXFJwT95eEte5kdCAZN5EpcGrofTeM7humImaqeCB5eio\noaXavWy62ehKGESJZ/7TOrUYsrQZuhPy2aBdKoglgo/AaPCLbc4O8jowrrsw5SVe\nhE4PXFLEWBN7efmUUPfVhqSDhVMfwBZY1JPSRxdrfjBwonNVQTpkABErOq1JZFm6\nt2qHNFDMspwhYrbChYZN9Ijbvpv64XiejYM/rP/+Dpb5o1LwpyL6vJ8Z0xj9g65l\ncQZcITXgdi+lQDzbCR9sQ+2n/xlMiutFTsFqhL6giuQcNU/eD0l6wp4wPj8PqRMr\n3fLgPdErdTlB7rYPo1No3fuGAoz8yo9UpwLykjhCdwKBgQD3EmrJ6CHueyNqj7ek\nlHivjdSbyxjCeMwur5M1w+dqKBwDXAOtQ+sBm0IZ8fZHLCxJFhlAM6ejlCZiF0O2\nij2r2lr4X8/IW2ESeOTXJx8mvuLIA0T7865GupLM6hYoztodVTUsdv3uTz2/wmlR\nPWZecz7TTVd6QvPfsaOtY2wccwKBgQDckeGkP2D6XDSo538G1vtlD+aK+EDA4XcN\nmrXrLHbaMFxwjr5/w0g14h3x6gxIJwvGe5d2CwVk4zUEcihO1d+tfgePr4vKiuAp\nKQGrO0bu0FC9smIN/1GUjHYhzIqUWHeryA8CQQTbHs0OVm5hIfhKW7RGPl24oZBK\nC7I8XnoLPwKBgQCVhEOzpBLEqygnmIldw6u1MXN0RFfbeBa4OfAwHTmx+EvbjJd9\nBxj0g+xgnxiWwZibMhBd1eShDUqdGc8UbFwd36olnHW1nfcEorx5p2cmn2XF/JSG\nlFTm4IluEEsQrv03uxTOr8PDr5iCrzfkve9xQPTIEonZpyLGQE34463NGQKBgFkb\nZjjgkeES1wNVYm/08eLGJbEG0cIaU+pfEhdMA0fqOa4PPM6Iqed6zfYpQ4TyoUMy\nMuIxWaCEWarOI5KVvKNuQse9d4//wsdeFZqDfAiGh9fa9NoKx35nsGG/LEz54H65\nd7bFZZzQOK8OI9GB07jWi2HFWD96pbwENaFF2bApAoGBANUnVJxW0fJMh/9sYwQH\nmedP7aV7nLIFdG988p53wdvQN7CF40wCOckvW/bG/I83a7dibSj274EYSIa1deWb\nCWS+UsiNqMKgQgtzk4Id4AmLF0AVksJKH36+cP2PLexNdocL4Ku9T71IqsZn0JvC\nWaIK9klqvoH0aLg5XOJw5Zyg\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-7fhc2@kevchat-a5b6f.iam.gserviceaccount.com",
        "client_id": "112694782557192835677",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7fhc2%40kevchat-a5b6f.iam.gserviceaccount.com"
    };
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("googleapis");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = signupUserHandler;
/* harmony export (immutable) */ __webpack_exports__["c"] = loginHandler;
/* harmony export (immutable) */ __webpack_exports__["a"] = authHandler;
/* harmony export (immutable) */ __webpack_exports__["b"] = checkUserHandler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bcrypt_nodejs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bcrypt_nodejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bcrypt_nodejs__);



function signupUserHandler(req, res, next) {
    var user = new __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */]({
        userId: req.body.userId,
        password: req.body.password
    });
    __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findOne({ userId: req.body.userId }, function (err, existingUser) {
        if (err) {
            res.send({ status: 'failure', msg: 'database error' });
        }
        if (existingUser) {
            res.send({ status: 'failure', msg: "Account with that userId " + req.body.userId + " already exists." });
            return;
        }
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            var token = __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__["sign"]({ id: user._id }, 'linkinpark', {
                expiresIn: 86400 // expires in 24 hours
            });
            res
                .send({ status: 'success', auth: true, token: token });
        });
    });
}
function loginHandler(req, res, next) {
    __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findOne({ userId: req.body.userId }, function (err, user) {
        if (err)
            return res.status(500).send('Error on the server.');
        if (!user)
            return res.status(404).send('No user found.');
        var passwordIsValid = __WEBPACK_IMPORTED_MODULE_2_bcrypt_nodejs__["compareSync"](req.body.password, user.password);
        if (!passwordIsValid)
            return res.status(401).send({ auth: false, token: null });
        var token = __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__["sign"]({ id: user._id }, 'linkinpark', {
            expiresIn: 86400 // expires in 24 hours
        });
        res
            .status(200)
            .send({ auth: true, token: token });
    });
}
function authHandler(req, res, next) {
    var token = (req.headers['x-access-token']);
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__["verify"](token, 'linkinpark', function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).send({ auth: true, message: 'Authenticated with token!', decoded: decoded });
    });
}
function checkUserHandler(userId, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findOne({ userId: userId }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            res.send({ status: 'found', msg: 'Account with that user id already exists.' });
        }
        else {
            res.send({ status: 'not found', msg: 'Account with that user id is available.' });
        }
    });
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bcrypt_nodejs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bcrypt_nodejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bcrypt_nodejs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);


var userSchema = new __WEBPACK_IMPORTED_MODULE_1_mongoose__["Schema"]({
    userId: String,
    password: String
}, { timestamps: true });
/**
 * User hash middleware
 */
userSchema.pre('save', function save(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    __WEBPACK_IMPORTED_MODULE_0_bcrypt_nodejs__["genSalt"](10, function (err, salt) {
        if (err) {
            return next(err);
        }
        __WEBPACK_IMPORTED_MODULE_0_bcrypt_nodejs__["hash"](user.password, salt, undefined, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (password, cb) {
    __WEBPACK_IMPORTED_MODULE_0_bcrypt_nodejs__["compare"](password, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};
var User = __WEBPACK_IMPORTED_MODULE_1_mongoose__["model"]('User', userSchema);
/* harmony default export */ __webpack_exports__["a"] = (User);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export queryDeviceGroup */
/* unused harmony export queryTokenList */
/* unused harmony export customMsgHandler */
/* harmony export (immutable) */ __webpack_exports__["a"] = deviceGroupRoutes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__database_controllers_DeviceGroupController__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_sendDeviceGroup__ = __webpack_require__(26);



/**
 * Handles /api/device-group/groups/:userId
 * @param userId {string} User ID
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function queryDeviceGroup(userId, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](__WEBPACK_IMPORTED_MODULE_0__database_controllers_DeviceGroupController__["c" /* queryDeviceGroupStream */](userId), req, res, next);
}
/**
 * Handles /api/device-group/tokens/:userId/:lang
 * @param deviceGroup {string} the device group name
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function queryTokenList(deviceGroup, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](__WEBPACK_IMPORTED_MODULE_0__database_controllers_DeviceGroupController__["d" /* queryTokenListFromDeviceGroupStream */](deviceGroup), req, res, next);
}
/**
 * Handles /api/custom-message
 * @param data {CustomMsg} data that contains userId, title, message, lang
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function customMsgHandler(data, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](Object(__WEBPACK_IMPORTED_MODULE_2__utils_sendDeviceGroup__["a" /* default */])(data), req, res, next);
}
function deviceGroupRoutes(app) {
    app.get('/api/device-group/groups/:userId', function (req, res, next) {
        queryDeviceGroup(req.params.userId, req, res, next);
    });
    app.get('/api/device-group/tokens/:userId/:lang', function (req, res, next) {
        var langKey = req.params.lang === 'zh-hk' ? 'zh_hk' : 'en';
        var deviceGroup = req.params.userId + '_' + langKey;
        queryTokenList(deviceGroup, req, res, next);
    });
    app.post('/api/custom-message', function (req, res, next) {
        customMsgHandler((req.body), req, res, next);
    });
}


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sendCustomMsgStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_device_group__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notificationKey__ = __webpack_require__(10);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



/**
 * Create Observable that sends a custom message to a device group
 * @param data {CustomMsg} data that contains userId, title, message, lang
 * @returns {Observable} the observable
 */
function sendCustomMsgStream(data) {
    var customMessage = {
        title: data.title,
        body: data.message
    };
    var record = {
        userId: data.userId,
        lang: data.lang
    };
    return Object(__WEBPACK_IMPORTED_MODULE_2__notificationKey__["b" /* retrieveNotificationKeyStream */])(record)
        .flatMap(function (notificationId) {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_device_group__["d" /* sendNotification */](notificationId, customMessage));
    })
        .do(function (result) {
        console.info("[sendDeviceGroupStream]: sent message to " + data.userId + " " + data.lang);
    })
        .map(function (result) { return (__assign({}, result, { status: 'success' })); });
}


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export directMsgHandler */
/* harmony export (immutable) */ __webpack_exports__["a"] = directMsgRoutes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_directMessage__ = __webpack_require__(14);


/**
 * Sends a direct message through a token
 * @param data {DirectMsg} data
 * @param req {Request} the Request
 * @param res {Response} the Response
 * @param next {Next} the Next
 */
function directMsgHandler(data, req, res, next) {
    var stream = Object(__WEBPACK_IMPORTED_MODULE_1__utils_directMessage__["a" /* default */])(data);
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* handler */])(stream, req, res, next);
}
function directMsgRoutes(app) {
    app.post('/api/direct-message', function (req, res, next) {
        directMsgHandler(req.body, req, res, next);
    });
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export sendWebNotification */
/* unused harmony export sendAndroidNotification */
/* unused harmony export sendIOSNotification */
/* harmony export (immutable) */ __webpack_exports__["a"] = sendNotification;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_messaging__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_messaging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_messaging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch__);
// https://firebase.google.com/docs/web/setup
// https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
// https://firebase.googleblog.com/2016/08/sending-notifications-between-android.html
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var performance = __webpack_require__(29).performance;
function clock(start) {
    if (!start)
        return process.hrtime();
    var end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
}
var Benchmark = /** @class */ (function () {
    function Benchmark() {
        this.start = process.hrtime();
    }
    Benchmark.prototype.elapsed = function () {
        var end = process.hrtime(this.start);
        return Math.round((end[0] * 1000) + (end[1] / 1000000));
    };
    return Benchmark;
}());
/**
 * Send web push notification to an individual user device
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
function sendWebNotification(token, msg) {
    return __awaiter(this, void 0, void 0, function () {
        var startTime, accessToken, result, duration;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTime = performance.now();
                    return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getAccessTokenPromise */])()];
                case 1:
                    accessToken = _a.sent();
                    result = __WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch__(process.env.FIREBASE_PUSH_NOTIFICATION_WEB, {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + accessToken
                        }),
                        body: JSON.stringify({
                            message: {
                                token: token,
                                notification: msg
                            }
                        })
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (result) {
                        // console.log(result);
                        if (result.error) {
                            throw new Error(result);
                        }
                    })
                        .catch(function (err) { console.error(err); });
                    duration = performance.now() - startTime;
                    console.log(duration);
                    return [2 /*return*/, {
                            result: result,
                            duration: duration
                        }];
            }
        });
    });
}
/**
 * Send Android push notification to an individual user device
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
function sendAndroidNotification(token, msg) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // TODO:
            return [2 /*return*/, 'foo'];
        });
    });
}
/**
 * Send iOS push notification to an individual user device
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
function sendIOSNotification(token, msg) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // TODO:
            return [2 /*return*/, 'foo'];
        });
    });
}
/**
 * Send push notification to an individual user device
 * @param type {TokenType} the type of the token according to platform
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
function sendNotification(type, token, msg) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = type;
                    switch (_a) {
                        case 'web': return [3 /*break*/, 1];
                        case 'android': return [3 /*break*/, 3];
                        case 'ios': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, sendWebNotification(token, msg)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, sendAndroidNotification(token, msg)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, sendIOSNotification(token, msg)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [2 /*return*/];
            }
        });
    });
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("perf_hooks");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export sendTopicMsg */
/* unused harmony export sendMultiTopics */
/* unused harmony export sendBroadcastMsg */
/* unused harmony export sendWelcomeMsg */
/* unused harmony export sendTestMessage */
/* unused harmony export subscribeToTopic */
/* unused harmony export unsubscribeFromTopic */
/* harmony export (immutable) */ __webpack_exports__["a"] = topicRoutes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_sendTopic__ = __webpack_require__(31);



/**
 * Send a message to a specific topic,
 * @param data {TopicMsg} messages to be sent and topic name
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function sendTopicMsg(data, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](Object(__WEBPACK_IMPORTED_MODULE_2__utils_sendTopic__["a" /* sendTopicStream */])(data.msg, data.topic), req, res, next);
}
function sendMultiTopics(data, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](Object(__WEBPACK_IMPORTED_MODULE_2__utils_sendTopic__["b" /* sendTopicsStream */])(data.msg, data.topics), req, res, next);
}
/**
 * Send a broadcast message to every device via the `broadcast_XXX` topic,
 * the message will be in device's chosen language
 * @param data {BroadcastMsg[]} messages to be sent
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function sendBroadcastMsg(data, req, res, next) {
    var streams = data.map(function (item) { return ({
        topic: __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getBroadcastTopicName */](item.lang),
        msg: item.msg
    }); })
        .map(function (data) { return Object(__WEBPACK_IMPORTED_MODULE_2__utils_sendTopic__["a" /* sendTopicStream */])(data.msg, data.topic); });
    var stream = __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"], streams).reduce(function (acc, curr) { return acc + curr; }, '');
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](stream, req, res, next);
}
/**
 * Send a welcome message to every device via the `broadcast_XXX` topic,
 * the welcome message will be in device's chosen language
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function sendWelcomeMsg(req, res, next) {
    var topicKeys = [
        { lang: 'en', msg: { title: 'Welcome', body: 'Welcome to Ice Ice Baby' } },
        { lang: 'zh-hk', msg: { title: '你好', body: '歡迎加入Ice Ice Baby' } }
    ];
    sendBroadcastMsg(topicKeys, req, res, next);
}
/**
 * Send a custom message to the `test` topic, every device will receive the message
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function sendTestMessage(req, res, next) {
    var msg = req.body;
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](Object(__WEBPACK_IMPORTED_MODULE_2__utils_sendTopic__["a" /* sendTopicStream */])(msg, 'test'), req, res, next);
}
function subscribeToTopic() {
}
function unsubscribeFromTopic() {
}
function topicRoutes(app) {
    app.post('/api/topic-message', function (req, res, next) {
        sendTopicMsg(req.body, req, res, next);
    });
    app.post('/api/multi-topics', function (req, res, next) {
        sendMultiTopics(req.body, req, res, next);
    });
    app.post('/api/broadcast-message', function (req, res, next) {
        sendBroadcastMsg(req.body, req, res, next);
    });
    app.post('/api/welcome-message', function (req, res, next) {
        sendWelcomeMsg(req, res, next);
    });
    app.post('/api/test-message', function (req, res, next) {
        sendTestMessage(req, res, next);
    });
}


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sendTopicStream;
/* harmony export (immutable) */ __webpack_exports__["b"] = sendTopicsStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_topic__ = __webpack_require__(8);


/**
 * Create an Observable for sending message to a topic
 * @param msg {FirebaseMsg} messages to be sent
 * @param topic {string} the topic name
 */
function sendTopicStream(msg, topic) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].fromPromise(Object(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_topic__["a" /* sendMsgToTopic */])(msg, topic))
        .do(function (res) {
        console.info("[utils/sendTopicStream]: send msg to topic " + topic);
    })
        .flatMap(function (res) {
        if (res.error) {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].throw('fail to send message');
        }
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].of('message sent');
    })
        .do(function (res) {
        console.info("[utils/sendTopicStream]: successfully sent msg to topic " + topic);
    });
}
function sendTopicsStream(msg, topics) {
    console.info('creating send topics stream');
    console.info(topics);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].fromPromise(Object(__WEBPACK_IMPORTED_MODULE_1__custom_firebase_push_notification_topic__["b" /* sendMsgToTopics */])(msg, topics))
        .do(function (res) {
        console.info("[utils/sendTopicsStream]: send msg to topics " + topics);
    })
        .flatMap(function (res) {
        console.log(res);
        if (res.error) {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].throw('fail to send message');
        }
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].of('message sent');
    })
        .do(function (res) {
        console.info("[utils/sendTopicsStream]: successfully sent msg to topics " + topics);
    });
}


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export retrieveTokens */
/* unused harmony export saveToken */
/* harmony export (immutable) */ __webpack_exports__["a"] = tokenRoutes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__database_controllers_TokenController__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_saveToken__ = __webpack_require__(7);



/**
 * Retrieve all the tokens associated to the user from MongoDB
 * @param userId {string} user's id
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function retrieveTokens(userId, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](__WEBPACK_IMPORTED_MODULE_0__database_controllers_TokenController__["a" /* findTokensStream */](userId), req, res, next);
}
/**
 * Register tokens to Firebase's device group and
 * Saves token to MongoDb along with the device group it's associated to
 * @param record {TokenRecord} user's token record
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
function saveToken(record, req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* handler */](Object(__WEBPACK_IMPORTED_MODULE_2__utils_saveToken__["b" /* default */])(record), req, res, next);
}
function tokenRoutes(app) {
    app.post('/api/token', function (req, res, next) {
        saveToken(req.body, req, res, next);
    });
    app.get('/api/tokens/:userId', function (req, res, next) {
        retrieveTokens(req.params.userId, req, res, next);
    });
}


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = testPerformanceTest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_directMessage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fs__);



/**
 * Sends a direct message through a token
 * @param data {DirectMsg} data
 * @param req {Request} the Request
 * @param res {Response} the Response
 * @param next {Next} the Next
 */
function testPerformanceTest(data, time, req, res, next) {
    var streams = [];
    var performance = [];
    for (var i = 0; i < time; i++) {
        streams.push(Object(__WEBPACK_IMPORTED_MODULE_1__utils_directMessage__["a" /* default */])(data));
    }
    var stream = __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"], streams);
    var payload = {
        status: 'success',
        result: ''
    };
    res.send(JSON.stringify({ status: 'success', 'msg': 'started' }));
    console.log('performance test started');
    stream.subscribe(function (result) {
        console.info("sent " + (performance.length + 1) + "th message");
        var prevTotal = performance.length >= 1 ? (performance[performance.length - 1]).total : 0;
        var total = result.perf.duration + prevTotal;
        console.info("took: " + result.perf.duration + ", total: " + total);
        performance.push({
            duration: result.perf.duration,
            total: total
        });
        payload.result = result;
    }, function (err) {
        payload.status = 'failure';
        payload.result = err;
        // res.send(JSON.stringify(payload));
    }, function () {
        var file = __WEBPACK_IMPORTED_MODULE_2_fs__["createWriteStream"]('./mika.txt');
        file.on('error', function (err) { console.error(err); });
        performance.forEach(function (v, idx) { file.write("idx: " + idx + ", duration: " + v.duration + ", totel: " + v.total + "\n"); });
        file.end();
        // res.send(JSON.stringify(payload));
    });
}


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);
//# sourceMappingURL=api-bundle.js.map