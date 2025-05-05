(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.onErrorResumeNextWith = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = void 0;
var Observable_1 = require("./internal/Observable");
Object.defineProperty(exports, "Observable", { enumerable: true, get: function () { return Observable_1.Observable; } });
var ConnectableObservable_1 = require("./internal/observable/ConnectableObservable");
Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function () { return ConnectableObservable_1.ConnectableObservable; } });
var observable_1 = require("./internal/symbol/observable");
Object.defineProperty(exports, "observable", { enumerable: true, get: function () { return observable_1.observable; } });
var animationFrames_1 = require("./internal/observable/dom/animationFrames");
Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function () { return animationFrames_1.animationFrames; } });
var Subject_1 = require("./internal/Subject");
Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return Subject_1.Subject; } });
var BehaviorSubject_1 = require("./internal/BehaviorSubject");
Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function () { return BehaviorSubject_1.BehaviorSubject; } });
var ReplaySubject_1 = require("./internal/ReplaySubject");
Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function () { return ReplaySubject_1.ReplaySubject; } });
var AsyncSubject_1 = require("./internal/AsyncSubject");
Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function () { return AsyncSubject_1.AsyncSubject; } });
var asap_1 = require("./internal/scheduler/asap");
Object.defineProperty(exports, "asap", { enumerable: true, get: function () { return asap_1.asap; } });
Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function () { return asap_1.asapScheduler; } });
var async_1 = require("./internal/scheduler/async");
Object.defineProperty(exports, "async", { enumerable: true, get: function () { return async_1.async; } });
Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function () { return async_1.asyncScheduler; } });
var queue_1 = require("./internal/scheduler/queue");
Object.defineProperty(exports, "queue", { enumerable: true, get: function () { return queue_1.queue; } });
Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function () { return queue_1.queueScheduler; } });
var animationFrame_1 = require("./internal/scheduler/animationFrame");
Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function () { return animationFrame_1.animationFrame; } });
Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function () { return animationFrame_1.animationFrameScheduler; } });
var VirtualTimeScheduler_1 = require("./internal/scheduler/VirtualTimeScheduler");
Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualTimeScheduler; } });
Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualAction; } });
var Scheduler_1 = require("./internal/Scheduler");
Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function () { return Scheduler_1.Scheduler; } });
var Subscription_1 = require("./internal/Subscription");
Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return Subscription_1.Subscription; } });
var Subscriber_1 = require("./internal/Subscriber");
Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function () { return Subscriber_1.Subscriber; } });
var Notification_1 = require("./internal/Notification");
Object.defineProperty(exports, "Notification", { enumerable: true, get: function () { return Notification_1.Notification; } });
Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function () { return Notification_1.NotificationKind; } });
var pipe_1 = require("./internal/util/pipe");
Object.defineProperty(exports, "pipe", { enumerable: true, get: function () { return pipe_1.pipe; } });
var noop_1 = require("./internal/util/noop");
Object.defineProperty(exports, "noop", { enumerable: true, get: function () { return noop_1.noop; } });
var identity_1 = require("./internal/util/identity");
Object.defineProperty(exports, "identity", { enumerable: true, get: function () { return identity_1.identity; } });
var isObservable_1 = require("./internal/util/isObservable");
Object.defineProperty(exports, "isObservable", { enumerable: true, get: function () { return isObservable_1.isObservable; } });
var lastValueFrom_1 = require("./internal/lastValueFrom");
Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function () { return lastValueFrom_1.lastValueFrom; } });
var firstValueFrom_1 = require("./internal/firstValueFrom");
Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function () { return firstValueFrom_1.firstValueFrom; } });
var ArgumentOutOfRangeError_1 = require("./internal/util/ArgumentOutOfRangeError");
Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function () { return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError; } });
var EmptyError_1 = require("./internal/util/EmptyError");
Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function () { return EmptyError_1.EmptyError; } });
var NotFoundError_1 = require("./internal/util/NotFoundError");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return NotFoundError_1.NotFoundError; } });
var ObjectUnsubscribedError_1 = require("./internal/util/ObjectUnsubscribedError");
Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function () { return ObjectUnsubscribedError_1.ObjectUnsubscribedError; } });
var SequenceError_1 = require("./internal/util/SequenceError");
Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function () { return SequenceError_1.SequenceError; } });
var timeout_1 = require("./internal/operators/timeout");
Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return timeout_1.TimeoutError; } });
var UnsubscriptionError_1 = require("./internal/util/UnsubscriptionError");
Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function () { return UnsubscriptionError_1.UnsubscriptionError; } });
var bindCallback_1 = require("./internal/observable/bindCallback");
Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function () { return bindCallback_1.bindCallback; } });
var bindNodeCallback_1 = require("./internal/observable/bindNodeCallback");
Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function () { return bindNodeCallback_1.bindNodeCallback; } });
var combineLatest_1 = require("./internal/observable/combineLatest");
Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
var concat_1 = require("./internal/observable/concat");
Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
var connectable_1 = require("./internal/observable/connectable");
Object.defineProperty(exports, "connectable", { enumerable: true, get: function () { return connectable_1.connectable; } });
var defer_1 = require("./internal/observable/defer");
Object.defineProperty(exports, "defer", { enumerable: true, get: function () { return defer_1.defer; } });
var empty_1 = require("./internal/observable/empty");
Object.defineProperty(exports, "empty", { enumerable: true, get: function () { return empty_1.empty; } });
var forkJoin_1 = require("./internal/observable/forkJoin");
Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function () { return forkJoin_1.forkJoin; } });
var from_1 = require("./internal/observable/from");
Object.defineProperty(exports, "from", { enumerable: true, get: function () { return from_1.from; } });
var fromEvent_1 = require("./internal/observable/fromEvent");
Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function () { return fromEvent_1.fromEvent; } });
var fromEventPattern_1 = require("./internal/observable/fromEventPattern");
Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function () { return fromEventPattern_1.fromEventPattern; } });
var generate_1 = require("./internal/observable/generate");
Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return generate_1.generate; } });
var iif_1 = require("./internal/observable/iif");
Object.defineProperty(exports, "iif", { enumerable: true, get: function () { return iif_1.iif; } });
var interval_1 = require("./internal/observable/interval");
Object.defineProperty(exports, "interval", { enumerable: true, get: function () { return interval_1.interval; } });
var merge_1 = require("./internal/observable/merge");
Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
var never_1 = require("./internal/observable/never");
Object.defineProperty(exports, "never", { enumerable: true, get: function () { return never_1.never; } });
var of_1 = require("./internal/observable/of");
Object.defineProperty(exports, "of", { enumerable: true, get: function () { return of_1.of; } });
var onErrorResumeNext_1 = require("./internal/observable/onErrorResumeNext");
Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNext_1.onErrorResumeNext; } });
var pairs_1 = require("./internal/observable/pairs");
Object.defineProperty(exports, "pairs", { enumerable: true, get: function () { return pairs_1.pairs; } });
var partition_1 = require("./internal/observable/partition");
Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
var race_1 = require("./internal/observable/race");
Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
var range_1 = require("./internal/observable/range");
Object.defineProperty(exports, "range", { enumerable: true, get: function () { return range_1.range; } });
var throwError_1 = require("./internal/observable/throwError");
Object.defineProperty(exports, "throwError", { enumerable: true, get: function () { return throwError_1.throwError; } });
var timer_1 = require("./internal/observable/timer");
Object.defineProperty(exports, "timer", { enumerable: true, get: function () { return timer_1.timer; } });
var using_1 = require("./internal/observable/using");
Object.defineProperty(exports, "using", { enumerable: true, get: function () { return using_1.using; } });
var zip_1 = require("./internal/observable/zip");
Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
var scheduled_1 = require("./internal/scheduled/scheduled");
Object.defineProperty(exports, "scheduled", { enumerable: true, get: function () { return scheduled_1.scheduled; } });
var empty_2 = require("./internal/observable/empty");
Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function () { return empty_2.EMPTY; } });
var never_2 = require("./internal/observable/never");
Object.defineProperty(exports, "NEVER", { enumerable: true, get: function () { return never_2.NEVER; } });
__exportStar(require("./internal/types"), exports);
var config_1 = require("./internal/config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
var audit_1 = require("./internal/operators/audit");
Object.defineProperty(exports, "audit", { enumerable: true, get: function () { return audit_1.audit; } });
var auditTime_1 = require("./internal/operators/auditTime");
Object.defineProperty(exports, "auditTime", { enumerable: true, get: function () { return auditTime_1.auditTime; } });
var buffer_1 = require("./internal/operators/buffer");
Object.defineProperty(exports, "buffer", { enumerable: true, get: function () { return buffer_1.buffer; } });
var bufferCount_1 = require("./internal/operators/bufferCount");
Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function () { return bufferCount_1.bufferCount; } });
var bufferTime_1 = require("./internal/operators/bufferTime");
Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function () { return bufferTime_1.bufferTime; } });
var bufferToggle_1 = require("./internal/operators/bufferToggle");
Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } });
var bufferWhen_1 = require("./internal/operators/bufferWhen");
Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } });
var catchError_1 = require("./internal/operators/catchError");
Object.defineProperty(exports, "catchError", { enumerable: true, get: function () { return catchError_1.catchError; } });
var combineAll_1 = require("./internal/operators/combineAll");
Object.defineProperty(exports, "combineAll", { enumerable: true, get: function () { return combineAll_1.combineAll; } });
var combineLatestAll_1 = require("./internal/operators/combineLatestAll");
Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } });
var combineLatestWith_1 = require("./internal/operators/combineLatestWith");
Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } });
var concatAll_1 = require("./internal/operators/concatAll");
Object.defineProperty(exports, "concatAll", { enumerable: true, get: function () { return concatAll_1.concatAll; } });
var concatMap_1 = require("./internal/operators/concatMap");
Object.defineProperty(exports, "concatMap", { enumerable: true, get: function () { return concatMap_1.concatMap; } });
var concatMapTo_1 = require("./internal/operators/concatMapTo");
Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } });
var concatWith_1 = require("./internal/operators/concatWith");
Object.defineProperty(exports, "concatWith", { enumerable: true, get: function () { return concatWith_1.concatWith; } });
var connect_1 = require("./internal/operators/connect");
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
var count_1 = require("./internal/operators/count");
Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.count; } });
var debounce_1 = require("./internal/operators/debounce");
Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return debounce_1.debounce; } });
var debounceTime_1 = require("./internal/operators/debounceTime");
Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function () { return debounceTime_1.debounceTime; } });
var defaultIfEmpty_1 = require("./internal/operators/defaultIfEmpty");
Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } });
var delay_1 = require("./internal/operators/delay");
Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return delay_1.delay; } });
var delayWhen_1 = require("./internal/operators/delayWhen");
Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function () { return delayWhen_1.delayWhen; } });
var dematerialize_1 = require("./internal/operators/dematerialize");
Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function () { return dematerialize_1.dematerialize; } });
var distinct_1 = require("./internal/operators/distinct");
Object.defineProperty(exports, "distinct", { enumerable: true, get: function () { return distinct_1.distinct; } });
var distinctUntilChanged_1 = require("./internal/operators/distinctUntilChanged");
Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } });
var distinctUntilKeyChanged_1 = require("./internal/operators/distinctUntilKeyChanged");
Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } });
var elementAt_1 = require("./internal/operators/elementAt");
Object.defineProperty(exports, "elementAt", { enumerable: true, get: function () { return elementAt_1.elementAt; } });
var endWith_1 = require("./internal/operators/endWith");
Object.defineProperty(exports, "endWith", { enumerable: true, get: function () { return endWith_1.endWith; } });
var every_1 = require("./internal/operators/every");
Object.defineProperty(exports, "every", { enumerable: true, get: function () { return every_1.every; } });
var exhaust_1 = require("./internal/operators/exhaust");
Object.defineProperty(exports, "exhaust", { enumerable: true, get: function () { return exhaust_1.exhaust; } });
var exhaustAll_1 = require("./internal/operators/exhaustAll");
Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } });
var exhaustMap_1 = require("./internal/operators/exhaustMap");
Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } });
var expand_1 = require("./internal/operators/expand");
Object.defineProperty(exports, "expand", { enumerable: true, get: function () { return expand_1.expand; } });
var filter_1 = require("./internal/operators/filter");
Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return filter_1.filter; } });
var finalize_1 = require("./internal/operators/finalize");
Object.defineProperty(exports, "finalize", { enumerable: true, get: function () { return finalize_1.finalize; } });
var find_1 = require("./internal/operators/find");
Object.defineProperty(exports, "find", { enumerable: true, get: function () { return find_1.find; } });
var findIndex_1 = require("./internal/operators/findIndex");
Object.defineProperty(exports, "findIndex", { enumerable: true, get: function () { return findIndex_1.findIndex; } });
var first_1 = require("./internal/operators/first");
Object.defineProperty(exports, "first", { enumerable: true, get: function () { return first_1.first; } });
var groupBy_1 = require("./internal/operators/groupBy");
Object.defineProperty(exports, "groupBy", { enumerable: true, get: function () { return groupBy_1.groupBy; } });
var ignoreElements_1 = require("./internal/operators/ignoreElements");
Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } });
var isEmpty_1 = require("./internal/operators/isEmpty");
Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.isEmpty; } });
var last_1 = require("./internal/operators/last");
Object.defineProperty(exports, "last", { enumerable: true, get: function () { return last_1.last; } });
var map_1 = require("./internal/operators/map");
Object.defineProperty(exports, "map", { enumerable: true, get: function () { return map_1.map; } });
var mapTo_1 = require("./internal/operators/mapTo");
Object.defineProperty(exports, "mapTo", { enumerable: true, get: function () { return mapTo_1.mapTo; } });
var materialize_1 = require("./internal/operators/materialize");
Object.defineProperty(exports, "materialize", { enumerable: true, get: function () { return materialize_1.materialize; } });
var max_1 = require("./internal/operators/max");
Object.defineProperty(exports, "max", { enumerable: true, get: function () { return max_1.max; } });
var mergeAll_1 = require("./internal/operators/mergeAll");
Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function () { return mergeAll_1.mergeAll; } });
var flatMap_1 = require("./internal/operators/flatMap");
Object.defineProperty(exports, "flatMap", { enumerable: true, get: function () { return flatMap_1.flatMap; } });
var mergeMap_1 = require("./internal/operators/mergeMap");
Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function () { return mergeMap_1.mergeMap; } });
var mergeMapTo_1 = require("./internal/operators/mergeMapTo");
Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } });
var mergeScan_1 = require("./internal/operators/mergeScan");
Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function () { return mergeScan_1.mergeScan; } });
var mergeWith_1 = require("./internal/operators/mergeWith");
Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function () { return mergeWith_1.mergeWith; } });
var min_1 = require("./internal/operators/min");
Object.defineProperty(exports, "min", { enumerable: true, get: function () { return min_1.min; } });
var multicast_1 = require("./internal/operators/multicast");
Object.defineProperty(exports, "multicast", { enumerable: true, get: function () { return multicast_1.multicast; } });
var observeOn_1 = require("./internal/operators/observeOn");
Object.defineProperty(exports, "observeOn", { enumerable: true, get: function () { return observeOn_1.observeOn; } });
var onErrorResumeNextWith_1 = require("./internal/operators/onErrorResumeNextWith");
Object.defineProperty(exports, "onErrorResumeNextWith", { enumerable: true, get: function () { return onErrorResumeNextWith_1.onErrorResumeNextWith; } });
var pairwise_1 = require("./internal/operators/pairwise");
Object.defineProperty(exports, "pairwise", { enumerable: true, get: function () { return pairwise_1.pairwise; } });
var pluck_1 = require("./internal/operators/pluck");
Object.defineProperty(exports, "pluck", { enumerable: true, get: function () { return pluck_1.pluck; } });
var publish_1 = require("./internal/operators/publish");
Object.defineProperty(exports, "publish", { enumerable: true, get: function () { return publish_1.publish; } });
var publishBehavior_1 = require("./internal/operators/publishBehavior");
Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } });
var publishLast_1 = require("./internal/operators/publishLast");
Object.defineProperty(exports, "publishLast", { enumerable: true, get: function () { return publishLast_1.publishLast; } });
var publishReplay_1 = require("./internal/operators/publishReplay");
Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function () { return publishReplay_1.publishReplay; } });
var raceWith_1 = require("./internal/operators/raceWith");
Object.defineProperty(exports, "raceWith", { enumerable: true, get: function () { return raceWith_1.raceWith; } });
var reduce_1 = require("./internal/operators/reduce");
Object.defineProperty(exports, "reduce", { enumerable: true, get: function () { return reduce_1.reduce; } });
var repeat_1 = require("./internal/operators/repeat");
Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return repeat_1.repeat; } });
var repeatWhen_1 = require("./internal/operators/repeatWhen");
Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } });
var retry_1 = require("./internal/operators/retry");
Object.defineProperty(exports, "retry", { enumerable: true, get: function () { return retry_1.retry; } });
var retryWhen_1 = require("./internal/operators/retryWhen");
Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function () { return retryWhen_1.retryWhen; } });
var refCount_1 = require("./internal/operators/refCount");
Object.defineProperty(exports, "refCount", { enumerable: true, get: function () { return refCount_1.refCount; } });
var sample_1 = require("./internal/operators/sample");
Object.defineProperty(exports, "sample", { enumerable: true, get: function () { return sample_1.sample; } });
var sampleTime_1 = require("./internal/operators/sampleTime");
Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function () { return sampleTime_1.sampleTime; } });
var scan_1 = require("./internal/operators/scan");
Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return scan_1.scan; } });
var sequenceEqual_1 = require("./internal/operators/sequenceEqual");
Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } });
var share_1 = require("./internal/operators/share");
Object.defineProperty(exports, "share", { enumerable: true, get: function () { return share_1.share; } });
var shareReplay_1 = require("./internal/operators/shareReplay");
Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function () { return shareReplay_1.shareReplay; } });
var single_1 = require("./internal/operators/single");
Object.defineProperty(exports, "single", { enumerable: true, get: function () { return single_1.single; } });
var skip_1 = require("./internal/operators/skip");
Object.defineProperty(exports, "skip", { enumerable: true, get: function () { return skip_1.skip; } });
var skipLast_1 = require("./internal/operators/skipLast");
Object.defineProperty(exports, "skipLast", { enumerable: true, get: function () { return skipLast_1.skipLast; } });
var skipUntil_1 = require("./internal/operators/skipUntil");
Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function () { return skipUntil_1.skipUntil; } });
var skipWhile_1 = require("./internal/operators/skipWhile");
Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function () { return skipWhile_1.skipWhile; } });
var startWith_1 = require("./internal/operators/startWith");
Object.defineProperty(exports, "startWith", { enumerable: true, get: function () { return startWith_1.startWith; } });
var subscribeOn_1 = require("./internal/operators/subscribeOn");
Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } });
var switchAll_1 = require("./internal/operators/switchAll");
Object.defineProperty(exports, "switchAll", { enumerable: true, get: function () { return switchAll_1.switchAll; } });
var switchMap_1 = require("./internal/operators/switchMap");
Object.defineProperty(exports, "switchMap", { enumerable: true, get: function () { return switchMap_1.switchMap; } });
var switchMapTo_1 = require("./internal/operators/switchMapTo");
Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } });
var switchScan_1 = require("./internal/operators/switchScan");
Object.defineProperty(exports, "switchScan", { enumerable: true, get: function () { return switchScan_1.switchScan; } });
var take_1 = require("./internal/operators/take");
Object.defineProperty(exports, "take", { enumerable: true, get: function () { return take_1.take; } });
var takeLast_1 = require("./internal/operators/takeLast");
Object.defineProperty(exports, "takeLast", { enumerable: true, get: function () { return takeLast_1.takeLast; } });
var takeUntil_1 = require("./internal/operators/takeUntil");
Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function () { return takeUntil_1.takeUntil; } });
var takeWhile_1 = require("./internal/operators/takeWhile");
Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function () { return takeWhile_1.takeWhile; } });
var tap_1 = require("./internal/operators/tap");
Object.defineProperty(exports, "tap", { enumerable: true, get: function () { return tap_1.tap; } });
var throttle_1 = require("./internal/operators/throttle");
Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return throttle_1.throttle; } });
var throttleTime_1 = require("./internal/operators/throttleTime");
Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function () { return throttleTime_1.throttleTime; } });
var throwIfEmpty_1 = require("./internal/operators/throwIfEmpty");
Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } });
var timeInterval_1 = require("./internal/operators/timeInterval");
Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function () { return timeInterval_1.timeInterval; } });
var timeout_2 = require("./internal/operators/timeout");
Object.defineProperty(exports, "timeout", { enumerable: true, get: function () { return timeout_2.timeout; } });
var timeoutWith_1 = require("./internal/operators/timeoutWith");
Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } });
var timestamp_1 = require("./internal/operators/timestamp");
Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.timestamp; } });
var toArray_1 = require("./internal/operators/toArray");
Object.defineProperty(exports, "toArray", { enumerable: true, get: function () { return toArray_1.toArray; } });
var window_1 = require("./internal/operators/window");
Object.defineProperty(exports, "window", { enumerable: true, get: function () { return window_1.window; } });
var windowCount_1 = require("./internal/operators/windowCount");
Object.defineProperty(exports, "windowCount", { enumerable: true, get: function () { return windowCount_1.windowCount; } });
var windowTime_1 = require("./internal/operators/windowTime");
Object.defineProperty(exports, "windowTime", { enumerable: true, get: function () { return windowTime_1.windowTime; } });
var windowToggle_1 = require("./internal/operators/windowToggle");
Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function () { return windowToggle_1.windowToggle; } });
var windowWhen_1 = require("./internal/operators/windowWhen");
Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function () { return windowWhen_1.windowWhen; } });
var withLatestFrom_1 = require("./internal/operators/withLatestFrom");
Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } });
var zipAll_1 = require("./internal/operators/zipAll");
Object.defineProperty(exports, "zipAll", { enumerable: true, get: function () { return zipAll_1.zipAll; } });
var zipWith_1 = require("./internal/operators/zipWith");
Object.defineProperty(exports, "zipWith", { enumerable: true, get: function () { return zipWith_1.zipWith; } });

},{"./internal/AsyncSubject":3,"./internal/BehaviorSubject":4,"./internal/Notification":5,"./internal/Observable":7,"./internal/ReplaySubject":8,"./internal/Scheduler":9,"./internal/Subject":10,"./internal/Subscriber":11,"./internal/Subscription":12,"./internal/config":13,"./internal/firstValueFrom":14,"./internal/lastValueFrom":15,"./internal/observable/ConnectableObservable":16,"./internal/observable/bindCallback":17,"./internal/observable/bindNodeCallback":19,"./internal/observable/combineLatest":20,"./internal/observable/concat":21,"./internal/observable/connectable":22,"./internal/observable/defer":23,"./internal/observable/dom/animationFrames":24,"./internal/observable/empty":25,"./internal/observable/forkJoin":26,"./internal/observable/from":27,"./internal/observable/fromEvent":28,"./internal/observable/fromEventPattern":29,"./internal/observable/generate":31,"./internal/observable/iif":32,"./internal/observable/interval":34,"./internal/observable/merge":35,"./internal/observable/never":36,"./internal/observable/of":37,"./internal/observable/onErrorResumeNext":38,"./internal/observable/pairs":39,"./internal/observable/partition":40,"./internal/observable/race":41,"./internal/observable/range":42,"./internal/observable/throwError":43,"./internal/observable/timer":44,"./internal/observable/using":45,"./internal/observable/zip":46,"./internal/operators/audit":48,"./internal/operators/auditTime":49,"./internal/operators/buffer":50,"./internal/operators/bufferCount":51,"./internal/operators/bufferTime":52,"./internal/operators/bufferToggle":53,"./internal/operators/bufferWhen":54,"./internal/operators/catchError":55,"./internal/operators/combineAll":56,"./internal/operators/combineLatestAll":58,"./internal/operators/combineLatestWith":59,"./internal/operators/concatAll":61,"./internal/operators/concatMap":62,"./internal/operators/concatMapTo":63,"./internal/operators/concatWith":64,"./internal/operators/connect":65,"./internal/operators/count":66,"./internal/operators/debounce":67,"./internal/operators/debounceTime":68,"./internal/operators/defaultIfEmpty":69,"./internal/operators/delay":70,"./internal/operators/delayWhen":71,"./internal/operators/dematerialize":72,"./internal/operators/distinct":73,"./internal/operators/distinctUntilChanged":74,"./internal/operators/distinctUntilKeyChanged":75,"./internal/operators/elementAt":76,"./internal/operators/endWith":77,"./internal/operators/every":78,"./internal/operators/exhaust":79,"./internal/operators/exhaustAll":80,"./internal/operators/exhaustMap":81,"./internal/operators/expand":82,"./internal/operators/filter":83,"./internal/operators/finalize":84,"./internal/operators/find":85,"./internal/operators/findIndex":86,"./internal/operators/first":87,"./internal/operators/flatMap":88,"./internal/operators/groupBy":89,"./internal/operators/ignoreElements":90,"./internal/operators/isEmpty":91,"./internal/operators/last":93,"./internal/operators/map":94,"./internal/operators/mapTo":95,"./internal/operators/materialize":96,"./internal/operators/max":97,"./internal/operators/mergeAll":99,"./internal/operators/mergeMap":101,"./internal/operators/mergeMapTo":102,"./internal/operators/mergeScan":103,"./internal/operators/mergeWith":104,"./internal/operators/min":105,"./internal/operators/multicast":106,"./internal/operators/observeOn":107,"./internal/operators/onErrorResumeNextWith":108,"./internal/operators/pairwise":109,"./internal/operators/pluck":110,"./internal/operators/publish":111,"./internal/operators/publishBehavior":112,"./internal/operators/publishLast":113,"./internal/operators/publishReplay":114,"./internal/operators/raceWith":115,"./internal/operators/reduce":116,"./internal/operators/refCount":117,"./internal/operators/repeat":118,"./internal/operators/repeatWhen":119,"./internal/operators/retry":120,"./internal/operators/retryWhen":121,"./internal/operators/sample":122,"./internal/operators/sampleTime":123,"./internal/operators/scan":124,"./internal/operators/sequenceEqual":126,"./internal/operators/share":127,"./internal/operators/shareReplay":128,"./internal/operators/single":129,"./internal/operators/skip":130,"./internal/operators/skipLast":131,"./internal/operators/skipUntil":132,"./internal/operators/skipWhile":133,"./internal/operators/startWith":134,"./internal/operators/subscribeOn":135,"./internal/operators/switchAll":136,"./internal/operators/switchMap":137,"./internal/operators/switchMapTo":138,"./internal/operators/switchScan":139,"./internal/operators/take":140,"./internal/operators/takeLast":141,"./internal/operators/takeUntil":142,"./internal/operators/takeWhile":143,"./internal/operators/tap":144,"./internal/operators/throttle":145,"./internal/operators/throttleTime":146,"./internal/operators/throwIfEmpty":147,"./internal/operators/timeInterval":148,"./internal/operators/timeout":149,"./internal/operators/timeoutWith":150,"./internal/operators/timestamp":151,"./internal/operators/toArray":152,"./internal/operators/window":153,"./internal/operators/windowCount":154,"./internal/operators/windowTime":155,"./internal/operators/windowToggle":156,"./internal/operators/windowWhen":157,"./internal/operators/withLatestFrom":158,"./internal/operators/zipAll":160,"./internal/operators/zipWith":161,"./internal/scheduled/scheduled":168,"./internal/scheduler/VirtualTimeScheduler":178,"./internal/scheduler/animationFrame":179,"./internal/scheduler/asap":181,"./internal/scheduler/async":182,"./internal/scheduler/queue":187,"./internal/symbol/observable":190,"./internal/types":191,"./internal/util/ArgumentOutOfRangeError":192,"./internal/util/EmptyError":193,"./internal/util/NotFoundError":195,"./internal/util/ObjectUnsubscribedError":196,"./internal/util/SequenceError":197,"./internal/util/UnsubscriptionError":198,"./internal/util/identity":207,"./internal/util/isObservable":214,"./internal/util/noop":220,"./internal/util/pipe":222}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncSubject = void 0;
var Subject_1 = require("./Subject");
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
    }
    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped || _isComplete) {
            _hasValue && subscriber.next(_value);
            subscriber.complete();
        }
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.isStopped) {
            this._value = value;
            this._hasValue = true;
        }
    };
    AsyncSubject.prototype.complete = function () {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
            this._isComplete = true;
            _hasValue && _super.prototype.next.call(this, _value);
            _super.prototype.complete.call(this);
        }
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;

},{"./Subject":10}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorSubject = void 0;
var Subject_1 = require("./Subject");
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;

},{"./Subject":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
var empty_1 = require("./observable/empty");
var of_1 = require("./observable/of");
var throwError_1 = require("./observable/throwError");
var isFunction_1 = require("./util/isFunction");
var NotificationKind;
(function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
})(NotificationKind = exports.NotificationKind || (exports.NotificationKind = {}));
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        return observeNotification(this, observer);
    };
    Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        var _a;
        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
            ? this.observe(nextOrObserver)
            : this.do(nextOrObserver, error, complete);
    };
    Notification.prototype.toObservable = function () {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        var result = kind === 'N'
            ?
                of_1.of(value)
            :
                kind === 'E'
                    ?
                        throwError_1.throwError(function () { return error; })
                    :
                        kind === 'C'
                            ?
                                empty_1.EMPTY
                            :
                                0;
        if (!result) {
            throw new TypeError("Unexpected notification kind " + kind);
        }
        return result;
    };
    Notification.createNext = function (value) {
        return new Notification('N', value);
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    return Notification;
}());
exports.Notification = Notification;
function observeNotification(notification, observer) {
    var _a, _b, _c;
    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
    if (typeof kind !== 'string') {
        throw new TypeError('Invalid notification, missing "kind"');
    }
    kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}
exports.observeNotification = observeNotification;

},{"./observable/empty":25,"./observable/of":37,"./observable/throwError":43,"./util/isFunction":211}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = exports.nextNotification = exports.errorNotification = exports.COMPLETE_NOTIFICATION = void 0;
exports.COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
exports.errorNotification = errorNotification;
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
exports.nextNotification = nextNotification;
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
exports.createNotification = createNotification;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
var Subscriber_1 = require("./Subscriber");
var Subscription_1 = require("./Subscription");
var observable_1 = require("./symbol/observable");
var pipe_1 = require("./util/pipe");
var config_1 = require("./config");
var isFunction_1 = require("./util/isFunction");
var errorContext_1 = require("./util/errorContext");
var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
        errorContext_1.errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new Subscriber_1.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber_1.Subscriber) || (isObserver(value) && Subscription_1.isSubscription(value));
}

},{"./Subscriber":11,"./Subscription":12,"./config":13,"./symbol/observable":190,"./util/errorContext":205,"./util/isFunction":211,"./util/pipe":222}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaySubject = void 0;
var Subject_1 = require("./Subject");
var dateTimestampProvider_1 = require("./scheduler/dateTimestampProvider");
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;

},{"./Subject":10,"./scheduler/dateTimestampProvider":183}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
var dateTimestampProvider_1 = require("./scheduler/dateTimestampProvider");
var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider_1.dateTimestampProvider.now;
    return Scheduler;
}());
exports.Scheduler = Scheduler;

},{"./scheduler/dateTimestampProvider":183}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousSubject = exports.Subject = void 0;
var Observable_1 = require("./Observable");
var Subscription_1 = require("./Subscription");
var ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
var arrRemove_1 = require("./util/arrRemove");
var errorContext_1 = require("./util/errorContext");
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext_1.errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext_1.errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext_1.errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return Subscription_1.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription_1.Subscription(function () {
            _this.currentObservers = null;
            arrRemove_1.arrRemove(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;

},{"./Observable":7,"./Subscription":12,"./util/ObjectUnsubscribedError":196,"./util/arrRemove":202,"./util/errorContext":205}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
var isFunction_1 = require("./util/isFunction");
var Subscription_1 = require("./Subscription");
var config_1 = require("./config");
var reportUnhandledError_1 = require("./util/reportUnhandledError");
var noop_1 = require("./util/noop");
var NotificationFactories_1 = require("./NotificationFactories");
var timeoutProvider_1 = require("./scheduler/timeoutProvider");
var errorContext_1 = require("./util/errorContext");
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (Subscription_1.isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = exports.EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && config_1.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
exports.SafeSubscriber = SafeSubscriber;
function handleUnhandledError(error) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        errorContext_1.captureError(error);
    }
    else {
        reportUnhandledError_1.reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config_1.config.onStoppedNotification;
    onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
exports.EMPTY_OBSERVER = {
    closed: true,
    next: noop_1.noop,
    error: defaultErrorHandler,
    complete: noop_1.noop,
};

},{"./NotificationFactories":6,"./Subscription":12,"./config":13,"./scheduler/timeoutProvider":188,"./util/errorContext":205,"./util/isFunction":211,"./util/noop":220,"./util/reportUnhandledError":223}],12:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubscription = exports.EMPTY_SUBSCRIPTION = exports.Subscription = void 0;
var isFunction_1 = require("./util/isFunction");
var UnsubscriptionError_1 = require("./util/UnsubscriptionError");
var arrRemove_1 = require("./util/arrRemove");
var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction_1.isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError_1.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove_1.arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove_1.arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
exports.Subscription = Subscription;
exports.EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe)));
}
exports.isSubscription = isSubscription;
function execFinalizer(finalizer) {
    if (isFunction_1.isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

},{"./util/UnsubscriptionError":198,"./util/arrRemove":202,"./util/isFunction":211}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstValueFrom = void 0;
var EmptyError_1 = require("./util/EmptyError");
var Subscriber_1 = require("./Subscriber");
function firstValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var subscriber = new Subscriber_1.SafeSubscriber({
            next: function (value) {
                resolve(value);
                subscriber.unsubscribe();
            },
            error: reject,
            complete: function () {
                if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1.EmptyError());
                }
            },
        });
        source.subscribe(subscriber);
    });
}
exports.firstValueFrom = firstValueFrom;

},{"./Subscriber":11,"./util/EmptyError":193}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastValueFrom = void 0;
var EmptyError_1 = require("./util/EmptyError");
function lastValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
            next: function (value) {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: function () {
                if (_hasValue) {
                    resolve(_value);
                }
                else if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1.EmptyError());
                }
            },
        });
    });
}
exports.lastValueFrom = lastValueFrom;

},{"./util/EmptyError":193}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectableObservable = void 0;
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
var refCount_1 = require("../operators/refCount");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var lift_1 = require("../util/lift");
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (lift_1.hasLift(source)) {
            _this.lift = source.lift;
        }
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype._teardown = function () {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    };
    ConnectableObservable.prototype.connect = function () {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            var subject_1 = this.getSubject();
            connection.add(this.source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subject_1, undefined, function () {
                _this._teardown();
                subject_1.complete();
            }, function (err) {
                _this._teardown();
                subject_1.error(err);
            }, function () { return _this._teardown(); })));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount_1.refCount()(this);
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;

},{"../Observable":7,"../Subscription":12,"../operators/OperatorSubscriber":47,"../operators/refCount":117,"../util/lift":218}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindCallback = void 0;
var bindCallbackInternals_1 = require("./bindCallbackInternals");
function bindCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}
exports.bindCallback = bindCallback;

},{"./bindCallbackInternals":18}],18:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindCallbackInternals = void 0;
var isScheduler_1 = require("../util/isScheduler");
var Observable_1 = require("../Observable");
var subscribeOn_1 = require("../operators/subscribeOn");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var observeOn_1 = require("../operators/observeOn");
var AsyncSubject_1 = require("../AsyncSubject");
function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler_1.isScheduler(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler)
                    .apply(this, args)
                    .pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
            };
        }
    }
    if (scheduler) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc)
                .apply(this, args)
                .pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
        };
    }
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subject = new AsyncSubject_1.AsyncSubject();
        var uninitialized = true;
        return new Observable_1.Observable(function (subscriber) {
            var subs = subject.subscribe(subscriber);
            if (uninitialized) {
                uninitialized = false;
                var isAsync_1 = false;
                var isComplete_1 = false;
                callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
                    function () {
                        var results = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            results[_i] = arguments[_i];
                        }
                        if (isNodeStyle) {
                            var err = results.shift();
                            if (err != null) {
                                subject.error(err);
                                return;
                            }
                        }
                        subject.next(1 < results.length ? results : results[0]);
                        isComplete_1 = true;
                        if (isAsync_1) {
                            subject.complete();
                        }
                    },
                ]));
                if (isComplete_1) {
                    subject.complete();
                }
                isAsync_1 = true;
            }
            return subs;
        });
    };
}
exports.bindCallbackInternals = bindCallbackInternals;

},{"../AsyncSubject":3,"../Observable":7,"../operators/observeOn":107,"../operators/subscribeOn":135,"../util/isScheduler":217,"../util/mapOneOrManyArgs":219}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindNodeCallback = void 0;
var bindCallbackInternals_1 = require("./bindCallbackInternals");
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}
exports.bindNodeCallback = bindNodeCallback;

},{"./bindCallbackInternals":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatestInit = exports.combineLatest = void 0;
var Observable_1 = require("../Observable");
var argsArgArrayOrObject_1 = require("../util/argsArgArrayOrObject");
var from_1 = require("./from");
var identity_1 = require("../util/identity");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var args_1 = require("../util/args");
var createObject_1 = require("../util/createObject");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var executeSchedule_1 = require("../util/executeSchedule");
function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var resultSelector = args_1.popResultSelector(args);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
        return from_1.from([], scheduler);
    }
    var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys
        ?
            function (values) { return createObject_1.createObject(keys, values); }
        :
            identity_1.identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
}
exports.combineLatest = combineLatest;
function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = identity_1.identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = from_1.from(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        }, subscriber);
    };
}
exports.combineLatestInit = combineLatestInit;
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        executeSchedule_1.executeSchedule(subscription, scheduler, execute);
    }
    else {
        execute();
    }
}

},{"../Observable":7,"../operators/OperatorSubscriber":47,"../util/args":199,"../util/argsArgArrayOrObject":200,"../util/createObject":204,"../util/executeSchedule":206,"../util/identity":207,"../util/mapOneOrManyArgs":219,"./from":27}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = void 0;
var concatAll_1 = require("../operators/concatAll");
var args_1 = require("../util/args");
var from_1 = require("./from");
function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return concatAll_1.concatAll()(from_1.from(args, args_1.popScheduler(args)));
}
exports.concat = concat;

},{"../operators/concatAll":61,"../util/args":199,"./from":27}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectable = void 0;
var Subject_1 = require("../Subject");
var Observable_1 = require("../Observable");
var defer_1 = require("./defer");
var DEFAULT_CONFIG = {
    connector: function () { return new Subject_1.Subject(); },
    resetOnDisconnect: true,
};
function connectable(source, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connection = null;
    var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
    var subject = connector();
    var result = new Observable_1.Observable(function (subscriber) {
        return subject.subscribe(subscriber);
    });
    result.connect = function () {
        if (!connection || connection.closed) {
            connection = defer_1.defer(function () { return source; }).subscribe(subject);
            if (resetOnDisconnect) {
                connection.add(function () { return (subject = connector()); });
            }
        }
        return connection;
    };
    return result;
}
exports.connectable = connectable;

},{"../Observable":7,"../Subject":10,"./defer":23}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = void 0;
var Observable_1 = require("../Observable");
var innerFrom_1 = require("./innerFrom");
function defer(observableFactory) {
    return new Observable_1.Observable(function (subscriber) {
        innerFrom_1.innerFrom(observableFactory()).subscribe(subscriber);
    });
}
exports.defer = defer;

},{"../Observable":7,"./innerFrom":33}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrames = void 0;
var Observable_1 = require("../../Observable");
var performanceTimestampProvider_1 = require("../../scheduler/performanceTimestampProvider");
var animationFrameProvider_1 = require("../../scheduler/animationFrameProvider");
function animationFrames(timestampProvider) {
    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
exports.animationFrames = animationFrames;
function animationFramesFactory(timestampProvider) {
    return new Observable_1.Observable(function (subscriber) {
        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
        var start = provider.now();
        var id = 0;
        var run = function () {
            if (!subscriber.closed) {
                id = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function (timestamp) {
                    id = 0;
                    var now = provider.now();
                    subscriber.next({
                        timestamp: timestampProvider ? now : timestamp,
                        elapsed: now - start,
                    });
                    run();
                });
            }
        };
        run();
        return function () {
            if (id) {
                animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
            }
        };
    });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();

},{"../../Observable":7,"../../scheduler/animationFrameProvider":180,"../../scheduler/performanceTimestampProvider":186}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.EMPTY = void 0;
var Observable_1 = require("../Observable");
exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
}
exports.empty = empty;
function emptyScheduled(scheduler) {
    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}

},{"../Observable":7}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forkJoin = void 0;
var Observable_1 = require("../Observable");
var argsArgArrayOrObject_1 = require("../util/argsArgArrayOrObject");
var innerFrom_1 = require("./innerFrom");
var args_1 = require("../util/args");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var createObject_1 = require("../util/createObject");
function forkJoin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
    var result = new Observable_1.Observable(function (subscriber) {
        var length = sources.length;
        if (!length) {
            subscriber.complete();
            return;
        }
        var values = new Array(length);
        var remainingCompletions = length;
        var remainingEmissions = length;
        var _loop_1 = function (sourceIndex) {
            var hasValue = false;
            innerFrom_1.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                if (!hasValue) {
                    hasValue = true;
                    remainingEmissions--;
                }
                values[sourceIndex] = value;
            }, function () { return remainingCompletions--; }, undefined, function () {
                if (!remainingCompletions || !hasValue) {
                    if (!remainingEmissions) {
                        subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
                    }
                    subscriber.complete();
                }
            }));
        };
        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            _loop_1(sourceIndex);
        }
    });
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
}
exports.forkJoin = forkJoin;

},{"../Observable":7,"../operators/OperatorSubscriber":47,"../util/args":199,"../util/argsArgArrayOrObject":200,"../util/createObject":204,"../util/mapOneOrManyArgs":219,"./innerFrom":33}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
var scheduled_1 = require("../scheduled/scheduled");
var innerFrom_1 = require("./innerFrom");
function from(input, scheduler) {
    return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1.innerFrom(input);
}
exports.from = from;

},{"../scheduled/scheduled":168,"./innerFrom":33}],28:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEvent = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var Observable_1 = require("../Observable");
var mergeMap_1 = require("../operators/mergeMap");
var isArrayLike_1 = require("../util/isArrayLike");
var isFunction_1 = require("../util/isFunction");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction_1.isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    var _a = __read(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if (isArrayLike_1.isArrayLike(target)) {
            return mergeMap_1.mergeMap(function (subTarget) { return fromEvent(subTarget, eventName, options); })(innerFrom_1.innerFrom(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new Observable_1.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
exports.fromEvent = fromEvent;
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
}
function isEventTarget(target) {
    return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
}

},{"../Observable":7,"../observable/innerFrom":33,"../operators/mergeMap":101,"../util/isArrayLike":208,"../util/isFunction":211,"../util/mapOneOrManyArgs":219}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEventPattern = void 0;
var Observable_1 = require("../Observable");
var isFunction_1 = require("../util/isFunction");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    return new Observable_1.Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction_1.isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
    });
}
exports.fromEventPattern = fromEventPattern;

},{"../Observable":7,"../util/isFunction":211,"../util/mapOneOrManyArgs":219}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromSubscribable = void 0;
var Observable_1 = require("../Observable");
function fromSubscribable(subscribable) {
    return new Observable_1.Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
}
exports.fromSubscribable = fromSubscribable;

},{"../Observable":7}],31:[function(require,module,exports){
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var identity_1 = require("../util/identity");
var isScheduler_1 = require("../util/isScheduler");
var defer_1 = require("./defer");
var scheduleIterable_1 = require("../scheduled/scheduleIterable");
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
    var _a, _b;
    var resultSelector;
    var initialState;
    if (arguments.length === 1) {
        (_a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler);
    }
    else {
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
            resultSelector = identity_1.identity;
            scheduler = resultSelectorOrScheduler;
        }
        else {
            resultSelector = resultSelectorOrScheduler;
        }
    }
    function gen() {
        var state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = initialState;
                    _a.label = 1;
                case 1:
                    if (!(!condition || condition(state))) return [3, 4];
                    return [4, resultSelector(state)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    state = iterate(state);
                    return [3, 1];
                case 4: return [2];
            }
        });
    }
    return defer_1.defer((scheduler
        ?
            function () { return scheduleIterable_1.scheduleIterable(gen(), scheduler); }
        :
            gen));
}
exports.generate = generate;

},{"../scheduled/scheduleIterable":164,"../util/identity":207,"../util/isScheduler":217,"./defer":23}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iif = void 0;
var defer_1 = require("./defer");
function iif(condition, trueResult, falseResult) {
    return defer_1.defer(function () { return (condition() ? trueResult : falseResult); });
}
exports.iif = iif;

},{"./defer":23}],33:[function(require,module,exports){
(function (process){(function (){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromReadableStreamLike = exports.fromAsyncIterable = exports.fromIterable = exports.fromPromise = exports.fromArrayLike = exports.fromInteropObservable = exports.innerFrom = void 0;
var isArrayLike_1 = require("../util/isArrayLike");
var isPromise_1 = require("../util/isPromise");
var Observable_1 = require("../Observable");
var isInteropObservable_1 = require("../util/isInteropObservable");
var isAsyncIterable_1 = require("../util/isAsyncIterable");
var throwUnobservableError_1 = require("../util/throwUnobservableError");
var isIterable_1 = require("../util/isIterable");
var isReadableStreamLike_1 = require("../util/isReadableStreamLike");
var isFunction_1 = require("../util/isFunction");
var reportUnhandledError_1 = require("../util/reportUnhandledError");
var observable_1 = require("../symbol/observable");
function innerFrom(input) {
    if (input instanceof Observable_1.Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike_1.isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise_1.isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable_1.isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
exports.innerFrom = innerFrom;
function fromInteropObservable(obj) {
    return new Observable_1.Observable(function (subscriber) {
        var obs = obj[observable_1.observable]();
        if (isFunction_1.isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
exports.fromInteropObservable = fromInteropObservable;
function fromArrayLike(array) {
    return new Observable_1.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
exports.fromArrayLike = fromArrayLike;
function fromPromise(promise) {
    return new Observable_1.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError_1.reportUnhandledError);
    });
}
exports.fromPromise = fromPromise;
function fromIterable(iterable) {
    return new Observable_1.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
exports.fromIterable = fromIterable;
function fromAsyncIterable(asyncIterable) {
    return new Observable_1.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
exports.fromAsyncIterable = fromAsyncIterable;
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
}
exports.fromReadableStreamLike = fromReadableStreamLike;
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

}).call(this)}).call(this,require('_process'))

},{"../Observable":7,"../symbol/observable":190,"../util/isArrayLike":208,"../util/isAsyncIterable":209,"../util/isFunction":211,"../util/isInteropObservable":212,"../util/isIterable":213,"../util/isPromise":215,"../util/isReadableStreamLike":216,"../util/reportUnhandledError":223,"../util/throwUnobservableError":224,"_process":1}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = void 0;
var async_1 = require("../scheduler/async");
var timer_1 = require("./timer");
function interval(period, scheduler) {
    if (period === void 0) { period = 0; }
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    if (period < 0) {
        period = 0;
    }
    return timer_1.timer(period, period, scheduler);
}
exports.interval = interval;

},{"../scheduler/async":182,"./timer":44}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
var mergeAll_1 = require("../operators/mergeAll");
var innerFrom_1 = require("./innerFrom");
var empty_1 = require("./empty");
var args_1 = require("../util/args");
var from_1 = require("./from");
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var concurrent = args_1.popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            empty_1.EMPTY
        : sources.length === 1
            ?
                innerFrom_1.innerFrom(sources[0])
            :
                mergeAll_1.mergeAll(concurrent)(from_1.from(sources, scheduler));
}
exports.merge = merge;

},{"../operators/mergeAll":99,"../util/args":199,"./empty":25,"./from":27,"./innerFrom":33}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.never = exports.NEVER = void 0;
var Observable_1 = require("../Observable");
var noop_1 = require("../util/noop");
exports.NEVER = new Observable_1.Observable(noop_1.noop);
function never() {
    return exports.NEVER;
}
exports.never = never;

},{"../Observable":7,"../util/noop":220}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.of = void 0;
var args_1 = require("../util/args");
var from_1 = require("./from");
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    return from_1.from(args, scheduler);
}
exports.of = of;

},{"../util/args":199,"./from":27}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorResumeNext = void 0;
var Observable_1 = require("../Observable");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var noop_1 = require("../util/noop");
var innerFrom_1 = require("./innerFrom");
function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
    return new Observable_1.Observable(function (subscriber) {
        var sourceIndex = 0;
        var subscribeNext = function () {
            if (sourceIndex < nextSources.length) {
                var nextSource = void 0;
                try {
                    nextSource = innerFrom_1.innerFrom(nextSources[sourceIndex++]);
                }
                catch (err) {
                    subscribeNext();
                    return;
                }
                var innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, noop_1.noop, noop_1.noop);
                nextSource.subscribe(innerSubscriber);
                innerSubscriber.add(subscribeNext);
            }
            else {
                subscriber.complete();
            }
        };
        subscribeNext();
    });
}
exports.onErrorResumeNext = onErrorResumeNext;

},{"../Observable":7,"../operators/OperatorSubscriber":47,"../util/argsOrArgArray":201,"../util/noop":220,"./innerFrom":33}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairs = void 0;
var from_1 = require("./from");
function pairs(obj, scheduler) {
    return from_1.from(Object.entries(obj), scheduler);
}
exports.pairs = pairs;

},{"./from":27}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partition = void 0;
var not_1 = require("../util/not");
var filter_1 = require("../operators/filter");
var innerFrom_1 = require("./innerFrom");
function partition(source, predicate, thisArg) {
    return [filter_1.filter(predicate, thisArg)(innerFrom_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(innerFrom_1.innerFrom(source))];
}
exports.partition = partition;

},{"../operators/filter":83,"../util/not":221,"./innerFrom":33}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceInit = exports.race = void 0;
var Observable_1 = require("../Observable");
var innerFrom_1 = require("./innerFrom");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
function race() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    sources = argsOrArgArray_1.argsOrArgArray(sources);
    return sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
}
exports.race = race;
function raceInit(sources) {
    return function (subscriber) {
        var subscriptions = [];
        var _loop_1 = function (i) {
            subscriptions.push(innerFrom_1.innerFrom(sources[i]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                if (subscriptions) {
                    for (var s = 0; s < subscriptions.length; s++) {
                        s !== i && subscriptions[s].unsubscribe();
                    }
                    subscriptions = null;
                }
                subscriber.next(value);
            })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            _loop_1(i);
        }
    };
}
exports.raceInit = raceInit;

},{"../Observable":7,"../operators/OperatorSubscriber":47,"../util/argsOrArgArray":201,"./innerFrom":33}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
var Observable_1 = require("../Observable");
var empty_1 = require("./empty");
function range(start, count, scheduler) {
    if (count == null) {
        count = start;
        start = 0;
    }
    if (count <= 0) {
        return empty_1.EMPTY;
    }
    var end = count + start;
    return new Observable_1.Observable(scheduler
        ?
            function (subscriber) {
                var n = start;
                return scheduler.schedule(function () {
                    if (n < end) {
                        subscriber.next(n++);
                        this.schedule();
                    }
                    else {
                        subscriber.complete();
                    }
                });
            }
        :
            function (subscriber) {
                var n = start;
                while (n < end && !subscriber.closed) {
                    subscriber.next(n++);
                }
                subscriber.complete();
            });
}
exports.range = range;

},{"../Observable":7,"./empty":25}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
var Observable_1 = require("../Observable");
var isFunction_1 = require("../util/isFunction");
function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
    var init = function (subscriber) { return subscriber.error(errorFactory()); };
    return new Observable_1.Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
}
exports.throwError = throwError;

},{"../Observable":7,"../util/isFunction":211}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = void 0;
var Observable_1 = require("../Observable");
var async_1 = require("../scheduler/async");
var isScheduler_1 = require("../util/isScheduler");
var isDate_1 = require("../util/isDate");
function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable_1.Observable(function (subscriber) {
        var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}
exports.timer = timer;

},{"../Observable":7,"../scheduler/async":182,"../util/isDate":210,"../util/isScheduler":217}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.using = void 0;
var Observable_1 = require("../Observable");
var innerFrom_1 = require("./innerFrom");
var empty_1 = require("./empty");
function using(resourceFactory, observableFactory) {
    return new Observable_1.Observable(function (subscriber) {
        var resource = resourceFactory();
        var result = observableFactory(resource);
        var source = result ? innerFrom_1.innerFrom(result) : empty_1.EMPTY;
        source.subscribe(subscriber);
        return function () {
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
exports.using = using;

},{"../Observable":7,"./empty":25,"./innerFrom":33}],46:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
var Observable_1 = require("../Observable");
var innerFrom_1 = require("./innerFrom");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var empty_1 = require("./empty");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var args_1 = require("../util/args");
function zip() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    var sources = argsOrArgArray_1.argsOrArgArray(args);
    return sources.length
        ? new Observable_1.Observable(function (subscriber) {
            var buffers = sources.map(function () { return []; });
            var completed = sources.map(function () { return false; });
            subscriber.add(function () {
                buffers = completed = null;
            });
            var _loop_1 = function (sourceIndex) {
                innerFrom_1.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                    buffers[sourceIndex].push(value);
                    if (buffers.every(function (buffer) { return buffer.length; })) {
                        var result = buffers.map(function (buffer) { return buffer.shift(); });
                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                            subscriber.complete();
                        }
                    }
                }, function () {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            };
            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                _loop_1(sourceIndex);
            }
            return function () {
                buffers = completed = null;
            };
        })
        : empty_1.EMPTY;
}
exports.zip = zip;

},{"../Observable":7,"../operators/OperatorSubscriber":47,"../util/args":199,"../util/argsOrArgArray":201,"./empty":25,"./innerFrom":33}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorSubscriber = exports.createOperatorSubscriber = void 0;
var Subscriber_1 = require("../Subscriber");
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
exports.createOperatorSubscriber = createOperatorSubscriber;
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber_1.Subscriber));
exports.OperatorSubscriber = OperatorSubscriber;

},{"../Subscriber":11}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audit = void 0;
var lift_1 = require("../util/lift");
var innerFrom_1 = require("../observable/innerFrom");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function audit(durationSelector) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var isComplete = false;
        var endDuration = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
            isComplete && subscriber.complete();
        };
        var cleanupDuration = function () {
            durationSubscriber = null;
            isComplete && subscriber.complete();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
            if (!durationSubscriber) {
                innerFrom_1.innerFrom(durationSelector(value)).subscribe((durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, endDuration, cleanupDuration)));
            }
        }, function () {
            isComplete = true;
            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
        }));
    });
}
exports.audit = audit;

},{"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditTime = void 0;
var async_1 = require("../scheduler/async");
var audit_1 = require("./audit");
var timer_1 = require("../observable/timer");
function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    return audit_1.audit(function () { return timer_1.timer(duration, scheduler); });
}
exports.auditTime = auditTime;

},{"../observable/timer":44,"../scheduler/async":182,"./audit":48}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer = void 0;
var lift_1 = require("../util/lift");
var noop_1 = require("../util/noop");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
function buffer(closingNotifier) {
    return lift_1.operate(function (source, subscriber) {
        var currentBuffer = [];
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
            subscriber.next(currentBuffer);
            subscriber.complete();
        }));
        innerFrom_1.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
            var b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
        }, noop_1.noop));
        return function () {
            currentBuffer = null;
        };
    });
}
exports.buffer = buffer;

},{"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],51:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferCount = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var arrRemove_1 = require("../util/arrRemove");
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return lift_1.operate(function (source, subscriber) {
        var buffers = [];
        var count = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a, e_2, _b;
            var toEmit = null;
            if (count++ % startBufferEvery === 0) {
                buffers.push([]);
            }
            try {
                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                    if (bufferSize <= buffer.length) {
                        toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                        toEmit.push(buffer);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (toEmit) {
                try {
                    for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                        var buffer = toEmit_1_1.value;
                        arrRemove_1.arrRemove(buffers, buffer);
                        subscriber.next(buffer);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }, function () {
            var e_3, _a;
            try {
                for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
                    var buffer = buffers_2_1.value;
                    subscriber.next(buffer);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            subscriber.complete();
        }, undefined, function () {
            buffers = null;
        }));
    });
}
exports.bufferCount = bufferCount;

},{"../util/arrRemove":202,"../util/lift":218,"./OperatorSubscriber":47}],52:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferTime = void 0;
var Subscription_1 = require("../Subscription");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var arrRemove_1 = require("../util/arrRemove");
var async_1 = require("../scheduler/async");
var args_1 = require("../util/args");
var executeSchedule_1 = require("../util/executeSchedule");
function bufferTime(bufferTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxBufferSize = otherArgs[1] || Infinity;
    return lift_1.operate(function (source, subscriber) {
        var bufferRecords = [];
        var restartOnEmit = false;
        var emit = function (record) {
            var buffer = record.buffer, subs = record.subs;
            subs.unsubscribe();
            arrRemove_1.arrRemove(bufferRecords, record);
            subscriber.next(buffer);
            restartOnEmit && startBuffer();
        };
        var startBuffer = function () {
            if (bufferRecords) {
                var subs = new Subscription_1.Subscription();
                subscriber.add(subs);
                var buffer = [];
                var record_1 = {
                    buffer: buffer,
                    subs: subs,
                };
                bufferRecords.push(record_1);
                executeSchedule_1.executeSchedule(subs, scheduler, function () { return emit(record_1); }, bufferTimeSpan);
            }
        };
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            executeSchedule_1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
        }
        else {
            restartOnEmit = true;
        }
        startBuffer();
        var bufferTimeSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var recordsCopy = bufferRecords.slice();
            try {
                for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
                    var record = recordsCopy_1_1.value;
                    var buffer = record.buffer;
                    buffer.push(value);
                    maxBufferSize <= buffer.length && emit(record);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
                subscriber.next(bufferRecords.shift().buffer);
            }
            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
            subscriber.complete();
            subscriber.unsubscribe();
        }, undefined, function () { return (bufferRecords = null); });
        source.subscribe(bufferTimeSubscriber);
    });
}
exports.bufferTime = bufferTime;

},{"../Subscription":12,"../scheduler/async":182,"../util/args":199,"../util/arrRemove":202,"../util/executeSchedule":206,"../util/lift":218,"./OperatorSubscriber":47}],53:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToggle = void 0;
var Subscription_1 = require("../Subscription");
var lift_1 = require("../util/lift");
var innerFrom_1 = require("../observable/innerFrom");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var noop_1 = require("../util/noop");
var arrRemove_1 = require("../util/arrRemove");
function bufferToggle(openings, closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var buffers = [];
        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (openValue) {
            var buffer = [];
            buffers.push(buffer);
            var closingSubscription = new Subscription_1.Subscription();
            var emitBuffer = function () {
                arrRemove_1.arrRemove(buffers, buffer);
                subscriber.next(buffer);
                closingSubscription.unsubscribe();
            };
            closingSubscription.add(innerFrom_1.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
        }, noop_1.noop));
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (buffers.length > 0) {
                subscriber.next(buffers.shift());
            }
            subscriber.complete();
        }));
    });
}
exports.bufferToggle = bufferToggle;

},{"../Subscription":12,"../observable/innerFrom":33,"../util/arrRemove":202,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferWhen = void 0;
var lift_1 = require("../util/lift");
var noop_1 = require("../util/noop");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
function bufferWhen(closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var buffer = null;
        var closingSubscriber = null;
        var openBuffer = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            var b = buffer;
            buffer = [];
            b && subscriber.next(b);
            innerFrom_1.innerFrom(closingSelector()).subscribe((closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openBuffer, noop_1.noop)));
        };
        openBuffer();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
            buffer && subscriber.next(buffer);
            subscriber.complete();
        }, undefined, function () { return (buffer = closingSubscriber = null); }));
    });
}
exports.bufferWhen = bufferWhen;

},{"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var lift_1 = require("../util/lift");
function catchError(selector) {
    return lift_1.operate(function (source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
            handledResult = innerFrom_1.innerFrom(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}
exports.catchError = catchError;

},{"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineAll = void 0;
var combineLatestAll_1 = require("./combineLatestAll");
exports.combineAll = combineLatestAll_1.combineLatestAll;

},{"./combineLatestAll":58}],57:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatest = void 0;
var combineLatest_1 = require("../observable/combineLatest");
var lift_1 = require("../util/lift");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var pipe_1 = require("../util/pipe");
var args_1 = require("../util/args");
function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    return resultSelector
        ? pipe_1.pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector))
        : lift_1.operate(function (source, subscriber) {
            combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args))))(subscriber);
        });
}
exports.combineLatest = combineLatest;

},{"../observable/combineLatest":20,"../util/args":199,"../util/argsOrArgArray":201,"../util/lift":218,"../util/mapOneOrManyArgs":219,"../util/pipe":222}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatestAll = void 0;
var combineLatest_1 = require("../observable/combineLatest");
var joinAllInternals_1 = require("./joinAllInternals");
function combineLatestAll(project) {
    return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
}
exports.combineLatestAll = combineLatestAll;

},{"../observable/combineLatest":20,"./joinAllInternals":92}],59:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatestWith = void 0;
var combineLatest_1 = require("./combineLatest");
function combineLatestWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
}
exports.combineLatestWith = combineLatestWith;

},{"./combineLatest":57}],60:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = void 0;
var lift_1 = require("../util/lift");
var concatAll_1 = require("./concatAll");
var args_1 = require("../util/args");
var from_1 = require("../observable/from");
function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    return lift_1.operate(function (source, subscriber) {
        concatAll_1.concatAll()(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
exports.concat = concat;

},{"../observable/from":27,"../util/args":199,"../util/lift":218,"./concatAll":61}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatAll = void 0;
var mergeAll_1 = require("./mergeAll");
function concatAll() {
    return mergeAll_1.mergeAll(1);
}
exports.concatAll = concatAll;

},{"./mergeAll":99}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatMap = void 0;
var mergeMap_1 = require("./mergeMap");
var isFunction_1 = require("../util/isFunction");
function concatMap(project, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
}
exports.concatMap = concatMap;

},{"../util/isFunction":211,"./mergeMap":101}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatMapTo = void 0;
var concatMap_1 = require("./concatMap");
var isFunction_1 = require("../util/isFunction");
function concatMapTo(innerObservable, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function () { return innerObservable; }, resultSelector) : concatMap_1.concatMap(function () { return innerObservable; });
}
exports.concatMapTo = concatMapTo;

},{"../util/isFunction":211,"./concatMap":62}],64:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatWith = void 0;
var concat_1 = require("./concat");
function concatWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
}
exports.concatWith = concatWith;

},{"./concat":60}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var Subject_1 = require("../Subject");
var innerFrom_1 = require("../observable/innerFrom");
var lift_1 = require("../util/lift");
var fromSubscribable_1 = require("../observable/fromSubscribable");
var DEFAULT_CONFIG = {
    connector: function () { return new Subject_1.Subject(); },
};
function connect(selector, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connector = config.connector;
    return lift_1.operate(function (source, subscriber) {
        var subject = connector();
        innerFrom_1.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
    });
}
exports.connect = connect;

},{"../Subject":10,"../observable/fromSubscribable":30,"../observable/innerFrom":33,"../util/lift":218}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = void 0;
var reduce_1 = require("./reduce");
function count(predicate) {
    return reduce_1.reduce(function (total, value, i) { return (!predicate || predicate(value, i) ? total + 1 : total); }, 0);
}
exports.count = count;

},{"./reduce":116}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
var lift_1 = require("../util/lift");
var noop_1 = require("../util/noop");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
function debounce(durationSelector) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var emit = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            hasValue = true;
            lastValue = value;
            durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, emit, noop_1.noop);
            innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = durationSubscriber = null;
        }));
    });
}
exports.debounce = debounce;

},{"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceTime = void 0;
var async_1 = require("../scheduler/async");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    return lift_1.operate(function (source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function () {
            if (activeTask) {
                activeTask.unsubscribe();
                activeTask = null;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        function emitWhenIdle() {
            var targetTime = lastTime + dueTime;
            var now = scheduler.now();
            if (now < targetTime) {
                activeTask = this.schedule(undefined, targetTime - now);
                subscriber.add(activeTask);
                return;
            }
            emit();
        }
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                subscriber.add(activeTask);
            }
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = activeTask = null;
        }));
    });
}
exports.debounceTime = debounceTime;

},{"../scheduler/async":182,"../util/lift":218,"./OperatorSubscriber":47}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultIfEmpty = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function defaultIfEmpty(defaultValue) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}
exports.defaultIfEmpty = defaultIfEmpty;

},{"../util/lift":218,"./OperatorSubscriber":47}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
var async_1 = require("../scheduler/async");
var delayWhen_1 = require("./delayWhen");
var timer_1 = require("../observable/timer");
function delay(due, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    var duration = timer_1.timer(due, scheduler);
    return delayWhen_1.delayWhen(function () { return duration; });
}
exports.delay = delay;

},{"../observable/timer":44,"../scheduler/async":182,"./delayWhen":71}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayWhen = void 0;
var concat_1 = require("../observable/concat");
var take_1 = require("./take");
var ignoreElements_1 = require("./ignoreElements");
var mapTo_1 = require("./mapTo");
var mergeMap_1 = require("./mergeMap");
var innerFrom_1 = require("../observable/innerFrom");
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return function (source) {
            return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
        };
    }
    return mergeMap_1.mergeMap(function (value, index) { return innerFrom_1.innerFrom(delayDurationSelector(value, index)).pipe(take_1.take(1), mapTo_1.mapTo(value)); });
}
exports.delayWhen = delayWhen;

},{"../observable/concat":21,"../observable/innerFrom":33,"./ignoreElements":90,"./mapTo":95,"./mergeMap":101,"./take":140}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dematerialize = void 0;
var Notification_1 = require("../Notification");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function dematerialize() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (notification) { return Notification_1.observeNotification(notification, subscriber); }));
    });
}
exports.dematerialize = dematerialize;

},{"../Notification":5,"../util/lift":218,"./OperatorSubscriber":47}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinct = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var noop_1 = require("../util/noop");
var innerFrom_1 = require("../observable/innerFrom");
function distinct(keySelector, flushes) {
    return lift_1.operate(function (source, subscriber) {
        var distinctKeys = new Set();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
                distinctKeys.add(key);
                subscriber.next(value);
            }
        }));
        flushes && innerFrom_1.innerFrom(flushes).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop_1.noop));
    });
}
exports.distinct = distinct;

},{"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinctUntilChanged = void 0;
var identity_1 = require("../util/identity");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function distinctUntilChanged(comparator, keySelector) {
    if (keySelector === void 0) { keySelector = identity_1.identity; }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return lift_1.operate(function (source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
                first = false;
                previousKey = currentKey;
                subscriber.next(value);
            }
        }));
    });
}
exports.distinctUntilChanged = distinctUntilChanged;
function defaultCompare(a, b) {
    return a === b;
}

},{"../util/identity":207,"../util/lift":218,"./OperatorSubscriber":47}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinctUntilKeyChanged = void 0;
var distinctUntilChanged_1 = require("./distinctUntilChanged");
function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged(function (x, y) { return (compare ? compare(x[key], y[key]) : x[key] === y[key]); });
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;

},{"./distinctUntilChanged":74}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementAt = void 0;
var ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
var filter_1 = require("./filter");
var throwIfEmpty_1 = require("./throwIfEmpty");
var defaultIfEmpty_1 = require("./defaultIfEmpty");
var take_1 = require("./take");
function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(filter_1.filter(function (v, i) { return i === index; }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError(); }));
    };
}
exports.elementAt = elementAt;

},{"../util/ArgumentOutOfRangeError":192,"./defaultIfEmpty":69,"./filter":83,"./take":140,"./throwIfEmpty":147}],77:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endWith = void 0;
var concat_1 = require("../observable/concat");
var of_1 = require("../observable/of");
function endWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return function (source) { return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values)))); };
}
exports.endWith = endWith;

},{"../observable/concat":21,"../observable/of":37}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.every = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function every(predicate, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            if (!predicate.call(thisArg, value, index++, source)) {
                subscriber.next(false);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
exports.every = every;

},{"../util/lift":218,"./OperatorSubscriber":47}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaust = void 0;
var exhaustAll_1 = require("./exhaustAll");
exports.exhaust = exhaustAll_1.exhaustAll;

},{"./exhaustAll":80}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustAll = void 0;
var exhaustMap_1 = require("./exhaustMap");
var identity_1 = require("../util/identity");
function exhaustAll() {
    return exhaustMap_1.exhaustMap(identity_1.identity);
}
exports.exhaustAll = exhaustAll;

},{"../util/identity":207,"./exhaustMap":81}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustMap = void 0;
var map_1 = require("./map");
var innerFrom_1 = require("../observable/innerFrom");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return function (source) {
            return source.pipe(exhaustMap(function (a, i) { return innerFrom_1.innerFrom(project(a, i)).pipe(map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })); }));
        };
    }
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        var innerSub = null;
        var isComplete = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (outerValue) {
            if (!innerSub) {
                innerSub = OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
                    innerSub = null;
                    isComplete && subscriber.complete();
                });
                innerFrom_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
            }
        }, function () {
            isComplete = true;
            !innerSub && subscriber.complete();
        }));
    });
}
exports.exhaustMap = exhaustMap;

},{"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47,"./map":94}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expand = void 0;
var lift_1 = require("../util/lift");
var mergeInternals_1 = require("./mergeInternals");
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Infinity; }
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return lift_1.operate(function (source, subscriber) {
        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
    });
}
exports.expand = expand;

},{"../util/lift":218,"./mergeInternals":100}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function filter(predicate, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
exports.filter = filter;

},{"../util/lift":218,"./OperatorSubscriber":47}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalize = void 0;
var lift_1 = require("../util/lift");
function finalize(callback) {
    return lift_1.operate(function (source, subscriber) {
        try {
            source.subscribe(subscriber);
        }
        finally {
            subscriber.add(callback);
        }
    });
}
exports.finalize = finalize;

},{"../util/lift":218}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFind = exports.find = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function find(predicate, thisArg) {
    return lift_1.operate(createFind(predicate, thisArg, 'value'));
}
exports.find = find;
function createFind(predicate, thisArg, emit) {
    var findIndex = emit === 'index';
    return function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var i = index++;
            if (predicate.call(thisArg, value, i, source)) {
                subscriber.next(findIndex ? i : value);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(findIndex ? -1 : undefined);
            subscriber.complete();
        }));
    };
}
exports.createFind = createFind;

},{"../util/lift":218,"./OperatorSubscriber":47}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIndex = void 0;
var lift_1 = require("../util/lift");
var find_1 = require("./find");
function findIndex(predicate, thisArg) {
    return lift_1.operate(find_1.createFind(predicate, thisArg, 'index'));
}
exports.findIndex = findIndex;

},{"../util/lift":218,"./find":85}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.first = void 0;
var EmptyError_1 = require("../util/EmptyError");
var filter_1 = require("./filter");
var take_1 = require("./take");
var defaultIfEmpty_1 = require("./defaultIfEmpty");
var throwIfEmpty_1 = require("./throwIfEmpty");
var identity_1 = require("../util/identity");
function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
    };
}
exports.first = first;

},{"../util/EmptyError":193,"../util/identity":207,"./defaultIfEmpty":69,"./filter":83,"./take":140,"./throwIfEmpty":147}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatMap = void 0;
var mergeMap_1 = require("./mergeMap");
exports.flatMap = mergeMap_1.mergeMap;

},{"./mergeMap":101}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
var Observable_1 = require("../Observable");
var innerFrom_1 = require("../observable/innerFrom");
var Subject_1 = require("../Subject");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function groupBy(keySelector, elementOrOptions, duration, connector) {
    return lift_1.operate(function (source, subscriber) {
        var element;
        if (!elementOrOptions || typeof elementOrOptions === 'function') {
            element = elementOrOptions;
        }
        else {
            (duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector);
        }
        var groups = new Map();
        var notify = function (cb) {
            groups.forEach(cb);
            cb(subscriber);
        };
        var handleError = function (err) { return notify(function (consumer) { return consumer.error(err); }); };
        var activeGroups = 0;
        var teardownAttempted = false;
        var groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            try {
                var key_1 = keySelector(value);
                var group_1 = groups.get(key_1);
                if (!group_1) {
                    groups.set(key_1, (group_1 = connector ? connector() : new Subject_1.Subject()));
                    var grouped = createGroupedObservable(key_1, group_1);
                    subscriber.next(grouped);
                    if (duration) {
                        var durationSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(group_1, function () {
                            group_1.complete();
                            durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                        }, undefined, undefined, function () { return groups.delete(key_1); });
                        groupBySourceSubscriber.add(innerFrom_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
                    }
                }
                group_1.next(element ? element(value) : value);
            }
            catch (err) {
                handleError(err);
            }
        }, function () { return notify(function (consumer) { return consumer.complete(); }); }, handleError, function () { return groups.clear(); }, function () {
            teardownAttempted = true;
            return activeGroups === 0;
        });
        source.subscribe(groupBySourceSubscriber);
        function createGroupedObservable(key, groupSubject) {
            var result = new Observable_1.Observable(function (groupSubscriber) {
                activeGroups++;
                var innerSub = groupSubject.subscribe(groupSubscriber);
                return function () {
                    innerSub.unsubscribe();
                    --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
                };
            });
            result.key = key;
            return result;
        }
    });
}
exports.groupBy = groupBy;

},{"../Observable":7,"../Subject":10,"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreElements = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var noop_1 = require("../util/noop");
function ignoreElements() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, noop_1.noop));
    });
}
exports.ignoreElements = ignoreElements;

},{"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function isEmpty() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
            subscriber.next(false);
            subscriber.complete();
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
exports.isEmpty = isEmpty;

},{"../util/lift":218,"./OperatorSubscriber":47}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinAllInternals = void 0;
var identity_1 = require("../util/identity");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var pipe_1 = require("../util/pipe");
var mergeMap_1 = require("./mergeMap");
var toArray_1 = require("./toArray");
function joinAllInternals(joinFn, project) {
    return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function (sources) { return joinFn(sources); }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
}
exports.joinAllInternals = joinAllInternals;

},{"../util/identity":207,"../util/mapOneOrManyArgs":219,"../util/pipe":222,"./mergeMap":101,"./toArray":152}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
var EmptyError_1 = require("../util/EmptyError");
var filter_1 = require("./filter");
var takeLast_1 = require("./takeLast");
var throwIfEmpty_1 = require("./throwIfEmpty");
var defaultIfEmpty_1 = require("./defaultIfEmpty");
var identity_1 = require("../util/identity");
function last(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
    };
}
exports.last = last;

},{"../util/EmptyError":193,"../util/identity":207,"./defaultIfEmpty":69,"./filter":83,"./takeLast":141,"./throwIfEmpty":147}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function map(project, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
exports.map = map;

},{"../util/lift":218,"./OperatorSubscriber":47}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTo = void 0;
var map_1 = require("./map");
function mapTo(value) {
    return map_1.map(function () { return value; });
}
exports.mapTo = mapTo;

},{"./map":94}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialize = void 0;
var Notification_1 = require("../Notification");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function materialize() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(Notification_1.Notification.createNext(value));
        }, function () {
            subscriber.next(Notification_1.Notification.createComplete());
            subscriber.complete();
        }, function (err) {
            subscriber.next(Notification_1.Notification.createError(err));
            subscriber.complete();
        }));
    });
}
exports.materialize = materialize;

},{"../Notification":5,"../util/lift":218,"./OperatorSubscriber":47}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = void 0;
var reduce_1 = require("./reduce");
var isFunction_1 = require("../util/isFunction");
function max(comparer) {
    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) > 0 ? x : y); } : function (x, y) { return (x > y ? x : y); });
}
exports.max = max;

},{"../util/isFunction":211,"./reduce":116}],98:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
var lift_1 = require("../util/lift");
var mergeAll_1 = require("./mergeAll");
var args_1 = require("../util/args");
var from_1 = require("../observable/from");
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var concurrent = args_1.popNumber(args, Infinity);
    return lift_1.operate(function (source, subscriber) {
        mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
exports.merge = merge;

},{"../observable/from":27,"../util/args":199,"../util/lift":218,"./mergeAll":99}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAll = void 0;
var mergeMap_1 = require("./mergeMap");
var identity_1 = require("../util/identity");
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap_1.mergeMap(identity_1.identity, concurrent);
}
exports.mergeAll = mergeAll;

},{"../util/identity":207,"./mergeMap":101}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeInternals = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var executeSchedule_1 = require("../util/executeSchedule");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        innerFrom_1.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                            executeSchedule_1.executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                        }
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
}
exports.mergeInternals = mergeInternals;

},{"../observable/innerFrom":33,"../util/executeSchedule":206,"./OperatorSubscriber":47}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMap = void 0;
var map_1 = require("./map");
var innerFrom_1 = require("../observable/innerFrom");
var lift_1 = require("../util/lift");
var mergeInternals_1 = require("./mergeInternals");
var isFunction_1 = require("../util/isFunction");
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom_1.innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return lift_1.operate(function (source, subscriber) { return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent); });
}
exports.mergeMap = mergeMap;

},{"../observable/innerFrom":33,"../util/isFunction":211,"../util/lift":218,"./map":94,"./mergeInternals":100}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMapTo = void 0;
var mergeMap_1 = require("./mergeMap");
var isFunction_1 = require("../util/isFunction");
function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap_1.mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return mergeMap_1.mergeMap(function () { return innerObservable; }, concurrent);
}
exports.mergeMapTo = mergeMapTo;

},{"../util/isFunction":211,"./mergeMap":101}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeScan = void 0;
var lift_1 = require("../util/lift");
var mergeInternals_1 = require("./mergeInternals");
function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return lift_1.operate(function (source, subscriber) {
        var state = seed;
        return mergeInternals_1.mergeInternals(source, subscriber, function (value, index) { return accumulator(state, value, index); }, concurrent, function (value) {
            state = value;
        }, false, undefined, function () { return (state = null); });
    });
}
exports.mergeScan = mergeScan;

},{"../util/lift":218,"./mergeInternals":100}],104:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeWith = void 0;
var merge_1 = require("./merge");
function mergeWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
}
exports.mergeWith = mergeWith;

},{"./merge":98}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.min = void 0;
var reduce_1 = require("./reduce");
var isFunction_1 = require("../util/isFunction");
function min(comparer) {
    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) < 0 ? x : y); } : function (x, y) { return (x < y ? x : y); });
}
exports.min = min;

},{"../util/isFunction":211,"./reduce":116}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicast = void 0;
var ConnectableObservable_1 = require("../observable/ConnectableObservable");
var isFunction_1 = require("../util/isFunction");
var connect_1 = require("./connect");
function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
    if (isFunction_1.isFunction(selector)) {
        return connect_1.connect(selector, {
            connector: subjectFactory,
        });
    }
    return function (source) { return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory); };
}
exports.multicast = multicast;

},{"../observable/ConnectableObservable":16,"../util/isFunction":211,"./connect":65}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observeOn = void 0;
var executeSchedule_1 = require("../util/executeSchedule");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
exports.observeOn = observeOn;

},{"../util/executeSchedule":206,"../util/lift":218,"./OperatorSubscriber":47}],108:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorResumeNext = exports.onErrorResumeNextWith = void 0;
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var onErrorResumeNext_1 = require("../observable/onErrorResumeNext");
function onErrorResumeNextWith() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
    return function (source) { return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources))); };
}
exports.onErrorResumeNextWith = onErrorResumeNextWith;
exports.onErrorResumeNext = onErrorResumeNextWith;

},{"../observable/onErrorResumeNext":38,"../util/argsOrArgArray":201}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairwise = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function pairwise() {
    return lift_1.operate(function (source, subscriber) {
        var prev;
        var hasPrev = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var p = prev;
            prev = value;
            hasPrev && subscriber.next([p, value]);
            hasPrev = true;
        }));
    });
}
exports.pairwise = pairwise;

},{"../util/lift":218,"./OperatorSubscriber":47}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluck = void 0;
var map_1 = require("./map");
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map_1.map(function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    });
}
exports.pluck = pluck;

},{"./map":94}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
var Subject_1 = require("../Subject");
var multicast_1 = require("./multicast");
var connect_1 = require("./connect");
function publish(selector) {
    return selector ? function (source) { return connect_1.connect(selector)(source); } : function (source) { return multicast_1.multicast(new Subject_1.Subject())(source); };
}
exports.publish = publish;

},{"../Subject":10,"./connect":65,"./multicast":106}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishBehavior = void 0;
var BehaviorSubject_1 = require("../BehaviorSubject");
var ConnectableObservable_1 = require("../observable/ConnectableObservable");
function publishBehavior(initialValue) {
    return function (source) {
        var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
    };
}
exports.publishBehavior = publishBehavior;

},{"../BehaviorSubject":4,"../observable/ConnectableObservable":16}],113:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishLast = void 0;
var AsyncSubject_1 = require("../AsyncSubject");
var ConnectableObservable_1 = require("../observable/ConnectableObservable");
function publishLast() {
    return function (source) {
        var subject = new AsyncSubject_1.AsyncSubject();
        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
    };
}
exports.publishLast = publishLast;

},{"../AsyncSubject":3,"../observable/ConnectableObservable":16}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishReplay = void 0;
var ReplaySubject_1 = require("../ReplaySubject");
var multicast_1 = require("./multicast");
var isFunction_1 = require("../util/isFunction");
function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
    }
    var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
    return function (source) { return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
}
exports.publishReplay = publishReplay;

},{"../ReplaySubject":8,"../util/isFunction":211,"./multicast":106}],115:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceWith = void 0;
var race_1 = require("../observable/race");
var lift_1 = require("../util/lift");
var identity_1 = require("../util/identity");
function raceWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return !otherSources.length
        ? identity_1.identity
        : lift_1.operate(function (source, subscriber) {
            race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
        });
}
exports.raceWith = raceWith;

},{"../observable/race":41,"../util/identity":207,"../util/lift":218}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = void 0;
var scanInternals_1 = require("./scanInternals");
var lift_1 = require("../util/lift");
function reduce(accumulator, seed) {
    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
exports.reduce = reduce;

},{"../util/lift":218,"./scanInternals":125}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refCount = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function refCount() {
    return lift_1.operate(function (source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                connection = null;
                return;
            }
            var sharedConnection = source._connection;
            var conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
                sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
            connection = source.connect();
        }
    });
}
exports.refCount = refCount;

},{"../util/lift":218,"./OperatorSubscriber":47}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = void 0;
var empty_1 = require("../observable/empty");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
var timer_1 = require("../observable/timer");
function repeat(countOrConfig) {
    var _a;
    var count = Infinity;
    var delay;
    if (countOrConfig != null) {
        if (typeof countOrConfig === 'object') {
            (_a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay);
        }
        else {
            count = countOrConfig;
        }
    }
    return count <= 0
        ? function () { return empty_1.EMPTY; }
        : lift_1.operate(function (source, subscriber) {
            var soFar = 0;
            var sourceSub;
            var resubscribe = function () {
                sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
                sourceSub = null;
                if (delay != null) {
                    var notifier = typeof delay === 'number' ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(soFar));
                    var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
                        notifierSubscriber_1.unsubscribe();
                        subscribeToSource();
                    });
                    notifier.subscribe(notifierSubscriber_1);
                }
                else {
                    subscribeToSource();
                }
            };
            var subscribeToSource = function () {
                var syncUnsub = false;
                sourceSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
                    if (++soFar < count) {
                        if (sourceSub) {
                            resubscribe();
                        }
                        else {
                            syncUnsub = true;
                        }
                    }
                    else {
                        subscriber.complete();
                    }
                }));
                if (syncUnsub) {
                    resubscribe();
                }
            };
            subscribeToSource();
        });
}
exports.repeat = repeat;

},{"../observable/empty":25,"../observable/innerFrom":33,"../observable/timer":44,"../util/lift":218,"./OperatorSubscriber":47}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeatWhen = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var Subject_1 = require("../Subject");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function repeatWhen(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var completions$;
        var isNotifierComplete = false;
        var isMainComplete = false;
        var checkComplete = function () { return isMainComplete && isNotifierComplete && (subscriber.complete(), true); };
        var getCompletionSubject = function () {
            if (!completions$) {
                completions$ = new Subject_1.Subject();
                innerFrom_1.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
                    if (innerSub) {
                        subscribeForRepeatWhen();
                    }
                    else {
                        syncResub = true;
                    }
                }, function () {
                    isNotifierComplete = true;
                    checkComplete();
                }));
            }
            return completions$;
        };
        var subscribeForRepeatWhen = function () {
            isMainComplete = false;
            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
                isMainComplete = true;
                !checkComplete() && getCompletionSubject().next();
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRepeatWhen();
            }
        };
        subscribeForRepeatWhen();
    });
}
exports.repeatWhen = repeatWhen;

},{"../Subject":10,"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var identity_1 = require("../util/identity");
var timer_1 = require("../observable/timer");
var innerFrom_1 = require("../observable/innerFrom");
function retry(configOrCount) {
    if (configOrCount === void 0) { configOrCount = Infinity; }
    var config;
    if (configOrCount && typeof configOrCount === 'object') {
        config = configOrCount;
    }
    else {
        config = {
            count: configOrCount,
        };
    }
    var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
    return count <= 0
        ? identity_1.identity
        : lift_1.operate(function (source, subscriber) {
            var soFar = 0;
            var innerSub;
            var subscribeForRetry = function () {
                var syncUnsub = false;
                innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                    if (resetOnSuccess) {
                        soFar = 0;
                    }
                    subscriber.next(value);
                }, undefined, function (err) {
                    if (soFar++ < count) {
                        var resub_1 = function () {
                            if (innerSub) {
                                innerSub.unsubscribe();
                                innerSub = null;
                                subscribeForRetry();
                            }
                            else {
                                syncUnsub = true;
                            }
                        };
                        if (delay != null) {
                            var notifier = typeof delay === 'number' ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(err, soFar));
                            var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
                                notifierSubscriber_1.unsubscribe();
                                resub_1();
                            }, function () {
                                subscriber.complete();
                            });
                            notifier.subscribe(notifierSubscriber_1);
                        }
                        else {
                            resub_1();
                        }
                    }
                    else {
                        subscriber.error(err);
                    }
                }));
                if (syncUnsub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    subscribeForRetry();
                }
            };
            subscribeForRetry();
        });
}
exports.retry = retry;

},{"../observable/innerFrom":33,"../observable/timer":44,"../util/identity":207,"../util/lift":218,"./OperatorSubscriber":47}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryWhen = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var Subject_1 = require("../Subject");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function retryWhen(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var errors$;
        var subscribeForRetryWhen = function () {
            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
                if (!errors$) {
                    errors$ = new Subject_1.Subject();
                    innerFrom_1.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
                        return innerSub ? subscribeForRetryWhen() : (syncResub = true);
                    }));
                }
                if (errors$) {
                    errors$.next(err);
                }
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRetryWhen();
            }
        };
        subscribeForRetryWhen();
    });
}
exports.retryWhen = retryWhen;

},{"../Subject":10,"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var lift_1 = require("../util/lift");
var noop_1 = require("../util/noop");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function sample(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
        }));
        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        }, noop_1.noop));
    });
}
exports.sample = sample;

},{"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleTime = void 0;
var async_1 = require("../scheduler/async");
var sample_1 = require("./sample");
var interval_1 = require("../observable/interval");
function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    return sample_1.sample(interval_1.interval(period, scheduler));
}
exports.sampleTime = sampleTime;

},{"../observable/interval":34,"../scheduler/async":182,"./sample":122}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan = void 0;
var lift_1 = require("../util/lift");
var scanInternals_1 = require("./scanInternals");
function scan(accumulator, seed) {
    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
}
exports.scan = scan;

},{"../util/lift":218,"./scanInternals":125}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanInternals = void 0;
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return function (source, subscriber) {
        var hasState = hasSeed;
        var state = seed;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var i = index++;
            state = hasState
                ?
                    accumulator(state, value, i)
                :
                    ((hasState = true), value);
            emitOnNext && subscriber.next(state);
        }, emitBeforeComplete &&
            (function () {
                hasState && subscriber.next(state);
                subscriber.complete();
            })));
    };
}
exports.scanInternals = scanInternals;

},{"./OperatorSubscriber":47}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceEqual = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
function sequenceEqual(compareTo, comparator) {
    if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
    return lift_1.operate(function (source, subscriber) {
        var aState = createState();
        var bState = createState();
        var emit = function (isEqual) {
            subscriber.next(isEqual);
            subscriber.complete();
        };
        var createSubscriber = function (selfState, otherState) {
            var sequenceEqualSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (a) {
                var buffer = otherState.buffer, complete = otherState.complete;
                if (buffer.length === 0) {
                    complete ? emit(false) : selfState.buffer.push(a);
                }
                else {
                    !comparator(a, buffer.shift()) && emit(false);
                }
            }, function () {
                selfState.complete = true;
                var complete = otherState.complete, buffer = otherState.buffer;
                complete && emit(buffer.length === 0);
                sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
            });
            return sequenceEqualSubscriber;
        };
        source.subscribe(createSubscriber(aState, bState));
        innerFrom_1.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
    });
}
exports.sequenceEqual = sequenceEqual;
function createState() {
    return {
        buffer: [],
        complete: false,
    };
}

},{"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],127:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.share = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var Subject_1 = require("../Subject");
var Subscriber_1 = require("../Subscriber");
var lift_1 = require("../util/lift");
function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject_1.Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        var reset = function () {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return lift_1.operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new Subscriber_1.SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                innerFrom_1.innerFrom(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
exports.share = share;
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    var onSubscriber = new Subscriber_1.SafeSubscriber({
        next: function () {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return innerFrom_1.innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}

},{"../Subject":10,"../Subscriber":11,"../observable/innerFrom":33,"../util/lift":218}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareReplay = void 0;
var ReplaySubject_1 = require("../ReplaySubject");
var share_1 = require("./share");
function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a, _b, _c;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        (_a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler);
    }
    else {
        bufferSize = (configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity);
    }
    return share_1.share({
        connector: function () { return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler); },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount,
    });
}
exports.shareReplay = shareReplay;

},{"../ReplaySubject":8,"./share":127}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.single = void 0;
var EmptyError_1 = require("../util/EmptyError");
var SequenceError_1 = require("../util/SequenceError");
var NotFoundError_1 = require("../util/NotFoundError");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function single(predicate) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var singleValue;
        var seenValue = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
                hasValue && subscriber.error(new SequenceError_1.SequenceError('Too many matching values'));
                hasValue = true;
                singleValue = value;
            }
        }, function () {
            if (hasValue) {
                subscriber.next(singleValue);
                subscriber.complete();
            }
            else {
                subscriber.error(seenValue ? new NotFoundError_1.NotFoundError('No matching values') : new EmptyError_1.EmptyError());
            }
        }));
    });
}
exports.single = single;

},{"../util/EmptyError":193,"../util/NotFoundError":195,"../util/SequenceError":197,"../util/lift":218,"./OperatorSubscriber":47}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skip = void 0;
var filter_1 = require("./filter");
function skip(count) {
    return filter_1.filter(function (_, index) { return count <= index; });
}
exports.skip = skip;

},{"./filter":83}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipLast = void 0;
var identity_1 = require("../util/identity");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function skipLast(skipCount) {
    return skipCount <= 0
        ?
            identity_1.identity
        : lift_1.operate(function (source, subscriber) {
            var ring = new Array(skipCount);
            var seen = 0;
            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                var valueIndex = seen++;
                if (valueIndex < skipCount) {
                    ring[valueIndex] = value;
                }
                else {
                    var index = valueIndex % skipCount;
                    var oldValue = ring[index];
                    ring[index] = value;
                    subscriber.next(oldValue);
                }
            }));
            return function () {
                ring = null;
            };
        });
}
exports.skipLast = skipLast;

},{"../util/identity":207,"../util/lift":218,"./OperatorSubscriber":47}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipUntil = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
var noop_1 = require("../util/noop");
function skipUntil(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var taking = false;
        var skipSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
            taking = true;
        }, noop_1.noop);
        innerFrom_1.innerFrom(notifier).subscribe(skipSubscriber);
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return taking && subscriber.next(value); }));
    });
}
exports.skipUntil = skipUntil;

},{"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],133:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipWhile = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function skipWhile(predicate) {
    return lift_1.operate(function (source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
    });
}
exports.skipWhile = skipWhile;

},{"../util/lift":218,"./OperatorSubscriber":47}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWith = void 0;
var concat_1 = require("../observable/concat");
var args_1 = require("../util/args");
var lift_1 = require("../util/lift");
function startWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(values);
    return lift_1.operate(function (source, subscriber) {
        (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
    });
}
exports.startWith = startWith;

},{"../observable/concat":21,"../util/args":199,"../util/lift":218}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeOn = void 0;
var lift_1 = require("../util/lift");
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1.operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
exports.subscribeOn = subscribeOn;

},{"../util/lift":218}],136:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchAll = void 0;
var switchMap_1 = require("./switchMap");
var identity_1 = require("../util/identity");
function switchAll() {
    return switchMap_1.switchMap(identity_1.identity);
}
exports.switchAll = switchAll;

},{"../util/identity":207,"./switchMap":137}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchMap = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function switchMap(project, resultSelector) {
    return lift_1.operate(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            innerFrom_1.innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}
exports.switchMap = switchMap;

},{"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],138:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchMapTo = void 0;
var switchMap_1 = require("./switchMap");
var isFunction_1 = require("../util/isFunction");
function switchMapTo(innerObservable, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function () { return innerObservable; }, resultSelector) : switchMap_1.switchMap(function () { return innerObservable; });
}
exports.switchMapTo = switchMapTo;

},{"../util/isFunction":211,"./switchMap":137}],139:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchScan = void 0;
var switchMap_1 = require("./switchMap");
var lift_1 = require("../util/lift");
function switchScan(accumulator, seed) {
    return lift_1.operate(function (source, subscriber) {
        var state = seed;
        switchMap_1.switchMap(function (value, index) { return accumulator(state, value, index); }, function (_, innerValue) { return ((state = innerValue), innerValue); })(source).subscribe(subscriber);
        return function () {
            state = null;
        };
    });
}
exports.switchScan = switchScan;

},{"../util/lift":218,"./switchMap":137}],140:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.take = void 0;
var empty_1 = require("../observable/empty");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function take(count) {
    return count <= 0
        ?
            function () { return empty_1.EMPTY; }
        : lift_1.operate(function (source, subscriber) {
            var seen = 0;
            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
exports.take = take;

},{"../observable/empty":25,"../util/lift":218,"./OperatorSubscriber":47}],141:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeLast = void 0;
var empty_1 = require("../observable/empty");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function takeLast(count) {
    return count <= 0
        ? function () { return empty_1.EMPTY; }
        : lift_1.operate(function (source, subscriber) {
            var buffer = [];
            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                buffer.push(value);
                count < buffer.length && buffer.shift();
            }, function () {
                var e_1, _a;
                try {
                    for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
                        var value = buffer_1_1.value;
                        subscriber.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                subscriber.complete();
            }, undefined, function () {
                buffer = null;
            }));
        });
}
exports.takeLast = takeLast;

},{"../observable/empty":25,"../util/lift":218,"./OperatorSubscriber":47}],142:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeUntil = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
var noop_1 = require("../util/noop");
function takeUntil(notifier) {
    return lift_1.operate(function (source, subscriber) {
        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop_1.noop));
        !subscriber.closed && source.subscribe(subscriber);
    });
}
exports.takeUntil = takeUntil;

},{"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],143:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeWhile = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function takeWhile(predicate, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
        }));
    });
}
exports.takeWhile = takeWhile;

},{"../util/lift":218,"./OperatorSubscriber":47}],144:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tap = void 0;
var isFunction_1 = require("../util/isFunction");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var identity_1 = require("../util/identity");
function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? lift_1.operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity_1.identity;
}
exports.tap = tap;

},{"../util/identity":207,"../util/isFunction":211,"../util/lift":218,"./OperatorSubscriber":47}],145:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
function throttle(durationSelector, config) {
    return lift_1.operate(function (source, subscriber) {
        var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
        var hasValue = false;
        var sendValue = null;
        var throttled = null;
        var isComplete = false;
        var endThrottling = function () {
            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
            throttled = null;
            if (trailing) {
                send();
                isComplete && subscriber.complete();
            }
        };
        var cleanupThrottling = function () {
            throttled = null;
            isComplete && subscriber.complete();
        };
        var startThrottle = function (value) {
            return (throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
        };
        var send = function () {
            if (hasValue) {
                hasValue = false;
                var value = sendValue;
                sendValue = null;
                subscriber.next(value);
                !isComplete && startThrottle(value);
            }
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            sendValue = value;
            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
        }, function () {
            isComplete = true;
            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
        }));
    });
}
exports.throttle = throttle;

},{"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],146:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttleTime = void 0;
var async_1 = require("../scheduler/async");
var throttle_1 = require("./throttle");
var timer_1 = require("../observable/timer");
function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    var duration$ = timer_1.timer(duration, scheduler);
    return throttle_1.throttle(function () { return duration$; }, config);
}
exports.throttleTime = throttleTime;

},{"../observable/timer":44,"../scheduler/async":182,"./throttle":145}],147:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIfEmpty = void 0;
var EmptyError_1 = require("../util/EmptyError");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
exports.throwIfEmpty = throwIfEmpty;
function defaultErrorFactory() {
    return new EmptyError_1.EmptyError();
}

},{"../util/EmptyError":193,"../util/lift":218,"./OperatorSubscriber":47}],148:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeInterval = exports.timeInterval = void 0;
var async_1 = require("../scheduler/async");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    return lift_1.operate(function (source, subscriber) {
        var last = scheduler.now();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var now = scheduler.now();
            var interval = now - last;
            last = now;
            subscriber.next(new TimeInterval(value, interval));
        }));
    });
}
exports.timeInterval = timeInterval;
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
exports.TimeInterval = TimeInterval;

},{"../scheduler/async":182,"../util/lift":218,"./OperatorSubscriber":47}],149:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.TimeoutError = void 0;
var async_1 = require("../scheduler/async");
var isDate_1 = require("../util/isDate");
var lift_1 = require("../util/lift");
var innerFrom_1 = require("../observable/innerFrom");
var createErrorClass_1 = require("../util/createErrorClass");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var executeSchedule_1 = require("../util/executeSchedule");
exports.TimeoutError = createErrorClass_1.createErrorClass(function (_super) {
    return function TimeoutErrorImpl(info) {
        if (info === void 0) { info = null; }
        _super(this);
        this.message = 'Timeout has occurred';
        this.name = 'TimeoutError';
        this.info = info;
    };
});
function timeout(config, schedulerArg) {
    var _a = (isDate_1.isValidDate(config) ? { first: config } : typeof config === 'number' ? { each: config } : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return lift_1.operate(function (source, subscriber) {
        var originalSourceSubscription;
        var timerSubscription;
        var lastValue = null;
        var seen = 0;
        var startTimer = function (delay) {
            timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
                try {
                    originalSourceSubscription.unsubscribe();
                    innerFrom_1.innerFrom(_with({
                        meta: meta,
                        lastValue: lastValue,
                        seen: seen,
                    })).subscribe(subscriber);
                }
                catch (err) {
                    subscriber.error(err);
                }
            }, delay);
        };
        originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            seen++;
            subscriber.next((lastValue = value));
            each > 0 && startTimer(each);
        }, undefined, undefined, function () {
            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            }
            lastValue = null;
        }));
        !seen && startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
    });
}
exports.timeout = timeout;
function timeoutErrorFactory(info) {
    throw new exports.TimeoutError(info);
}

},{"../observable/innerFrom":33,"../scheduler/async":182,"../util/createErrorClass":203,"../util/executeSchedule":206,"../util/isDate":210,"../util/lift":218,"./OperatorSubscriber":47}],150:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutWith = void 0;
var async_1 = require("../scheduler/async");
var isDate_1 = require("../util/isDate");
var timeout_1 = require("./timeout");
function timeoutWith(due, withObservable, scheduler) {
    var first;
    var each;
    var _with;
    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
    if (isDate_1.isValidDate(due)) {
        first = due;
    }
    else if (typeof due === 'number') {
        each = due;
    }
    if (withObservable) {
        _with = function () { return withObservable; };
    }
    else {
        throw new TypeError('No observable provided to switch to');
    }
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return timeout_1.timeout({
        first: first,
        each: each,
        scheduler: scheduler,
        with: _with,
    });
}
exports.timeoutWith = timeoutWith;

},{"../scheduler/async":182,"../util/isDate":210,"./timeout":149}],151:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
var dateTimestampProvider_1 = require("../scheduler/dateTimestampProvider");
var map_1 = require("./map");
function timestamp(timestampProvider) {
    if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
    return map_1.map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
}
exports.timestamp = timestamp;

},{"../scheduler/dateTimestampProvider":183,"./map":94}],152:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
var reduce_1 = require("./reduce");
var lift_1 = require("../util/lift");
var arrReducer = function (arr, value) { return (arr.push(value), arr); };
function toArray() {
    return lift_1.operate(function (source, subscriber) {
        reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
    });
}
exports.toArray = toArray;

},{"../util/lift":218,"./reduce":116}],153:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.window = void 0;
var Subject_1 = require("../Subject");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var noop_1 = require("../util/noop");
var innerFrom_1 = require("../observable/innerFrom");
function window(windowBoundaries) {
    return lift_1.operate(function (source, subscriber) {
        var windowSubject = new Subject_1.Subject();
        subscriber.next(windowSubject.asObservable());
        var errorHandler = function (err) {
            windowSubject.error(err);
            subscriber.error(err);
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value); }, function () {
            windowSubject.complete();
            subscriber.complete();
        }, errorHandler));
        innerFrom_1.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
            windowSubject.complete();
            subscriber.next((windowSubject = new Subject_1.Subject()));
        }, noop_1.noop, errorHandler));
        return function () {
            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
            windowSubject = null;
        };
    });
}
exports.window = window;

},{"../Subject":10,"../observable/innerFrom":33,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],154:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowCount = void 0;
var Subject_1 = require("../Subject");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
    return lift_1.operate(function (source, subscriber) {
        var windows = [new Subject_1.Subject()];
        var starts = [];
        var count = 0;
        subscriber.next(windows[0].asObservable());
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                    var window_1 = windows_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var c = count - windowSize + 1;
            if (c >= 0 && c % startEvery === 0) {
                windows.shift().complete();
            }
            if (++count % startEvery === 0) {
                var window_2 = new Subject_1.Subject();
                windows.push(window_2);
                subscriber.next(window_2.asObservable());
            }
        }, function () {
            while (windows.length > 0) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, function (err) {
            while (windows.length > 0) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        }, function () {
            starts = null;
            windows = null;
        }));
    });
}
exports.windowCount = windowCount;

},{"../Subject":10,"../util/lift":218,"./OperatorSubscriber":47}],155:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowTime = void 0;
var Subject_1 = require("../Subject");
var async_1 = require("../scheduler/async");
var Subscription_1 = require("../Subscription");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var arrRemove_1 = require("../util/arrRemove");
var args_1 = require("../util/args");
var executeSchedule_1 = require("../util/executeSchedule");
function windowTime(windowTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxWindowSize = otherArgs[1] || Infinity;
    return lift_1.operate(function (source, subscriber) {
        var windowRecords = [];
        var restartOnClose = false;
        var closeWindow = function (record) {
            var window = record.window, subs = record.subs;
            window.complete();
            subs.unsubscribe();
            arrRemove_1.arrRemove(windowRecords, record);
            restartOnClose && startWindow();
        };
        var startWindow = function () {
            if (windowRecords) {
                var subs = new Subscription_1.Subscription();
                subscriber.add(subs);
                var window_1 = new Subject_1.Subject();
                var record_1 = {
                    window: window_1,
                    subs: subs,
                    seen: 0,
                };
                windowRecords.push(record_1);
                subscriber.next(window_1.asObservable());
                executeSchedule_1.executeSchedule(subs, scheduler, function () { return closeWindow(record_1); }, windowTimeSpan);
            }
        };
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
        }
        else {
            restartOnClose = true;
        }
        startWindow();
        var loop = function (cb) { return windowRecords.slice().forEach(cb); };
        var terminate = function (cb) {
            loop(function (_a) {
                var window = _a.window;
                return cb(window);
            });
            cb(subscriber);
            subscriber.unsubscribe();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            loop(function (record) {
                record.window.next(value);
                maxWindowSize <= ++record.seen && closeWindow(record);
            });
        }, function () { return terminate(function (consumer) { return consumer.complete(); }); }, function (err) { return terminate(function (consumer) { return consumer.error(err); }); }));
        return function () {
            windowRecords = null;
        };
    });
}
exports.windowTime = windowTime;

},{"../Subject":10,"../Subscription":12,"../scheduler/async":182,"../util/args":199,"../util/arrRemove":202,"../util/executeSchedule":206,"../util/lift":218,"./OperatorSubscriber":47}],156:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowToggle = void 0;
var Subject_1 = require("../Subject");
var Subscription_1 = require("../Subscription");
var lift_1 = require("../util/lift");
var innerFrom_1 = require("../observable/innerFrom");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var noop_1 = require("../util/noop");
var arrRemove_1 = require("../util/arrRemove");
function windowToggle(openings, closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var windows = [];
        var handleError = function (err) {
            while (0 < windows.length) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        };
        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (openValue) {
            var window = new Subject_1.Subject();
            windows.push(window);
            var closingSubscription = new Subscription_1.Subscription();
            var closeWindow = function () {
                arrRemove_1.arrRemove(windows, window);
                window.complete();
                closingSubscription.unsubscribe();
            };
            var closingNotifier;
            try {
                closingNotifier = innerFrom_1.innerFrom(closingSelector(openValue));
            }
            catch (err) {
                handleError(err);
                return;
            }
            subscriber.next(window.asObservable());
            closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
        }, noop_1.noop));
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var windowsCopy = windows.slice();
            try {
                for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
                    var window_1 = windowsCopy_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (0 < windows.length) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, handleError, function () {
            while (0 < windows.length) {
                windows.shift().unsubscribe();
            }
        }));
    });
}
exports.windowToggle = windowToggle;

},{"../Subject":10,"../Subscription":12,"../observable/innerFrom":33,"../util/arrRemove":202,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],157:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowWhen = void 0;
var Subject_1 = require("../Subject");
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
function windowWhen(closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var window;
        var closingSubscriber;
        var handleError = function (err) {
            window.error(err);
            subscriber.error(err);
        };
        var openWindow = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window === null || window === void 0 ? void 0 : window.complete();
            window = new Subject_1.Subject();
            subscriber.next(window.asObservable());
            var closingNotifier;
            try {
                closingNotifier = innerFrom_1.innerFrom(closingSelector());
            }
            catch (err) {
                handleError(err);
                return;
            }
            closingNotifier.subscribe((closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError)));
        };
        openWindow();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return window.next(value); }, function () {
            window.complete();
            subscriber.complete();
        }, handleError, function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window = null;
        }));
    });
}
exports.windowWhen = windowWhen;

},{"../Subject":10,"../observable/innerFrom":33,"../util/lift":218,"./OperatorSubscriber":47}],158:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLatestFrom = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var innerFrom_1 = require("../observable/innerFrom");
var identity_1 = require("../util/identity");
var noop_1 = require("../util/noop");
var args_1 = require("../util/args");
function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var project = args_1.popResultSelector(inputs);
    return lift_1.operate(function (source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function () { return false; });
        var ready = false;
        var _loop_1 = function (i) {
            innerFrom_1.innerFrom(inputs[i]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
                }
            }, noop_1.noop));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            if (ready) {
                var values = __spreadArray([value], __read(otherValues));
                subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
            }
        }));
    });
}
exports.withLatestFrom = withLatestFrom;

},{"../observable/innerFrom":33,"../util/args":199,"../util/identity":207,"../util/lift":218,"../util/noop":220,"./OperatorSubscriber":47}],159:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
var zip_1 = require("../observable/zip");
var lift_1 = require("../util/lift");
function zip() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return lift_1.operate(function (source, subscriber) {
        zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
    });
}
exports.zip = zip;

},{"../observable/zip":46,"../util/lift":218}],160:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipAll = void 0;
var zip_1 = require("../observable/zip");
var joinAllInternals_1 = require("./joinAllInternals");
function zipAll(project) {
    return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
}
exports.zipAll = zipAll;

},{"../observable/zip":46,"./joinAllInternals":92}],161:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipWith = void 0;
var zip_1 = require("./zip");
function zipWith() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
    }
    return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
}
exports.zipWith = zipWith;

},{"./zip":159}],162:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleArray = void 0;
var Observable_1 = require("../Observable");
function scheduleArray(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
exports.scheduleArray = scheduleArray;

},{"../Observable":7}],163:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleAsyncIterable = void 0;
var Observable_1 = require("../Observable");
var executeSchedule_1 = require("../util/executeSchedule");
function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable_1.Observable(function (subscriber) {
        executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
exports.scheduleAsyncIterable = scheduleAsyncIterable;

},{"../Observable":7,"../util/executeSchedule":206}],164:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleIterable = void 0;
var Observable_1 = require("../Observable");
var iterator_1 = require("../symbol/iterator");
var isFunction_1 = require("../util/isFunction");
var executeSchedule_1 = require("../util/executeSchedule");
function scheduleIterable(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var iterator;
        executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
            iterator = input[iterator_1.iterator]();
            executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
exports.scheduleIterable = scheduleIterable;

},{"../Observable":7,"../symbol/iterator":189,"../util/executeSchedule":206,"../util/isFunction":211}],165:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleObservable = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var observeOn_1 = require("../operators/observeOn");
var subscribeOn_1 = require("../operators/subscribeOn");
function scheduleObservable(input, scheduler) {
    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
}
exports.scheduleObservable = scheduleObservable;

},{"../observable/innerFrom":33,"../operators/observeOn":107,"../operators/subscribeOn":135}],166:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulePromise = void 0;
var innerFrom_1 = require("../observable/innerFrom");
var observeOn_1 = require("../operators/observeOn");
var subscribeOn_1 = require("../operators/subscribeOn");
function schedulePromise(input, scheduler) {
    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
}
exports.schedulePromise = schedulePromise;

},{"../observable/innerFrom":33,"../operators/observeOn":107,"../operators/subscribeOn":135}],167:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleReadableStreamLike = void 0;
var scheduleAsyncIterable_1 = require("./scheduleAsyncIterable");
var isReadableStreamLike_1 = require("../util/isReadableStreamLike");
function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
}
exports.scheduleReadableStreamLike = scheduleReadableStreamLike;

},{"../util/isReadableStreamLike":216,"./scheduleAsyncIterable":163}],168:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduled = void 0;
var scheduleObservable_1 = require("./scheduleObservable");
var schedulePromise_1 = require("./schedulePromise");
var scheduleArray_1 = require("./scheduleArray");
var scheduleIterable_1 = require("./scheduleIterable");
var scheduleAsyncIterable_1 = require("./scheduleAsyncIterable");
var isInteropObservable_1 = require("../util/isInteropObservable");
var isPromise_1 = require("../util/isPromise");
var isArrayLike_1 = require("../util/isArrayLike");
var isIterable_1 = require("../util/isIterable");
var isAsyncIterable_1 = require("../util/isAsyncIterable");
var throwUnobservableError_1 = require("../util/throwUnobservableError");
var isReadableStreamLike_1 = require("../util/isReadableStreamLike");
var scheduleReadableStreamLike_1 = require("./scheduleReadableStreamLike");
function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return scheduleObservable_1.scheduleObservable(input, scheduler);
        }
        if (isArrayLike_1.isArrayLike(input)) {
            return scheduleArray_1.scheduleArray(input, scheduler);
        }
        if (isPromise_1.isPromise(input)) {
            return schedulePromise_1.schedulePromise(input, scheduler);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
            return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable_1.isIterable(input)) {
            return scheduleIterable_1.scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
exports.scheduled = scheduled;

},{"../util/isArrayLike":208,"../util/isAsyncIterable":209,"../util/isInteropObservable":212,"../util/isIterable":213,"../util/isPromise":215,"../util/isReadableStreamLike":216,"../util/throwUnobservableError":224,"./scheduleArray":162,"./scheduleAsyncIterable":163,"./scheduleIterable":164,"./scheduleObservable":165,"./schedulePromise":166,"./scheduleReadableStreamLike":167}],169:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
var Subscription_1 = require("../Subscription");
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;

},{"../Subscription":12}],170:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationFrameAction = void 0;
var AsyncAction_1 = require("./AsyncAction");
var animationFrameProvider_1 = require("./animationFrameProvider");
var AnimationFrameAction = (function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (delay != null ? delay > 0 : this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && id === scheduler._scheduled && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction_1.AsyncAction));
exports.AnimationFrameAction = AnimationFrameAction;

},{"./AsyncAction":174,"./animationFrameProvider":180}],171:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationFrameScheduler = void 0;
var AsyncScheduler_1 = require("./AsyncScheduler");
var AnimationFrameScheduler = (function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this._active = true;
        var flushId;
        if (action) {
            flushId = action.id;
        }
        else {
            flushId = this._scheduled;
            this._scheduled = undefined;
        }
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AnimationFrameScheduler = AnimationFrameScheduler;

},{"./AsyncScheduler":175}],172:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsapAction = void 0;
var AsyncAction_1 = require("./AsyncAction");
var immediateProvider_1 = require("./immediateProvider");
var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (delay != null ? delay > 0 : this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
            immediateProvider_1.immediateProvider.clearImmediate(id);
            if (scheduler._scheduled === id) {
                scheduler._scheduled = undefined;
            }
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction_1.AsyncAction));
exports.AsapAction = AsapAction;

},{"./AsyncAction":174,"./immediateProvider":184}],173:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsapScheduler = void 0;
var AsyncScheduler_1 = require("./AsyncScheduler");
var AsapScheduler = (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AsapScheduler = AsapScheduler;

},{"./AsyncScheduler":175}],174:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAction = void 0;
var Action_1 = require("./Action");
var intervalProvider_1 = require("./intervalProvider");
var arrRemove_1 = require("../util/arrRemove");
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        if (id != null) {
            intervalProvider_1.intervalProvider.clearInterval(id);
        }
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove_1.arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;

},{"../util/arrRemove":202,"./Action":169,"./intervalProvider":185}],175:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncScheduler = void 0;
var Scheduler_1 = require("../Scheduler");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler_1.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;

},{"../Scheduler":9}],176:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueAction = void 0;
var AsyncAction_1 = require("./AsyncAction");
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.flush(this);
        return 0;
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;

},{"./AsyncAction":174}],177:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueScheduler = void 0;
var AsyncScheduler_1 = require("./AsyncScheduler");
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;

},{"./AsyncScheduler":175}],178:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualAction = exports.VirtualTimeScheduler = void 0;
var AsyncAction_1 = require("./AsyncAction");
var Subscription_1 = require("../Subscription");
var AsyncScheduler_1 = require("./AsyncScheduler");
var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
        if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Infinity; }
        var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error;
        var action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        }
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.VirtualTimeScheduler = VirtualTimeScheduler;
var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = (scheduler.index += 1); }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (Number.isFinite(delay)) {
            if (!this.id) {
                return _super.prototype.schedule.call(this, state, delay);
            }
            this.active = false;
            var action = new VirtualAction(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return 1;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_1.AsyncAction));
exports.VirtualAction = VirtualAction;

},{"../Subscription":12,"./AsyncAction":174,"./AsyncScheduler":175}],179:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrame = exports.animationFrameScheduler = void 0;
var AnimationFrameAction_1 = require("./AnimationFrameAction");
var AnimationFrameScheduler_1 = require("./AnimationFrameScheduler");
exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
exports.animationFrame = exports.animationFrameScheduler;

},{"./AnimationFrameAction":170,"./AnimationFrameScheduler":171}],180:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrameProvider = void 0;
var Subscription_1 = require("../Subscription");
exports.animationFrameProvider = {
    schedule: function (callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = exports.animationFrameProvider.delegate;
        if (delegate) {
            request = delegate.requestAnimationFrame;
            cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function (timestamp) {
            cancel = undefined;
            callback(timestamp);
        });
        return new Subscription_1.Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
    },
    requestAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    cancelAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    delegate: undefined,
};

},{"../Subscription":12}],181:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asap = exports.asapScheduler = void 0;
var AsapAction_1 = require("./AsapAction");
var AsapScheduler_1 = require("./AsapScheduler");
exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
exports.asap = exports.asapScheduler;

},{"./AsapAction":172,"./AsapScheduler":173}],182:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.async = exports.asyncScheduler = void 0;
var AsyncAction_1 = require("./AsyncAction");
var AsyncScheduler_1 = require("./AsyncScheduler");
exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
exports.async = exports.asyncScheduler;

},{"./AsyncAction":174,"./AsyncScheduler":175}],183:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimestampProvider = void 0;
exports.dateTimestampProvider = {
    now: function () {
        return (exports.dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

},{}],184:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.immediateProvider = void 0;
var Immediate_1 = require("../util/Immediate");
var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
exports.immediateProvider = {
    setImmediate: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
    },
    clearImmediate: function (handle) {
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
    },
    delegate: undefined,
};

},{"../util/Immediate":194}],185:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalProvider = void 0;
exports.intervalProvider = {
    setInterval: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = exports.intervalProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
            return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function (handle) {
        var delegate = exports.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};

},{}],186:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceTimestampProvider = void 0;
exports.performanceTimestampProvider = {
    now: function () {
        return (exports.performanceTimestampProvider.delegate || performance).now();
    },
    delegate: undefined,
};

},{}],187:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = exports.queueScheduler = void 0;
var QueueAction_1 = require("./QueueAction");
var QueueScheduler_1 = require("./QueueScheduler");
exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
exports.queue = exports.queueScheduler;

},{"./QueueAction":176,"./QueueScheduler":177}],188:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutProvider = void 0;
exports.timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = exports.timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = exports.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};

},{}],189:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterator = exports.getSymbolIterator = void 0;
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
exports.getSymbolIterator = getSymbolIterator;
exports.iterator = getSymbolIterator();

},{}],190:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = void 0;
exports.observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

},{}],191:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],192:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentOutOfRangeError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function (_super) {
    return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
    };
});

},{"./createErrorClass":203}],193:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.EmptyError = createErrorClass_1.createErrorClass(function (_super) {
    return function EmptyErrorImpl() {
        _super(this);
        this.name = 'EmptyError';
        this.message = 'no elements in sequence';
    };
});

},{"./createErrorClass":203}],194:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTools = exports.Immediate = void 0;
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
exports.Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = Promise.resolve();
        }
        resolved.then(function () { return findAndClearHandle(handle) && cb(); });
        return handle;
    },
    clearImmediate: function (handle) {
        findAndClearHandle(handle);
    },
};
exports.TestTools = {
    pending: function () {
        return Object.keys(activeHandles).length;
    }
};

},{}],195:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.NotFoundError = createErrorClass_1.createErrorClass(function (_super) {
    return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = 'NotFoundError';
        this.message = message;
    };
});

},{"./createErrorClass":203}],196:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUnsubscribedError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

},{"./createErrorClass":203}],197:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.SequenceError = createErrorClass_1.createErrorClass(function (_super) {
    return function SequenceErrorImpl(message) {
        _super(this);
        this.name = 'SequenceError';
        this.message = message;
    };
});

},{"./createErrorClass":203}],198:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsubscriptionError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.UnsubscriptionError = createErrorClass_1.createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

},{"./createErrorClass":203}],199:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popNumber = exports.popScheduler = exports.popResultSelector = void 0;
var isFunction_1 = require("./isFunction");
var isScheduler_1 = require("./isScheduler");
function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction_1.isFunction(last(args)) ? args.pop() : undefined;
}
exports.popResultSelector = popResultSelector;
function popScheduler(args) {
    return isScheduler_1.isScheduler(last(args)) ? args.pop() : undefined;
}
exports.popScheduler = popScheduler;
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}
exports.popNumber = popNumber;

},{"./isFunction":211,"./isScheduler":217}],200:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsArgArrayOrObject = void 0;
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args) {
    if (args.length === 1) {
        var first_1 = args[0];
        if (isArray(first_1)) {
            return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
            var keys = getKeys(first_1);
            return {
                args: keys.map(function (key) { return first_1[key]; }),
                keys: keys,
            };
        }
    }
    return { args: args, keys: null };
}
exports.argsArgArrayOrObject = argsArgArrayOrObject;
function isPOJO(obj) {
    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}

},{}],201:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsOrArgArray = void 0;
var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
exports.argsOrArgArray = argsOrArgArray;

},{}],202:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrRemove = void 0;
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
exports.arrRemove = arrRemove;

},{}],203:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorClass = void 0;
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
exports.createErrorClass = createErrorClass;

},{}],204:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObject = void 0;
function createObject(keys, values) {
    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
}
exports.createObject = createObject;

},{}],205:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureError = exports.errorContext = void 0;
var config_1 = require("../config");
var context = null;
function errorContext(cb) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
exports.errorContext = errorContext;
function captureError(err) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
exports.captureError = captureError;

},{"../config":13}],206:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSchedule = void 0;
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
exports.executeSchedule = executeSchedule;

},{}],207:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = void 0;
function identity(x) {
    return x;
}
exports.identity = identity;

},{}],208:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayLike = void 0;
exports.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

},{}],209:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncIterable = void 0;
var isFunction_1 = require("./isFunction");
function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
exports.isAsyncIterable = isAsyncIterable;

},{"./isFunction":211}],210:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = void 0;
function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}
exports.isValidDate = isValidDate;

},{}],211:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = void 0;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;

},{}],212:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInteropObservable = void 0;
var observable_1 = require("../symbol/observable");
var isFunction_1 = require("./isFunction");
function isInteropObservable(input) {
    return isFunction_1.isFunction(input[observable_1.observable]);
}
exports.isInteropObservable = isInteropObservable;

},{"../symbol/observable":190,"./isFunction":211}],213:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIterable = void 0;
var iterator_1 = require("../symbol/iterator");
var isFunction_1 = require("./isFunction");
function isIterable(input) {
    return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
}
exports.isIterable = isIterable;

},{"../symbol/iterator":189,"./isFunction":211}],214:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObservable = void 0;
var Observable_1 = require("../Observable");
var isFunction_1 = require("./isFunction");
function isObservable(obj) {
    return !!obj && (obj instanceof Observable_1.Observable || (isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe)));
}
exports.isObservable = isObservable;

},{"../Observable":7,"./isFunction":211}],215:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
var isFunction_1 = require("./isFunction");
function isPromise(value) {
    return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
}
exports.isPromise = isPromise;

},{"./isFunction":211}],216:[function(require,module,exports){
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReadableStreamLike = exports.readableStreamLikeToAsyncGenerator = void 0;
var isFunction_1 = require("./isFunction");
function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (!true) return [3, 8];
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
exports.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
function isReadableStreamLike(obj) {
    return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
exports.isReadableStreamLike = isReadableStreamLike;

},{"./isFunction":211}],217:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScheduler = void 0;
var isFunction_1 = require("./isFunction");
function isScheduler(value) {
    return value && isFunction_1.isFunction(value.schedule);
}
exports.isScheduler = isScheduler;

},{"./isFunction":211}],218:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operate = exports.hasLift = void 0;
var isFunction_1 = require("./isFunction");
function hasLift(source) {
    return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
exports.hasLift = hasLift;
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
exports.operate = operate;

},{"./isFunction":211}],219:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOneOrManyArgs = void 0;
var map_1 = require("../operators/map");
var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map_1.map(function (args) { return callOrApply(fn, args); });
}
exports.mapOneOrManyArgs = mapOneOrManyArgs;

},{"../operators/map":94}],220:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = void 0;
function noop() { }
exports.noop = noop;

},{}],221:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.not = void 0;
function not(pred, thisArg) {
    return function (value, index) { return !pred.call(thisArg, value, index); };
}
exports.not = not;

},{}],222:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeFromArray = exports.pipe = void 0;
var identity_1 = require("./identity");
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity_1.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;

},{"./identity":207}],223:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportUnhandledError = void 0;
var config_1 = require("../config");
var timeoutProvider_1 = require("../scheduler/timeoutProvider");
function reportUnhandledError(err) {
    timeoutProvider_1.timeoutProvider.setTimeout(function () {
        var onUnhandledError = config_1.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
exports.reportUnhandledError = reportUnhandledError;

},{"../config":13,"../scheduler/timeoutProvider":188}],224:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvalidObservableTypeError = void 0;
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
exports.createInvalidObservableTypeError = createInvalidObservableTypeError;

},{}],225:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingService = exports.sharedDataService = void 0;
var rxjs_1 = require("rxjs");
var Shared_DataService = /*#__PURE__*/function () {
  function Shared_DataService() {
    _classCallCheck(this, Shared_DataService);
    this.dataSubject = new rxjs_1.Subject();
    this.data$ = this.dataSubject.asObservable();
  }
  return _createClass(Shared_DataService, [{
    key: "updateData",
    value: function updateData(data) {
      //console.log('updateData:', data);
      this.dataSubject.next(data);
    }
  }]);
}();
var Loading_Service = /*#__PURE__*/function () {
  function Loading_Service(sharedService) {
    var _this = this;
    _classCallCheck(this, Loading_Service);
    this.loadingContainer = document.getElementById('loading-indicator');
    if (this.loadingContainer) {
      this.loadingElement = this.loadingContainer.children[0];
      this.errorElement = document.getElementById('error');
    }
    sharedService.data$.subscribe(function (data) {
      if (data.isLoading) {
        _this.show();
      } else {
        _this.hide();
      }
    });
  }
  return _createClass(Loading_Service, [{
    key: "show",
    value: function show() {
      if (!this.loadingContainer) {
        this.loadingContainer = document.getElementById('loading-indicator');
        this.loadingElement = this.loadingContainer.children[0];
        this.errorElement = document.getElementById('error');
      }
      this.loadingElement.className = "loader";
    }
  }, {
    key: "hide",
    value: function hide() {
      this.loadingElement.className = "";
    }
  }]);
}();
var sharedDataService = new Shared_DataService();
exports.sharedDataService = sharedDataService;
var loadingService = new Loading_Service(sharedDataService);
exports.loadingService = loadingService;

},{"rxjs":2}],226:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiUsers = void 0;
window.exports = {};
var rxjs_1 = require("rxjs");
var httpClient_1 = require("./httpClient");
var Api_Users = /*#__PURE__*/function () {
  function Api_Users() {
    var _this = this;
    _classCallCheck(this, Api_Users);
    this.api_base = 'https://jsonplaceholder.typicode.com';
    //await deleteUserById(userid); 
    this.AddUser = function (data) {
      var _url = "".concat(_this.api_base, "/users/");
      return httpClient_1.clientApi.addRow(_url, data);
    };
    //await deleteUserById(userid); 
    this.deleteUserById = function (user_id) {
      var _url = "".concat(_this.api_base, "/users/");
      return httpClient_1.clientApi.deleteRow(_url, user_id);
    };
    //getUserById1().subscribe(data => { });
    this.getUserById = function (user_id) {
      var _url = "".concat(_this.api_base, "/users/");
      var apiCall = function apiCall() {
        return httpClient_1.clientApi.getRowById(_url, user_id);
      };
      return (0, rxjs_1.defer)(function () {
        return (0, rxjs_1.from)(apiCall());
      });
    };
    //getUsers11().subscribe(data => { });
    this.getUsers = function () {
      var _url = "".concat(_this.api_base, "/users");
      return (0, rxjs_1.from)(httpClient_1.clientApi.getRows(_url));
    };
    // this.api_base = url_user ?? this.api_base;
    this.initialize();
  }
  return _createClass(Api_Users, [{
    key: "initialize",
    value: function initialize() {}
  }]);
}();
var apiUsers = new Api_Users();
exports.apiUsers = apiUsers;

},{"./httpClient":227,"rxjs":2}],227:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientApi = void 0;
window.exports = {};
var lib_1 = require("./lib");
var SharedDataService_1 = require("./SharedDataService");
var Client_Api = /*#__PURE__*/_createClass(function Client_Api() {
  var _this = this;
  _classCallCheck(this, Client_Api);
  //promise by defult
  this.getRows = function (_url) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            console.log("getRows Client_Api");
            SharedDataService_1.sharedDataService.updateData({
              isLoading: true
            });
            _context.next = 4;
            return (0, lib_1.appDelay)(2000);
          case 4:
            _context.next = 6;
            return fetch(_url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 6:
            response = _context.sent;
            _context.prev = 7;
            if (response.ok) {
              _context.next = 10;
              break;
            }
            throw new Error("Failed to delete to-do: ".concat(response.statusText));
          case 10:
            _context.next = 12;
            return response.json();
          case 12:
            return _context.abrupt("return", _context.sent);
          case 13:
            _context.prev = 13;
            SharedDataService_1.sharedDataService.updateData({
              isLoading: false
            });
            // loadingService.hide();
            return _context.finish(13);
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[7,, 13, 16]]);
    }));
  };
  this.addRow = function (_url, data) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var headers, request, response, contentType;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            request = new Request(_url, {
              method: "POST",
              body: JSON.stringify(data),
              headers: headers
            });
            SharedDataService_1.sharedDataService.updateData({
              isLoading: true
            });
            _context2.prev = 4;
            _context2.next = 7;
            return fetch(request);
          case 7:
            response = _context2.sent;
            if (response.ok) {
              _context2.next = 10;
              break;
            }
            throw new Error("Failed to add to-do: ".concat(response.statusText));
          case 10:
            contentType = response.headers.get("content-type");
            if (!(!contentType || !contentType.includes("application/json"))) {
              _context2.next = 13;
              break;
            }
            throw new TypeError("Oops, we haven't got JSON!");
          case 13:
            _context2.next = 15;
            return response.json();
          case 15:
            return _context2.abrupt("return", _context2.sent);
          case 16:
            _context2.prev = 16;
            SharedDataService_1.sharedDataService.updateData({
              isLoading: false
            });
            // loadingService.hide();
            return _context2.finish(16);
          case 19:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[4,, 16, 19]]);
    }));
  };
  this.updateRow = function (_url, todo) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var response;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            SharedDataService_1.sharedDataService.updateData({
              isLoading: true
            });
            _context3.next = 3;
            return fetch("".concat(_url, "/").concat(todo.id), {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(todo)
            });
          case 3:
            response = _context3.sent;
            _context3.prev = 4;
            if (response.ok) {
              _context3.next = 7;
              break;
            }
            throw new Error("Failed to update to-do: ".concat(response.statusText));
          case 7:
            _context3.next = 9;
            return response.json();
          case 9:
            return _context3.abrupt("return", _context3.sent);
          case 10:
            _context3.prev = 10;
            SharedDataService_1.sharedDataService.updateData({
              isLoading: false
            });
            // loadingService.hide();
            return _context3.finish(10);
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[4,, 10, 13]]);
    }));
  };
  this.deleteRow = function (_url, id) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var response;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            SharedDataService_1.sharedDataService.updateData({
              isLoading: true
            });
            //await appDelay(2000)
            _context4.next = 3;
            return fetch("".concat(_url, "/").concat(id), {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 3:
            response = _context4.sent;
            _context4.prev = 4;
            if (response.ok) {
              _context4.next = 7;
              break;
            }
            throw new Error("Failed to delete to-do: ".concat(response.statusText));
          case 7:
            _context4.next = 9;
            return response.json();
          case 9:
            return _context4.abrupt("return", _context4.sent);
          case 10:
            _context4.prev = 10;
            SharedDataService_1.sharedDataService.updateData({
              isLoading: false
            });
            // loadingService.hide();
            return _context4.finish(10);
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[4,, 10, 13]]);
    }));
  };
  this.getRowById = function (_url, id) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var response;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            SharedDataService_1.sharedDataService.updateData({
              isLoading: true
            });
            _context5.prev = 1;
            _context5.next = 4;
            return fetch("".concat(_url, "/").concat(id), {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 4:
            response = _context5.sent;
            if (response.ok) {
              _context5.next = 7;
              break;
            }
            throw new Error("Failed to delete to-do: ".concat(response.statusText));
          case 7:
            _context5.next = 9;
            return response.json();
          case 9:
            return _context5.abrupt("return", _context5.sent);
          case 10:
            _context5.prev = 10;
            SharedDataService_1.sharedDataService.updateData({
              isLoading: false
            });
            // loadingService.hide();
            return _context5.finish(10);
          case 13:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[1,, 10, 13]]);
    }));
  };
  console.log("constructor Client_Api");
});
var clientApi = new Client_Api();
exports.clientApi = clientApi;

},{"./SharedDataService":225,"./lib":228}],228:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalParams = void 0;
exports.appDelay = appDelay;
exports.splitFullName = splitFullName;
exports.getFullName = getFullName;
window.exports = {};
function appDelay(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
}
//export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
function splitFullName(fullName) {
  if (!fullName) {
    return null;
  }
  var names = fullName.trim().split(" ");
  if (names.length === 0) {
    return null;
  }
  if (names.length === 1) {
    return {
      firstName: names[0],
      lastName: ""
    };
  }
  var firstName = names[0];
  var lastName = names.slice(1).join(" ");
  return {
    firstName: firstName,
    lastName: lastName
  };
}
function getFullName(firstName, lastName) {
  if (!firstName && !lastName) {
    return null;
  }
  if (!firstName) {
    return lastName;
  }
  if (!lastName) {
    return firstName;
  }
  return "".concat(firstName, " ").concat(lastName);
}
var GlobalParams = /*#__PURE__*/function () {
  function GlobalParams() {
    _classCallCheck(this, GlobalParams);
  }
  return _createClass(GlobalParams, null, [{
    key: "initialize",
    value: function initialize() {
      var _a, _b;
      this.useModalLoading = false;
      GlobalParams.loadingContainer = (_a = document.getElementById('loading-indicator')) !== null && _a !== void 0 ? _a : undefined;
      console.log(GlobalParams.loadingContainer);
      GlobalParams.loadingElement = (_b = GlobalParams.loadingContainer) === null || _b === void 0 ? void 0 : _b.children[0];
    }
  }, {
    key: "setModalLoading",
    value: function setModalLoading() {
      this.useModalLoading = true;
    }
  }, {
    key: "getModalLoading",
    value: function getModalLoading() {
      return this.useModalLoading;
    }
  }, {
    key: "getLoadingContainer",
    value: function getLoadingContainer() {
      return this.loadingContainer;
    }
  }, {
    key: "getLoadingElement",
    value: function getLoadingElement() {
      return this.loadingElement;
    }
  }]);
}();
exports.GlobalParams = GlobalParams;
GlobalParams.useModalLoading = false;

},{}],229:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
window.exports = {};
var apiUsers_1 = require("./lib/apiUsers");
document.addEventListener('DOMContentLoaded', function () {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return apiUsers_1.apiUsers.getUsers();
        case 2:
          data = _context.sent;
          data.subscribe(function (_data) {
            console.log("DOMContentLoaded", _data);
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
});

},{"./lib/apiUsers":226}]},{},[229])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Bc3luY1N1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9CZWhhdmlvclN1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Ob3RpZmljYXRpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Ob3RpZmljYXRpb25GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9PYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvUmVwbGF5U3ViamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL1NjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL1N1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9TdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvU3Vic2NyaXB0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvZmlyc3RWYWx1ZUZyb20uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9sYXN0VmFsdWVGcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvYmluZENhbGxiYWNrSW50ZXJuYWxzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9iaW5kTm9kZUNhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb25jYXQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Nvbm5lY3RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9kZWZlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZG9tL2FuaW1hdGlvbkZyYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2ZvcmtKb2luLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudFBhdHRlcm4uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21TdWJzY3JpYmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2dlbmVyYXRlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9paWYuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2lubmVyRnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvaW50ZXJ2YWwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9uZXZlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvb2YuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL29uRXJyb3JSZXN1bWVOZXh0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9wYWlycy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvcGFydGl0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYWNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYW5nZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvdGltZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL3VzaW5nLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS96aXAuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2F1ZGl0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2F1ZGl0VGltZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyQ291bnQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyVGltZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXJUb2dnbGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyV2hlbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jYXRjaEVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbWJpbmVBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvY29tYmluZUxhdGVzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jb21iaW5lTGF0ZXN0QWxsLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbWJpbmVMYXRlc3RXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jb25jYXRBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0TWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdE1hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdFdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvY29ubmVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jb3VudC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9kZWJvdW5jZVRpbWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVmYXVsdElmRW1wdHkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVsYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVsYXlXaGVuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2RlbWF0ZXJpYWxpemUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3RVbnRpbENoYW5nZWQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3RVbnRpbEtleUNoYW5nZWQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZWxlbWVudEF0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2VuZFdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZXZlcnkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZXhoYXVzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9leGhhdXN0QWxsLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2V4aGF1c3RNYXAuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZXhwYW5kLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9maW5hbGl6ZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9maW5kLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbmRJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9maXJzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9mbGF0TWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2dyb3VwQnkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvaWdub3JlRWxlbWVudHMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvaXNFbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9qb2luQWxsSW50ZXJuYWxzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2xhc3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvbWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21hdGVyaWFsaXplLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21heC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUludGVybmFscy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlU2Nhbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZVdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvbWluLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL211bHRpY2FzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9vYnNlcnZlT24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvb25FcnJvclJlc3VtZU5leHRXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3BhaXJ3aXNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3BsdWNrLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2guanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcHVibGlzaEJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hMYXN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hSZXBsYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcmFjZVdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JlZkNvdW50LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9yZXBlYXRXaGVuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JldHJ5V2hlbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zYW1wbGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2FtcGxlVGltZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zY2FuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3NjYW5JbnRlcm5hbHMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2VxdWVuY2VFcXVhbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zaGFyZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zaGFyZVJlcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zaW5nbGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9za2lwTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9za2lwVW50aWwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcFdoaWxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3N0YXJ0V2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zdWJzY3JpYmVPbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zd2l0Y2hBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoTWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaE1hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaFNjYW4uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90YWtlTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90YWtlVW50aWwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZVdoaWxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RhcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90aHJvdHRsZVRpbWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGhyb3dJZkVtcHR5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVJbnRlcnZhbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90aW1lb3V0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVvdXRXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVzdGFtcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90b0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dDb3VudC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dUaW1lLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3dpbmRvd1RvZ2dsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dXaGVuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3dpdGhMYXRlc3RGcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3ppcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy96aXBBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvemlwV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlQXN5bmNJdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlT2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZVByb21pc2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVkLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL0FjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9BbmltYXRpb25GcmFtZUFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9BbmltYXRpb25GcmFtZVNjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9Bc2FwQWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL0FzYXBTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNBY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvUXVldWVBY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvUXVldWVTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvVmlydHVhbFRpbWVTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvYW5pbWF0aW9uRnJhbWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvYW5pbWF0aW9uRnJhbWVQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9hc2FwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9pbW1lZGlhdGVQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9pbnRlcnZhbFByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL3BlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvcXVldWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC90eXBlcy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL0VtcHR5RXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL0ltbWVkaWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvTm90Rm91bmRFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL1NlcXVlbmNlRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2FyZ3MuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2FyZ3NBcmdBcnJheU9yT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9hcmdzT3JBcmdBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvYXJyUmVtb3ZlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9jcmVhdGVFcnJvckNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9jcmVhdGVPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2Vycm9yQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvZXhlY3V0ZVNjaGVkdWxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNBcnJheUxpa2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzQXN5bmNJdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNEYXRlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0l0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc09ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzU2NoZWR1bGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9saWZ0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9tYXBPbmVPck1hbnlBcmdzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9ub3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL3BpcGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yLmpzIiwic3JjL3NjcmlwdHMvbGliL1NoYXJlZERhdGFTZXJ2aWNlLmpzIiwic3JjL3NjcmlwdHMvbGliL2FwaVVzZXJzLmpzIiwic3JjL3NjcmlwdHMvbGliL2h0dHBDbGllbnQuanMiLCJzcmMvc2NyaXB0cy9saWIvbGliLmpzIiwic3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBLFlBQVk7O0FBQUMsU0FBQSxRQUFBLENBQUEsc0NBQUEsT0FBQSx3QkFBQSxNQUFBLHVCQUFBLE1BQUEsQ0FBQSxRQUFBLGFBQUEsQ0FBQSxrQkFBQSxDQUFBLGdCQUFBLENBQUEsV0FBQSxDQUFBLHlCQUFBLE1BQUEsSUFBQSxDQUFBLENBQUEsV0FBQSxLQUFBLE1BQUEsSUFBQSxDQUFBLEtBQUEsTUFBQSxDQUFBLFNBQUEscUJBQUEsQ0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQUEsU0FBQSxnQkFBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsWUFBQSxDQUFBLGFBQUEsU0FBQTtBQUFBLFNBQUEsa0JBQUEsQ0FBQSxFQUFBLENBQUEsYUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsUUFBQSxDQUFBLENBQUEsWUFBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLFFBQUEsUUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSxjQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBO0FBQUEsU0FBQSxhQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsSUFBQSxpQkFBQSxDQUFBLENBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxpQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLGlCQUFBLFFBQUEsU0FBQSxDQUFBO0FBQUEsU0FBQSxlQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsWUFBQSxDQUFBLENBQUEsZ0NBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLFNBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxvQkFBQSxPQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsV0FBQSxrQkFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsZ0NBQUEsT0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsU0FBQSx5RUFBQSxDQUFBLEdBQUEsTUFBQSxHQUFBLE1BQUEsRUFBQSxDQUFBO0FBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0VBQUUsS0FBSyxFQUFFO0FBQUssQ0FBQyxDQUFDO0FBQzdELE9BQU8sQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztBQUMzRCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQUMsSUFDekIsa0JBQWtCO0VBQ3BCLFNBQUEsbUJBQUEsRUFBYztJQUFBLGVBQUEsT0FBQSxrQkFBQTtJQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0VBQ2hEO0VBQUMsT0FBQSxZQUFBLENBQUEsa0JBQUE7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQUEsVUFBVSxDQUFDLElBQUksRUFBRTtNQUNiO01BQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQy9CO0VBQUM7QUFBQTtBQUFBLElBRUMsZUFBZTtFQUNqQixTQUFBLGdCQUFZLGFBQWEsRUFBRTtJQUFBLElBQUEsS0FBQTtJQUFBLGVBQUEsT0FBQSxlQUFBO0lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDO0lBQ3BFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO01BQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7TUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztJQUN4RDtJQUNBLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxFQUFJO01BQ2xDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNoQixLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDZixDQUFDLE1BQ0k7UUFDRCxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDZjtJQUNKLENBQUMsQ0FBQztFQUNOO0VBQUMsT0FBQSxZQUFBLENBQUEsZUFBQTtJQUFBLEdBQUE7SUFBQSxLQUFBLEVBQ0QsU0FBQSxJQUFJLENBQUEsRUFBRztNQUNILElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUM7UUFDcEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO01BQ3hEO01BQ0EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsUUFBUTtJQUM1QztFQUFDO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFBLElBQUksQ0FBQSxFQUFHO01BQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsRUFBRTtJQUN0QztFQUFDO0FBQUE7QUFFTCxJQUFNLGlCQUFpQixHQUFHLElBQUksa0JBQWtCLENBQUMsQ0FBQztBQUNsRCxPQUFPLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQzdDLElBQU0sY0FBYyxHQUFHLElBQUksZUFBZSxDQUFDLGlCQUFpQixDQUFDO0FBQzdELE9BQU8sQ0FBQyxjQUFjLEdBQUcsY0FBYzs7O0FDN0N2QyxZQUFZOztBQUFDLFNBQUEsUUFBQSxDQUFBLHNDQUFBLE9BQUEsd0JBQUEsTUFBQSx1QkFBQSxNQUFBLENBQUEsUUFBQSxhQUFBLENBQUEsa0JBQUEsQ0FBQSxnQkFBQSxDQUFBLFdBQUEsQ0FBQSx5QkFBQSxNQUFBLElBQUEsQ0FBQSxDQUFBLFdBQUEsS0FBQSxNQUFBLElBQUEsQ0FBQSxLQUFBLE1BQUEsQ0FBQSxTQUFBLHFCQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQTtBQUFBLFNBQUEsZ0JBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsQ0FBQSxhQUFBLFNBQUE7QUFBQSxTQUFBLGtCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLFFBQUEsQ0FBQSxDQUFBLFlBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxRQUFBLFFBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQTtBQUFBLFNBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxpQkFBQSxRQUFBLFNBQUEsQ0FBQTtBQUFBLFNBQUEsZUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLFlBQUEsQ0FBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsT0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsa0JBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLFNBQUEseUVBQUEsQ0FBQSxHQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsQ0FBQTtBQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtFQUFFLEtBQUssRUFBRTtBQUFLLENBQUMsQ0FBQztBQUM3RCxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN6QixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNuQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzlCLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFBQyxJQUN2QyxTQUFTO0VBQ1gsU0FBQSxVQUFBLEVBQWM7SUFBQSxJQUFBLEtBQUE7SUFBQSxlQUFBLE9BQUEsU0FBQTtJQUNWLElBQUksQ0FBQyxRQUFRLEdBQUcsc0NBQXNDO0lBQ3REO0lBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFDLElBQUksRUFBSztNQUNyQixJQUFJLElBQUksTUFBQSxNQUFBLENBQU0sS0FBSSxDQUFDLFFBQVEsWUFBUztNQUNwQyxPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUNEO0lBQ0EsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFDLE9BQU8sRUFBSztNQUMvQixJQUFJLElBQUksTUFBQSxNQUFBLENBQU0sS0FBSSxDQUFDLFFBQVEsWUFBUztNQUNwQyxPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7SUFDMUQsQ0FBQztJQUNEO0lBQ0EsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFDLE9BQU8sRUFBSztNQUM1QixJQUFJLElBQUksTUFBQSxNQUFBLENBQU0sS0FBSSxDQUFDLFFBQVEsWUFBUztNQUNwQyxJQUFNLE9BQU8sR0FBRyxTQUFWLE9BQU8sQ0FBQTtRQUFBLE9BQVMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztNQUFBO01BQ3RFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtRQUFBLE9BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO01BQUEsRUFBQztJQUMvRCxDQUFDO0lBQ0Q7SUFDQSxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07TUFDbEIsSUFBSSxJQUFJLE1BQUEsTUFBQSxDQUFNLEtBQUksQ0FBQyxRQUFRLFdBQVE7TUFDbkMsT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDRDtJQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUNyQjtFQUFDLE9BQUEsWUFBQSxDQUFBLFNBQUE7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQUEsVUFBVSxDQUFBLEVBQUcsQ0FDYjtFQUFDO0FBQUE7QUFFTCxJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDO0FBQzlCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUTs7O0FDckMzQixZQUFZOztBQUFDLFNBQUEsUUFBQSxDQUFBLHNDQUFBLE9BQUEsd0JBQUEsTUFBQSx1QkFBQSxNQUFBLENBQUEsUUFBQSxhQUFBLENBQUEsa0JBQUEsQ0FBQSxnQkFBQSxDQUFBLFdBQUEsQ0FBQSx5QkFBQSxNQUFBLElBQUEsQ0FBQSxDQUFBLFdBQUEsS0FBQSxNQUFBLElBQUEsQ0FBQSxLQUFBLE1BQUEsQ0FBQSxTQUFBLHFCQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQTtBQUFBLFNBQUEsb0JBQUEsa0JBQ2IsbUtBQUEsbUJBQUEsWUFBQSxvQkFBQSxXQUFBLENBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsY0FBQSxFQUFBLENBQUEsd0JBQUEsTUFBQSxHQUFBLE1BQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsa0JBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxhQUFBLHVCQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsV0FBQSw4QkFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxVQUFBLEdBQUEsQ0FBQSxFQUFBLFlBQUEsR0FBQSxDQUFBLEVBQUEsUUFBQSxHQUFBLENBQUEsYUFBQSxDQUFBLG1CQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsZ0JBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsU0FBQSxZQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxTQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUEsdUJBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSx1QkFBQSxDQUFBLEVBQUEsQ0FBQSxjQUFBLENBQUEsUUFBQSxLQUFBLDRDQUFBLENBQUEsb0JBQUEsQ0FBQSxRQUFBLENBQUEsV0FBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsZUFBQSxDQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsTUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLEtBQUEsQ0FBQSxtQkFBQSxDQUFBLHFCQUFBLENBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLHNCQUFBLENBQUEsQ0FBQSxNQUFBLGNBQUEsQ0FBQSxRQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxpQkFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLHVCQUFBLENBQUEsQ0FBQSxNQUFBLElBQUEsQ0FBQSxDQUFBLE1BQUEsV0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxxQkFBQSxLQUFBLEVBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsa0JBQUEsQ0FBQSxDQUFBLElBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLE1BQUEsWUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsQ0FBQSxlQUFBLENBQUEsYUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxtQkFBQSxJQUFBLFlBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsY0FBQSxDQUFBLGFBQUEsSUFBQSxXQUFBLEdBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxnQkFBQSxVQUFBLGNBQUEsa0JBQUEsY0FBQSwyQkFBQSxTQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEscUNBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsMEJBQUEsQ0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBLFNBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsWUFBQSxFQUFBLENBQUEsZ0NBQUEsT0FBQSxXQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsWUFBQSxDQUFBLGdCQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxzQkFBQSxjQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLG1CQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsQ0FBQSxnQkFBQSxPQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsZ0JBQUEsQ0FBQSxJQUFBLENBQUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxJQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLGdCQUFBLENBQUEsV0FBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLFNBQUEsQ0FBQSxFQUFBLENBQUEsNEJBQUEsQ0FBQSxFQUFBLENBQUEsYUFBQSxFQUFBLGVBQUEsQ0FBQSxXQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsZ0JBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSx1QkFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLFFBQUEscUJBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLE1BQUEsYUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsTUFBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLE1BQUEsWUFBQSxDQUFBLENBQUEsR0FBQSxPQUFBLFNBQUEsdUNBQUEsQ0FBQSxpQkFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxtQkFBQSxDQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsQ0FBQSxNQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxRQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxDQUFBLE1BQUEsV0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxTQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLE1BQUEsWUFBQSxDQUFBLENBQUEsR0FBQSxPQUFBLFNBQUEsc0NBQUEsQ0FBQSxDQUFBLFFBQUEsU0FBQSxDQUFBLGNBQUEsRUFBQSxDQUFBLFNBQUEsVUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLGNBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsV0FBQSxDQUFBLENBQUEsSUFBQSxhQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxDQUFBLGFBQUEsUUFBQSxDQUFBLFNBQUEsVUFBQSxXQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxjQUFBLEtBQUEsaUJBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLDRCQUFBLENBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxPQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxTQUFBLENBQUEsT0FBQSxDQUFBLFlBQUEsRUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsT0FBQSxDQUFBLFlBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLGdCQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxrQ0FBQSxpQkFBQSxDQUFBLFNBQUEsR0FBQSwwQkFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLGlCQUFBLDBCQUFBLEdBQUEsQ0FBQSxDQUFBLDBCQUFBLGlCQUFBLGlCQUFBLEdBQUEsaUJBQUEsQ0FBQSxXQUFBLEdBQUEsQ0FBQSxDQUFBLDBCQUFBLEVBQUEsQ0FBQSx3QkFBQSxDQUFBLENBQUEsbUJBQUEsYUFBQSxDQUFBLFFBQUEsQ0FBQSx3QkFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFdBQUEsV0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLGlCQUFBLDZCQUFBLENBQUEsQ0FBQSxXQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxhQUFBLENBQUEsV0FBQSxNQUFBLENBQUEsY0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLDBCQUFBLEtBQUEsQ0FBQSxDQUFBLFNBQUEsR0FBQSwwQkFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSx5QkFBQSxDQUFBLENBQUEsU0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsS0FBQSxhQUFBLENBQUEsYUFBQSxPQUFBLEVBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxhQUFBLENBQUEsU0FBQSxHQUFBLENBQUEsQ0FBQSxhQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsaUNBQUEsQ0FBQSxDQUFBLGFBQUEsR0FBQSxhQUFBLEVBQUEsQ0FBQSxDQUFBLEtBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxlQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsT0FBQSxPQUFBLENBQUEsT0FBQSxhQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLG1CQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxHQUFBLElBQUEsV0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsZ0JBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGlDQUFBLENBQUEsQ0FBQSxDQUFBLDZEQUFBLENBQUEsQ0FBQSxJQUFBLGFBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsZ0JBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsbUJBQUEsRUFBQSxXQUFBLENBQUEsQ0FBQSxNQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBQSxTQUFBLEtBQUEsV0FBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLFdBQUEsTUFBQSxDQUFBLGFBQUEsSUFBQSxRQUFBLElBQUEsV0FBQSxJQUFBLFFBQUEsS0FBQSxHQUFBLENBQUEsT0FBQSxJQUFBLFlBQUEsUUFBQSxjQUFBLE1BQUEsZ0JBQUEsR0FBQSxHQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsQ0FBQSxrQkFBQSxDQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxNQUFBLEtBQUEsRUFBQSxDQUFBLENBQUEsS0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsSUFBQSxXQUFBLEtBQUEsU0FBQSxJQUFBLFdBQUEsQ0FBQSxRQUFBLFVBQUEsd0JBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLENBQUEsR0FBQSxjQUFBLElBQUEsS0FBQSxpQkFBQSxXQUFBLGtCQUFBLENBQUEsYUFBQSxJQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsa0JBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsWUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsUUFBQSxJQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxnQkFBQSxDQUFBLFlBQUEsQ0FBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxRQUFBLEtBQUEsd0RBQUEsQ0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsY0FBQSxNQUFBLGdCQUFBLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLGNBQUEsTUFBQSxXQUFBLE9BQUEsQ0FBQSxFQUFBLENBQUEsYUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsWUFBQSxDQUFBLFlBQUEsSUFBQSxTQUFBLElBQUEsR0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsYUFBQSxDQUFBLGlCQUFBLENBQUEsbUJBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxDQUFBLGNBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLGlCQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxNQUFBLGdCQUFBLElBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLFFBQUEsQ0FBQSxDQUFBLE1BQUEsUUFBQSxXQUFBLFNBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLENBQUEsR0FBQSxxQkFBQSxDQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxnQkFBQSxDQUFBLENBQUEsSUFBQSxTQUFBLElBQUEsUUFBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsT0FBQSxNQUFBLGtCQUFBLElBQUEseUJBQUEsQ0FBQSxDQUFBLElBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsTUFBQSxXQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsY0FBQSxRQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEseUJBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLHFCQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsWUFBQSxDQUFBLFlBQUEsS0FBQSw4QkFBQSxhQUFBLFdBQUEsY0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsZ0JBQUEsUUFBQSxLQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsTUFBQSxVQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUE7QUFBQSxTQUFBLGtCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLFFBQUEsQ0FBQSxDQUFBLFlBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxRQUFBLFFBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQTtBQUFBLFNBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxpQkFBQSxRQUFBLFNBQUEsQ0FBQTtBQUFBLFNBQUEsZUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLFlBQUEsQ0FBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsT0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsa0JBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLFNBQUEseUVBQUEsQ0FBQSxHQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsQ0FBQTtBQUFBLFNBQUEsZ0JBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsQ0FBQSxhQUFBLFNBQUE7QUFBQSxJQUFJLFNBQVMsR0FBSSxVQUFRLFNBQUssU0FBUyxJQUFLLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0VBQ3JGLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRTtJQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUU7TUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQUUsQ0FBQyxDQUFDO0VBQUU7RUFDM0csT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0lBQ3ZELFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRTtNQUFFLElBQUk7UUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7TUFBRTtJQUFFO0lBQzFGLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRTtNQUFFLElBQUk7UUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztNQUFFO0lBQUU7SUFDN0YsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFO01BQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7SUFBRTtJQUM3RyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDekUsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtFQUFFLEtBQUssRUFBRTtBQUFLLENBQUMsQ0FBQztBQUM3RCxPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUMxQixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNuQixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQzlCLElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0FBQUMsSUFDckQsVUFBVSxnQkFBQSxZQUFBLENBQ1osU0FBQSxXQUFBLEVBQWM7RUFBQSxJQUFBLEtBQUE7RUFBQSxlQUFBLE9BQUEsVUFBQTtFQUNWO0VBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFDLElBQUk7SUFBQSxPQUFLLFNBQVMsQ0FBQyxLQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLGVBQUEsbUJBQUEsR0FBQSxJQUFBLENBQUUsU0FBQSxRQUFBO01BQUEsSUFBQSxRQUFBO01BQUEsT0FBQSxtQkFBQSxHQUFBLElBQUEsVUFBQSxTQUFBLFFBQUE7UUFBQSxrQkFBQSxRQUFBLENBQUEsSUFBQSxHQUFBLFFBQUEsQ0FBQSxJQUFBO1VBQUE7WUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztZQUNqQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Y0FBRSxTQUFTLEVBQUU7WUFBSyxDQUFDLENBQUM7WUFBQyxRQUFBLENBQUEsSUFBQTtZQUN0RSxPQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO1VBQUE7WUFBQSxRQUFBLENBQUEsSUFBQTtZQUNkLE9BQU0sS0FBSyxDQUFDLElBQUksRUFBRTtjQUMvQixNQUFNLEVBQUUsS0FBSztjQUNiLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUU7Y0FDcEI7WUFDSixDQUFDLENBQUM7VUFBQTtZQUxJLFFBQVEsR0FBQSxRQUFBLENBQUEsSUFBQTtZQUFBLFFBQUEsQ0FBQSxJQUFBO1lBQUEsSUFPTCxRQUFRLENBQUMsRUFBRTtjQUFBLFFBQUEsQ0FBQSxJQUFBO2NBQUE7WUFBQTtZQUFBLE1BQ04sSUFBSSxLQUFLLDRCQUFBLE1BQUEsQ0FBNEIsUUFBUSxDQUFDLFVBQVUsQ0FBRSxDQUFDO1VBQUE7WUFBQSxRQUFBLENBQUEsSUFBQTtZQUU3RCxPQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUFBO1lBQUEsT0FBQSxRQUFBLENBQUEsTUFBQSxXQUFBLFFBQUEsQ0FBQSxJQUFBO1VBQUE7WUFBQSxRQUFBLENBQUEsSUFBQTtZQUc3QixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Y0FBRSxTQUFTLEVBQUU7WUFBTSxDQUFDLENBQUM7WUFDdEU7WUFBQSxPQUFBLFFBQUEsQ0FBQSxNQUFBO1VBQUE7VUFBQTtZQUFBLE9BQUEsUUFBQSxDQUFBLElBQUE7UUFBQTtNQUFBLEdBQUEsT0FBQTtJQUFBLENBRVAsRUFBQztFQUFBO0VBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJO0lBQUEsT0FBSyxTQUFTLENBQUMsS0FBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFBLG1CQUFBLEdBQUEsSUFBQSxDQUFFLFNBQUEsU0FBQTtNQUFBLElBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsV0FBQTtNQUFBLE9BQUEsbUJBQUEsR0FBQSxJQUFBLFVBQUEsVUFBQSxTQUFBO1FBQUEsa0JBQUEsU0FBQSxDQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsSUFBQTtVQUFBO1lBQ3BELE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDO1lBQzVDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Y0FDOUIsTUFBTSxFQUFFLE1BQU07Y0FDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Y0FDMUIsT0FBTyxFQUFFO1lBQ2IsQ0FBQyxDQUFDO1lBQ0YsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2NBQUUsU0FBUyxFQUFFO1lBQUssQ0FBQyxDQUFDO1lBQUMsU0FBQSxDQUFBLElBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUVqRCxPQUFNLEtBQUssQ0FBQyxPQUFPLENBQUM7VUFBQTtZQUEvQixRQUFRLEdBQUEsU0FBQSxDQUFBLElBQUE7WUFBQSxJQUNULFFBQVEsQ0FBQyxFQUFFO2NBQUEsU0FBQSxDQUFBLElBQUE7Y0FBQTtZQUFBO1lBQUEsTUFDTixJQUFJLEtBQUsseUJBQUEsTUFBQSxDQUF5QixRQUFRLENBQUMsVUFBVSxDQUFFLENBQUM7VUFBQTtZQUU1RCxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1lBQUEsTUFDcEQsQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO2NBQUEsU0FBQSxDQUFBLElBQUE7Y0FBQTtZQUFBO1lBQUEsTUFDbkQsSUFBSSxTQUFTLENBQUMsNEJBQTRCLENBQUM7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRTlDLE9BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQUE7WUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBLFdBQUEsU0FBQSxDQUFBLElBQUE7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRzVCLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFNLENBQUMsQ0FBQztZQUN0RTtZQUFBLE9BQUEsU0FBQSxDQUFBLE1BQUE7VUFBQTtVQUFBO1lBQUEsT0FBQSxTQUFBLENBQUEsSUFBQTtRQUFBO01BQUEsR0FBQSxRQUFBO0lBQUEsQ0FFUCxFQUFDO0VBQUE7RUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUk7SUFBQSxPQUFLLFNBQVMsQ0FBQyxLQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLGVBQUEsbUJBQUEsR0FBQSxJQUFBLENBQUUsU0FBQSxTQUFBO01BQUEsSUFBQSxRQUFBO01BQUEsT0FBQSxtQkFBQSxHQUFBLElBQUEsVUFBQSxVQUFBLFNBQUE7UUFBQSxrQkFBQSxTQUFBLENBQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxJQUFBO1VBQUE7WUFDN0QsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2NBQUUsU0FBUyxFQUFFO1lBQUssQ0FBQyxDQUFDO1lBQUMsU0FBQSxDQUFBLElBQUE7WUFDckQsT0FBTSxLQUFLLElBQUEsTUFBQSxDQUFJLElBQUksT0FBQSxNQUFBLENBQUksSUFBSSxDQUFDLEVBQUUsR0FBSTtjQUMvQyxNQUFNLEVBQUUsS0FBSztjQUNiLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUU7Y0FDcEIsQ0FBQztjQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDN0IsQ0FBQyxDQUFDO1VBQUE7WUFOSSxRQUFRLEdBQUEsU0FBQSxDQUFBLElBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUFBLElBUUwsUUFBUSxDQUFDLEVBQUU7Y0FBQSxTQUFBLENBQUEsSUFBQTtjQUFBO1lBQUE7WUFBQSxNQUNOLElBQUksS0FBSyw0QkFBQSxNQUFBLENBQTRCLFFBQVEsQ0FBQyxVQUFVLENBQUUsQ0FBQztVQUFBO1lBQUEsU0FBQSxDQUFBLElBQUE7WUFFOUQsT0FBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7VUFBQTtZQUFBLE9BQUEsU0FBQSxDQUFBLE1BQUEsV0FBQSxTQUFBLENBQUEsSUFBQTtVQUFBO1lBQUEsU0FBQSxDQUFBLElBQUE7WUFHNUIsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2NBQUUsU0FBUyxFQUFFO1lBQU0sQ0FBQyxDQUFDO1lBQ3RFO1lBQUEsT0FBQSxTQUFBLENBQUEsTUFBQTtVQUFBO1VBQUE7WUFBQSxPQUFBLFNBQUEsQ0FBQSxJQUFBO1FBQUE7TUFBQSxHQUFBLFFBQUE7SUFBQSxDQUVQLEVBQUM7RUFBQTtFQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBQyxJQUFJLEVBQUUsRUFBRTtJQUFBLE9BQUssU0FBUyxDQUFDLEtBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsZUFBQSxtQkFBQSxHQUFBLElBQUEsQ0FBRSxTQUFBLFNBQUE7TUFBQSxJQUFBLFFBQUE7TUFBQSxPQUFBLG1CQUFBLEdBQUEsSUFBQSxVQUFBLFVBQUEsU0FBQTtRQUFBLGtCQUFBLFNBQUEsQ0FBQSxJQUFBLEdBQUEsU0FBQSxDQUFBLElBQUE7VUFBQTtZQUMzRCxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Y0FBRSxTQUFTLEVBQUU7WUFBSyxDQUFDLENBQUM7WUFDckU7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUNpQixPQUFNLEtBQUssSUFBQSxNQUFBLENBQUksSUFBSSxPQUFBLE1BQUEsQ0FBSSxFQUFFLEdBQUk7Y0FDMUMsTUFBTSxFQUFFLFFBQVE7Y0FDaEIsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRTtjQUNwQjtZQUNKLENBQUMsQ0FBQztVQUFBO1lBTEksUUFBUSxHQUFBLFNBQUEsQ0FBQSxJQUFBO1lBQUEsU0FBQSxDQUFBLElBQUE7WUFBQSxJQU9MLFFBQVEsQ0FBQyxFQUFFO2NBQUEsU0FBQSxDQUFBLElBQUE7Y0FBQTtZQUFBO1lBQUEsTUFDTixJQUFJLEtBQUssNEJBQUEsTUFBQSxDQUE0QixRQUFRLENBQUMsVUFBVSxDQUFFLENBQUM7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRTlELE9BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQUE7WUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBLFdBQUEsU0FBQSxDQUFBLElBQUE7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRzVCLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFNLENBQUMsQ0FBQztZQUN0RTtZQUFBLE9BQUEsU0FBQSxDQUFBLE1BQUE7VUFBQTtVQUFBO1lBQUEsT0FBQSxTQUFBLENBQUEsSUFBQTtRQUFBO01BQUEsR0FBQSxRQUFBO0lBQUEsQ0FFUCxFQUFDO0VBQUE7RUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQUMsSUFBSSxFQUFFLEVBQUU7SUFBQSxPQUFLLFNBQVMsQ0FBQyxLQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLGVBQUEsbUJBQUEsR0FBQSxJQUFBLENBQUUsU0FBQSxTQUFBO01BQUEsSUFBQSxRQUFBO01BQUEsT0FBQSxtQkFBQSxHQUFBLElBQUEsVUFBQSxVQUFBLFNBQUE7UUFBQSxrQkFBQSxTQUFBLENBQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxJQUFBO1VBQUE7WUFDNUQsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2NBQUUsU0FBUyxFQUFFO1lBQUssQ0FBQyxDQUFDO1lBQUMsU0FBQSxDQUFBLElBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUVqRCxPQUFNLEtBQUssSUFBQSxNQUFBLENBQUksSUFBSSxPQUFBLE1BQUEsQ0FBSSxFQUFFLEdBQUk7Y0FDMUMsTUFBTSxFQUFFLEtBQUs7Y0FDYixPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFO2NBQ3BCO1lBQ0osQ0FBQyxDQUFDO1VBQUE7WUFMSSxRQUFRLEdBQUEsU0FBQSxDQUFBLElBQUE7WUFBQSxJQU1ULFFBQVEsQ0FBQyxFQUFFO2NBQUEsU0FBQSxDQUFBLElBQUE7Y0FBQTtZQUFBO1lBQUEsTUFDTixJQUFJLEtBQUssNEJBQUEsTUFBQSxDQUE0QixRQUFRLENBQUMsVUFBVSxDQUFFLENBQUM7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRTdELE9BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQUE7WUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBLFdBQUEsU0FBQSxDQUFBLElBQUE7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRzdCLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFNLENBQUMsQ0FBQztZQUN0RTtZQUFBLE9BQUEsU0FBQSxDQUFBLE1BQUE7VUFBQTtVQUFBO1lBQUEsT0FBQSxTQUFBLENBQUEsSUFBQTtRQUFBO01BQUEsR0FBQSxRQUFBO0lBQUEsQ0FFUCxFQUFDO0VBQUE7RUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO0FBQ3pDLENBQUM7QUFFTCxJQUFNLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUzs7O0FDL0g3QixZQUFZOztBQUFDLFNBQUEsUUFBQSxDQUFBLHNDQUFBLE9BQUEsd0JBQUEsTUFBQSx1QkFBQSxNQUFBLENBQUEsUUFBQSxhQUFBLENBQUEsa0JBQUEsQ0FBQSxnQkFBQSxDQUFBLFdBQUEsQ0FBQSx5QkFBQSxNQUFBLElBQUEsQ0FBQSxDQUFBLFdBQUEsS0FBQSxNQUFBLElBQUEsQ0FBQSxLQUFBLE1BQUEsQ0FBQSxTQUFBLHFCQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQTtBQUFBLFNBQUEsZ0JBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsQ0FBQSxhQUFBLFNBQUE7QUFBQSxTQUFBLGtCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLFFBQUEsQ0FBQSxDQUFBLFlBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxRQUFBLFFBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQTtBQUFBLFNBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxpQkFBQSxRQUFBLFNBQUEsQ0FBQTtBQUFBLFNBQUEsZUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLFlBQUEsQ0FBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsT0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsa0JBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLFNBQUEseUVBQUEsQ0FBQSxHQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsQ0FBQTtBQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtFQUFFLEtBQUssRUFBRTtBQUFLLENBQUMsQ0FBQztBQUM3RCxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUM3QixPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVE7QUFDM0IsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhO0FBQ3JDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVztBQUNqQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNuQixTQUFTLFFBQVEsQ0FBQyxZQUFZLEVBQUU7RUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU87SUFBQSxPQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDO0VBQUEsRUFBQztBQUNwRTtBQUNBO0FBQ0EsU0FBUyxhQUFhLENBQUMsUUFBUSxFQUFFO0VBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUU7SUFDWCxPQUFPLElBQUk7RUFDZjtFQUNBLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDeEMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUNwQixPQUFPLElBQUk7RUFDZjtFQUNBLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDcEIsT0FBTztNQUNILFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO01BQ25CLFFBQVEsRUFBRTtJQUNkLENBQUM7RUFDTDtFQUNBLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDMUIsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0VBQ3pDLE9BQU87SUFDSCxTQUFTLEVBQVQsU0FBUztJQUNULFFBQVEsRUFBUjtFQUNKLENBQUM7QUFDTDtBQUNBLFNBQVMsV0FBVyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUU7RUFDdEMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTtJQUN6QixPQUFPLElBQUk7RUFDZjtFQUNBLElBQUksQ0FBQyxTQUFTLEVBQUU7SUFDWixPQUFPLFFBQVE7RUFDbkI7RUFDQSxJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ1gsT0FBTyxTQUFTO0VBQ3BCO0VBQ0EsVUFBQSxNQUFBLENBQVUsU0FBUyxPQUFBLE1BQUEsQ0FBSSxRQUFRO0FBQ25DO0FBQUMsSUFDSyxZQUFZO0VBQ2QsU0FBQSxhQUFBLEVBQWM7SUFBQSxlQUFBLE9BQUEsWUFBQTtFQUNkO0VBQUMsT0FBQSxZQUFBLENBQUEsWUFBQTtJQUFBLEdBQUE7SUFBQSxLQUFBLEVBQ0QsU0FBTyxVQUFVLENBQUEsRUFBRztNQUNoQixJQUFJLEVBQUUsRUFBRSxFQUFFO01BQ1YsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLO01BQzVCLFlBQVksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUUsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUztNQUM5SCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztNQUMxQyxZQUFZLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsTUFBTSxJQUFJLElBQUksRUFBRSxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFIO0VBQUM7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQU8sZUFBZSxDQUFBLEVBQUc7TUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJO0lBQy9CO0VBQUM7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQU8sZUFBZSxDQUFBLEVBQUc7TUFDckIsT0FBTyxJQUFJLENBQUMsZUFBZTtJQUMvQjtFQUFDO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFPLG1CQUFtQixDQUFBLEVBQUc7TUFDekIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCO0lBQ2hDO0VBQUM7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQU8saUJBQWlCLENBQUEsRUFBRztNQUN2QixPQUFPLElBQUksQ0FBQyxjQUFjO0lBQzlCO0VBQUM7QUFBQTtBQUVMLE9BQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWTtBQUNuQyxZQUFZLENBQUMsZUFBZSxHQUFHLEtBQUs7OztBQ3BFcEMsWUFBWTs7QUFBQyxTQUFBLFFBQUEsQ0FBQSxzQ0FBQSxPQUFBLHdCQUFBLE1BQUEsdUJBQUEsTUFBQSxDQUFBLFFBQUEsYUFBQSxDQUFBLGtCQUFBLENBQUEsZ0JBQUEsQ0FBQSxXQUFBLENBQUEseUJBQUEsTUFBQSxJQUFBLENBQUEsQ0FBQSxXQUFBLEtBQUEsTUFBQSxJQUFBLENBQUEsS0FBQSxNQUFBLENBQUEsU0FBQSxxQkFBQSxDQUFBLEtBQUEsT0FBQSxDQUFBLENBQUE7QUFBQSxTQUFBLG9CQUFBLGtCQUNiLG1LQUFBLG1CQUFBLFlBQUEsb0JBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLGNBQUEsRUFBQSxDQUFBLHdCQUFBLE1BQUEsR0FBQSxNQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLGtCQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSx1QkFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFdBQUEsOEJBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsVUFBQSxHQUFBLENBQUEsRUFBQSxZQUFBLEdBQUEsQ0FBQSxFQUFBLFFBQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQSxtQkFBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLGdCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFNBQUEsWUFBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBLHVCQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsdUJBQUEsQ0FBQSxFQUFBLENBQUEsY0FBQSxDQUFBLFFBQUEsS0FBQSw0Q0FBQSxDQUFBLG9CQUFBLENBQUEsUUFBQSxDQUFBLFdBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLGVBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLE1BQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsbUJBQUEsQ0FBQSxxQkFBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxzQkFBQSxDQUFBLENBQUEsTUFBQSxjQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSx1QkFBQSxDQUFBLENBQUEsTUFBQSxJQUFBLENBQUEsQ0FBQSxNQUFBLFdBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxLQUFBLENBQUEscUJBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLGtCQUFBLENBQUEsQ0FBQSxJQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxNQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBLGFBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsbUJBQUEsSUFBQSxZQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGNBQUEsQ0FBQSxhQUFBLElBQUEsV0FBQSxHQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUEsZ0JBQUEsVUFBQSxjQUFBLGtCQUFBLGNBQUEsMkJBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLHFDQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLDBCQUFBLENBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxTQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLGdDQUFBLE9BQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxnQkFBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsc0JBQUEsY0FBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLENBQUEsZ0JBQUEsT0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxnQkFBQSxDQUFBLFdBQUEsQ0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBLDRCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsRUFBQSxlQUFBLENBQUEsV0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsdUJBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxRQUFBLHFCQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxNQUFBLGFBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLE1BQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxNQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsT0FBQSxTQUFBLHVDQUFBLENBQUEsaUJBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEdBQUEsbUJBQUEsQ0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsTUFBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsUUFBQSxTQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsQ0FBQSxNQUFBLFdBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxNQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsT0FBQSxTQUFBLHNDQUFBLENBQUEsQ0FBQSxRQUFBLFNBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQSxTQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBLElBQUEsYUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxhQUFBLFFBQUEsQ0FBQSxTQUFBLFVBQUEsV0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsY0FBQSxLQUFBLGlCQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSw0QkFBQSxDQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsT0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxZQUFBLEVBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxnQkFBQSxTQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsa0NBQUEsaUJBQUEsQ0FBQSxTQUFBLEdBQUEsMEJBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxpQkFBQSwwQkFBQSxHQUFBLENBQUEsQ0FBQSwwQkFBQSxpQkFBQSxpQkFBQSxHQUFBLGlCQUFBLENBQUEsV0FBQSxHQUFBLENBQUEsQ0FBQSwwQkFBQSxFQUFBLENBQUEsd0JBQUEsQ0FBQSxDQUFBLG1CQUFBLGFBQUEsQ0FBQSxRQUFBLENBQUEsd0JBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxXQUFBLFdBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxpQkFBQSw2QkFBQSxDQUFBLENBQUEsV0FBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsYUFBQSxDQUFBLFdBQUEsTUFBQSxDQUFBLGNBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSwwQkFBQSxLQUFBLENBQUEsQ0FBQSxTQUFBLEdBQUEsMEJBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEseUJBQUEsQ0FBQSxDQUFBLFNBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEtBQUEsYUFBQSxDQUFBLGFBQUEsT0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLFNBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLGlDQUFBLENBQUEsQ0FBQSxhQUFBLEdBQUEsYUFBQSxFQUFBLENBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsZUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLE9BQUEsT0FBQSxDQUFBLE9BQUEsYUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLFdBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxXQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxpQ0FBQSxDQUFBLENBQUEsQ0FBQSw2REFBQSxDQUFBLENBQUEsSUFBQSxhQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLGdCQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLG1CQUFBLEVBQUEsV0FBQSxDQUFBLENBQUEsTUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsU0FBQSxLQUFBLFdBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxXQUFBLE1BQUEsQ0FBQSxhQUFBLElBQUEsUUFBQSxJQUFBLFdBQUEsSUFBQSxRQUFBLEtBQUEsR0FBQSxDQUFBLE9BQUEsSUFBQSxZQUFBLFFBQUEsY0FBQSxNQUFBLGdCQUFBLEdBQUEsR0FBQSxDQUFBLE9BQUEsVUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsa0JBQUEsQ0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsTUFBQSxLQUFBLEVBQUEsQ0FBQSxDQUFBLEtBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLElBQUEsV0FBQSxLQUFBLFNBQUEsSUFBQSxXQUFBLENBQUEsUUFBQSxVQUFBLHdCQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxDQUFBLEdBQUEsY0FBQSxJQUFBLEtBQUEsaUJBQUEsV0FBQSxrQkFBQSxDQUFBLGFBQUEsSUFBQSxRQUFBLENBQUEsTUFBQSxDQUFBLGtCQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLFFBQUEsSUFBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsZ0JBQUEsQ0FBQSxZQUFBLENBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsUUFBQSxLQUFBLHdEQUFBLENBQUEsT0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLGNBQUEsTUFBQSxnQkFBQSxHQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxjQUFBLE1BQUEsV0FBQSxPQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLFlBQUEsQ0FBQSxZQUFBLElBQUEsU0FBQSxJQUFBLEdBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQSxpQkFBQSxDQUFBLG1CQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxjQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxpQkFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsTUFBQSxnQkFBQSxJQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsU0FBQSxRQUFBLENBQUEsQ0FBQSxNQUFBLFFBQUEsV0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxDQUFBLEdBQUEscUJBQUEsQ0FBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsZ0JBQUEsQ0FBQSxDQUFBLElBQUEsU0FBQSxJQUFBLFFBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsTUFBQSxrQkFBQSxJQUFBLHlCQUFBLENBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLE1BQUEsV0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLGNBQUEsUUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLHlCQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxxQkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxZQUFBLEtBQUEsOEJBQUEsYUFBQSxXQUFBLGNBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLFFBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLE1BQUEsVUFBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsT0FBQSxDQUFBO0FBQUEsSUFBSSxTQUFTLEdBQUksVUFBUSxTQUFLLFNBQVMsSUFBSyxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtFQUNyRixTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUU7SUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFO01BQUUsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUFFLENBQUMsQ0FBQztFQUFFO0VBQzNHLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtJQUN2RCxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7TUFBRSxJQUFJO1FBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7TUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO01BQUU7SUFBRTtJQUMxRixTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7TUFBRSxJQUFJO1FBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7TUFBRTtJQUFFO0lBQzdGLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtNQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO0lBQUU7SUFDN0csSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3pFLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7RUFBRSxLQUFLLEVBQUU7QUFBSyxDQUFDLENBQUM7QUFDN0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbkIsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0FBQzVDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtFQUFBLE9BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFBLG1CQUFBLEdBQUEsSUFBQSxDQUFFLFNBQUEsUUFBQTtJQUFBLElBQUEsSUFBQTtJQUFBLE9BQUEsbUJBQUEsR0FBQSxJQUFBLFVBQUEsU0FBQSxRQUFBO01BQUEsa0JBQUEsUUFBQSxDQUFBLElBQUEsR0FBQSxRQUFBLENBQUEsSUFBQTtRQUFBO1VBQUEsUUFBQSxDQUFBLElBQUE7VUFDckUsT0FBTSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUE7VUFBM0MsSUFBSSxHQUFBLFFBQUEsQ0FBQSxJQUFBO1VBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUssRUFBSztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQztVQUMxQyxDQUFDLENBQUM7UUFBQztRQUFBO1VBQUEsT0FBQSxRQUFBLENBQUEsSUFBQTtNQUFBO0lBQUEsR0FBQSxPQUFBO0VBQUEsQ0FDTixFQUFDO0FBQUEsRUFBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnRlcnZhbCA9IGV4cG9ydHMuaWlmID0gZXhwb3J0cy5nZW5lcmF0ZSA9IGV4cG9ydHMuZnJvbUV2ZW50UGF0dGVybiA9IGV4cG9ydHMuZnJvbUV2ZW50ID0gZXhwb3J0cy5mcm9tID0gZXhwb3J0cy5mb3JrSm9pbiA9IGV4cG9ydHMuZW1wdHkgPSBleHBvcnRzLmRlZmVyID0gZXhwb3J0cy5jb25uZWN0YWJsZSA9IGV4cG9ydHMuY29uY2F0ID0gZXhwb3J0cy5jb21iaW5lTGF0ZXN0ID0gZXhwb3J0cy5iaW5kTm9kZUNhbGxiYWNrID0gZXhwb3J0cy5iaW5kQ2FsbGJhY2sgPSBleHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSBleHBvcnRzLlRpbWVvdXRFcnJvciA9IGV4cG9ydHMuU2VxdWVuY2VFcnJvciA9IGV4cG9ydHMuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSBleHBvcnRzLk5vdEZvdW5kRXJyb3IgPSBleHBvcnRzLkVtcHR5RXJyb3IgPSBleHBvcnRzLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yID0gZXhwb3J0cy5maXJzdFZhbHVlRnJvbSA9IGV4cG9ydHMubGFzdFZhbHVlRnJvbSA9IGV4cG9ydHMuaXNPYnNlcnZhYmxlID0gZXhwb3J0cy5pZGVudGl0eSA9IGV4cG9ydHMubm9vcCA9IGV4cG9ydHMucGlwZSA9IGV4cG9ydHMuTm90aWZpY2F0aW9uS2luZCA9IGV4cG9ydHMuTm90aWZpY2F0aW9uID0gZXhwb3J0cy5TdWJzY3JpYmVyID0gZXhwb3J0cy5TdWJzY3JpcHRpb24gPSBleHBvcnRzLlNjaGVkdWxlciA9IGV4cG9ydHMuVmlydHVhbEFjdGlvbiA9IGV4cG9ydHMuVmlydHVhbFRpbWVTY2hlZHVsZXIgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyID0gZXhwb3J0cy5hbmltYXRpb25GcmFtZSA9IGV4cG9ydHMucXVldWVTY2hlZHVsZXIgPSBleHBvcnRzLnF1ZXVlID0gZXhwb3J0cy5hc3luY1NjaGVkdWxlciA9IGV4cG9ydHMuYXN5bmMgPSBleHBvcnRzLmFzYXBTY2hlZHVsZXIgPSBleHBvcnRzLmFzYXAgPSBleHBvcnRzLkFzeW5jU3ViamVjdCA9IGV4cG9ydHMuUmVwbGF5U3ViamVjdCA9IGV4cG9ydHMuQmVoYXZpb3JTdWJqZWN0ID0gZXhwb3J0cy5TdWJqZWN0ID0gZXhwb3J0cy5hbmltYXRpb25GcmFtZXMgPSBleHBvcnRzLm9ic2VydmFibGUgPSBleHBvcnRzLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IGV4cG9ydHMuT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbmV4cG9ydHMuZmlsdGVyID0gZXhwb3J0cy5leHBhbmQgPSBleHBvcnRzLmV4aGF1c3RNYXAgPSBleHBvcnRzLmV4aGF1c3RBbGwgPSBleHBvcnRzLmV4aGF1c3QgPSBleHBvcnRzLmV2ZXJ5ID0gZXhwb3J0cy5lbmRXaXRoID0gZXhwb3J0cy5lbGVtZW50QXQgPSBleHBvcnRzLmRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkID0gZXhwb3J0cy5kaXN0aW5jdFVudGlsQ2hhbmdlZCA9IGV4cG9ydHMuZGlzdGluY3QgPSBleHBvcnRzLmRlbWF0ZXJpYWxpemUgPSBleHBvcnRzLmRlbGF5V2hlbiA9IGV4cG9ydHMuZGVsYXkgPSBleHBvcnRzLmRlZmF1bHRJZkVtcHR5ID0gZXhwb3J0cy5kZWJvdW5jZVRpbWUgPSBleHBvcnRzLmRlYm91bmNlID0gZXhwb3J0cy5jb3VudCA9IGV4cG9ydHMuY29ubmVjdCA9IGV4cG9ydHMuY29uY2F0V2l0aCA9IGV4cG9ydHMuY29uY2F0TWFwVG8gPSBleHBvcnRzLmNvbmNhdE1hcCA9IGV4cG9ydHMuY29uY2F0QWxsID0gZXhwb3J0cy5jb21iaW5lTGF0ZXN0V2l0aCA9IGV4cG9ydHMuY29tYmluZUxhdGVzdEFsbCA9IGV4cG9ydHMuY29tYmluZUFsbCA9IGV4cG9ydHMuY2F0Y2hFcnJvciA9IGV4cG9ydHMuYnVmZmVyV2hlbiA9IGV4cG9ydHMuYnVmZmVyVG9nZ2xlID0gZXhwb3J0cy5idWZmZXJUaW1lID0gZXhwb3J0cy5idWZmZXJDb3VudCA9IGV4cG9ydHMuYnVmZmVyID0gZXhwb3J0cy5hdWRpdFRpbWUgPSBleHBvcnRzLmF1ZGl0ID0gZXhwb3J0cy5jb25maWcgPSBleHBvcnRzLk5FVkVSID0gZXhwb3J0cy5FTVBUWSA9IGV4cG9ydHMuc2NoZWR1bGVkID0gZXhwb3J0cy56aXAgPSBleHBvcnRzLnVzaW5nID0gZXhwb3J0cy50aW1lciA9IGV4cG9ydHMudGhyb3dFcnJvciA9IGV4cG9ydHMucmFuZ2UgPSBleHBvcnRzLnJhY2UgPSBleHBvcnRzLnBhcnRpdGlvbiA9IGV4cG9ydHMucGFpcnMgPSBleHBvcnRzLm9uRXJyb3JSZXN1bWVOZXh0ID0gZXhwb3J0cy5vZiA9IGV4cG9ydHMubmV2ZXIgPSBleHBvcnRzLm1lcmdlID0gdm9pZCAwO1xuZXhwb3J0cy5zd2l0Y2hNYXAgPSBleHBvcnRzLnN3aXRjaEFsbCA9IGV4cG9ydHMuc3Vic2NyaWJlT24gPSBleHBvcnRzLnN0YXJ0V2l0aCA9IGV4cG9ydHMuc2tpcFdoaWxlID0gZXhwb3J0cy5za2lwVW50aWwgPSBleHBvcnRzLnNraXBMYXN0ID0gZXhwb3J0cy5za2lwID0gZXhwb3J0cy5zaW5nbGUgPSBleHBvcnRzLnNoYXJlUmVwbGF5ID0gZXhwb3J0cy5zaGFyZSA9IGV4cG9ydHMuc2VxdWVuY2VFcXVhbCA9IGV4cG9ydHMuc2NhbiA9IGV4cG9ydHMuc2FtcGxlVGltZSA9IGV4cG9ydHMuc2FtcGxlID0gZXhwb3J0cy5yZWZDb3VudCA9IGV4cG9ydHMucmV0cnlXaGVuID0gZXhwb3J0cy5yZXRyeSA9IGV4cG9ydHMucmVwZWF0V2hlbiA9IGV4cG9ydHMucmVwZWF0ID0gZXhwb3J0cy5yZWR1Y2UgPSBleHBvcnRzLnJhY2VXaXRoID0gZXhwb3J0cy5wdWJsaXNoUmVwbGF5ID0gZXhwb3J0cy5wdWJsaXNoTGFzdCA9IGV4cG9ydHMucHVibGlzaEJlaGF2aW9yID0gZXhwb3J0cy5wdWJsaXNoID0gZXhwb3J0cy5wbHVjayA9IGV4cG9ydHMucGFpcndpc2UgPSBleHBvcnRzLm9uRXJyb3JSZXN1bWVOZXh0V2l0aCA9IGV4cG9ydHMub2JzZXJ2ZU9uID0gZXhwb3J0cy5tdWx0aWNhc3QgPSBleHBvcnRzLm1pbiA9IGV4cG9ydHMubWVyZ2VXaXRoID0gZXhwb3J0cy5tZXJnZVNjYW4gPSBleHBvcnRzLm1lcmdlTWFwVG8gPSBleHBvcnRzLm1lcmdlTWFwID0gZXhwb3J0cy5mbGF0TWFwID0gZXhwb3J0cy5tZXJnZUFsbCA9IGV4cG9ydHMubWF4ID0gZXhwb3J0cy5tYXRlcmlhbGl6ZSA9IGV4cG9ydHMubWFwVG8gPSBleHBvcnRzLm1hcCA9IGV4cG9ydHMubGFzdCA9IGV4cG9ydHMuaXNFbXB0eSA9IGV4cG9ydHMuaWdub3JlRWxlbWVudHMgPSBleHBvcnRzLmdyb3VwQnkgPSBleHBvcnRzLmZpcnN0ID0gZXhwb3J0cy5maW5kSW5kZXggPSBleHBvcnRzLmZpbmQgPSBleHBvcnRzLmZpbmFsaXplID0gdm9pZCAwO1xuZXhwb3J0cy56aXBXaXRoID0gZXhwb3J0cy56aXBBbGwgPSBleHBvcnRzLndpdGhMYXRlc3RGcm9tID0gZXhwb3J0cy53aW5kb3dXaGVuID0gZXhwb3J0cy53aW5kb3dUb2dnbGUgPSBleHBvcnRzLndpbmRvd1RpbWUgPSBleHBvcnRzLndpbmRvd0NvdW50ID0gZXhwb3J0cy53aW5kb3cgPSBleHBvcnRzLnRvQXJyYXkgPSBleHBvcnRzLnRpbWVzdGFtcCA9IGV4cG9ydHMudGltZW91dFdpdGggPSBleHBvcnRzLnRpbWVvdXQgPSBleHBvcnRzLnRpbWVJbnRlcnZhbCA9IGV4cG9ydHMudGhyb3dJZkVtcHR5ID0gZXhwb3J0cy50aHJvdHRsZVRpbWUgPSBleHBvcnRzLnRocm90dGxlID0gZXhwb3J0cy50YXAgPSBleHBvcnRzLnRha2VXaGlsZSA9IGV4cG9ydHMudGFrZVVudGlsID0gZXhwb3J0cy50YWtlTGFzdCA9IGV4cG9ydHMudGFrZSA9IGV4cG9ydHMuc3dpdGNoU2NhbiA9IGV4cG9ydHMuc3dpdGNoTWFwVG8gPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvT2JzZXJ2YWJsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk9ic2VydmFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE9ic2VydmFibGVfMS5PYnNlcnZhYmxlOyB9IH0pO1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb25uZWN0YWJsZU9ic2VydmFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZTsgfSB9KTtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm9ic2VydmFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmFibGVfMS5vYnNlcnZhYmxlOyB9IH0pO1xudmFyIGFuaW1hdGlvbkZyYW1lc18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9kb20vYW5pbWF0aW9uRnJhbWVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYW5pbWF0aW9uRnJhbWVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhbmltYXRpb25GcmFtZXNfMS5hbmltYXRpb25GcmFtZXM7IH0gfSk7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvU3ViamVjdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlN1YmplY3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFN1YmplY3RfMS5TdWJqZWN0OyB9IH0pO1xudmFyIEJlaGF2aW9yU3ViamVjdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQmVoYXZpb3JTdWJqZWN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBCZWhhdmlvclN1YmplY3RfMS5CZWhhdmlvclN1YmplY3Q7IH0gfSk7XG52YXIgUmVwbGF5U3ViamVjdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvUmVwbGF5U3ViamVjdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlcGxheVN1YmplY3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJlcGxheVN1YmplY3RfMS5SZXBsYXlTdWJqZWN0OyB9IH0pO1xudmFyIEFzeW5jU3ViamVjdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvQXN5bmNTdWJqZWN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXN5bmNTdWJqZWN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBBc3luY1N1YmplY3RfMS5Bc3luY1N1YmplY3Q7IH0gfSk7XG52YXIgYXNhcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvc2NoZWR1bGVyL2FzYXBcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhc2FwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhc2FwXzEuYXNhcDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFzYXBTY2hlZHVsZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFzYXBfMS5hc2FwU2NoZWR1bGVyOyB9IH0pO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9zY2hlZHVsZXIvYXN5bmNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhc3luY1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXN5bmNfMS5hc3luYzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFzeW5jU2NoZWR1bGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhc3luY18xLmFzeW5jU2NoZWR1bGVyOyB9IH0pO1xudmFyIHF1ZXVlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9zY2hlZHVsZXIvcXVldWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJxdWV1ZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcXVldWVfMS5xdWV1ZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInF1ZXVlU2NoZWR1bGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBxdWV1ZV8xLnF1ZXVlU2NoZWR1bGVyOyB9IH0pO1xudmFyIGFuaW1hdGlvbkZyYW1lXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9zY2hlZHVsZXIvYW5pbWF0aW9uRnJhbWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhbmltYXRpb25GcmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYW5pbWF0aW9uRnJhbWVfMS5hbmltYXRpb25GcmFtZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhbmltYXRpb25GcmFtZV8xLmFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyOyB9IH0pO1xudmFyIFZpcnR1YWxUaW1lU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9zY2hlZHVsZXIvVmlydHVhbFRpbWVTY2hlZHVsZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWaXJ0dWFsVGltZVNjaGVkdWxlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gVmlydHVhbFRpbWVTY2hlZHVsZXJfMS5WaXJ0dWFsVGltZVNjaGVkdWxlcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZpcnR1YWxBY3Rpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFZpcnR1YWxUaW1lU2NoZWR1bGVyXzEuVmlydHVhbEFjdGlvbjsgfSB9KTtcbnZhciBTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL1NjaGVkdWxlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNjaGVkdWxlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gU2NoZWR1bGVyXzEuU2NoZWR1bGVyOyB9IH0pO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvU3Vic2NyaXB0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU3Vic2NyaXB0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb247IH0gfSk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvU3Vic2NyaWJlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlN1YnNjcmliZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyOyB9IH0pO1xudmFyIE5vdGlmaWNhdGlvbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvTm90aWZpY2F0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBOb3RpZmljYXRpb25fMS5Ob3RpZmljYXRpb247IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25LaW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBOb3RpZmljYXRpb25fMS5Ob3RpZmljYXRpb25LaW5kOyB9IH0pO1xudmFyIHBpcGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvcGlwZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBpcGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBpcGVfMS5waXBlOyB9IH0pO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvbm9vcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5vb3BcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5vb3BfMS5ub29wOyB9IH0pO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL2lkZW50aXR5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaWRlbnRpdHlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlkZW50aXR5XzEuaWRlbnRpdHk7IH0gfSk7XG52YXIgaXNPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL2lzT2JzZXJ2YWJsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlzT2JzZXJ2YWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNPYnNlcnZhYmxlXzEuaXNPYnNlcnZhYmxlOyB9IH0pO1xudmFyIGxhc3RWYWx1ZUZyb21fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL2xhc3RWYWx1ZUZyb21cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJsYXN0VmFsdWVGcm9tXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBsYXN0VmFsdWVGcm9tXzEubGFzdFZhbHVlRnJvbTsgfSB9KTtcbnZhciBmaXJzdFZhbHVlRnJvbV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvZmlyc3RWYWx1ZUZyb21cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmaXJzdFZhbHVlRnJvbVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmlyc3RWYWx1ZUZyb21fMS5maXJzdFZhbHVlRnJvbTsgfSB9KTtcbnZhciBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9Bcmd1bWVudE91dE9mUmFuZ2VFcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcl8xLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yOyB9IH0pO1xudmFyIEVtcHR5RXJyb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvRW1wdHlFcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkVtcHR5RXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEVtcHR5RXJyb3JfMS5FbXB0eUVycm9yOyB9IH0pO1xudmFyIE5vdEZvdW5kRXJyb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvTm90Rm91bmRFcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdEZvdW5kRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE5vdEZvdW5kRXJyb3JfMS5Ob3RGb3VuZEVycm9yOyB9IH0pO1xudmFyIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3I7IH0gfSk7XG52YXIgU2VxdWVuY2VFcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9TZXF1ZW5jZUVycm9yXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2VxdWVuY2VFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gU2VxdWVuY2VFcnJvcl8xLlNlcXVlbmNlRXJyb3I7IH0gfSk7XG52YXIgdGltZW91dF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVvdXRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUaW1lb3V0RXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRpbWVvdXRfMS5UaW1lb3V0RXJyb3I7IH0gfSk7XG52YXIgVW5zdWJzY3JpcHRpb25FcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVW5zdWJzY3JpcHRpb25FcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3I7IH0gfSk7XG52YXIgYmluZENhbGxiYWNrXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFja1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImJpbmRDYWxsYmFja1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYmluZENhbGxiYWNrXzEuYmluZENhbGxiYWNrOyB9IH0pO1xudmFyIGJpbmROb2RlQ2FsbGJhY2tfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvYmluZE5vZGVDYWxsYmFja1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImJpbmROb2RlQ2FsbGJhY2tcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJpbmROb2RlQ2FsbGJhY2tfMS5iaW5kTm9kZUNhbGxiYWNrOyB9IH0pO1xudmFyIGNvbWJpbmVMYXRlc3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvY29tYmluZUxhdGVzdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbWJpbmVMYXRlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbWJpbmVMYXRlc3RfMS5jb21iaW5lTGF0ZXN0OyB9IH0pO1xudmFyIGNvbmNhdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb25jYXRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25jYXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbmNhdF8xLmNvbmNhdDsgfSB9KTtcbnZhciBjb25uZWN0YWJsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb25uZWN0YWJsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbm5lY3RhYmxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0YWJsZV8xLmNvbm5lY3RhYmxlOyB9IH0pO1xudmFyIGRlZmVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2RlZmVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVmZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlZmVyXzEuZGVmZXI7IH0gfSk7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZW1wdHlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJlbXB0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1wdHlfMS5lbXB0eTsgfSB9KTtcbnZhciBmb3JrSm9pbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9mb3JrSm9pblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZvcmtKb2luXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmb3JrSm9pbl8xLmZvcmtKb2luOyB9IH0pO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZnJvbVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZyb21cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZyb21fMS5mcm9tOyB9IH0pO1xudmFyIGZyb21FdmVudF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmcm9tRXZlbnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZyb21FdmVudF8xLmZyb21FdmVudDsgfSB9KTtcbnZhciBmcm9tRXZlbnRQYXR0ZXJuXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudFBhdHRlcm5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmcm9tRXZlbnRQYXR0ZXJuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmcm9tRXZlbnRQYXR0ZXJuXzEuZnJvbUV2ZW50UGF0dGVybjsgfSB9KTtcbnZhciBnZW5lcmF0ZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9nZW5lcmF0ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdlbmVyYXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBnZW5lcmF0ZV8xLmdlbmVyYXRlOyB9IH0pO1xudmFyIGlpZl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9paWZcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpaWZcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlpZl8xLmlpZjsgfSB9KTtcbnZhciBpbnRlcnZhbF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9pbnRlcnZhbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImludGVydmFsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpbnRlcnZhbF8xLmludGVydmFsOyB9IH0pO1xudmFyIG1lcmdlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL21lcmdlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWVyZ2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lcmdlXzEubWVyZ2U7IH0gfSk7XG52YXIgbmV2ZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvbmV2ZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJuZXZlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV2ZXJfMS5uZXZlcjsgfSB9KTtcbnZhciBvZl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9vZlwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm9mXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBvZl8xLm9mOyB9IH0pO1xudmFyIG9uRXJyb3JSZXN1bWVOZXh0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL29uRXJyb3JSZXN1bWVOZXh0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwib25FcnJvclJlc3VtZU5leHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9uRXJyb3JSZXN1bWVOZXh0XzEub25FcnJvclJlc3VtZU5leHQ7IH0gfSk7XG52YXIgcGFpcnNfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvcGFpcnNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYWlyc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFpcnNfMS5wYWlyczsgfSB9KTtcbnZhciBwYXJ0aXRpb25fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvcGFydGl0aW9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicGFydGl0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwYXJ0aXRpb25fMS5wYXJ0aXRpb247IH0gfSk7XG52YXIgcmFjZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYWNlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmFjZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmFjZV8xLnJhY2U7IH0gfSk7XG52YXIgcmFuZ2VfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvcmFuZ2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyYW5nZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmFuZ2VfMS5yYW5nZTsgfSB9KTtcbnZhciB0aHJvd0Vycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3Rocm93RXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aHJvd0Vycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aHJvd0Vycm9yXzEudGhyb3dFcnJvcjsgfSB9KTtcbnZhciB0aW1lcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS90aW1lclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRpbWVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aW1lcl8xLnRpbWVyOyB9IH0pO1xudmFyIHVzaW5nXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3VzaW5nXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidXNpbmdcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVzaW5nXzEudXNpbmc7IH0gfSk7XG52YXIgemlwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3ppcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInppcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gemlwXzEuemlwOyB9IH0pO1xudmFyIHNjaGVkdWxlZF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlZFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNjaGVkdWxlZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZWR1bGVkXzEuc2NoZWR1bGVkOyB9IH0pO1xudmFyIGVtcHR5XzIgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2VtcHR5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRU1QVFlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtcHR5XzIuRU1QVFk7IH0gfSk7XG52YXIgbmV2ZXJfMiA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvbmV2ZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJORVZFUlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV2ZXJfMi5ORVZFUjsgfSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9pbnRlcm5hbC90eXBlc1wiKSwgZXhwb3J0cyk7XG52YXIgY29uZmlnXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9jb25maWdcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25maWdcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbmZpZ18xLmNvbmZpZzsgfSB9KTtcbnZhciBhdWRpdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2F1ZGl0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXVkaXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGF1ZGl0XzEuYXVkaXQ7IH0gfSk7XG52YXIgYXVkaXRUaW1lXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvYXVkaXRUaW1lXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXVkaXRUaW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhdWRpdFRpbWVfMS5hdWRpdFRpbWU7IH0gfSk7XG52YXIgYnVmZmVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYnVmZmVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBidWZmZXJfMS5idWZmZXI7IH0gfSk7XG52YXIgYnVmZmVyQ291bnRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXJDb3VudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImJ1ZmZlckNvdW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBidWZmZXJDb3VudF8xLmJ1ZmZlckNvdW50OyB9IH0pO1xudmFyIGJ1ZmZlclRpbWVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXJUaW1lXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYnVmZmVyVGltZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyVGltZV8xLmJ1ZmZlclRpbWU7IH0gfSk7XG52YXIgYnVmZmVyVG9nZ2xlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyVG9nZ2xlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYnVmZmVyVG9nZ2xlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBidWZmZXJUb2dnbGVfMS5idWZmZXJUb2dnbGU7IH0gfSk7XG52YXIgYnVmZmVyV2hlbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2J1ZmZlcldoZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJidWZmZXJXaGVuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBidWZmZXJXaGVuXzEuYnVmZmVyV2hlbjsgfSB9KTtcbnZhciBjYXRjaEVycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvY2F0Y2hFcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNhdGNoRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhdGNoRXJyb3JfMS5jYXRjaEVycm9yOyB9IH0pO1xudmFyIGNvbWJpbmVBbGxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9jb21iaW5lQWxsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29tYmluZUFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29tYmluZUFsbF8xLmNvbWJpbmVBbGw7IH0gfSk7XG52YXIgY29tYmluZUxhdGVzdEFsbF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2NvbWJpbmVMYXRlc3RBbGxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb21iaW5lTGF0ZXN0QWxsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb21iaW5lTGF0ZXN0QWxsXzEuY29tYmluZUxhdGVzdEFsbDsgfSB9KTtcbnZhciBjb21iaW5lTGF0ZXN0V2l0aF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2NvbWJpbmVMYXRlc3RXaXRoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29tYmluZUxhdGVzdFdpdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbWJpbmVMYXRlc3RXaXRoXzEuY29tYmluZUxhdGVzdFdpdGg7IH0gfSk7XG52YXIgY29uY2F0QWxsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0QWxsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uY2F0QWxsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25jYXRBbGxfMS5jb25jYXRBbGw7IH0gfSk7XG52YXIgY29uY2F0TWFwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0TWFwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uY2F0TWFwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25jYXRNYXBfMS5jb25jYXRNYXA7IH0gfSk7XG52YXIgY29uY2F0TWFwVG9fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9jb25jYXRNYXBUb1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbmNhdE1hcFRvXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25jYXRNYXBUb18xLmNvbmNhdE1hcFRvOyB9IH0pO1xudmFyIGNvbmNhdFdpdGhfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9jb25jYXRXaXRoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uY2F0V2l0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uY2F0V2l0aF8xLmNvbmNhdFdpdGg7IH0gfSk7XG52YXIgY29ubmVjdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2Nvbm5lY3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25uZWN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25uZWN0XzEuY29ubmVjdDsgfSB9KTtcbnZhciBjb3VudF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2NvdW50XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY291bnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvdW50XzEuY291bnQ7IH0gfSk7XG52YXIgZGVib3VuY2VfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9kZWJvdW5jZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlYm91bmNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWJvdW5jZV8xLmRlYm91bmNlOyB9IH0pO1xudmFyIGRlYm91bmNlVGltZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2RlYm91bmNlVGltZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlYm91bmNlVGltZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVib3VuY2VUaW1lXzEuZGVib3VuY2VUaW1lOyB9IH0pO1xudmFyIGRlZmF1bHRJZkVtcHR5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZGVmYXVsdElmRW1wdHlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkZWZhdWx0SWZFbXB0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVmYXVsdElmRW1wdHlfMS5kZWZhdWx0SWZFbXB0eTsgfSB9KTtcbnZhciBkZWxheV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2RlbGF5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVsYXlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlbGF5XzEuZGVsYXk7IH0gfSk7XG52YXIgZGVsYXlXaGVuXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZGVsYXlXaGVuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVsYXlXaGVuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWxheVdoZW5fMS5kZWxheVdoZW47IH0gfSk7XG52YXIgZGVtYXRlcmlhbGl6ZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2RlbWF0ZXJpYWxpemVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkZW1hdGVyaWFsaXplXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZW1hdGVyaWFsaXplXzEuZGVtYXRlcmlhbGl6ZTsgfSB9KTtcbnZhciBkaXN0aW5jdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2Rpc3RpbmN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGlzdGluY3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpc3RpbmN0XzEuZGlzdGluY3Q7IH0gfSk7XG52YXIgZGlzdGluY3RVbnRpbENoYW5nZWRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9kaXN0aW5jdFVudGlsQ2hhbmdlZFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRpc3RpbmN0VW50aWxDaGFuZ2VkXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkaXN0aW5jdFVudGlsQ2hhbmdlZF8xLmRpc3RpbmN0VW50aWxDaGFuZ2VkOyB9IH0pO1xudmFyIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3RVbnRpbEtleUNoYW5nZWRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzdGluY3RVbnRpbEtleUNoYW5nZWRfMS5kaXN0aW5jdFVudGlsS2V5Q2hhbmdlZDsgfSB9KTtcbnZhciBlbGVtZW50QXRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9lbGVtZW50QXRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJlbGVtZW50QXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVsZW1lbnRBdF8xLmVsZW1lbnRBdDsgfSB9KTtcbnZhciBlbmRXaXRoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZW5kV2l0aFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImVuZFdpdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuZFdpdGhfMS5lbmRXaXRoOyB9IH0pO1xudmFyIGV2ZXJ5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZXZlcnlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJldmVyeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXZlcnlfMS5ldmVyeTsgfSB9KTtcbnZhciBleGhhdXN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZXhoYXVzdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImV4aGF1c3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV4aGF1c3RfMS5leGhhdXN0OyB9IH0pO1xudmFyIGV4aGF1c3RBbGxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9leGhhdXN0QWxsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZXhoYXVzdEFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhoYXVzdEFsbF8xLmV4aGF1c3RBbGw7IH0gfSk7XG52YXIgZXhoYXVzdE1hcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2V4aGF1c3RNYXBcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJleGhhdXN0TWFwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBleGhhdXN0TWFwXzEuZXhoYXVzdE1hcDsgfSB9KTtcbnZhciBleHBhbmRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9leHBhbmRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJleHBhbmRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV4cGFuZF8xLmV4cGFuZDsgfSB9KTtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9maWx0ZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmaWx0ZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZpbHRlcl8xLmZpbHRlcjsgfSB9KTtcbnZhciBmaW5hbGl6ZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbmFsaXplXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmluYWxpemVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZpbmFsaXplXzEuZmluYWxpemU7IH0gfSk7XG52YXIgZmluZF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbmRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmaW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmaW5kXzEuZmluZDsgfSB9KTtcbnZhciBmaW5kSW5kZXhfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9maW5kSW5kZXhcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmaW5kSW5kZXhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZpbmRJbmRleF8xLmZpbmRJbmRleDsgfSB9KTtcbnZhciBmaXJzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2ZpcnN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmlyc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZpcnN0XzEuZmlyc3Q7IH0gfSk7XG52YXIgZ3JvdXBCeV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2dyb3VwQnlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJncm91cEJ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBncm91cEJ5XzEuZ3JvdXBCeTsgfSB9KTtcbnZhciBpZ25vcmVFbGVtZW50c18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2lnbm9yZUVsZW1lbnRzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaWdub3JlRWxlbWVudHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlnbm9yZUVsZW1lbnRzXzEuaWdub3JlRWxlbWVudHM7IH0gfSk7XG52YXIgaXNFbXB0eV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2lzRW1wdHlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc0VtcHR5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0VtcHR5XzEuaXNFbXB0eTsgfSB9KTtcbnZhciBsYXN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbGFzdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImxhc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxhc3RfMS5sYXN0OyB9IH0pO1xudmFyIG1hcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL21hcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1hcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWFwXzEubWFwOyB9IH0pO1xudmFyIG1hcFRvXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWFwVG9cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYXBUb1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWFwVG9fMS5tYXBUbzsgfSB9KTtcbnZhciBtYXRlcmlhbGl6ZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL21hdGVyaWFsaXplXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWF0ZXJpYWxpemVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdGVyaWFsaXplXzEubWF0ZXJpYWxpemU7IH0gfSk7XG52YXIgbWF4XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWF4XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWF4XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXhfMS5tYXg7IH0gfSk7XG52YXIgbWVyZ2VBbGxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUFsbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1lcmdlQWxsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXJnZUFsbF8xLm1lcmdlQWxsOyB9IH0pO1xudmFyIGZsYXRNYXBfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9mbGF0TWFwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmxhdE1hcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmxhdE1hcF8xLmZsYXRNYXA7IH0gfSk7XG52YXIgbWVyZ2VNYXBfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1lcmdlTWFwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXJnZU1hcF8xLm1lcmdlTWFwOyB9IH0pO1xudmFyIG1lcmdlTWFwVG9fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcFRvXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWVyZ2VNYXBUb1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVyZ2VNYXBUb18xLm1lcmdlTWFwVG87IH0gfSk7XG52YXIgbWVyZ2VTY2FuXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VTY2FuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWVyZ2VTY2FuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXJnZVNjYW5fMS5tZXJnZVNjYW47IH0gfSk7XG52YXIgbWVyZ2VXaXRoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VXaXRoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWVyZ2VXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXJnZVdpdGhfMS5tZXJnZVdpdGg7IH0gfSk7XG52YXIgbWluXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWluXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWluXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtaW5fMS5taW47IH0gfSk7XG52YXIgbXVsdGljYXN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbXVsdGljYXN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibXVsdGljYXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtdWx0aWNhc3RfMS5tdWx0aWNhc3Q7IH0gfSk7XG52YXIgb2JzZXJ2ZU9uXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvb2JzZXJ2ZU9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwib2JzZXJ2ZU9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZlT25fMS5vYnNlcnZlT247IH0gfSk7XG52YXIgb25FcnJvclJlc3VtZU5leHRXaXRoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvb25FcnJvclJlc3VtZU5leHRXaXRoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwib25FcnJvclJlc3VtZU5leHRXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBvbkVycm9yUmVzdW1lTmV4dFdpdGhfMS5vbkVycm9yUmVzdW1lTmV4dFdpdGg7IH0gfSk7XG52YXIgcGFpcndpc2VfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9wYWlyd2lzZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBhaXJ3aXNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwYWlyd2lzZV8xLnBhaXJ3aXNlOyB9IH0pO1xudmFyIHBsdWNrXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcGx1Y2tcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwbHVja1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGx1Y2tfMS5wbHVjazsgfSB9KTtcbnZhciBwdWJsaXNoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcHVibGlzaFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInB1Ymxpc2hcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHB1Ymxpc2hfMS5wdWJsaXNoOyB9IH0pO1xudmFyIHB1Ymxpc2hCZWhhdmlvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hCZWhhdmlvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInB1Ymxpc2hCZWhhdmlvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHVibGlzaEJlaGF2aW9yXzEucHVibGlzaEJlaGF2aW9yOyB9IH0pO1xudmFyIHB1Ymxpc2hMYXN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcHVibGlzaExhc3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwdWJsaXNoTGFzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcHVibGlzaExhc3RfMS5wdWJsaXNoTGFzdDsgfSB9KTtcbnZhciBwdWJsaXNoUmVwbGF5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcHVibGlzaFJlcGxheVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInB1Ymxpc2hSZXBsYXlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHB1Ymxpc2hSZXBsYXlfMS5wdWJsaXNoUmVwbGF5OyB9IH0pO1xudmFyIHJhY2VXaXRoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcmFjZVdpdGhcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyYWNlV2l0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmFjZVdpdGhfMS5yYWNlV2l0aDsgfSB9KTtcbnZhciByZWR1Y2VfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9yZWR1Y2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZWR1Y2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZHVjZV8xLnJlZHVjZTsgfSB9KTtcbnZhciByZXBlYXRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9yZXBlYXRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZXBlYXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlcGVhdF8xLnJlcGVhdDsgfSB9KTtcbnZhciByZXBlYXRXaGVuXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcmVwZWF0V2hlblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJlcGVhdFdoZW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlcGVhdFdoZW5fMS5yZXBlYXRXaGVuOyB9IH0pO1xudmFyIHJldHJ5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcmV0cnlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZXRyeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmV0cnlfMS5yZXRyeTsgfSB9KTtcbnZhciByZXRyeVdoZW5fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9yZXRyeVdoZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZXRyeVdoZW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJldHJ5V2hlbl8xLnJldHJ5V2hlbjsgfSB9KTtcbnZhciByZWZDb3VudF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3JlZkNvdW50XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVmQ291bnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZkNvdW50XzEucmVmQ291bnQ7IH0gfSk7XG52YXIgc2FtcGxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2FtcGxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2FtcGxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzYW1wbGVfMS5zYW1wbGU7IH0gfSk7XG52YXIgc2FtcGxlVGltZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3NhbXBsZVRpbWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzYW1wbGVUaW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzYW1wbGVUaW1lXzEuc2FtcGxlVGltZTsgfSB9KTtcbnZhciBzY2FuXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2NhblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNjYW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjYW5fMS5zY2FuOyB9IH0pO1xudmFyIHNlcXVlbmNlRXF1YWxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zZXF1ZW5jZUVxdWFsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2VxdWVuY2VFcXVhbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VxdWVuY2VFcXVhbF8xLnNlcXVlbmNlRXF1YWw7IH0gfSk7XG52YXIgc2hhcmVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zaGFyZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNoYXJlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzaGFyZV8xLnNoYXJlOyB9IH0pO1xudmFyIHNoYXJlUmVwbGF5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2hhcmVSZXBsYXlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaGFyZVJlcGxheVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2hhcmVSZXBsYXlfMS5zaGFyZVJlcGxheTsgfSB9KTtcbnZhciBzaW5nbGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zaW5nbGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaW5nbGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNpbmdsZV8xLnNpbmdsZTsgfSB9KTtcbnZhciBza2lwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNraXBcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNraXBfMS5za2lwOyB9IH0pO1xudmFyIHNraXBMYXN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcExhc3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJza2lwTGFzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2tpcExhc3RfMS5za2lwTGFzdDsgfSB9KTtcbnZhciBza2lwVW50aWxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9za2lwVW50aWxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJza2lwVW50aWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNraXBVbnRpbF8xLnNraXBVbnRpbDsgfSB9KTtcbnZhciBza2lwV2hpbGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9za2lwV2hpbGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJza2lwV2hpbGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNraXBXaGlsZV8xLnNraXBXaGlsZTsgfSB9KTtcbnZhciBzdGFydFdpdGhfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zdGFydFdpdGhcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdGFydFdpdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0YXJ0V2l0aF8xLnN0YXJ0V2l0aDsgfSB9KTtcbnZhciBzdWJzY3JpYmVPbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3N1YnNjcmliZU9uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3Vic2NyaWJlT25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZU9uXzEuc3Vic2NyaWJlT247IH0gfSk7XG52YXIgc3dpdGNoQWxsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoQWxsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3dpdGNoQWxsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzd2l0Y2hBbGxfMS5zd2l0Y2hBbGw7IH0gfSk7XG52YXIgc3dpdGNoTWFwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoTWFwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3dpdGNoTWFwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzd2l0Y2hNYXBfMS5zd2l0Y2hNYXA7IH0gfSk7XG52YXIgc3dpdGNoTWFwVG9fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zd2l0Y2hNYXBUb1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN3aXRjaE1hcFRvXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzd2l0Y2hNYXBUb18xLnN3aXRjaE1hcFRvOyB9IH0pO1xudmFyIHN3aXRjaFNjYW5fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zd2l0Y2hTY2FuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3dpdGNoU2NhblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3dpdGNoU2Nhbl8xLnN3aXRjaFNjYW47IH0gfSk7XG52YXIgdGFrZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3Rha2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0YWtlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWtlXzEudGFrZTsgfSB9KTtcbnZhciB0YWtlTGFzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3Rha2VMYXN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGFrZUxhc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRha2VMYXN0XzEudGFrZUxhc3Q7IH0gfSk7XG52YXIgdGFrZVVudGlsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZVVudGlsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGFrZVVudGlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWtlVW50aWxfMS50YWtlVW50aWw7IH0gfSk7XG52YXIgdGFrZVdoaWxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZVdoaWxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGFrZVdoaWxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWtlV2hpbGVfMS50YWtlV2hpbGU7IH0gfSk7XG52YXIgdGFwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdGFwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGFwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0YXBfMS50YXA7IH0gfSk7XG52YXIgdGhyb3R0bGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aHJvdHRsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRocm90dGxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aHJvdHRsZV8xLnRocm90dGxlOyB9IH0pO1xudmFyIHRocm90dGxlVGltZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3Rocm90dGxlVGltZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRocm90dGxlVGltZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhyb3R0bGVUaW1lXzEudGhyb3R0bGVUaW1lOyB9IH0pO1xudmFyIHRocm93SWZFbXB0eV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3Rocm93SWZFbXB0eVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRocm93SWZFbXB0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhyb3dJZkVtcHR5XzEudGhyb3dJZkVtcHR5OyB9IH0pO1xudmFyIHRpbWVJbnRlcnZhbF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVJbnRlcnZhbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRpbWVJbnRlcnZhbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGltZUludGVydmFsXzEudGltZUludGVydmFsOyB9IH0pO1xudmFyIHRpbWVvdXRfMiA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aW1lb3V0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGltZW91dFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGltZW91dF8yLnRpbWVvdXQ7IH0gfSk7XG52YXIgdGltZW91dFdpdGhfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aW1lb3V0V2l0aFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRpbWVvdXRXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aW1lb3V0V2l0aF8xLnRpbWVvdXRXaXRoOyB9IH0pO1xudmFyIHRpbWVzdGFtcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVzdGFtcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRpbWVzdGFtcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGltZXN0YW1wXzEudGltZXN0YW1wOyB9IH0pO1xudmFyIHRvQXJyYXlfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90b0FycmF5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidG9BcnJheVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdG9BcnJheV8xLnRvQXJyYXk7IH0gfSk7XG52YXIgd2luZG93XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvd2luZG93XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2luZG93XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3dfMS53aW5kb3c7IH0gfSk7XG52YXIgd2luZG93Q291bnRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dDb3VudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpbmRvd0NvdW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3dDb3VudF8xLndpbmRvd0NvdW50OyB9IH0pO1xudmFyIHdpbmRvd1RpbWVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dUaW1lXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2luZG93VGltZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93VGltZV8xLndpbmRvd1RpbWU7IH0gfSk7XG52YXIgd2luZG93VG9nZ2xlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvd2luZG93VG9nZ2xlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2luZG93VG9nZ2xlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3dUb2dnbGVfMS53aW5kb3dUb2dnbGU7IH0gfSk7XG52YXIgd2luZG93V2hlbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3dpbmRvd1doZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aW5kb3dXaGVuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3dXaGVuXzEud2luZG93V2hlbjsgfSB9KTtcbnZhciB3aXRoTGF0ZXN0RnJvbV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3dpdGhMYXRlc3RGcm9tXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2l0aExhdGVzdEZyb21cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpdGhMYXRlc3RGcm9tXzEud2l0aExhdGVzdEZyb207IH0gfSk7XG52YXIgemlwQWxsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvemlwQWxsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiemlwQWxsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB6aXBBbGxfMS56aXBBbGw7IH0gfSk7XG52YXIgemlwV2l0aF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3ppcFdpdGhcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ6aXBXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB6aXBXaXRoXzEuemlwV2l0aDsgfSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXN5bmNTdWJqZWN0ID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL1N1YmplY3RcIik7XG52YXIgQXN5bmNTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jU3ViamVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgICAgIF90aGlzLl9oYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5faXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzeW5jU3ViamVjdC5wcm90b3R5cGUuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCBfaGFzVmFsdWUgPSBfYS5faGFzVmFsdWUsIF92YWx1ZSA9IF9hLl92YWx1ZSwgdGhyb3duRXJyb3IgPSBfYS50aHJvd25FcnJvciwgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkLCBfaXNDb21wbGV0ZSA9IF9hLl9pc0NvbXBsZXRlO1xuICAgICAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhyb3duRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU3RvcHBlZCB8fCBfaXNDb21wbGV0ZSkge1xuICAgICAgICAgICAgX2hhc1ZhbHVlICYmIHN1YnNjcmliZXIubmV4dChfdmFsdWUpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY1N1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2hhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXN5bmNTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX2hhc1ZhbHVlID0gX2EuX2hhc1ZhbHVlLCBfdmFsdWUgPSBfYS5fdmFsdWUsIF9pc0NvbXBsZXRlID0gX2EuX2lzQ29tcGxldGU7XG4gICAgICAgIGlmICghX2lzQ29tcGxldGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgX2hhc1ZhbHVlICYmIF9zdXBlci5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMsIF92YWx1ZSk7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbXBsZXRlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc3luY1N1YmplY3Q7XG59KFN1YmplY3RfMS5TdWJqZWN0KSk7XG5leHBvcnRzLkFzeW5jU3ViamVjdCA9IEFzeW5jU3ViamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jU3ViamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJlaGF2aW9yU3ViamVjdCA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9TdWJqZWN0XCIpO1xudmFyIEJlaGF2aW9yU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJlaGF2aW9yU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCZWhhdmlvclN1YmplY3QoX3ZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl92YWx1ZSA9IF92YWx1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBfc3VwZXIucHJvdG90eXBlLl9zdWJzY3JpYmUuY2FsbCh0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICAgICAgIXN1YnNjcmlwdGlvbi5jbG9zZWQgJiYgc3Vic2NyaWJlci5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuICAgIEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGhhc0Vycm9yID0gX2EuaGFzRXJyb3IsIHRocm93bkVycm9yID0gX2EudGhyb3duRXJyb3IsIF92YWx1ZSA9IF9hLl92YWx1ZTtcbiAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyB0aHJvd25FcnJvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgfTtcbiAgICBCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcywgKHRoaXMuX3ZhbHVlID0gdmFsdWUpKTtcbiAgICB9O1xuICAgIHJldHVybiBCZWhhdmlvclN1YmplY3Q7XG59KFN1YmplY3RfMS5TdWJqZWN0KSk7XG5leHBvcnRzLkJlaGF2aW9yU3ViamVjdCA9IEJlaGF2aW9yU3ViamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJlaGF2aW9yU3ViamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub2JzZXJ2ZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTm90aWZpY2F0aW9uID0gZXhwb3J0cy5Ob3RpZmljYXRpb25LaW5kID0gdm9pZCAwO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi9vYnNlcnZhYmxlL2VtcHR5XCIpO1xudmFyIG9mXzEgPSByZXF1aXJlKFwiLi9vYnNlcnZhYmxlL29mXCIpO1xudmFyIHRocm93RXJyb3JfMSA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUvdGhyb3dFcnJvclwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgTm90aWZpY2F0aW9uS2luZDtcbihmdW5jdGlvbiAoTm90aWZpY2F0aW9uS2luZCkge1xuICAgIE5vdGlmaWNhdGlvbktpbmRbXCJORVhUXCJdID0gXCJOXCI7XG4gICAgTm90aWZpY2F0aW9uS2luZFtcIkVSUk9SXCJdID0gXCJFXCI7XG4gICAgTm90aWZpY2F0aW9uS2luZFtcIkNPTVBMRVRFXCJdID0gXCJDXCI7XG59KShOb3RpZmljYXRpb25LaW5kID0gZXhwb3J0cy5Ob3RpZmljYXRpb25LaW5kIHx8IChleHBvcnRzLk5vdGlmaWNhdGlvbktpbmQgPSB7fSkpO1xudmFyIE5vdGlmaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm90aWZpY2F0aW9uKGtpbmQsIHZhbHVlLCBlcnJvcikge1xuICAgICAgICB0aGlzLmtpbmQgPSBraW5kO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5oYXNWYWx1ZSA9IGtpbmQgPT09ICdOJztcbiAgICB9XG4gICAgTm90aWZpY2F0aW9uLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHJldHVybiBvYnNlcnZlTm90aWZpY2F0aW9uKHRoaXMsIG9ic2VydmVyKTtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZG8gPSBmdW5jdGlvbiAobmV4dEhhbmRsZXIsIGVycm9ySGFuZGxlciwgY29tcGxldGVIYW5kbGVyKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGtpbmQgPSBfYS5raW5kLCB2YWx1ZSA9IF9hLnZhbHVlLCBlcnJvciA9IF9hLmVycm9yO1xuICAgICAgICByZXR1cm4ga2luZCA9PT0gJ04nID8gbmV4dEhhbmRsZXIgPT09IG51bGwgfHwgbmV4dEhhbmRsZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRIYW5kbGVyKHZhbHVlKSA6IGtpbmQgPT09ICdFJyA/IGVycm9ySGFuZGxlciA9PT0gbnVsbCB8fCBlcnJvckhhbmRsZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9ySGFuZGxlcihlcnJvcikgOiBjb21wbGV0ZUhhbmRsZXIgPT09IG51bGwgfHwgY29tcGxldGVIYW5kbGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb21wbGV0ZUhhbmRsZXIoKTtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oKF9hID0gbmV4dE9yT2JzZXJ2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXh0KVxuICAgICAgICAgICAgPyB0aGlzLm9ic2VydmUobmV4dE9yT2JzZXJ2ZXIpXG4gICAgICAgICAgICA6IHRoaXMuZG8obmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24ucHJvdG90eXBlLnRvT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywga2luZCA9IF9hLmtpbmQsIHZhbHVlID0gX2EudmFsdWUsIGVycm9yID0gX2EuZXJyb3I7XG4gICAgICAgIHZhciByZXN1bHQgPSBraW5kID09PSAnTidcbiAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICBvZl8xLm9mKHZhbHVlKVxuICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgIGtpbmQgPT09ICdFJ1xuICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvd0Vycm9yXzEudGhyb3dFcnJvcihmdW5jdGlvbiAoKSB7IHJldHVybiBlcnJvcjsgfSlcbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9PT0gJ0MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eV8xLkVNUFRZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwO1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgbm90aWZpY2F0aW9uIGtpbmQgXCIgKyBraW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLmNyZWF0ZU5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOb3RpZmljYXRpb24oJ04nLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24uY3JlYXRlRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKCdFJywgdW5kZWZpbmVkLCBlcnIpO1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLmNyZWF0ZUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTm90aWZpY2F0aW9uLmNvbXBsZXRlTm90aWZpY2F0aW9uO1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLmNvbXBsZXRlTm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbignQycpO1xuICAgIHJldHVybiBOb3RpZmljYXRpb247XG59KCkpO1xuZXhwb3J0cy5Ob3RpZmljYXRpb24gPSBOb3RpZmljYXRpb247XG5mdW5jdGlvbiBvYnNlcnZlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgb2JzZXJ2ZXIpIHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICB2YXIgX2QgPSBub3RpZmljYXRpb24sIGtpbmQgPSBfZC5raW5kLCB2YWx1ZSA9IF9kLnZhbHVlLCBlcnJvciA9IF9kLmVycm9yO1xuICAgIGlmICh0eXBlb2Yga2luZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBub3RpZmljYXRpb24sIG1pc3NpbmcgXCJraW5kXCInKTtcbiAgICB9XG4gICAga2luZCA9PT0gJ04nID8gKF9hID0gb2JzZXJ2ZXIubmV4dCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwob2JzZXJ2ZXIsIHZhbHVlKSA6IGtpbmQgPT09ICdFJyA/IChfYiA9IG9ic2VydmVyLmVycm9yKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChvYnNlcnZlciwgZXJyb3IpIDogKF9jID0gb2JzZXJ2ZXIuY29tcGxldGUpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5jYWxsKG9ic2VydmVyKTtcbn1cbmV4cG9ydHMub2JzZXJ2ZU5vdGlmaWNhdGlvbiA9IG9ic2VydmVOb3RpZmljYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ob3RpZmljYXRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZU5vdGlmaWNhdGlvbiA9IGV4cG9ydHMubmV4dE5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuZXJyb3JOb3RpZmljYXRpb24gPSBleHBvcnRzLkNPTVBMRVRFX05PVElGSUNBVElPTiA9IHZvaWQgMDtcbmV4cG9ydHMuQ09NUExFVEVfTk9USUZJQ0FUSU9OID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignQycsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTsgfSkoKTtcbmZ1bmN0aW9uIGVycm9yTm90aWZpY2F0aW9uKGVycm9yKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignRScsIHVuZGVmaW5lZCwgZXJyb3IpO1xufVxuZXhwb3J0cy5lcnJvck5vdGlmaWNhdGlvbiA9IGVycm9yTm90aWZpY2F0aW9uO1xuZnVuY3Rpb24gbmV4dE5vdGlmaWNhdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ04nLCB2YWx1ZSwgdW5kZWZpbmVkKTtcbn1cbmV4cG9ydHMubmV4dE5vdGlmaWNhdGlvbiA9IG5leHROb3RpZmljYXRpb247XG5mdW5jdGlvbiBjcmVhdGVOb3RpZmljYXRpb24oa2luZCwgdmFsdWUsIGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgfTtcbn1cbmV4cG9ydHMuY3JlYXRlTm90aWZpY2F0aW9uID0gY3JlYXRlTm90aWZpY2F0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PYnNlcnZhYmxlID0gdm9pZCAwO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL1N1YnNjcmliZXJcIik7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi9TdWJzY3JpcHRpb25cIik7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vc3ltYm9sL29ic2VydmFibGVcIik7XG52YXIgcGlwZV8xID0gcmVxdWlyZShcIi4vdXRpbC9waXBlXCIpO1xudmFyIGNvbmZpZ18xID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBlcnJvckNvbnRleHRfMSA9IHJlcXVpcmUoXCIuL3V0aWwvZXJyb3JDb250ZXh0XCIpO1xudmFyIE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBpc1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQpID8gb2JzZXJ2ZXJPck5leHQgOiBuZXcgU3Vic2NyaWJlcl8xLlNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBlcnJvckNvbnRleHRfMS5lcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMsIG9wZXJhdG9yID0gX2Eub3BlcmF0b3IsIHNvdXJjZSA9IF9hLnNvdXJjZTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvci5jYWxsKHN1YnNjcmliZXIsIHNvdXJjZSlcbiAgICAgICAgICAgICAgICA6IHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cnlTdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXJfMS5TYWZlU3Vic2NyaWJlcih7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IHJlamVjdCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLnNvdXJjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaXBlXzEucGlwZUZyb21BcnJheShvcGVyYXRpb25zKSh0aGlzKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBwcm9taXNlQ3RvciA9IGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKTtcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICBfdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24gKHgpIHsgcmV0dXJuICh2YWx1ZSA9IHgpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiByZWplY3QoZXJyKTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZSh2YWx1ZSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5mdW5jdGlvbiBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcikge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKF9hID0gcHJvbWlzZUN0b3IgIT09IG51bGwgJiYgcHJvbWlzZUN0b3IgIT09IHZvaWQgMCA/IHByb21pc2VDdG9yIDogY29uZmlnXzEuY29uZmlnLlByb21pc2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFByb21pc2U7XG59XG5mdW5jdGlvbiBpc09ic2VydmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlLm5leHQpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlLmVycm9yKSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih2YWx1ZS5jb21wbGV0ZSk7XG59XG5mdW5jdGlvbiBpc1N1YnNjcmliZXIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpIHx8IChpc09ic2VydmVyKHZhbHVlKSAmJiBTdWJzY3JpcHRpb25fMS5pc1N1YnNjcmlwdGlvbih2YWx1ZSkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlcGxheVN1YmplY3QgPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4vU3ViamVjdFwiKTtcbnZhciBkYXRlVGltZXN0YW1wUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlci9kYXRlVGltZXN0YW1wUHJvdmlkZXJcIik7XG52YXIgUmVwbGF5U3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJlcGxheVN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmVwbGF5U3ViamVjdChfYnVmZmVyU2l6ZSwgX3dpbmRvd1RpbWUsIF90aW1lc3RhbXBQcm92aWRlcikge1xuICAgICAgICBpZiAoX2J1ZmZlclNpemUgPT09IHZvaWQgMCkgeyBfYnVmZmVyU2l6ZSA9IEluZmluaXR5OyB9XG4gICAgICAgIGlmIChfd2luZG93VGltZSA9PT0gdm9pZCAwKSB7IF93aW5kb3dUaW1lID0gSW5maW5pdHk7IH1cbiAgICAgICAgaWYgKF90aW1lc3RhbXBQcm92aWRlciA9PT0gdm9pZCAwKSB7IF90aW1lc3RhbXBQcm92aWRlciA9IGRhdGVUaW1lc3RhbXBQcm92aWRlcl8xLmRhdGVUaW1lc3RhbXBQcm92aWRlcjsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fYnVmZmVyU2l6ZSA9IF9idWZmZXJTaXplO1xuICAgICAgICBfdGhpcy5fd2luZG93VGltZSA9IF93aW5kb3dUaW1lO1xuICAgICAgICBfdGhpcy5fdGltZXN0YW1wUHJvdmlkZXIgPSBfdGltZXN0YW1wUHJvdmlkZXI7XG4gICAgICAgIF90aGlzLl9idWZmZXIgPSBbXTtcbiAgICAgICAgX3RoaXMuX2luZmluaXRlVGltZVdpbmRvdyA9IHRydWU7XG4gICAgICAgIF90aGlzLl9pbmZpbml0ZVRpbWVXaW5kb3cgPSBfd2luZG93VGltZSA9PT0gSW5maW5pdHk7XG4gICAgICAgIF90aGlzLl9idWZmZXJTaXplID0gTWF0aC5tYXgoMSwgX2J1ZmZlclNpemUpO1xuICAgICAgICBfdGhpcy5fd2luZG93VGltZSA9IE1hdGgubWF4KDEsIF93aW5kb3dUaW1lKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSZXBsYXlTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZCwgX2J1ZmZlciA9IF9hLl9idWZmZXIsIF9pbmZpbml0ZVRpbWVXaW5kb3cgPSBfYS5faW5maW5pdGVUaW1lV2luZG93LCBfdGltZXN0YW1wUHJvdmlkZXIgPSBfYS5fdGltZXN0YW1wUHJvdmlkZXIsIF93aW5kb3dUaW1lID0gX2EuX3dpbmRvd1RpbWU7XG4gICAgICAgIGlmICghaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBfYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgIV9pbmZpbml0ZVRpbWVXaW5kb3cgJiYgX2J1ZmZlci5wdXNoKF90aW1lc3RhbXBQcm92aWRlci5ub3coKSArIF93aW5kb3dUaW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90cmltQnVmZmVyKCk7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB9O1xuICAgIFJlcGxheVN1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIHRoaXMuX3RyaW1CdWZmZXIoKTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMuX2lubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfaW5maW5pdGVUaW1lV2luZG93ID0gX2EuX2luZmluaXRlVGltZVdpbmRvdywgX2J1ZmZlciA9IF9hLl9idWZmZXI7XG4gICAgICAgIHZhciBjb3B5ID0gX2J1ZmZlci5zbGljZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcHkubGVuZ3RoICYmICFzdWJzY3JpYmVyLmNsb3NlZDsgaSArPSBfaW5maW5pdGVUaW1lV2luZG93ID8gMSA6IDIpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChjb3B5W2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGVja0ZpbmFsaXplZFN0YXR1c2VzKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgUmVwbGF5U3ViamVjdC5wcm90b3R5cGUuX3RyaW1CdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9idWZmZXJTaXplID0gX2EuX2J1ZmZlclNpemUsIF90aW1lc3RhbXBQcm92aWRlciA9IF9hLl90aW1lc3RhbXBQcm92aWRlciwgX2J1ZmZlciA9IF9hLl9idWZmZXIsIF9pbmZpbml0ZVRpbWVXaW5kb3cgPSBfYS5faW5maW5pdGVUaW1lV2luZG93O1xuICAgICAgICB2YXIgYWRqdXN0ZWRCdWZmZXJTaXplID0gKF9pbmZpbml0ZVRpbWVXaW5kb3cgPyAxIDogMikgKiBfYnVmZmVyU2l6ZTtcbiAgICAgICAgX2J1ZmZlclNpemUgPCBJbmZpbml0eSAmJiBhZGp1c3RlZEJ1ZmZlclNpemUgPCBfYnVmZmVyLmxlbmd0aCAmJiBfYnVmZmVyLnNwbGljZSgwLCBfYnVmZmVyLmxlbmd0aCAtIGFkanVzdGVkQnVmZmVyU2l6ZSk7XG4gICAgICAgIGlmICghX2luZmluaXRlVGltZVdpbmRvdykge1xuICAgICAgICAgICAgdmFyIG5vdyA9IF90aW1lc3RhbXBQcm92aWRlci5ub3coKTtcbiAgICAgICAgICAgIHZhciBsYXN0ID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgX2J1ZmZlci5sZW5ndGggJiYgX2J1ZmZlcltpXSA8PSBub3c7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgIGxhc3QgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdCAmJiBfYnVmZmVyLnNwbGljZSgwLCBsYXN0ICsgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBSZXBsYXlTdWJqZWN0O1xufShTdWJqZWN0XzEuU3ViamVjdCkpO1xuZXhwb3J0cy5SZXBsYXlTdWJqZWN0ID0gUmVwbGF5U3ViamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlcGxheVN1YmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBkYXRlVGltZXN0YW1wUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlci9kYXRlVGltZXN0YW1wUHJvdmlkZXJcIik7XG52YXIgU2NoZWR1bGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoc2NoZWR1bGVyQWN0aW9uQ3Rvciwgbm93KSB7XG4gICAgICAgIGlmIChub3cgPT09IHZvaWQgMCkgeyBub3cgPSBTY2hlZHVsZXIubm93OyB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyQWN0aW9uQ3RvciA9IHNjaGVkdWxlckFjdGlvbkN0b3I7XG4gICAgICAgIHRoaXMubm93ID0gbm93O1xuICAgIH1cbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHdvcmssIGRlbGF5LCBzdGF0ZSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLnNjaGVkdWxlckFjdGlvbkN0b3IodGhpcywgd29yaykuc2NoZWR1bGUoc3RhdGUsIGRlbGF5KTtcbiAgICB9O1xuICAgIFNjaGVkdWxlci5ub3cgPSBkYXRlVGltZXN0YW1wUHJvdmlkZXJfMS5kYXRlVGltZXN0YW1wUHJvdmlkZXIubm93O1xuICAgIHJldHVybiBTY2hlZHVsZXI7XG59KCkpO1xuZXhwb3J0cy5TY2hlZHVsZXIgPSBTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bbm9ueW1vdXNTdWJqZWN0ID0gZXhwb3J0cy5TdWJqZWN0ID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVcIik7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi9TdWJzY3JpcHRpb25cIik7XG52YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMSA9IHJlcXVpcmUoXCIuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JcIik7XG52YXIgYXJyUmVtb3ZlXzEgPSByZXF1aXJlKFwiLi91dGlsL2FyclJlbW92ZVwiKTtcbnZhciBlcnJvckNvbnRleHRfMSA9IHJlcXVpcmUoXCIuL3V0aWwvZXJyb3JDb250ZXh0XCIpO1xudmFyIFN1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgX3RoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICBfdGhpcy50aHJvd25FcnJvciA9IG51bGw7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3ViamVjdC5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBBbm9ueW1vdXNTdWJqZWN0KHRoaXMsIHRoaXMpO1xuICAgICAgICBzdWJqZWN0Lm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3Rocm93SWZDbG9zZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBlcnJvckNvbnRleHRfMS5lcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmN1cnJlbnRPYnNlcnZlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmVycyA9IEFycmF5LmZyb20oX3RoaXMub2JzZXJ2ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGVycm9yQ29udGV4dF8xLmVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oYXNFcnJvciA9IF90aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMudGhyb3duRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IF90aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXJyb3JDb250ZXh0XzEuZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IF90aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdWJqZWN0LnByb3RvdHlwZSwgXCJvYnNlcnZlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLm9ic2VydmVycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgPiAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX3RyeVN1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgdGhpcy5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyhzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2lubmVyU3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkLCBvYnNlcnZlcnMgPSBfYS5vYnNlcnZlcnM7XG4gICAgICAgIGlmIChoYXNFcnJvciB8fCBpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb25fMS5FTVBUWV9TVUJTQ1JJUFRJT047XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgb2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBudWxsO1xuICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKG9ic2VydmVycywgc3Vic2NyaWJlcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCB0aHJvd25FcnJvciA9IF9hLnRocm93bkVycm9yLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQ7XG4gICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aHJvd25FcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmFzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIFN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3Q7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLlN1YmplY3QgPSBTdWJqZWN0O1xudmFyIEFub255bW91c1N1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbm9ueW1vdXNTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICBfdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV4dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHZhbHVlKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXJyb3IpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBlcnIpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb21wbGV0ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLnNvdXJjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1YnNjcmliZShzdWJzY3JpYmVyKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogU3Vic2NyaXB0aW9uXzEuRU1QVFlfU1VCU0NSSVBUSU9OO1xuICAgIH07XG4gICAgcmV0dXJuIEFub255bW91c1N1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydHMuQW5vbnltb3VzU3ViamVjdCA9IEFub255bW91c1N1YmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRU1QVFlfT0JTRVJWRVIgPSBleHBvcnRzLlNhZmVTdWJzY3JpYmVyID0gZXhwb3J0cy5TdWJzY3JpYmVyID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuL1N1YnNjcmlwdGlvblwiKTtcbnZhciBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbnZhciByZXBvcnRVbmhhbmRsZWRFcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvclwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi91dGlsL25vb3BcIik7XG52YXIgTm90aWZpY2F0aW9uRmFjdG9yaWVzXzEgPSByZXF1aXJlKFwiLi9Ob3RpZmljYXRpb25GYWN0b3JpZXNcIik7XG52YXIgdGltZW91dFByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyXCIpO1xudmFyIGVycm9yQ29udGV4dF8xID0gcmVxdWlyZShcIi4vdXRpbC9lcnJvckNvbnRleHRcIik7XG52YXIgU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3Vic2NyaWJlcihkZXN0aW5hdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgaWYgKFN1YnNjcmlwdGlvbl8xLmlzU3Vic2NyaXB0aW9uKGRlc3RpbmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmFkZChfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGV4cG9ydHMuRU1QVFlfT0JTRVJWRVI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJzY3JpYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTYWZlU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oTm90aWZpY2F0aW9uRmFjdG9yaWVzXzEubmV4dE5vdGlmaWNhdGlvbih2YWx1ZSksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oTm90aWZpY2F0aW9uRmFjdG9yaWVzXzEuZXJyb3JOb3RpZmljYXRpb24oZXJyKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbkZhY3Rvcmllc18xLkNPTVBMRVRFX05PVElGSUNBVElPTiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJzY3JpYmVyID0gU3Vic2NyaWJlcjtcbnZhciBfYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kO1xuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBfYmluZC5jYWxsKGZuLCB0aGlzQXJnKTtcbn1cbnZhciBDb25zdW1lck9ic2VydmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb25zdW1lck9ic2VydmVyKHBhcnRpYWxPYnNlcnZlcikge1xuICAgICAgICB0aGlzLnBhcnRpYWxPYnNlcnZlciA9IHBhcnRpYWxPYnNlcnZlcjtcbiAgICB9XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyID0gdGhpcy5wYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChwYXJ0aWFsT2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyID0gdGhpcy5wYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChwYXJ0aWFsT2JzZXJ2ZXIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29uc3VtZXJPYnNlcnZlcjtcbn0oKSk7XG52YXIgU2FmZVN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTYWZlU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTYWZlU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkgfHwgIW9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgbmV4dDogKG9ic2VydmVyT3JOZXh0ICE9PSBudWxsICYmIG9ic2VydmVyT3JOZXh0ICE9PSB2b2lkIDAgPyBvYnNlcnZlck9yTmV4dCA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yICE9PSBudWxsICYmIGVycm9yICE9PSB2b2lkIDAgPyBlcnJvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogY29tcGxldGUgIT09IG51bGwgJiYgY29tcGxldGUgIT09IHZvaWQgMCA/IGNvbXBsZXRlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0XzE7XG4gICAgICAgICAgICBpZiAoX3RoaXMgJiYgY29uZmlnXzEuY29uZmlnLnVzZURlcHJlY2F0ZWROZXh0Q29udGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfMSA9IE9iamVjdC5jcmVhdGUob2JzZXJ2ZXJPck5leHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfMS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnVuc3Vic2NyaWJlKCk7IH07XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0OiBvYnNlcnZlck9yTmV4dC5uZXh0ICYmIGJpbmQob2JzZXJ2ZXJPck5leHQubmV4dCwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG9ic2VydmVyT3JOZXh0LmVycm9yICYmIGJpbmQob2JzZXJ2ZXJPck5leHQuZXJyb3IsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBDb25zdW1lck9ic2VydmVyKHBhcnRpYWxPYnNlcnZlcik7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNhZmVTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG5leHBvcnRzLlNhZmVTdWJzY3JpYmVyID0gU2FmZVN1YnNjcmliZXI7XG5mdW5jdGlvbiBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcikge1xuICAgIGlmIChjb25maWdfMS5jb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICBlcnJvckNvbnRleHRfMS5jYXB0dXJlRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVwb3J0VW5oYW5kbGVkRXJyb3JfMS5yZXBvcnRVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVmYXVsdEVycm9ySGFuZGxlcihlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG59XG5mdW5jdGlvbiBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcikge1xuICAgIHZhciBvblN0b3BwZWROb3RpZmljYXRpb24gPSBjb25maWdfMS5jb25maWcub25TdG9wcGVkTm90aWZpY2F0aW9uO1xuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiAmJiB0aW1lb3V0UHJvdmlkZXJfMS50aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBvblN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKTsgfSk7XG59XG5leHBvcnRzLkVNUFRZX09CU0VSVkVSID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0OiBub29wXzEubm9vcCxcbiAgICBlcnJvcjogZGVmYXVsdEVycm9ySGFuZGxlcixcbiAgICBjb21wbGV0ZTogbm9vcF8xLm5vb3AsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzU3Vic2NyaXB0aW9uID0gZXhwb3J0cy5FTVBUWV9TVUJTQ1JJUFRJT04gPSBleHBvcnRzLlN1YnNjcmlwdGlvbiA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgVW5zdWJzY3JpcHRpb25FcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yXCIpO1xudmFyIGFyclJlbW92ZV8xID0gcmVxdWlyZShcIi4vdXRpbC9hcnJSZW1vdmVcIik7XG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24oaW5pdGlhbFRlYXJkb3duKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFRlYXJkb3duID0gaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9maW5hbGl6ZXJzID0gbnVsbDtcbiAgICB9XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVfMSwgX2EsIGVfMiwgX2I7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICAgICAgaWYgKF9wYXJlbnRhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfcGFyZW50YWdlXzEgPSBfX3ZhbHVlcyhfcGFyZW50YWdlKSwgX3BhcmVudGFnZV8xXzEgPSBfcGFyZW50YWdlXzEubmV4dCgpOyAhX3BhcmVudGFnZV8xXzEuZG9uZTsgX3BhcmVudGFnZV8xXzEgPSBfcGFyZW50YWdlXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gX3BhcmVudGFnZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50XzEucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3BhcmVudGFnZV8xXzEgJiYgIV9wYXJlbnRhZ2VfMV8xLmRvbmUgJiYgKF9hID0gX3BhcmVudGFnZV8xLnJldHVybikpIF9hLmNhbGwoX3BhcmVudGFnZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmVudGFnZS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluaXRpYWxGaW5hbGl6ZXIgPSB0aGlzLmluaXRpYWxUZWFyZG93bjtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihpbml0aWFsRmluYWxpemVyKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxGaW5hbGl6ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZSBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yID8gZS5lcnJvcnMgOiBbZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9maW5hbGl6ZXJzID0gdGhpcy5fZmluYWxpemVycztcbiAgICAgICAgICAgIGlmIChfZmluYWxpemVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmFsaXplcnMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9maW5hbGl6ZXJzXzEgPSBfX3ZhbHVlcyhfZmluYWxpemVycyksIF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpOyAhX2ZpbmFsaXplcnNfMV8xLmRvbmU7IF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxpemVyID0gX2ZpbmFsaXplcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjRmluYWxpemVyKGZpbmFsaXplcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzICE9PSBudWxsICYmIGVycm9ycyAhPT0gdm9pZCAwID8gZXJyb3JzIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGVycm9ycykpLCBfX3JlYWQoZXJyLmVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZmluYWxpemVyc18xXzEgJiYgIV9maW5hbGl6ZXJzXzFfMS5kb25lICYmIChfYiA9IF9maW5hbGl6ZXJzXzEucmV0dXJuKSkgX2IuY2FsbChfZmluYWxpemVyc18xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0ZWFyZG93biAmJiB0ZWFyZG93biAhPT0gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZXhlY0ZpbmFsaXplcih0ZWFyZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duLmNsb3NlZCB8fCB0ZWFyZG93bi5faGFzUGFyZW50KHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGVhcmRvd24uX2FkZFBhcmVudCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKHRoaXMuX2ZpbmFsaXplcnMgPSAoX2EgPSB0aGlzLl9maW5hbGl6ZXJzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkucHVzaCh0ZWFyZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2hhc1BhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHJldHVybiBfcGFyZW50YWdlID09PSBwYXJlbnQgfHwgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgJiYgX3BhcmVudGFnZS5pbmNsdWRlcyhwYXJlbnQpKTtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2FkZFBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgPyAoX3BhcmVudGFnZS5wdXNoKHBhcmVudCksIF9wYXJlbnRhZ2UpIDogX3BhcmVudGFnZSA/IFtfcGFyZW50YWdlLCBwYXJlbnRdIDogcGFyZW50O1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fcmVtb3ZlUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgaWYgKF9wYXJlbnRhZ2UgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpKSB7XG4gICAgICAgICAgICBhcnJSZW1vdmVfMS5hcnJSZW1vdmUoX3BhcmVudGFnZSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF9maW5hbGl6ZXJzID0gdGhpcy5fZmluYWxpemVycztcbiAgICAgICAgX2ZpbmFsaXplcnMgJiYgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKF9maW5hbGl6ZXJzLCB0ZWFyZG93bik7XG4gICAgICAgIGlmICh0ZWFyZG93biBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGVhcmRvd24uX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVtcHR5ID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICBlbXB0eS5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW1wdHk7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpKTtcbmV4cG9ydHMuU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uO1xuZXhwb3J0cy5FTVBUWV9TVUJTQ1JJUFRJT04gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5mdW5jdGlvbiBpc1N1YnNjcmlwdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24gfHxcbiAgICAgICAgKHZhbHVlICYmICdjbG9zZWQnIGluIHZhbHVlICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlLnJlbW92ZSkgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUuYWRkKSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih2YWx1ZS51bnN1YnNjcmliZSkpKTtcbn1cbmV4cG9ydHMuaXNTdWJzY3JpcHRpb24gPSBpc1N1YnNjcmlwdGlvbjtcbmZ1bmN0aW9uIGV4ZWNGaW5hbGl6ZXIoZmluYWxpemVyKSB7XG4gICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGZpbmFsaXplcikpIHtcbiAgICAgICAgZmluYWxpemVyKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmaW5hbGl6ZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmZpZyA9IHZvaWQgMDtcbmV4cG9ydHMuY29uZmlnID0ge1xuICAgIG9uVW5oYW5kbGVkRXJyb3I6IG51bGwsXG4gICAgb25TdG9wcGVkTm90aWZpY2F0aW9uOiBudWxsLFxuICAgIFByb21pc2U6IHVuZGVmaW5lZCxcbiAgICB1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nOiBmYWxzZSxcbiAgICB1c2VEZXByZWNhdGVkTmV4dENvbnRleHQ6IGZhbHNlLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmlyc3RWYWx1ZUZyb20gPSB2b2lkIDA7XG52YXIgRW1wdHlFcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9FbXB0eUVycm9yXCIpO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL1N1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBmaXJzdFZhbHVlRnJvbShzb3VyY2UsIGNvbmZpZykge1xuICAgIHZhciBoYXNDb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyXzEuU2FmZVN1YnNjcmliZXIoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiByZWplY3QsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb25maWcuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRW1wdHlFcnJvcl8xLkVtcHR5RXJyb3IoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSk7XG59XG5leHBvcnRzLmZpcnN0VmFsdWVGcm9tID0gZmlyc3RWYWx1ZUZyb207XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maXJzdFZhbHVlRnJvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubGFzdFZhbHVlRnJvbSA9IHZvaWQgMDtcbnZhciBFbXB0eUVycm9yXzEgPSByZXF1aXJlKFwiLi91dGlsL0VtcHR5RXJyb3JcIik7XG5mdW5jdGlvbiBsYXN0VmFsdWVGcm9tKHNvdXJjZSwgY29uZmlnKSB7XG4gICAgdmFyIGhhc0NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBfaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdmFyIF92YWx1ZTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBfaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiByZWplY3QsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChfaGFzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNDb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb25maWcuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRW1wdHlFcnJvcl8xLkVtcHR5RXJyb3IoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmxhc3RWYWx1ZUZyb20gPSBsYXN0VmFsdWVGcm9tO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGFzdFZhbHVlRnJvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG52YXIgcmVmQ291bnRfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvcmVmQ291bnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbm5lY3RhYmxlT2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb25uZWN0YWJsZU9ic2VydmFibGUoc291cmNlLCBzdWJqZWN0RmFjdG9yeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIF90aGlzLnN1YmplY3RGYWN0b3J5ID0gc3ViamVjdEZhY3Rvcnk7XG4gICAgICAgIF90aGlzLl9zdWJqZWN0ID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX3JlZkNvdW50ID0gMDtcbiAgICAgICAgX3RoaXMuX2Nvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICBpZiAobGlmdF8xLmhhc0xpZnQoc291cmNlKSkge1xuICAgICAgICAgICAgX3RoaXMubGlmdCA9IHNvdXJjZS5saWZ0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViamVjdCgpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUuZ2V0U3ViamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSB0aGlzLl9zdWJqZWN0O1xuICAgICAgICBpZiAoIXN1YmplY3QgfHwgc3ViamVjdC5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3QgPSB0aGlzLnN1YmplY3RGYWN0b3J5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Q7XG4gICAgfTtcbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLl90ZWFyZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVmQ291bnQgPSAwO1xuICAgICAgICB2YXIgX2Nvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uO1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gdGhpcy5fY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIF9jb25uZWN0aW9uID09PSBudWxsIHx8IF9jb25uZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb247XG4gICAgICAgIGlmICghY29ubmVjdGlvbikge1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb24gPSBuZXcgU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICB2YXIgc3ViamVjdF8xID0gdGhpcy5nZXRTdWJqZWN0KCk7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmFkZCh0aGlzLnNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YmplY3RfMSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgc3ViamVjdF8xLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgc3ViamVjdF8xLmVycm9yKGVycik7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fdGVhcmRvd24oKTsgfSkpKTtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfTtcbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLnJlZkNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVmQ291bnRfMS5yZWZDb3VudCgpKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuQ29ubmVjdGFibGVPYnNlcnZhYmxlID0gQ29ubmVjdGFibGVPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29ubmVjdGFibGVPYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5iaW5kQ2FsbGJhY2sgPSB2b2lkIDA7XG52YXIgYmluZENhbGxiYWNrSW50ZXJuYWxzXzEgPSByZXF1aXJlKFwiLi9iaW5kQ2FsbGJhY2tJbnRlcm5hbHNcIik7XG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soY2FsbGJhY2tGdW5jLCByZXN1bHRTZWxlY3Rvciwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGJpbmRDYWxsYmFja0ludGVybmFsc18xLmJpbmRDYWxsYmFja0ludGVybmFscyhmYWxzZSwgY2FsbGJhY2tGdW5jLCByZXN1bHRTZWxlY3Rvciwgc2NoZWR1bGVyKTtcbn1cbmV4cG9ydHMuYmluZENhbGxiYWNrID0gYmluZENhbGxiYWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZENhbGxiYWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYmluZENhbGxiYWNrSW50ZXJuYWxzID0gdm9pZCAwO1xudmFyIGlzU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1NjaGVkdWxlclwiKTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBzdWJzY3JpYmVPbl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9zdWJzY3JpYmVPblwiKTtcbnZhciBtYXBPbmVPck1hbnlBcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzXCIpO1xudmFyIG9ic2VydmVPbl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9vYnNlcnZlT25cIik7XG52YXIgQXN5bmNTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vQXN5bmNTdWJqZWN0XCIpO1xuZnVuY3Rpb24gYmluZENhbGxiYWNrSW50ZXJuYWxzKGlzTm9kZVN0eWxlLCBjYWxsYmFja0Z1bmMsIHJlc3VsdFNlbGVjdG9yLCBzY2hlZHVsZXIpIHtcbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGlzU2NoZWR1bGVyXzEuaXNTY2hlZHVsZXIocmVzdWx0U2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSByZXN1bHRTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kQ2FsbGJhY2tJbnRlcm5hbHMoaXNOb2RlU3R5bGUsIGNhbGxiYWNrRnVuYywgc2NoZWR1bGVyKVxuICAgICAgICAgICAgICAgICAgICAuYXBwbHkodGhpcywgYXJncylcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwT25lT3JNYW55QXJnc18xLm1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJpbmRDYWxsYmFja0ludGVybmFscyhpc05vZGVTdHlsZSwgY2FsbGJhY2tGdW5jKVxuICAgICAgICAgICAgICAgIC5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgICAgICAgICAgIC5waXBlKHN1YnNjcmliZU9uXzEuc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uXzEub2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEFzeW5jU3ViamVjdF8xLkFzeW5jU3ViamVjdCgpO1xuICAgICAgICB2YXIgdW5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBzdWJzID0gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAodW5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIHVuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgaXNBc3luY18xID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ29tcGxldGVfMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYy5hcHBseShfdGhpcywgX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpLCBbXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05vZGVTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSByZXN1bHRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dCgxIDwgcmVzdWx0cy5sZW5ndGggPyByZXN1bHRzIDogcmVzdWx0c1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlXzEgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXN5bmNfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGVfMSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlzQXN5bmNfMSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3VicztcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuYmluZENhbGxiYWNrSW50ZXJuYWxzID0gYmluZENhbGxiYWNrSW50ZXJuYWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZENhbGxiYWNrSW50ZXJuYWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5iaW5kTm9kZUNhbGxiYWNrID0gdm9pZCAwO1xudmFyIGJpbmRDYWxsYmFja0ludGVybmFsc18xID0gcmVxdWlyZShcIi4vYmluZENhbGxiYWNrSW50ZXJuYWxzXCIpO1xuZnVuY3Rpb24gYmluZE5vZGVDYWxsYmFjayhjYWxsYmFja0Z1bmMsIHJlc3VsdFNlbGVjdG9yLCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gYmluZENhbGxiYWNrSW50ZXJuYWxzXzEuYmluZENhbGxiYWNrSW50ZXJuYWxzKHRydWUsIGNhbGxiYWNrRnVuYywgcmVzdWx0U2VsZWN0b3IsIHNjaGVkdWxlcik7XG59XG5leHBvcnRzLmJpbmROb2RlQ2FsbGJhY2sgPSBiaW5kTm9kZUNhbGxiYWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZE5vZGVDYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29tYmluZUxhdGVzdEluaXQgPSBleHBvcnRzLmNvbWJpbmVMYXRlc3QgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgYXJnc0FyZ0FycmF5T3JPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NBcmdBcnJheU9yT2JqZWN0XCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBjcmVhdGVPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2NyZWF0ZU9iamVjdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGV4ZWN1dGVTY2hlZHVsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlXCIpO1xuZnVuY3Rpb24gY29tYmluZUxhdGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yID0gYXJnc18xLnBvcFJlc3VsdFNlbGVjdG9yKGFyZ3MpO1xuICAgIHZhciBfYSA9IGFyZ3NBcmdBcnJheU9yT2JqZWN0XzEuYXJnc0FyZ0FycmF5T3JPYmplY3QoYXJncyksIG9ic2VydmFibGVzID0gX2EuYXJncywga2V5cyA9IF9hLmtleXM7XG4gICAgaWYgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnJvbV8xLmZyb20oW10sIHNjaGVkdWxlcik7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoY29tYmluZUxhdGVzdEluaXQob2JzZXJ2YWJsZXMsIHNjaGVkdWxlciwga2V5c1xuICAgICAgICA/XG4gICAgICAgICAgICBmdW5jdGlvbiAodmFsdWVzKSB7IHJldHVybiBjcmVhdGVPYmplY3RfMS5jcmVhdGVPYmplY3Qoa2V5cywgdmFsdWVzKTsgfVxuICAgICAgICA6XG4gICAgICAgICAgICBpZGVudGl0eV8xLmlkZW50aXR5KSk7XG4gICAgcmV0dXJuIHJlc3VsdFNlbGVjdG9yID8gcmVzdWx0LnBpcGUobWFwT25lT3JNYW55QXJnc18xLm1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKSA6IHJlc3VsdDtcbn1cbmV4cG9ydHMuY29tYmluZUxhdGVzdCA9IGNvbWJpbmVMYXRlc3Q7XG5mdW5jdGlvbiBjb21iaW5lTGF0ZXN0SW5pdChvYnNlcnZhYmxlcywgc2NoZWR1bGVyLCB2YWx1ZVRyYW5zZm9ybSkge1xuICAgIGlmICh2YWx1ZVRyYW5zZm9ybSA9PT0gdm9pZCAwKSB7IHZhbHVlVHJhbnNmb3JtID0gaWRlbnRpdHlfMS5pZGVudGl0eTsgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBtYXliZVNjaGVkdWxlKHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IG9ic2VydmFibGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSBsZW5ndGg7XG4gICAgICAgICAgICB2YXIgcmVtYWluaW5nRmlyc3RWYWx1ZXMgPSBsZW5ndGg7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgbWF5YmVTY2hlZHVsZShzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGZyb21fMS5mcm9tKG9ic2VydmFibGVzW2ldLCBzY2hlZHVsZXIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzRmlyc3RWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNGaXJzdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRmlyc3RWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nRmlyc3RWYWx1ZXMtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVtYWluaW5nRmlyc3RWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWVUcmFuc2Zvcm0odmFsdWVzLnNsaWNlKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0sIHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzdWJzY3JpYmVyKTtcbiAgICB9O1xufVxuZXhwb3J0cy5jb21iaW5lTGF0ZXN0SW5pdCA9IGNvbWJpbmVMYXRlc3RJbml0O1xuZnVuY3Rpb24gbWF5YmVTY2hlZHVsZShzY2hlZHVsZXIsIGV4ZWN1dGUsIHN1YnNjcmlwdGlvbikge1xuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmlwdGlvbiwgc2NoZWR1bGVyLCBleGVjdXRlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV4ZWN1dGUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lTGF0ZXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb25jYXQgPSB2b2lkIDA7XG52YXIgY29uY2F0QWxsXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL2NvbmNhdEFsbFwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG5mdW5jdGlvbiBjb25jYXQoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBjb25jYXRBbGxfMS5jb25jYXRBbGwoKShmcm9tXzEuZnJvbShhcmdzLCBhcmdzXzEucG9wU2NoZWR1bGVyKGFyZ3MpKSk7XG59XG5leHBvcnRzLmNvbmNhdCA9IGNvbmNhdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29ubmVjdGFibGUgPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1N1YmplY3RcIik7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgZGVmZXJfMSA9IHJlcXVpcmUoXCIuL2RlZmVyXCIpO1xudmFyIERFRkFVTFRfQ09ORklHID0ge1xuICAgIGNvbm5lY3RvcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFN1YmplY3RfMS5TdWJqZWN0KCk7IH0sXG4gICAgcmVzZXRPbkRpc2Nvbm5lY3Q6IHRydWUsXG59O1xuZnVuY3Rpb24gY29ubmVjdGFibGUoc291cmNlLCBjb25maWcpIHtcbiAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0gREVGQVVMVF9DT05GSUc7IH1cbiAgICB2YXIgY29ubmVjdGlvbiA9IG51bGw7XG4gICAgdmFyIGNvbm5lY3RvciA9IGNvbmZpZy5jb25uZWN0b3IsIF9hID0gY29uZmlnLnJlc2V0T25EaXNjb25uZWN0LCByZXNldE9uRGlzY29ubmVjdCA9IF9hID09PSB2b2lkIDAgPyB0cnVlIDogX2E7XG4gICAgdmFyIHN1YmplY3QgPSBjb25uZWN0b3IoKTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbiAgICByZXN1bHQuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFjb25uZWN0aW9uIHx8IGNvbm5lY3Rpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uID0gZGVmZXJfMS5kZWZlcihmdW5jdGlvbiAoKSB7IHJldHVybiBzb3VyY2U7IH0pLnN1YnNjcmliZShzdWJqZWN0KTtcbiAgICAgICAgICAgIGlmIChyZXNldE9uRGlzY29ubmVjdCkge1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uYWRkKGZ1bmN0aW9uICgpIHsgcmV0dXJuIChzdWJqZWN0ID0gY29ubmVjdG9yKCkpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNvbm5lY3RhYmxlID0gY29ubmVjdGFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25uZWN0YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmZXIgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi9pbm5lckZyb21cIik7XG5mdW5jdGlvbiBkZWZlcihvYnNlcnZhYmxlRmFjdG9yeSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKG9ic2VydmFibGVGYWN0b3J5KCkpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVmZXIgPSBkZWZlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hbmltYXRpb25GcmFtZXMgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uLy4uL09ic2VydmFibGVcIik7XG52YXIgcGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlcl8xID0gcmVxdWlyZShcIi4uLy4uL3NjaGVkdWxlci9wZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyXCIpO1xudmFyIGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9zY2hlZHVsZXIvYW5pbWF0aW9uRnJhbWVQcm92aWRlclwiKTtcbmZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcyh0aW1lc3RhbXBQcm92aWRlcikge1xuICAgIHJldHVybiB0aW1lc3RhbXBQcm92aWRlciA/IGFuaW1hdGlvbkZyYW1lc0ZhY3RvcnkodGltZXN0YW1wUHJvdmlkZXIpIDogREVGQVVMVF9BTklNQVRJT05fRlJBTUVTO1xufVxuZXhwb3J0cy5hbmltYXRpb25GcmFtZXMgPSBhbmltYXRpb25GcmFtZXM7XG5mdW5jdGlvbiBhbmltYXRpb25GcmFtZXNGYWN0b3J5KHRpbWVzdGFtcFByb3ZpZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgcHJvdmlkZXIgPSB0aW1lc3RhbXBQcm92aWRlciB8fCBwZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyXzEucGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlcjtcbiAgICAgICAgdmFyIHN0YXJ0ID0gcHJvdmlkZXIubm93KCk7XG4gICAgICAgIHZhciBpZCA9IDA7XG4gICAgICAgIHZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBhbmltYXRpb25GcmFtZVByb3ZpZGVyXzEuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBwcm92aWRlci5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wUHJvdmlkZXIgPyBub3cgOiB0aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGFwc2VkOiBub3cgLSBzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBydW4oKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMS5hbmltYXRpb25GcmFtZVByb3ZpZGVyLmNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbnZhciBERUZBVUxUX0FOSU1BVElPTl9GUkFNRVMgPSBhbmltYXRpb25GcmFtZXNGYWN0b3J5KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmltYXRpb25GcmFtZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmVtcHR5ID0gZXhwb3J0cy5FTVBUWSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbmV4cG9ydHMuRU1QVFkgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSk7XG5mdW5jdGlvbiBlbXB0eShzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSA6IGV4cG9ydHMuRU1QVFk7XG59XG5leHBvcnRzLmVtcHR5ID0gZW1wdHk7XG5mdW5jdGlvbiBlbXB0eVNjaGVkdWxlZChzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZm9ya0pvaW4gPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgYXJnc0FyZ0FycmF5T3JPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NBcmdBcnJheU9yT2JqZWN0XCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4vaW5uZXJGcm9tXCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBtYXBPbmVPck1hbnlBcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzXCIpO1xudmFyIGNyZWF0ZU9iamVjdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvY3JlYXRlT2JqZWN0XCIpO1xuZnVuY3Rpb24gZm9ya0pvaW4oKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZXN1bHRTZWxlY3RvciA9IGFyZ3NfMS5wb3BSZXN1bHRTZWxlY3RvcihhcmdzKTtcbiAgICB2YXIgX2EgPSBhcmdzQXJnQXJyYXlPck9iamVjdF8xLmFyZ3NBcmdBcnJheU9yT2JqZWN0KGFyZ3MpLCBzb3VyY2VzID0gX2EuYXJncywga2V5cyA9IF9hLmtleXM7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgbGVuZ3RoID0gc291cmNlcy5sZW5ndGg7XG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlcyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgICAgICB2YXIgcmVtYWluaW5nQ29tcGxldGlvbnMgPSBsZW5ndGg7XG4gICAgICAgIHZhciByZW1haW5pbmdFbWlzc2lvbnMgPSBsZW5ndGg7XG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHNvdXJjZUluZGV4KSB7XG4gICAgICAgICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShzb3VyY2VzW3NvdXJjZUluZGV4XSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nRW1pc3Npb25zLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbHVlc1tzb3VyY2VJbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbWFpbmluZ0NvbXBsZXRpb25zLS07IH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcmVtYWluaW5nQ29tcGxldGlvbnMgfHwgIWhhc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVtYWluaW5nRW1pc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoa2V5cyA/IGNyZWF0ZU9iamVjdF8xLmNyZWF0ZU9iamVjdChrZXlzLCB2YWx1ZXMpIDogdmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBzb3VyY2VJbmRleCA9IDA7IHNvdXJjZUluZGV4IDwgbGVuZ3RoOyBzb3VyY2VJbmRleCsrKSB7XG4gICAgICAgICAgICBfbG9vcF8xKHNvdXJjZUluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRTZWxlY3RvciA/IHJlc3VsdC5waXBlKG1hcE9uZU9yTWFueUFyZ3NfMS5tYXBPbmVPck1hbnlBcmdzKHJlc3VsdFNlbGVjdG9yKSkgOiByZXN1bHQ7XG59XG5leHBvcnRzLmZvcmtKb2luID0gZm9ya0pvaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3JrSm9pbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZnJvbSA9IHZvaWQgMDtcbnZhciBzY2hlZHVsZWRfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZWQvc2NoZWR1bGVkXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4vaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gZnJvbShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlciA/IHNjaGVkdWxlZF8xLnNjaGVkdWxlZChpbnB1dCwgc2NoZWR1bGVyKSA6IGlubmVyRnJvbV8xLmlubmVyRnJvbShpbnB1dCk7XG59XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZnJvbUV2ZW50ID0gdm9pZCAwO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL21lcmdlTWFwXCIpO1xudmFyIGlzQXJyYXlMaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0FycmF5TGlrZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG52YXIgbm9kZUV2ZW50RW1pdHRlck1ldGhvZHMgPSBbJ2FkZExpc3RlbmVyJywgJ3JlbW92ZUxpc3RlbmVyJ107XG52YXIgZXZlbnRUYXJnZXRNZXRob2RzID0gWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInXTtcbnZhciBqcXVlcnlNZXRob2RzID0gWydvbicsICdvZmYnXTtcbmZ1bmN0aW9uIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucywgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgcmVzdWx0U2VsZWN0b3IgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucykucGlwZShtYXBPbmVPck1hbnlBcmdzXzEubWFwT25lT3JNYW55QXJncyhyZXN1bHRTZWxlY3RvcikpO1xuICAgIH1cbiAgICB2YXIgX2EgPSBfX3JlYWQoaXNFdmVudFRhcmdldCh0YXJnZXQpXG4gICAgICAgID8gZXZlbnRUYXJnZXRNZXRob2RzLm1hcChmdW5jdGlvbiAobWV0aG9kTmFtZSkgeyByZXR1cm4gZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIHRhcmdldFttZXRob2ROYW1lXShldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpOyB9OyB9KVxuICAgICAgICA6XG4gICAgICAgICAgICBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpXG4gICAgICAgICAgICAgICAgPyBub2RlRXZlbnRFbWl0dGVyTWV0aG9kcy5tYXAodG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgIDogaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgID8ganF1ZXJ5TWV0aG9kcy5tYXAodG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICA6IFtdLCAyKSwgYWRkID0gX2FbMF0sIHJlbW92ZSA9IF9hWzFdO1xuICAgIGlmICghYWRkKSB7XG4gICAgICAgIGlmIChpc0FycmF5TGlrZV8xLmlzQXJyYXlMaWtlKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZU1hcF8xLm1lcmdlTWFwKGZ1bmN0aW9uIChzdWJUYXJnZXQpIHsgcmV0dXJuIGZyb21FdmVudChzdWJUYXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucyk7IH0pKGlubmVyRnJvbV8xLmlubmVyRnJvbSh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWFkZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHRhcmdldCcpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIubmV4dCgxIDwgYXJncy5sZW5ndGggPyBhcmdzIDogYXJnc1swXSk7XG4gICAgICAgIH07XG4gICAgICAgIGFkZChoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZShoYW5kbGVyKTsgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZnJvbUV2ZW50ID0gZnJvbUV2ZW50O1xuZnVuY3Rpb24gdG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBoYW5kbGVyKTsgfTsgfTtcbn1cbmZ1bmN0aW9uIGlzTm9kZVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih0YXJnZXQuYWRkTGlzdGVuZXIpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHRhcmdldC5yZW1vdmVMaXN0ZW5lcik7XG59XG5mdW5jdGlvbiBpc0pRdWVyeVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih0YXJnZXQub24pICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHRhcmdldC5vZmYpO1xufVxuZnVuY3Rpb24gaXNFdmVudFRhcmdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21FdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZnJvbUV2ZW50UGF0dGVybiA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG5mdW5jdGlvbiBmcm9tRXZlbnRQYXR0ZXJuKGFkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXIsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnRQYXR0ZXJuKGFkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXIpLnBpcGUobWFwT25lT3JNYW55QXJnc18xLm1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGVbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLm5leHQoZS5sZW5ndGggPT09IDEgPyBlWzBdIDogZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXRWYWx1ZSA9IGFkZEhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihyZW1vdmVIYW5kbGVyKSA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZUhhbmRsZXIoaGFuZGxlciwgcmV0VmFsdWUpOyB9IDogdW5kZWZpbmVkO1xuICAgIH0pO1xufVxuZXhwb3J0cy5mcm9tRXZlbnRQYXR0ZXJuID0gZnJvbUV2ZW50UGF0dGVybjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21FdmVudFBhdHRlcm4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZyb21TdWJzY3JpYmFibGUgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG5mdW5jdGlvbiBmcm9tU3Vic2NyaWJhYmxlKHN1YnNjcmliYWJsZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHN1YnNjcmliYWJsZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7IH0pO1xufVxuZXhwb3J0cy5mcm9tU3Vic2NyaWJhYmxlID0gZnJvbVN1YnNjcmliYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21TdWJzY3JpYmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGUgPSB2b2lkIDA7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xudmFyIGlzU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1NjaGVkdWxlclwiKTtcbnZhciBkZWZlcl8xID0gcmVxdWlyZShcIi4vZGVmZXJcIik7XG52YXIgc2NoZWR1bGVJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlZC9zY2hlZHVsZUl0ZXJhYmxlXCIpO1xuZnVuY3Rpb24gZ2VuZXJhdGUoaW5pdGlhbFN0YXRlT3JPcHRpb25zLCBjb25kaXRpb24sIGl0ZXJhdGUsIHJlc3VsdFNlbGVjdG9yT3JTY2hlZHVsZXIsIHNjaGVkdWxlcikge1xuICAgIHZhciBfYSwgX2I7XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yO1xuICAgIHZhciBpbml0aWFsU3RhdGU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgKF9hID0gaW5pdGlhbFN0YXRlT3JPcHRpb25zLCBpbml0aWFsU3RhdGUgPSBfYS5pbml0aWFsU3RhdGUsIGNvbmRpdGlvbiA9IF9hLmNvbmRpdGlvbiwgaXRlcmF0ZSA9IF9hLml0ZXJhdGUsIF9iID0gX2EucmVzdWx0U2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yID0gX2IgPT09IHZvaWQgMCA/IGlkZW50aXR5XzEuaWRlbnRpdHkgOiBfYiwgc2NoZWR1bGVyID0gX2Euc2NoZWR1bGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGluaXRpYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZU9yT3B0aW9ucztcbiAgICAgICAgaWYgKCFyZXN1bHRTZWxlY3Rvck9yU2NoZWR1bGVyIHx8IGlzU2NoZWR1bGVyXzEuaXNTY2hlZHVsZXIocmVzdWx0U2VsZWN0b3JPclNjaGVkdWxlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yID0gaWRlbnRpdHlfMS5pZGVudGl0eTtcbiAgICAgICAgICAgIHNjaGVkdWxlciA9IHJlc3VsdFNlbGVjdG9yT3JTY2hlZHVsZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yT3JTY2hlZHVsZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2VuKCkge1xuICAgICAgICB2YXIgc3RhdGU7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBpZiAoISghY29uZGl0aW9uIHx8IGNvbmRpdGlvbihzdGF0ZSkpKSByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHJlc3VsdFNlbGVjdG9yKHN0YXRlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gaXRlcmF0ZShzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmVyXzEuZGVmZXIoKHNjaGVkdWxlclxuICAgICAgICA/XG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlZHVsZUl0ZXJhYmxlXzEuc2NoZWR1bGVJdGVyYWJsZShnZW4oKSwgc2NoZWR1bGVyKTsgfVxuICAgICAgICA6XG4gICAgICAgICAgICBnZW4pKTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdlbmVyYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5paWYgPSB2b2lkIDA7XG52YXIgZGVmZXJfMSA9IHJlcXVpcmUoXCIuL2RlZmVyXCIpO1xuZnVuY3Rpb24gaWlmKGNvbmRpdGlvbiwgdHJ1ZVJlc3VsdCwgZmFsc2VSZXN1bHQpIHtcbiAgICByZXR1cm4gZGVmZXJfMS5kZWZlcihmdW5jdGlvbiAoKSB7IHJldHVybiAoY29uZGl0aW9uKCkgPyB0cnVlUmVzdWx0IDogZmFsc2VSZXN1bHQpOyB9KTtcbn1cbmV4cG9ydHMuaWlmID0gaWlmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWlmLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX2FzeW5jVmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX2FzeW5jVmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZyb21SZWFkYWJsZVN0cmVhbUxpa2UgPSBleHBvcnRzLmZyb21Bc3luY0l0ZXJhYmxlID0gZXhwb3J0cy5mcm9tSXRlcmFibGUgPSBleHBvcnRzLmZyb21Qcm9taXNlID0gZXhwb3J0cy5mcm9tQXJyYXlMaWtlID0gZXhwb3J0cy5mcm9tSW50ZXJvcE9ic2VydmFibGUgPSBleHBvcnRzLmlubmVyRnJvbSA9IHZvaWQgMDtcbnZhciBpc0FycmF5TGlrZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNBcnJheUxpa2VcIik7XG52YXIgaXNQcm9taXNlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1Byb21pc2VcIik7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaXNJbnRlcm9wT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNJbnRlcm9wT2JzZXJ2YWJsZVwiKTtcbnZhciBpc0FzeW5jSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzQXN5bmNJdGVyYWJsZVwiKTtcbnZhciB0aHJvd1Vub2JzZXJ2YWJsZUVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yXCIpO1xudmFyIGlzSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzSXRlcmFibGVcIik7XG52YXIgaXNSZWFkYWJsZVN0cmVhbUxpa2VfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgcmVwb3J0VW5oYW5kbGVkRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yXCIpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9zeW1ib2wvb2JzZXJ2YWJsZVwiKTtcbmZ1bmN0aW9uIGlubmVyRnJvbShpbnB1dCkge1xuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzSW50ZXJvcE9ic2VydmFibGVfMS5pc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21JbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlXzEuaXNBcnJheUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFycmF5TGlrZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvbWlzZV8xLmlzUHJvbWlzZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tUHJvbWlzZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXN5bmNJdGVyYWJsZV8xLmlzQXN5bmNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tQXN5bmNJdGVyYWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmFibGVfMS5pc0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21JdGVyYWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmVhZGFibGVTdHJlYW1MaWtlXzEuaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgdGhyb3dVbm9ic2VydmFibGVFcnJvcl8xLmNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yKGlucHV0KTtcbn1cbmV4cG9ydHMuaW5uZXJGcm9tID0gaW5uZXJGcm9tO1xuZnVuY3Rpb24gZnJvbUludGVyb3BPYnNlcnZhYmxlKG9iaikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIG9icyA9IG9ialtvYnNlcnZhYmxlXzEub2JzZXJ2YWJsZV0oKTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9icy5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBvYmplY3QgZG9lcyBub3QgY29ycmVjdGx5IGltcGxlbWVudCBTeW1ib2wub2JzZXJ2YWJsZScpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5mcm9tSW50ZXJvcE9ic2VydmFibGUgPSBmcm9tSW50ZXJvcE9ic2VydmFibGU7XG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlKGFycmF5KSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmZyb21BcnJheUxpa2UgPSBmcm9tQXJyYXlMaWtlO1xuZnVuY3Rpb24gZnJvbVByb21pc2UocHJvbWlzZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSlcbiAgICAgICAgICAgIC50aGVuKG51bGwsIHJlcG9ydFVuaGFuZGxlZEVycm9yXzEucmVwb3J0VW5oYW5kbGVkRXJyb3IpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5mcm9tUHJvbWlzZSA9IGZyb21Qcm9taXNlO1xuZnVuY3Rpb24gZnJvbUl0ZXJhYmxlKGl0ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZXJhYmxlXzEgPSBfX3ZhbHVlcyhpdGVyYWJsZSksIGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpOyAhaXRlcmFibGVfMV8xLmRvbmU7IGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaXRlcmFibGVfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8xXzEgJiYgIWl0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGl0ZXJhYmxlXzEucmV0dXJuKSkgX2EuY2FsbChpdGVyYWJsZV8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmZyb21JdGVyYWJsZSA9IGZyb21JdGVyYWJsZTtcbmZ1bmN0aW9uIGZyb21Bc3luY0l0ZXJhYmxlKGFzeW5jSXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb2Nlc3MoYXN5bmNJdGVyYWJsZSwgc3Vic2NyaWJlcikuY2F0Y2goZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZnJvbUFzeW5jSXRlcmFibGUgPSBmcm9tQXN5bmNJdGVyYWJsZTtcbmZ1bmN0aW9uIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UocmVhZGFibGVTdHJlYW0pIHtcbiAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUoaXNSZWFkYWJsZVN0cmVhbUxpa2VfMS5yZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSk7XG59XG5leHBvcnRzLmZyb21SZWFkYWJsZVN0cmVhbUxpa2UgPSBmcm9tUmVhZGFibGVTdHJlYW1MaWtlO1xuZnVuY3Rpb24gcHJvY2Vzcyhhc3luY0l0ZXJhYmxlLCBzdWJzY3JpYmVyKSB7XG4gICAgdmFyIGFzeW5jSXRlcmFibGVfMSwgYXN5bmNJdGVyYWJsZV8xXzE7XG4gICAgdmFyIGVfMiwgX2E7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUsIGVfMl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzAsIDUsIDYsIDExXSk7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jSXRlcmFibGVfMSA9IF9fYXN5bmNWYWx1ZXMoYXN5bmNJdGVyYWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCwgYXN5bmNJdGVyYWJsZV8xLm5leHQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShhc3luY0l0ZXJhYmxlXzFfMSA9IF9iLnNlbnQoKSwgIWFzeW5jSXRlcmFibGVfMV8xLmRvbmUpKSByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGFzeW5jSXRlcmFibGVfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMywgMTFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgZV8yXzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMTFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFs2LCAsIDksIDEwXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFzeW5jSXRlcmFibGVfMV8xICYmICFhc3luY0l0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGFzeW5jSXRlcmFibGVfMS5yZXR1cm4pKSkgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfYS5jYWxsKGFzeW5jSXRlcmFibGVfMSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDg7XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMsIDEwXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbm5lckZyb20uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmludGVydmFsID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIHRpbWVyXzEgPSByZXF1aXJlKFwiLi90aW1lclwiKTtcbmZ1bmN0aW9uIGludGVydmFsKHBlcmlvZCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHBlcmlvZCA9PT0gdm9pZCAwKSB7IHBlcmlvZCA9IDA7IH1cbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIGlmIChwZXJpb2QgPCAwKSB7XG4gICAgICAgIHBlcmlvZCA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aW1lcl8xLnRpbWVyKHBlcmlvZCwgcGVyaW9kLCBzY2hlZHVsZXIpO1xufVxuZXhwb3J0cy5pbnRlcnZhbCA9IGludGVydmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJ2YWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlID0gdm9pZCAwO1xudmFyIG1lcmdlQWxsXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL21lcmdlQWxsXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4vaW5uZXJGcm9tXCIpO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi9lbXB0eVwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG5mdW5jdGlvbiBtZXJnZSgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgdmFyIGNvbmN1cnJlbnQgPSBhcmdzXzEucG9wTnVtYmVyKGFyZ3MsIEluZmluaXR5KTtcbiAgICB2YXIgc291cmNlcyA9IGFyZ3M7XG4gICAgcmV0dXJuICFzb3VyY2VzLmxlbmd0aFxuICAgICAgICA/XG4gICAgICAgICAgICBlbXB0eV8xLkVNUFRZXG4gICAgICAgIDogc291cmNlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oc291cmNlc1swXSlcbiAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICBtZXJnZUFsbF8xLm1lcmdlQWxsKGNvbmN1cnJlbnQpKGZyb21fMS5mcm9tKHNvdXJjZXMsIHNjaGVkdWxlcikpO1xufVxuZXhwb3J0cy5tZXJnZSA9IG1lcmdlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5ldmVyID0gZXhwb3J0cy5ORVZFUiA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xuZXhwb3J0cy5ORVZFUiA9IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShub29wXzEubm9vcCk7XG5mdW5jdGlvbiBuZXZlcigpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5ORVZFUjtcbn1cbmV4cG9ydHMubmV2ZXIgPSBuZXZlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5ldmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vZiA9IHZvaWQgMDtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG5mdW5jdGlvbiBvZigpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgcmV0dXJuIGZyb21fMS5mcm9tKGFyZ3MsIHNjaGVkdWxlcik7XG59XG5leHBvcnRzLm9mID0gb2Y7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub25FcnJvclJlc3VtZU5leHQgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgYXJnc09yQXJnQXJyYXlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NPckFyZ0FycmF5XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbm9vcFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbmZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0KCkge1xuICAgIHZhciBzb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgbmV4dFNvdXJjZXMgPSBhcmdzT3JBcmdBcnJheV8xLmFyZ3NPckFyZ0FycmF5KHNvdXJjZXMpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHNvdXJjZUluZGV4ID0gMDtcbiAgICAgICAgdmFyIHN1YnNjcmliZU5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlSW5kZXggPCBuZXh0U291cmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0U291cmNlID0gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKG5leHRTb3VyY2VzW3NvdXJjZUluZGV4KytdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVOZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGlubmVyU3Vic2NyaWJlciA9IG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCBub29wXzEubm9vcCwgbm9vcF8xLm5vb3ApO1xuICAgICAgICAgICAgICAgIG5leHRTb3VyY2Uuc3Vic2NyaWJlKGlubmVyU3Vic2NyaWJlcik7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyLmFkZChzdWJzY3JpYmVOZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc3Vic2NyaWJlTmV4dCgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IG9uRXJyb3JSZXN1bWVOZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b25FcnJvclJlc3VtZU5leHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBhaXJzID0gdm9pZCAwO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG5mdW5jdGlvbiBwYWlycyhvYmosIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBmcm9tXzEuZnJvbShPYmplY3QuZW50cmllcyhvYmopLCBzY2hlZHVsZXIpO1xufVxuZXhwb3J0cy5wYWlycyA9IHBhaXJzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFpcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBhcnRpdGlvbiA9IHZvaWQgMDtcbnZhciBub3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vdFwiKTtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvZmlsdGVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4vaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gcGFydGl0aW9uKHNvdXJjZSwgcHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIFtmaWx0ZXJfMS5maWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKShpbm5lckZyb21fMS5pbm5lckZyb20oc291cmNlKSksIGZpbHRlcl8xLmZpbHRlcihub3RfMS5ub3QocHJlZGljYXRlLCB0aGlzQXJnKSkoaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHNvdXJjZSkpXTtcbn1cbmV4cG9ydHMucGFydGl0aW9uID0gcGFydGl0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFydGl0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYWNlSW5pdCA9IGV4cG9ydHMucmFjZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbnZhciBhcmdzT3JBcmdBcnJheV8xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc09yQXJnQXJyYXlcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHJhY2UoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHNvdXJjZXMgPSBhcmdzT3JBcmdBcnJheV8xLmFyZ3NPckFyZ0FycmF5KHNvdXJjZXMpO1xuICAgIHJldHVybiBzb3VyY2VzLmxlbmd0aCA9PT0gMSA/IGlubmVyRnJvbV8xLmlubmVyRnJvbShzb3VyY2VzWzBdKSA6IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShyYWNlSW5pdChzb3VyY2VzKSk7XG59XG5leHBvcnRzLnJhY2UgPSByYWNlO1xuZnVuY3Rpb24gcmFjZUluaXQoc291cmNlcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb25zLnB1c2goaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHNvdXJjZXNbaV0pLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCBzdWJzY3JpcHRpb25zLmxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICE9PSBpICYmIHN1YnNjcmlwdGlvbnNbc10udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBzdWJzY3JpcHRpb25zICYmICFzdWJzY3JpYmVyLmNsb3NlZCAmJiBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMShpKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLnJhY2VJbml0ID0gcmFjZUluaXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYW5nZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vZW1wdHlcIik7XG5mdW5jdGlvbiByYW5nZShzdGFydCwgY291bnQsIHNjaGVkdWxlcikge1xuICAgIGlmIChjb3VudCA9PSBudWxsKSB7XG4gICAgICAgIGNvdW50ID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgaWYgKGNvdW50IDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5XzEuRU1QVFk7XG4gICAgfVxuICAgIHZhciBlbmQgPSBjb3VudCArIHN0YXJ0O1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoc2NoZWR1bGVyXG4gICAgICAgID9cbiAgICAgICAgICAgIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gPCBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChuKyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIDpcbiAgICAgICAgICAgIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBzdGFydDtcbiAgICAgICAgICAgICAgICB3aGlsZSAobiA8IGVuZCAmJiAhc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG4rKyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xufVxuZXhwb3J0cy5yYW5nZSA9IHJhbmdlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmFuZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRocm93RXJyb3IgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIHRocm93RXJyb3IoZXJyb3JPckVycm9yRmFjdG9yeSwgc2NoZWR1bGVyKSB7XG4gICAgdmFyIGVycm9yRmFjdG9yeSA9IGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGVycm9yT3JFcnJvckZhY3RvcnkpID8gZXJyb3JPckVycm9yRmFjdG9yeSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVycm9yT3JFcnJvckZhY3Rvcnk7IH07XG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnJvckZhY3RvcnkoKSk7IH07XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShzY2hlZHVsZXIgPyBmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGluaXQsIDAsIHN1YnNjcmliZXIpOyB9IDogaW5pdCk7XG59XG5leHBvcnRzLnRocm93RXJyb3IgPSB0aHJvd0Vycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGltZXIgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgaXNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzU2NoZWR1bGVyXCIpO1xudmFyIGlzRGF0ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNEYXRlXCIpO1xuZnVuY3Rpb24gdGltZXIoZHVlVGltZSwgaW50ZXJ2YWxPclNjaGVkdWxlciwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKGR1ZVRpbWUgPT09IHZvaWQgMCkgeyBkdWVUaW1lID0gMDsgfVxuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSBhc3luY18xLmFzeW5jOyB9XG4gICAgdmFyIGludGVydmFsRHVyYXRpb24gPSAtMTtcbiAgICBpZiAoaW50ZXJ2YWxPclNjaGVkdWxlciAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc1NjaGVkdWxlcl8xLmlzU2NoZWR1bGVyKGludGVydmFsT3JTY2hlZHVsZXIpKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSBpbnRlcnZhbE9yU2NoZWR1bGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW50ZXJ2YWxEdXJhdGlvbiA9IGludGVydmFsT3JTY2hlZHVsZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZHVlID0gaXNEYXRlXzEuaXNWYWxpZERhdGUoZHVlVGltZSkgPyArZHVlVGltZSAtIHNjaGVkdWxlci5ub3coKSA6IGR1ZVRpbWU7XG4gICAgICAgIGlmIChkdWUgPCAwKSB7XG4gICAgICAgICAgICBkdWUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG4rKyk7XG4gICAgICAgICAgICAgICAgaWYgKDAgPD0gaW50ZXJ2YWxEdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHVuZGVmaW5lZCwgaW50ZXJ2YWxEdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkdWUpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50aW1lciA9IHRpbWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzaW5nID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4vaW5uZXJGcm9tXCIpO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi9lbXB0eVwiKTtcbmZ1bmN0aW9uIHVzaW5nKHJlc291cmNlRmFjdG9yeSwgb2JzZXJ2YWJsZUZhY3RvcnkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IHJlc291cmNlRmFjdG9yeSgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gb2JzZXJ2YWJsZUZhY3RvcnkocmVzb3VyY2UpO1xuICAgICAgICB2YXIgc291cmNlID0gcmVzdWx0ID8gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHJlc3VsdCkgOiBlbXB0eV8xLkVNUFRZO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudXNpbmcgPSB1c2luZztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzaW5nLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuemlwID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4vaW5uZXJGcm9tXCIpO1xudmFyIGFyZ3NPckFyZ0FycmF5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzT3JBcmdBcnJheVwiKTtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vZW1wdHlcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xuZnVuY3Rpb24gemlwKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0U2VsZWN0b3IgPSBhcmdzXzEucG9wUmVzdWx0U2VsZWN0b3IoYXJncyk7XG4gICAgdmFyIHNvdXJjZXMgPSBhcmdzT3JBcmdBcnJheV8xLmFyZ3NPckFyZ0FycmF5KGFyZ3MpO1xuICAgIHJldHVybiBzb3VyY2VzLmxlbmd0aFxuICAgICAgICA/IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlcnMgPSBzb3VyY2VzLm1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfSk7XG4gICAgICAgICAgICB2YXIgY29tcGxldGVkID0gc291cmNlcy5tYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlcnMgPSBjb21wbGV0ZWQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChzb3VyY2VJbmRleCkge1xuICAgICAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShzb3VyY2VzW3NvdXJjZUluZGV4XSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyc1tzb3VyY2VJbmRleF0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJzLmV2ZXJ5KGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5sZW5ndGg7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYnVmZmVycy5tYXAoZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLnNoaWZ0KCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdFNlbGVjdG9yID8gcmVzdWx0U2VsZWN0b3IuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQocmVzdWx0KSkpIDogcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJzLnNvbWUoZnVuY3Rpb24gKGJ1ZmZlciwgaSkgeyByZXR1cm4gIWJ1ZmZlci5sZW5ndGggJiYgY29tcGxldGVkW2ldOyB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkW3NvdXJjZUluZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICFidWZmZXJzW3NvdXJjZUluZGV4XS5sZW5ndGggJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBzb3VyY2VJbmRleCA9IDA7ICFzdWJzY3JpYmVyLmNsb3NlZCAmJiBzb3VyY2VJbmRleCA8IHNvdXJjZXMubGVuZ3RoOyBzb3VyY2VJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgX2xvb3BfMShzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlcnMgPSBjb21wbGV0ZWQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgOiBlbXB0eV8xLkVNUFRZO1xufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD16aXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PcGVyYXRvclN1YnNjcmliZXIgPSBleHBvcnRzLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciA9IHZvaWQgMDtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplKSB7XG4gICAgcmV0dXJuIG5ldyBPcGVyYXRvclN1YnNjcmliZXIoZGVzdGluYXRpb24sIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciwgb25GaW5hbGl6ZSk7XG59XG5leHBvcnRzLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciA9IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcjtcbnZhciBPcGVyYXRvclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPcGVyYXRvclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUsIHNob3VsZFVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5vbkZpbmFsaXplID0gb25GaW5hbGl6ZTtcbiAgICAgICAgX3RoaXMuc2hvdWxkVW5zdWJzY3JpYmUgPSBzaG91bGRVbnN1YnNjcmliZTtcbiAgICAgICAgX3RoaXMuX25leHQgPSBvbk5leHRcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25OZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fbmV4dDtcbiAgICAgICAgX3RoaXMuX2Vycm9yID0gb25FcnJvclxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9lcnJvcjtcbiAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gb25Db21wbGV0ZVxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9jb21wbGV0ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPcGVyYXRvclN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRVbnN1YnNjcmliZSB8fCB0aGlzLnNob3VsZFVuc3Vic2NyaWJlKCkpIHtcbiAgICAgICAgICAgIHZhciBjbG9zZWRfMSA9IHRoaXMuY2xvc2VkO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgIWNsb3NlZF8xICYmICgoX2EgPSB0aGlzLm9uRmluYWxpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9wZXJhdG9yU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbmV4cG9ydHMuT3BlcmF0b3JTdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T3BlcmF0b3JTdWJzY3JpYmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hdWRpdCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gYXVkaXQoZHVyYXRpb25TZWxlY3Rvcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgbGFzdFZhbHVlID0gbnVsbDtcbiAgICAgICAgdmFyIGR1cmF0aW9uU3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHZhciBlbmREdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uU3Vic2NyaWJlciA9PT0gbnVsbCB8fCBkdXJhdGlvblN1YnNjcmliZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGR1cmF0aW9uU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgZHVyYXRpb25TdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbGFzdFZhbHVlO1xuICAgICAgICAgICAgICAgIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzQ29tcGxldGUgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgY2xlYW51cER1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZHVyYXRpb25TdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgICAgIGlzQ29tcGxldGUgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKCFkdXJhdGlvblN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oZHVyYXRpb25TZWxlY3Rvcih2YWx1ZSkpLnN1YnNjcmliZSgoZHVyYXRpb25TdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGVuZER1cmF0aW9uLCBjbGVhbnVwRHVyYXRpb24pKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgKCFoYXNWYWx1ZSB8fCAhZHVyYXRpb25TdWJzY3JpYmVyIHx8IGR1cmF0aW9uU3Vic2NyaWJlci5jbG9zZWQpICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5hdWRpdCA9IGF1ZGl0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVkaXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmF1ZGl0VGltZSA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBhdWRpdF8xID0gcmVxdWlyZShcIi4vYXVkaXRcIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL3RpbWVyXCIpO1xuZnVuY3Rpb24gYXVkaXRUaW1lKGR1cmF0aW9uLCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIHJldHVybiBhdWRpdF8xLmF1ZGl0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRpbWVyXzEudGltZXIoZHVyYXRpb24sIHNjaGVkdWxlcik7IH0pO1xufVxuZXhwb3J0cy5hdWRpdFRpbWUgPSBhdWRpdFRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdWRpdFRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJ1ZmZlciA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiBidWZmZXIoY2xvc2luZ05vdGlmaWVyKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRCdWZmZXIgPSBbXTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBjdXJyZW50QnVmZmVyLnB1c2godmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoY3VycmVudEJ1ZmZlcik7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGNsb3NpbmdOb3RpZmllcikuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYiA9IGN1cnJlbnRCdWZmZXI7XG4gICAgICAgICAgICBjdXJyZW50QnVmZmVyID0gW107XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYik7XG4gICAgICAgIH0sIG5vb3BfMS5ub29wKSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjdXJyZW50QnVmZmVyID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuYnVmZmVyID0gYnVmZmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVmZmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5idWZmZXJDb3VudCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGFyclJlbW92ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJyUmVtb3ZlXCIpO1xuZnVuY3Rpb24gYnVmZmVyQ291bnQoYnVmZmVyU2l6ZSwgc3RhcnRCdWZmZXJFdmVyeSkge1xuICAgIGlmIChzdGFydEJ1ZmZlckV2ZXJ5ID09PSB2b2lkIDApIHsgc3RhcnRCdWZmZXJFdmVyeSA9IG51bGw7IH1cbiAgICBzdGFydEJ1ZmZlckV2ZXJ5ID0gc3RhcnRCdWZmZXJFdmVyeSAhPT0gbnVsbCAmJiBzdGFydEJ1ZmZlckV2ZXJ5ICE9PSB2b2lkIDAgPyBzdGFydEJ1ZmZlckV2ZXJ5IDogYnVmZmVyU2l6ZTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgYnVmZmVycyA9IFtdO1xuICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iO1xuICAgICAgICAgICAgdmFyIHRvRW1pdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoY291bnQrKyAlIHN0YXJ0QnVmZmVyRXZlcnkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBidWZmZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBidWZmZXJzXzEgPSBfX3ZhbHVlcyhidWZmZXJzKSwgYnVmZmVyc18xXzEgPSBidWZmZXJzXzEubmV4dCgpOyAhYnVmZmVyc18xXzEuZG9uZTsgYnVmZmVyc18xXzEgPSBidWZmZXJzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBidWZmZXJzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyU2l6ZSA8PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0VtaXQgPSB0b0VtaXQgIT09IG51bGwgJiYgdG9FbWl0ICE9PSB2b2lkIDAgPyB0b0VtaXQgOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvRW1pdC5wdXNoKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcnNfMV8xICYmICFidWZmZXJzXzFfMS5kb25lICYmIChfYSA9IGJ1ZmZlcnNfMS5yZXR1cm4pKSBfYS5jYWxsKGJ1ZmZlcnNfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b0VtaXQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0b0VtaXRfMSA9IF9fdmFsdWVzKHRvRW1pdCksIHRvRW1pdF8xXzEgPSB0b0VtaXRfMS5uZXh0KCk7ICF0b0VtaXRfMV8xLmRvbmU7IHRvRW1pdF8xXzEgPSB0b0VtaXRfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSB0b0VtaXRfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKGJ1ZmZlcnMsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvRW1pdF8xXzEgJiYgIXRvRW1pdF8xXzEuZG9uZSAmJiAoX2IgPSB0b0VtaXRfMS5yZXR1cm4pKSBfYi5jYWxsKHRvRW1pdF8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8zLCBfYTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYnVmZmVyc18yID0gX192YWx1ZXMoYnVmZmVycyksIGJ1ZmZlcnNfMl8xID0gYnVmZmVyc18yLm5leHQoKTsgIWJ1ZmZlcnNfMl8xLmRvbmU7IGJ1ZmZlcnNfMl8xID0gYnVmZmVyc18yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gYnVmZmVyc18yXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChidWZmZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyc18yXzEgJiYgIWJ1ZmZlcnNfMl8xLmRvbmUgJiYgKF9hID0gYnVmZmVyc18yLnJldHVybikpIF9hLmNhbGwoYnVmZmVyc18yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJ1ZmZlcnMgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmJ1ZmZlckNvdW50ID0gYnVmZmVyQ291bnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXJDb3VudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYnVmZmVyVGltZSA9IHZvaWQgMDtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBhcnJSZW1vdmVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyclJlbW92ZVwiKTtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIGV4ZWN1dGVTY2hlZHVsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlXCIpO1xuZnVuY3Rpb24gYnVmZmVyVGltZShidWZmZXJUaW1lU3Bhbikge1xuICAgIHZhciBfYSwgX2I7XG4gICAgdmFyIG90aGVyQXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIG90aGVyQXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IChfYSA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIob3RoZXJBcmdzKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYXN5bmNfMS5hc3luY1NjaGVkdWxlcjtcbiAgICB2YXIgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCA9IChfYiA9IG90aGVyQXJnc1swXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVsbDtcbiAgICB2YXIgbWF4QnVmZmVyU2l6ZSA9IG90aGVyQXJnc1sxXSB8fCBJbmZpbml0eTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgYnVmZmVyUmVjb3JkcyA9IFtdO1xuICAgICAgICB2YXIgcmVzdGFydE9uRW1pdCA9IGZhbHNlO1xuICAgICAgICB2YXIgZW1pdCA9IGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgIHZhciBidWZmZXIgPSByZWNvcmQuYnVmZmVyLCBzdWJzID0gcmVjb3JkLnN1YnM7XG4gICAgICAgICAgICBzdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBhcnJSZW1vdmVfMS5hcnJSZW1vdmUoYnVmZmVyUmVjb3JkcywgcmVjb3JkKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChidWZmZXIpO1xuICAgICAgICAgICAgcmVzdGFydE9uRW1pdCAmJiBzdGFydEJ1ZmZlcigpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc3RhcnRCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYnVmZmVyUmVjb3Jkcykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJzID0gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKHN1YnMpO1xuICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkXzEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogYnVmZmVyLFxuICAgICAgICAgICAgICAgICAgICBzdWJzOiBzdWJzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnVmZmVyUmVjb3Jkcy5wdXNoKHJlY29yZF8xKTtcbiAgICAgICAgICAgICAgICBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vicywgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBlbWl0KHJlY29yZF8xKTsgfSwgYnVmZmVyVGltZVNwYW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCAhPT0gbnVsbCAmJiBidWZmZXJDcmVhdGlvbkludGVydmFsID49IDApIHtcbiAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIHN0YXJ0QnVmZmVyLCBidWZmZXJDcmVhdGlvbkludGVydmFsLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3RhcnRPbkVtaXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0QnVmZmVyKCk7XG4gICAgICAgIHZhciBidWZmZXJUaW1lU3Vic2NyaWJlciA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAgICAgdmFyIHJlY29yZHNDb3B5ID0gYnVmZmVyUmVjb3Jkcy5zbGljZSgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByZWNvcmRzQ29weV8xID0gX192YWx1ZXMocmVjb3Jkc0NvcHkpLCByZWNvcmRzQ29weV8xXzEgPSByZWNvcmRzQ29weV8xLm5leHQoKTsgIXJlY29yZHNDb3B5XzFfMS5kb25lOyByZWNvcmRzQ29weV8xXzEgPSByZWNvcmRzQ29weV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gcmVjb3Jkc0NvcHlfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gcmVjb3JkLmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtYXhCdWZmZXJTaXplIDw9IGJ1ZmZlci5sZW5ndGggJiYgZW1pdChyZWNvcmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3Jkc0NvcHlfMV8xICYmICFyZWNvcmRzQ29weV8xXzEuZG9uZSAmJiAoX2EgPSByZWNvcmRzQ29weV8xLnJldHVybikpIF9hLmNhbGwocmVjb3Jkc0NvcHlfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlclJlY29yZHMgPT09IG51bGwgfHwgYnVmZmVyUmVjb3JkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogYnVmZmVyUmVjb3Jkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYnVmZmVyUmVjb3Jkcy5zaGlmdCgpLmJ1ZmZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXJUaW1lU3Vic2NyaWJlciA9PT0gbnVsbCB8fCBidWZmZXJUaW1lU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogYnVmZmVyVGltZVN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoYnVmZmVyUmVjb3JkcyA9IG51bGwpOyB9KTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShidWZmZXJUaW1lU3Vic2NyaWJlcik7XG4gICAgfSk7XG59XG5leHBvcnRzLmJ1ZmZlclRpbWUgPSBidWZmZXJUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVmZmVyVGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYnVmZmVyVG9nZ2xlID0gdm9pZCAwO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmlwdGlvblwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgYXJyUmVtb3ZlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcnJSZW1vdmVcIik7XG5mdW5jdGlvbiBidWZmZXJUb2dnbGUob3BlbmluZ3MsIGNsb3NpbmdTZWxlY3Rvcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBidWZmZXJzID0gW107XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShvcGVuaW5ncykuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAob3BlblZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gW107XG4gICAgICAgICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICAgICAgICAgIHZhciBjbG9zaW5nU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgdmFyIGVtaXRCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKGJ1ZmZlcnMsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgY2xvc2luZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNsb3NpbmdTdWJzY3JpcHRpb24uYWRkKGlubmVyRnJvbV8xLmlubmVyRnJvbShjbG9zaW5nU2VsZWN0b3Iob3BlblZhbHVlKSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBlbWl0QnVmZmVyLCBub29wXzEubm9vcCkpKTtcbiAgICAgICAgfSwgbm9vcF8xLm5vb3ApKTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYnVmZmVyc18xID0gX192YWx1ZXMoYnVmZmVycyksIGJ1ZmZlcnNfMV8xID0gYnVmZmVyc18xLm5leHQoKTsgIWJ1ZmZlcnNfMV8xLmRvbmU7IGJ1ZmZlcnNfMV8xID0gYnVmZmVyc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gYnVmZmVyc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcnNfMV8xICYmICFidWZmZXJzXzFfMS5kb25lICYmIChfYSA9IGJ1ZmZlcnNfMS5yZXR1cm4pKSBfYS5jYWxsKGJ1ZmZlcnNfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChidWZmZXJzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmJ1ZmZlclRvZ2dsZSA9IGJ1ZmZlclRvZ2dsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1ZmZlclRvZ2dsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYnVmZmVyV2hlbiA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiBidWZmZXJXaGVuKGNsb3NpbmdTZWxlY3Rvcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBudWxsO1xuICAgICAgICB2YXIgY2xvc2luZ1N1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB2YXIgb3BlbkJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsb3NpbmdTdWJzY3JpYmVyID09PSBudWxsIHx8IGNsb3NpbmdTdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbG9zaW5nU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdmFyIGIgPSBidWZmZXI7XG4gICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgIGIgJiYgc3Vic2NyaWJlci5uZXh0KGIpO1xuICAgICAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGNsb3NpbmdTZWxlY3RvcigpKS5zdWJzY3JpYmUoKGNsb3NpbmdTdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIG9wZW5CdWZmZXIsIG5vb3BfMS5ub29wKSkpO1xuICAgICAgICB9O1xuICAgICAgICBvcGVuQnVmZmVyKCk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gYnVmZmVyID09PSBudWxsIHx8IGJ1ZmZlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogYnVmZmVyLnB1c2godmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidWZmZXIgJiYgc3Vic2NyaWJlci5uZXh0KGJ1ZmZlcik7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGJ1ZmZlciA9IGNsb3NpbmdTdWJzY3JpYmVyID0gbnVsbCk7IH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuYnVmZmVyV2hlbiA9IGJ1ZmZlcldoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXJXaGVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jYXRjaEVycm9yID0gdm9pZCAwO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG5mdW5jdGlvbiBjYXRjaEVycm9yKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGlubmVyU3ViID0gbnVsbDtcbiAgICAgICAgdmFyIHN5bmNVbnN1YiA9IGZhbHNlO1xuICAgICAgICB2YXIgaGFuZGxlZFJlc3VsdDtcbiAgICAgICAgaW5uZXJTdWIgPSBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaGFuZGxlZFJlc3VsdCA9IGlubmVyRnJvbV8xLmlubmVyRnJvbShzZWxlY3RvcihlcnIsIGNhdGNoRXJyb3Ioc2VsZWN0b3IpKHNvdXJjZSkpKTtcbiAgICAgICAgICAgIGlmIChpbm5lclN1Yikge1xuICAgICAgICAgICAgICAgIGlubmVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGhhbmRsZWRSZXN1bHQuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3luY1Vuc3ViID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAoc3luY1Vuc3ViKSB7XG4gICAgICAgICAgICBpbm5lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgaW5uZXJTdWIgPSBudWxsO1xuICAgICAgICAgICAgaGFuZGxlZFJlc3VsdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuY2F0Y2hFcnJvciA9IGNhdGNoRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYXRjaEVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb21iaW5lQWxsID0gdm9pZCAwO1xudmFyIGNvbWJpbmVMYXRlc3RBbGxfMSA9IHJlcXVpcmUoXCIuL2NvbWJpbmVMYXRlc3RBbGxcIik7XG5leHBvcnRzLmNvbWJpbmVBbGwgPSBjb21iaW5lTGF0ZXN0QWxsXzEuY29tYmluZUxhdGVzdEFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbWJpbmVBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb21iaW5lTGF0ZXN0ID0gdm9pZCAwO1xudmFyIGNvbWJpbmVMYXRlc3RfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3RcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBhcmdzT3JBcmdBcnJheV8xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc09yQXJnQXJyYXlcIik7XG52YXIgbWFwT25lT3JNYW55QXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvbWFwT25lT3JNYW55QXJnc1wiKTtcbnZhciBwaXBlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9waXBlXCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG5mdW5jdGlvbiBjb21iaW5lTGF0ZXN0KCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0U2VsZWN0b3IgPSBhcmdzXzEucG9wUmVzdWx0U2VsZWN0b3IoYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdFNlbGVjdG9yXG4gICAgICAgID8gcGlwZV8xLnBpcGUoY29tYmluZUxhdGVzdC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpLCBtYXBPbmVPck1hbnlBcmdzXzEubWFwT25lT3JNYW55QXJncyhyZXN1bHRTZWxlY3RvcikpXG4gICAgICAgIDogbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgY29tYmluZUxhdGVzdF8xLmNvbWJpbmVMYXRlc3RJbml0KF9fc3ByZWFkQXJyYXkoW3NvdXJjZV0sIF9fcmVhZChhcmdzT3JBcmdBcnJheV8xLmFyZ3NPckFyZ0FycmF5KGFyZ3MpKSkpKHN1YnNjcmliZXIpO1xuICAgICAgICB9KTtcbn1cbmV4cG9ydHMuY29tYmluZUxhdGVzdCA9IGNvbWJpbmVMYXRlc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lTGF0ZXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb21iaW5lTGF0ZXN0QWxsID0gdm9pZCAwO1xudmFyIGNvbWJpbmVMYXRlc3RfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3RcIik7XG52YXIgam9pbkFsbEludGVybmFsc18xID0gcmVxdWlyZShcIi4vam9pbkFsbEludGVybmFsc1wiKTtcbmZ1bmN0aW9uIGNvbWJpbmVMYXRlc3RBbGwocHJvamVjdCkge1xuICAgIHJldHVybiBqb2luQWxsSW50ZXJuYWxzXzEuam9pbkFsbEludGVybmFscyhjb21iaW5lTGF0ZXN0XzEuY29tYmluZUxhdGVzdCwgcHJvamVjdCk7XG59XG5leHBvcnRzLmNvbWJpbmVMYXRlc3RBbGwgPSBjb21iaW5lTGF0ZXN0QWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tYmluZUxhdGVzdEFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbWJpbmVMYXRlc3RXaXRoID0gdm9pZCAwO1xudmFyIGNvbWJpbmVMYXRlc3RfMSA9IHJlcXVpcmUoXCIuL2NvbWJpbmVMYXRlc3RcIik7XG5mdW5jdGlvbiBjb21iaW5lTGF0ZXN0V2l0aCgpIHtcbiAgICB2YXIgb3RoZXJTb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgb3RoZXJTb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0XzEuY29tYmluZUxhdGVzdC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChvdGhlclNvdXJjZXMpKSk7XG59XG5leHBvcnRzLmNvbWJpbmVMYXRlc3RXaXRoID0gY29tYmluZUxhdGVzdFdpdGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lTGF0ZXN0V2l0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmNhdCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGNvbmNhdEFsbF8xID0gcmVxdWlyZShcIi4vY29uY2F0QWxsXCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG52YXIgZnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvZnJvbVwiKTtcbmZ1bmN0aW9uIGNvbmNhdCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgY29uY2F0QWxsXzEuY29uY2F0QWxsKCkoZnJvbV8xLmZyb20oX19zcHJlYWRBcnJheShbc291cmNlXSwgX19yZWFkKGFyZ3MpKSwgc2NoZWR1bGVyKSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5jb25jYXQgPSBjb25jYXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmNhdEFsbCA9IHZvaWQgMDtcbnZhciBtZXJnZUFsbF8xID0gcmVxdWlyZShcIi4vbWVyZ2VBbGxcIik7XG5mdW5jdGlvbiBjb25jYXRBbGwoKSB7XG4gICAgcmV0dXJuIG1lcmdlQWxsXzEubWVyZ2VBbGwoMSk7XG59XG5leHBvcnRzLmNvbmNhdEFsbCA9IGNvbmNhdEFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdEFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29uY2F0TWFwID0gdm9pZCAwO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi9tZXJnZU1hcFwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gY29uY2F0TWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHJlc3VsdFNlbGVjdG9yKSA/IG1lcmdlTWFwXzEubWVyZ2VNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IsIDEpIDogbWVyZ2VNYXBfMS5tZXJnZU1hcChwcm9qZWN0LCAxKTtcbn1cbmV4cG9ydHMuY29uY2F0TWFwID0gY29uY2F0TWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uY2F0TWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb25jYXRNYXBUbyA9IHZvaWQgMDtcbnZhciBjb25jYXRNYXBfMSA9IHJlcXVpcmUoXCIuL2NvbmNhdE1hcFwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gY29uY2F0TWFwVG8oaW5uZXJPYnNlcnZhYmxlLCByZXN1bHRTZWxlY3Rvcikge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihyZXN1bHRTZWxlY3RvcikgPyBjb25jYXRNYXBfMS5jb25jYXRNYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5uZXJPYnNlcnZhYmxlOyB9LCByZXN1bHRTZWxlY3RvcikgOiBjb25jYXRNYXBfMS5jb25jYXRNYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5uZXJPYnNlcnZhYmxlOyB9KTtcbn1cbmV4cG9ydHMuY29uY2F0TWFwVG8gPSBjb25jYXRNYXBUbztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdE1hcFRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29uY2F0V2l0aCA9IHZvaWQgMDtcbnZhciBjb25jYXRfMSA9IHJlcXVpcmUoXCIuL2NvbmNhdFwiKTtcbmZ1bmN0aW9uIGNvbmNhdFdpdGgoKSB7XG4gICAgdmFyIG90aGVyU291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIG90aGVyU291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gY29uY2F0XzEuY29uY2F0LmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKG90aGVyU291cmNlcykpKTtcbn1cbmV4cG9ydHMuY29uY2F0V2l0aCA9IGNvbmNhdFdpdGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXRXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb25uZWN0ID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgZnJvbVN1YnNjcmliYWJsZV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvZnJvbVN1YnNjcmliYWJsZVwiKTtcbnZhciBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBjb25uZWN0b3I6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpOyB9LFxufTtcbmZ1bmN0aW9uIGNvbm5lY3Qoc2VsZWN0b3IsIGNvbmZpZykge1xuICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSBERUZBVUxUX0NPTkZJRzsgfVxuICAgIHZhciBjb25uZWN0b3IgPSBjb25maWcuY29ubmVjdG9yO1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gY29ubmVjdG9yKCk7XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShzZWxlY3Rvcihmcm9tU3Vic2NyaWJhYmxlXzEuZnJvbVN1YnNjcmliYWJsZShzdWJqZWN0KSkpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgc3Vic2NyaWJlci5hZGQoc291cmNlLnN1YnNjcmliZShzdWJqZWN0KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmNvbm5lY3QgPSBjb25uZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29ubmVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY291bnQgPSB2b2lkIDA7XG52YXIgcmVkdWNlXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2VcIik7XG5mdW5jdGlvbiBjb3VudChwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gcmVkdWNlXzEucmVkdWNlKGZ1bmN0aW9uICh0b3RhbCwgdmFsdWUsIGkpIHsgcmV0dXJuICghcHJlZGljYXRlIHx8IHByZWRpY2F0ZSh2YWx1ZSwgaSkgPyB0b3RhbCArIDEgOiB0b3RhbCk7IH0sIDApO1xufVxuZXhwb3J0cy5jb3VudCA9IGNvdW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y291bnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlYm91bmNlID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbm9vcFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbmZ1bmN0aW9uIGRlYm91bmNlKGR1cmF0aW9uU2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIHZhciBkdXJhdGlvblN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB2YXIgZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uU3Vic2NyaWJlciA9PT0gbnVsbCB8fCBkdXJhdGlvblN1YnNjcmliZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGR1cmF0aW9uU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgZHVyYXRpb25TdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbGFzdFZhbHVlO1xuICAgICAgICAgICAgICAgIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBkdXJhdGlvblN1YnNjcmliZXIgPT09IG51bGwgfHwgZHVyYXRpb25TdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkdXJhdGlvblN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgZHVyYXRpb25TdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGVtaXQsIG5vb3BfMS5ub29wKTtcbiAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShkdXJhdGlvblNlbGVjdG9yKHZhbHVlKSkuc3Vic2NyaWJlKGR1cmF0aW9uU3Vic2NyaWJlcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVtaXQoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSBkdXJhdGlvblN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlYm91bmNlID0gZGVib3VuY2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWJvdW5jZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVib3VuY2VUaW1lID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBkZWJvdW5jZVRpbWUoZHVlVGltZSwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgYWN0aXZlVGFzayA9IG51bGw7XG4gICAgICAgIHZhciBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSBudWxsO1xuICAgICAgICB2YXIgZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFzay51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxhc3RWYWx1ZTtcbiAgICAgICAgICAgICAgICBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGVtaXRXaGVuSWRsZSgpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRUaW1lID0gbGFzdFRpbWUgKyBkdWVUaW1lO1xuICAgICAgICAgICAgdmFyIG5vdyA9IHNjaGVkdWxlci5ub3coKTtcbiAgICAgICAgICAgIGlmIChub3cgPCB0YXJnZXRUaW1lKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFzayA9IHRoaXMuc2NoZWR1bGUodW5kZWZpbmVkLCB0YXJnZXRUaW1lIC0gbm93KTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChhY3RpdmVUYXNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbWl0KCk7XG4gICAgICAgIH1cbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gc2NoZWR1bGVyLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFhY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFzayA9IHNjaGVkdWxlci5zY2hlZHVsZShlbWl0V2hlbklkbGUsIGR1ZVRpbWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKGFjdGl2ZVRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbWl0KCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGFzdFZhbHVlID0gYWN0aXZlVGFzayA9IG51bGw7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVib3VuY2VUaW1lID0gZGVib3VuY2VUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2VUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0SWZFbXB0eSA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gZGVmYXVsdElmRW1wdHkoZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHRJZkVtcHR5ID0gZGVmYXVsdElmRW1wdHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0SWZFbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVsYXkgPSB2b2lkIDA7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgZGVsYXlXaGVuXzEgPSByZXF1aXJlKFwiLi9kZWxheVdoZW5cIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL3RpbWVyXCIpO1xuZnVuY3Rpb24gZGVsYXkoZHVlLCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIHZhciBkdXJhdGlvbiA9IHRpbWVyXzEudGltZXIoZHVlLCBzY2hlZHVsZXIpO1xuICAgIHJldHVybiBkZWxheVdoZW5fMS5kZWxheVdoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZHVyYXRpb247IH0pO1xufVxuZXhwb3J0cy5kZWxheSA9IGRlbGF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVsYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlbGF5V2hlbiA9IHZvaWQgMDtcbnZhciBjb25jYXRfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2NvbmNhdFwiKTtcbnZhciB0YWtlXzEgPSByZXF1aXJlKFwiLi90YWtlXCIpO1xudmFyIGlnbm9yZUVsZW1lbnRzXzEgPSByZXF1aXJlKFwiLi9pZ25vcmVFbGVtZW50c1wiKTtcbnZhciBtYXBUb18xID0gcmVxdWlyZShcIi4vbWFwVG9cIik7XG52YXIgbWVyZ2VNYXBfMSA9IHJlcXVpcmUoXCIuL21lcmdlTWFwXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gZGVsYXlXaGVuKGRlbGF5RHVyYXRpb25TZWxlY3Rvciwgc3Vic2NyaXB0aW9uRGVsYXkpIHtcbiAgICBpZiAoc3Vic2NyaXB0aW9uRGVsYXkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25jYXRfMS5jb25jYXQoc3Vic2NyaXB0aW9uRGVsYXkucGlwZSh0YWtlXzEudGFrZSgxKSwgaWdub3JlRWxlbWVudHNfMS5pZ25vcmVFbGVtZW50cygpKSwgc291cmNlLnBpcGUoZGVsYXlXaGVuKGRlbGF5RHVyYXRpb25TZWxlY3RvcikpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlTWFwXzEubWVyZ2VNYXAoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkgeyByZXR1cm4gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGRlbGF5RHVyYXRpb25TZWxlY3Rvcih2YWx1ZSwgaW5kZXgpKS5waXBlKHRha2VfMS50YWtlKDEpLCBtYXBUb18xLm1hcFRvKHZhbHVlKSk7IH0pO1xufVxuZXhwb3J0cy5kZWxheVdoZW4gPSBkZWxheVdoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWxheVdoZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlbWF0ZXJpYWxpemUgPSB2b2lkIDA7XG52YXIgTm90aWZpY2F0aW9uXzEgPSByZXF1aXJlKFwiLi4vTm90aWZpY2F0aW9uXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBkZW1hdGVyaWFsaXplKCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHsgcmV0dXJuIE5vdGlmaWNhdGlvbl8xLm9ic2VydmVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKTsgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5kZW1hdGVyaWFsaXplID0gZGVtYXRlcmlhbGl6ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlbWF0ZXJpYWxpemUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRpc3RpbmN0ID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbm9vcFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbmZ1bmN0aW9uIGRpc3RpbmN0KGtleVNlbGVjdG9yLCBmbHVzaGVzKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGRpc3RpbmN0S2V5cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5U2VsZWN0b3IgPyBrZXlTZWxlY3Rvcih2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgIGlmICghZGlzdGluY3RLZXlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGlzdGluY3RLZXlzLmFkZChrZXkpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgZmx1c2hlcyAmJiBpbm5lckZyb21fMS5pbm5lckZyb20oZmx1c2hlcykuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBkaXN0aW5jdEtleXMuY2xlYXIoKTsgfSwgbm9vcF8xLm5vb3ApKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGlzdGluY3QgPSBkaXN0aW5jdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3RpbmN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kaXN0aW5jdFVudGlsQ2hhbmdlZCA9IHZvaWQgMDtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmF0b3IsIGtleVNlbGVjdG9yKSB7XG4gICAgaWYgKGtleVNlbGVjdG9yID09PSB2b2lkIDApIHsga2V5U2VsZWN0b3IgPSBpZGVudGl0eV8xLmlkZW50aXR5OyB9XG4gICAgY29tcGFyYXRvciA9IGNvbXBhcmF0b3IgIT09IG51bGwgJiYgY29tcGFyYXRvciAhPT0gdm9pZCAwID8gY29tcGFyYXRvciA6IGRlZmF1bHRDb21wYXJlO1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBwcmV2aW91c0tleTtcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleVNlbGVjdG9yKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaXJzdCB8fCAhY29tcGFyYXRvcihwcmV2aW91c0tleSwgY3VycmVudEtleSkpIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzS2V5ID0gY3VycmVudEtleTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRpc3RpbmN0VW50aWxDaGFuZ2VkID0gZGlzdGluY3RVbnRpbENoYW5nZWQ7XG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXN0aW5jdFVudGlsQ2hhbmdlZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGlzdGluY3RVbnRpbEtleUNoYW5nZWQgPSB2b2lkIDA7XG52YXIgZGlzdGluY3RVbnRpbENoYW5nZWRfMSA9IHJlcXVpcmUoXCIuL2Rpc3RpbmN0VW50aWxDaGFuZ2VkXCIpO1xuZnVuY3Rpb24gZGlzdGluY3RVbnRpbEtleUNoYW5nZWQoa2V5LCBjb21wYXJlKSB7XG4gICAgcmV0dXJuIGRpc3RpbmN0VW50aWxDaGFuZ2VkXzEuZGlzdGluY3RVbnRpbENoYW5nZWQoZnVuY3Rpb24gKHgsIHkpIHsgcmV0dXJuIChjb21wYXJlID8gY29tcGFyZSh4W2tleV0sIHlba2V5XSkgOiB4W2tleV0gPT09IHlba2V5XSk7IH0pO1xufVxuZXhwb3J0cy5kaXN0aW5jdFVudGlsS2V5Q2hhbmdlZCA9IGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlzdGluY3RVbnRpbEtleUNoYW5nZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmVsZW1lbnRBdCA9IHZvaWQgMDtcbnZhciBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JcIik7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKFwiLi9maWx0ZXJcIik7XG52YXIgdGhyb3dJZkVtcHR5XzEgPSByZXF1aXJlKFwiLi90aHJvd0lmRW1wdHlcIik7XG52YXIgZGVmYXVsdElmRW1wdHlfMSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRJZkVtcHR5XCIpO1xudmFyIHRha2VfMSA9IHJlcXVpcmUoXCIuL3Rha2VcIik7XG5mdW5jdGlvbiBlbGVtZW50QXQoaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXzEuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIGhhc0RlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnBpcGUoZmlsdGVyXzEuZmlsdGVyKGZ1bmN0aW9uICh2LCBpKSB7IHJldHVybiBpID09PSBpbmRleDsgfSksIHRha2VfMS50YWtlKDEpLCBoYXNEZWZhdWx0VmFsdWUgPyBkZWZhdWx0SWZFbXB0eV8xLmRlZmF1bHRJZkVtcHR5KGRlZmF1bHRWYWx1ZSkgOiB0aHJvd0lmRW1wdHlfMS50aHJvd0lmRW1wdHkoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXzEuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IoKTsgfSkpO1xuICAgIH07XG59XG5leHBvcnRzLmVsZW1lbnRBdCA9IGVsZW1lbnRBdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVsZW1lbnRBdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmVuZFdpdGggPSB2b2lkIDA7XG52YXIgY29uY2F0XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9jb25jYXRcIik7XG52YXIgb2ZfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL29mXCIpO1xuZnVuY3Rpb24gZW5kV2l0aCgpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFsdWVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7IHJldHVybiBjb25jYXRfMS5jb25jYXQoc291cmNlLCBvZl8xLm9mLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHZhbHVlcykpKSk7IH07XG59XG5leHBvcnRzLmVuZFdpdGggPSBlbmRXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW5kV2l0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXZlcnkgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGV2ZXJ5KHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgrKywgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZXZlcnkgPSBldmVyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZXJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leGhhdXN0ID0gdm9pZCAwO1xudmFyIGV4aGF1c3RBbGxfMSA9IHJlcXVpcmUoXCIuL2V4aGF1c3RBbGxcIik7XG5leHBvcnRzLmV4aGF1c3QgPSBleGhhdXN0QWxsXzEuZXhoYXVzdEFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4aGF1c3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4aGF1c3RBbGwgPSB2b2lkIDA7XG52YXIgZXhoYXVzdE1hcF8xID0gcmVxdWlyZShcIi4vZXhoYXVzdE1hcFwiKTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG5mdW5jdGlvbiBleGhhdXN0QWxsKCkge1xuICAgIHJldHVybiBleGhhdXN0TWFwXzEuZXhoYXVzdE1hcChpZGVudGl0eV8xLmlkZW50aXR5KTtcbn1cbmV4cG9ydHMuZXhoYXVzdEFsbCA9IGV4aGF1c3RBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGhhdXN0QWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leGhhdXN0TWFwID0gdm9pZCAwO1xudmFyIG1hcF8xID0gcmVxdWlyZShcIi4vbWFwXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBleGhhdXN0TWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLnBpcGUoZXhoYXVzdE1hcChmdW5jdGlvbiAoYSwgaSkgeyByZXR1cm4gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHByb2plY3QoYSwgaSkpLnBpcGUobWFwXzEubWFwKGZ1bmN0aW9uIChiLCBpaSkgeyByZXR1cm4gcmVzdWx0U2VsZWN0b3IoYSwgYiwgaSwgaWkpOyB9KSk7IH0pKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIGlubmVyU3ViID0gbnVsbDtcbiAgICAgICAgdmFyIGlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKG91dGVyVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghaW5uZXJTdWIpIHtcbiAgICAgICAgICAgICAgICBpbm5lclN1YiA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJTdWIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20ocHJvamVjdChvdXRlclZhbHVlLCBpbmRleCsrKSkuc3Vic2NyaWJlKGlubmVyU3ViKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAhaW5uZXJTdWIgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmV4aGF1c3RNYXAgPSBleGhhdXN0TWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhoYXVzdE1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXhwYW5kID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgbWVyZ2VJbnRlcm5hbHNfMSA9IHJlcXVpcmUoXCIuL21lcmdlSW50ZXJuYWxzXCIpO1xuZnVuY3Rpb24gZXhwYW5kKHByb2plY3QsIGNvbmN1cnJlbnQsIHNjaGVkdWxlcikge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IEluZmluaXR5OyB9XG4gICAgY29uY3VycmVudCA9IChjb25jdXJyZW50IHx8IDApIDwgMSA/IEluZmluaXR5IDogY29uY3VycmVudDtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gbWVyZ2VJbnRlcm5hbHNfMS5tZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQsIHVuZGVmaW5lZCwgdHJ1ZSwgc2NoZWR1bGVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZXhwYW5kID0gZXhwYW5kO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhwYW5kLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5maWx0ZXIgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCsrKSAmJiBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmZpbHRlciA9IGZpbHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmluYWxpemUgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbmZ1bmN0aW9uIGZpbmFsaXplKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZmluYWxpemUgPSBmaW5hbGl6ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbmFsaXplLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVGaW5kID0gZXhwb3J0cy5maW5kID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBmaW5kKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShjcmVhdGVGaW5kKHByZWRpY2F0ZSwgdGhpc0FyZywgJ3ZhbHVlJykpO1xufVxuZXhwb3J0cy5maW5kID0gZmluZDtcbmZ1bmN0aW9uIGNyZWF0ZUZpbmQocHJlZGljYXRlLCB0aGlzQXJnLCBlbWl0KSB7XG4gICAgdmFyIGZpbmRJbmRleCA9IGVtaXQgPT09ICdpbmRleCc7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGluZGV4Kys7XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmluZEluZGV4ID8gaSA6IHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChmaW5kSW5kZXggPyAtMSA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pKTtcbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVGaW5kID0gY3JlYXRlRmluZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZpbmRJbmRleCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGZpbmRfMSA9IHJlcXVpcmUoXCIuL2ZpbmRcIik7XG5mdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZpbmRfMS5jcmVhdGVGaW5kKHByZWRpY2F0ZSwgdGhpc0FyZywgJ2luZGV4JykpO1xufVxuZXhwb3J0cy5maW5kSW5kZXggPSBmaW5kSW5kZXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maW5kSW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZpcnN0ID0gdm9pZCAwO1xudmFyIEVtcHR5RXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL0VtcHR5RXJyb3JcIik7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKFwiLi9maWx0ZXJcIik7XG52YXIgdGFrZV8xID0gcmVxdWlyZShcIi4vdGFrZVwiKTtcbnZhciBkZWZhdWx0SWZFbXB0eV8xID0gcmVxdWlyZShcIi4vZGVmYXVsdElmRW1wdHlcIik7XG52YXIgdGhyb3dJZkVtcHR5XzEgPSByZXF1aXJlKFwiLi90aHJvd0lmRW1wdHlcIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xuZnVuY3Rpb24gZmlyc3QocHJlZGljYXRlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgaGFzRGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UucGlwZShwcmVkaWNhdGUgPyBmaWx0ZXJfMS5maWx0ZXIoZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIHByZWRpY2F0ZSh2LCBpLCBzb3VyY2UpOyB9KSA6IGlkZW50aXR5XzEuaWRlbnRpdHksIHRha2VfMS50YWtlKDEpLCBoYXNEZWZhdWx0VmFsdWUgPyBkZWZhdWx0SWZFbXB0eV8xLmRlZmF1bHRJZkVtcHR5KGRlZmF1bHRWYWx1ZSkgOiB0aHJvd0lmRW1wdHlfMS50aHJvd0lmRW1wdHkoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEVtcHR5RXJyb3JfMS5FbXB0eUVycm9yKCk7IH0pKTtcbiAgICB9O1xufVxuZXhwb3J0cy5maXJzdCA9IGZpcnN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zmlyc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZsYXRNYXAgPSB2b2lkIDA7XG52YXIgbWVyZ2VNYXBfMSA9IHJlcXVpcmUoXCIuL21lcmdlTWFwXCIpO1xuZXhwb3J0cy5mbGF0TWFwID0gbWVyZ2VNYXBfMS5tZXJnZU1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZsYXRNYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdyb3VwQnkgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1N1YmplY3RcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGdyb3VwQnkoa2V5U2VsZWN0b3IsIGVsZW1lbnRPck9wdGlvbnMsIGR1cmF0aW9uLCBjb25uZWN0b3IpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgaWYgKCFlbGVtZW50T3JPcHRpb25zIHx8IHR5cGVvZiBlbGVtZW50T3JPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudE9yT3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIChkdXJhdGlvbiA9IGVsZW1lbnRPck9wdGlvbnMuZHVyYXRpb24sIGVsZW1lbnQgPSBlbGVtZW50T3JPcHRpb25zLmVsZW1lbnQsIGNvbm5lY3RvciA9IGVsZW1lbnRPck9wdGlvbnMuY29ubmVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ3JvdXBzID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgbm90aWZ5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBncm91cHMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICBjYihzdWJzY3JpYmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGhhbmRsZUVycm9yID0gZnVuY3Rpb24gKGVycikgeyByZXR1cm4gbm90aWZ5KGZ1bmN0aW9uIChjb25zdW1lcikgeyByZXR1cm4gY29uc3VtZXIuZXJyb3IoZXJyKTsgfSk7IH07XG4gICAgICAgIHZhciBhY3RpdmVHcm91cHMgPSAwO1xuICAgICAgICB2YXIgdGVhcmRvd25BdHRlbXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGdyb3VwQnlTb3VyY2VTdWJzY3JpYmVyID0gbmV3IE9wZXJhdG9yU3Vic2NyaWJlcl8xLk9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleV8xID0ga2V5U2VsZWN0b3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIHZhciBncm91cF8xID0gZ3JvdXBzLmdldChrZXlfMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFncm91cF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5zZXQoa2V5XzEsIChncm91cF8xID0gY29ubmVjdG9yID8gY29ubmVjdG9yKCkgOiBuZXcgU3ViamVjdF8xLlN1YmplY3QoKSkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBlZCA9IGNyZWF0ZUdyb3VwZWRPYnNlcnZhYmxlKGtleV8xLCBncm91cF8xKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGdyb3VwZWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvblN1YnNjcmliZXJfMSA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihncm91cF8xLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfMS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uU3Vic2NyaWJlcl8xID09PSBudWxsIHx8IGR1cmF0aW9uU3Vic2NyaWJlcl8xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkdXJhdGlvblN1YnNjcmliZXJfMS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdyb3Vwcy5kZWxldGUoa2V5XzEpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQnlTb3VyY2VTdWJzY3JpYmVyLmFkZChpbm5lckZyb21fMS5pbm5lckZyb20oZHVyYXRpb24oZ3JvdXBlZCkpLnN1YnNjcmliZShkdXJhdGlvblN1YnNjcmliZXJfMSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdyb3VwXzEubmV4dChlbGVtZW50ID8gZWxlbWVudCh2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbm90aWZ5KGZ1bmN0aW9uIChjb25zdW1lcikgeyByZXR1cm4gY29uc3VtZXIuY29tcGxldGUoKTsgfSk7IH0sIGhhbmRsZUVycm9yLCBmdW5jdGlvbiAoKSB7IHJldHVybiBncm91cHMuY2xlYXIoKTsgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGVhcmRvd25BdHRlbXB0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZUdyb3VwcyA9PT0gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoZ3JvdXBCeVNvdXJjZVN1YnNjcmliZXIpO1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVHcm91cGVkT2JzZXJ2YWJsZShrZXksIGdyb3VwU3ViamVjdCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoZ3JvdXBTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlR3JvdXBzKys7XG4gICAgICAgICAgICAgICAgdmFyIGlubmVyU3ViID0gZ3JvdXBTdWJqZWN0LnN1YnNjcmliZShncm91cFN1YnNjcmliZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIC0tYWN0aXZlR3JvdXBzID09PSAwICYmIHRlYXJkb3duQXR0ZW1wdGVkICYmIGdyb3VwQnlTb3VyY2VTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0LmtleSA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZ3JvdXBCeSA9IGdyb3VwQnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncm91cEJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pZ25vcmVFbGVtZW50cyA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG5mdW5jdGlvbiBpZ25vcmVFbGVtZW50cygpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBub29wXzEubm9vcCkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5pZ25vcmVFbGVtZW50cyA9IGlnbm9yZUVsZW1lbnRzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWdub3JlRWxlbWVudHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzRW1wdHkgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNFbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuam9pbkFsbEludGVybmFscyA9IHZvaWQgMDtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG52YXIgbWFwT25lT3JNYW55QXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvbWFwT25lT3JNYW55QXJnc1wiKTtcbnZhciBwaXBlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9waXBlXCIpO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi9tZXJnZU1hcFwiKTtcbnZhciB0b0FycmF5XzEgPSByZXF1aXJlKFwiLi90b0FycmF5XCIpO1xuZnVuY3Rpb24gam9pbkFsbEludGVybmFscyhqb2luRm4sIHByb2plY3QpIHtcbiAgICByZXR1cm4gcGlwZV8xLnBpcGUodG9BcnJheV8xLnRvQXJyYXkoKSwgbWVyZ2VNYXBfMS5tZXJnZU1hcChmdW5jdGlvbiAoc291cmNlcykgeyByZXR1cm4gam9pbkZuKHNvdXJjZXMpOyB9KSwgcHJvamVjdCA/IG1hcE9uZU9yTWFueUFyZ3NfMS5tYXBPbmVPck1hbnlBcmdzKHByb2plY3QpIDogaWRlbnRpdHlfMS5pZGVudGl0eSk7XG59XG5leHBvcnRzLmpvaW5BbGxJbnRlcm5hbHMgPSBqb2luQWxsSW50ZXJuYWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9am9pbkFsbEludGVybmFscy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubGFzdCA9IHZvaWQgMDtcbnZhciBFbXB0eUVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9FbXB0eUVycm9yXCIpO1xudmFyIGZpbHRlcl8xID0gcmVxdWlyZShcIi4vZmlsdGVyXCIpO1xudmFyIHRha2VMYXN0XzEgPSByZXF1aXJlKFwiLi90YWtlTGFzdFwiKTtcbnZhciB0aHJvd0lmRW1wdHlfMSA9IHJlcXVpcmUoXCIuL3Rocm93SWZFbXB0eVwiKTtcbnZhciBkZWZhdWx0SWZFbXB0eV8xID0gcmVxdWlyZShcIi4vZGVmYXVsdElmRW1wdHlcIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xuZnVuY3Rpb24gbGFzdChwcmVkaWNhdGUsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBoYXNEZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID49IDI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5waXBlKHByZWRpY2F0ZSA/IGZpbHRlcl8xLmZpbHRlcihmdW5jdGlvbiAodiwgaSkgeyByZXR1cm4gcHJlZGljYXRlKHYsIGksIHNvdXJjZSk7IH0pIDogaWRlbnRpdHlfMS5pZGVudGl0eSwgdGFrZUxhc3RfMS50YWtlTGFzdCgxKSwgaGFzRGVmYXVsdFZhbHVlID8gZGVmYXVsdElmRW1wdHlfMS5kZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpIDogdGhyb3dJZkVtcHR5XzEudGhyb3dJZkVtcHR5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBFbXB0eUVycm9yXzEuRW1wdHlFcnJvcigpOyB9KSk7XG4gICAgfTtcbn1cbmV4cG9ydHMubGFzdCA9IGxhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tYXAgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIG1hcChwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQocHJvamVjdC5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCsrKSk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFwID0gbWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tYXBUbyA9IHZvaWQgMDtcbnZhciBtYXBfMSA9IHJlcXVpcmUoXCIuL21hcFwiKTtcbmZ1bmN0aW9uIG1hcFRvKHZhbHVlKSB7XG4gICAgcmV0dXJuIG1hcF8xLm1hcChmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSk7XG59XG5leHBvcnRzLm1hcFRvID0gbWFwVG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBUby5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWF0ZXJpYWxpemUgPSB2b2lkIDA7XG52YXIgTm90aWZpY2F0aW9uXzEgPSByZXF1aXJlKFwiLi4vTm90aWZpY2F0aW9uXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBtYXRlcmlhbGl6ZSgpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChOb3RpZmljYXRpb25fMS5Ob3RpZmljYXRpb24uY3JlYXRlTmV4dCh2YWx1ZSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoTm90aWZpY2F0aW9uXzEuTm90aWZpY2F0aW9uLmNyZWF0ZUNvbXBsZXRlKCkpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoTm90aWZpY2F0aW9uXzEuTm90aWZpY2F0aW9uLmNyZWF0ZUVycm9yKGVycikpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLm1hdGVyaWFsaXplID0gbWF0ZXJpYWxpemU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRlcmlhbGl6ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWF4ID0gdm9pZCAwO1xudmFyIHJlZHVjZV8xID0gcmVxdWlyZShcIi4vcmVkdWNlXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBtYXgoY29tcGFyZXIpIHtcbiAgICByZXR1cm4gcmVkdWNlXzEucmVkdWNlKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGNvbXBhcmVyKSA/IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiAoY29tcGFyZXIoeCwgeSkgPiAwID8geCA6IHkpOyB9IDogZnVuY3Rpb24gKHgsIHkpIHsgcmV0dXJuICh4ID4geSA/IHggOiB5KTsgfSk7XG59XG5leHBvcnRzLm1heCA9IG1heDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1heC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgbWVyZ2VBbGxfMSA9IHJlcXVpcmUoXCIuL21lcmdlQWxsXCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG52YXIgZnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvZnJvbVwiKTtcbmZ1bmN0aW9uIG1lcmdlKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgc2NoZWR1bGVyID0gYXJnc18xLnBvcFNjaGVkdWxlcihhcmdzKTtcbiAgICB2YXIgY29uY3VycmVudCA9IGFyZ3NfMS5wb3BOdW1iZXIoYXJncywgSW5maW5pdHkpO1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIG1lcmdlQWxsXzEubWVyZ2VBbGwoY29uY3VycmVudCkoZnJvbV8xLmZyb20oX19zcHJlYWRBcnJheShbc291cmNlXSwgX19yZWFkKGFyZ3MpKSwgc2NoZWR1bGVyKSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5tZXJnZSA9IG1lcmdlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlQWxsID0gdm9pZCAwO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi9tZXJnZU1hcFwiKTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG5mdW5jdGlvbiBtZXJnZUFsbChjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gSW5maW5pdHk7IH1cbiAgICByZXR1cm4gbWVyZ2VNYXBfMS5tZXJnZU1hcChpZGVudGl0eV8xLmlkZW50aXR5LCBjb25jdXJyZW50KTtcbn1cbmV4cG9ydHMubWVyZ2VBbGwgPSBtZXJnZUFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlQWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZUludGVybmFscyA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIG1lcmdlSW50ZXJuYWxzKHNvdXJjZSwgc3Vic2NyaWJlciwgcHJvamVjdCwgY29uY3VycmVudCwgb25CZWZvcmVOZXh0LCBleHBhbmQsIGlubmVyU3ViU2NoZWR1bGVyLCBhZGRpdGlvbmFsRmluYWxpemVyKSB7XG4gICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBhY3RpdmUgPSAwO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzQ29tcGxldGUgJiYgIWJ1ZmZlci5sZW5ndGggJiYgIWFjdGl2ZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgb3V0ZXJOZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAoYWN0aXZlIDwgY29uY3VycmVudCA/IGRvSW5uZXJTdWIodmFsdWUpIDogYnVmZmVyLnB1c2godmFsdWUpKTsgfTtcbiAgICB2YXIgZG9Jbm5lclN1YiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBleHBhbmQgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgYWN0aXZlKys7XG4gICAgICAgIHZhciBpbm5lckNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShwcm9qZWN0KHZhbHVlLCBpbmRleCsrKSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoaW5uZXJWYWx1ZSkge1xuICAgICAgICAgICAgb25CZWZvcmVOZXh0ID09PSBudWxsIHx8IG9uQmVmb3JlTmV4dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25CZWZvcmVOZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICAgICAgaWYgKGV4cGFuZCkge1xuICAgICAgICAgICAgICAgIG91dGVyTmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5uZXJDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlubmVyQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUtLTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyZWRWYWx1ZSA9IGJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyU3ViU2NoZWR1bGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIGlubmVyU3ViU2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBkb0lubmVyU3ViKGJ1ZmZlcmVkVmFsdWUpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvSW5uZXJTdWIoYnVmZmVyZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoICYmIGFjdGl2ZSA8IGNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgb3V0ZXJOZXh0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFkZGl0aW9uYWxGaW5hbGl6ZXIgPT09IG51bGwgfHwgYWRkaXRpb25hbEZpbmFsaXplciA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkaXRpb25hbEZpbmFsaXplcigpO1xuICAgIH07XG59XG5leHBvcnRzLm1lcmdlSW50ZXJuYWxzID0gbWVyZ2VJbnRlcm5hbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZUludGVybmFscy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVyZ2VNYXAgPSB2b2lkIDA7XG52YXIgbWFwXzEgPSByZXF1aXJlKFwiLi9tYXBcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBtZXJnZUludGVybmFsc18xID0gcmVxdWlyZShcIi4vbWVyZ2VJbnRlcm5hbHNcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIG1lcmdlTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gSW5maW5pdHk7IH1cbiAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ocmVzdWx0U2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBtZXJnZU1hcChmdW5jdGlvbiAoYSwgaSkgeyByZXR1cm4gbWFwXzEubWFwKGZ1bmN0aW9uIChiLCBpaSkgeyByZXR1cm4gcmVzdWx0U2VsZWN0b3IoYSwgYiwgaSwgaWkpOyB9KShpbm5lckZyb21fMS5pbm5lckZyb20ocHJvamVjdChhLCBpKSkpOyB9LCBjb25jdXJyZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHJlc3VsdFNlbGVjdG9yID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25jdXJyZW50ID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7IHJldHVybiBtZXJnZUludGVybmFsc18xLm1lcmdlSW50ZXJuYWxzKHNvdXJjZSwgc3Vic2NyaWJlciwgcHJvamVjdCwgY29uY3VycmVudCk7IH0pO1xufVxuZXhwb3J0cy5tZXJnZU1hcCA9IG1lcmdlTWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VNYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlTWFwVG8gPSB2b2lkIDA7XG52YXIgbWVyZ2VNYXBfMSA9IHJlcXVpcmUoXCIuL21lcmdlTWFwXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBtZXJnZU1hcFRvKGlubmVyT2JzZXJ2YWJsZSwgcmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBJbmZpbml0eTsgfVxuICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihyZXN1bHRTZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlTWFwXzEubWVyZ2VNYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5uZXJPYnNlcnZhYmxlOyB9LCByZXN1bHRTZWxlY3RvciwgY29uY3VycmVudCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0U2VsZWN0b3IgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbmN1cnJlbnQgPSByZXN1bHRTZWxlY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlTWFwXzEubWVyZ2VNYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5uZXJPYnNlcnZhYmxlOyB9LCBjb25jdXJyZW50KTtcbn1cbmV4cG9ydHMubWVyZ2VNYXBUbyA9IG1lcmdlTWFwVG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZU1hcFRvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZVNjYW4gPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBtZXJnZUludGVybmFsc18xID0gcmVxdWlyZShcIi4vbWVyZ2VJbnRlcm5hbHNcIik7XG5mdW5jdGlvbiBtZXJnZVNjYW4oYWNjdW11bGF0b3IsIHNlZWQsIGNvbmN1cnJlbnQpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBJbmZpbml0eTsgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHNlZWQ7XG4gICAgICAgIHJldHVybiBtZXJnZUludGVybmFsc18xLm1lcmdlSW50ZXJuYWxzKHNvdXJjZSwgc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkgeyByZXR1cm4gYWNjdW11bGF0b3Ioc3RhdGUsIHZhbHVlLCBpbmRleCk7IH0sIGNvbmN1cnJlbnQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RhdGUgPSB2YWx1ZTtcbiAgICAgICAgfSwgZmFsc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKHN0YXRlID0gbnVsbCk7IH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5tZXJnZVNjYW4gPSBtZXJnZVNjYW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZVNjYW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZVdpdGggPSB2b2lkIDA7XG52YXIgbWVyZ2VfMSA9IHJlcXVpcmUoXCIuL21lcmdlXCIpO1xuZnVuY3Rpb24gbWVyZ2VXaXRoKCkge1xuICAgIHZhciBvdGhlclNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvdGhlclNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlXzEubWVyZ2UuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQob3RoZXJTb3VyY2VzKSkpO1xufVxuZXhwb3J0cy5tZXJnZVdpdGggPSBtZXJnZVdpdGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZVdpdGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1pbiA9IHZvaWQgMDtcbnZhciByZWR1Y2VfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gbWluKGNvbXBhcmVyKSB7XG4gICAgcmV0dXJuIHJlZHVjZV8xLnJlZHVjZShpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihjb21wYXJlcikgPyBmdW5jdGlvbiAoeCwgeSkgeyByZXR1cm4gKGNvbXBhcmVyKHgsIHkpIDwgMCA/IHggOiB5KTsgfSA6IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiAoeCA8IHkgPyB4IDogeSk7IH0pO1xufVxuZXhwb3J0cy5taW4gPSBtaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1taW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm11bHRpY2FzdCA9IHZvaWQgMDtcbnZhciBDb25uZWN0YWJsZU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIGNvbm5lY3RfMSA9IHJlcXVpcmUoXCIuL2Nvbm5lY3RcIik7XG5mdW5jdGlvbiBtdWx0aWNhc3Qoc3ViamVjdE9yU3ViamVjdEZhY3RvcnksIHNlbGVjdG9yKSB7XG4gICAgdmFyIHN1YmplY3RGYWN0b3J5ID0gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oc3ViamVjdE9yU3ViamVjdEZhY3RvcnkpID8gc3ViamVjdE9yU3ViamVjdEZhY3RvcnkgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeTsgfTtcbiAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBjb25uZWN0XzEuY29ubmVjdChzZWxlY3Rvciwge1xuICAgICAgICAgICAgY29ubmVjdG9yOiBzdWJqZWN0RmFjdG9yeSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7IHJldHVybiBuZXcgQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEuQ29ubmVjdGFibGVPYnNlcnZhYmxlKHNvdXJjZSwgc3ViamVjdEZhY3RvcnkpOyB9O1xufVxuZXhwb3J0cy5tdWx0aWNhc3QgPSBtdWx0aWNhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aWNhc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9ic2VydmVPbiA9IHZvaWQgMDtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gb2JzZXJ2ZU9uKHNjaGVkdWxlciwgZGVsYXkpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0sIGRlbGF5KTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9LCBkZWxheSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSwgZGVsYXkpOyB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLm9ic2VydmVPbiA9IG9ic2VydmVPbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVPbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9uRXJyb3JSZXN1bWVOZXh0ID0gZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dFdpdGggPSB2b2lkIDA7XG52YXIgYXJnc09yQXJnQXJyYXlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NPckFyZ0FycmF5XCIpO1xudmFyIG9uRXJyb3JSZXN1bWVOZXh0XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9vbkVycm9yUmVzdW1lTmV4dFwiKTtcbmZ1bmN0aW9uIG9uRXJyb3JSZXN1bWVOZXh0V2l0aCgpIHtcbiAgICB2YXIgc291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIG5leHRTb3VyY2VzID0gYXJnc09yQXJnQXJyYXlfMS5hcmdzT3JBcmdBcnJheShzb3VyY2VzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkgeyByZXR1cm4gb25FcnJvclJlc3VtZU5leHRfMS5vbkVycm9yUmVzdW1lTmV4dC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW3NvdXJjZV0sIF9fcmVhZChuZXh0U291cmNlcykpKTsgfTtcbn1cbmV4cG9ydHMub25FcnJvclJlc3VtZU5leHRXaXRoID0gb25FcnJvclJlc3VtZU5leHRXaXRoO1xuZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IG9uRXJyb3JSZXN1bWVOZXh0V2l0aDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9uRXJyb3JSZXN1bWVOZXh0V2l0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGFpcndpc2UgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHBhaXJ3aXNlKCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBwcmV2O1xuICAgICAgICB2YXIgaGFzUHJldiA9IGZhbHNlO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwID0gcHJldjtcbiAgICAgICAgICAgIHByZXYgPSB2YWx1ZTtcbiAgICAgICAgICAgIGhhc1ByZXYgJiYgc3Vic2NyaWJlci5uZXh0KFtwLCB2YWx1ZV0pO1xuICAgICAgICAgICAgaGFzUHJldiA9IHRydWU7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucGFpcndpc2UgPSBwYWlyd2lzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhaXJ3aXNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wbHVjayA9IHZvaWQgMDtcbnZhciBtYXBfMSA9IHJlcXVpcmUoXCIuL21hcFwiKTtcbmZ1bmN0aW9uIHBsdWNrKCkge1xuICAgIHZhciBwcm9wZXJ0aWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgcHJvcGVydGllc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gcHJvcGVydGllcy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xpc3Qgb2YgcHJvcGVydGllcyBjYW5ub3QgYmUgZW1wdHkuJyk7XG4gICAgfVxuICAgIHJldHVybiBtYXBfMS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRQcm9wID0geDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHAgPSBjdXJyZW50UHJvcCA9PT0gbnVsbCB8fCBjdXJyZW50UHJvcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VycmVudFByb3BbcHJvcGVydGllc1tpXV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHAgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3AgPSBwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudFByb3A7XG4gICAgfSk7XG59XG5leHBvcnRzLnBsdWNrID0gcGx1Y2s7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wbHVjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucHVibGlzaCA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBtdWx0aWNhc3RfMSA9IHJlcXVpcmUoXCIuL211bHRpY2FzdFwiKTtcbnZhciBjb25uZWN0XzEgPSByZXF1aXJlKFwiLi9jb25uZWN0XCIpO1xuZnVuY3Rpb24gcHVibGlzaChzZWxlY3Rvcikge1xuICAgIHJldHVybiBzZWxlY3RvciA/IGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIGNvbm5lY3RfMS5jb25uZWN0KHNlbGVjdG9yKShzb3VyY2UpOyB9IDogZnVuY3Rpb24gKHNvdXJjZSkgeyByZXR1cm4gbXVsdGljYXN0XzEubXVsdGljYXN0KG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpKShzb3VyY2UpOyB9O1xufVxuZXhwb3J0cy5wdWJsaXNoID0gcHVibGlzaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1Ymxpc2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnB1Ymxpc2hCZWhhdmlvciA9IHZvaWQgMDtcbnZhciBCZWhhdmlvclN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9CZWhhdmlvclN1YmplY3RcIik7XG52YXIgQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGVcIik7XG5mdW5jdGlvbiBwdWJsaXNoQmVoYXZpb3IoaW5pdGlhbFZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0XzEuQmVoYXZpb3JTdWJqZWN0KGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEuQ29ubmVjdGFibGVPYnNlcnZhYmxlKHNvdXJjZSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3ViamVjdDsgfSk7XG4gICAgfTtcbn1cbmV4cG9ydHMucHVibGlzaEJlaGF2aW9yID0gcHVibGlzaEJlaGF2aW9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVibGlzaEJlaGF2aW9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wdWJsaXNoTGFzdCA9IHZvaWQgMDtcbnZhciBBc3luY1N1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9Bc3luY1N1YmplY3RcIik7XG52YXIgQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGVcIik7XG5mdW5jdGlvbiBwdWJsaXNoTGFzdCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBBc3luY1N1YmplY3RfMS5Bc3luY1N1YmplY3QoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25uZWN0YWJsZU9ic2VydmFibGVfMS5Db25uZWN0YWJsZU9ic2VydmFibGUoc291cmNlLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJqZWN0OyB9KTtcbiAgICB9O1xufVxuZXhwb3J0cy5wdWJsaXNoTGFzdCA9IHB1Ymxpc2hMYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVibGlzaExhc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnB1Ymxpc2hSZXBsYXkgPSB2b2lkIDA7XG52YXIgUmVwbGF5U3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1JlcGxheVN1YmplY3RcIik7XG52YXIgbXVsdGljYXN0XzEgPSByZXF1aXJlKFwiLi9tdWx0aWNhc3RcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIHB1Ymxpc2hSZXBsYXkoYnVmZmVyU2l6ZSwgd2luZG93VGltZSwgc2VsZWN0b3JPclNjaGVkdWxlciwgdGltZXN0YW1wUHJvdmlkZXIpIHtcbiAgICBpZiAoc2VsZWN0b3JPclNjaGVkdWxlciAmJiAhaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oc2VsZWN0b3JPclNjaGVkdWxlcikpIHtcbiAgICAgICAgdGltZXN0YW1wUHJvdmlkZXIgPSBzZWxlY3Rvck9yU2NoZWR1bGVyO1xuICAgIH1cbiAgICB2YXIgc2VsZWN0b3IgPSBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihzZWxlY3Rvck9yU2NoZWR1bGVyKSA/IHNlbGVjdG9yT3JTY2hlZHVsZXIgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIG11bHRpY2FzdF8xLm11bHRpY2FzdChuZXcgUmVwbGF5U3ViamVjdF8xLlJlcGxheVN1YmplY3QoYnVmZmVyU2l6ZSwgd2luZG93VGltZSwgdGltZXN0YW1wUHJvdmlkZXIpLCBzZWxlY3Rvcikoc291cmNlKTsgfTtcbn1cbmV4cG9ydHMucHVibGlzaFJlcGxheSA9IHB1Ymxpc2hSZXBsYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdWJsaXNoUmVwbGF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFjZVdpdGggPSB2b2lkIDA7XG52YXIgcmFjZV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvcmFjZVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbmZ1bmN0aW9uIHJhY2VXaXRoKCkge1xuICAgIHZhciBvdGhlclNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvdGhlclNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuICFvdGhlclNvdXJjZXMubGVuZ3RoXG4gICAgICAgID8gaWRlbnRpdHlfMS5pZGVudGl0eVxuICAgICAgICA6IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJhY2VfMS5yYWNlSW5pdChfX3NwcmVhZEFycmF5KFtzb3VyY2VdLCBfX3JlYWQob3RoZXJTb3VyY2VzKSkpKHN1YnNjcmliZXIpO1xuICAgICAgICB9KTtcbn1cbmV4cG9ydHMucmFjZVdpdGggPSByYWNlV2l0aDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhY2VXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZWR1Y2UgPSB2b2lkIDA7XG52YXIgc2NhbkludGVybmFsc18xID0gcmVxdWlyZShcIi4vc2NhbkludGVybmFsc1wiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xuZnVuY3Rpb24gcmVkdWNlKGFjY3VtdWxhdG9yLCBzZWVkKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKHNjYW5JbnRlcm5hbHNfMS5zY2FuSW50ZXJuYWxzKGFjY3VtdWxhdG9yLCBzZWVkLCBhcmd1bWVudHMubGVuZ3RoID49IDIsIGZhbHNlLCB0cnVlKSk7XG59XG5leHBvcnRzLnJlZHVjZSA9IHJlZHVjZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZHVjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVmQ291bnQgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHJlZkNvdW50KCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgc291cmNlLl9yZWZDb3VudCsrO1xuICAgICAgICB2YXIgcmVmQ291bnRlciA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNvdXJjZSB8fCBzb3VyY2UuX3JlZkNvdW50IDw9IDAgfHwgMCA8IC0tc291cmNlLl9yZWZDb3VudCkge1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzaGFyZWRDb25uZWN0aW9uID0gc291cmNlLl9jb25uZWN0aW9uO1xuICAgICAgICAgICAgdmFyIGNvbm4gPSBjb25uZWN0aW9uO1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICBpZiAoc2hhcmVkQ29ubmVjdGlvbiAmJiAoIWNvbm4gfHwgc2hhcmVkQ29ubmVjdGlvbiA9PT0gY29ubikpIHtcbiAgICAgICAgICAgICAgICBzaGFyZWRDb25uZWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKHJlZkNvdW50ZXIpO1xuICAgICAgICBpZiAoIXJlZkNvdW50ZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uID0gc291cmNlLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5yZWZDb3VudCA9IHJlZkNvdW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVmQ291bnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlcGVhdCA9IHZvaWQgMDtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvZW1wdHlcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciB0aW1lcl8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvdGltZXJcIik7XG5mdW5jdGlvbiByZXBlYXQoY291bnRPckNvbmZpZykge1xuICAgIHZhciBfYTtcbiAgICB2YXIgY291bnQgPSBJbmZpbml0eTtcbiAgICB2YXIgZGVsYXk7XG4gICAgaWYgKGNvdW50T3JDb25maWcgIT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIGNvdW50T3JDb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAoX2EgPSBjb3VudE9yQ29uZmlnLmNvdW50LCBjb3VudCA9IF9hID09PSB2b2lkIDAgPyBJbmZpbml0eSA6IF9hLCBkZWxheSA9IGNvdW50T3JDb25maWcuZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY291bnQgPSBjb3VudE9yQ29uZmlnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudCA8PSAwXG4gICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1wdHlfMS5FTVBUWTsgfVxuICAgICAgICA6IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBzb0ZhciA9IDA7XG4gICAgICAgICAgICB2YXIgc291cmNlU3ViO1xuICAgICAgICAgICAgdmFyIHJlc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZVN1YiA9PT0gbnVsbCB8fCBzb3VyY2VTdWIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHNvdXJjZVN1YiA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGRlbGF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWVyID0gdHlwZW9mIGRlbGF5ID09PSAnbnVtYmVyJyA/IHRpbWVyXzEudGltZXIoZGVsYXkpIDogaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGRlbGF5KHNvRmFyKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmllclN1YnNjcmliZXJfMSA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmllclN1YnNjcmliZXJfMS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlVG9Tb3VyY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWVyLnN1YnNjcmliZShub3RpZmllclN1YnNjcmliZXJfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVUb1NvdXJjZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgc3Vic2NyaWJlVG9Tb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN5bmNVbnN1YiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNvdXJjZVN1YiA9IHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKytzb0ZhciA8IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlU3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5bmNVbnN1YiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgaWYgKHN5bmNVbnN1Yikge1xuICAgICAgICAgICAgICAgICAgICByZXN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzdWJzY3JpYmVUb1NvdXJjZSgpO1xuICAgICAgICB9KTtcbn1cbmV4cG9ydHMucmVwZWF0ID0gcmVwZWF0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVwZWF0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXBlYXRXaGVuID0gdm9pZCAwO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiByZXBlYXRXaGVuKG5vdGlmaWVyKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGlubmVyU3ViO1xuICAgICAgICB2YXIgc3luY1Jlc3ViID0gZmFsc2U7XG4gICAgICAgIHZhciBjb21wbGV0aW9ucyQ7XG4gICAgICAgIHZhciBpc05vdGlmaWVyQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGlzTWFpbkNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHZhciBjaGVja0NvbXBsZXRlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNNYWluQ29tcGxldGUgJiYgaXNOb3RpZmllckNvbXBsZXRlICYmIChzdWJzY3JpYmVyLmNvbXBsZXRlKCksIHRydWUpOyB9O1xuICAgICAgICB2YXIgZ2V0Q29tcGxldGlvblN1YmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNvbXBsZXRpb25zJCkge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRpb25zJCA9IG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpO1xuICAgICAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShub3RpZmllcihjb21wbGV0aW9ucyQpKS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyU3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVGb3JSZXBlYXRXaGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeW5jUmVzdWIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpc05vdGlmaWVyQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRpb25zJDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHN1YnNjcmliZUZvclJlcGVhdFdoZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc01haW5Db21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaW5uZXJTdWIgPSBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpc01haW5Db21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgIWNoZWNrQ29tcGxldGUoKSAmJiBnZXRDb21wbGV0aW9uU3ViamVjdCgpLm5leHQoKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGlmIChzeW5jUmVzdWIpIHtcbiAgICAgICAgICAgICAgICBpbm5lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIGlubmVyU3ViID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzeW5jUmVzdWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVGb3JSZXBlYXRXaGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHN1YnNjcmliZUZvclJlcGVhdFdoZW4oKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmVwZWF0V2hlbiA9IHJlcGVhdFdoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBlYXRXaGVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXRyeSA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbnZhciB0aW1lcl8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvdGltZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiByZXRyeShjb25maWdPckNvdW50KSB7XG4gICAgaWYgKGNvbmZpZ09yQ291bnQgPT09IHZvaWQgMCkgeyBjb25maWdPckNvdW50ID0gSW5maW5pdHk7IH1cbiAgICB2YXIgY29uZmlnO1xuICAgIGlmIChjb25maWdPckNvdW50ICYmIHR5cGVvZiBjb25maWdPckNvdW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25maWcgPSBjb25maWdPckNvdW50O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgY291bnQ6IGNvbmZpZ09yQ291bnQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHZhciBfYSA9IGNvbmZpZy5jb3VudCwgY291bnQgPSBfYSA9PT0gdm9pZCAwID8gSW5maW5pdHkgOiBfYSwgZGVsYXkgPSBjb25maWcuZGVsYXksIF9iID0gY29uZmlnLnJlc2V0T25TdWNjZXNzLCByZXNldE9uU3VjY2VzcyA9IF9iID09PSB2b2lkIDAgPyBmYWxzZSA6IF9iO1xuICAgIHJldHVybiBjb3VudCA8PSAwXG4gICAgICAgID8gaWRlbnRpdHlfMS5pZGVudGl0eVxuICAgICAgICA6IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBzb0ZhciA9IDA7XG4gICAgICAgICAgICB2YXIgaW5uZXJTdWI7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaWJlRm9yUmV0cnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN5bmNVbnN1YiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlubmVyU3ViID0gc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNldE9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc29GYXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb0ZhcisrIDwgY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1Yl8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lclN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZUZvclJldHJ5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW5jVW5zdWIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsYXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmllciA9IHR5cGVvZiBkZWxheSA9PT0gJ251bWJlcicgPyB0aW1lcl8xLnRpbWVyKGRlbGF5KSA6IGlubmVyRnJvbV8xLmlubmVyRnJvbShkZWxheShlcnIsIHNvRmFyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWVyU3Vic2NyaWJlcl8xID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpZXJTdWJzY3JpYmVyXzEudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWJfMSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWVyLnN1YnNjcmliZShub3RpZmllclN1YnNjcmliZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1Yl8xKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgaWYgKHN5bmNVbnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBpbm5lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZUZvclJldHJ5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN1YnNjcmliZUZvclJldHJ5KCk7XG4gICAgICAgIH0pO1xufVxuZXhwb3J0cy5yZXRyeSA9IHJldHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmV0cnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJldHJ5V2hlbiA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gcmV0cnlXaGVuKG5vdGlmaWVyKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGlubmVyU3ViO1xuICAgICAgICB2YXIgc3luY1Jlc3ViID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvcnMkO1xuICAgICAgICB2YXIgc3Vic2NyaWJlRm9yUmV0cnlXaGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5uZXJTdWIgPSBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3JzJCkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMkID0gbmV3IFN1YmplY3RfMS5TdWJqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShub3RpZmllcihlcnJvcnMkKSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5uZXJTdWIgPyBzdWJzY3JpYmVGb3JSZXRyeVdoZW4oKSA6IChzeW5jUmVzdWIgPSB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzJCkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMkLm5leHQoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBpZiAoc3luY1Jlc3ViKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3luY1Jlc3ViID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlRm9yUmV0cnlXaGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHN1YnNjcmliZUZvclJldHJ5V2hlbigpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5yZXRyeVdoZW4gPSByZXRyeVdoZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXRyeVdoZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNhbXBsZSA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBzYW1wbGUobm90aWZpZXIpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgbGFzdFZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKG5vdGlmaWVyKS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbGFzdFZhbHVlO1xuICAgICAgICAgICAgICAgIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgbm9vcF8xLm5vb3ApKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2FtcGxlID0gc2FtcGxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2FtcGxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zYW1wbGVUaW1lID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIHNhbXBsZV8xID0gcmVxdWlyZShcIi4vc2FtcGxlXCIpO1xudmFyIGludGVydmFsXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbnRlcnZhbFwiKTtcbmZ1bmN0aW9uIHNhbXBsZVRpbWUocGVyaW9kLCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIHJldHVybiBzYW1wbGVfMS5zYW1wbGUoaW50ZXJ2YWxfMS5pbnRlcnZhbChwZXJpb2QsIHNjaGVkdWxlcikpO1xufVxuZXhwb3J0cy5zYW1wbGVUaW1lID0gc2FtcGxlVGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNhbXBsZVRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjYW4gPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBzY2FuSW50ZXJuYWxzXzEgPSByZXF1aXJlKFwiLi9zY2FuSW50ZXJuYWxzXCIpO1xuZnVuY3Rpb24gc2NhbihhY2N1bXVsYXRvciwgc2VlZCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShzY2FuSW50ZXJuYWxzXzEuc2NhbkludGVybmFscyhhY2N1bXVsYXRvciwgc2VlZCwgYXJndW1lbnRzLmxlbmd0aCA+PSAyLCB0cnVlKSk7XG59XG5leHBvcnRzLnNjYW4gPSBzY2FuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Nhbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2NhbkludGVybmFscyA9IHZvaWQgMDtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHNjYW5JbnRlcm5hbHMoYWNjdW11bGF0b3IsIHNlZWQsIGhhc1NlZWQsIGVtaXRPbk5leHQsIGVtaXRCZWZvcmVDb21wbGV0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYXNTdGF0ZSA9IGhhc1NlZWQ7XG4gICAgICAgIHZhciBzdGF0ZSA9IHNlZWQ7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGkgPSBpbmRleCsrO1xuICAgICAgICAgICAgc3RhdGUgPSBoYXNTdGF0ZVxuICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgYWNjdW11bGF0b3Ioc3RhdGUsIHZhbHVlLCBpKVxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgKChoYXNTdGF0ZSA9IHRydWUpLCB2YWx1ZSk7XG4gICAgICAgICAgICBlbWl0T25OZXh0ICYmIHN1YnNjcmliZXIubmV4dChzdGF0ZSk7XG4gICAgICAgIH0sIGVtaXRCZWZvcmVDb21wbGV0ZSAmJlxuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBoYXNTdGF0ZSAmJiBzdWJzY3JpYmVyLm5leHQoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuc2NhbkludGVybmFscyA9IHNjYW5JbnRlcm5hbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2FuSW50ZXJuYWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXF1ZW5jZUVxdWFsID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiBzZXF1ZW5jZUVxdWFsKGNvbXBhcmVUbywgY29tcGFyYXRvcikge1xuICAgIGlmIChjb21wYXJhdG9yID09PSB2b2lkIDApIHsgY29tcGFyYXRvciA9IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhID09PSBiOyB9OyB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGFTdGF0ZSA9IGNyZWF0ZVN0YXRlKCk7XG4gICAgICAgIHZhciBiU3RhdGUgPSBjcmVhdGVTdGF0ZSgpO1xuICAgICAgICB2YXIgZW1pdCA9IGZ1bmN0aW9uIChpc0VxdWFsKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaXNFcXVhbCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjcmVhdGVTdWJzY3JpYmVyID0gZnVuY3Rpb24gKHNlbGZTdGF0ZSwgb3RoZXJTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIHNlcXVlbmNlRXF1YWxTdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IG90aGVyU3RhdGUuYnVmZmVyLCBjb21wbGV0ZSA9IG90aGVyU3RhdGUuY29tcGxldGU7XG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUgPyBlbWl0KGZhbHNlKSA6IHNlbGZTdGF0ZS5idWZmZXIucHVzaChhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICFjb21wYXJhdG9yKGEsIGJ1ZmZlci5zaGlmdCgpKSAmJiBlbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZlN0YXRlLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGxldGUgPSBvdGhlclN0YXRlLmNvbXBsZXRlLCBidWZmZXIgPSBvdGhlclN0YXRlLmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSAmJiBlbWl0KGJ1ZmZlci5sZW5ndGggPT09IDApO1xuICAgICAgICAgICAgICAgIHNlcXVlbmNlRXF1YWxTdWJzY3JpYmVyID09PSBudWxsIHx8IHNlcXVlbmNlRXF1YWxTdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXF1ZW5jZUVxdWFsU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2VFcXVhbFN1YnNjcmliZXI7XG4gICAgICAgIH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlU3Vic2NyaWJlcihhU3RhdGUsIGJTdGF0ZSkpO1xuICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oY29tcGFyZVRvKS5zdWJzY3JpYmUoY3JlYXRlU3Vic2NyaWJlcihiU3RhdGUsIGFTdGF0ZSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zZXF1ZW5jZUVxdWFsID0gc2VxdWVuY2VFcXVhbDtcbmZ1bmN0aW9uIGNyZWF0ZVN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VxdWVuY2VFcXVhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNoYXJlID0gdm9pZCAwO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpYmVyXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG5mdW5jdGlvbiBzaGFyZShvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgX2EgPSBvcHRpb25zLmNvbm5lY3RvciwgY29ubmVjdG9yID0gX2EgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpOyB9IDogX2EsIF9iID0gb3B0aW9ucy5yZXNldE9uRXJyb3IsIHJlc2V0T25FcnJvciA9IF9iID09PSB2b2lkIDAgPyB0cnVlIDogX2IsIF9jID0gb3B0aW9ucy5yZXNldE9uQ29tcGxldGUsIHJlc2V0T25Db21wbGV0ZSA9IF9jID09PSB2b2lkIDAgPyB0cnVlIDogX2MsIF9kID0gb3B0aW9ucy5yZXNldE9uUmVmQ291bnRaZXJvLCByZXNldE9uUmVmQ291bnRaZXJvID0gX2QgPT09IHZvaWQgMCA/IHRydWUgOiBfZDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHdyYXBwZXJTb3VyY2UpIHtcbiAgICAgICAgdmFyIGNvbm5lY3Rpb247XG4gICAgICAgIHZhciByZXNldENvbm5lY3Rpb247XG4gICAgICAgIHZhciBzdWJqZWN0O1xuICAgICAgICB2YXIgcmVmQ291bnQgPSAwO1xuICAgICAgICB2YXIgaGFzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBoYXNFcnJvcmVkID0gZmFsc2U7XG4gICAgICAgIHZhciBjYW5jZWxSZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlc2V0Q29ubmVjdGlvbiA9PT0gbnVsbCB8fCByZXNldENvbm5lY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc2V0Q29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgcmVzZXRDb25uZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYW5jZWxSZXNldCgpO1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IHN1YmplY3QgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBoYXNDb21wbGV0ZWQgPSBoYXNFcnJvcmVkID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXNldEFuZFVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNvbm4gPSBjb25uZWN0aW9uO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgIGNvbm4gPT09IG51bGwgfHwgY29ubiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29ubi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgcmVmQ291bnQrKztcbiAgICAgICAgICAgIGlmICghaGFzRXJyb3JlZCAmJiAhaGFzQ29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgY2FuY2VsUmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZXN0ID0gKHN1YmplY3QgPSBzdWJqZWN0ICE9PSBudWxsICYmIHN1YmplY3QgIT09IHZvaWQgMCA/IHN1YmplY3QgOiBjb25uZWN0b3IoKSk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVmQ291bnQtLTtcbiAgICAgICAgICAgICAgICBpZiAocmVmQ291bnQgPT09IDAgJiYgIWhhc0Vycm9yZWQgJiYgIWhhc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXNldENvbm5lY3Rpb24gPSBoYW5kbGVSZXNldChyZXNldEFuZFVuc3Vic2NyaWJlLCByZXNldE9uUmVmQ291bnRaZXJvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlc3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgaWYgKCFjb25uZWN0aW9uICYmXG4gICAgICAgICAgICAgICAgcmVmQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbiA9IG5ldyBTdWJzY3JpYmVyXzEuU2FmZVN1YnNjcmliZXIoe1xuICAgICAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGRlc3QubmV4dCh2YWx1ZSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbFJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldENvbm5lY3Rpb24gPSBoYW5kbGVSZXNldChyZXNldCwgcmVzZXRPbkVycm9yLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdC5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbFJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldENvbm5lY3Rpb24gPSBoYW5kbGVSZXNldChyZXNldCwgcmVzZXRPbkNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oc291cmNlKS5zdWJzY3JpYmUoY29ubmVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHdyYXBwZXJTb3VyY2UpO1xuICAgIH07XG59XG5leHBvcnRzLnNoYXJlID0gc2hhcmU7XG5mdW5jdGlvbiBoYW5kbGVSZXNldChyZXNldCwgb24pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIGlmIChvbiA9PT0gdHJ1ZSkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgb25TdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXJfMS5TYWZlU3Vic2NyaWJlcih7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9uU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKG9uLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSkpLnN1YnNjcmliZShvblN1YnNjcmliZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNoYXJlUmVwbGF5ID0gdm9pZCAwO1xudmFyIFJlcGxheVN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9SZXBsYXlTdWJqZWN0XCIpO1xudmFyIHNoYXJlXzEgPSByZXF1aXJlKFwiLi9zaGFyZVwiKTtcbmZ1bmN0aW9uIHNoYXJlUmVwbGF5KGNvbmZpZ09yQnVmZmVyU2l6ZSwgd2luZG93VGltZSwgc2NoZWR1bGVyKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgdmFyIGJ1ZmZlclNpemU7XG4gICAgdmFyIHJlZkNvdW50ID0gZmFsc2U7XG4gICAgaWYgKGNvbmZpZ09yQnVmZmVyU2l6ZSAmJiB0eXBlb2YgY29uZmlnT3JCdWZmZXJTaXplID09PSAnb2JqZWN0Jykge1xuICAgICAgICAoX2EgPSBjb25maWdPckJ1ZmZlclNpemUuYnVmZmVyU2l6ZSwgYnVmZmVyU2l6ZSA9IF9hID09PSB2b2lkIDAgPyBJbmZpbml0eSA6IF9hLCBfYiA9IGNvbmZpZ09yQnVmZmVyU2l6ZS53aW5kb3dUaW1lLCB3aW5kb3dUaW1lID0gX2IgPT09IHZvaWQgMCA/IEluZmluaXR5IDogX2IsIF9jID0gY29uZmlnT3JCdWZmZXJTaXplLnJlZkNvdW50LCByZWZDb3VudCA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jLCBzY2hlZHVsZXIgPSBjb25maWdPckJ1ZmZlclNpemUuc2NoZWR1bGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGJ1ZmZlclNpemUgPSAoY29uZmlnT3JCdWZmZXJTaXplICE9PSBudWxsICYmIGNvbmZpZ09yQnVmZmVyU2l6ZSAhPT0gdm9pZCAwID8gY29uZmlnT3JCdWZmZXJTaXplIDogSW5maW5pdHkpO1xuICAgIH1cbiAgICByZXR1cm4gc2hhcmVfMS5zaGFyZSh7XG4gICAgICAgIGNvbm5lY3RvcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFJlcGxheVN1YmplY3RfMS5SZXBsYXlTdWJqZWN0KGJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHNjaGVkdWxlcik7IH0sXG4gICAgICAgIHJlc2V0T25FcnJvcjogdHJ1ZSxcbiAgICAgICAgcmVzZXRPbkNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgcmVzZXRPblJlZkNvdW50WmVybzogcmVmQ291bnQsXG4gICAgfSk7XG59XG5leHBvcnRzLnNoYXJlUmVwbGF5ID0gc2hhcmVSZXBsYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZVJlcGxheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2luZ2xlID0gdm9pZCAwO1xudmFyIEVtcHR5RXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL0VtcHR5RXJyb3JcIik7XG52YXIgU2VxdWVuY2VFcnJvcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvU2VxdWVuY2VFcnJvclwiKTtcbnZhciBOb3RGb3VuZEVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9Ob3RGb3VuZEVycm9yXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBzaW5nbGUocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIHZhciBzaW5nbGVWYWx1ZTtcbiAgICAgICAgdmFyIHNlZW5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHNlZW5WYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIXByZWRpY2F0ZSB8fCBwcmVkaWNhdGUodmFsdWUsIGluZGV4KyssIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBoYXNWYWx1ZSAmJiBzdWJzY3JpYmVyLmVycm9yKG5ldyBTZXF1ZW5jZUVycm9yXzEuU2VxdWVuY2VFcnJvcignVG9vIG1hbnkgbWF0Y2hpbmcgdmFsdWVzJykpO1xuICAgICAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzaW5nbGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoc2luZ2xlVmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3Ioc2VlblZhbHVlID8gbmV3IE5vdEZvdW5kRXJyb3JfMS5Ob3RGb3VuZEVycm9yKCdObyBtYXRjaGluZyB2YWx1ZXMnKSA6IG5ldyBFbXB0eUVycm9yXzEuRW1wdHlFcnJvcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zaW5nbGUgPSBzaW5nbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW5nbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNraXAgPSB2b2lkIDA7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKFwiLi9maWx0ZXJcIik7XG5mdW5jdGlvbiBza2lwKGNvdW50KSB7XG4gICAgcmV0dXJuIGZpbHRlcl8xLmZpbHRlcihmdW5jdGlvbiAoXywgaW5kZXgpIHsgcmV0dXJuIGNvdW50IDw9IGluZGV4OyB9KTtcbn1cbmV4cG9ydHMuc2tpcCA9IHNraXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1za2lwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5za2lwTGFzdCA9IHZvaWQgMDtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHNraXBMYXN0KHNraXBDb3VudCkge1xuICAgIHJldHVybiBza2lwQ291bnQgPD0gMFxuICAgICAgICA/XG4gICAgICAgICAgICBpZGVudGl0eV8xLmlkZW50aXR5XG4gICAgICAgIDogbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgdmFyIHJpbmcgPSBuZXcgQXJyYXkoc2tpcENvdW50KTtcbiAgICAgICAgICAgIHZhciBzZWVuID0gMDtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gc2VlbisrO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZUluZGV4IDwgc2tpcENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJpbmdbdmFsdWVJbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHZhbHVlSW5kZXggJSBza2lwQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHJpbmdbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICByaW5nW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQob2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmluZyA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbn1cbmV4cG9ydHMuc2tpcExhc3QgPSBza2lwTGFzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNraXBMYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5za2lwVW50aWwgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xuZnVuY3Rpb24gc2tpcFVudGlsKG5vdGlmaWVyKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHRha2luZyA9IGZhbHNlO1xuICAgICAgICB2YXIgc2tpcFN1YnNjcmliZXIgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2tpcFN1YnNjcmliZXIgPT09IG51bGwgfHwgc2tpcFN1YnNjcmliZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNraXBTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0YWtpbmcgPSB0cnVlO1xuICAgICAgICB9LCBub29wXzEubm9vcCk7XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShub3RpZmllcikuc3Vic2NyaWJlKHNraXBTdWJzY3JpYmVyKTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0YWtpbmcgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTsgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5za2lwVW50aWwgPSBza2lwVW50aWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1za2lwVW50aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNraXBXaGlsZSA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gc2tpcFdoaWxlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciB0YWtpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAodGFraW5nIHx8ICh0YWtpbmcgPSAhcHJlZGljYXRlKHZhbHVlLCBpbmRleCsrKSkpICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2tpcFdoaWxlID0gc2tpcFdoaWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2tpcFdoaWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdGFydFdpdGggPSB2b2lkIDA7XG52YXIgY29uY2F0XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9jb25jYXRcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xuZnVuY3Rpb24gc3RhcnRXaXRoKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YWx1ZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIodmFsdWVzKTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICAoc2NoZWR1bGVyID8gY29uY2F0XzEuY29uY2F0KHZhbHVlcywgc291cmNlLCBzY2hlZHVsZXIpIDogY29uY2F0XzEuY29uY2F0KHZhbHVlcywgc291cmNlKSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zdGFydFdpdGggPSBzdGFydFdpdGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGFydFdpdGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN1YnNjcmliZU9uID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG5mdW5jdGlvbiBzdWJzY3JpYmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7IH0sIGRlbGF5KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnN1YnNjcmliZU9uID0gc3Vic2NyaWJlT247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVPbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3dpdGNoQWxsID0gdm9pZCAwO1xudmFyIHN3aXRjaE1hcF8xID0gcmVxdWlyZShcIi4vc3dpdGNoTWFwXCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbmZ1bmN0aW9uIHN3aXRjaEFsbCgpIHtcbiAgICByZXR1cm4gc3dpdGNoTWFwXzEuc3dpdGNoTWFwKGlkZW50aXR5XzEuaWRlbnRpdHkpO1xufVxuZXhwb3J0cy5zd2l0Y2hBbGwgPSBzd2l0Y2hBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2hBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN3aXRjaE1hcCA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gc3dpdGNoTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGlubmVyU3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHZhciBjaGVja0NvbXBsZXRlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNDb21wbGV0ZSAmJiAhaW5uZXJTdWJzY3JpYmVyICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpbm5lclN1YnNjcmliZXIgPT09IG51bGwgfHwgaW5uZXJTdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbm5lclN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHZhciBpbm5lckluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBvdXRlckluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShwcm9qZWN0KHZhbHVlLCBvdXRlckluZGV4KSkuc3Vic2NyaWJlKChpbm5lclN1YnNjcmliZXIgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKGlubmVyVmFsdWUpIHsgcmV0dXJuIHN1YnNjcmliZXIubmV4dChyZXN1bHRTZWxlY3RvciA/IHJlc3VsdFNlbGVjdG9yKHZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4KyspIDogaW5uZXJWYWx1ZSk7IH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpbm5lclN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnN3aXRjaE1hcCA9IHN3aXRjaE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaE1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3dpdGNoTWFwVG8gPSB2b2lkIDA7XG52YXIgc3dpdGNoTWFwXzEgPSByZXF1aXJlKFwiLi9zd2l0Y2hNYXBcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIHN3aXRjaE1hcFRvKGlubmVyT2JzZXJ2YWJsZSwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ocmVzdWx0U2VsZWN0b3IpID8gc3dpdGNoTWFwXzEuc3dpdGNoTWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlubmVyT2JzZXJ2YWJsZTsgfSwgcmVzdWx0U2VsZWN0b3IpIDogc3dpdGNoTWFwXzEuc3dpdGNoTWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlubmVyT2JzZXJ2YWJsZTsgfSk7XG59XG5leHBvcnRzLnN3aXRjaE1hcFRvID0gc3dpdGNoTWFwVG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2hNYXBUby5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3dpdGNoU2NhbiA9IHZvaWQgMDtcbnZhciBzd2l0Y2hNYXBfMSA9IHJlcXVpcmUoXCIuL3N3aXRjaE1hcFwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xuZnVuY3Rpb24gc3dpdGNoU2NhbihhY2N1bXVsYXRvciwgc2VlZCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHNlZWQ7XG4gICAgICAgIHN3aXRjaE1hcF8xLnN3aXRjaE1hcChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7IHJldHVybiBhY2N1bXVsYXRvcihzdGF0ZSwgdmFsdWUsIGluZGV4KTsgfSwgZnVuY3Rpb24gKF8sIGlubmVyVmFsdWUpIHsgcmV0dXJuICgoc3RhdGUgPSBpbm5lclZhbHVlKSwgaW5uZXJWYWx1ZSk7IH0pKHNvdXJjZSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhdGUgPSBudWxsO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy5zd2l0Y2hTY2FuID0gc3dpdGNoU2Nhbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaFNjYW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRha2UgPSB2b2lkIDA7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2VtcHR5XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiB0YWtlKGNvdW50KSB7XG4gICAgcmV0dXJuIGNvdW50IDw9IDBcbiAgICAgICAgP1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1wdHlfMS5FTVBUWTsgfVxuICAgICAgICA6IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBzZWVuID0gMDtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgrK3NlZW4gPD0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDw9IHNlZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG59XG5leHBvcnRzLnRha2UgPSB0YWtlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFrZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGFrZUxhc3QgPSB2b2lkIDA7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2VtcHR5XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiB0YWtlTGFzdChjb3VudCkge1xuICAgIHJldHVybiBjb3VudCA8PSAwXG4gICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1wdHlfMS5FTVBUWTsgfVxuICAgICAgICA6IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb3VudCA8IGJ1ZmZlci5sZW5ndGggJiYgYnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYnVmZmVyXzEgPSBfX3ZhbHVlcyhidWZmZXIpLCBidWZmZXJfMV8xID0gYnVmZmVyXzEubmV4dCgpOyAhYnVmZmVyXzFfMS5kb25lOyBidWZmZXJfMV8xID0gYnVmZmVyXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBidWZmZXJfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcl8xXzEgJiYgIWJ1ZmZlcl8xXzEuZG9uZSAmJiAoX2EgPSBidWZmZXJfMS5yZXR1cm4pKSBfYS5jYWxsKGJ1ZmZlcl8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IG51bGw7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xufVxuZXhwb3J0cy50YWtlTGFzdCA9IHRha2VMYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFrZUxhc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRha2VVbnRpbCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG5mdW5jdGlvbiB0YWtlVW50aWwobm90aWZpZXIpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20obm90aWZpZXIpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9LCBub29wXzEubm9vcCkpO1xuICAgICAgICAhc3Vic2NyaWJlci5jbG9zZWQgJiYgc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudGFrZVVudGlsID0gdGFrZVVudGlsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFrZVVudGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50YWtlV2hpbGUgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHRha2VXaGlsZShwcmVkaWNhdGUsIGluY2x1c2l2ZSkge1xuICAgIGlmIChpbmNsdXNpdmUgPT09IHZvaWQgMCkgeyBpbmNsdXNpdmUgPSBmYWxzZTsgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgrKyk7XG4gICAgICAgICAgICAocmVzdWx0IHx8IGluY2x1c2l2ZSkgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICFyZXN1bHQgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnRha2VXaGlsZSA9IHRha2VXaGlsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2VXaGlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGFwID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG5mdW5jdGlvbiB0YXAob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgIHZhciB0YXBPYnNlcnZlciA9IGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSB8fCBlcnJvciB8fCBjb21wbGV0ZVxuICAgICAgICA/XG4gICAgICAgICAgICB7IG5leHQ6IG9ic2VydmVyT3JOZXh0LCBlcnJvcjogZXJyb3IsIGNvbXBsZXRlOiBjb21wbGV0ZSB9XG4gICAgICAgIDogb2JzZXJ2ZXJPck5leHQ7XG4gICAgcmV0dXJuIHRhcE9ic2VydmVyXG4gICAgICAgID8gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIuc3Vic2NyaWJlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICB2YXIgaXNVbnN1YiA9IHRydWU7XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIubmV4dCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpc1Vuc3ViID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIuY29tcGxldGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlzVW5zdWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAoX2EgPSB0YXBPYnNlcnZlci5lcnJvcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIsIGVycik7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgaWYgKGlzVW5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIudW5zdWJzY3JpYmUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKF9iID0gdGFwT2JzZXJ2ZXIuZmluYWxpemUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKHRhcE9ic2VydmVyKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICAgICAgOlxuICAgICAgICAgICAgaWRlbnRpdHlfMS5pZGVudGl0eTtcbn1cbmV4cG9ydHMudGFwID0gdGFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aHJvdHRsZSA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gdGhyb3R0bGUoZHVyYXRpb25TZWxlY3RvciwgY29uZmlnKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hID0gY29uZmlnICE9PSBudWxsICYmIGNvbmZpZyAhPT0gdm9pZCAwID8gY29uZmlnIDoge30sIF9iID0gX2EubGVhZGluZywgbGVhZGluZyA9IF9iID09PSB2b2lkIDAgPyB0cnVlIDogX2IsIF9jID0gX2EudHJhaWxpbmcsIHRyYWlsaW5nID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2M7XG4gICAgICAgIHZhciBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgc2VuZFZhbHVlID0gbnVsbDtcbiAgICAgICAgdmFyIHRocm90dGxlZCA9IG51bGw7XG4gICAgICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHZhciBlbmRUaHJvdHRsaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3R0bGVkID09PSBudWxsIHx8IHRocm90dGxlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGhyb3R0bGVkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aHJvdHRsZWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRyYWlsaW5nKSB7XG4gICAgICAgICAgICAgICAgc2VuZCgpO1xuICAgICAgICAgICAgICAgIGlzQ29tcGxldGUgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgY2xlYW51cFRocm90dGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdHRsZWQgPSBudWxsO1xuICAgICAgICAgICAgaXNDb21wbGV0ZSAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzdGFydFRocm90dGxlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRocm90dGxlZCA9IGlubmVyRnJvbV8xLmlubmVyRnJvbShkdXJhdGlvblNlbGVjdG9yKHZhbHVlKSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBlbmRUaHJvdHRsaW5nLCBjbGVhbnVwVGhyb3R0bGluZykpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHNlbmRWYWx1ZTtcbiAgICAgICAgICAgICAgICBzZW5kVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgIWlzQ29tcGxldGUgJiYgc3RhcnRUaHJvdHRsZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgc2VuZFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAhKHRocm90dGxlZCAmJiAhdGhyb3R0bGVkLmNsb3NlZCkgJiYgKGxlYWRpbmcgPyBzZW5kKCkgOiBzdGFydFRocm90dGxlKHZhbHVlKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgISh0cmFpbGluZyAmJiBoYXNWYWx1ZSAmJiB0aHJvdHRsZWQgJiYgIXRocm90dGxlZC5jbG9zZWQpICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50aHJvdHRsZSA9IHRocm90dGxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3R0bGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRocm90dGxlVGltZSA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciB0aHJvdHRsZV8xID0gcmVxdWlyZShcIi4vdGhyb3R0bGVcIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL3RpbWVyXCIpO1xuZnVuY3Rpb24gdGhyb3R0bGVUaW1lKGR1cmF0aW9uLCBzY2hlZHVsZXIsIGNvbmZpZykge1xuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSBhc3luY18xLmFzeW5jU2NoZWR1bGVyOyB9XG4gICAgdmFyIGR1cmF0aW9uJCA9IHRpbWVyXzEudGltZXIoZHVyYXRpb24sIHNjaGVkdWxlcik7XG4gICAgcmV0dXJuIHRocm90dGxlXzEudGhyb3R0bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gZHVyYXRpb24kOyB9LCBjb25maWcpO1xufVxuZXhwb3J0cy50aHJvdHRsZVRpbWUgPSB0aHJvdHRsZVRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHJvdHRsZVRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRocm93SWZFbXB0eSA9IHZvaWQgMDtcbnZhciBFbXB0eUVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9FbXB0eUVycm9yXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiB0aHJvd0lmRW1wdHkoZXJyb3JGYWN0b3J5KSB7XG4gICAgaWYgKGVycm9yRmFjdG9yeSA9PT0gdm9pZCAwKSB7IGVycm9yRmFjdG9yeSA9IGRlZmF1bHRFcnJvckZhY3Rvcnk7IH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiAoaGFzVmFsdWUgPyBzdWJzY3JpYmVyLmNvbXBsZXRlKCkgOiBzdWJzY3JpYmVyLmVycm9yKGVycm9yRmFjdG9yeSgpKSk7IH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudGhyb3dJZkVtcHR5ID0gdGhyb3dJZkVtcHR5O1xuZnVuY3Rpb24gZGVmYXVsdEVycm9yRmFjdG9yeSgpIHtcbiAgICByZXR1cm4gbmV3IEVtcHR5RXJyb3JfMS5FbXB0eUVycm9yKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHJvd0lmRW1wdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRpbWVJbnRlcnZhbCA9IGV4cG9ydHMudGltZUludGVydmFsID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiB0aW1lSW50ZXJ2YWwoc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgbGFzdCA9IHNjaGVkdWxlci5ub3coKTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgbm93ID0gc2NoZWR1bGVyLm5vdygpO1xuICAgICAgICAgICAgdmFyIGludGVydmFsID0gbm93IC0gbGFzdDtcbiAgICAgICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQobmV3IFRpbWVJbnRlcnZhbCh2YWx1ZSwgaW50ZXJ2YWwpKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50aW1lSW50ZXJ2YWwgPSB0aW1lSW50ZXJ2YWw7XG52YXIgVGltZUludGVydmFsID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaW1lSW50ZXJ2YWwodmFsdWUsIGludGVydmFsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsO1xuICAgIH1cbiAgICByZXR1cm4gVGltZUludGVydmFsO1xufSgpKTtcbmV4cG9ydHMuVGltZUludGVydmFsID0gVGltZUludGVydmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZUludGVydmFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aW1lb3V0ID0gZXhwb3J0cy5UaW1lb3V0RXJyb3IgPSB2b2lkIDA7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgaXNEYXRlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0RhdGVcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9jcmVhdGVFcnJvckNsYXNzXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGV4ZWN1dGVTY2hlZHVsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlXCIpO1xuZXhwb3J0cy5UaW1lb3V0RXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzXzEuY3JlYXRlRXJyb3JDbGFzcyhmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFRpbWVvdXRFcnJvckltcGwoaW5mbykge1xuICAgICAgICBpZiAoaW5mbyA9PT0gdm9pZCAwKSB7IGluZm8gPSBudWxsOyB9XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ1RpbWVvdXQgaGFzIG9jY3VycmVkJztcbiAgICAgICAgdGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG4gICAgICAgIHRoaXMuaW5mbyA9IGluZm87XG4gICAgfTtcbn0pO1xuZnVuY3Rpb24gdGltZW91dChjb25maWcsIHNjaGVkdWxlckFyZykge1xuICAgIHZhciBfYSA9IChpc0RhdGVfMS5pc1ZhbGlkRGF0ZShjb25maWcpID8geyBmaXJzdDogY29uZmlnIH0gOiB0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJyA/IHsgZWFjaDogY29uZmlnIH0gOiBjb25maWcpLCBmaXJzdCA9IF9hLmZpcnN0LCBlYWNoID0gX2EuZWFjaCwgX2IgPSBfYS53aXRoLCBfd2l0aCA9IF9iID09PSB2b2lkIDAgPyB0aW1lb3V0RXJyb3JGYWN0b3J5IDogX2IsIF9jID0gX2Euc2NoZWR1bGVyLCBzY2hlZHVsZXIgPSBfYyA9PT0gdm9pZCAwID8gc2NoZWR1bGVyQXJnICE9PSBudWxsICYmIHNjaGVkdWxlckFyZyAhPT0gdm9pZCAwID8gc2NoZWR1bGVyQXJnIDogYXN5bmNfMS5hc3luY1NjaGVkdWxlciA6IF9jLCBfZCA9IF9hLm1ldGEsIG1ldGEgPSBfZCA9PT0gdm9pZCAwID8gbnVsbCA6IF9kO1xuICAgIGlmIChmaXJzdCA9PSBudWxsICYmIGVhY2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdObyB0aW1lb3V0IHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgb3JpZ2luYWxTb3VyY2VTdWJzY3JpcHRpb247XG4gICAgICAgIHZhciB0aW1lclN1YnNjcmlwdGlvbjtcbiAgICAgICAgdmFyIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIHZhciBzZWVuID0gMDtcbiAgICAgICAgdmFyIHN0YXJ0VGltZXIgPSBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgICAgICAgICAgIHRpbWVyU3Vic2NyaXB0aW9uID0gZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU291cmNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShfd2l0aCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhOiBtZXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFZhbHVlOiBsYXN0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWVuOiBzZWVuLFxuICAgICAgICAgICAgICAgICAgICB9KSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgIH07XG4gICAgICAgIG9yaWdpbmFsU291cmNlU3Vic2NyaXB0aW9uID0gc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aW1lclN1YnNjcmlwdGlvbiA9PT0gbnVsbCB8fCB0aW1lclN1YnNjcmlwdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGltZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHNlZW4rKztcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCgobGFzdFZhbHVlID0gdmFsdWUpKTtcbiAgICAgICAgICAgIGVhY2ggPiAwICYmIHN0YXJ0VGltZXIoZWFjaCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISh0aW1lclN1YnNjcmlwdGlvbiA9PT0gbnVsbCB8fCB0aW1lclN1YnNjcmlwdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGltZXJTdWJzY3JpcHRpb24uY2xvc2VkKSkge1xuICAgICAgICAgICAgICAgIHRpbWVyU3Vic2NyaXB0aW9uID09PSBudWxsIHx8IHRpbWVyU3Vic2NyaXB0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0aW1lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFZhbHVlID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgICAgICAhc2VlbiAmJiBzdGFydFRpbWVyKGZpcnN0ICE9IG51bGwgPyAodHlwZW9mIGZpcnN0ID09PSAnbnVtYmVyJyA/IGZpcnN0IDogK2ZpcnN0IC0gc2NoZWR1bGVyLm5vdygpKSA6IGVhY2gpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50aW1lb3V0ID0gdGltZW91dDtcbmZ1bmN0aW9uIHRpbWVvdXRFcnJvckZhY3RvcnkoaW5mbykge1xuICAgIHRocm93IG5ldyBleHBvcnRzLlRpbWVvdXRFcnJvcihpbmZvKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRpbWVvdXRXaXRoID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIGlzRGF0ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNEYXRlXCIpO1xudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuL3RpbWVvdXRcIik7XG5mdW5jdGlvbiB0aW1lb3V0V2l0aChkdWUsIHdpdGhPYnNlcnZhYmxlLCBzY2hlZHVsZXIpIHtcbiAgICB2YXIgZmlyc3Q7XG4gICAgdmFyIGVhY2g7XG4gICAgdmFyIF93aXRoO1xuICAgIHNjaGVkdWxlciA9IHNjaGVkdWxlciAhPT0gbnVsbCAmJiBzY2hlZHVsZXIgIT09IHZvaWQgMCA/IHNjaGVkdWxlciA6IGFzeW5jXzEuYXN5bmM7XG4gICAgaWYgKGlzRGF0ZV8xLmlzVmFsaWREYXRlKGR1ZSkpIHtcbiAgICAgICAgZmlyc3QgPSBkdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGVhY2ggPSBkdWU7XG4gICAgfVxuICAgIGlmICh3aXRoT2JzZXJ2YWJsZSkge1xuICAgICAgICBfd2l0aCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpdGhPYnNlcnZhYmxlOyB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm8gb2JzZXJ2YWJsZSBwcm92aWRlZCB0byBzd2l0Y2ggdG8nKTtcbiAgICB9XG4gICAgaWYgKGZpcnN0ID09IG51bGwgJiYgZWFjaCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vIHRpbWVvdXQgcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aW1lb3V0XzEudGltZW91dCh7XG4gICAgICAgIGZpcnN0OiBmaXJzdCxcbiAgICAgICAgZWFjaDogZWFjaCxcbiAgICAgICAgc2NoZWR1bGVyOiBzY2hlZHVsZXIsXG4gICAgICAgIHdpdGg6IF93aXRoLFxuICAgIH0pO1xufVxuZXhwb3J0cy50aW1lb3V0V2l0aCA9IHRpbWVvdXRXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZW91dFdpdGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRpbWVzdGFtcCA9IHZvaWQgMDtcbnZhciBkYXRlVGltZXN0YW1wUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXCIpO1xudmFyIG1hcF8xID0gcmVxdWlyZShcIi4vbWFwXCIpO1xuZnVuY3Rpb24gdGltZXN0YW1wKHRpbWVzdGFtcFByb3ZpZGVyKSB7XG4gICAgaWYgKHRpbWVzdGFtcFByb3ZpZGVyID09PSB2b2lkIDApIHsgdGltZXN0YW1wUHJvdmlkZXIgPSBkYXRlVGltZXN0YW1wUHJvdmlkZXJfMS5kYXRlVGltZXN0YW1wUHJvdmlkZXI7IH1cbiAgICByZXR1cm4gbWFwXzEubWFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKHsgdmFsdWU6IHZhbHVlLCB0aW1lc3RhbXA6IHRpbWVzdGFtcFByb3ZpZGVyLm5vdygpIH0pOyB9KTtcbn1cbmV4cG9ydHMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZXN0YW1wLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50b0FycmF5ID0gdm9pZCAwO1xudmFyIHJlZHVjZV8xID0gcmVxdWlyZShcIi4vcmVkdWNlXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgYXJyUmVkdWNlciA9IGZ1bmN0aW9uIChhcnIsIHZhbHVlKSB7IHJldHVybiAoYXJyLnB1c2godmFsdWUpLCBhcnIpOyB9O1xuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICByZWR1Y2VfMS5yZWR1Y2UoYXJyUmVkdWNlciwgW10pKHNvdXJjZSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50b0FycmF5ID0gdG9BcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvQXJyYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndpbmRvdyA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiB3aW5kb3cod2luZG93Qm91bmRhcmllcykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciB3aW5kb3dTdWJqZWN0ID0gbmV3IFN1YmplY3RfMS5TdWJqZWN0KCk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh3aW5kb3dTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpKTtcbiAgICAgICAgdmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHdpbmRvd1N1YmplY3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB3aW5kb3dTdWJqZWN0ID09PSBudWxsIHx8IHdpbmRvd1N1YmplY3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd1N1YmplY3QubmV4dCh2YWx1ZSk7IH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvd1N1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKSk7XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbSh3aW5kb3dCb3VuZGFyaWVzKS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvd1N1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCgod2luZG93U3ViamVjdCA9IG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpKSk7XG4gICAgICAgIH0sIG5vb3BfMS5ub29wLCBlcnJvckhhbmRsZXIpKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvd1N1YmplY3QgPT09IG51bGwgfHwgd2luZG93U3ViamVjdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93U3ViamVjdC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgd2luZG93U3ViamVjdCA9IG51bGw7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLndpbmRvdyA9IHdpbmRvdztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpbmRvdy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2luZG93Q291bnQgPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1N1YmplY3RcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHdpbmRvd0NvdW50KHdpbmRvd1NpemUsIHN0YXJ0V2luZG93RXZlcnkpIHtcbiAgICBpZiAoc3RhcnRXaW5kb3dFdmVyeSA9PT0gdm9pZCAwKSB7IHN0YXJ0V2luZG93RXZlcnkgPSAwOyB9XG4gICAgdmFyIHN0YXJ0RXZlcnkgPSBzdGFydFdpbmRvd0V2ZXJ5ID4gMCA/IHN0YXJ0V2luZG93RXZlcnkgOiB3aW5kb3dTaXplO1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciB3aW5kb3dzID0gW25ldyBTdWJqZWN0XzEuU3ViamVjdCgpXTtcbiAgICAgICAgdmFyIHN0YXJ0cyA9IFtdO1xuICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQod2luZG93c1swXS5hc09ic2VydmFibGUoKSk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHdpbmRvd3NfMSA9IF9fdmFsdWVzKHdpbmRvd3MpLCB3aW5kb3dzXzFfMSA9IHdpbmRvd3NfMS5uZXh0KCk7ICF3aW5kb3dzXzFfMS5kb25lOyB3aW5kb3dzXzFfMSA9IHdpbmRvd3NfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd18xID0gd2luZG93c18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd18xLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93c18xXzEgJiYgIXdpbmRvd3NfMV8xLmRvbmUgJiYgKF9hID0gd2luZG93c18xLnJldHVybikpIF9hLmNhbGwod2luZG93c18xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGMgPSBjb3VudCAtIHdpbmRvd1NpemUgKyAxO1xuICAgICAgICAgICAgaWYgKGMgPj0gMCAmJiBjICUgc3RhcnRFdmVyeSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHdpbmRvd3Muc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCsrY291bnQgJSBzdGFydEV2ZXJ5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd18yID0gbmV3IFN1YmplY3RfMS5TdWJqZWN0KCk7XG4gICAgICAgICAgICAgICAgd2luZG93cy5wdXNoKHdpbmRvd18yKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQod2luZG93XzIuYXNPYnNlcnZhYmxlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aGlsZSAod2luZG93cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgd2luZG93cy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHdoaWxlICh3aW5kb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dzLnNoaWZ0KCkuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhcnRzID0gbnVsbDtcbiAgICAgICAgICAgIHdpbmRvd3MgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLndpbmRvd0NvdW50ID0gd2luZG93Q291bnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aW5kb3dDb3VudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2luZG93VGltZSA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBhcnJSZW1vdmVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyclJlbW92ZVwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIGV4ZWN1dGVTY2hlZHVsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlXCIpO1xuZnVuY3Rpb24gd2luZG93VGltZSh3aW5kb3dUaW1lU3Bhbikge1xuICAgIHZhciBfYSwgX2I7XG4gICAgdmFyIG90aGVyQXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIG90aGVyQXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IChfYSA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIob3RoZXJBcmdzKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYXN5bmNfMS5hc3luY1NjaGVkdWxlcjtcbiAgICB2YXIgd2luZG93Q3JlYXRpb25JbnRlcnZhbCA9IChfYiA9IG90aGVyQXJnc1swXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVsbDtcbiAgICB2YXIgbWF4V2luZG93U2l6ZSA9IG90aGVyQXJnc1sxXSB8fCBJbmZpbml0eTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgd2luZG93UmVjb3JkcyA9IFtdO1xuICAgICAgICB2YXIgcmVzdGFydE9uQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgdmFyIGNsb3NlV2luZG93ID0gZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgICAgICAgdmFyIHdpbmRvdyA9IHJlY29yZC53aW5kb3csIHN1YnMgPSByZWNvcmQuc3VicztcbiAgICAgICAgICAgIHdpbmRvdy5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgc3Vicy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKHdpbmRvd1JlY29yZHMsIHJlY29yZCk7XG4gICAgICAgICAgICByZXN0YXJ0T25DbG9zZSAmJiBzdGFydFdpbmRvdygpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc3RhcnRXaW5kb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAod2luZG93UmVjb3Jkcykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJzID0gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKHN1YnMpO1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dfMSA9IG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpO1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmRfMSA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93OiB3aW5kb3dfMSxcbiAgICAgICAgICAgICAgICAgICAgc3Viczogc3VicyxcbiAgICAgICAgICAgICAgICAgICAgc2VlbjogMCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHdpbmRvd1JlY29yZHMucHVzaChyZWNvcmRfMSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHdpbmRvd18xLmFzT2JzZXJ2YWJsZSgpKTtcbiAgICAgICAgICAgICAgICBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vicywgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjbG9zZVdpbmRvdyhyZWNvcmRfMSk7IH0sIHdpbmRvd1RpbWVTcGFuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHdpbmRvd0NyZWF0aW9uSW50ZXJ2YWwgIT09IG51bGwgJiYgd2luZG93Q3JlYXRpb25JbnRlcnZhbCA+PSAwKSB7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBzdGFydFdpbmRvdywgd2luZG93Q3JlYXRpb25JbnRlcnZhbCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN0YXJ0T25DbG9zZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnRXaW5kb3coKTtcbiAgICAgICAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoY2IpIHsgcmV0dXJuIHdpbmRvd1JlY29yZHMuc2xpY2UoKS5mb3JFYWNoKGNiKTsgfTtcbiAgICAgICAgdmFyIHRlcm1pbmF0ZSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgbG9vcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93ID0gX2Eud2luZG93O1xuICAgICAgICAgICAgICAgIHJldHVybiBjYih3aW5kb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBsb29wKGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgICAgICByZWNvcmQud2luZG93Lm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIG1heFdpbmRvd1NpemUgPD0gKytyZWNvcmQuc2VlbiAmJiBjbG9zZVdpbmRvdyhyZWNvcmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRlcm1pbmF0ZShmdW5jdGlvbiAoY29uc3VtZXIpIHsgcmV0dXJuIGNvbnN1bWVyLmNvbXBsZXRlKCk7IH0pOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiB0ZXJtaW5hdGUoZnVuY3Rpb24gKGNvbnN1bWVyKSB7IHJldHVybiBjb25zdW1lci5lcnJvcihlcnIpOyB9KTsgfSkpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93UmVjb3JkcyA9IG51bGw7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLndpbmRvd1RpbWUgPSB3aW5kb3dUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93VGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2luZG93VG9nZ2xlID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmlwdGlvblwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgYXJyUmVtb3ZlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcnJSZW1vdmVcIik7XG5mdW5jdGlvbiB3aW5kb3dUb2dnbGUob3BlbmluZ3MsIGNsb3NpbmdTZWxlY3Rvcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciB3aW5kb3dzID0gW107XG4gICAgICAgIHZhciBoYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHdoaWxlICgwIDwgd2luZG93cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dzLnNoaWZ0KCkuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKG9wZW5pbmdzKS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChvcGVuVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB3aW5kb3cgPSBuZXcgU3ViamVjdF8xLlN1YmplY3QoKTtcbiAgICAgICAgICAgIHdpbmRvd3MucHVzaCh3aW5kb3cpO1xuICAgICAgICAgICAgdmFyIGNsb3NpbmdTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICB2YXIgY2xvc2VXaW5kb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKHdpbmRvd3MsIHdpbmRvdyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgY2xvc2luZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjbG9zaW5nTm90aWZpZXI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNsb3NpbmdOb3RpZmllciA9IGlubmVyRnJvbV8xLmlubmVyRnJvbShjbG9zaW5nU2VsZWN0b3Iob3BlblZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQod2luZG93LmFzT2JzZXJ2YWJsZSgpKTtcbiAgICAgICAgICAgIGNsb3NpbmdTdWJzY3JpcHRpb24uYWRkKGNsb3NpbmdOb3RpZmllci5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGNsb3NlV2luZG93LCBub29wXzEubm9vcCwgaGFuZGxlRXJyb3IpKSk7XG4gICAgICAgIH0sIG5vb3BfMS5ub29wKSk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgICAgICB2YXIgd2luZG93c0NvcHkgPSB3aW5kb3dzLnNsaWNlKCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHdpbmRvd3NDb3B5XzEgPSBfX3ZhbHVlcyh3aW5kb3dzQ29weSksIHdpbmRvd3NDb3B5XzFfMSA9IHdpbmRvd3NDb3B5XzEubmV4dCgpOyAhd2luZG93c0NvcHlfMV8xLmRvbmU7IHdpbmRvd3NDb3B5XzFfMSA9IHdpbmRvd3NDb3B5XzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dfMSA9IHdpbmRvd3NDb3B5XzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93XzEubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3dzQ29weV8xXzEgJiYgIXdpbmRvd3NDb3B5XzFfMS5kb25lICYmIChfYSA9IHdpbmRvd3NDb3B5XzEucmV0dXJuKSkgX2EuY2FsbCh3aW5kb3dzQ29weV8xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aGlsZSAoMCA8IHdpbmRvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgd2luZG93cy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIGhhbmRsZUVycm9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aGlsZSAoMCA8IHdpbmRvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgd2luZG93cy5zaGlmdCgpLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMud2luZG93VG9nZ2xlID0gd2luZG93VG9nZ2xlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93VG9nZ2xlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy53aW5kb3dXaGVuID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiB3aW5kb3dXaGVuKGNsb3NpbmdTZWxlY3Rvcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciB3aW5kb3c7XG4gICAgICAgIHZhciBjbG9zaW5nU3Vic2NyaWJlcjtcbiAgICAgICAgdmFyIGhhbmRsZUVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgd2luZG93LmVycm9yKGVycik7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcGVuV2luZG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2luZ1N1YnNjcmliZXIgPT09IG51bGwgfHwgY2xvc2luZ1N1YnNjcmliZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNsb3NpbmdTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB3aW5kb3cgPT09IG51bGwgfHwgd2luZG93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3cuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHdpbmRvdyA9IG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHdpbmRvdy5hc09ic2VydmFibGUoKSk7XG4gICAgICAgICAgICB2YXIgY2xvc2luZ05vdGlmaWVyO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjbG9zaW5nTm90aWZpZXIgPSBpbm5lckZyb21fMS5pbm5lckZyb20oY2xvc2luZ1NlbGVjdG9yKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xvc2luZ05vdGlmaWVyLnN1YnNjcmliZSgoY2xvc2luZ1N1YnNjcmliZXIgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgb3BlbldpbmRvdywgb3BlbldpbmRvdywgaGFuZGxlRXJyb3IpKSk7XG4gICAgICAgIH07XG4gICAgICAgIG9wZW5XaW5kb3coKTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB3aW5kb3cubmV4dCh2YWx1ZSk7IH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LCBoYW5kbGVFcnJvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2luZ1N1YnNjcmliZXIgPT09IG51bGwgfHwgY2xvc2luZ1N1YnNjcmliZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNsb3NpbmdTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB3aW5kb3cgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLndpbmRvd1doZW4gPSB3aW5kb3dXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93V2hlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndpdGhMYXRlc3RGcm9tID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbmZ1bmN0aW9uIHdpdGhMYXRlc3RGcm9tKCkge1xuICAgIHZhciBpbnB1dHMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBpbnB1dHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHByb2plY3QgPSBhcmdzXzEucG9wUmVzdWx0U2VsZWN0b3IoaW5wdXRzKTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgbGVuID0gaW5wdXRzLmxlbmd0aDtcbiAgICAgICAgdmFyIG90aGVyVmFsdWVzID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgIHZhciBoYXNWYWx1ZSA9IGlucHV0cy5tYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuICAgICAgICB2YXIgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGlucHV0c1tpXSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvdGhlclZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcmVhZHkgJiYgIWhhc1ZhbHVlW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1ZhbHVlW2ldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgKHJlYWR5ID0gaGFzVmFsdWUuZXZlcnkoaWRlbnRpdHlfMS5pZGVudGl0eSkpICYmIChoYXNWYWx1ZSA9IG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG5vb3BfMS5ub29wKSk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIF9sb29wXzEoaSk7XG4gICAgICAgIH1cbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAocmVhZHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gX19zcHJlYWRBcnJheShbdmFsdWVdLCBfX3JlYWQob3RoZXJWYWx1ZXMpKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQocHJvamVjdCA/IHByb2plY3QuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQodmFsdWVzKSkpIDogdmFsdWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy53aXRoTGF0ZXN0RnJvbSA9IHdpdGhMYXRlc3RGcm9tO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2l0aExhdGVzdEZyb20uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy56aXAgPSB2b2lkIDA7XG52YXIgemlwXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS96aXBcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbmZ1bmN0aW9uIHppcCgpIHtcbiAgICB2YXIgc291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgemlwXzEuemlwLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbc291cmNlXSwgX19yZWFkKHNvdXJjZXMpKSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD16aXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnppcEFsbCA9IHZvaWQgMDtcbnZhciB6aXBfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL3ppcFwiKTtcbnZhciBqb2luQWxsSW50ZXJuYWxzXzEgPSByZXF1aXJlKFwiLi9qb2luQWxsSW50ZXJuYWxzXCIpO1xuZnVuY3Rpb24gemlwQWxsKHByb2plY3QpIHtcbiAgICByZXR1cm4gam9pbkFsbEludGVybmFsc18xLmpvaW5BbGxJbnRlcm5hbHMoemlwXzEuemlwLCBwcm9qZWN0KTtcbn1cbmV4cG9ydHMuemlwQWxsID0gemlwQWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9emlwQWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuemlwV2l0aCA9IHZvaWQgMDtcbnZhciB6aXBfMSA9IHJlcXVpcmUoXCIuL3ppcFwiKTtcbmZ1bmN0aW9uIHppcFdpdGgoKSB7XG4gICAgdmFyIG90aGVySW5wdXRzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgb3RoZXJJbnB1dHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHppcF8xLnppcC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChvdGhlcklucHV0cykpKTtcbn1cbmV4cG9ydHMuemlwV2l0aCA9IHppcFdpdGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD16aXBXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2hlZHVsZUFycmF5ID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xuZnVuY3Rpb24gc2NoZWR1bGVBcnJheShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGkgPT09IGlucHV0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChpbnB1dFtpKytdKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zY2hlZHVsZUFycmF5ID0gc2NoZWR1bGVBcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXJyYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlQXN5bmNJdGVyYWJsZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlQXN5bmNJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhYmxlIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaW5wdXRbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNjaGVkdWxlQXN5bmNJdGVyYWJsZSA9IHNjaGVkdWxlQXN5bmNJdGVyYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXN5bmNJdGVyYWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2NoZWR1bGVJdGVyYWJsZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBpdGVyYXRvcl8xID0gcmVxdWlyZShcIi4uL3N5bWJvbC9pdGVyYXRvclwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIGV4ZWN1dGVTY2hlZHVsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlXCIpO1xuZnVuY3Rpb24gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3I7XG4gICAgICAgIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yID0gaW5wdXRbaXRlcmF0b3JfMS5pdGVyYXRvcl0oKTtcbiAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBkb25lO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGl0ZXJhdG9yLm5leHQoKSwgdmFsdWUgPSBfYS52YWx1ZSwgZG9uZSA9IF9hLmRvbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDAsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGl0ZXJhdG9yID09PSBudWxsIHx8IGl0ZXJhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpdGVyYXRvci5yZXR1cm4pICYmIGl0ZXJhdG9yLnJldHVybigpOyB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy5zY2hlZHVsZUl0ZXJhYmxlID0gc2NoZWR1bGVJdGVyYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlSXRlcmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBvYnNlcnZlT25fMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uXCIpO1xudmFyIHN1YnNjcmliZU9uXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL3N1YnNjcmliZU9uXCIpO1xuZnVuY3Rpb24gc2NoZWR1bGVPYnNlcnZhYmxlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGlucHV0KS5waXBlKHN1YnNjcmliZU9uXzEuc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uXzEub2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xufVxuZXhwb3J0cy5zY2hlZHVsZU9ic2VydmFibGUgPSBzY2hlZHVsZU9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZU9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlUHJvbWlzZSA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBvYnNlcnZlT25fMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uXCIpO1xudmFyIHN1YnNjcmliZU9uXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL3N1YnNjcmliZU9uXCIpO1xuZnVuY3Rpb24gc2NoZWR1bGVQcm9taXNlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGlucHV0KS5waXBlKHN1YnNjcmliZU9uXzEuc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uXzEub2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xufVxuZXhwb3J0cy5zY2hlZHVsZVByb21pc2UgPSBzY2hlZHVsZVByb21pc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZVByb21pc2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlID0gdm9pZCAwO1xudmFyIHNjaGVkdWxlQXN5bmNJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVBc3luY0l0ZXJhYmxlXCIpO1xudmFyIGlzUmVhZGFibGVTdHJlYW1MaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVBc3luY0l0ZXJhYmxlXzEuc2NoZWR1bGVBc3luY0l0ZXJhYmxlKGlzUmVhZGFibGVTdHJlYW1MaWtlXzEucmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihpbnB1dCksIHNjaGVkdWxlcik7XG59XG5leHBvcnRzLnNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlID0gc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2NoZWR1bGVkID0gdm9pZCAwO1xudmFyIHNjaGVkdWxlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVPYnNlcnZhYmxlXCIpO1xudmFyIHNjaGVkdWxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVQcm9taXNlXCIpO1xudmFyIHNjaGVkdWxlQXJyYXlfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlQXJyYXlcIik7XG52YXIgc2NoZWR1bGVJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVJdGVyYWJsZVwiKTtcbnZhciBzY2hlZHVsZUFzeW5jSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlQXN5bmNJdGVyYWJsZVwiKTtcbnZhciBpc0ludGVyb3BPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlXCIpO1xudmFyIGlzUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNQcm9taXNlXCIpO1xudmFyIGlzQXJyYXlMaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0FycmF5TGlrZVwiKTtcbnZhciBpc0l0ZXJhYmxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0l0ZXJhYmxlXCIpO1xudmFyIGlzQXN5bmNJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNBc3luY0l0ZXJhYmxlXCIpO1xudmFyIHRocm93VW5vYnNlcnZhYmxlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3JcIik7XG52YXIgaXNSZWFkYWJsZVN0cmVhbUxpa2VfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlXCIpO1xudmFyIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlXzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlZChpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzSW50ZXJvcE9ic2VydmFibGVfMS5pc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlT2JzZXJ2YWJsZV8xLnNjaGVkdWxlT2JzZXJ2YWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheUxpa2VfMS5pc0FycmF5TGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFycmF5XzEuc2NoZWR1bGVBcnJheShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcm9taXNlXzEuaXNQcm9taXNlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlUHJvbWlzZV8xLnNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBc3luY0l0ZXJhYmxlXzEuaXNBc3luY0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlQXN5bmNJdGVyYWJsZV8xLnNjaGVkdWxlQXN5bmNJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYWJsZV8xLmlzSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVJdGVyYWJsZV8xLnNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmVhZGFibGVTdHJlYW1MaWtlXzEuaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2VfMS5zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyB0aHJvd1Vub2JzZXJ2YWJsZUVycm9yXzEuY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpO1xufVxuZXhwb3J0cy5zY2hlZHVsZWQgPSBzY2hlZHVsZWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BY3Rpb24gPSB2b2lkIDA7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIEFjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gQWN0aW9uO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuQWN0aW9uID0gQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQW5pbWF0aW9uRnJhbWVBY3Rpb24gPSB2b2lkIDA7XG52YXIgQXN5bmNBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FzeW5jQWN0aW9uXCIpO1xudmFyIGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL2FuaW1hdGlvbkZyYW1lUHJvdmlkZXJcIik7XG52YXIgQW5pbWF0aW9uRnJhbWVBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbmltYXRpb25GcmFtZUFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbmltYXRpb25GcmFtZUFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFuaW1hdGlvbkZyYW1lQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKGRlbGF5ICE9PSBudWxsICYmIGRlbGF5ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVyLmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5fc2NoZWR1bGVkIHx8IChzY2hlZHVsZXIuX3NjaGVkdWxlZCA9IGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMS5hbmltYXRpb25GcmFtZVByb3ZpZGVyLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlZHVsZXIuZmx1c2godW5kZWZpbmVkKTsgfSkpO1xuICAgIH07XG4gICAgQW5pbWF0aW9uRnJhbWVBY3Rpb24ucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmIChkZWxheSAhPSBudWxsID8gZGVsYXkgPiAwIDogdGhpcy5kZWxheSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhY3Rpb25zID0gc2NoZWR1bGVyLmFjdGlvbnM7XG4gICAgICAgIGlmIChpZCAhPSBudWxsICYmIGlkID09PSBzY2hlZHVsZXIuX3NjaGVkdWxlZCAmJiAoKF9hID0gYWN0aW9uc1thY3Rpb25zLmxlbmd0aCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpICE9PSBpZCkge1xuICAgICAgICAgICAgYW5pbWF0aW9uRnJhbWVQcm92aWRlcl8xLmFuaW1hdGlvbkZyYW1lUHJvdmlkZXIuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgc2NoZWR1bGVyLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHJldHVybiBBbmltYXRpb25GcmFtZUFjdGlvbjtcbn0oQXN5bmNBY3Rpb25fMS5Bc3luY0FjdGlvbikpO1xuZXhwb3J0cy5BbmltYXRpb25GcmFtZUFjdGlvbiA9IEFuaW1hdGlvbkZyYW1lQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QW5pbWF0aW9uRnJhbWVBY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BbmltYXRpb25GcmFtZVNjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBBc3luY1NjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4vQXN5bmNTY2hlZHVsZXJcIik7XG52YXIgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbmltYXRpb25GcmFtZVNjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbmltYXRpb25GcmFtZVNjaGVkdWxlcigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBBbmltYXRpb25GcmFtZVNjaGVkdWxlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciBmbHVzaElkO1xuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgICBmbHVzaElkID0gYWN0aW9uLmlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZmx1c2hJZCA9IHRoaXMuX3NjaGVkdWxlZDtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICBhY3Rpb24gPSBhY3Rpb24gfHwgYWN0aW9ucy5zaGlmdCgpO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgoYWN0aW9uID0gYWN0aW9uc1swXSkgJiYgYWN0aW9uLmlkID09PSBmbHVzaElkICYmIGFjdGlvbnMuc2hpZnQoKSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9uc1swXSkgJiYgYWN0aW9uLmlkID09PSBmbHVzaElkICYmIGFjdGlvbnMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBbmltYXRpb25GcmFtZVNjaGVkdWxlcjtcbn0oQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0cy5BbmltYXRpb25GcmFtZVNjaGVkdWxlciA9IEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc2FwQWN0aW9uID0gdm9pZCAwO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9Bc3luY0FjdGlvblwiKTtcbnZhciBpbW1lZGlhdGVQcm92aWRlcl8xID0gcmVxdWlyZShcIi4vaW1tZWRpYXRlUHJvdmlkZXJcIik7XG52YXIgQXNhcEFjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzYXBBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXNhcEFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzYXBBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoZGVsYXkgIT09IG51bGwgJiYgZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZC5jYWxsKHRoaXMsIHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZXIuYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyLl9zY2hlZHVsZWQgfHwgKHNjaGVkdWxlci5fc2NoZWR1bGVkID0gaW1tZWRpYXRlUHJvdmlkZXJfMS5pbW1lZGlhdGVQcm92aWRlci5zZXRJbW1lZGlhdGUoc2NoZWR1bGVyLmZsdXNoLmJpbmQoc2NoZWR1bGVyLCB1bmRlZmluZWQpKSk7XG4gICAgfTtcbiAgICBBc2FwQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoZGVsYXkgIT0gbnVsbCA/IGRlbGF5ID4gMCA6IHRoaXMuZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZC5jYWxsKHRoaXMsIHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWN0aW9ucyA9IHNjaGVkdWxlci5hY3Rpb25zO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCAmJiAoKF9hID0gYWN0aW9uc1thY3Rpb25zLmxlbmd0aCAtIDFdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpICE9PSBpZCkge1xuICAgICAgICAgICAgaW1tZWRpYXRlUHJvdmlkZXJfMS5pbW1lZGlhdGVQcm92aWRlci5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgICAgICAgICBpZiAoc2NoZWR1bGVyLl9zY2hlZHVsZWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGVyLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHJldHVybiBBc2FwQWN0aW9uO1xufShBc3luY0FjdGlvbl8xLkFzeW5jQWN0aW9uKSk7XG5leHBvcnRzLkFzYXBBY3Rpb24gPSBBc2FwQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXNhcEFjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFzYXBTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xudmFyIEFzYXBTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc2FwU2NoZWR1bGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzYXBTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgQXNhcFNjaGVkdWxlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciBmbHVzaElkID0gdGhpcy5fc2NoZWR1bGVkO1xuICAgICAgICB0aGlzLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIGFjdGlvbiA9IGFjdGlvbiB8fCBhY3Rpb25zLnNoaWZ0KCk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICgoZXJyb3IgPSBhY3Rpb24uZXhlY3V0ZShhY3Rpb24uc3RhdGUsIGFjdGlvbi5kZWxheSkpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKChhY3Rpb24gPSBhY3Rpb25zWzBdKSAmJiBhY3Rpb24uaWQgPT09IGZsdXNoSWQgJiYgYWN0aW9ucy5zaGlmdCgpKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgd2hpbGUgKChhY3Rpb24gPSBhY3Rpb25zWzBdKSAmJiBhY3Rpb24uaWQgPT09IGZsdXNoSWQgJiYgYWN0aW9ucy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFzYXBTY2hlZHVsZXI7XG59KEFzeW5jU2NoZWR1bGVyXzEuQXN5bmNTY2hlZHVsZXIpKTtcbmV4cG9ydHMuQXNhcFNjaGVkdWxlciA9IEFzYXBTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bc2FwU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXN5bmNBY3Rpb24gPSB2b2lkIDA7XG52YXIgQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9BY3Rpb25cIik7XG52YXIgaW50ZXJ2YWxQcm92aWRlcl8xID0gcmVxdWlyZShcIi4vaW50ZXJ2YWxQcm92aWRlclwiKTtcbnZhciBhcnJSZW1vdmVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyclJlbW92ZVwiKTtcbnZhciBBc3luY0FjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzeW5jQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIHdvcmspIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMud29yayA9IHdvcms7XG4gICAgICAgIF90aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuICAgICAgICB0aGlzLmlkID0gKF9hID0gdGhpcy5pZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5yZXF1ZXN0QXN5bmNJZChzY2hlZHVsZXIsIHRoaXMuaWQsIGRlbGF5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBfaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gaW50ZXJ2YWxQcm92aWRlcl8xLmludGVydmFsUHJvdmlkZXIuc2V0SW50ZXJ2YWwoc2NoZWR1bGVyLmZsdXNoLmJpbmQoc2NoZWR1bGVyLCB0aGlzKSwgZGVsYXkpO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkID0gZnVuY3Rpb24gKF9zY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKGRlbGF5ICE9IG51bGwgJiYgdGhpcy5kZWxheSA9PT0gZGVsYXkgJiYgdGhpcy5wZW5kaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbnRlcnZhbFByb3ZpZGVyXzEuaW50ZXJ2YWxQcm92aWRlci5jbGVhckludGVydmFsKGlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignZXhlY3V0aW5nIGEgY2FuY2VsbGVkIGFjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3IgPSB0aGlzLl9leGVjdXRlKHN0YXRlLCBkZWxheSk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGVuZGluZyA9PT0gZmFsc2UgJiYgdGhpcy5pZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZCh0aGlzLnNjaGVkdWxlciwgdGhpcy5pZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgX2RlbGF5KSB7XG4gICAgICAgIHZhciBlcnJvcmVkID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvclZhbHVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy53b3JrKHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XG4gICAgICAgICAgICBlcnJvclZhbHVlID0gZSA/IGUgOiBuZXcgRXJyb3IoJ1NjaGVkdWxlZCBhY3Rpb24gdGhyZXcgZmFsc3kgZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3JlZCkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yVmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdmFyIF9hID0gdGhpcywgaWQgPSBfYS5pZCwgc2NoZWR1bGVyID0gX2Euc2NoZWR1bGVyO1xuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBzY2hlZHVsZXIuYWN0aW9ucztcbiAgICAgICAgICAgIHRoaXMud29yayA9IHRoaXMuc3RhdGUgPSB0aGlzLnNjaGVkdWxlciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGFyclJlbW92ZV8xLmFyclJlbW92ZShhY3Rpb25zLCB0aGlzKTtcbiAgICAgICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gbnVsbDtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jQWN0aW9uO1xufShBY3Rpb25fMS5BY3Rpb24pKTtcbmV4cG9ydHMuQXN5bmNBY3Rpb24gPSBBc3luY0FjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jQWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXN5bmNTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi4vU2NoZWR1bGVyXCIpO1xudmFyIEFzeW5jU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNTY2hlZHVsZXIoU2NoZWR1bGVyQWN0aW9uLCBub3cpIHtcbiAgICAgICAgaWYgKG5vdyA9PT0gdm9pZCAwKSB7IG5vdyA9IFNjaGVkdWxlcl8xLlNjaGVkdWxlci5ub3c7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU2NoZWR1bGVyQWN0aW9uLCBub3cpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgX3RoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzeW5jU2NoZWR1bGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNTY2hlZHVsZXI7XG59KFNjaGVkdWxlcl8xLlNjaGVkdWxlcikpO1xuZXhwb3J0cy5Bc3luY1NjaGVkdWxlciA9IEFzeW5jU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5RdWV1ZUFjdGlvbiA9IHZvaWQgMDtcbnZhciBBc3luY0FjdGlvbl8xID0gcmVxdWlyZShcIi4vQXN5bmNBY3Rpb25cIik7XG52YXIgUXVldWVBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhRdWV1ZUFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBRdWV1ZUFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFF1ZXVlQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmIChkZWxheSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnNjaGVkdWxlLmNhbGwodGhpcywgc3RhdGUsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIuZmx1c2godGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgUXVldWVBY3Rpb24ucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIHJldHVybiBkZWxheSA+IDAgfHwgdGhpcy5jbG9zZWQgPyBfc3VwZXIucHJvdG90eXBlLmV4ZWN1dGUuY2FsbCh0aGlzLCBzdGF0ZSwgZGVsYXkpIDogdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgIH07XG4gICAgUXVldWVBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoKGRlbGF5ICE9IG51bGwgJiYgZGVsYXkgPiAwKSB8fCAoZGVsYXkgPT0gbnVsbCAmJiB0aGlzLmRlbGF5ID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlci5mbHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICByZXR1cm4gUXVldWVBY3Rpb247XG59KEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pKTtcbmV4cG9ydHMuUXVldWVBY3Rpb24gPSBRdWV1ZUFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlQWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUXVldWVTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xudmFyIFF1ZXVlU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUXVldWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUXVldWVTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFF1ZXVlU2NoZWR1bGVyO1xufShBc3luY1NjaGVkdWxlcl8xLkFzeW5jU2NoZWR1bGVyKSk7XG5leHBvcnRzLlF1ZXVlU2NoZWR1bGVyID0gUXVldWVTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZVNjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZpcnR1YWxBY3Rpb24gPSBleHBvcnRzLlZpcnR1YWxUaW1lU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9Bc3luY0FjdGlvblwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xudmFyIFZpcnR1YWxUaW1lU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVmlydHVhbFRpbWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVmlydHVhbFRpbWVTY2hlZHVsZXIoc2NoZWR1bGVyQWN0aW9uQ3RvciwgbWF4RnJhbWVzKSB7XG4gICAgICAgIGlmIChzY2hlZHVsZXJBY3Rpb25DdG9yID09PSB2b2lkIDApIHsgc2NoZWR1bGVyQWN0aW9uQ3RvciA9IFZpcnR1YWxBY3Rpb247IH1cbiAgICAgICAgaWYgKG1heEZyYW1lcyA9PT0gdm9pZCAwKSB7IG1heEZyYW1lcyA9IEluZmluaXR5OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlckFjdGlvbkN0b3IsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmZyYW1lOyB9KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5tYXhGcmFtZXMgPSBtYXhGcmFtZXM7XG4gICAgICAgIF90aGlzLmZyYW1lID0gMDtcbiAgICAgICAgX3RoaXMuaW5kZXggPSAtMTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBWaXJ0dWFsVGltZVNjaGVkdWxlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGFjdGlvbnMgPSBfYS5hY3Rpb25zLCBtYXhGcmFtZXMgPSBfYS5tYXhGcmFtZXM7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgdmFyIGFjdGlvbjtcbiAgICAgICAgd2hpbGUgKChhY3Rpb24gPSBhY3Rpb25zWzBdKSAmJiBhY3Rpb24uZGVsYXkgPD0gbWF4RnJhbWVzKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gYWN0aW9uLmRlbGF5O1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpcnR1YWxUaW1lU2NoZWR1bGVyLmZyYW1lVGltZUZhY3RvciA9IDEwO1xuICAgIHJldHVybiBWaXJ0dWFsVGltZVNjaGVkdWxlcjtcbn0oQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0cy5WaXJ0dWFsVGltZVNjaGVkdWxlciA9IFZpcnR1YWxUaW1lU2NoZWR1bGVyO1xudmFyIFZpcnR1YWxBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhWaXJ0dWFsQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFZpcnR1YWxBY3Rpb24oc2NoZWR1bGVyLCB3b3JrLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IChzY2hlZHVsZXIuaW5kZXggKz0gMSk7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICBfdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICBfdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBfdGhpcy5pbmRleCA9IHNjaGVkdWxlci5pbmRleCA9IGluZGV4O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFZpcnR1YWxBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShkZWxheSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnNjaGVkdWxlLmNhbGwodGhpcywgc3RhdGUsIGRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gbmV3IFZpcnR1YWxBY3Rpb24odGhpcy5zY2hlZHVsZXIsIHRoaXMud29yayk7XG4gICAgICAgICAgICB0aGlzLmFkZChhY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVmlydHVhbEFjdGlvbi5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHRoaXMuZGVsYXkgPSBzY2hlZHVsZXIuZnJhbWUgKyBkZWxheTtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBzY2hlZHVsZXIuYWN0aW9ucztcbiAgICAgICAgYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgICBhY3Rpb25zLnNvcnQoVmlydHVhbEFjdGlvbi5zb3J0QWN0aW9ucyk7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG4gICAgVmlydHVhbEFjdGlvbi5wcm90b3R5cGUucmVjeWNsZUFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBWaXJ0dWFsQWN0aW9uLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5fZXhlY3V0ZS5jYWxsKHRoaXMsIHN0YXRlLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpcnR1YWxBY3Rpb24uc29ydEFjdGlvbnMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYS5kZWxheSA9PT0gYi5kZWxheSkge1xuICAgICAgICAgICAgaWYgKGEuaW5kZXggPT09IGIuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGEuaW5kZXggPiBiLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5kZWxheSA+IGIuZGVsYXkpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVmlydHVhbEFjdGlvbjtcbn0oQXN5bmNBY3Rpb25fMS5Bc3luY0FjdGlvbikpO1xuZXhwb3J0cy5WaXJ0dWFsQWN0aW9uID0gVmlydHVhbEFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVZpcnR1YWxUaW1lU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hbmltYXRpb25GcmFtZSA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQW5pbWF0aW9uRnJhbWVBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FuaW1hdGlvbkZyYW1lQWN0aW9uXCIpO1xudmFyIEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9BbmltYXRpb25GcmFtZVNjaGVkdWxlclwiKTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSBuZXcgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXJfMS5BbmltYXRpb25GcmFtZVNjaGVkdWxlcihBbmltYXRpb25GcmFtZUFjdGlvbl8xLkFuaW1hdGlvbkZyYW1lQWN0aW9uKTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWUgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5pbWF0aW9uRnJhbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hbmltYXRpb25GcmFtZVByb3ZpZGVyID0gdm9pZCAwO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmlwdGlvblwiKTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVQcm92aWRlciA9IHtcbiAgICBzY2hlZHVsZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICB2YXIgY2FuY2VsID0gY2FuY2VsQW5pbWF0aW9uRnJhbWU7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICByZXF1ZXN0ID0gZGVsZWdhdGUucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICAgICAgY2FuY2VsID0gZGVsZWdhdGUuY2FuY2VsQW5pbWF0aW9uRnJhbWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhbmRsZSA9IHJlcXVlc3QoZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgY2FuY2VsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FsbGJhY2sodGltZXN0YW1wKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhbmNlbCA9PT0gbnVsbCB8fCBjYW5jZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbmNlbChoYW5kbGUpOyB9KTtcbiAgICB9LFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnJlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKS5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5jYW5jZWxBbmltYXRpb25GcmFtZSkgfHwgY2FuY2VsQW5pbWF0aW9uRnJhbWUpLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuaW1hdGlvbkZyYW1lUHJvdmlkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzYXAgPSBleHBvcnRzLmFzYXBTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXNhcEFjdGlvbl8xID0gcmVxdWlyZShcIi4vQXNhcEFjdGlvblwiKTtcbnZhciBBc2FwU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9Bc2FwU2NoZWR1bGVyXCIpO1xuZXhwb3J0cy5hc2FwU2NoZWR1bGVyID0gbmV3IEFzYXBTY2hlZHVsZXJfMS5Bc2FwU2NoZWR1bGVyKEFzYXBBY3Rpb25fMS5Bc2FwQWN0aW9uKTtcbmV4cG9ydHMuYXNhcCA9IGV4cG9ydHMuYXNhcFNjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzeW5jID0gZXhwb3J0cy5hc3luY1NjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBBc3luY0FjdGlvbl8xID0gcmVxdWlyZShcIi4vQXN5bmNBY3Rpb25cIik7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xuZXhwb3J0cy5hc3luY1NjaGVkdWxlciA9IG5ldyBBc3luY1NjaGVkdWxlcl8xLkFzeW5jU2NoZWR1bGVyKEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pO1xuZXhwb3J0cy5hc3luYyA9IGV4cG9ydHMuYXN5bmNTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luYy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGF0ZVRpbWVzdGFtcFByb3ZpZGVyID0gdm9pZCAwO1xuZXhwb3J0cy5kYXRlVGltZXN0YW1wUHJvdmlkZXIgPSB7XG4gICAgbm93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoZXhwb3J0cy5kYXRlVGltZXN0YW1wUHJvdmlkZXIuZGVsZWdhdGUgfHwgRGF0ZSkubm93KCk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGVUaW1lc3RhbXBQcm92aWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmltbWVkaWF0ZVByb3ZpZGVyID0gdm9pZCAwO1xudmFyIEltbWVkaWF0ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvSW1tZWRpYXRlXCIpO1xudmFyIHNldEltbWVkaWF0ZSA9IEltbWVkaWF0ZV8xLkltbWVkaWF0ZS5zZXRJbW1lZGlhdGUsIGNsZWFySW1tZWRpYXRlID0gSW1tZWRpYXRlXzEuSW1tZWRpYXRlLmNsZWFySW1tZWRpYXRlO1xuZXhwb3J0cy5pbW1lZGlhdGVQcm92aWRlciA9IHtcbiAgICBzZXRJbW1lZGlhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmltbWVkaWF0ZVByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuc2V0SW1tZWRpYXRlKSB8fCBzZXRJbW1lZGlhdGUpLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhckltbWVkaWF0ZTogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmltbWVkaWF0ZVByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJJbW1lZGlhdGUpIHx8IGNsZWFySW1tZWRpYXRlKShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbW1lZGlhdGVQcm92aWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmludGVydmFsUHJvdmlkZXIgPSB2b2lkIDA7XG5leHBvcnRzLmludGVydmFsUHJvdmlkZXIgPSB7XG4gICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0KSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMuaW50ZXJ2YWxQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRJbnRlcnZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLnNldEludGVydmFsLmFwcGx5KGRlbGVnYXRlLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmludGVydmFsUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5jbGVhckludGVydmFsKSB8fCBjbGVhckludGVydmFsKShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcnZhbFByb3ZpZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyID0gdm9pZCAwO1xuZXhwb3J0cy5wZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyID0ge1xuICAgIG5vdzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKGV4cG9ydHMucGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlci5kZWxlZ2F0ZSB8fCBwZXJmb3JtYW5jZSkubm93KCk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnF1ZXVlID0gZXhwb3J0cy5xdWV1ZVNjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBRdWV1ZUFjdGlvbl8xID0gcmVxdWlyZShcIi4vUXVldWVBY3Rpb25cIik7XG52YXIgUXVldWVTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL1F1ZXVlU2NoZWR1bGVyXCIpO1xuZXhwb3J0cy5xdWV1ZVNjaGVkdWxlciA9IG5ldyBRdWV1ZVNjaGVkdWxlcl8xLlF1ZXVlU2NoZWR1bGVyKFF1ZXVlQWN0aW9uXzEuUXVldWVBY3Rpb24pO1xuZXhwb3J0cy5xdWV1ZSA9IGV4cG9ydHMucXVldWVTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1xdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRpbWVvdXRQcm92aWRlciA9IHZvaWQgMDtcbmV4cG9ydHMudGltZW91dFByb3ZpZGVyID0ge1xuICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0KSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMudGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnNldFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5zZXRUaW1lb3V0LmFwcGx5KGRlbGVnYXRlLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gZXhwb3J0cy50aW1lb3V0UHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5jbGVhclRpbWVvdXQpIHx8IGNsZWFyVGltZW91dCkoaGFuZGxlKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZW91dFByb3ZpZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pdGVyYXRvciA9IGV4cG9ydHMuZ2V0U3ltYm9sSXRlcmF0b3IgPSB2b2lkIDA7XG5mdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpIHtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJyB8fCAhU3ltYm9sLml0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiAnQEBpdGVyYXRvcic7XG4gICAgfVxuICAgIHJldHVybiBTeW1ib2wuaXRlcmF0b3I7XG59XG5leHBvcnRzLmdldFN5bWJvbEl0ZXJhdG9yID0gZ2V0U3ltYm9sSXRlcmF0b3I7XG5leHBvcnRzLml0ZXJhdG9yID0gZ2V0U3ltYm9sSXRlcmF0b3IoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWl0ZXJhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vYnNlcnZhYmxlID0gdm9pZCAwO1xuZXhwb3J0cy5vYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5vYnNlcnZhYmxlKSB8fCAnQEBvYnNlcnZhYmxlJzsgfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgPSB2b2lkIDA7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4vY3JlYXRlRXJyb3JDbGFzc1wiKTtcbmV4cG9ydHMuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzXzEuY3JlYXRlRXJyb3JDbGFzcyhmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9ySW1wbCgpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnYXJndW1lbnQgb3V0IG9mIHJhbmdlJztcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudE91dE9mUmFuZ2VFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRW1wdHlFcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5FbXB0eUVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBFbXB0eUVycm9ySW1wbCgpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnRW1wdHlFcnJvcic7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdubyBlbGVtZW50cyBpbiBzZXF1ZW5jZSc7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1wdHlFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGVzdFRvb2xzID0gZXhwb3J0cy5JbW1lZGlhdGUgPSB2b2lkIDA7XG52YXIgbmV4dEhhbmRsZSA9IDE7XG52YXIgcmVzb2x2ZWQ7XG52YXIgYWN0aXZlSGFuZGxlcyA9IHt9O1xuZnVuY3Rpb24gZmluZEFuZENsZWFySGFuZGxlKGhhbmRsZSkge1xuICAgIGlmIChoYW5kbGUgaW4gYWN0aXZlSGFuZGxlcykge1xuICAgICAgICBkZWxldGUgYWN0aXZlSGFuZGxlc1toYW5kbGVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5JbW1lZGlhdGUgPSB7XG4gICAgc2V0SW1tZWRpYXRlOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIGhhbmRsZSA9IG5leHRIYW5kbGUrKztcbiAgICAgICAgYWN0aXZlSGFuZGxlc1toYW5kbGVdID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFyZXNvbHZlZCkge1xuICAgICAgICAgICAgcmVzb2x2ZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlZC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZpbmRBbmRDbGVhckhhbmRsZShoYW5kbGUpICYmIGNiKCk7IH0pO1xuICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH0sXG4gICAgY2xlYXJJbW1lZGlhdGU6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgZmluZEFuZENsZWFySGFuZGxlKGhhbmRsZSk7XG4gICAgfSxcbn07XG5leHBvcnRzLlRlc3RUb29scyA9IHtcbiAgICBwZW5kaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhY3RpdmVIYW5kbGVzKS5sZW5ndGg7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUltbWVkaWF0ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTm90Rm91bmRFcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5Ob3RGb3VuZEVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBOb3RGb3VuZEVycm9ySW1wbChtZXNzYWdlKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ05vdEZvdW5kRXJyb3InO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdEZvdW5kRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gdm9pZCAwO1xudmFyIGNyZWF0ZUVycm9yQ2xhc3NfMSA9IHJlcXVpcmUoXCIuL2NyZWF0ZUVycm9yQ2xhc3NcIik7XG5leHBvcnRzLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBPYmplY3RVbnN1YnNjcmliZWRFcnJvckltcGwoKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ29iamVjdCB1bnN1YnNjcmliZWQnO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZXF1ZW5jZUVycm9yID0gdm9pZCAwO1xudmFyIGNyZWF0ZUVycm9yQ2xhc3NfMSA9IHJlcXVpcmUoXCIuL2NyZWF0ZUVycm9yQ2xhc3NcIik7XG5leHBvcnRzLlNlcXVlbmNlRXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzXzEuY3JlYXRlRXJyb3JDbGFzcyhmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFNlcXVlbmNlRXJyb3JJbXBsKG1lc3NhZ2UpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnU2VxdWVuY2VFcnJvcic7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2VxdWVuY2VFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVW5zdWJzY3JpcHRpb25FcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5VbnN1YnNjcmlwdGlvbkVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbChlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcnNcbiAgICAgICAgICAgID8gZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuIGkgKyAxICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCk7IH0pLmpvaW4oJ1xcbiAgJylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucG9wTnVtYmVyID0gZXhwb3J0cy5wb3BTY2hlZHVsZXIgPSBleHBvcnRzLnBvcFJlc3VsdFNlbGVjdG9yID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG52YXIgaXNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL2lzU2NoZWR1bGVyXCIpO1xuZnVuY3Rpb24gbGFzdChhcnIpIHtcbiAgICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXTtcbn1cbmZ1bmN0aW9uIHBvcFJlc3VsdFNlbGVjdG9yKGFyZ3MpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24obGFzdChhcmdzKSkgPyBhcmdzLnBvcCgpIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0cy5wb3BSZXN1bHRTZWxlY3RvciA9IHBvcFJlc3VsdFNlbGVjdG9yO1xuZnVuY3Rpb24gcG9wU2NoZWR1bGVyKGFyZ3MpIHtcbiAgICByZXR1cm4gaXNTY2hlZHVsZXJfMS5pc1NjaGVkdWxlcihsYXN0KGFyZ3MpKSA/IGFyZ3MucG9wKCkgOiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLnBvcFNjaGVkdWxlciA9IHBvcFNjaGVkdWxlcjtcbmZ1bmN0aW9uIHBvcE51bWJlcihhcmdzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIGxhc3QoYXJncykgPT09ICdudW1iZXInID8gYXJncy5wb3AoKSA6IGRlZmF1bHRWYWx1ZTtcbn1cbmV4cG9ydHMucG9wTnVtYmVyID0gcG9wTnVtYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJncy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXJnc0FyZ0FycmF5T3JPYmplY3QgPSB2b2lkIDA7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgZ2V0S2V5cyA9IE9iamVjdC5rZXlzO1xuZnVuY3Rpb24gYXJnc0FyZ0FycmF5T3JPYmplY3QoYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YXIgZmlyc3RfMSA9IGFyZ3NbMF07XG4gICAgICAgIGlmIChpc0FycmF5KGZpcnN0XzEpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBhcmdzOiBmaXJzdF8xLCBrZXlzOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUE9KTyhmaXJzdF8xKSkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBnZXRLZXlzKGZpcnN0XzEpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhcmdzOiBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBmaXJzdF8xW2tleV07IH0pLFxuICAgICAgICAgICAgICAgIGtleXM6IGtleXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGFyZ3M6IGFyZ3MsIGtleXM6IG51bGwgfTtcbn1cbmV4cG9ydHMuYXJnc0FyZ0FycmF5T3JPYmplY3QgPSBhcmdzQXJnQXJyYXlPck9iamVjdDtcbmZ1bmN0aW9uIGlzUE9KTyhvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIGdldFByb3RvdHlwZU9mKG9iaikgPT09IG9iamVjdFByb3RvO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJnc0FyZ0FycmF5T3JPYmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFyZ3NPckFyZ0FycmF5ID0gdm9pZCAwO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gYXJnc09yQXJnQXJyYXkoYXJncykge1xuICAgIHJldHVybiBhcmdzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KGFyZ3NbMF0pID8gYXJnc1swXSA6IGFyZ3M7XG59XG5leHBvcnRzLmFyZ3NPckFyZ0FycmF5ID0gYXJnc09yQXJnQXJyYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcmdzT3JBcmdBcnJheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXJyUmVtb3ZlID0gdm9pZCAwO1xuZnVuY3Rpb24gYXJyUmVtb3ZlKGFyciwgaXRlbSkge1xuICAgIGlmIChhcnIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIDAgPD0gaW5kZXggJiYgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuZXhwb3J0cy5hcnJSZW1vdmUgPSBhcnJSZW1vdmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJSZW1vdmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUVycm9yQ2xhc3MgPSB2b2lkIDA7XG5mdW5jdGlvbiBjcmVhdGVFcnJvckNsYXNzKGNyZWF0ZUltcGwpIHtcbiAgICB2YXIgX3N1cGVyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIEVycm9yLmNhbGwoaW5zdGFuY2UpO1xuICAgICAgICBpbnN0YW5jZS5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIH07XG4gICAgdmFyIGN0b3JGdW5jID0gY3JlYXRlSW1wbChfc3VwZXIpO1xuICAgIGN0b3JGdW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yRnVuYztcbiAgICByZXR1cm4gY3RvckZ1bmM7XG59XG5leHBvcnRzLmNyZWF0ZUVycm9yQ2xhc3MgPSBjcmVhdGVFcnJvckNsYXNzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlRXJyb3JDbGFzcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlT2JqZWN0ID0gdm9pZCAwO1xuZnVuY3Rpb24gY3JlYXRlT2JqZWN0KGtleXMsIHZhbHVlcykge1xuICAgIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBrZXksIGkpIHsgcmV0dXJuICgocmVzdWx0W2tleV0gPSB2YWx1ZXNbaV0pLCByZXN1bHQpOyB9LCB7fSk7XG59XG5leHBvcnRzLmNyZWF0ZU9iamVjdCA9IGNyZWF0ZU9iamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZWF0ZU9iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2FwdHVyZUVycm9yID0gZXhwb3J0cy5lcnJvckNvbnRleHQgPSB2b2lkIDA7XG52YXIgY29uZmlnXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xudmFyIGNvbnRleHQgPSBudWxsO1xuZnVuY3Rpb24gZXJyb3JDb250ZXh0KGNiKSB7XG4gICAgaWYgKGNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIHZhciBpc1Jvb3QgPSAhY29udGV4dDtcbiAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHsgZXJyb3JUaHJvd246IGZhbHNlLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNiKCk7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGNvbnRleHQsIGVycm9yVGhyb3duID0gX2EuZXJyb3JUaHJvd24sIGVycm9yID0gX2EuZXJyb3I7XG4gICAgICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYigpO1xuICAgIH1cbn1cbmV4cG9ydHMuZXJyb3JDb250ZXh0ID0gZXJyb3JDb250ZXh0O1xuZnVuY3Rpb24gY2FwdHVyZUVycm9yKGVycikge1xuICAgIGlmIChjb25maWdfMS5jb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyAmJiBjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuZXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICBjb250ZXh0LmVycm9yID0gZXJyO1xuICAgIH1cbn1cbmV4cG9ydHMuY2FwdHVyZUVycm9yID0gY2FwdHVyZUVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JDb250ZXh0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leGVjdXRlU2NoZWR1bGUgPSB2b2lkIDA7XG5mdW5jdGlvbiBleGVjdXRlU2NoZWR1bGUocGFyZW50U3Vic2NyaXB0aW9uLCBzY2hlZHVsZXIsIHdvcmssIGRlbGF5LCByZXBlYXQpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICBpZiAocmVwZWF0ID09PSB2b2lkIDApIHsgcmVwZWF0ID0gZmFsc2U7IH1cbiAgICB2YXIgc2NoZWR1bGVTdWJzY3JpcHRpb24gPSBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICB3b3JrKCk7XG4gICAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5zY2hlZHVsZShudWxsLCBkZWxheSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfSwgZGVsYXkpO1xuICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQoc2NoZWR1bGVTdWJzY3JpcHRpb24pO1xuICAgIGlmICghcmVwZWF0KSB7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZVN1YnNjcmlwdGlvbjtcbiAgICB9XG59XG5leHBvcnRzLmV4ZWN1dGVTY2hlZHVsZSA9IGV4ZWN1dGVTY2hlZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4ZWN1dGVTY2hlZHVsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaWRlbnRpdHkgPSB2b2lkIDA7XG5mdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG59XG5leHBvcnRzLmlkZW50aXR5ID0gaWRlbnRpdHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNBcnJheUxpa2UgPSB2b2lkIDA7XG5leHBvcnRzLmlzQXJyYXlMaWtlID0gKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHggIT09ICdmdW5jdGlvbic7IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheUxpa2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzQXN5bmNJdGVyYWJsZSA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gaXNBc3luY0l0ZXJhYmxlKG9iaikge1xuICAgIHJldHVybiBTeW1ib2wuYXN5bmNJdGVyYXRvciAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmpbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKTtcbn1cbmV4cG9ydHMuaXNBc3luY0l0ZXJhYmxlID0gaXNBc3luY0l0ZXJhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBc3luY0l0ZXJhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1ZhbGlkRGF0ZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGlzVmFsaWREYXRlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4odmFsdWUpO1xufVxuZXhwb3J0cy5pc1ZhbGlkRGF0ZSA9IGlzVmFsaWREYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNEYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0Z1bmN0aW9uID0gdm9pZCAwO1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNJbnRlcm9wT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vc3ltYm9sL29ic2VydmFibGVcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oaW5wdXRbb2JzZXJ2YWJsZV8xLm9ic2VydmFibGVdKTtcbn1cbmV4cG9ydHMuaXNJbnRlcm9wT2JzZXJ2YWJsZSA9IGlzSW50ZXJvcE9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0ludGVyb3BPYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0l0ZXJhYmxlID0gdm9pZCAwO1xudmFyIGl0ZXJhdG9yXzEgPSByZXF1aXJlKFwiLi4vc3ltYm9sL2l0ZXJhdG9yXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBpc0l0ZXJhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGlucHV0ID09PSBudWxsIHx8IGlucHV0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbnB1dFtpdGVyYXRvcl8xLml0ZXJhdG9yXSk7XG59XG5leHBvcnRzLmlzSXRlcmFibGUgPSBpc0l0ZXJhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJdGVyYWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNPYnNlcnZhYmxlID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBpc09ic2VydmFibGUob2JqKSB7XG4gICAgcmV0dXJuICEhb2JqICYmIChvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSB8fCAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JqLmxpZnQpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9iai5zdWJzY3JpYmUpKSk7XG59XG5leHBvcnRzLmlzT2JzZXJ2YWJsZSA9IGlzT2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzT2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNQcm9taXNlID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBpc1Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnRoZW4pO1xufVxuZXhwb3J0cy5pc1Byb21pc2UgPSBpc1Byb21pc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1Byb21pc2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX2F3YWl0ID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0KSB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTsgfVxudmFyIF9fYXN5bmNHZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fYXN5bmNHZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzUmVhZGFibGVTdHJlYW1MaWtlID0gZXhwb3J0cy5yZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSB7XG4gICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yXzEoKSB7XG4gICAgICAgIHZhciByZWFkZXIsIF9hLCB2YWx1ZSwgZG9uZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGFibGVTdHJlYW0uZ2V0UmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgLCA5LCAxMF0pO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWUpIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX19hd2FpdChyZWFkZXIucmVhZCgpKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdmFsdWUgPSBfYS52YWx1ZSwgZG9uZSA9IF9hLmRvbmU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfX2F3YWl0KHZvaWQgMCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyLCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFs0LCBfX2F3YWl0KHZhbHVlKV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQsIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMsIDEwXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5yZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yID0gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcjtcbmZ1bmN0aW9uIGlzUmVhZGFibGVTdHJlYW1MaWtlKG9iaikge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmouZ2V0UmVhZGVyKTtcbn1cbmV4cG9ydHMuaXNSZWFkYWJsZVN0cmVhbUxpa2UgPSBpc1JlYWRhYmxlU3RyZWFtTGlrZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUmVhZGFibGVTdHJlYW1MaWtlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1NjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gaXNTY2hlZHVsZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUuc2NoZWR1bGUpO1xufVxuZXhwb3J0cy5pc1NjaGVkdWxlciA9IGlzU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9wZXJhdGUgPSBleHBvcnRzLmhhc0xpZnQgPSB2b2lkIDA7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGhhc0xpZnQoc291cmNlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5saWZ0KTtcbn1cbmV4cG9ydHMuaGFzTGlmdCA9IGhhc0xpZnQ7XG5mdW5jdGlvbiBvcGVyYXRlKGluaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBpZiAoaGFzTGlmdChzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmxpZnQoZnVuY3Rpb24gKGxpZnRlZFNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0KGxpZnRlZFNvdXJjZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuYWJsZSB0byBsaWZ0IHVua25vd24gT2JzZXJ2YWJsZSB0eXBlJyk7XG4gICAgfTtcbn1cbmV4cG9ydHMub3BlcmF0ZSA9IG9wZXJhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWZ0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFwT25lT3JNYW55QXJncyA9IHZvaWQgMDtcbnZhciBtYXBfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvbWFwXCIpO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gY2FsbE9yQXBwbHkoZm4sIGFyZ3MpIHtcbiAgICByZXR1cm4gaXNBcnJheShhcmdzKSA/IGZuLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSkgOiBmbihhcmdzKTtcbn1cbmZ1bmN0aW9uIG1hcE9uZU9yTWFueUFyZ3MoZm4pIHtcbiAgICByZXR1cm4gbWFwXzEubWFwKGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBjYWxsT3JBcHBseShmbiwgYXJncyk7IH0pO1xufVxuZXhwb3J0cy5tYXBPbmVPck1hbnlBcmdzID0gbWFwT25lT3JNYW55QXJncztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcE9uZU9yTWFueUFyZ3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5vb3AgPSB2b2lkIDA7XG5mdW5jdGlvbiBub29wKCkgeyB9XG5leHBvcnRzLm5vb3AgPSBub29wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubm90ID0gdm9pZCAwO1xuZnVuY3Rpb24gbm90KHByZWQsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkgeyByZXR1cm4gIXByZWQuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgpOyB9O1xufVxuZXhwb3J0cy5ub3QgPSBub3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBpcGVGcm9tQXJyYXkgPSBleHBvcnRzLnBpcGUgPSB2b2lkIDA7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuL2lkZW50aXR5XCIpO1xuZnVuY3Rpb24gcGlwZSgpIHtcbiAgICB2YXIgZm5zID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgZm5zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBwaXBlRnJvbUFycmF5KGZucyk7XG59XG5leHBvcnRzLnBpcGUgPSBwaXBlO1xuZnVuY3Rpb24gcGlwZUZyb21BcnJheShmbnMpIHtcbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHlfMS5pZGVudGl0eTtcbiAgICB9XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZuc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBpcGVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBmbikgeyByZXR1cm4gZm4ocHJldik7IH0sIGlucHV0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5waXBlRnJvbUFycmF5ID0gcGlwZUZyb21BcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlcG9ydFVuaGFuZGxlZEVycm9yID0gdm9pZCAwO1xudmFyIGNvbmZpZ18xID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciB0aW1lb3V0UHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyXCIpO1xuZnVuY3Rpb24gcmVwb3J0VW5oYW5kbGVkRXJyb3IoZXJyKSB7XG4gICAgdGltZW91dFByb3ZpZGVyXzEudGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb25VbmhhbmRsZWRFcnJvciA9IGNvbmZpZ18xLmNvbmZpZy5vblVuaGFuZGxlZEVycm9yO1xuICAgICAgICBpZiAob25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgb25VbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnJlcG9ydFVuaGFuZGxlZEVycm9yID0gcmVwb3J0VW5oYW5kbGVkRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBvcnRVbmhhbmRsZWRFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgPSB2b2lkIDA7XG5mdW5jdGlvbiBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IHByb3ZpZGVkIFwiICsgKGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgPyAnYW4gaW52YWxpZCBvYmplY3QnIDogXCInXCIgKyBpbnB1dCArIFwiJ1wiKSArIFwiIHdoZXJlIGEgc3RyZWFtIHdhcyBleHBlY3RlZC4gWW91IGNhbiBwcm92aWRlIGFuIE9ic2VydmFibGUsIFByb21pc2UsIFJlYWRhYmxlU3RyZWFtLCBBcnJheSwgQXN5bmNJdGVyYWJsZSwgb3IgSXRlcmFibGUuXCIpO1xufVxuZXhwb3J0cy5jcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvciA9IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dVbm9ic2VydmFibGVFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubG9hZGluZ1NlcnZpY2UgPSBleHBvcnRzLnNoYXJlZERhdGFTZXJ2aWNlID0gdm9pZCAwO1xuY29uc3Qgcnhqc18xID0gcmVxdWlyZShcInJ4anNcIik7XG5jbGFzcyBTaGFyZWRfRGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhdGFTdWJqZWN0ID0gbmV3IHJ4anNfMS5TdWJqZWN0KCk7XG4gICAgICAgIHRoaXMuZGF0YSQgPSB0aGlzLmRhdGFTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbiAgICB1cGRhdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygndXBkYXRlRGF0YTonLCBkYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhU3ViamVjdC5uZXh0KGRhdGEpO1xuICAgIH1cbn1cbmNsYXNzIExvYWRpbmdfU2VydmljZSB7XG4gICAgY29uc3RydWN0b3Ioc2hhcmVkU2VydmljZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmdDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZy1pbmRpY2F0b3InKTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nRWxlbWVudCA9IHRoaXMubG9hZGluZ0NvbnRhaW5lci5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2hhcmVkU2VydmljZS5kYXRhJC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pc0xvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRpbmdDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nLWluZGljYXRvcicpO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nRWxlbWVudCA9IHRoaXMubG9hZGluZ0NvbnRhaW5lci5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nRWxlbWVudC5jbGFzc05hbWUgPSBcImxvYWRlclwiO1xuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmdFbGVtZW50LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfVxufVxuY29uc3Qgc2hhcmVkRGF0YVNlcnZpY2UgPSBuZXcgU2hhcmVkX0RhdGFTZXJ2aWNlKCk7XG5leHBvcnRzLnNoYXJlZERhdGFTZXJ2aWNlID0gc2hhcmVkRGF0YVNlcnZpY2U7XG5jb25zdCBsb2FkaW5nU2VydmljZSA9IG5ldyBMb2FkaW5nX1NlcnZpY2Uoc2hhcmVkRGF0YVNlcnZpY2UpO1xuZXhwb3J0cy5sb2FkaW5nU2VydmljZSA9IGxvYWRpbmdTZXJ2aWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFwaVVzZXJzID0gdm9pZCAwO1xud2luZG93LmV4cG9ydHMgPSB7fTtcbmNvbnN0IHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuY29uc3QgaHR0cENsaWVudF8xID0gcmVxdWlyZShcIi4vaHR0cENsaWVudFwiKTtcbmNsYXNzIEFwaV9Vc2VycyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXBpX2Jhc2UgPSAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJztcbiAgICAgICAgLy9hd2FpdCBkZWxldGVVc2VyQnlJZCh1c2VyaWQpOyBcbiAgICAgICAgdGhpcy5BZGRVc2VyID0gKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBfdXJsID0gYCR7dGhpcy5hcGlfYmFzZX0vdXNlcnMvYDtcbiAgICAgICAgICAgIHJldHVybiBodHRwQ2xpZW50XzEuY2xpZW50QXBpLmFkZFJvdyhfdXJsLCBkYXRhKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9hd2FpdCBkZWxldGVVc2VyQnlJZCh1c2VyaWQpOyBcbiAgICAgICAgdGhpcy5kZWxldGVVc2VyQnlJZCA9ICh1c2VyX2lkKSA9PiB7XG4gICAgICAgICAgICBsZXQgX3VybCA9IGAke3RoaXMuYXBpX2Jhc2V9L3VzZXJzL2A7XG4gICAgICAgICAgICByZXR1cm4gaHR0cENsaWVudF8xLmNsaWVudEFwaS5kZWxldGVSb3coX3VybCwgdXNlcl9pZCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vZ2V0VXNlckJ5SWQxKCkuc3Vic2NyaWJlKGRhdGEgPT4geyB9KTtcbiAgICAgICAgdGhpcy5nZXRVc2VyQnlJZCA9ICh1c2VyX2lkKSA9PiB7XG4gICAgICAgICAgICBsZXQgX3VybCA9IGAke3RoaXMuYXBpX2Jhc2V9L3VzZXJzL2A7XG4gICAgICAgICAgICBjb25zdCBhcGlDYWxsID0gKCkgPT4gaHR0cENsaWVudF8xLmNsaWVudEFwaS5nZXRSb3dCeUlkKF91cmwsIHVzZXJfaWQpO1xuICAgICAgICAgICAgcmV0dXJuICgwLCByeGpzXzEuZGVmZXIpKCgpID0+ICgwLCByeGpzXzEuZnJvbSkoYXBpQ2FsbCgpKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vZ2V0VXNlcnMxMSgpLnN1YnNjcmliZShkYXRhID0+IHsgfSk7XG4gICAgICAgIHRoaXMuZ2V0VXNlcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgX3VybCA9IGAke3RoaXMuYXBpX2Jhc2V9L3VzZXJzYDtcbiAgICAgICAgICAgIHJldHVybiAoMCwgcnhqc18xLmZyb20pKGh0dHBDbGllbnRfMS5jbGllbnRBcGkuZ2V0Um93cyhfdXJsKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHRoaXMuYXBpX2Jhc2UgPSB1cmxfdXNlciA/PyB0aGlzLmFwaV9iYXNlO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICB9XG59XG52YXIgYXBpVXNlcnMgPSBuZXcgQXBpX1VzZXJzKCk7XG5leHBvcnRzLmFwaVVzZXJzID0gYXBpVXNlcnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jbGllbnRBcGkgPSB2b2lkIDA7XG53aW5kb3cuZXhwb3J0cyA9IHt9O1xuY29uc3QgbGliXzEgPSByZXF1aXJlKFwiLi9saWJcIik7XG5jb25zdCBTaGFyZWREYXRhU2VydmljZV8xID0gcmVxdWlyZShcIi4vU2hhcmVkRGF0YVNlcnZpY2VcIik7XG5jbGFzcyBDbGllbnRfQXBpIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9wcm9taXNlIGJ5IGRlZnVsdFxuICAgICAgICB0aGlzLmdldFJvd3MgPSAoX3VybCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRSb3dzIENsaWVudF9BcGlcIik7XG4gICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICB5aWVsZCAoMCwgbGliXzEuYXBwRGVsYXkpKDIwMDApO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChfdXJsLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGRlbGV0ZSB0by1kbzogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHlpZWxkIHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIC8vIGxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkUm93ID0gKF91cmwsIGRhdGEpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KF91cmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFNoYXJlZERhdGFTZXJ2aWNlXzEuc2hhcmVkRGF0YVNlcnZpY2UudXBkYXRlRGF0YSh7IGlzTG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGFkZCB0by1kbzogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuICAgICAgICAgICAgICAgIGlmICghY29udGVudFR5cGUgfHwgIWNvbnRlbnRUeXBlLmluY2x1ZGVzKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT29wcywgd2UgaGF2ZW4ndCBnb3QgSlNPTiFcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIC8vIGxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlUm93ID0gKF91cmwsIHRvZG8pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIFNoYXJlZERhdGFTZXJ2aWNlXzEuc2hhcmVkRGF0YVNlcnZpY2UudXBkYXRlRGF0YSh7IGlzTG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7X3VybH0vJHt0b2RvLmlkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvZG8pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gdXBkYXRlIHRvLWRvOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIC8vIGxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGVsZXRlUm93ID0gKF91cmwsIGlkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICAvL2F3YWl0IGFwcERlbGF5KDIwMDApXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke191cmx9LyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkZWxldGUgdG8tZG86ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIFNoYXJlZERhdGFTZXJ2aWNlXzEuc2hhcmVkRGF0YVNlcnZpY2UudXBkYXRlRGF0YSh7IGlzTG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgLy8gbG9hZGluZ1NlcnZpY2UuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRSb3dCeUlkID0gKF91cmwsIGlkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7X3VybH0vJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkZWxldGUgdG8tZG86ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh5aWVsZCByZXNwb25zZS5qc29uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgU2hhcmVkRGF0YVNlcnZpY2VfMS5zaGFyZWREYXRhU2VydmljZS51cGRhdGVEYXRhKHsgaXNMb2FkaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAvLyBsb2FkaW5nU2VydmljZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbnN0cnVjdG9yIENsaWVudF9BcGlcIik7XG4gICAgfVxufVxuY29uc3QgY2xpZW50QXBpID0gbmV3IENsaWVudF9BcGkoKTtcbmV4cG9ydHMuY2xpZW50QXBpID0gY2xpZW50QXBpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdsb2JhbFBhcmFtcyA9IHZvaWQgMDtcbmV4cG9ydHMuYXBwRGVsYXkgPSBhcHBEZWxheTtcbmV4cG9ydHMuc3BsaXRGdWxsTmFtZSA9IHNwbGl0RnVsbE5hbWU7XG5leHBvcnRzLmdldEZ1bGxOYW1lID0gZ2V0RnVsbE5hbWU7XG53aW5kb3cuZXhwb3J0cyA9IHt9O1xuZnVuY3Rpb24gYXBwRGVsYXkobWlsbGlzZWNvbmRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpKTtcbn1cbi8vZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKHJlcyA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcbmZ1bmN0aW9uIHNwbGl0RnVsbE5hbWUoZnVsbE5hbWUpIHtcbiAgICBpZiAoIWZ1bGxOYW1lKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lcyA9IGZ1bGxOYW1lLnRyaW0oKS5zcGxpdChcIiBcIik7XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3ROYW1lOiBuYW1lc1swXSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBcIlwiXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGZpcnN0TmFtZSA9IG5hbWVzWzBdO1xuICAgIGNvbnN0IGxhc3ROYW1lID0gbmFtZXMuc2xpY2UoMSkuam9pbihcIiBcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlyc3ROYW1lLFxuICAgICAgICBsYXN0TmFtZVxuICAgIH07XG59XG5mdW5jdGlvbiBnZXRGdWxsTmFtZShmaXJzdE5hbWUsIGxhc3ROYW1lKSB7XG4gICAgaWYgKCFmaXJzdE5hbWUgJiYgIWxhc3ROYW1lKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoIWZpcnN0TmFtZSkge1xuICAgICAgICByZXR1cm4gbGFzdE5hbWU7XG4gICAgfVxuICAgIGlmICghbGFzdE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0TmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2ZpcnN0TmFtZX0gJHtsYXN0TmFtZX1gO1xufVxuY2xhc3MgR2xvYmFsUGFyYW1zIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMudXNlTW9kYWxMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIEdsb2JhbFBhcmFtcy5sb2FkaW5nQ29udGFpbmVyID0gKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmctaW5kaWNhdG9yJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc29sZS5sb2coR2xvYmFsUGFyYW1zLmxvYWRpbmdDb250YWluZXIpO1xuICAgICAgICBHbG9iYWxQYXJhbXMubG9hZGluZ0VsZW1lbnQgPSAoX2IgPSBHbG9iYWxQYXJhbXMubG9hZGluZ0NvbnRhaW5lcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0TW9kYWxMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLnVzZU1vZGFsTG9hZGluZyA9IHRydWU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRNb2RhbExvYWRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZU1vZGFsTG9hZGluZztcbiAgICB9XG4gICAgc3RhdGljIGdldExvYWRpbmdDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmdDb250YWluZXI7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRMb2FkaW5nRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGluZ0VsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0cy5HbG9iYWxQYXJhbXMgPSBHbG9iYWxQYXJhbXM7XG5HbG9iYWxQYXJhbXMudXNlTW9kYWxMb2FkaW5nID0gZmFsc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xud2luZG93LmV4cG9ydHMgPSB7fTtcbmNvbnN0IGFwaVVzZXJzXzEgPSByZXF1aXJlKFwiLi9saWIvYXBpVXNlcnNcIik7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIGFwaVVzZXJzXzEuYXBpVXNlcnMuZ2V0VXNlcnMoKTtcbiAgICBkYXRhLnN1YnNjcmliZSgoX2RhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJET01Db250ZW50TG9hZGVkXCIsIF9kYXRhKTtcbiAgICB9KTtcbn0pKTtcbiJdfQ==
