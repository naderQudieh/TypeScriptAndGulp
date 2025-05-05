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
exports.LoadingComponentX = void 0;
exports.addButton = addButton;
exports.deleteTableRow = deleteTableRow;
window.exports = {};
var lib_1 = require("./lib/lib");
var LoadingComponentX = /*#__PURE__*/function () {
  function LoadingComponentX() {
    _classCallCheck(this, LoadingComponentX);
  } //this.subscription = loadingService.loading$.subscribe((isLoading: any) => {
  //  let that = GlobalParams.getLoadingElement() || undefined;
  //  if (isLoading && that) {
  //      if (GlobalParams.getModalLoading()) {
  //          (GlobalParams.getLoadingContainer() as HTMLDivElement).className = "loading-modal";
  //          that.className = "loader"
  //      } else {
  //          that.className = "loader"
  //      }
  //  } else {
  //      (GlobalParams.getLoadingContainer() as HTMLDivElement).className = "";
  //      (GlobalParams.getLoadingElement() as HTMLDivElement).className = "";
  //  }
  //});
  return _createClass(LoadingComponentX, [{
    key: "destroy",
    value: function destroy() {
      this.subscription.unsubscribe();
    }
  }]);
}();
exports.LoadingComponentX = LoadingComponentX;
function addButton(text, onClick) {
  var button = document.createElement('button');
  button.type = "button";
  button.classList.add("btn");
  button.classList.add("btn-primary");
  button.textContent = text;
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  return button;
}
function deleteTableRow(row) {
  var timeoutId;
  row.classList.add('boxfadeOut');
  (0, lib_1.appDelay)(300).then(function (data) {
    row.classList.add('fade-out');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      row.remove();
    }, 100);
  });
  ;
}

},{"./lib/lib":229}],226:[function(require,module,exports){
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

},{"rxjs":2}],227:[function(require,module,exports){
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
exports.apiProducts = void 0;
window.exports = {};
var rxjs_1 = require("rxjs");
var httpClient_1 = require("./httpClient");
var Api_Products = /*#__PURE__*/function () {
  function Api_Products() {
    var _this = this;
    _classCallCheck(this, Api_Products);
    this.api_base = 'https://fakestoreapi.com';
    this.getAll = function () {
      var _url = "".concat(_this.api_base, "/products");
      return (0, rxjs_1.from)(httpClient_1.clientApi.getRows(_url));
    };
    //await deleteById(userid); 
    this.deleteById = function (_id) {
      var _url = "".concat(_this.api_base, "/products/");
      return httpClient_1.clientApi.deleteRow(_url, _id);
    };
    this.initialize();
  }
  return _createClass(Api_Products, [{
    key: "initialize",
    value: function initialize() {}
  }]);
}();
var apiProducts = new Api_Products();
exports.apiProducts = apiProducts;

},{"./httpClient":228,"rxjs":2}],228:[function(require,module,exports){
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

},{"./SharedDataService":226,"./lib":229}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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
var apiProducts_1 = require("./lib/apiProducts");
var genComponents_1 = require("./genComponents");
document.addEventListener("DOMContentLoaded", function () {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var data, BuildTableRow, renderTable;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          renderTable = function _renderTable(_data) {
            _data = _data.slice(0, 10);
            var tableBody = document.getElementById('data-table-body');
            tableBody.innerHTML = '';
            _data.forEach(function (item) {
              var row = BuildTableRow(item);
              tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(row);
            });
          };
          BuildTableRow = function _BuildTableRow(DataRow) {
            var _this = this;
            var row = document.createElement('tr');
            row.setAttribute('data-id', DataRow.id);
            var idCell = document.createElement('td');
            idCell.textContent = DataRow.id;
            var titleCell = document.createElement('td');
            titleCell.textContent = DataRow.category;
            var completedCell = document.createElement('td');
            completedCell.textContent = DataRow.price;
            var action1Cell = document.createElement('td');
            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(completedCell);
            row.appendChild(action1Cell);
            var btn = (0, genComponents_1.addButton)("Delete");
            action1Cell.appendChild(btn);
            btn.addEventListener('click', function (e) {
              return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return apiProducts_1.apiProducts.deleteById(DataRow.id);
                    case 2:
                      (0, genComponents_1.deleteTableRow)(row);
                      //deleteUser(ActiomCell.textContent).then(function (response) {
                      //	deleteTableRow(row)
                      //});
                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
            });
            return row;
          };
          console.log("DOMContentLoaded products page");
          _context2.next = 5;
          return apiProducts_1.apiProducts.getAll();
        case 5:
          data = _context2.sent;
          data.subscribe(function (_data) {
            console.log(_data);
            renderTable(_data);
          });
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
});

},{"./genComponents":225,"./lib/apiProducts":227}]},{},[230])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Bc3luY1N1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9CZWhhdmlvclN1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Ob3RpZmljYXRpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Ob3RpZmljYXRpb25GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9PYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvUmVwbGF5U3ViamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL1NjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL1N1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9TdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvU3Vic2NyaXB0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvZmlyc3RWYWx1ZUZyb20uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9sYXN0VmFsdWVGcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvYmluZENhbGxiYWNrSW50ZXJuYWxzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9iaW5kTm9kZUNhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb25jYXQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Nvbm5lY3RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9kZWZlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZG9tL2FuaW1hdGlvbkZyYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2ZvcmtKb2luLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudFBhdHRlcm4uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21TdWJzY3JpYmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2dlbmVyYXRlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9paWYuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2lubmVyRnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvaW50ZXJ2YWwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9uZXZlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvb2YuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL29uRXJyb3JSZXN1bWVOZXh0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9wYWlycy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvcGFydGl0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYWNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYW5nZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvdGltZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL3VzaW5nLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS96aXAuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2F1ZGl0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2F1ZGl0VGltZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyQ291bnQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyVGltZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXJUb2dnbGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyV2hlbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jYXRjaEVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbWJpbmVBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvY29tYmluZUxhdGVzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jb21iaW5lTGF0ZXN0QWxsLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbWJpbmVMYXRlc3RXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jb25jYXRBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0TWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdE1hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdFdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvY29ubmVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9jb3VudC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9kZWJvdW5jZVRpbWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVmYXVsdElmRW1wdHkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVsYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVsYXlXaGVuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2RlbWF0ZXJpYWxpemUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3RVbnRpbENoYW5nZWQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3RVbnRpbEtleUNoYW5nZWQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZWxlbWVudEF0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2VuZFdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZXZlcnkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZXhoYXVzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9leGhhdXN0QWxsLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2V4aGF1c3RNYXAuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZXhwYW5kLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9maW5hbGl6ZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9maW5kLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbmRJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9maXJzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9mbGF0TWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2dyb3VwQnkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvaWdub3JlRWxlbWVudHMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvaXNFbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9qb2luQWxsSW50ZXJuYWxzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2xhc3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvbWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21hdGVyaWFsaXplLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21heC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUludGVybmFscy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlU2Nhbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9tZXJnZVdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvbWluLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL211bHRpY2FzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9vYnNlcnZlT24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvb25FcnJvclJlc3VtZU5leHRXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3BhaXJ3aXNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3BsdWNrLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2guanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcHVibGlzaEJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hMYXN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hSZXBsYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcmFjZVdpdGguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JlZkNvdW50LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9yZXBlYXRXaGVuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3JldHJ5V2hlbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zYW1wbGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2FtcGxlVGltZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zY2FuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3NjYW5JbnRlcm5hbHMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2VxdWVuY2VFcXVhbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zaGFyZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zaGFyZVJlcGxheS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zaW5nbGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9za2lwTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9za2lwVW50aWwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcFdoaWxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3N0YXJ0V2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zdWJzY3JpYmVPbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zd2l0Y2hBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoTWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaE1hcFRvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaFNjYW4uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90YWtlTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90YWtlVW50aWwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZVdoaWxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RhcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90aHJvdHRsZVRpbWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGhyb3dJZkVtcHR5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVJbnRlcnZhbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90aW1lb3V0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVvdXRXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3RpbWVzdGFtcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90b0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dDb3VudC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dUaW1lLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3dpbmRvd1RvZ2dsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dXaGVuLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3dpdGhMYXRlc3RGcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL3ppcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy96aXBBbGwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvemlwV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlQXN5bmNJdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlT2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZVByb21pc2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVkLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL0FjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9BbmltYXRpb25GcmFtZUFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9BbmltYXRpb25GcmFtZVNjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9Bc2FwQWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL0FzYXBTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNBY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvUXVldWVBY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvUXVldWVTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvVmlydHVhbFRpbWVTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvYW5pbWF0aW9uRnJhbWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvYW5pbWF0aW9uRnJhbWVQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9hc2FwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9pbW1lZGlhdGVQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9pbnRlcnZhbFByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL3BlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvcXVldWUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC90eXBlcy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL0VtcHR5RXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL0ltbWVkaWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvTm90Rm91bmRFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL1NlcXVlbmNlRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2FyZ3MuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2FyZ3NBcmdBcnJheU9yT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9hcmdzT3JBcmdBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvYXJyUmVtb3ZlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9jcmVhdGVFcnJvckNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9jcmVhdGVPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2Vycm9yQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvZXhlY3V0ZVNjaGVkdWxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNBcnJheUxpa2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzQXN5bmNJdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNEYXRlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0l0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc09ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzU2NoZWR1bGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9saWZ0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9tYXBPbmVPck1hbnlBcmdzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9ub3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL3BpcGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yLmpzIiwic3JjL3NjcmlwdHMvZ2VuQ29tcG9uZW50cy5qcyIsInNyYy9zY3JpcHRzL2xpYi9TaGFyZWREYXRhU2VydmljZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9hcGlQcm9kdWN0cy5qcyIsInNyYy9zY3JpcHRzL2xpYi9odHRwQ2xpZW50LmpzIiwic3JjL3NjcmlwdHMvbGliL2xpYi5qcyIsInNyYy9zY3JpcHRzL3BhZ2VfcHJvZHVjdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQSxZQUFZOztBQUFDLFNBQUEsUUFBQSxDQUFBLHNDQUFBLE9BQUEsd0JBQUEsTUFBQSx1QkFBQSxNQUFBLENBQUEsUUFBQSxhQUFBLENBQUEsa0JBQUEsQ0FBQSxnQkFBQSxDQUFBLFdBQUEsQ0FBQSx5QkFBQSxNQUFBLElBQUEsQ0FBQSxDQUFBLFdBQUEsS0FBQSxNQUFBLElBQUEsQ0FBQSxLQUFBLE1BQUEsQ0FBQSxTQUFBLHFCQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQTtBQUFBLFNBQUEsZ0JBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsQ0FBQSxhQUFBLFNBQUE7QUFBQSxTQUFBLGtCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLFFBQUEsQ0FBQSxDQUFBLFlBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxRQUFBLFFBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQTtBQUFBLFNBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxpQkFBQSxRQUFBLFNBQUEsQ0FBQTtBQUFBLFNBQUEsZUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLFlBQUEsQ0FBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsT0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsa0JBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLFNBQUEseUVBQUEsQ0FBQSxHQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsQ0FBQTtBQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtFQUFFLEtBQUssRUFBRTtBQUFLLENBQUMsQ0FBQztBQUM3RCxPQUFPLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUztBQUM3QixPQUFPLENBQUMsY0FBYyxHQUFHLGNBQWM7QUFDdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbkIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUFDLElBQzdCLGlCQUFpQjtFQUNuQixTQUFBLGtCQUFBLEVBQWM7SUFBQSxlQUFBLE9BQUEsaUJBQUE7RUFlZCxDQUFDLENBZEc7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNILE9BQUEsWUFBQSxDQUFBLGlCQUFBO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFBLE9BQU8sQ0FBQSxFQUFHO01BQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuQztFQUFDO0FBQUE7QUFFTCxPQUFPLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQzdDLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7RUFDOUIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDL0MsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRO0VBQ3RCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztFQUMzQixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7RUFDbkMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJO0VBQ3pCLElBQUksT0FBTyxFQUFFO0lBQ1QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7RUFDN0M7RUFDQSxPQUFPLE1BQU07QUFDakI7QUFDQSxTQUFTLGNBQWMsQ0FBQyxHQUFHLEVBQUU7RUFDekIsSUFBSSxTQUFTO0VBQ2IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0VBQy9CLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFO0lBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUM3QixZQUFZLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWTtNQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUNYLENBQUMsQ0FBQztFQUNGO0FBQ0o7OztBQ25EQSxZQUFZOztBQUFDLFNBQUEsUUFBQSxDQUFBLHNDQUFBLE9BQUEsd0JBQUEsTUFBQSx1QkFBQSxNQUFBLENBQUEsUUFBQSxhQUFBLENBQUEsa0JBQUEsQ0FBQSxnQkFBQSxDQUFBLFdBQUEsQ0FBQSx5QkFBQSxNQUFBLElBQUEsQ0FBQSxDQUFBLFdBQUEsS0FBQSxNQUFBLElBQUEsQ0FBQSxLQUFBLE1BQUEsQ0FBQSxTQUFBLHFCQUFBLENBQUEsS0FBQSxPQUFBLENBQUEsQ0FBQTtBQUFBLFNBQUEsZ0JBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsQ0FBQSxhQUFBLFNBQUE7QUFBQSxTQUFBLGtCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLFFBQUEsQ0FBQSxDQUFBLFlBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxRQUFBLFFBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQTtBQUFBLFNBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxpQkFBQSxRQUFBLFNBQUEsQ0FBQTtBQUFBLFNBQUEsZUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLFlBQUEsQ0FBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsT0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLFdBQUEsa0JBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdDQUFBLE9BQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLFNBQUEseUVBQUEsQ0FBQSxHQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsQ0FBQTtBQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtFQUFFLEtBQUssRUFBRTtBQUFLLENBQUMsQ0FBQztBQUM3RCxPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDM0QsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUFDLElBQ3pCLGtCQUFrQjtFQUNwQixTQUFBLG1CQUFBLEVBQWM7SUFBQSxlQUFBLE9BQUEsa0JBQUE7SUFDVixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztFQUNoRDtFQUFDLE9BQUEsWUFBQSxDQUFBLGtCQUFBO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFBLFVBQVUsQ0FBQyxJQUFJLEVBQUU7TUFDYjtNQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMvQjtFQUFDO0FBQUE7QUFBQSxJQUVDLGVBQWU7RUFDakIsU0FBQSxnQkFBWSxhQUFhLEVBQUU7SUFBQSxJQUFBLEtBQUE7SUFBQSxlQUFBLE9BQUEsZUFBQTtJQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQztJQUNwRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtNQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO01BQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7SUFDeEQ7SUFDQSxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksRUFBSTtNQUNsQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDaEIsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ2YsQ0FBQyxNQUNJO1FBQ0QsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ2Y7SUFDSixDQUFDLENBQUM7RUFDTjtFQUFDLE9BQUEsWUFBQSxDQUFBLGVBQUE7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQUEsSUFBSSxDQUFBLEVBQUc7TUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDO1FBQ3BFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztNQUN4RDtNQUNBLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLFFBQVE7SUFDNUM7RUFBQztJQUFBLEdBQUE7SUFBQSxLQUFBLEVBQ0QsU0FBQSxJQUFJLENBQUEsRUFBRztNQUNILElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLEVBQUU7SUFDdEM7RUFBQztBQUFBO0FBRUwsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLGtCQUFrQixDQUFDLENBQUM7QUFDbEQsT0FBTyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQjtBQUM3QyxJQUFNLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztBQUM3RCxPQUFPLENBQUMsY0FBYyxHQUFHLGNBQWM7OztBQzdDdkMsWUFBWTs7QUFBQyxTQUFBLFFBQUEsQ0FBQSxzQ0FBQSxPQUFBLHdCQUFBLE1BQUEsdUJBQUEsTUFBQSxDQUFBLFFBQUEsYUFBQSxDQUFBLGtCQUFBLENBQUEsZ0JBQUEsQ0FBQSxXQUFBLENBQUEseUJBQUEsTUFBQSxJQUFBLENBQUEsQ0FBQSxXQUFBLEtBQUEsTUFBQSxJQUFBLENBQUEsS0FBQSxNQUFBLENBQUEsU0FBQSxxQkFBQSxDQUFBLEtBQUEsT0FBQSxDQUFBLENBQUE7QUFBQSxTQUFBLGdCQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLENBQUEsYUFBQSxTQUFBO0FBQUEsU0FBQSxrQkFBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxRQUFBLENBQUEsQ0FBQSxZQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsUUFBQSxRQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsQ0FBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsaUJBQUEsUUFBQSxTQUFBLENBQUE7QUFBQSxTQUFBLGVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxZQUFBLENBQUEsQ0FBQSxnQ0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsU0FBQSxhQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLE9BQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBLGtCQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxnQ0FBQSxPQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsWUFBQSxTQUFBLHlFQUFBLENBQUEsR0FBQSxNQUFBLEdBQUEsTUFBQSxFQUFBLENBQUE7QUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7RUFBRSxLQUFLLEVBQUU7QUFBSyxDQUFDLENBQUM7QUFDN0QsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDNUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbkIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUM5QixJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO0FBQUMsSUFDdkMsWUFBWTtFQUNkLFNBQUEsYUFBQSxFQUFjO0lBQUEsSUFBQSxLQUFBO0lBQUEsZUFBQSxPQUFBLFlBQUE7SUFDVixJQUFJLENBQUMsUUFBUSxHQUFHLDBCQUEwQjtJQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQU07TUFDaEIsSUFBSSxJQUFJLE1BQUEsTUFBQSxDQUFNLEtBQUksQ0FBQyxRQUFRLGNBQVc7TUFDdEMsT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDRDtJQUNBLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBQyxHQUFHLEVBQUs7TUFDdkIsSUFBSSxJQUFJLE1BQUEsTUFBQSxDQUFNLEtBQUksQ0FBQyxRQUFRLGVBQVk7TUFDdkMsT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ3RELENBQUM7SUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDckI7RUFBQyxPQUFBLFlBQUEsQ0FBQSxZQUFBO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFBLFVBQVUsQ0FBQSxFQUFHLENBQ2I7RUFBQztBQUFBO0FBRUwsSUFBSSxXQUFXLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQztBQUNwQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVc7OztBQ3hCakMsWUFBWTs7QUFBQyxTQUFBLFFBQUEsQ0FBQSxzQ0FBQSxPQUFBLHdCQUFBLE1BQUEsdUJBQUEsTUFBQSxDQUFBLFFBQUEsYUFBQSxDQUFBLGtCQUFBLENBQUEsZ0JBQUEsQ0FBQSxXQUFBLENBQUEseUJBQUEsTUFBQSxJQUFBLENBQUEsQ0FBQSxXQUFBLEtBQUEsTUFBQSxJQUFBLENBQUEsS0FBQSxNQUFBLENBQUEsU0FBQSxxQkFBQSxDQUFBLEtBQUEsT0FBQSxDQUFBLENBQUE7QUFBQSxTQUFBLG9CQUFBLGtCQUNiLG1LQUFBLG1CQUFBLFlBQUEsb0JBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLGNBQUEsRUFBQSxDQUFBLHdCQUFBLE1BQUEsR0FBQSxNQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLGtCQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSx1QkFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFdBQUEsOEJBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsVUFBQSxHQUFBLENBQUEsRUFBQSxZQUFBLEdBQUEsQ0FBQSxFQUFBLFFBQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQSxtQkFBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLGdCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLFNBQUEsWUFBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBLHVCQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsdUJBQUEsQ0FBQSxFQUFBLENBQUEsY0FBQSxDQUFBLFFBQUEsS0FBQSw0Q0FBQSxDQUFBLG9CQUFBLENBQUEsUUFBQSxDQUFBLFdBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLGVBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLE1BQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxLQUFBLENBQUEsbUJBQUEsQ0FBQSxxQkFBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxzQkFBQSxDQUFBLENBQUEsTUFBQSxjQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsaUJBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSx1QkFBQSxDQUFBLENBQUEsTUFBQSxJQUFBLENBQUEsQ0FBQSxNQUFBLFdBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsb0JBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxLQUFBLENBQUEscUJBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLGtCQUFBLENBQUEsQ0FBQSxJQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxNQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBLGFBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsbUJBQUEsSUFBQSxZQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGNBQUEsQ0FBQSxhQUFBLElBQUEsV0FBQSxHQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUEsZ0JBQUEsVUFBQSxjQUFBLGtCQUFBLGNBQUEsMkJBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLHFDQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLDBCQUFBLENBQUEsU0FBQSxHQUFBLFNBQUEsQ0FBQSxTQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLGdDQUFBLE9BQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFlBQUEsQ0FBQSxnQkFBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsc0JBQUEsY0FBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxTQUFBLENBQUEsZ0JBQUEsT0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxXQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxnQkFBQSxDQUFBLFdBQUEsQ0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBLDRCQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsRUFBQSxlQUFBLENBQUEsV0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsdUJBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxRQUFBLHFCQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxNQUFBLGFBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLE1BQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxNQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsT0FBQSxTQUFBLHVDQUFBLENBQUEsaUJBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEdBQUEsbUJBQUEsQ0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLENBQUEsTUFBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsUUFBQSxTQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsQ0FBQSxNQUFBLFdBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsU0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxNQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsT0FBQSxTQUFBLHNDQUFBLENBQUEsQ0FBQSxRQUFBLFNBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQSxTQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBLElBQUEsYUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxhQUFBLFFBQUEsQ0FBQSxTQUFBLFVBQUEsV0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsY0FBQSxLQUFBLGlCQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSw0QkFBQSxDQUFBLENBQUEsSUFBQSxTQUFBLENBQUEsT0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxZQUFBLEVBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxnQkFBQSxTQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsa0NBQUEsaUJBQUEsQ0FBQSxTQUFBLEdBQUEsMEJBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxpQkFBQSwwQkFBQSxHQUFBLENBQUEsQ0FBQSwwQkFBQSxpQkFBQSxpQkFBQSxHQUFBLGlCQUFBLENBQUEsV0FBQSxHQUFBLENBQUEsQ0FBQSwwQkFBQSxFQUFBLENBQUEsd0JBQUEsQ0FBQSxDQUFBLG1CQUFBLGFBQUEsQ0FBQSxRQUFBLENBQUEsd0JBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxXQUFBLFdBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxpQkFBQSw2QkFBQSxDQUFBLENBQUEsV0FBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsYUFBQSxDQUFBLFdBQUEsTUFBQSxDQUFBLGNBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSwwQkFBQSxLQUFBLENBQUEsQ0FBQSxTQUFBLEdBQUEsMEJBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEseUJBQUEsQ0FBQSxDQUFBLFNBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEtBQUEsYUFBQSxDQUFBLGFBQUEsT0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLFNBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLGlDQUFBLENBQUEsQ0FBQSxhQUFBLEdBQUEsYUFBQSxFQUFBLENBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsZUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLE9BQUEsT0FBQSxDQUFBLE9BQUEsYUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLFdBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxXQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxpQ0FBQSxDQUFBLENBQUEsQ0FBQSw2REFBQSxDQUFBLENBQUEsSUFBQSxhQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLGdCQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLG1CQUFBLEVBQUEsV0FBQSxDQUFBLENBQUEsTUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsU0FBQSxLQUFBLFdBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxXQUFBLE1BQUEsQ0FBQSxhQUFBLElBQUEsUUFBQSxJQUFBLFdBQUEsSUFBQSxRQUFBLEtBQUEsR0FBQSxDQUFBLE9BQUEsSUFBQSxZQUFBLFFBQUEsY0FBQSxNQUFBLGdCQUFBLEdBQUEsR0FBQSxDQUFBLE9BQUEsVUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsa0JBQUEsQ0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsTUFBQSxLQUFBLEVBQUEsQ0FBQSxDQUFBLEtBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLElBQUEsV0FBQSxLQUFBLFNBQUEsSUFBQSxXQUFBLENBQUEsUUFBQSxVQUFBLHdCQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxDQUFBLEdBQUEsY0FBQSxJQUFBLEtBQUEsaUJBQUEsV0FBQSxrQkFBQSxDQUFBLGFBQUEsSUFBQSxRQUFBLENBQUEsTUFBQSxDQUFBLGtCQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLFlBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLFFBQUEsSUFBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsZ0JBQUEsQ0FBQSxZQUFBLENBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUEsUUFBQSxLQUFBLHdEQUFBLENBQUEsT0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLGNBQUEsTUFBQSxnQkFBQSxHQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxjQUFBLE1BQUEsV0FBQSxPQUFBLENBQUEsRUFBQSxDQUFBLGFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLFlBQUEsQ0FBQSxZQUFBLElBQUEsU0FBQSxJQUFBLEdBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLGFBQUEsQ0FBQSxpQkFBQSxDQUFBLG1CQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxjQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxpQkFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsTUFBQSxnQkFBQSxJQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsU0FBQSxRQUFBLENBQUEsQ0FBQSxNQUFBLFFBQUEsV0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxDQUFBLEdBQUEscUJBQUEsQ0FBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsZ0JBQUEsQ0FBQSxDQUFBLElBQUEsU0FBQSxJQUFBLFFBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsTUFBQSxrQkFBQSxJQUFBLHlCQUFBLENBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQSxVQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLE1BQUEsV0FBQSxPQUFBLENBQUEsYUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLGNBQUEsUUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLHlCQUFBLE9BQUEsQ0FBQSxhQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxxQkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxZQUFBLEtBQUEsOEJBQUEsYUFBQSxXQUFBLGNBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLGdCQUFBLFFBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLE1BQUEsVUFBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsT0FBQSxDQUFBO0FBQUEsU0FBQSxrQkFBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxRQUFBLENBQUEsQ0FBQSxZQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsUUFBQSxRQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsQ0FBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsaUJBQUEsUUFBQSxTQUFBLENBQUE7QUFBQSxTQUFBLGVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxZQUFBLENBQUEsQ0FBQSxnQ0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsU0FBQSxhQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLE9BQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBLGtCQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxnQ0FBQSxPQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsWUFBQSxTQUFBLHlFQUFBLENBQUEsR0FBQSxNQUFBLEdBQUEsTUFBQSxFQUFBLENBQUE7QUFBQSxTQUFBLGdCQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLENBQUEsYUFBQSxTQUFBO0FBQUEsSUFBSSxTQUFTLEdBQUksVUFBUSxTQUFLLFNBQVMsSUFBSyxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtFQUNyRixTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUU7SUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFO01BQUUsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUFFLENBQUMsQ0FBQztFQUFFO0VBQzNHLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtJQUN2RCxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7TUFBRSxJQUFJO1FBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7TUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO01BQUU7SUFBRTtJQUMxRixTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7TUFBRSxJQUFJO1FBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7TUFBRTtJQUFFO0lBQzdGLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtNQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO0lBQUU7SUFDN0csSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3pFLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7RUFBRSxLQUFLLEVBQUU7QUFBSyxDQUFDLENBQUM7QUFDN0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbkIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUM5QixJQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztBQUFDLElBQ3JELFVBQVUsZ0JBQUEsWUFBQSxDQUNaLFNBQUEsV0FBQSxFQUFjO0VBQUEsSUFBQSxLQUFBO0VBQUEsZUFBQSxPQUFBLFVBQUE7RUFDVjtFQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBQyxJQUFJO0lBQUEsT0FBSyxTQUFTLENBQUMsS0FBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFBLG1CQUFBLEdBQUEsSUFBQSxDQUFFLFNBQUEsUUFBQTtNQUFBLElBQUEsUUFBQTtNQUFBLE9BQUEsbUJBQUEsR0FBQSxJQUFBLFVBQUEsU0FBQSxRQUFBO1FBQUEsa0JBQUEsUUFBQSxDQUFBLElBQUEsR0FBQSxRQUFBLENBQUEsSUFBQTtVQUFBO1lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7WUFDakMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2NBQUUsU0FBUyxFQUFFO1lBQUssQ0FBQyxDQUFDO1lBQUMsUUFBQSxDQUFBLElBQUE7WUFDdEUsT0FBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztVQUFBO1lBQUEsUUFBQSxDQUFBLElBQUE7WUFDZCxPQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUU7Y0FDL0IsTUFBTSxFQUFFLEtBQUs7Y0FDYixPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFO2NBQ3BCO1lBQ0osQ0FBQyxDQUFDO1VBQUE7WUFMSSxRQUFRLEdBQUEsUUFBQSxDQUFBLElBQUE7WUFBQSxRQUFBLENBQUEsSUFBQTtZQUFBLElBT0wsUUFBUSxDQUFDLEVBQUU7Y0FBQSxRQUFBLENBQUEsSUFBQTtjQUFBO1lBQUE7WUFBQSxNQUNOLElBQUksS0FBSyw0QkFBQSxNQUFBLENBQTRCLFFBQVEsQ0FBQyxVQUFVLENBQUUsQ0FBQztVQUFBO1lBQUEsUUFBQSxDQUFBLElBQUE7WUFFN0QsT0FBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7VUFBQTtZQUFBLE9BQUEsUUFBQSxDQUFBLE1BQUEsV0FBQSxRQUFBLENBQUEsSUFBQTtVQUFBO1lBQUEsUUFBQSxDQUFBLElBQUE7WUFHN0IsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2NBQUUsU0FBUyxFQUFFO1lBQU0sQ0FBQyxDQUFDO1lBQ3RFO1lBQUEsT0FBQSxRQUFBLENBQUEsTUFBQTtVQUFBO1VBQUE7WUFBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBO1FBQUE7TUFBQSxHQUFBLE9BQUE7SUFBQSxDQUVQLEVBQUM7RUFBQTtFQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBQyxJQUFJLEVBQUUsSUFBSTtJQUFBLE9BQUssU0FBUyxDQUFDLEtBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsZUFBQSxtQkFBQSxHQUFBLElBQUEsQ0FBRSxTQUFBLFNBQUE7TUFBQSxJQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFdBQUE7TUFBQSxPQUFBLG1CQUFBLEdBQUEsSUFBQSxVQUFBLFVBQUEsU0FBQTtRQUFBLGtCQUFBLFNBQUEsQ0FBQSxJQUFBLEdBQUEsU0FBQSxDQUFBLElBQUE7VUFBQTtZQUNwRCxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQztZQUM1QyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO2NBQzlCLE1BQU0sRUFBRSxNQUFNO2NBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2NBQzFCLE9BQU8sRUFBRTtZQUNiLENBQUMsQ0FBQztZQUNGLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFLLENBQUMsQ0FBQztZQUFDLFNBQUEsQ0FBQSxJQUFBO1lBQUEsU0FBQSxDQUFBLElBQUE7WUFFakQsT0FBTSxLQUFLLENBQUMsT0FBTyxDQUFDO1VBQUE7WUFBL0IsUUFBUSxHQUFBLFNBQUEsQ0FBQSxJQUFBO1lBQUEsSUFDVCxRQUFRLENBQUMsRUFBRTtjQUFBLFNBQUEsQ0FBQSxJQUFBO2NBQUE7WUFBQTtZQUFBLE1BQ04sSUFBSSxLQUFLLHlCQUFBLE1BQUEsQ0FBeUIsUUFBUSxDQUFDLFVBQVUsQ0FBRSxDQUFDO1VBQUE7WUFFNUQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztZQUFBLE1BQ3BELENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztjQUFBLFNBQUEsQ0FBQSxJQUFBO2NBQUE7WUFBQTtZQUFBLE1BQ25ELElBQUksU0FBUyxDQUFDLDRCQUE0QixDQUFDO1VBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUU5QyxPQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUFBO1lBQUEsT0FBQSxTQUFBLENBQUEsTUFBQSxXQUFBLFNBQUEsQ0FBQSxJQUFBO1VBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUc1QixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Y0FBRSxTQUFTLEVBQUU7WUFBTSxDQUFDLENBQUM7WUFDdEU7WUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBO1VBQUE7VUFBQTtZQUFBLE9BQUEsU0FBQSxDQUFBLElBQUE7UUFBQTtNQUFBLEdBQUEsUUFBQTtJQUFBLENBRVAsRUFBQztFQUFBO0VBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJO0lBQUEsT0FBSyxTQUFTLENBQUMsS0FBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFBLG1CQUFBLEdBQUEsSUFBQSxDQUFFLFNBQUEsU0FBQTtNQUFBLElBQUEsUUFBQTtNQUFBLE9BQUEsbUJBQUEsR0FBQSxJQUFBLFVBQUEsVUFBQSxTQUFBO1FBQUEsa0JBQUEsU0FBQSxDQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsSUFBQTtVQUFBO1lBQzdELG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFLLENBQUMsQ0FBQztZQUFDLFNBQUEsQ0FBQSxJQUFBO1lBQ3JELE9BQU0sS0FBSyxJQUFBLE1BQUEsQ0FBSSxJQUFJLE9BQUEsTUFBQSxDQUFJLElBQUksQ0FBQyxFQUFFLEdBQUk7Y0FDL0MsTUFBTSxFQUFFLEtBQUs7Y0FDYixPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFO2NBQ3BCLENBQUM7Y0FDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1lBQzdCLENBQUMsQ0FBQztVQUFBO1lBTkksUUFBUSxHQUFBLFNBQUEsQ0FBQSxJQUFBO1lBQUEsU0FBQSxDQUFBLElBQUE7WUFBQSxJQVFMLFFBQVEsQ0FBQyxFQUFFO2NBQUEsU0FBQSxDQUFBLElBQUE7Y0FBQTtZQUFBO1lBQUEsTUFDTixJQUFJLEtBQUssNEJBQUEsTUFBQSxDQUE0QixRQUFRLENBQUMsVUFBVSxDQUFFLENBQUM7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRTlELE9BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQUE7WUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBLFdBQUEsU0FBQSxDQUFBLElBQUE7VUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBRzVCLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFNLENBQUMsQ0FBQztZQUN0RTtZQUFBLE9BQUEsU0FBQSxDQUFBLE1BQUE7VUFBQTtVQUFBO1lBQUEsT0FBQSxTQUFBLENBQUEsSUFBQTtRQUFBO01BQUEsR0FBQSxRQUFBO0lBQUEsQ0FFUCxFQUFDO0VBQUE7RUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQUMsSUFBSSxFQUFFLEVBQUU7SUFBQSxPQUFLLFNBQVMsQ0FBQyxLQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLGVBQUEsbUJBQUEsR0FBQSxJQUFBLENBQUUsU0FBQSxTQUFBO01BQUEsSUFBQSxRQUFBO01BQUEsT0FBQSxtQkFBQSxHQUFBLElBQUEsVUFBQSxVQUFBLFNBQUE7UUFBQSxrQkFBQSxTQUFBLENBQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxJQUFBO1VBQUE7WUFDM0QsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2NBQUUsU0FBUyxFQUFFO1lBQUssQ0FBQyxDQUFDO1lBQ3JFO1lBQUEsU0FBQSxDQUFBLElBQUE7WUFDaUIsT0FBTSxLQUFLLElBQUEsTUFBQSxDQUFJLElBQUksT0FBQSxNQUFBLENBQUksRUFBRSxHQUFJO2NBQzFDLE1BQU0sRUFBRSxRQUFRO2NBQ2hCLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUU7Y0FDcEI7WUFDSixDQUFDLENBQUM7VUFBQTtZQUxJLFFBQVEsR0FBQSxTQUFBLENBQUEsSUFBQTtZQUFBLFNBQUEsQ0FBQSxJQUFBO1lBQUEsSUFPTCxRQUFRLENBQUMsRUFBRTtjQUFBLFNBQUEsQ0FBQSxJQUFBO2NBQUE7WUFBQTtZQUFBLE1BQ04sSUFBSSxLQUFLLDRCQUFBLE1BQUEsQ0FBNEIsUUFBUSxDQUFDLFVBQVUsQ0FBRSxDQUFDO1VBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUU5RCxPQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUFBO1lBQUEsT0FBQSxTQUFBLENBQUEsTUFBQSxXQUFBLFNBQUEsQ0FBQSxJQUFBO1VBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUc1QixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Y0FBRSxTQUFTLEVBQUU7WUFBTSxDQUFDLENBQUM7WUFDdEU7WUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBO1VBQUE7VUFBQTtZQUFBLE9BQUEsU0FBQSxDQUFBLElBQUE7UUFBQTtNQUFBLEdBQUEsUUFBQTtJQUFBLENBRVAsRUFBQztFQUFBO0VBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFDLElBQUksRUFBRSxFQUFFO0lBQUEsT0FBSyxTQUFTLENBQUMsS0FBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFBLG1CQUFBLEdBQUEsSUFBQSxDQUFFLFNBQUEsU0FBQTtNQUFBLElBQUEsUUFBQTtNQUFBLE9BQUEsbUJBQUEsR0FBQSxJQUFBLFVBQUEsVUFBQSxTQUFBO1FBQUEsa0JBQUEsU0FBQSxDQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsSUFBQTtVQUFBO1lBQzVELG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFLLENBQUMsQ0FBQztZQUFDLFNBQUEsQ0FBQSxJQUFBO1lBQUEsU0FBQSxDQUFBLElBQUE7WUFFakQsT0FBTSxLQUFLLElBQUEsTUFBQSxDQUFJLElBQUksT0FBQSxNQUFBLENBQUksRUFBRSxHQUFJO2NBQzFDLE1BQU0sRUFBRSxLQUFLO2NBQ2IsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRTtjQUNwQjtZQUNKLENBQUMsQ0FBQztVQUFBO1lBTEksUUFBUSxHQUFBLFNBQUEsQ0FBQSxJQUFBO1lBQUEsSUFNVCxRQUFRLENBQUMsRUFBRTtjQUFBLFNBQUEsQ0FBQSxJQUFBO2NBQUE7WUFBQTtZQUFBLE1BQ04sSUFBSSxLQUFLLDRCQUFBLE1BQUEsQ0FBNEIsUUFBUSxDQUFDLFVBQVUsQ0FBRSxDQUFDO1VBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUU3RCxPQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUFBO1lBQUEsT0FBQSxTQUFBLENBQUEsTUFBQSxXQUFBLFNBQUEsQ0FBQSxJQUFBO1VBQUE7WUFBQSxTQUFBLENBQUEsSUFBQTtZQUc3QixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Y0FBRSxTQUFTLEVBQUU7WUFBTSxDQUFDLENBQUM7WUFDdEU7WUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBO1VBQUE7VUFBQTtZQUFBLE9BQUEsU0FBQSxDQUFBLElBQUE7UUFBQTtNQUFBLEdBQUEsUUFBQTtJQUFBLENBRVAsRUFBQztFQUFBO0VBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztBQUN6QyxDQUFDO0FBRUwsSUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQztBQUNsQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVM7OztBQy9IN0IsWUFBWTs7QUFBQyxTQUFBLFFBQUEsQ0FBQSxzQ0FBQSxPQUFBLHdCQUFBLE1BQUEsdUJBQUEsTUFBQSxDQUFBLFFBQUEsYUFBQSxDQUFBLGtCQUFBLENBQUEsZ0JBQUEsQ0FBQSxXQUFBLENBQUEseUJBQUEsTUFBQSxJQUFBLENBQUEsQ0FBQSxXQUFBLEtBQUEsTUFBQSxJQUFBLENBQUEsS0FBQSxNQUFBLENBQUEsU0FBQSxxQkFBQSxDQUFBLEtBQUEsT0FBQSxDQUFBLENBQUE7QUFBQSxTQUFBLGdCQUFBLENBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLENBQUEsYUFBQSxTQUFBO0FBQUEsU0FBQSxrQkFBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxRQUFBLENBQUEsQ0FBQSxZQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsUUFBQSxRQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUE7QUFBQSxTQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsQ0FBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsaUJBQUEsUUFBQSxTQUFBLENBQUE7QUFBQSxTQUFBLGVBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxZQUFBLENBQUEsQ0FBQSxnQ0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsU0FBQSxhQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLE9BQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxXQUFBLGtCQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxnQ0FBQSxPQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsWUFBQSxTQUFBLHlFQUFBLENBQUEsR0FBQSxNQUFBLEdBQUEsTUFBQSxFQUFBLENBQUE7QUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7RUFBRSxLQUFLLEVBQUU7QUFBSyxDQUFDLENBQUM7QUFDN0QsT0FBTyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDN0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRO0FBQzNCLE9BQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYTtBQUNyQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVc7QUFDakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbkIsU0FBUyxRQUFRLENBQUMsWUFBWSxFQUFFO0VBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO0lBQUEsT0FBSSxVQUFVLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztFQUFBLEVBQUM7QUFDcEU7QUFDQTtBQUNBLFNBQVMsYUFBYSxDQUFDLFFBQVEsRUFBRTtFQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ1gsT0FBTyxJQUFJO0VBQ2Y7RUFDQSxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ3hDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDcEIsT0FBTyxJQUFJO0VBQ2Y7RUFDQSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQ3BCLE9BQU87TUFDSCxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztNQUNuQixRQUFRLEVBQUU7SUFDZCxDQUFDO0VBQ0w7RUFDQSxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQzFCLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztFQUN6QyxPQUFPO0lBQ0gsU0FBUyxFQUFULFNBQVM7SUFDVCxRQUFRLEVBQVI7RUFDSixDQUFDO0FBQ0w7QUFDQSxTQUFTLFdBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFO0VBQ3RDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxRQUFRLEVBQUU7SUFDekIsT0FBTyxJQUFJO0VBQ2Y7RUFDQSxJQUFJLENBQUMsU0FBUyxFQUFFO0lBQ1osT0FBTyxRQUFRO0VBQ25CO0VBQ0EsSUFBSSxDQUFDLFFBQVEsRUFBRTtJQUNYLE9BQU8sU0FBUztFQUNwQjtFQUNBLFVBQUEsTUFBQSxDQUFVLFNBQVMsT0FBQSxNQUFBLENBQUksUUFBUTtBQUNuQztBQUFDLElBQ0ssWUFBWTtFQUNkLFNBQUEsYUFBQSxFQUFjO0lBQUEsZUFBQSxPQUFBLFlBQUE7RUFDZDtFQUFDLE9BQUEsWUFBQSxDQUFBLFlBQUE7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUNELFNBQU8sVUFBVSxDQUFBLEVBQUc7TUFDaEIsSUFBSSxFQUFFLEVBQUUsRUFBRTtNQUNWLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSztNQUM1QixZQUFZLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFLEtBQUssS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVM7TUFDOUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7TUFDMUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUMsZ0JBQWdCLE1BQU0sSUFBSSxJQUFJLEVBQUUsS0FBSyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUMxSDtFQUFDO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFPLGVBQWUsQ0FBQSxFQUFHO01BQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSTtJQUMvQjtFQUFDO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFPLGVBQWUsQ0FBQSxFQUFHO01BQ3JCLE9BQU8sSUFBSSxDQUFDLGVBQWU7SUFDL0I7RUFBQztJQUFBLEdBQUE7SUFBQSxLQUFBLEVBQ0QsU0FBTyxtQkFBbUIsQ0FBQSxFQUFHO01BQ3pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQjtJQUNoQztFQUFDO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFDRCxTQUFPLGlCQUFpQixDQUFBLEVBQUc7TUFDdkIsT0FBTyxJQUFJLENBQUMsY0FBYztJQUM5QjtFQUFDO0FBQUE7QUFFTCxPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVk7QUFDbkMsWUFBWSxDQUFDLGVBQWUsR0FBRyxLQUFLOzs7QUNwRXBDLFlBQVk7O0FBQUMsU0FBQSxRQUFBLENBQUEsc0NBQUEsT0FBQSx3QkFBQSxNQUFBLHVCQUFBLE1BQUEsQ0FBQSxRQUFBLGFBQUEsQ0FBQSxrQkFBQSxDQUFBLGdCQUFBLENBQUEsV0FBQSxDQUFBLHlCQUFBLE1BQUEsSUFBQSxDQUFBLENBQUEsV0FBQSxLQUFBLE1BQUEsSUFBQSxDQUFBLEtBQUEsTUFBQSxDQUFBLFNBQUEscUJBQUEsQ0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQUEsU0FBQSxvQkFBQSxrQkFDYixtS0FBQSxtQkFBQSxZQUFBLG9CQUFBLFdBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQSx3QkFBQSxNQUFBLEdBQUEsTUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxrQkFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLGFBQUEsdUJBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxXQUFBLDhCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxXQUFBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLFVBQUEsR0FBQSxDQUFBLEVBQUEsWUFBQSxHQUFBLENBQUEsRUFBQSxRQUFBLEdBQUEsQ0FBQSxhQUFBLENBQUEsbUJBQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxnQkFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxTQUFBLFlBQUEsU0FBQSxHQUFBLENBQUEsR0FBQSxTQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLFNBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQSx1QkFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLHVCQUFBLENBQUEsRUFBQSxDQUFBLGNBQUEsQ0FBQSxRQUFBLEtBQUEsNENBQUEsQ0FBQSxvQkFBQSxDQUFBLFFBQUEsQ0FBQSxXQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxlQUFBLENBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsUUFBQSxNQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsS0FBQSxDQUFBLG1CQUFBLENBQUEscUJBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsc0JBQUEsQ0FBQSxDQUFBLE1BQUEsY0FBQSxDQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLGlCQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsdUJBQUEsQ0FBQSxDQUFBLE1BQUEsSUFBQSxDQUFBLENBQUEsTUFBQSxXQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLHFCQUFBLEtBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxrQkFBQSxDQUFBLENBQUEsSUFBQSxLQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsTUFBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQSxhQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLG1CQUFBLElBQUEsWUFBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxjQUFBLENBQUEsYUFBQSxJQUFBLFdBQUEsR0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsTUFBQSxDQUFBLGdCQUFBLFVBQUEsY0FBQSxrQkFBQSxjQUFBLDJCQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxxQ0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSwwQkFBQSxDQUFBLFNBQUEsR0FBQSxTQUFBLENBQUEsU0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxnQ0FBQSxPQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxZQUFBLENBQUEsZ0JBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLHNCQUFBLGNBQUEsQ0FBQSxFQUFBLENBQUEsYUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsbUJBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsU0FBQSxDQUFBLGdCQUFBLE9BQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsZ0JBQUEsQ0FBQSxXQUFBLENBQUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQSw0QkFBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLEVBQUEsZUFBQSxDQUFBLFdBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLHVCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsUUFBQSxxQkFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsTUFBQSxhQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxNQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsTUFBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsU0FBQSx1Q0FBQSxDQUFBLGlCQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLG1CQUFBLENBQUEsQ0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBLE1BQUEsWUFBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLFFBQUEsU0FBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLENBQUEsTUFBQSxXQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsTUFBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsU0FBQSxzQ0FBQSxDQUFBLENBQUEsUUFBQSxTQUFBLENBQUEsY0FBQSxFQUFBLENBQUEsU0FBQSxVQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsY0FBQSxFQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxJQUFBLGFBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsYUFBQSxRQUFBLENBQUEsU0FBQSxVQUFBLFdBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLGNBQUEsS0FBQSxpQkFBQSxFQUFBLENBQUEsZ0JBQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsNEJBQUEsQ0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLE9BQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLFNBQUEsQ0FBQSxPQUFBLENBQUEsWUFBQSxFQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsWUFBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsZ0JBQUEsU0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLGtDQUFBLGlCQUFBLENBQUEsU0FBQSxHQUFBLDBCQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsaUJBQUEsMEJBQUEsR0FBQSxDQUFBLENBQUEsMEJBQUEsaUJBQUEsaUJBQUEsR0FBQSxpQkFBQSxDQUFBLFdBQUEsR0FBQSxDQUFBLENBQUEsMEJBQUEsRUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQSxtQkFBQSxhQUFBLENBQUEsUUFBQSxDQUFBLHdCQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsV0FBQSxXQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsaUJBQUEsNkJBQUEsQ0FBQSxDQUFBLFdBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLGFBQUEsQ0FBQSxXQUFBLE1BQUEsQ0FBQSxjQUFBLEdBQUEsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsMEJBQUEsS0FBQSxDQUFBLENBQUEsU0FBQSxHQUFBLDBCQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLHlCQUFBLENBQUEsQ0FBQSxTQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxhQUFBLE9BQUEsRUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxTQUFBLEdBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxpQ0FBQSxDQUFBLENBQUEsYUFBQSxHQUFBLGFBQUEsRUFBQSxDQUFBLENBQUEsS0FBQSxhQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLGVBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxPQUFBLE9BQUEsQ0FBQSxPQUFBLGFBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsbUJBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsSUFBQSxXQUFBLENBQUEsV0FBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsV0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsaUNBQUEsQ0FBQSxDQUFBLENBQUEsNkRBQUEsQ0FBQSxDQUFBLElBQUEsYUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxnQkFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxtQkFBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBLE1BQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsT0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLElBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFBLFNBQUEsS0FBQSxXQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsV0FBQSxNQUFBLENBQUEsYUFBQSxJQUFBLFFBQUEsSUFBQSxXQUFBLElBQUEsUUFBQSxLQUFBLEdBQUEsQ0FBQSxPQUFBLElBQUEsWUFBQSxRQUFBLGNBQUEsTUFBQSxnQkFBQSxHQUFBLEdBQUEsQ0FBQSxPQUFBLFVBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxDQUFBLGtCQUFBLENBQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxDQUFBLElBQUEsT0FBQSxDQUFBLE1BQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxLQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxJQUFBLFdBQUEsS0FBQSxTQUFBLElBQUEsV0FBQSxDQUFBLFFBQUEsVUFBQSx3QkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsQ0FBQSxHQUFBLGNBQUEsSUFBQSxLQUFBLGlCQUFBLFdBQUEsa0JBQUEsQ0FBQSxhQUFBLElBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxrQkFBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxhQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsVUFBQSxDQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxRQUFBLElBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLGdCQUFBLENBQUEsWUFBQSxDQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLFFBQUEsS0FBQSx3REFBQSxDQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxjQUFBLE1BQUEsZ0JBQUEsR0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsY0FBQSxNQUFBLFdBQUEsT0FBQSxDQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsWUFBQSxJQUFBLFNBQUEsSUFBQSxHQUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxhQUFBLENBQUEsaUJBQUEsQ0FBQSxtQkFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsY0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsaUJBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLE1BQUEsZ0JBQUEsSUFBQSxHQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsUUFBQSxDQUFBLENBQUEsTUFBQSxRQUFBLFdBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsQ0FBQSxHQUFBLHFCQUFBLENBQUEsQ0FBQSxJQUFBLG1CQUFBLENBQUEsQ0FBQSxJQUFBLFFBQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLGdCQUFBLENBQUEsQ0FBQSxJQUFBLFNBQUEsSUFBQSxRQUFBLEdBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxPQUFBLE1BQUEsa0JBQUEsSUFBQSx5QkFBQSxDQUFBLENBQUEsSUFBQSxJQUFBLENBQUEsVUFBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxNQUFBLFdBQUEsT0FBQSxDQUFBLGFBQUEsQ0FBQSxRQUFBLFVBQUEsQ0FBQSxNQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxjQUFBLFFBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSx5QkFBQSxPQUFBLENBQUEsYUFBQSxDQUFBLFFBQUEsVUFBQSxDQUFBLE1BQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxVQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEscUJBQUEsQ0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsWUFBQSxLQUFBLDhCQUFBLGFBQUEsV0FBQSxjQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxnQkFBQSxRQUFBLEtBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxvQkFBQSxNQUFBLFVBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQTtBQUFBLElBQUksU0FBUyxHQUFJLFVBQVEsU0FBSyxTQUFTLElBQUssVUFBVSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7RUFDckYsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0lBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRTtNQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFBRSxDQUFDLENBQUM7RUFBRTtFQUMzRyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7SUFDdkQsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFO01BQUUsSUFBSTtRQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztNQUFFO0lBQUU7SUFDMUYsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFO01BQUUsSUFBSTtRQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7TUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO01BQUU7SUFBRTtJQUM3RixTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUU7TUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztJQUFFO0lBQzdHLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUN6RSxDQUFDLENBQUM7QUFDTixDQUFDO0FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0VBQUUsS0FBSyxFQUFFO0FBQUssQ0FBQyxDQUFDO0FBQzdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUNsRCxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDbEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVk7RUFDdEQsT0FBTyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFBLG1CQUFBLEdBQUEsSUFBQSxDQUFFLFNBQUEsU0FBQTtJQUFBLElBQUEsSUFBQSxFQUcxQixhQUFhLEVBMEJiLFdBQVc7SUFBQSxPQUFBLG1CQUFBLEdBQUEsSUFBQSxVQUFBLFVBQUEsU0FBQTtNQUFBLGtCQUFBLFNBQUEsQ0FBQSxJQUFBLEdBQUEsU0FBQSxDQUFBLElBQUE7UUFBQTtVQUFYLFdBQVcsWUFBQSxhQUFDLEtBQUssRUFBRTtZQUN4QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUM7WUFDNUQsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7Y0FDcEIsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztjQUM3QixTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsS0FBSyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztZQUNwRixDQUFDLENBQUM7VUFDTixDQUFDO1VBbENRLGFBQWEsWUFBQSxlQUFDLE9BQU8sRUFBRTtZQUFBLElBQUEsS0FBQTtZQUM1QixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN4QyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEVBQUU7WUFDL0IsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDOUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsUUFBUTtZQUN4QyxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNsRCxhQUFhLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLO1lBQ3pDLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1lBQzlCLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzVCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO1lBQ2xELFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO2NBQUEsT0FBSyxTQUFTLENBQUMsS0FBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFBLG1CQUFBLEdBQUEsSUFBQSxDQUFFLFNBQUEsUUFBQTtnQkFBQSxPQUFBLG1CQUFBLEdBQUEsSUFBQSxVQUFBLFNBQUEsUUFBQTtrQkFBQSxrQkFBQSxRQUFBLENBQUEsSUFBQSxHQUFBLFFBQUEsQ0FBQSxJQUFBO29CQUFBO3NCQUFBLFFBQUEsQ0FBQSxJQUFBO3NCQUVqRSxPQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQUE7c0JBQ3RELENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDO3NCQUN4QztzQkFDQTtzQkFDQTtvQkFBQTtvQkFBQTtzQkFBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBO2tCQUFBO2dCQUFBLEdBQUEsT0FBQTtjQUFBLENBQ0gsRUFBQztZQUFBLEVBQUM7WUFDSCxPQUFPLEdBQUc7VUFDZCxDQUFDO1VBM0JELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7VUFBQyxTQUFBLENBQUEsSUFBQTtVQUNqQyxPQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFBQTtVQUEvQyxJQUFJLEdBQUEsU0FBQSxDQUFBLElBQUE7VUFvQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUssRUFBSztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNsQixXQUFXLENBQUMsS0FBSyxDQUFDO1VBQ3RCLENBQUMsQ0FBQztRQUFDO1FBQUE7VUFBQSxPQUFBLFNBQUEsQ0FBQSxJQUFBO01BQUE7SUFBQSxHQUFBLFFBQUE7RUFBQSxDQUNOLEVBQUM7QUFDTixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW50ZXJ2YWwgPSBleHBvcnRzLmlpZiA9IGV4cG9ydHMuZ2VuZXJhdGUgPSBleHBvcnRzLmZyb21FdmVudFBhdHRlcm4gPSBleHBvcnRzLmZyb21FdmVudCA9IGV4cG9ydHMuZnJvbSA9IGV4cG9ydHMuZm9ya0pvaW4gPSBleHBvcnRzLmVtcHR5ID0gZXhwb3J0cy5kZWZlciA9IGV4cG9ydHMuY29ubmVjdGFibGUgPSBleHBvcnRzLmNvbmNhdCA9IGV4cG9ydHMuY29tYmluZUxhdGVzdCA9IGV4cG9ydHMuYmluZE5vZGVDYWxsYmFjayA9IGV4cG9ydHMuYmluZENhbGxiYWNrID0gZXhwb3J0cy5VbnN1YnNjcmlwdGlvbkVycm9yID0gZXhwb3J0cy5UaW1lb3V0RXJyb3IgPSBleHBvcnRzLlNlcXVlbmNlRXJyb3IgPSBleHBvcnRzLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gZXhwb3J0cy5Ob3RGb3VuZEVycm9yID0gZXhwb3J0cy5FbXB0eUVycm9yID0gZXhwb3J0cy5Bcmd1bWVudE91dE9mUmFuZ2VFcnJvciA9IGV4cG9ydHMuZmlyc3RWYWx1ZUZyb20gPSBleHBvcnRzLmxhc3RWYWx1ZUZyb20gPSBleHBvcnRzLmlzT2JzZXJ2YWJsZSA9IGV4cG9ydHMuaWRlbnRpdHkgPSBleHBvcnRzLm5vb3AgPSBleHBvcnRzLnBpcGUgPSBleHBvcnRzLk5vdGlmaWNhdGlvbktpbmQgPSBleHBvcnRzLk5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuU3Vic2NyaWJlciA9IGV4cG9ydHMuU3Vic2NyaXB0aW9uID0gZXhwb3J0cy5TY2hlZHVsZXIgPSBleHBvcnRzLlZpcnR1YWxBY3Rpb24gPSBleHBvcnRzLlZpcnR1YWxUaW1lU2NoZWR1bGVyID0gZXhwb3J0cy5hbmltYXRpb25GcmFtZVNjaGVkdWxlciA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWUgPSBleHBvcnRzLnF1ZXVlU2NoZWR1bGVyID0gZXhwb3J0cy5xdWV1ZSA9IGV4cG9ydHMuYXN5bmNTY2hlZHVsZXIgPSBleHBvcnRzLmFzeW5jID0gZXhwb3J0cy5hc2FwU2NoZWR1bGVyID0gZXhwb3J0cy5hc2FwID0gZXhwb3J0cy5Bc3luY1N1YmplY3QgPSBleHBvcnRzLlJlcGxheVN1YmplY3QgPSBleHBvcnRzLkJlaGF2aW9yU3ViamVjdCA9IGV4cG9ydHMuU3ViamVjdCA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWVzID0gZXhwb3J0cy5vYnNlcnZhYmxlID0gZXhwb3J0cy5Db25uZWN0YWJsZU9ic2VydmFibGUgPSBleHBvcnRzLk9ic2VydmFibGUgPSB2b2lkIDA7XG5leHBvcnRzLmZpbHRlciA9IGV4cG9ydHMuZXhwYW5kID0gZXhwb3J0cy5leGhhdXN0TWFwID0gZXhwb3J0cy5leGhhdXN0QWxsID0gZXhwb3J0cy5leGhhdXN0ID0gZXhwb3J0cy5ldmVyeSA9IGV4cG9ydHMuZW5kV2l0aCA9IGV4cG9ydHMuZWxlbWVudEF0ID0gZXhwb3J0cy5kaXN0aW5jdFVudGlsS2V5Q2hhbmdlZCA9IGV4cG9ydHMuZGlzdGluY3RVbnRpbENoYW5nZWQgPSBleHBvcnRzLmRpc3RpbmN0ID0gZXhwb3J0cy5kZW1hdGVyaWFsaXplID0gZXhwb3J0cy5kZWxheVdoZW4gPSBleHBvcnRzLmRlbGF5ID0gZXhwb3J0cy5kZWZhdWx0SWZFbXB0eSA9IGV4cG9ydHMuZGVib3VuY2VUaW1lID0gZXhwb3J0cy5kZWJvdW5jZSA9IGV4cG9ydHMuY291bnQgPSBleHBvcnRzLmNvbm5lY3QgPSBleHBvcnRzLmNvbmNhdFdpdGggPSBleHBvcnRzLmNvbmNhdE1hcFRvID0gZXhwb3J0cy5jb25jYXRNYXAgPSBleHBvcnRzLmNvbmNhdEFsbCA9IGV4cG9ydHMuY29tYmluZUxhdGVzdFdpdGggPSBleHBvcnRzLmNvbWJpbmVMYXRlc3RBbGwgPSBleHBvcnRzLmNvbWJpbmVBbGwgPSBleHBvcnRzLmNhdGNoRXJyb3IgPSBleHBvcnRzLmJ1ZmZlcldoZW4gPSBleHBvcnRzLmJ1ZmZlclRvZ2dsZSA9IGV4cG9ydHMuYnVmZmVyVGltZSA9IGV4cG9ydHMuYnVmZmVyQ291bnQgPSBleHBvcnRzLmJ1ZmZlciA9IGV4cG9ydHMuYXVkaXRUaW1lID0gZXhwb3J0cy5hdWRpdCA9IGV4cG9ydHMuY29uZmlnID0gZXhwb3J0cy5ORVZFUiA9IGV4cG9ydHMuRU1QVFkgPSBleHBvcnRzLnNjaGVkdWxlZCA9IGV4cG9ydHMuemlwID0gZXhwb3J0cy51c2luZyA9IGV4cG9ydHMudGltZXIgPSBleHBvcnRzLnRocm93RXJyb3IgPSBleHBvcnRzLnJhbmdlID0gZXhwb3J0cy5yYWNlID0gZXhwb3J0cy5wYXJ0aXRpb24gPSBleHBvcnRzLnBhaXJzID0gZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IGV4cG9ydHMub2YgPSBleHBvcnRzLm5ldmVyID0gZXhwb3J0cy5tZXJnZSA9IHZvaWQgMDtcbmV4cG9ydHMuc3dpdGNoTWFwID0gZXhwb3J0cy5zd2l0Y2hBbGwgPSBleHBvcnRzLnN1YnNjcmliZU9uID0gZXhwb3J0cy5zdGFydFdpdGggPSBleHBvcnRzLnNraXBXaGlsZSA9IGV4cG9ydHMuc2tpcFVudGlsID0gZXhwb3J0cy5za2lwTGFzdCA9IGV4cG9ydHMuc2tpcCA9IGV4cG9ydHMuc2luZ2xlID0gZXhwb3J0cy5zaGFyZVJlcGxheSA9IGV4cG9ydHMuc2hhcmUgPSBleHBvcnRzLnNlcXVlbmNlRXF1YWwgPSBleHBvcnRzLnNjYW4gPSBleHBvcnRzLnNhbXBsZVRpbWUgPSBleHBvcnRzLnNhbXBsZSA9IGV4cG9ydHMucmVmQ291bnQgPSBleHBvcnRzLnJldHJ5V2hlbiA9IGV4cG9ydHMucmV0cnkgPSBleHBvcnRzLnJlcGVhdFdoZW4gPSBleHBvcnRzLnJlcGVhdCA9IGV4cG9ydHMucmVkdWNlID0gZXhwb3J0cy5yYWNlV2l0aCA9IGV4cG9ydHMucHVibGlzaFJlcGxheSA9IGV4cG9ydHMucHVibGlzaExhc3QgPSBleHBvcnRzLnB1Ymxpc2hCZWhhdmlvciA9IGV4cG9ydHMucHVibGlzaCA9IGV4cG9ydHMucGx1Y2sgPSBleHBvcnRzLnBhaXJ3aXNlID0gZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dFdpdGggPSBleHBvcnRzLm9ic2VydmVPbiA9IGV4cG9ydHMubXVsdGljYXN0ID0gZXhwb3J0cy5taW4gPSBleHBvcnRzLm1lcmdlV2l0aCA9IGV4cG9ydHMubWVyZ2VTY2FuID0gZXhwb3J0cy5tZXJnZU1hcFRvID0gZXhwb3J0cy5tZXJnZU1hcCA9IGV4cG9ydHMuZmxhdE1hcCA9IGV4cG9ydHMubWVyZ2VBbGwgPSBleHBvcnRzLm1heCA9IGV4cG9ydHMubWF0ZXJpYWxpemUgPSBleHBvcnRzLm1hcFRvID0gZXhwb3J0cy5tYXAgPSBleHBvcnRzLmxhc3QgPSBleHBvcnRzLmlzRW1wdHkgPSBleHBvcnRzLmlnbm9yZUVsZW1lbnRzID0gZXhwb3J0cy5ncm91cEJ5ID0gZXhwb3J0cy5maXJzdCA9IGV4cG9ydHMuZmluZEluZGV4ID0gZXhwb3J0cy5maW5kID0gZXhwb3J0cy5maW5hbGl6ZSA9IHZvaWQgMDtcbmV4cG9ydHMuemlwV2l0aCA9IGV4cG9ydHMuemlwQWxsID0gZXhwb3J0cy53aXRoTGF0ZXN0RnJvbSA9IGV4cG9ydHMud2luZG93V2hlbiA9IGV4cG9ydHMud2luZG93VG9nZ2xlID0gZXhwb3J0cy53aW5kb3dUaW1lID0gZXhwb3J0cy53aW5kb3dDb3VudCA9IGV4cG9ydHMud2luZG93ID0gZXhwb3J0cy50b0FycmF5ID0gZXhwb3J0cy50aW1lc3RhbXAgPSBleHBvcnRzLnRpbWVvdXRXaXRoID0gZXhwb3J0cy50aW1lb3V0ID0gZXhwb3J0cy50aW1lSW50ZXJ2YWwgPSBleHBvcnRzLnRocm93SWZFbXB0eSA9IGV4cG9ydHMudGhyb3R0bGVUaW1lID0gZXhwb3J0cy50aHJvdHRsZSA9IGV4cG9ydHMudGFwID0gZXhwb3J0cy50YWtlV2hpbGUgPSBleHBvcnRzLnRha2VVbnRpbCA9IGV4cG9ydHMudGFrZUxhc3QgPSBleHBvcnRzLnRha2UgPSBleHBvcnRzLnN3aXRjaFNjYW4gPSBleHBvcnRzLnN3aXRjaE1hcFRvID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL09ic2VydmFibGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJPYnNlcnZhYmxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZTsgfSB9KTtcbnZhciBDb25uZWN0YWJsZU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29ubmVjdGFibGVPYnNlcnZhYmxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBDb25uZWN0YWJsZU9ic2VydmFibGVfMS5Db25uZWN0YWJsZU9ic2VydmFibGU7IH0gfSk7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJvYnNlcnZhYmxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZhYmxlXzEub2JzZXJ2YWJsZTsgfSB9KTtcbnZhciBhbmltYXRpb25GcmFtZXNfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZG9tL2FuaW1hdGlvbkZyYW1lc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFuaW1hdGlvbkZyYW1lc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYW5pbWF0aW9uRnJhbWVzXzEuYW5pbWF0aW9uRnJhbWVzOyB9IH0pO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL1N1YmplY3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTdWJqZWN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTdWJqZWN0XzEuU3ViamVjdDsgfSB9KTtcbnZhciBCZWhhdmlvclN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL0JlaGF2aW9yU3ViamVjdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkJlaGF2aW9yU3ViamVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQmVoYXZpb3JTdWJqZWN0XzEuQmVoYXZpb3JTdWJqZWN0OyB9IH0pO1xudmFyIFJlcGxheVN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL1JlcGxheVN1YmplY3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXBsYXlTdWJqZWN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBSZXBsYXlTdWJqZWN0XzEuUmVwbGF5U3ViamVjdDsgfSB9KTtcbnZhciBBc3luY1N1YmplY3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL0FzeW5jU3ViamVjdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkFzeW5jU3ViamVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQXN5bmNTdWJqZWN0XzEuQXN5bmNTdWJqZWN0OyB9IH0pO1xudmFyIGFzYXBfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3NjaGVkdWxlci9hc2FwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXNhcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXNhcF8xLmFzYXA7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhc2FwU2NoZWR1bGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhc2FwXzEuYXNhcFNjaGVkdWxlcjsgfSB9KTtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXN5bmNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFzeW5jXzEuYXN5bmM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhc3luY1NjaGVkdWxlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXN5bmNfMS5hc3luY1NjaGVkdWxlcjsgfSB9KTtcbnZhciBxdWV1ZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvc2NoZWR1bGVyL3F1ZXVlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicXVldWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHF1ZXVlXzEucXVldWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJxdWV1ZVNjaGVkdWxlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcXVldWVfMS5xdWV1ZVNjaGVkdWxlcjsgfSB9KTtcbnZhciBhbmltYXRpb25GcmFtZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvc2NoZWR1bGVyL2FuaW1hdGlvbkZyYW1lXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYW5pbWF0aW9uRnJhbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFuaW1hdGlvbkZyYW1lXzEuYW5pbWF0aW9uRnJhbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhbmltYXRpb25GcmFtZVNjaGVkdWxlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYW5pbWF0aW9uRnJhbWVfMS5hbmltYXRpb25GcmFtZVNjaGVkdWxlcjsgfSB9KTtcbnZhciBWaXJ0dWFsVGltZVNjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvc2NoZWR1bGVyL1ZpcnR1YWxUaW1lU2NoZWR1bGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmlydHVhbFRpbWVTY2hlZHVsZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFZpcnR1YWxUaW1lU2NoZWR1bGVyXzEuVmlydHVhbFRpbWVTY2hlZHVsZXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWaXJ0dWFsQWN0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBWaXJ0dWFsVGltZVNjaGVkdWxlcl8xLlZpcnR1YWxBY3Rpb247IH0gfSk7XG52YXIgU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9TY2hlZHVsZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTY2hlZHVsZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFNjaGVkdWxlcl8xLlNjaGVkdWxlcjsgfSB9KTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL1N1YnNjcmlwdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlN1YnNjcmlwdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uOyB9IH0pO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL1N1YnNjcmliZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTdWJzY3JpYmVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcjsgfSB9KTtcbnZhciBOb3RpZmljYXRpb25fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL05vdGlmaWNhdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTm90aWZpY2F0aW9uXzEuTm90aWZpY2F0aW9uOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90aWZpY2F0aW9uS2luZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTm90aWZpY2F0aW9uXzEuTm90aWZpY2F0aW9uS2luZDsgfSB9KTtcbnZhciBwaXBlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL3BpcGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwaXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwaXBlXzEucGlwZTsgfSB9KTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL25vb3BcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJub29wXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBub29wXzEubm9vcDsgfSB9KTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9pZGVudGl0eVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlkZW50aXR5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpZGVudGl0eV8xLmlkZW50aXR5OyB9IH0pO1xudmFyIGlzT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9pc09ic2VydmFibGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc09ic2VydmFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzT2JzZXJ2YWJsZV8xLmlzT2JzZXJ2YWJsZTsgfSB9KTtcbnZhciBsYXN0VmFsdWVGcm9tXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9sYXN0VmFsdWVGcm9tXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibGFzdFZhbHVlRnJvbVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbGFzdFZhbHVlRnJvbV8xLmxhc3RWYWx1ZUZyb207IH0gfSk7XG52YXIgZmlyc3RWYWx1ZUZyb21fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL2ZpcnN0VmFsdWVGcm9tXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmlyc3RWYWx1ZUZyb21cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZpcnN0VmFsdWVGcm9tXzEuZmlyc3RWYWx1ZUZyb207IH0gfSk7XG52YXIgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBcmd1bWVudE91dE9mUmFuZ2VFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JfMS5Bcmd1bWVudE91dE9mUmFuZ2VFcnJvcjsgfSB9KTtcbnZhciBFbXB0eUVycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL0VtcHR5RXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFbXB0eUVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBFbXB0eUVycm9yXzEuRW1wdHlFcnJvcjsgfSB9KTtcbnZhciBOb3RGb3VuZEVycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL05vdEZvdW5kRXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RGb3VuZEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBOb3RGb3VuZEVycm9yXzEuTm90Rm91bmRFcnJvcjsgfSB9KTtcbnZhciBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk9iamVjdFVuc3Vic2NyaWJlZEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yOyB9IH0pO1xudmFyIFNlcXVlbmNlRXJyb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvU2VxdWVuY2VFcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNlcXVlbmNlRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFNlcXVlbmNlRXJyb3JfMS5TZXF1ZW5jZUVycm9yOyB9IH0pO1xudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aW1lb3V0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVGltZW91dEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aW1lb3V0XzEuVGltZW91dEVycm9yOyB9IH0pO1xudmFyIFVuc3Vic2NyaXB0aW9uRXJyb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlVuc3Vic2NyaXB0aW9uRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yOyB9IH0pO1xudmFyIGJpbmRDYWxsYmFja18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9iaW5kQ2FsbGJhY2tcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJiaW5kQ2FsbGJhY2tcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJpbmRDYWxsYmFja18xLmJpbmRDYWxsYmFjazsgfSB9KTtcbnZhciBiaW5kTm9kZUNhbGxiYWNrXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmROb2RlQ2FsbGJhY2tcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJiaW5kTm9kZUNhbGxiYWNrXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kTm9kZUNhbGxiYWNrXzEuYmluZE5vZGVDYWxsYmFjazsgfSB9KTtcbnZhciBjb21iaW5lTGF0ZXN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb21iaW5lTGF0ZXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb21iaW5lTGF0ZXN0XzEuY29tYmluZUxhdGVzdDsgfSB9KTtcbnZhciBjb25jYXRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvY29uY2F0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uY2F0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25jYXRfMS5jb25jYXQ7IH0gfSk7XG52YXIgY29ubmVjdGFibGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvY29ubmVjdGFibGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25uZWN0YWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29ubmVjdGFibGVfMS5jb25uZWN0YWJsZTsgfSB9KTtcbnZhciBkZWZlcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9kZWZlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlZmVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWZlcl8xLmRlZmVyOyB9IH0pO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2VtcHR5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW1wdHlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtcHR5XzEuZW1wdHk7IH0gfSk7XG52YXIgZm9ya0pvaW5fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZm9ya0pvaW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmb3JrSm9pblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZm9ya0pvaW5fMS5mb3JrSm9pbjsgfSB9KTtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmcm9tXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmcm9tXzEuZnJvbTsgfSB9KTtcbnZhciBmcm9tRXZlbnRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZnJvbUV2ZW50XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZnJvbUV2ZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmcm9tRXZlbnRfMS5mcm9tRXZlbnQ7IH0gfSk7XG52YXIgZnJvbUV2ZW50UGF0dGVybl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnRQYXR0ZXJuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZnJvbUV2ZW50UGF0dGVyblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnJvbUV2ZW50UGF0dGVybl8xLmZyb21FdmVudFBhdHRlcm47IH0gfSk7XG52YXIgZ2VuZXJhdGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZ2VuZXJhdGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZW5lcmF0ZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2VuZXJhdGVfMS5nZW5lcmF0ZTsgfSB9KTtcbnZhciBpaWZfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvaWlmXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaWlmXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpaWZfMS5paWY7IH0gfSk7XG52YXIgaW50ZXJ2YWxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvaW50ZXJ2YWxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpbnRlcnZhbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaW50ZXJ2YWxfMS5pbnRlcnZhbDsgfSB9KTtcbnZhciBtZXJnZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9tZXJnZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1lcmdlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtZXJnZV8xLm1lcmdlOyB9IH0pO1xudmFyIG5ldmVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL25ldmVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmV2ZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldmVyXzEubmV2ZXI7IH0gfSk7XG52YXIgb2ZfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvb2ZcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJvZlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gb2ZfMS5vZjsgfSB9KTtcbnZhciBvbkVycm9yUmVzdW1lTmV4dF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9vbkVycm9yUmVzdW1lTmV4dFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm9uRXJyb3JSZXN1bWVOZXh0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBvbkVycm9yUmVzdW1lTmV4dF8xLm9uRXJyb3JSZXN1bWVOZXh0OyB9IH0pO1xudmFyIHBhaXJzXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3BhaXJzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicGFpcnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBhaXJzXzEucGFpcnM7IH0gfSk7XG52YXIgcGFydGl0aW9uXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3BhcnRpdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBhcnRpdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFydGl0aW9uXzEucGFydGl0aW9uOyB9IH0pO1xudmFyIHJhY2VfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvcmFjZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJhY2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJhY2VfMS5yYWNlOyB9IH0pO1xudmFyIHJhbmdlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3JhbmdlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmFuZ2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJhbmdlXzEucmFuZ2U7IH0gfSk7XG52YXIgdGhyb3dFcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGhyb3dFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhyb3dFcnJvcl8xLnRocm93RXJyb3I7IH0gfSk7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvdGltZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aW1lclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGltZXJfMS50aW1lcjsgfSB9KTtcbnZhciB1c2luZ18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS91c2luZ1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInVzaW5nXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB1c2luZ18xLnVzaW5nOyB9IH0pO1xudmFyIHppcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS96aXBcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ6aXBcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHppcF8xLnppcDsgfSB9KTtcbnZhciBzY2hlZHVsZWRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZWRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzY2hlZHVsZWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVkdWxlZF8xLnNjaGVkdWxlZDsgfSB9KTtcbnZhciBlbXB0eV8yID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9lbXB0eVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkVNUFRZXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbXB0eV8yLkVNUFRZOyB9IH0pO1xudmFyIG5ldmVyXzIgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL25ldmVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTkVWRVJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldmVyXzIuTkVWRVI7IH0gfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaW50ZXJuYWwvdHlwZXNcIiksIGV4cG9ydHMpO1xudmFyIGNvbmZpZ18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvY29uZmlnXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uZmlnXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWdfMS5jb25maWc7IH0gfSk7XG52YXIgYXVkaXRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9hdWRpdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImF1ZGl0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhdWRpdF8xLmF1ZGl0OyB9IH0pO1xudmFyIGF1ZGl0VGltZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2F1ZGl0VGltZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImF1ZGl0VGltZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXVkaXRUaW1lXzEuYXVkaXRUaW1lOyB9IH0pO1xudmFyIGJ1ZmZlcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2J1ZmZlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImJ1ZmZlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyXzEuYnVmZmVyOyB9IH0pO1xudmFyIGJ1ZmZlckNvdW50XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyQ291bnRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJidWZmZXJDb3VudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyQ291bnRfMS5idWZmZXJDb3VudDsgfSB9KTtcbnZhciBidWZmZXJUaW1lXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyVGltZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImJ1ZmZlclRpbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJ1ZmZlclRpbWVfMS5idWZmZXJUaW1lOyB9IH0pO1xudmFyIGJ1ZmZlclRvZ2dsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2J1ZmZlclRvZ2dsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImJ1ZmZlclRvZ2dsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyVG9nZ2xlXzEuYnVmZmVyVG9nZ2xlOyB9IH0pO1xudmFyIGJ1ZmZlcldoZW5fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXJXaGVuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYnVmZmVyV2hlblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyV2hlbl8xLmJ1ZmZlcldoZW47IH0gfSk7XG52YXIgY2F0Y2hFcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2NhdGNoRXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjYXRjaEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYXRjaEVycm9yXzEuY2F0Y2hFcnJvcjsgfSB9KTtcbnZhciBjb21iaW5lQWxsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvY29tYmluZUFsbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbWJpbmVBbGxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbWJpbmVBbGxfMS5jb21iaW5lQWxsOyB9IH0pO1xudmFyIGNvbWJpbmVMYXRlc3RBbGxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9jb21iaW5lTGF0ZXN0QWxsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29tYmluZUxhdGVzdEFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29tYmluZUxhdGVzdEFsbF8xLmNvbWJpbmVMYXRlc3RBbGw7IH0gfSk7XG52YXIgY29tYmluZUxhdGVzdFdpdGhfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9jb21iaW5lTGF0ZXN0V2l0aFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbWJpbmVMYXRlc3RXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb21iaW5lTGF0ZXN0V2l0aF8xLmNvbWJpbmVMYXRlc3RXaXRoOyB9IH0pO1xudmFyIGNvbmNhdEFsbF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdEFsbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbmNhdEFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uY2F0QWxsXzEuY29uY2F0QWxsOyB9IH0pO1xudmFyIGNvbmNhdE1hcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdE1hcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbmNhdE1hcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uY2F0TWFwXzEuY29uY2F0TWFwOyB9IH0pO1xudmFyIGNvbmNhdE1hcFRvXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0TWFwVG9cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjb25jYXRNYXBUb1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uY2F0TWFwVG9fMS5jb25jYXRNYXBUbzsgfSB9KTtcbnZhciBjb25jYXRXaXRoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0V2l0aFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbmNhdFdpdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbmNhdFdpdGhfMS5jb25jYXRXaXRoOyB9IH0pO1xudmFyIGNvbm5lY3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9jb25uZWN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29ubmVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29ubmVjdF8xLmNvbm5lY3Q7IH0gfSk7XG52YXIgY291bnRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9jb3VudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvdW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb3VudF8xLmNvdW50OyB9IH0pO1xudmFyIGRlYm91bmNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZGVib3VuY2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkZWJvdW5jZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVib3VuY2VfMS5kZWJvdW5jZTsgfSB9KTtcbnZhciBkZWJvdW5jZVRpbWVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9kZWJvdW5jZVRpbWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkZWJvdW5jZVRpbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlYm91bmNlVGltZV8xLmRlYm91bmNlVGltZTsgfSB9KTtcbnZhciBkZWZhdWx0SWZFbXB0eV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2RlZmF1bHRJZkVtcHR5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVmYXVsdElmRW1wdHlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlZmF1bHRJZkVtcHR5XzEuZGVmYXVsdElmRW1wdHk7IH0gfSk7XG52YXIgZGVsYXlfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9kZWxheVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlbGF5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWxheV8xLmRlbGF5OyB9IH0pO1xudmFyIGRlbGF5V2hlbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2RlbGF5V2hlblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlbGF5V2hlblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVsYXlXaGVuXzEuZGVsYXlXaGVuOyB9IH0pO1xudmFyIGRlbWF0ZXJpYWxpemVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9kZW1hdGVyaWFsaXplXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVtYXRlcmlhbGl6ZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVtYXRlcmlhbGl6ZV8xLmRlbWF0ZXJpYWxpemU7IH0gfSk7XG52YXIgZGlzdGluY3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9kaXN0aW5jdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRpc3RpbmN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkaXN0aW5jdF8xLmRpc3RpbmN0OyB9IH0pO1xudmFyIGRpc3RpbmN0VW50aWxDaGFuZ2VkXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZGlzdGluY3RVbnRpbENoYW5nZWRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkaXN0aW5jdFVudGlsQ2hhbmdlZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzdGluY3RVbnRpbENoYW5nZWRfMS5kaXN0aW5jdFVudGlsQ2hhbmdlZDsgfSB9KTtcbnZhciBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2Rpc3RpbmN0VW50aWxLZXlDaGFuZ2VkXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGlzdGluY3RVbnRpbEtleUNoYW5nZWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkXzEuZGlzdGluY3RVbnRpbEtleUNoYW5nZWQ7IH0gfSk7XG52YXIgZWxlbWVudEF0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZWxlbWVudEF0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZWxlbWVudEF0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtZW50QXRfMS5lbGVtZW50QXQ7IH0gfSk7XG52YXIgZW5kV2l0aF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2VuZFdpdGhcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJlbmRXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbmRXaXRoXzEuZW5kV2l0aDsgfSB9KTtcbnZhciBldmVyeV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2V2ZXJ5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZXZlcnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV2ZXJ5XzEuZXZlcnk7IH0gfSk7XG52YXIgZXhoYXVzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2V4aGF1c3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJleGhhdXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBleGhhdXN0XzEuZXhoYXVzdDsgfSB9KTtcbnZhciBleGhhdXN0QWxsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZXhoYXVzdEFsbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImV4aGF1c3RBbGxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV4aGF1c3RBbGxfMS5leGhhdXN0QWxsOyB9IH0pO1xudmFyIGV4aGF1c3RNYXBfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9leGhhdXN0TWFwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZXhoYXVzdE1hcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhoYXVzdE1hcF8xLmV4aGF1c3RNYXA7IH0gfSk7XG52YXIgZXhwYW5kXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZXhwYW5kXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZXhwYW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBleHBhbmRfMS5leHBhbmQ7IH0gfSk7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZmlsdGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmlsdGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmaWx0ZXJfMS5maWx0ZXI7IH0gfSk7XG52YXIgZmluYWxpemVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9maW5hbGl6ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZpbmFsaXplXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmaW5hbGl6ZV8xLmZpbmFsaXplOyB9IH0pO1xudmFyIGZpbmRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9maW5kXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmluZFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmluZF8xLmZpbmQ7IH0gfSk7XG52YXIgZmluZEluZGV4XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZmluZEluZGV4XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmluZEluZGV4XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmaW5kSW5kZXhfMS5maW5kSW5kZXg7IH0gfSk7XG52YXIgZmlyc3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9maXJzdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZpcnN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmaXJzdF8xLmZpcnN0OyB9IH0pO1xudmFyIGdyb3VwQnlfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9ncm91cEJ5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ3JvdXBCeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ3JvdXBCeV8xLmdyb3VwQnk7IH0gfSk7XG52YXIgaWdub3JlRWxlbWVudHNfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9pZ25vcmVFbGVtZW50c1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlnbm9yZUVsZW1lbnRzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpZ25vcmVFbGVtZW50c18xLmlnbm9yZUVsZW1lbnRzOyB9IH0pO1xudmFyIGlzRW1wdHlfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9pc0VtcHR5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaXNFbXB0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNFbXB0eV8xLmlzRW1wdHk7IH0gfSk7XG52YXIgbGFzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL2xhc3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJsYXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBsYXN0XzEubGFzdDsgfSB9KTtcbnZhciBtYXBfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9tYXBcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYXBcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hcF8xLm1hcDsgfSB9KTtcbnZhciBtYXBUb18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL21hcFRvXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFwVG9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hcFRvXzEubWFwVG87IH0gfSk7XG52YXIgbWF0ZXJpYWxpemVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9tYXRlcmlhbGl6ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1hdGVyaWFsaXplXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRlcmlhbGl6ZV8xLm1hdGVyaWFsaXplOyB9IH0pO1xudmFyIG1heF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL21heFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1heFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWF4XzEubWF4OyB9IH0pO1xudmFyIG1lcmdlQWxsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VBbGxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtZXJnZUFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVyZ2VBbGxfMS5tZXJnZUFsbDsgfSB9KTtcbnZhciBmbGF0TWFwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvZmxhdE1hcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZsYXRNYXBcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZsYXRNYXBfMS5mbGF0TWFwOyB9IH0pO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VNYXBcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtZXJnZU1hcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVyZ2VNYXBfMS5tZXJnZU1hcDsgfSB9KTtcbnZhciBtZXJnZU1hcFRvXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VNYXBUb1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1lcmdlTWFwVG9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lcmdlTWFwVG9fMS5tZXJnZU1hcFRvOyB9IH0pO1xudmFyIG1lcmdlU2Nhbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlU2NhblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1lcmdlU2NhblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVyZ2VTY2FuXzEubWVyZ2VTY2FuOyB9IH0pO1xudmFyIG1lcmdlV2l0aF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlV2l0aFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1lcmdlV2l0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVyZ2VXaXRoXzEubWVyZ2VXaXRoOyB9IH0pO1xudmFyIG1pbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL21pblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1pblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWluXzEubWluOyB9IH0pO1xudmFyIG11bHRpY2FzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL211bHRpY2FzdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm11bHRpY2FzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbXVsdGljYXN0XzEubXVsdGljYXN0OyB9IH0pO1xudmFyIG9ic2VydmVPbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL29ic2VydmVPblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm9ic2VydmVPblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZU9uXzEub2JzZXJ2ZU9uOyB9IH0pO1xudmFyIG9uRXJyb3JSZXN1bWVOZXh0V2l0aF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL29uRXJyb3JSZXN1bWVOZXh0V2l0aFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm9uRXJyb3JSZXN1bWVOZXh0V2l0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gb25FcnJvclJlc3VtZU5leHRXaXRoXzEub25FcnJvclJlc3VtZU5leHRXaXRoOyB9IH0pO1xudmFyIHBhaXJ3aXNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcGFpcndpc2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYWlyd2lzZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFpcndpc2VfMS5wYWlyd2lzZTsgfSB9KTtcbnZhciBwbHVja18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3BsdWNrXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicGx1Y2tcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBsdWNrXzEucGx1Y2s7IH0gfSk7XG52YXIgcHVibGlzaF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwdWJsaXNoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwdWJsaXNoXzEucHVibGlzaDsgfSB9KTtcbnZhciBwdWJsaXNoQmVoYXZpb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9wdWJsaXNoQmVoYXZpb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwdWJsaXNoQmVoYXZpb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHB1Ymxpc2hCZWhhdmlvcl8xLnB1Ymxpc2hCZWhhdmlvcjsgfSB9KTtcbnZhciBwdWJsaXNoTGFzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hMYXN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicHVibGlzaExhc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHB1Ymxpc2hMYXN0XzEucHVibGlzaExhc3Q7IH0gfSk7XG52YXIgcHVibGlzaFJlcGxheV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3B1Ymxpc2hSZXBsYXlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwdWJsaXNoUmVwbGF5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwdWJsaXNoUmVwbGF5XzEucHVibGlzaFJlcGxheTsgfSB9KTtcbnZhciByYWNlV2l0aF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3JhY2VXaXRoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmFjZVdpdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJhY2VXaXRoXzEucmFjZVdpdGg7IH0gfSk7XG52YXIgcmVkdWNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcmVkdWNlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVkdWNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWR1Y2VfMS5yZWR1Y2U7IH0gfSk7XG52YXIgcmVwZWF0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcmVwZWF0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVwZWF0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZXBlYXRfMS5yZXBlYXQ7IH0gfSk7XG52YXIgcmVwZWF0V2hlbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3JlcGVhdFdoZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZXBlYXRXaGVuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZXBlYXRXaGVuXzEucmVwZWF0V2hlbjsgfSB9KTtcbnZhciByZXRyeV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3JldHJ5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmV0cnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJldHJ5XzEucmV0cnk7IH0gfSk7XG52YXIgcmV0cnlXaGVuXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvcmV0cnlXaGVuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmV0cnlXaGVuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZXRyeVdoZW5fMS5yZXRyeVdoZW47IH0gfSk7XG52YXIgcmVmQ291bnRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9yZWZDb3VudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJlZkNvdW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWZDb3VudF8xLnJlZkNvdW50OyB9IH0pO1xudmFyIHNhbXBsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3NhbXBsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNhbXBsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2FtcGxlXzEuc2FtcGxlOyB9IH0pO1xudmFyIHNhbXBsZVRpbWVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zYW1wbGVUaW1lXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2FtcGxlVGltZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2FtcGxlVGltZV8xLnNhbXBsZVRpbWU7IH0gfSk7XG52YXIgc2Nhbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3NjYW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzY2FuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2FuXzEuc2NhbjsgfSB9KTtcbnZhciBzZXF1ZW5jZUVxdWFsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2VxdWVuY2VFcXVhbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNlcXVlbmNlRXF1YWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcXVlbmNlRXF1YWxfMS5zZXF1ZW5jZUVxdWFsOyB9IH0pO1xudmFyIHNoYXJlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2hhcmVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaGFyZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2hhcmVfMS5zaGFyZTsgfSB9KTtcbnZhciBzaGFyZVJlcGxheV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3NoYXJlUmVwbGF5XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2hhcmVSZXBsYXlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNoYXJlUmVwbGF5XzEuc2hhcmVSZXBsYXk7IH0gfSk7XG52YXIgc2luZ2xlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2luZ2xlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2luZ2xlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzaW5nbGVfMS5zaW5nbGU7IH0gfSk7XG52YXIgc2tpcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3NraXBcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJza2lwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBza2lwXzEuc2tpcDsgfSB9KTtcbnZhciBza2lwTGFzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3NraXBMYXN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2tpcExhc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNraXBMYXN0XzEuc2tpcExhc3Q7IH0gfSk7XG52YXIgc2tpcFVudGlsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcFVudGlsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2tpcFVudGlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBza2lwVW50aWxfMS5za2lwVW50aWw7IH0gfSk7XG52YXIgc2tpcFdoaWxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc2tpcFdoaWxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2tpcFdoaWxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBza2lwV2hpbGVfMS5za2lwV2hpbGU7IH0gfSk7XG52YXIgc3RhcnRXaXRoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc3RhcnRXaXRoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RhcnRXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdGFydFdpdGhfMS5zdGFydFdpdGg7IH0gfSk7XG52YXIgc3Vic2NyaWJlT25fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy9zdWJzY3JpYmVPblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN1YnNjcmliZU9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVPbl8xLnN1YnNjcmliZU9uOyB9IH0pO1xudmFyIHN3aXRjaEFsbF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaEFsbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN3aXRjaEFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3dpdGNoQWxsXzEuc3dpdGNoQWxsOyB9IH0pO1xudmFyIHN3aXRjaE1hcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaE1hcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN3aXRjaE1hcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3dpdGNoTWFwXzEuc3dpdGNoTWFwOyB9IH0pO1xudmFyIHN3aXRjaE1hcFRvXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoTWFwVG9cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzd2l0Y2hNYXBUb1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3dpdGNoTWFwVG9fMS5zd2l0Y2hNYXBUbzsgfSB9KTtcbnZhciBzd2l0Y2hTY2FuXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoU2NhblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN3aXRjaFNjYW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN3aXRjaFNjYW5fMS5zd2l0Y2hTY2FuOyB9IH0pO1xudmFyIHRha2VfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90YWtlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGFrZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFrZV8xLnRha2U7IH0gfSk7XG52YXIgdGFrZUxhc3RfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90YWtlTGFzdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRha2VMYXN0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWtlTGFzdF8xLnRha2VMYXN0OyB9IH0pO1xudmFyIHRha2VVbnRpbF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3Rha2VVbnRpbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRha2VVbnRpbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFrZVVudGlsXzEudGFrZVVudGlsOyB9IH0pO1xudmFyIHRha2VXaGlsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3Rha2VXaGlsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRha2VXaGlsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFrZVdoaWxlXzEudGFrZVdoaWxlOyB9IH0pO1xudmFyIHRhcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3RhcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRhcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFwXzEudGFwOyB9IH0pO1xudmFyIHRocm90dGxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdGhyb3R0bGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aHJvdHRsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhyb3R0bGVfMS50aHJvdHRsZTsgfSB9KTtcbnZhciB0aHJvdHRsZVRpbWVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aHJvdHRsZVRpbWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aHJvdHRsZVRpbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRocm90dGxlVGltZV8xLnRocm90dGxlVGltZTsgfSB9KTtcbnZhciB0aHJvd0lmRW1wdHlfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aHJvd0lmRW1wdHlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aHJvd0lmRW1wdHlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRocm93SWZFbXB0eV8xLnRocm93SWZFbXB0eTsgfSB9KTtcbnZhciB0aW1lSW50ZXJ2YWxfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aW1lSW50ZXJ2YWxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aW1lSW50ZXJ2YWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRpbWVJbnRlcnZhbF8xLnRpbWVJbnRlcnZhbDsgfSB9KTtcbnZhciB0aW1lb3V0XzIgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdGltZW91dFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRpbWVvdXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRpbWVvdXRfMi50aW1lb3V0OyB9IH0pO1xudmFyIHRpbWVvdXRXaXRoXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdGltZW91dFdpdGhcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aW1lb3V0V2l0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGltZW91dFdpdGhfMS50aW1lb3V0V2l0aDsgfSB9KTtcbnZhciB0aW1lc3RhbXBfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy90aW1lc3RhbXBcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ0aW1lc3RhbXBcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRpbWVzdGFtcF8xLnRpbWVzdGFtcDsgfSB9KTtcbnZhciB0b0FycmF5XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdG9BcnJheVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRvQXJyYXlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRvQXJyYXlfMS50b0FycmF5OyB9IH0pO1xudmFyIHdpbmRvd18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3dpbmRvd1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpbmRvd1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93XzEud2luZG93OyB9IH0pO1xudmFyIHdpbmRvd0NvdW50XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvd2luZG93Q291bnRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aW5kb3dDb3VudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93Q291bnRfMS53aW5kb3dDb3VudDsgfSB9KTtcbnZhciB3aW5kb3dUaW1lXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvd2luZG93VGltZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpbmRvd1RpbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvd1RpbWVfMS53aW5kb3dUaW1lOyB9IH0pO1xudmFyIHdpbmRvd1RvZ2dsZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3dpbmRvd1RvZ2dsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpbmRvd1RvZ2dsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93VG9nZ2xlXzEud2luZG93VG9nZ2xlOyB9IH0pO1xudmFyIHdpbmRvd1doZW5fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dXaGVuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2luZG93V2hlblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93V2hlbl8xLndpbmRvd1doZW47IH0gfSk7XG52YXIgd2l0aExhdGVzdEZyb21fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy93aXRoTGF0ZXN0RnJvbVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpdGhMYXRlc3RGcm9tXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB3aXRoTGF0ZXN0RnJvbV8xLndpdGhMYXRlc3RGcm9tOyB9IH0pO1xudmFyIHppcEFsbF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb3BlcmF0b3JzL3ppcEFsbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInppcEFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gemlwQWxsXzEuemlwQWxsOyB9IH0pO1xudmFyIHppcFdpdGhfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29wZXJhdG9ycy96aXBXaXRoXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiemlwV2l0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gemlwV2l0aF8xLnppcFdpdGg7IH0gfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFzeW5jU3ViamVjdCA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9TdWJqZWN0XCIpO1xudmFyIEFzeW5jU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzeW5jU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY1N1YmplY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgICAgICBfdGhpcy5faGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuX2lzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc3luY1N1YmplY3QucHJvdG90eXBlLl9jaGVja0ZpbmFsaXplZFN0YXR1c2VzID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgX2hhc1ZhbHVlID0gX2EuX2hhc1ZhbHVlLCBfdmFsdWUgPSBfYS5fdmFsdWUsIHRocm93bkVycm9yID0gX2EudGhyb3duRXJyb3IsIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZCwgX2lzQ29tcGxldGUgPSBfYS5faXNDb21wbGV0ZTtcbiAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHRocm93bkVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1N0b3BwZWQgfHwgX2lzQ29tcGxldGUpIHtcbiAgICAgICAgICAgIF9oYXNWYWx1ZSAmJiBzdWJzY3JpYmVyLm5leHQoX3ZhbHVlKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXN5bmNTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9oYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9oYXNWYWx1ZSA9IF9hLl9oYXNWYWx1ZSwgX3ZhbHVlID0gX2EuX3ZhbHVlLCBfaXNDb21wbGV0ZSA9IF9hLl9pc0NvbXBsZXRlO1xuICAgICAgICBpZiAoIV9pc0NvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIF9oYXNWYWx1ZSAmJiBfc3VwZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzLCBfdmFsdWUpO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb21wbGV0ZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNTdWJqZWN0O1xufShTdWJqZWN0XzEuU3ViamVjdCkpO1xuZXhwb3J0cy5Bc3luY1N1YmplY3QgPSBBc3luY1N1YmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bc3luY1N1YmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CZWhhdmlvclN1YmplY3QgPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4vU3ViamVjdFwiKTtcbnZhciBCZWhhdmlvclN1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCZWhhdmlvclN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQmVoYXZpb3JTdWJqZWN0KF92YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gX3N1cGVyLnByb3RvdHlwZS5fc3Vic2NyaWJlLmNhbGwodGhpcywgc3Vic2NyaWJlcik7XG4gICAgICAgICFzdWJzY3JpcHRpb24uY2xvc2VkICYmIHN1YnNjcmliZXIubmV4dCh0aGlzLl92YWx1ZSk7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCB0aHJvd25FcnJvciA9IF9hLnRocm93bkVycm9yLCBfdmFsdWUgPSBfYS5fdmFsdWU7XG4gICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgdGhyb3duRXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgIH07XG4gICAgQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMsICh0aGlzLl92YWx1ZSA9IHZhbHVlKSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmVoYXZpb3JTdWJqZWN0O1xufShTdWJqZWN0XzEuU3ViamVjdCkpO1xuZXhwb3J0cy5CZWhhdmlvclN1YmplY3QgPSBCZWhhdmlvclN1YmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CZWhhdmlvclN1YmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9ic2VydmVOb3RpZmljYXRpb24gPSBleHBvcnRzLk5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuTm90aWZpY2F0aW9uS2luZCA9IHZvaWQgMDtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vb2JzZXJ2YWJsZS9lbXB0eVwiKTtcbnZhciBvZl8xID0gcmVxdWlyZShcIi4vb2JzZXJ2YWJsZS9vZlwiKTtcbnZhciB0aHJvd0Vycm9yXzEgPSByZXF1aXJlKFwiLi9vYnNlcnZhYmxlL3Rocm93RXJyb3JcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIE5vdGlmaWNhdGlvbktpbmQ7XG4oZnVuY3Rpb24gKE5vdGlmaWNhdGlvbktpbmQpIHtcbiAgICBOb3RpZmljYXRpb25LaW5kW1wiTkVYVFwiXSA9IFwiTlwiO1xuICAgIE5vdGlmaWNhdGlvbktpbmRbXCJFUlJPUlwiXSA9IFwiRVwiO1xuICAgIE5vdGlmaWNhdGlvbktpbmRbXCJDT01QTEVURVwiXSA9IFwiQ1wiO1xufSkoTm90aWZpY2F0aW9uS2luZCA9IGV4cG9ydHMuTm90aWZpY2F0aW9uS2luZCB8fCAoZXhwb3J0cy5Ob3RpZmljYXRpb25LaW5kID0ge30pKTtcbnZhciBOb3RpZmljYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICAgICAgdGhpcy5raW5kID0ga2luZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuaGFzVmFsdWUgPSBraW5kID09PSAnTic7XG4gICAgfVxuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gb2JzZXJ2ZU5vdGlmaWNhdGlvbih0aGlzLCBvYnNlcnZlcik7XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24ucHJvdG90eXBlLmRvID0gZnVuY3Rpb24gKG5leHRIYW5kbGVyLCBlcnJvckhhbmRsZXIsIGNvbXBsZXRlSGFuZGxlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBraW5kID0gX2Eua2luZCwgdmFsdWUgPSBfYS52YWx1ZSwgZXJyb3IgPSBfYS5lcnJvcjtcbiAgICAgICAgcmV0dXJuIGtpbmQgPT09ICdOJyA/IG5leHRIYW5kbGVyID09PSBudWxsIHx8IG5leHRIYW5kbGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0SGFuZGxlcih2YWx1ZSkgOiBraW5kID09PSAnRScgPyBlcnJvckhhbmRsZXIgPT09IG51bGwgfHwgZXJyb3JIYW5kbGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvckhhbmRsZXIoZXJyb3IpIDogY29tcGxldGVIYW5kbGVyID09PSBudWxsIHx8IGNvbXBsZXRlSGFuZGxlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29tcGxldGVIYW5kbGVyKCk7XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24ucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uIChuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKChfYSA9IG5leHRPck9ic2VydmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV4dClcbiAgICAgICAgICAgID8gdGhpcy5vYnNlcnZlKG5leHRPck9ic2VydmVyKVxuICAgICAgICAgICAgOiB0aGlzLmRvKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpO1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGtpbmQgPSBfYS5raW5kLCB2YWx1ZSA9IF9hLnZhbHVlLCBlcnJvciA9IF9hLmVycm9yO1xuICAgICAgICB2YXIgcmVzdWx0ID0ga2luZCA9PT0gJ04nXG4gICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgb2ZfMS5vZih2YWx1ZSlcbiAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICBraW5kID09PSAnRSdcbiAgICAgICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dFcnJvcl8xLnRocm93RXJyb3IoZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3I7IH0pXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPT09ICdDJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlfMS5FTVBUWVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIG5vdGlmaWNhdGlvbiBraW5kIFwiICsga2luZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jcmVhdGVOZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKCdOJywgdmFsdWUpO1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLmNyZWF0ZUVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWNhdGlvbignRScsIHVuZGVmaW5lZCwgZXJyKTtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE5vdGlmaWNhdGlvbi5jb21wbGV0ZU5vdGlmaWNhdGlvbjtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jb21wbGV0ZU5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24oJ0MnKTtcbiAgICByZXR1cm4gTm90aWZpY2F0aW9uO1xufSgpKTtcbmV4cG9ydHMuTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uO1xuZnVuY3Rpb24gb2JzZXJ2ZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIG9ic2VydmVyKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgdmFyIF9kID0gbm90aWZpY2F0aW9uLCBraW5kID0gX2Qua2luZCwgdmFsdWUgPSBfZC52YWx1ZSwgZXJyb3IgPSBfZC5lcnJvcjtcbiAgICBpZiAodHlwZW9mIGtpbmQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbm90aWZpY2F0aW9uLCBtaXNzaW5nIFwia2luZFwiJyk7XG4gICAgfVxuICAgIGtpbmQgPT09ICdOJyA/IChfYSA9IG9ic2VydmVyLm5leHQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKG9ic2VydmVyLCB2YWx1ZSkgOiBraW5kID09PSAnRScgPyAoX2IgPSBvYnNlcnZlci5lcnJvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwob2JzZXJ2ZXIsIGVycm9yKSA6IChfYyA9IG9ic2VydmVyLmNvbXBsZXRlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2FsbChvYnNlcnZlcik7XG59XG5leHBvcnRzLm9ic2VydmVOb3RpZmljYXRpb24gPSBvYnNlcnZlTm90aWZpY2F0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVOb3RpZmljYXRpb24gPSBleHBvcnRzLm5leHROb3RpZmljYXRpb24gPSBleHBvcnRzLmVycm9yTm90aWZpY2F0aW9uID0gZXhwb3J0cy5DT01QTEVURV9OT1RJRklDQVRJT04gPSB2b2lkIDA7XG5leHBvcnRzLkNPTVBMRVRFX05PVElGSUNBVElPTiA9IChmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0MnLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7IH0pKCk7XG5mdW5jdGlvbiBlcnJvck5vdGlmaWNhdGlvbihlcnJvcikge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0UnLCB1bmRlZmluZWQsIGVycm9yKTtcbn1cbmV4cG9ydHMuZXJyb3JOb3RpZmljYXRpb24gPSBlcnJvck5vdGlmaWNhdGlvbjtcbmZ1bmN0aW9uIG5leHROb3RpZmljYXRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gY3JlYXRlTm90aWZpY2F0aW9uKCdOJywgdmFsdWUsIHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLm5leHROb3RpZmljYXRpb24gPSBuZXh0Tm90aWZpY2F0aW9uO1xuZnVuY3Rpb24gY3JlYXRlTm90aWZpY2F0aW9uKGtpbmQsIHZhbHVlLCBlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH07XG59XG5leHBvcnRzLmNyZWF0ZU5vdGlmaWNhdGlvbiA9IGNyZWF0ZU5vdGlmaWNhdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdGlmaWNhdGlvbkZhY3Rvcmllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9TdWJzY3JpYmVyXCIpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL3N5bWJvbC9vYnNlcnZhYmxlXCIpO1xudmFyIHBpcGVfMSA9IHJlcXVpcmUoXCIuL3V0aWwvcGlwZVwiKTtcbnZhciBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgZXJyb3JDb250ZXh0XzEgPSByZXF1aXJlKFwiLi91dGlsL2Vycm9yQ29udGV4dFwiKTtcbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gaXNTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0KSA/IG9ic2VydmVyT3JOZXh0IDogbmV3IFN1YnNjcmliZXJfMS5TYWZlU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgZXJyb3JDb250ZXh0XzEuZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IF90aGlzLCBvcGVyYXRvciA9IF9hLm9wZXJhdG9yLCBzb3VyY2UgPSBfYS5zb3VyY2U7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChvcGVyYXRvclxuICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IuY2FsbChzdWJzY3JpYmVyLCBzb3VyY2UpXG4gICAgICAgICAgICAgICAgOiBzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N1YnNjcmliZShzdWJzY3JpYmVyKVxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdHJ5U3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNpbmsuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChuZXh0LCBwcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBwcm9taXNlQ3RvciA9IGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKTtcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyXzEuU2FmZVN1YnNjcmliZXIoe1xuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiByZWplY3QsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IHJlc29sdmUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5zb3VyY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZVtvYnNlcnZhYmxlXzEub2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGlwZV8xLnBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiAodmFsdWUgPSB4KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gcmVqZWN0KGVycik7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUodmFsdWUpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnRzLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuZnVuY3Rpb24gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChfYSA9IHByb21pc2VDdG9yICE9PSBudWxsICYmIHByb21pc2VDdG9yICE9PSB2b2lkIDAgPyBwcm9taXNlQ3RvciA6IGNvbmZpZ18xLmNvbmZpZy5Qcm9taXNlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBQcm9taXNlO1xufVxuZnVuY3Rpb24gaXNPYnNlcnZlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih2YWx1ZS5uZXh0KSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih2YWx1ZS5lcnJvcikgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUuY29tcGxldGUpO1xufVxuZnVuY3Rpb24gaXNTdWJzY3JpYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSB8fCAoaXNPYnNlcnZlcih2YWx1ZSkgJiYgU3Vic2NyaXB0aW9uXzEuaXNTdWJzY3JpcHRpb24odmFsdWUpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5SZXBsYXlTdWJqZWN0ID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL1N1YmplY3RcIik7XG52YXIgZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXCIpO1xudmFyIFJlcGxheVN1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZXBsYXlTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJlcGxheVN1YmplY3QoX2J1ZmZlclNpemUsIF93aW5kb3dUaW1lLCBfdGltZXN0YW1wUHJvdmlkZXIpIHtcbiAgICAgICAgaWYgKF9idWZmZXJTaXplID09PSB2b2lkIDApIHsgX2J1ZmZlclNpemUgPSBJbmZpbml0eTsgfVxuICAgICAgICBpZiAoX3dpbmRvd1RpbWUgPT09IHZvaWQgMCkgeyBfd2luZG93VGltZSA9IEluZmluaXR5OyB9XG4gICAgICAgIGlmIChfdGltZXN0YW1wUHJvdmlkZXIgPT09IHZvaWQgMCkgeyBfdGltZXN0YW1wUHJvdmlkZXIgPSBkYXRlVGltZXN0YW1wUHJvdmlkZXJfMS5kYXRlVGltZXN0YW1wUHJvdmlkZXI7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX2J1ZmZlclNpemUgPSBfYnVmZmVyU2l6ZTtcbiAgICAgICAgX3RoaXMuX3dpbmRvd1RpbWUgPSBfd2luZG93VGltZTtcbiAgICAgICAgX3RoaXMuX3RpbWVzdGFtcFByb3ZpZGVyID0gX3RpbWVzdGFtcFByb3ZpZGVyO1xuICAgICAgICBfdGhpcy5fYnVmZmVyID0gW107XG4gICAgICAgIF90aGlzLl9pbmZpbml0ZVRpbWVXaW5kb3cgPSB0cnVlO1xuICAgICAgICBfdGhpcy5faW5maW5pdGVUaW1lV2luZG93ID0gX3dpbmRvd1RpbWUgPT09IEluZmluaXR5O1xuICAgICAgICBfdGhpcy5fYnVmZmVyU2l6ZSA9IE1hdGgubWF4KDEsIF9idWZmZXJTaXplKTtcbiAgICAgICAgX3RoaXMuX3dpbmRvd1RpbWUgPSBNYXRoLm1heCgxLCBfd2luZG93VGltZSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUmVwbGF5U3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQsIF9idWZmZXIgPSBfYS5fYnVmZmVyLCBfaW5maW5pdGVUaW1lV2luZG93ID0gX2EuX2luZmluaXRlVGltZVdpbmRvdywgX3RpbWVzdGFtcFByb3ZpZGVyID0gX2EuX3RpbWVzdGFtcFByb3ZpZGVyLCBfd2luZG93VGltZSA9IF9hLl93aW5kb3dUaW1lO1xuICAgICAgICBpZiAoIWlzU3RvcHBlZCkge1xuICAgICAgICAgICAgX2J1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICFfaW5maW5pdGVUaW1lV2luZG93ICYmIF9idWZmZXIucHVzaChfdGltZXN0YW1wUHJvdmlkZXIubm93KCkgKyBfd2luZG93VGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdHJpbUJ1ZmZlcigpO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBSZXBsYXlTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICB0aGlzLl90cmltQnVmZmVyKCk7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLl9pbm5lclN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX2luZmluaXRlVGltZVdpbmRvdyA9IF9hLl9pbmZpbml0ZVRpbWVXaW5kb3csIF9idWZmZXIgPSBfYS5fYnVmZmVyO1xuICAgICAgICB2YXIgY29weSA9IF9idWZmZXIuc2xpY2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3B5Lmxlbmd0aCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkgKz0gX2luZmluaXRlVGltZVdpbmRvdyA/IDEgOiAyKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoY29weVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyhzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuICAgIFJlcGxheVN1YmplY3QucHJvdG90eXBlLl90cmltQnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfYnVmZmVyU2l6ZSA9IF9hLl9idWZmZXJTaXplLCBfdGltZXN0YW1wUHJvdmlkZXIgPSBfYS5fdGltZXN0YW1wUHJvdmlkZXIsIF9idWZmZXIgPSBfYS5fYnVmZmVyLCBfaW5maW5pdGVUaW1lV2luZG93ID0gX2EuX2luZmluaXRlVGltZVdpbmRvdztcbiAgICAgICAgdmFyIGFkanVzdGVkQnVmZmVyU2l6ZSA9IChfaW5maW5pdGVUaW1lV2luZG93ID8gMSA6IDIpICogX2J1ZmZlclNpemU7XG4gICAgICAgIF9idWZmZXJTaXplIDwgSW5maW5pdHkgJiYgYWRqdXN0ZWRCdWZmZXJTaXplIDwgX2J1ZmZlci5sZW5ndGggJiYgX2J1ZmZlci5zcGxpY2UoMCwgX2J1ZmZlci5sZW5ndGggLSBhZGp1c3RlZEJ1ZmZlclNpemUpO1xuICAgICAgICBpZiAoIV9pbmZpbml0ZVRpbWVXaW5kb3cpIHtcbiAgICAgICAgICAgIHZhciBub3cgPSBfdGltZXN0YW1wUHJvdmlkZXIubm93KCk7XG4gICAgICAgICAgICB2YXIgbGFzdCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IF9idWZmZXIubGVuZ3RoICYmIF9idWZmZXJbaV0gPD0gbm93OyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICBsYXN0ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3QgJiYgX2J1ZmZlci5zcGxpY2UoMCwgbGFzdCArIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gUmVwbGF5U3ViamVjdDtcbn0oU3ViamVjdF8xLlN1YmplY3QpKTtcbmV4cG9ydHMuUmVwbGF5U3ViamVjdCA9IFJlcGxheVN1YmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZXBsYXlTdWJqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXCIpO1xudmFyIFNjaGVkdWxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2NoZWR1bGVyKHNjaGVkdWxlckFjdGlvbkN0b3IsIG5vdykge1xuICAgICAgICBpZiAobm93ID09PSB2b2lkIDApIHsgbm93ID0gU2NoZWR1bGVyLm5vdzsgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlckFjdGlvbkN0b3IgPSBzY2hlZHVsZXJBY3Rpb25DdG9yO1xuICAgICAgICB0aGlzLm5vdyA9IG5vdztcbiAgICB9XG4gICAgU2NoZWR1bGVyLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uICh3b3JrLCBkZWxheSwgc3RhdGUpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5zY2hlZHVsZXJBY3Rpb25DdG9yKHRoaXMsIHdvcmspLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gICAgfTtcbiAgICBTY2hlZHVsZXIubm93ID0gZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXzEuZGF0ZVRpbWVzdGFtcFByb3ZpZGVyLm5vdztcbiAgICByZXR1cm4gU2NoZWR1bGVyO1xufSgpKTtcbmV4cG9ydHMuU2NoZWR1bGVyID0gU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQW5vbnltb3VzU3ViamVjdCA9IGV4cG9ydHMuU3ViamVjdCA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlXCIpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEgPSByZXF1aXJlKFwiLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yXCIpO1xudmFyIGFyclJlbW92ZV8xID0gcmVxdWlyZShcIi4vdXRpbC9hcnJSZW1vdmVcIik7XG52YXIgZXJyb3JDb250ZXh0XzEgPSByZXF1aXJlKFwiLi91dGlsL2Vycm9yQ29udGV4dFwiKTtcbnZhciBTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmVycyA9IG51bGw7XG4gICAgICAgIF90aGlzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMudGhyb3duRXJyb3IgPSBudWxsO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1YmplY3QucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQW5vbnltb3VzU3ViamVjdCh0aGlzLCB0aGlzKTtcbiAgICAgICAgc3ViamVjdC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl90aHJvd0lmQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXJyb3JDb250ZXh0XzEuZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAgICAgX3RoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBBcnJheS5mcm9tKF90aGlzLm9ic2VydmVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoX3RoaXMuY3VycmVudE9ic2VydmVycyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBlcnJvckNvbnRleHRfMS5lcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGFzRXJyb3IgPSBfdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF90aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSBfdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNoaWZ0KCkuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGVycm9yQ29udGV4dF8xLmVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSBfdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNoaWZ0KCkuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IHRoaXMuY3VycmVudE9ic2VydmVycyA9IG51bGw7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3ViamVjdC5wcm90b3R5cGUsIFwib2JzZXJ2ZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiAoKF9hID0gdGhpcy5vYnNlcnZlcnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpID4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFN1YmplY3QucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLl90cnlTdWJzY3JpYmUuY2FsbCh0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIHRoaXMuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMoc3Vic2NyaWJlcik7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lclN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl9pbm5lclN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGhhc0Vycm9yID0gX2EuaGFzRXJyb3IsIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZCwgb2JzZXJ2ZXJzID0gX2Eub2JzZXJ2ZXJzO1xuICAgICAgICBpZiAoaGFzRXJyb3IgfHwgaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uXzEuRU1QVFlfU1VCU0NSSVBUSU9OO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudE9ic2VydmVycyA9IG51bGw7XG4gICAgICAgIG9ic2VydmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgICAgIGFyclJlbW92ZV8xLmFyclJlbW92ZShvYnNlcnZlcnMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl9jaGVja0ZpbmFsaXplZFN0YXR1c2VzID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgdGhyb3duRXJyb3IgPSBfYS50aHJvd25FcnJvciwgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkO1xuICAgICAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhyb3duRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU3RvcHBlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5hc09ic2VydmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKTtcbiAgICB9O1xuICAgIHJldHVybiBTdWJqZWN0O1xufShPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkpO1xuZXhwb3J0cy5TdWJqZWN0ID0gU3ViamVjdDtcbnZhciBBbm9ueW1vdXNTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQW5vbnltb3VzU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgX3RoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5kZXN0aW5hdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5leHQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5kZXN0aW5hdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmVycm9yKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgZXJyKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29tcGxldGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gKF9iID0gKF9hID0gdGhpcy5zb3VyY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJzY3JpYmUoc3Vic2NyaWJlcikpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFN1YnNjcmlwdGlvbl8xLkVNUFRZX1NVQlNDUklQVElPTjtcbiAgICB9O1xuICAgIHJldHVybiBBbm9ueW1vdXNTdWJqZWN0O1xufShTdWJqZWN0KSk7XG5leHBvcnRzLkFub255bW91c1N1YmplY3QgPSBBbm9ueW1vdXNTdWJqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3ViamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVNUFRZX09CU0VSVkVSID0gZXhwb3J0cy5TYWZlU3Vic2NyaWJlciA9IGV4cG9ydHMuU3Vic2NyaWJlciA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi9TdWJzY3JpcHRpb25cIik7XG52YXIgY29uZmlnXzEgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG52YXIgcmVwb3J0VW5oYW5kbGVkRXJyb3JfMSA9IHJlcXVpcmUoXCIuL3V0aWwvcmVwb3J0VW5oYW5kbGVkRXJyb3JcIik7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4vdXRpbC9ub29wXCIpO1xudmFyIE5vdGlmaWNhdGlvbkZhY3Rvcmllc18xID0gcmVxdWlyZShcIi4vTm90aWZpY2F0aW9uRmFjdG9yaWVzXCIpO1xudmFyIHRpbWVvdXRQcm92aWRlcl8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlclwiKTtcbnZhciBlcnJvckNvbnRleHRfMSA9IHJlcXVpcmUoXCIuL3V0aWwvZXJyb3JDb250ZXh0XCIpO1xudmFyIFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIGlmIChTdWJzY3JpcHRpb25fMS5pc1N1YnNjcmlwdGlvbihkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBleHBvcnRzLkVNUFRZX09CU0VSVkVSO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2FmZVN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbkZhY3Rvcmllc18xLm5leHROb3RpZmljYXRpb24odmFsdWUpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbkZhY3Rvcmllc18xLmVycm9yTm90aWZpY2F0aW9uKGVyciksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25GYWN0b3JpZXNfMS5DT01QTEVURV9OT1RJRklDQVRJT04sIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTdWJzY3JpYmVyO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuU3Vic2NyaWJlciA9IFN1YnNjcmliZXI7XG52YXIgX2JpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZDtcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gX2JpbmQuY2FsbChmbiwgdGhpc0FyZyk7XG59XG52YXIgQ29uc3VtZXJPYnNlcnZlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5wYXJ0aWFsT2JzZXJ2ZXIgPSBwYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgfVxuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLmVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnN1bWVyT2JzZXJ2ZXI7XG59KCkpO1xudmFyIFNhZmVTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2FmZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2FmZVN1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpIHx8ICFvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgIG5leHQ6IChvYnNlcnZlck9yTmV4dCAhPT0gbnVsbCAmJiBvYnNlcnZlck9yTmV4dCAhPT0gdm9pZCAwID8gb2JzZXJ2ZXJPck5leHQgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvciAhPT0gdm9pZCAwID8gZXJyb3IgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlICE9PSBudWxsICYmIGNvbXBsZXRlICE9PSB2b2lkIDAgPyBjb21wbGV0ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dF8xO1xuICAgICAgICAgICAgaWYgKF90aGlzICYmIGNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkTmV4dENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy51bnN1YnNjcmliZSgpOyB9O1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogb2JzZXJ2ZXJPck5leHQubmV4dCAmJiBiaW5kKG9ic2VydmVyT3JOZXh0Lm5leHQsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBvYnNlcnZlck9yTmV4dC5lcnJvciAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmVycm9yLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogb2JzZXJ2ZXJPck5leHQuY29tcGxldGUgJiYgYmluZChvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5TYWZlU3Vic2NyaWJlciA9IFNhZmVTdWJzY3JpYmVyO1xuZnVuY3Rpb24gaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAoY29uZmlnXzEuY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgZXJyb3JDb250ZXh0XzEuY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcG9ydFVuaGFuZGxlZEVycm9yXzEucmVwb3J0VW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlZmF1bHRFcnJvckhhbmRsZXIoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xufVxuZnVuY3Rpb24gaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIHN1YnNjcmliZXIpIHtcbiAgICB2YXIgb25TdG9wcGVkTm90aWZpY2F0aW9uID0gY29uZmlnXzEuY29uZmlnLm9uU3RvcHBlZE5vdGlmaWNhdGlvbjtcbiAgICBvblN0b3BwZWROb3RpZmljYXRpb24gJiYgdGltZW91dFByb3ZpZGVyXzEudGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gb25TdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcik7IH0pO1xufVxuZXhwb3J0cy5FTVBUWV9PQlNFUlZFUiA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogbm9vcF8xLm5vb3AsXG4gICAgZXJyb3I6IGRlZmF1bHRFcnJvckhhbmRsZXIsXG4gICAgY29tcGxldGU6IG5vb3BfMS5ub29wLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1N1YnNjcmlwdGlvbiA9IGV4cG9ydHMuRU1QVFlfU1VCU0NSSVBUSU9OID0gZXhwb3J0cy5TdWJzY3JpcHRpb24gPSB2b2lkIDA7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIFVuc3Vic2NyaXB0aW9uRXJyb3JfMSA9IHJlcXVpcmUoXCIuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvclwiKTtcbnZhciBhcnJSZW1vdmVfMSA9IHJlcXVpcmUoXCIuL3V0aWwvYXJyUmVtb3ZlXCIpO1xudmFyIFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKGluaXRpYWxUZWFyZG93bikge1xuICAgICAgICB0aGlzLmluaXRpYWxUZWFyZG93biA9IGluaXRpYWxUZWFyZG93bjtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZmluYWxpemVycyA9IG51bGw7XG4gICAgfVxuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iO1xuICAgICAgICB2YXIgZXJyb3JzO1xuICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgICAgIGlmIChfcGFyZW50YWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX3BhcmVudGFnZV8xID0gX192YWx1ZXMoX3BhcmVudGFnZSksIF9wYXJlbnRhZ2VfMV8xID0gX3BhcmVudGFnZV8xLm5leHQoKTsgIV9wYXJlbnRhZ2VfMV8xLmRvbmU7IF9wYXJlbnRhZ2VfMV8xID0gX3BhcmVudGFnZV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IF9wYXJlbnRhZ2VfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudF8xLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9wYXJlbnRhZ2VfMV8xICYmICFfcGFyZW50YWdlXzFfMS5kb25lICYmIChfYSA9IF9wYXJlbnRhZ2VfMS5yZXR1cm4pKSBfYS5jYWxsKF9wYXJlbnRhZ2VfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXJlbnRhZ2UucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbml0aWFsRmluYWxpemVyID0gdGhpcy5pbml0aWFsVGVhcmRvd247XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oaW5pdGlhbEZpbmFsaXplcikpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsRmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvciA/IGUuZXJyb3JzIDogW2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBfZmluYWxpemVycyA9IHRoaXMuX2ZpbmFsaXplcnM7XG4gICAgICAgICAgICBpZiAoX2ZpbmFsaXplcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maW5hbGl6ZXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfZmluYWxpemVyc18xID0gX192YWx1ZXMoX2ZpbmFsaXplcnMpLCBfZmluYWxpemVyc18xXzEgPSBfZmluYWxpemVyc18xLm5leHQoKTsgIV9maW5hbGl6ZXJzXzFfMS5kb25lOyBfZmluYWxpemVyc18xXzEgPSBfZmluYWxpemVyc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsaXplciA9IF9maW5hbGl6ZXJzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY0ZpbmFsaXplcihmaW5hbGl6ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyAhPT0gbnVsbCAmJiBlcnJvcnMgIT09IHZvaWQgMCA/IGVycm9ycyA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChlcnJvcnMpKSwgX19yZWFkKGVyci5lcnJvcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2ZpbmFsaXplcnNfMV8xICYmICFfZmluYWxpemVyc18xXzEuZG9uZSAmJiAoX2IgPSBfZmluYWxpemVyc18xLnJldHVybikpIF9iLmNhbGwoX2ZpbmFsaXplcnNfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGVhcmRvd24gJiYgdGVhcmRvd24gIT09IHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGV4ZWNGaW5hbGl6ZXIodGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93bi5jbG9zZWQgfHwgdGVhcmRvd24uX2hhc1BhcmVudCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRlYXJkb3duLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICh0aGlzLl9maW5hbGl6ZXJzID0gKF9hID0gdGhpcy5fZmluYWxpemVycykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pLnB1c2godGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9oYXNQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICByZXR1cm4gX3BhcmVudGFnZSA9PT0gcGFyZW50IHx8IChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpICYmIF9wYXJlbnRhZ2UuaW5jbHVkZXMocGFyZW50KSk7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9hZGRQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpID8gKF9wYXJlbnRhZ2UucHVzaChwYXJlbnQpLCBfcGFyZW50YWdlKSA6IF9wYXJlbnRhZ2UgPyBbX3BhcmVudGFnZSwgcGFyZW50XSA6IHBhcmVudDtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX3JlbW92ZVBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIGlmIChfcGFyZW50YWdlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKF9wYXJlbnRhZ2UsIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIHZhciBfZmluYWxpemVycyA9IHRoaXMuX2ZpbmFsaXplcnM7XG4gICAgICAgIF9maW5hbGl6ZXJzICYmIGFyclJlbW92ZV8xLmFyclJlbW92ZShfZmluYWxpemVycywgdGVhcmRvd24pO1xuICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRlYXJkb3duLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5FTVBUWSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbXB0eSA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnRzLlN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbjtcbmV4cG9ydHMuRU1QVFlfU1VCU0NSSVBUSU9OID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuZnVuY3Rpb24gaXNTdWJzY3JpcHRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uIHx8XG4gICAgICAgICh2YWx1ZSAmJiAnY2xvc2VkJyBpbiB2YWx1ZSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih2YWx1ZS5yZW1vdmUpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlLmFkZCkgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUudW5zdWJzY3JpYmUpKSk7XG59XG5leHBvcnRzLmlzU3Vic2NyaXB0aW9uID0gaXNTdWJzY3JpcHRpb247XG5mdW5jdGlvbiBleGVjRmluYWxpemVyKGZpbmFsaXplcikge1xuICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihmaW5hbGl6ZXIpKSB7XG4gICAgICAgIGZpbmFsaXplcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmluYWxpemVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb25maWcgPSB2b2lkIDA7XG5leHBvcnRzLmNvbmZpZyA9IHtcbiAgICBvblVuaGFuZGxlZEVycm9yOiBudWxsLFxuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbjogbnVsbCxcbiAgICBQcm9taXNlOiB1bmRlZmluZWQsXG4gICAgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZzogZmFsc2UsXG4gICAgdXNlRGVwcmVjYXRlZE5leHRDb250ZXh0OiBmYWxzZSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZpcnN0VmFsdWVGcm9tID0gdm9pZCAwO1xudmFyIEVtcHR5RXJyb3JfMSA9IHJlcXVpcmUoXCIuL3V0aWwvRW1wdHlFcnJvclwiKTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9TdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gZmlyc3RWYWx1ZUZyb20oc291cmNlLCBjb25maWcpIHtcbiAgICB2YXIgaGFzQ29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCc7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcl8xLlNhZmVTdWJzY3JpYmVyKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY29uZmlnLmRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVtcHR5RXJyb3JfMS5FbXB0eUVycm9yKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5maXJzdFZhbHVlRnJvbSA9IGZpcnN0VmFsdWVGcm9tO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zmlyc3RWYWx1ZUZyb20uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmxhc3RWYWx1ZUZyb20gPSB2b2lkIDA7XG52YXIgRW1wdHlFcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9FbXB0eUVycm9yXCIpO1xuZnVuY3Rpb24gbGFzdFZhbHVlRnJvbShzb3VyY2UsIGNvbmZpZykge1xuICAgIHZhciBoYXNDb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgX2hhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIHZhciBfdmFsdWU7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgX2hhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2hhc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY29uZmlnLmRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVtcHR5RXJyb3JfMS5FbXB0eUVycm9yKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5sYXN0VmFsdWVGcm9tID0gbGFzdFZhbHVlRnJvbTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhc3RWYWx1ZUZyb20uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db25uZWN0YWJsZU9ic2VydmFibGUgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIHJlZkNvdW50XzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL3JlZkNvdW50XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBDb25uZWN0YWJsZU9ic2VydmFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb25uZWN0YWJsZU9ic2VydmFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGFibGVPYnNlcnZhYmxlKHNvdXJjZSwgc3ViamVjdEZhY3RvcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICBfdGhpcy5zdWJqZWN0RmFjdG9yeSA9IHN1YmplY3RGYWN0b3J5O1xuICAgICAgICBfdGhpcy5fc3ViamVjdCA9IG51bGw7XG4gICAgICAgIF90aGlzLl9yZWZDb3VudCA9IDA7XG4gICAgICAgIF90aGlzLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGxpZnRfMS5oYXNMaWZ0KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIF90aGlzLmxpZnQgPSBzb3VyY2UubGlmdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN1YmplY3QoKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLmdldFN1YmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gdGhpcy5fc3ViamVjdDtcbiAgICAgICAgaWYgKCFzdWJqZWN0IHx8IHN1YmplY3QuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0ID0gdGhpcy5zdWJqZWN0RmFjdG9yeSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0O1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZS5fdGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlZkNvdW50ID0gMDtcbiAgICAgICAgdmFyIF9jb25uZWN0aW9uID0gdGhpcy5fY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IHRoaXMuX2Nvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICBfY29ubmVjdGlvbiA9PT0gbnVsbCB8fCBfY29ubmVjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Nvbm5lY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uO1xuICAgICAgICBpZiAoIWNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uID0gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgdmFyIHN1YmplY3RfMSA9IHRoaXMuZ2V0U3ViamVjdCgpO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5hZGQodGhpcy5zb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJqZWN0XzEsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl90ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIHN1YmplY3RfMS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIF90aGlzLl90ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIHN1YmplY3RfMS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3RlYXJkb3duKCk7IH0pKSk7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uID0gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZS5yZWZDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlZkNvdW50XzEucmVmQ291bnQoKSh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBDb25uZWN0YWJsZU9ic2VydmFibGU7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbm5lY3RhYmxlT2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYmluZENhbGxiYWNrID0gdm9pZCAwO1xudmFyIGJpbmRDYWxsYmFja0ludGVybmFsc18xID0gcmVxdWlyZShcIi4vYmluZENhbGxiYWNrSW50ZXJuYWxzXCIpO1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGNhbGxiYWNrRnVuYywgcmVzdWx0U2VsZWN0b3IsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBiaW5kQ2FsbGJhY2tJbnRlcm5hbHNfMS5iaW5kQ2FsbGJhY2tJbnRlcm5hbHMoZmFsc2UsIGNhbGxiYWNrRnVuYywgcmVzdWx0U2VsZWN0b3IsIHNjaGVkdWxlcik7XG59XG5leHBvcnRzLmJpbmRDYWxsYmFjayA9IGJpbmRDYWxsYmFjaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpbmRDYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJpbmRDYWxsYmFja0ludGVybmFscyA9IHZvaWQgMDtcbnZhciBpc1NjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNTY2hlZHVsZXJcIik7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgc3Vic2NyaWJlT25fMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvc3Vic2NyaWJlT25cIik7XG52YXIgbWFwT25lT3JNYW55QXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvbWFwT25lT3JNYW55QXJnc1wiKTtcbnZhciBvYnNlcnZlT25fMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uXCIpO1xudmFyIEFzeW5jU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL0FzeW5jU3ViamVjdFwiKTtcbmZ1bmN0aW9uIGJpbmRDYWxsYmFja0ludGVybmFscyhpc05vZGVTdHlsZSwgY2FsbGJhY2tGdW5jLCByZXN1bHRTZWxlY3Rvciwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChpc1NjaGVkdWxlcl8xLmlzU2NoZWR1bGVyKHJlc3VsdFNlbGVjdG9yKSkge1xuICAgICAgICAgICAgc2NoZWR1bGVyID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZENhbGxiYWNrSW50ZXJuYWxzKGlzTm9kZVN0eWxlLCBjYWxsYmFja0Z1bmMsIHNjaGVkdWxlcilcbiAgICAgICAgICAgICAgICAgICAgLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcE9uZU9yTWFueUFyZ3NfMS5tYXBPbmVPck1hbnlBcmdzKHJlc3VsdFNlbGVjdG9yKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBiaW5kQ2FsbGJhY2tJbnRlcm5hbHMoaXNOb2RlU3R5bGUsIGNhbGxiYWNrRnVuYylcbiAgICAgICAgICAgICAgICAuYXBwbHkodGhpcywgYXJncylcbiAgICAgICAgICAgICAgICAucGlwZShzdWJzY3JpYmVPbl8xLnN1YnNjcmliZU9uKHNjaGVkdWxlciksIG9ic2VydmVPbl8xLm9ic2VydmVPbihzY2hlZHVsZXIpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBBc3luY1N1YmplY3RfMS5Bc3luY1N1YmplY3QoKTtcbiAgICAgICAgdmFyIHVuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc3VicyA9IHN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgaWYgKHVuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB1bmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGlzQXN5bmNfMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBpc0NvbXBsZXRlXzEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja0Z1bmMuYXBwbHkoX3RoaXMsIF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSwgW1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOb2RlU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gcmVzdWx0cy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0Lm5leHQoMSA8IHJlc3VsdHMubGVuZ3RoID8gcmVzdWx0cyA6IHJlc3VsdHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZV8xID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0FzeW5jXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSkpO1xuICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpc0FzeW5jXzEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YnM7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5leHBvcnRzLmJpbmRDYWxsYmFja0ludGVybmFscyA9IGJpbmRDYWxsYmFja0ludGVybmFscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpbmRDYWxsYmFja0ludGVybmFscy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYmluZE5vZGVDYWxsYmFjayA9IHZvaWQgMDtcbnZhciBiaW5kQ2FsbGJhY2tJbnRlcm5hbHNfMSA9IHJlcXVpcmUoXCIuL2JpbmRDYWxsYmFja0ludGVybmFsc1wiKTtcbmZ1bmN0aW9uIGJpbmROb2RlQ2FsbGJhY2soY2FsbGJhY2tGdW5jLCByZXN1bHRTZWxlY3Rvciwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGJpbmRDYWxsYmFja0ludGVybmFsc18xLmJpbmRDYWxsYmFja0ludGVybmFscyh0cnVlLCBjYWxsYmFja0Z1bmMsIHJlc3VsdFNlbGVjdG9yLCBzY2hlZHVsZXIpO1xufVxuZXhwb3J0cy5iaW5kTm9kZUNhbGxiYWNrID0gYmluZE5vZGVDYWxsYmFjaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpbmROb2RlQ2FsbGJhY2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbWJpbmVMYXRlc3RJbml0ID0gZXhwb3J0cy5jb21iaW5lTGF0ZXN0ID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGFyZ3NBcmdBcnJheU9yT2JqZWN0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzQXJnQXJyYXlPck9iamVjdFwiKTtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi9mcm9tXCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbnZhciBtYXBPbmVPck1hbnlBcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzXCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG52YXIgY3JlYXRlT2JqZWN0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9jcmVhdGVPYmplY3RcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbmZ1bmN0aW9uIGNvbWJpbmVMYXRlc3QoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSBhcmdzXzEucG9wU2NoZWR1bGVyKGFyZ3MpO1xuICAgIHZhciByZXN1bHRTZWxlY3RvciA9IGFyZ3NfMS5wb3BSZXN1bHRTZWxlY3RvcihhcmdzKTtcbiAgICB2YXIgX2EgPSBhcmdzQXJnQXJyYXlPck9iamVjdF8xLmFyZ3NBcmdBcnJheU9yT2JqZWN0KGFyZ3MpLCBvYnNlcnZhYmxlcyA9IF9hLmFyZ3MsIGtleXMgPSBfYS5rZXlzO1xuICAgIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZyb21fMS5mcm9tKFtdLCBzY2hlZHVsZXIpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGNvbWJpbmVMYXRlc3RJbml0KG9ic2VydmFibGVzLCBzY2hlZHVsZXIsIGtleXNcbiAgICAgICAgP1xuICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlcykgeyByZXR1cm4gY3JlYXRlT2JqZWN0XzEuY3JlYXRlT2JqZWN0KGtleXMsIHZhbHVlcyk7IH1cbiAgICAgICAgOlxuICAgICAgICAgICAgaWRlbnRpdHlfMS5pZGVudGl0eSkpO1xuICAgIHJldHVybiByZXN1bHRTZWxlY3RvciA/IHJlc3VsdC5waXBlKG1hcE9uZU9yTWFueUFyZ3NfMS5tYXBPbmVPck1hbnlBcmdzKHJlc3VsdFNlbGVjdG9yKSkgOiByZXN1bHQ7XG59XG5leHBvcnRzLmNvbWJpbmVMYXRlc3QgPSBjb21iaW5lTGF0ZXN0O1xuZnVuY3Rpb24gY29tYmluZUxhdGVzdEluaXQob2JzZXJ2YWJsZXMsIHNjaGVkdWxlciwgdmFsdWVUcmFuc2Zvcm0pIHtcbiAgICBpZiAodmFsdWVUcmFuc2Zvcm0gPT09IHZvaWQgMCkgeyB2YWx1ZVRyYW5zZm9ybSA9IGlkZW50aXR5XzEuaWRlbnRpdHk7IH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgbWF5YmVTY2hlZHVsZShzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBvYnNlcnZhYmxlcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbWFpbmluZ0ZpcnN0VmFsdWVzID0gbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIG1heWJlU2NoZWR1bGUoc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBmcm9tXzEuZnJvbShvYnNlcnZhYmxlc1tpXSwgc2NoZWR1bGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc0ZpcnN0VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzRmlyc3RWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0ZpcnN0VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZ0ZpcnN0VmFsdWVzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbWFpbmluZ0ZpcnN0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlVHJhbnNmb3JtKHZhbHVlcy5zbGljZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9LCBzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX2xvb3BfMShpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc3Vic2NyaWJlcik7XG4gICAgfTtcbn1cbmV4cG9ydHMuY29tYmluZUxhdGVzdEluaXQgPSBjb21iaW5lTGF0ZXN0SW5pdDtcbmZ1bmN0aW9uIG1heWJlU2NoZWR1bGUoc2NoZWR1bGVyLCBleGVjdXRlLCBzdWJzY3JpcHRpb24pIHtcbiAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpcHRpb24sIHNjaGVkdWxlciwgZXhlY3V0ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBleGVjdXRlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tYmluZUxhdGVzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29uY2F0ID0gdm9pZCAwO1xudmFyIGNvbmNhdEFsbF8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9jb25jYXRBbGxcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi9mcm9tXCIpO1xuZnVuY3Rpb24gY29uY2F0KCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gY29uY2F0QWxsXzEuY29uY2F0QWxsKCkoZnJvbV8xLmZyb20oYXJncywgYXJnc18xLnBvcFNjaGVkdWxlcihhcmdzKSkpO1xufVxuZXhwb3J0cy5jb25jYXQgPSBjb25jYXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbm5lY3RhYmxlID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGRlZmVyXzEgPSByZXF1aXJlKFwiLi9kZWZlclwiKTtcbnZhciBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBjb25uZWN0b3I6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpOyB9LFxuICAgIHJlc2V0T25EaXNjb25uZWN0OiB0cnVlLFxufTtcbmZ1bmN0aW9uIGNvbm5lY3RhYmxlKHNvdXJjZSwgY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IERFRkFVTFRfQ09ORklHOyB9XG4gICAgdmFyIGNvbm5lY3Rpb24gPSBudWxsO1xuICAgIHZhciBjb25uZWN0b3IgPSBjb25maWcuY29ubmVjdG9yLCBfYSA9IGNvbmZpZy5yZXNldE9uRGlzY29ubmVjdCwgcmVzZXRPbkRpc2Nvbm5lY3QgPSBfYSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9hO1xuICAgIHZhciBzdWJqZWN0ID0gY29ubmVjdG9yKCk7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSk7XG4gICAgcmVzdWx0LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghY29ubmVjdGlvbiB8fCBjb25uZWN0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IGRlZmVyXzEuZGVmZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gc291cmNlOyB9KS5zdWJzY3JpYmUoc3ViamVjdCk7XG4gICAgICAgICAgICBpZiAocmVzZXRPbkRpc2Nvbm5lY3QpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmFkZChmdW5jdGlvbiAoKSB7IHJldHVybiAoc3ViamVjdCA9IGNvbm5lY3RvcigpKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jb25uZWN0YWJsZSA9IGNvbm5lY3RhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29ubmVjdGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmVyID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4vaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gZGVmZXIob2JzZXJ2YWJsZUZhY3RvcnkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShvYnNlcnZhYmxlRmFjdG9yeSgpKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmVyID0gZGVmZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVzID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9PYnNlcnZhYmxlXCIpO1xudmFyIHBlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9zY2hlZHVsZXIvcGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlclwiKTtcbnZhciBhbmltYXRpb25GcmFtZVByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vc2NoZWR1bGVyL2FuaW1hdGlvbkZyYW1lUHJvdmlkZXJcIik7XG5mdW5jdGlvbiBhbmltYXRpb25GcmFtZXModGltZXN0YW1wUHJvdmlkZXIpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wUHJvdmlkZXIgPyBhbmltYXRpb25GcmFtZXNGYWN0b3J5KHRpbWVzdGFtcFByb3ZpZGVyKSA6IERFRkFVTFRfQU5JTUFUSU9OX0ZSQU1FUztcbn1cbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVzID0gYW5pbWF0aW9uRnJhbWVzO1xuZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzRmFjdG9yeSh0aW1lc3RhbXBQcm92aWRlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHByb3ZpZGVyID0gdGltZXN0YW1wUHJvdmlkZXIgfHwgcGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlcl8xLnBlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXI7XG4gICAgICAgIHZhciBzdGFydCA9IHByb3ZpZGVyLm5vdygpO1xuICAgICAgICB2YXIgaWQgPSAwO1xuICAgICAgICB2YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGlkID0gYW5pbWF0aW9uRnJhbWVQcm92aWRlcl8xLmFuaW1hdGlvbkZyYW1lUHJvdmlkZXIucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gcHJvdmlkZXIubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcFByb3ZpZGVyID8gbm93IDogdGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxhcHNlZDogbm93IC0gc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBydW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcnVuKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25GcmFtZVByb3ZpZGVyXzEuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59XG52YXIgREVGQVVMVF9BTklNQVRJT05fRlJBTUVTID0gYW5pbWF0aW9uRnJhbWVzRmFjdG9yeSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5pbWF0aW9uRnJhbWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5lbXB0eSA9IGV4cG9ydHMuRU1QVFkgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG5leHBvcnRzLkVNUFRZID0gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0pO1xuZnVuY3Rpb24gZW1wdHkoc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlciA/IGVtcHR5U2NoZWR1bGVkKHNjaGVkdWxlcikgOiBleHBvcnRzLkVNUFRZO1xufVxuZXhwb3J0cy5lbXB0eSA9IGVtcHR5O1xuZnVuY3Rpb24gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSk7IH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW1wdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZvcmtKb2luID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGFyZ3NBcmdBcnJheU9yT2JqZWN0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzQXJnQXJyYXlPck9iamVjdFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgbWFwT25lT3JNYW55QXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvbWFwT25lT3JNYW55QXJnc1wiKTtcbnZhciBjcmVhdGVPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2NyZWF0ZU9iamVjdFwiKTtcbmZ1bmN0aW9uIGZvcmtKb2luKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0U2VsZWN0b3IgPSBhcmdzXzEucG9wUmVzdWx0U2VsZWN0b3IoYXJncyk7XG4gICAgdmFyIF9hID0gYXJnc0FyZ0FycmF5T3JPYmplY3RfMS5hcmdzQXJnQXJyYXlPck9iamVjdChhcmdzKSwgc291cmNlcyA9IF9hLmFyZ3MsIGtleXMgPSBfYS5rZXlzO1xuICAgIHZhciByZXN1bHQgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoO1xuICAgICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgdmFyIHJlbWFpbmluZ0NvbXBsZXRpb25zID0gbGVuZ3RoO1xuICAgICAgICB2YXIgcmVtYWluaW5nRW1pc3Npb25zID0gbGVuZ3RoO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChzb3VyY2VJbmRleCkge1xuICAgICAgICAgICAgdmFyIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oc291cmNlc1tzb3VyY2VJbmRleF0pLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZ0VtaXNzaW9ucy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZXNbc291cmNlSW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZW1haW5pbmdDb21wbGV0aW9ucy0tOyB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlbWFpbmluZ0NvbXBsZXRpb25zIHx8ICFoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbWFpbmluZ0VtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGtleXMgPyBjcmVhdGVPYmplY3RfMS5jcmVhdGVPYmplY3Qoa2V5cywgdmFsdWVzKSA6IHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgc291cmNlSW5kZXggPSAwOyBzb3VyY2VJbmRleCA8IGxlbmd0aDsgc291cmNlSW5kZXgrKykge1xuICAgICAgICAgICAgX2xvb3BfMShzb3VyY2VJbmRleCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IgPyByZXN1bHQucGlwZShtYXBPbmVPck1hbnlBcmdzXzEubWFwT25lT3JNYW55QXJncyhyZXN1bHRTZWxlY3RvcikpIDogcmVzdWx0O1xufVxuZXhwb3J0cy5mb3JrSm9pbiA9IGZvcmtKb2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ya0pvaW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZyb20gPSB2b2lkIDA7XG52YXIgc2NoZWR1bGVkXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVkL3NjaGVkdWxlZFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbmZ1bmN0aW9uIGZyb20oaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBzY2hlZHVsZXIgPyBzY2hlZHVsZWRfMS5zY2hlZHVsZWQoaW5wdXQsIHNjaGVkdWxlcikgOiBpbm5lckZyb21fMS5pbm5lckZyb20oaW5wdXQpO1xufVxuZXhwb3J0cy5mcm9tID0gZnJvbTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZyb21FdmVudCA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBtZXJnZU1hcF8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9tZXJnZU1hcFwiKTtcbnZhciBpc0FycmF5TGlrZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNBcnJheUxpa2VcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBtYXBPbmVPck1hbnlBcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzXCIpO1xudmFyIG5vZGVFdmVudEVtaXR0ZXJNZXRob2RzID0gWydhZGRMaXN0ZW5lcicsICdyZW1vdmVMaXN0ZW5lciddO1xudmFyIGV2ZW50VGFyZ2V0TWV0aG9kcyA9IFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJ107XG52YXIganF1ZXJ5TWV0aG9kcyA9IFsnb24nLCAnb2ZmJ107XG5mdW5jdGlvbiBmcm9tRXZlbnQodGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIHJlc3VsdFNlbGVjdG9yID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMpLnBpcGUobWFwT25lT3JNYW55QXJnc18xLm1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKTtcbiAgICB9XG4gICAgdmFyIF9hID0gX19yZWFkKGlzRXZlbnRUYXJnZXQodGFyZ2V0KVxuICAgICAgICA/IGV2ZW50VGFyZ2V0TWV0aG9kcy5tYXAoZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBoYW5kbGVyLCBvcHRpb25zKTsgfTsgfSlcbiAgICAgICAgOlxuICAgICAgICAgICAgaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgID8gbm9kZUV2ZW50RW1pdHRlck1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICA6IGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICA/IGpxdWVyeU1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgOiBbXSwgMiksIGFkZCA9IF9hWzBdLCByZW1vdmUgPSBfYVsxXTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBpZiAoaXNBcnJheUxpa2VfMS5pc0FycmF5TGlrZSh0YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VNYXBfMS5tZXJnZU1hcChmdW5jdGlvbiAoc3ViVGFyZ2V0KSB7IHJldHVybiBmcm9tRXZlbnQoc3ViVGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMpOyB9KShpbm5lckZyb21fMS5pbm5lckZyb20odGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFhZGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBldmVudCB0YXJnZXQnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLm5leHQoMSA8IGFyZ3MubGVuZ3RoID8gYXJncyA6IGFyZ3NbMF0pO1xuICAgICAgICB9O1xuICAgICAgICBhZGQoaGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmUoaGFuZGxlcik7IH07XG4gICAgfSk7XG59XG5leHBvcnRzLmZyb21FdmVudCA9IGZyb21FdmVudDtcbmZ1bmN0aW9uIHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7IHJldHVybiBmdW5jdGlvbiAoaGFuZGxlcikgeyByZXR1cm4gdGFyZ2V0W21ldGhvZE5hbWVdKGV2ZW50TmFtZSwgaGFuZGxlcik7IH07IH07XG59XG5mdW5jdGlvbiBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odGFyZ2V0LmFkZExpc3RlbmVyKSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih0YXJnZXQucmVtb3ZlTGlzdGVuZXIpO1xufVxuZnVuY3Rpb24gaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odGFyZ2V0Lm9uKSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih0YXJnZXQub2ZmKTtcbn1cbmZ1bmN0aW9uIGlzRXZlbnRUYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHRhcmdldC5hZGRFdmVudExpc3RlbmVyKSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZyb21FdmVudFBhdHRlcm4gPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBtYXBPbmVPck1hbnlBcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzXCIpO1xuZnVuY3Rpb24gZnJvbUV2ZW50UGF0dGVybihhZGRIYW5kbGVyLCByZW1vdmVIYW5kbGVyLCByZXN1bHRTZWxlY3Rvcikge1xuICAgIGlmIChyZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZnJvbUV2ZW50UGF0dGVybihhZGRIYW5kbGVyLCByZW1vdmVIYW5kbGVyKS5waXBlKG1hcE9uZU9yTWFueUFyZ3NfMS5tYXBPbmVPck1hbnlBcmdzKHJlc3VsdFNlbGVjdG9yKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBlW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5uZXh0KGUubGVuZ3RoID09PSAxID8gZVswXSA6IGUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcmV0VmFsdWUgPSBhZGRIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ocmVtb3ZlSGFuZGxlcikgPyBmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmVIYW5kbGVyKGhhbmRsZXIsIHJldFZhbHVlKTsgfSA6IHVuZGVmaW5lZDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZnJvbUV2ZW50UGF0dGVybiA9IGZyb21FdmVudFBhdHRlcm47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnRQYXR0ZXJuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mcm9tU3Vic2NyaWJhYmxlID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xuZnVuY3Rpb24gZnJvbVN1YnNjcmliYWJsZShzdWJzY3JpYmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzdWJzY3JpYmFibGUuc3Vic2NyaWJlKHN1YnNjcmliZXIpOyB9KTtcbn1cbmV4cG9ydHMuZnJvbVN1YnNjcmliYWJsZSA9IGZyb21TdWJzY3JpYmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tU3Vic2NyaWJhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlID0gdm9pZCAwO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbnZhciBpc1NjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNTY2hlZHVsZXJcIik7XG52YXIgZGVmZXJfMSA9IHJlcXVpcmUoXCIuL2RlZmVyXCIpO1xudmFyIHNjaGVkdWxlSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZWQvc2NoZWR1bGVJdGVyYWJsZVwiKTtcbmZ1bmN0aW9uIGdlbmVyYXRlKGluaXRpYWxTdGF0ZU9yT3B0aW9ucywgY29uZGl0aW9uLCBpdGVyYXRlLCByZXN1bHRTZWxlY3Rvck9yU2NoZWR1bGVyLCBzY2hlZHVsZXIpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIHZhciByZXN1bHRTZWxlY3RvcjtcbiAgICB2YXIgaW5pdGlhbFN0YXRlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIChfYSA9IGluaXRpYWxTdGF0ZU9yT3B0aW9ucywgaW5pdGlhbFN0YXRlID0gX2EuaW5pdGlhbFN0YXRlLCBjb25kaXRpb24gPSBfYS5jb25kaXRpb24sIGl0ZXJhdGUgPSBfYS5pdGVyYXRlLCBfYiA9IF9hLnJlc3VsdFNlbGVjdG9yLCByZXN1bHRTZWxlY3RvciA9IF9iID09PSB2b2lkIDAgPyBpZGVudGl0eV8xLmlkZW50aXR5IDogX2IsIHNjaGVkdWxlciA9IF9hLnNjaGVkdWxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpbml0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGVPck9wdGlvbnM7XG4gICAgICAgIGlmICghcmVzdWx0U2VsZWN0b3JPclNjaGVkdWxlciB8fCBpc1NjaGVkdWxlcl8xLmlzU2NoZWR1bGVyKHJlc3VsdFNlbGVjdG9yT3JTY2hlZHVsZXIpKSB7XG4gICAgICAgICAgICByZXN1bHRTZWxlY3RvciA9IGlkZW50aXR5XzEuaWRlbnRpdHk7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSByZXN1bHRTZWxlY3Rvck9yU2NoZWR1bGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3IgPSByZXN1bHRTZWxlY3Rvck9yU2NoZWR1bGVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdlbigpIHtcbiAgICAgICAgdmFyIHN0YXRlO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoIWNvbmRpdGlvbiB8fCBjb25kaXRpb24oc3RhdGUpKSkgcmV0dXJuIFszLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCByZXN1bHRTZWxlY3RvcihzdGF0ZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IGl0ZXJhdGUoc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZWZlcl8xLmRlZmVyKChzY2hlZHVsZXJcbiAgICAgICAgP1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZWR1bGVJdGVyYWJsZV8xLnNjaGVkdWxlSXRlcmFibGUoZ2VuKCksIHNjaGVkdWxlcik7IH1cbiAgICAgICAgOlxuICAgICAgICAgICAgZ2VuKSk7XG59XG5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZW5lcmF0ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaWlmID0gdm9pZCAwO1xudmFyIGRlZmVyXzEgPSByZXF1aXJlKFwiLi9kZWZlclwiKTtcbmZ1bmN0aW9uIGlpZihjb25kaXRpb24sIHRydWVSZXN1bHQsIGZhbHNlUmVzdWx0KSB7XG4gICAgcmV0dXJuIGRlZmVyXzEuZGVmZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gKGNvbmRpdGlvbigpID8gdHJ1ZVJlc3VsdCA6IGZhbHNlUmVzdWx0KTsgfSk7XG59XG5leHBvcnRzLmlpZiA9IGlpZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlpZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19hc3luY1ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX19hc3luY1ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mcm9tUmVhZGFibGVTdHJlYW1MaWtlID0gZXhwb3J0cy5mcm9tQXN5bmNJdGVyYWJsZSA9IGV4cG9ydHMuZnJvbUl0ZXJhYmxlID0gZXhwb3J0cy5mcm9tUHJvbWlzZSA9IGV4cG9ydHMuZnJvbUFycmF5TGlrZSA9IGV4cG9ydHMuZnJvbUludGVyb3BPYnNlcnZhYmxlID0gZXhwb3J0cy5pbm5lckZyb20gPSB2b2lkIDA7XG52YXIgaXNBcnJheUxpa2VfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzQXJyYXlMaWtlXCIpO1xudmFyIGlzUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNQcm9taXNlXCIpO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlzSW50ZXJvcE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGVcIik7XG52YXIgaXNBc3luY0l0ZXJhYmxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0FzeW5jSXRlcmFibGVcIik7XG52YXIgdGhyb3dVbm9ic2VydmFibGVFcnJvcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvdGhyb3dVbm9ic2VydmFibGVFcnJvclwiKTtcbnZhciBpc0l0ZXJhYmxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0l0ZXJhYmxlXCIpO1xudmFyIGlzUmVhZGFibGVTdHJlYW1MaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIHJlcG9ydFVuaGFuZGxlZEVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvclwiKTtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vc3ltYm9sL29ic2VydmFibGVcIik7XG5mdW5jdGlvbiBpbm5lckZyb20oaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc0ludGVyb3BPYnNlcnZhYmxlXzEuaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5TGlrZV8xLmlzQXJyYXlMaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb21pc2VfMS5pc1Byb21pc2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVByb21pc2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FzeW5jSXRlcmFibGVfMS5pc0FzeW5jSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0l0ZXJhYmxlXzEuaXNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JlYWRhYmxlU3RyZWFtTGlrZV8xLmlzUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IHRocm93VW5vYnNlcnZhYmxlRXJyb3JfMS5jcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCk7XG59XG5leHBvcnRzLmlubmVyRnJvbSA9IGlubmVyRnJvbTtcbmZ1bmN0aW9uIGZyb21JbnRlcm9wT2JzZXJ2YWJsZShvYmopIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBvYnMgPSBvYmpbb2JzZXJ2YWJsZV8xLm9ic2VydmFibGVdKCk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYnMuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9icy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvdmlkZWQgb2JqZWN0IGRvZXMgbm90IGNvcnJlY3RseSBpbXBsZW1lbnQgU3ltYm9sLm9ic2VydmFibGUnKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZnJvbUludGVyb3BPYnNlcnZhYmxlID0gZnJvbUludGVyb3BPYnNlcnZhYmxlO1xuZnVuY3Rpb24gZnJvbUFycmF5TGlrZShhcnJheSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5mcm9tQXJyYXlMaWtlID0gZnJvbUFycmF5TGlrZTtcbmZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0pXG4gICAgICAgICAgICAudGhlbihudWxsLCByZXBvcnRVbmhhbmRsZWRFcnJvcl8xLnJlcG9ydFVuaGFuZGxlZEVycm9yKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZnJvbVByb21pc2UgPSBmcm9tUHJvbWlzZTtcbmZ1bmN0aW9uIGZyb21JdGVyYWJsZShpdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVyYWJsZV8xID0gX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKTsgIWl0ZXJhYmxlXzFfMS5kb25lOyBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGl0ZXJhYmxlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGVfMV8xICYmICFpdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBpdGVyYWJsZV8xLnJldHVybikpIF9hLmNhbGwoaXRlcmFibGVfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5mcm9tSXRlcmFibGUgPSBmcm9tSXRlcmFibGU7XG5mdW5jdGlvbiBmcm9tQXN5bmNJdGVyYWJsZShhc3luY0l0ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBwcm9jZXNzKGFzeW5jSXRlcmFibGUsIHN1YnNjcmliZXIpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmZyb21Bc3luY0l0ZXJhYmxlID0gZnJvbUFzeW5jSXRlcmFibGU7XG5mdW5jdGlvbiBmcm9tUmVhZGFibGVTdHJlYW1MaWtlKHJlYWRhYmxlU3RyZWFtKSB7XG4gICAgcmV0dXJuIGZyb21Bc3luY0l0ZXJhYmxlKGlzUmVhZGFibGVTdHJlYW1MaWtlXzEucmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihyZWFkYWJsZVN0cmVhbSkpO1xufVxuZXhwb3J0cy5mcm9tUmVhZGFibGVTdHJlYW1MaWtlID0gZnJvbVJlYWRhYmxlU3RyZWFtTGlrZTtcbmZ1bmN0aW9uIHByb2Nlc3MoYXN5bmNJdGVyYWJsZSwgc3Vic2NyaWJlcikge1xuICAgIHZhciBhc3luY0l0ZXJhYmxlXzEsIGFzeW5jSXRlcmFibGVfMV8xO1xuICAgIHZhciBlXzIsIF9hO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlLCBlXzJfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFswLCA1LCA2LCAxMV0pO1xuICAgICAgICAgICAgICAgICAgICBhc3luY0l0ZXJhYmxlXzEgPSBfX2FzeW5jVmFsdWVzKGFzeW5jSXRlcmFibGUpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzQsIGFzeW5jSXRlcmFibGVfMS5uZXh0KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXN5bmNJdGVyYWJsZV8xXzEgPSBfYi5zZW50KCksICFhc3luY0l0ZXJhYmxlXzFfMS5kb25lKSkgcmV0dXJuIFszLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhc3luY0l0ZXJhYmxlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMywgMV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzMsIDExXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGVfMl8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlXzIgPSB7IGVycm9yOiBlXzJfMSB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDExXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbNiwgLCA5LCAxMF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShhc3luY0l0ZXJhYmxlXzFfMSAmJiAhYXN5bmNJdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBhc3luY0l0ZXJhYmxlXzEucmV0dXJuKSkpIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX2EuY2FsbChhc3luY0l0ZXJhYmxlXzEpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA4O1xuICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFszLCAxMF07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5uZXJGcm9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnRlcnZhbCA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciB0aW1lcl8xID0gcmVxdWlyZShcIi4vdGltZXJcIik7XG5mdW5jdGlvbiBpbnRlcnZhbChwZXJpb2QsIHNjaGVkdWxlcikge1xuICAgIGlmIChwZXJpb2QgPT09IHZvaWQgMCkgeyBwZXJpb2QgPSAwOyB9XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICBpZiAocGVyaW9kIDwgMCkge1xuICAgICAgICBwZXJpb2QgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGltZXJfMS50aW1lcihwZXJpb2QsIHBlcmlvZCwgc2NoZWR1bGVyKTtcbn1cbmV4cG9ydHMuaW50ZXJ2YWwgPSBpbnRlcnZhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVydmFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZSA9IHZvaWQgMDtcbnZhciBtZXJnZUFsbF8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9tZXJnZUFsbFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vZW1wdHlcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi9mcm9tXCIpO1xuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSBhcmdzXzEucG9wU2NoZWR1bGVyKGFyZ3MpO1xuICAgIHZhciBjb25jdXJyZW50ID0gYXJnc18xLnBvcE51bWJlcihhcmdzLCBJbmZpbml0eSk7XG4gICAgdmFyIHNvdXJjZXMgPSBhcmdzO1xuICAgIHJldHVybiAhc291cmNlcy5sZW5ndGhcbiAgICAgICAgP1xuICAgICAgICAgICAgZW1wdHlfMS5FTVBUWVxuICAgICAgICA6IHNvdXJjZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHNvdXJjZXNbMF0pXG4gICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgbWVyZ2VBbGxfMS5tZXJnZUFsbChjb25jdXJyZW50KShmcm9tXzEuZnJvbShzb3VyY2VzLCBzY2hlZHVsZXIpKTtcbn1cbmV4cG9ydHMubWVyZ2UgPSBtZXJnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5uZXZlciA9IGV4cG9ydHMuTkVWRVIgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbm9vcFwiKTtcbmV4cG9ydHMuTkVWRVIgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUobm9vcF8xLm5vb3ApO1xuZnVuY3Rpb24gbmV2ZXIoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuTkVWRVI7XG59XG5leHBvcnRzLm5ldmVyID0gbmV2ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uZXZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub2YgPSB2b2lkIDA7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi9mcm9tXCIpO1xuZnVuY3Rpb24gb2YoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSBhcmdzXzEucG9wU2NoZWR1bGVyKGFyZ3MpO1xuICAgIHJldHVybiBmcm9tXzEuZnJvbShhcmdzLCBzY2hlZHVsZXIpO1xufVxuZXhwb3J0cy5vZiA9IG9mO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2YuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9uRXJyb3JSZXN1bWVOZXh0ID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGFyZ3NPckFyZ0FycmF5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzT3JBcmdBcnJheVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi9pbm5lckZyb21cIik7XG5mdW5jdGlvbiBvbkVycm9yUmVzdW1lTmV4dCgpIHtcbiAgICB2YXIgc291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIG5leHRTb3VyY2VzID0gYXJnc09yQXJnQXJyYXlfMS5hcmdzT3JBcmdBcnJheShzb3VyY2VzKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzb3VyY2VJbmRleCA9IDA7XG4gICAgICAgIHZhciBzdWJzY3JpYmVOZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZUluZGV4IDwgbmV4dFNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNvdXJjZSA9IGlubmVyRnJvbV8xLmlubmVyRnJvbShuZXh0U291cmNlc1tzb3VyY2VJbmRleCsrXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBpbm5lclN1YnNjcmliZXIgPSBuZXcgT3BlcmF0b3JTdWJzY3JpYmVyXzEuT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHVuZGVmaW5lZCwgbm9vcF8xLm5vb3AsIG5vb3BfMS5ub29wKTtcbiAgICAgICAgICAgICAgICBuZXh0U291cmNlLnN1YnNjcmliZShpbm5lclN1YnNjcmliZXIpO1xuICAgICAgICAgICAgICAgIGlubmVyU3Vic2NyaWJlci5hZGQoc3Vic2NyaWJlTmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHN1YnNjcmliZU5leHQoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMub25FcnJvclJlc3VtZU5leHQgPSBvbkVycm9yUmVzdW1lTmV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9uRXJyb3JSZXN1bWVOZXh0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wYWlycyA9IHZvaWQgMDtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi9mcm9tXCIpO1xuZnVuY3Rpb24gcGFpcnMob2JqLCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gZnJvbV8xLmZyb20oT2JqZWN0LmVudHJpZXMob2JqKSwgc2NoZWR1bGVyKTtcbn1cbmV4cG9ydHMucGFpcnMgPSBwYWlycztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhaXJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wYXJ0aXRpb24gPSB2b2lkIDA7XG52YXIgbm90XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub3RcIik7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL2ZpbHRlclwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbmZ1bmN0aW9uIHBhcnRpdGlvbihzb3VyY2UsIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBbZmlsdGVyXzEuZmlsdGVyKHByZWRpY2F0ZSwgdGhpc0FyZykoaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHNvdXJjZSkpLCBmaWx0ZXJfMS5maWx0ZXIobm90XzEubm90KHByZWRpY2F0ZSwgdGhpc0FyZykpKGlubmVyRnJvbV8xLmlubmVyRnJvbShzb3VyY2UpKV07XG59XG5leHBvcnRzLnBhcnRpdGlvbiA9IHBhcnRpdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnRpdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFjZUluaXQgPSBleHBvcnRzLnJhY2UgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi9pbm5lckZyb21cIik7XG52YXIgYXJnc09yQXJnQXJyYXlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NPckFyZ0FycmF5XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiByYWNlKCkge1xuICAgIHZhciBzb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBzb3VyY2VzID0gYXJnc09yQXJnQXJyYXlfMS5hcmdzT3JBcmdBcnJheShzb3VyY2VzKTtcbiAgICByZXR1cm4gc291cmNlcy5sZW5ndGggPT09IDEgPyBpbm5lckZyb21fMS5pbm5lckZyb20oc291cmNlc1swXSkgOiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUocmFjZUluaXQoc291cmNlcykpO1xufVxuZXhwb3J0cy5yYWNlID0gcmFjZTtcbmZ1bmN0aW9uIHJhY2VJbml0KHNvdXJjZXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKGlubmVyRnJvbV8xLmlubmVyRnJvbShzb3VyY2VzW2ldKS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgc3Vic2NyaXB0aW9ucy5sZW5ndGg7IHMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcyAhPT0gaSAmJiBzdWJzY3JpcHRpb25zW3NdLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgc3Vic2NyaXB0aW9ucyAmJiAhc3Vic2NyaWJlci5jbG9zZWQgJiYgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIF9sb29wXzEoaSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5yYWNlSW5pdCA9IHJhY2VJbml0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmFjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFuZ2UgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuL2VtcHR5XCIpO1xuZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIGNvdW50LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoY291bnQgPT0gbnVsbCkge1xuICAgICAgICBjb3VudCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGlmIChjb3VudCA8PSAwKSB7XG4gICAgICAgIHJldHVybiBlbXB0eV8xLkVNUFRZO1xuICAgIH1cbiAgICB2YXIgZW5kID0gY291bnQgKyBzdGFydDtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKHNjaGVkdWxlclxuICAgICAgICA/XG4gICAgICAgICAgICBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHZhciBuID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQobisrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICA6XG4gICAgICAgICAgICBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHZhciBuID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG4gPCBlbmQgJiYgIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChuKyspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbn1cbmV4cG9ydHMucmFuZ2UgPSByYW5nZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aHJvd0Vycm9yID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiB0aHJvd0Vycm9yKGVycm9yT3JFcnJvckZhY3RvcnksIHNjaGVkdWxlcikge1xuICAgIHZhciBlcnJvckZhY3RvcnkgPSBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihlcnJvck9yRXJyb3JGYWN0b3J5KSA/IGVycm9yT3JFcnJvckZhY3RvcnkgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBlcnJvck9yRXJyb3JGYWN0b3J5OyB9O1xuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyb3JGYWN0b3J5KCkpOyB9O1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoc2NoZWR1bGVyID8gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShpbml0LCAwLCBzdWJzY3JpYmVyKTsgfSA6IGluaXQpO1xufVxuZXhwb3J0cy50aHJvd0Vycm9yID0gdGhyb3dFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm93RXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRpbWVyID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIGlzU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1NjaGVkdWxlclwiKTtcbnZhciBpc0RhdGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRGF0ZVwiKTtcbmZ1bmN0aW9uIHRpbWVyKGR1ZVRpbWUsIGludGVydmFsT3JTY2hlZHVsZXIsIHNjaGVkdWxlcikge1xuICAgIGlmIChkdWVUaW1lID09PSB2b2lkIDApIHsgZHVlVGltZSA9IDA7IH1cbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luYzsgfVxuICAgIHZhciBpbnRlcnZhbER1cmF0aW9uID0gLTE7XG4gICAgaWYgKGludGVydmFsT3JTY2hlZHVsZXIgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNTY2hlZHVsZXJfMS5pc1NjaGVkdWxlcihpbnRlcnZhbE9yU2NoZWR1bGVyKSkge1xuICAgICAgICAgICAgc2NoZWR1bGVyID0gaW50ZXJ2YWxPclNjaGVkdWxlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGludGVydmFsRHVyYXRpb24gPSBpbnRlcnZhbE9yU2NoZWR1bGVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGR1ZSA9IGlzRGF0ZV8xLmlzVmFsaWREYXRlKGR1ZVRpbWUpID8gK2R1ZVRpbWUgLSBzY2hlZHVsZXIubm93KCkgOiBkdWVUaW1lO1xuICAgICAgICBpZiAoZHVlIDwgMCkge1xuICAgICAgICAgICAgZHVlID0gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbiA9IDA7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChuKyspO1xuICAgICAgICAgICAgICAgIGlmICgwIDw9IGludGVydmFsRHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh1bmRlZmluZWQsIGludGVydmFsRHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZHVlKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudGltZXIgPSB0aW1lcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2luZyA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vZW1wdHlcIik7XG5mdW5jdGlvbiB1c2luZyhyZXNvdXJjZUZhY3RvcnksIG9ic2VydmFibGVGYWN0b3J5KSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSByZXNvdXJjZUZhY3RvcnkoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG9ic2VydmFibGVGYWN0b3J5KHJlc291cmNlKTtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHJlc3VsdCA/IGlubmVyRnJvbV8xLmlubmVyRnJvbShyZXN1bHQpIDogZW1wdHlfMS5FTVBUWTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHJlc291cmNlLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLnVzaW5nID0gdXNpbmc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2luZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnppcCA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuL2lubmVyRnJvbVwiKTtcbnZhciBhcmdzT3JBcmdBcnJheV8xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc09yQXJnQXJyYXlcIik7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuL2VtcHR5XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbmZ1bmN0aW9uIHppcCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yID0gYXJnc18xLnBvcFJlc3VsdFNlbGVjdG9yKGFyZ3MpO1xuICAgIHZhciBzb3VyY2VzID0gYXJnc09yQXJnQXJyYXlfMS5hcmdzT3JBcmdBcnJheShhcmdzKTtcbiAgICByZXR1cm4gc291cmNlcy5sZW5ndGhcbiAgICAgICAgPyBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBidWZmZXJzID0gc291cmNlcy5tYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH0pO1xuICAgICAgICAgICAgdmFyIGNvbXBsZXRlZCA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9KTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBidWZmZXJzID0gY29tcGxldGVkID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoc291cmNlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oc291cmNlc1tzb3VyY2VJbmRleF0pLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcnNbc291cmNlSW5kZXhdLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVycy5ldmVyeShmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIubGVuZ3RoOyB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGJ1ZmZlcnMubWFwKGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5zaGlmdCgpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHRTZWxlY3RvciA/IHJlc3VsdFNlbGVjdG9yLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHJlc3VsdCkpKSA6IHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVycy5zb21lKGZ1bmN0aW9uIChidWZmZXIsIGkpIHsgcmV0dXJuICFidWZmZXIubGVuZ3RoICYmIGNvbXBsZXRlZFtpXTsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZFtzb3VyY2VJbmRleF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAhYnVmZmVyc1tzb3VyY2VJbmRleF0ubGVuZ3RoICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yICh2YXIgc291cmNlSW5kZXggPSAwOyAhc3Vic2NyaWJlci5jbG9zZWQgJiYgc291cmNlSW5kZXggPCBzb3VyY2VzLmxlbmd0aDsgc291cmNlSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIF9sb29wXzEoc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBidWZmZXJzID0gY29tcGxldGVkID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIDogZW1wdHlfMS5FTVBUWTtcbn1cbmV4cG9ydHMuemlwID0gemlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9emlwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT3BlcmF0b3JTdWJzY3JpYmVyID0gZXhwb3J0cy5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgPSB2b2lkIDA7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoZGVzdGluYXRpb24sIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciwgb25GaW5hbGl6ZSkge1xuICAgIHJldHVybiBuZXcgT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUpO1xufVxuZXhwb3J0cy5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgPSBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXI7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT3BlcmF0b3JTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplLCBzaG91bGRVbnN1YnNjcmliZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub25GaW5hbGl6ZSA9IG9uRmluYWxpemU7XG4gICAgICAgIF90aGlzLnNob3VsZFVuc3Vic2NyaWJlID0gc2hvdWxkVW5zdWJzY3JpYmU7XG4gICAgICAgIF90aGlzLl9uZXh0ID0gb25OZXh0XG4gICAgICAgICAgICA/IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX25leHQ7XG4gICAgICAgIF90aGlzLl9lcnJvciA9IG9uRXJyb3JcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fZXJyb3I7XG4gICAgICAgIF90aGlzLl9jb21wbGV0ZSA9IG9uQ29tcGxldGVcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fY29tcGxldGU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT3BlcmF0b3JTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkVW5zdWJzY3JpYmUgfHwgdGhpcy5zaG91bGRVbnN1YnNjcmliZSgpKSB7XG4gICAgICAgICAgICB2YXIgY2xvc2VkXzEgPSB0aGlzLmNsb3NlZDtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICFjbG9zZWRfMSAmJiAoKF9hID0gdGhpcy5vbkZpbmFsaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcGVyYXRvclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG5leHBvcnRzLk9wZXJhdG9yU3Vic2NyaWJlciA9IE9wZXJhdG9yU3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9wZXJhdG9yU3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXVkaXQgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGF1ZGl0KGR1cmF0aW9uU2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIHZhciBkdXJhdGlvblN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgZW5kRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkdXJhdGlvblN1YnNjcmliZXIgPT09IG51bGwgfHwgZHVyYXRpb25TdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkdXJhdGlvblN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGR1cmF0aW9uU3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxhc3RWYWx1ZTtcbiAgICAgICAgICAgICAgICBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc0NvbXBsZXRlICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNsZWFudXBEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uU3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgICAgICBpc0NvbXBsZXRlICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICghZHVyYXRpb25TdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGR1cmF0aW9uU2VsZWN0b3IodmFsdWUpKS5zdWJzY3JpYmUoKGR1cmF0aW9uU3Vic2NyaWJlciA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBlbmREdXJhdGlvbiwgY2xlYW51cER1cmF0aW9uKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICghaGFzVmFsdWUgfHwgIWR1cmF0aW9uU3Vic2NyaWJlciB8fCBkdXJhdGlvblN1YnNjcmliZXIuY2xvc2VkKSAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuYXVkaXQgPSBhdWRpdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1ZGl0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hdWRpdFRpbWUgPSB2b2lkIDA7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgYXVkaXRfMSA9IHJlcXVpcmUoXCIuL2F1ZGl0XCIpO1xudmFyIHRpbWVyXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS90aW1lclwiKTtcbmZ1bmN0aW9uIGF1ZGl0VGltZShkdXJhdGlvbiwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICByZXR1cm4gYXVkaXRfMS5hdWRpdChmdW5jdGlvbiAoKSB7IHJldHVybiB0aW1lcl8xLnRpbWVyKGR1cmF0aW9uLCBzY2hlZHVsZXIpOyB9KTtcbn1cbmV4cG9ydHMuYXVkaXRUaW1lID0gYXVkaXRUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVkaXRUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5idWZmZXIgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gYnVmZmVyKGNsb3NpbmdOb3RpZmllcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBjdXJyZW50QnVmZmVyID0gW107XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gY3VycmVudEJ1ZmZlci5wdXNoKHZhbHVlKTsgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGN1cnJlbnRCdWZmZXIpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShjbG9zaW5nTm90aWZpZXIpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGIgPSBjdXJyZW50QnVmZmVyO1xuICAgICAgICAgICAgY3VycmVudEJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGIpO1xuICAgICAgICB9LCBub29wXzEubm9vcCkpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VycmVudEJ1ZmZlciA9IG51bGw7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLmJ1ZmZlciA9IGJ1ZmZlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1ZmZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYnVmZmVyQ291bnQgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBhcnJSZW1vdmVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyclJlbW92ZVwiKTtcbmZ1bmN0aW9uIGJ1ZmZlckNvdW50KGJ1ZmZlclNpemUsIHN0YXJ0QnVmZmVyRXZlcnkpIHtcbiAgICBpZiAoc3RhcnRCdWZmZXJFdmVyeSA9PT0gdm9pZCAwKSB7IHN0YXJ0QnVmZmVyRXZlcnkgPSBudWxsOyB9XG4gICAgc3RhcnRCdWZmZXJFdmVyeSA9IHN0YXJ0QnVmZmVyRXZlcnkgIT09IG51bGwgJiYgc3RhcnRCdWZmZXJFdmVyeSAhPT0gdm9pZCAwID8gc3RhcnRCdWZmZXJFdmVyeSA6IGJ1ZmZlclNpemU7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZV8xLCBfYSwgZV8yLCBfYjtcbiAgICAgICAgICAgIHZhciB0b0VtaXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGNvdW50KysgJSBzdGFydEJ1ZmZlckV2ZXJ5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVycy5wdXNoKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYnVmZmVyc18xID0gX192YWx1ZXMoYnVmZmVycyksIGJ1ZmZlcnNfMV8xID0gYnVmZmVyc18xLm5leHQoKTsgIWJ1ZmZlcnNfMV8xLmRvbmU7IGJ1ZmZlcnNfMV8xID0gYnVmZmVyc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gYnVmZmVyc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlclNpemUgPD0gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9FbWl0ID0gdG9FbWl0ICE9PSBudWxsICYmIHRvRW1pdCAhPT0gdm9pZCAwID8gdG9FbWl0IDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0VtaXQucHVzaChidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJzXzFfMSAmJiAhYnVmZmVyc18xXzEuZG9uZSAmJiAoX2EgPSBidWZmZXJzXzEucmV0dXJuKSkgX2EuY2FsbChidWZmZXJzXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9FbWl0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdG9FbWl0XzEgPSBfX3ZhbHVlcyh0b0VtaXQpLCB0b0VtaXRfMV8xID0gdG9FbWl0XzEubmV4dCgpOyAhdG9FbWl0XzFfMS5kb25lOyB0b0VtaXRfMV8xID0gdG9FbWl0XzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gdG9FbWl0XzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyclJlbW92ZV8xLmFyclJlbW92ZShidWZmZXJzLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b0VtaXRfMV8xICYmICF0b0VtaXRfMV8xLmRvbmUgJiYgKF9iID0gdG9FbWl0XzEucmV0dXJuKSkgX2IuY2FsbCh0b0VtaXRfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMywgX2E7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGJ1ZmZlcnNfMiA9IF9fdmFsdWVzKGJ1ZmZlcnMpLCBidWZmZXJzXzJfMSA9IGJ1ZmZlcnNfMi5uZXh0KCk7ICFidWZmZXJzXzJfMS5kb25lOyBidWZmZXJzXzJfMSA9IGJ1ZmZlcnNfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGJ1ZmZlcnNfMl8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcnNfMl8xICYmICFidWZmZXJzXzJfMS5kb25lICYmIChfYSA9IGJ1ZmZlcnNfMi5yZXR1cm4pKSBfYS5jYWxsKGJ1ZmZlcnNfMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidWZmZXJzID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5idWZmZXJDb3VudCA9IGJ1ZmZlckNvdW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVmZmVyQ291bnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJ1ZmZlclRpbWUgPSB2b2lkIDA7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgYXJyUmVtb3ZlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcnJSZW1vdmVcIik7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbmZ1bmN0aW9uIGJ1ZmZlclRpbWUoYnVmZmVyVGltZVNwYW4pIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIHZhciBvdGhlckFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvdGhlckFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSAoX2EgPSBhcmdzXzEucG9wU2NoZWR1bGVyKG90aGVyQXJncykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7XG4gICAgdmFyIGJ1ZmZlckNyZWF0aW9uSW50ZXJ2YWwgPSAoX2IgPSBvdGhlckFyZ3NbMF0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGw7XG4gICAgdmFyIG1heEJ1ZmZlclNpemUgPSBvdGhlckFyZ3NbMV0gfHwgSW5maW5pdHk7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGJ1ZmZlclJlY29yZHMgPSBbXTtcbiAgICAgICAgdmFyIHJlc3RhcnRPbkVtaXQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVtaXQgPSBmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gcmVjb3JkLmJ1ZmZlciwgc3VicyA9IHJlY29yZC5zdWJzO1xuICAgICAgICAgICAgc3Vicy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKGJ1ZmZlclJlY29yZHMsIHJlY29yZCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYnVmZmVyKTtcbiAgICAgICAgICAgIHJlc3RhcnRPbkVtaXQgJiYgc3RhcnRCdWZmZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHN0YXJ0QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlclJlY29yZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VicyA9IG5ldyBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChzdWJzKTtcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZF8xID0ge1xuICAgICAgICAgICAgICAgICAgICBidWZmZXI6IGJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgICAgc3Viczogc3VicyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJ1ZmZlclJlY29yZHMucHVzaChyZWNvcmRfMSk7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnMsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1pdChyZWNvcmRfMSk7IH0sIGJ1ZmZlclRpbWVTcGFuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGJ1ZmZlckNyZWF0aW9uSW50ZXJ2YWwgIT09IG51bGwgJiYgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCA+PSAwKSB7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBzdGFydEJ1ZmZlciwgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN0YXJ0T25FbWl0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGFydEJ1ZmZlcigpO1xuICAgICAgICB2YXIgYnVmZmVyVGltZVN1YnNjcmliZXIgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgICAgIHZhciByZWNvcmRzQ29weSA9IGJ1ZmZlclJlY29yZHMuc2xpY2UoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcmVjb3Jkc0NvcHlfMSA9IF9fdmFsdWVzKHJlY29yZHNDb3B5KSwgcmVjb3Jkc0NvcHlfMV8xID0gcmVjb3Jkc0NvcHlfMS5uZXh0KCk7ICFyZWNvcmRzQ29weV8xXzEuZG9uZTsgcmVjb3Jkc0NvcHlfMV8xID0gcmVjb3Jkc0NvcHlfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHJlY29yZHNDb3B5XzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IHJlY29yZC5idWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbWF4QnVmZmVyU2l6ZSA8PSBidWZmZXIubGVuZ3RoICYmIGVtaXQocmVjb3JkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZHNDb3B5XzFfMSAmJiAhcmVjb3Jkc0NvcHlfMV8xLmRvbmUgJiYgKF9hID0gcmVjb3Jkc0NvcHlfMS5yZXR1cm4pKSBfYS5jYWxsKHJlY29yZHNDb3B5XzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdoaWxlIChidWZmZXJSZWNvcmRzID09PSBudWxsIHx8IGJ1ZmZlclJlY29yZHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJ1ZmZlclJlY29yZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGJ1ZmZlclJlY29yZHMuc2hpZnQoKS5idWZmZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyVGltZVN1YnNjcmliZXIgPT09IG51bGwgfHwgYnVmZmVyVGltZVN1YnNjcmliZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJ1ZmZlclRpbWVTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGJ1ZmZlclJlY29yZHMgPSBudWxsKTsgfSk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoYnVmZmVyVGltZVN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5idWZmZXJUaW1lID0gYnVmZmVyVGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1ZmZlclRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJ1ZmZlclRvZ2dsZSA9IHZvaWQgMDtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xudmFyIGFyclJlbW92ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJyUmVtb3ZlXCIpO1xuZnVuY3Rpb24gYnVmZmVyVG9nZ2xlKG9wZW5pbmdzLCBjbG9zaW5nU2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgYnVmZmVycyA9IFtdO1xuICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20ob3BlbmluZ3MpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKG9wZW5WYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgYnVmZmVycy5wdXNoKGJ1ZmZlcik7XG4gICAgICAgICAgICB2YXIgY2xvc2luZ1N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgIHZhciBlbWl0QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGFyclJlbW92ZV8xLmFyclJlbW92ZShidWZmZXJzLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChidWZmZXIpO1xuICAgICAgICAgICAgICAgIGNsb3NpbmdTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjbG9zaW5nU3Vic2NyaXB0aW9uLmFkZChpbm5lckZyb21fMS5pbm5lckZyb20oY2xvc2luZ1NlbGVjdG9yKG9wZW5WYWx1ZSkpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZW1pdEJ1ZmZlciwgbm9vcF8xLm5vb3ApKSk7XG4gICAgICAgIH0sIG5vb3BfMS5ub29wKSk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGJ1ZmZlcnNfMSA9IF9fdmFsdWVzKGJ1ZmZlcnMpLCBidWZmZXJzXzFfMSA9IGJ1ZmZlcnNfMS5uZXh0KCk7ICFidWZmZXJzXzFfMS5kb25lOyBidWZmZXJzXzFfMSA9IGJ1ZmZlcnNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGJ1ZmZlcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJzXzFfMSAmJiAhYnVmZmVyc18xXzEuZG9uZSAmJiAoX2EgPSBidWZmZXJzXzEucmV0dXJuKSkgX2EuY2FsbChidWZmZXJzXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdoaWxlIChidWZmZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYnVmZmVycy5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5idWZmZXJUb2dnbGUgPSBidWZmZXJUb2dnbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXJUb2dnbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJ1ZmZlcldoZW4gPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gYnVmZmVyV2hlbihjbG9zaW5nU2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgYnVmZmVyID0gbnVsbDtcbiAgICAgICAgdmFyIGNsb3NpbmdTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgdmFyIG9wZW5CdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zaW5nU3Vic2NyaWJlciA9PT0gbnVsbCB8fCBjbG9zaW5nU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2xvc2luZ1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHZhciBiID0gYnVmZmVyO1xuICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICBiICYmIHN1YnNjcmliZXIubmV4dChiKTtcbiAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShjbG9zaW5nU2VsZWN0b3IoKSkuc3Vic2NyaWJlKChjbG9zaW5nU3Vic2NyaWJlciA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBvcGVuQnVmZmVyLCBub29wXzEubm9vcCkpKTtcbiAgICAgICAgfTtcbiAgICAgICAgb3BlbkJ1ZmZlcigpO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGJ1ZmZlciA9PT0gbnVsbCB8fCBidWZmZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJ1ZmZlci5wdXNoKHZhbHVlKTsgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYnVmZmVyICYmIHN1YnNjcmliZXIubmV4dChidWZmZXIpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChidWZmZXIgPSBjbG9zaW5nU3Vic2NyaWJlciA9IG51bGwpOyB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmJ1ZmZlcldoZW4gPSBidWZmZXJXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVmZmVyV2hlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2F0Y2hFcnJvciA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xuZnVuY3Rpb24gY2F0Y2hFcnJvcihzZWxlY3Rvcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgIHZhciBzeW5jVW5zdWIgPSBmYWxzZTtcbiAgICAgICAgdmFyIGhhbmRsZWRSZXN1bHQ7XG4gICAgICAgIGlubmVyU3ViID0gc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGhhbmRsZWRSZXN1bHQgPSBpbm5lckZyb21fMS5pbm5lckZyb20oc2VsZWN0b3IoZXJyLCBjYXRjaEVycm9yKHNlbGVjdG9yKShzb3VyY2UpKSk7XG4gICAgICAgICAgICBpZiAoaW5uZXJTdWIpIHtcbiAgICAgICAgICAgICAgICBpbm5lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIGlubmVyU3ViID0gbnVsbDtcbiAgICAgICAgICAgICAgICBoYW5kbGVkUmVzdWx0LnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN5bmNVbnN1YiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKHN5bmNVbnN1Yikge1xuICAgICAgICAgICAgaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGlubmVyU3ViID0gbnVsbDtcbiAgICAgICAgICAgIGhhbmRsZWRSZXN1bHQuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmNhdGNoRXJyb3IgPSBjYXRjaEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2F0Y2hFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29tYmluZUFsbCA9IHZvaWQgMDtcbnZhciBjb21iaW5lTGF0ZXN0QWxsXzEgPSByZXF1aXJlKFwiLi9jb21iaW5lTGF0ZXN0QWxsXCIpO1xuZXhwb3J0cy5jb21iaW5lQWxsID0gY29tYmluZUxhdGVzdEFsbF8xLmNvbWJpbmVMYXRlc3RBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lQWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29tYmluZUxhdGVzdCA9IHZvaWQgMDtcbnZhciBjb21iaW5lTGF0ZXN0XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgYXJnc09yQXJnQXJyYXlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NPckFyZ0FycmF5XCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG52YXIgcGlwZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvcGlwZVwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xuZnVuY3Rpb24gY29tYmluZUxhdGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yID0gYXJnc18xLnBvcFJlc3VsdFNlbGVjdG9yKGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHRTZWxlY3RvclxuICAgICAgICA/IHBpcGVfMS5waXBlKGNvbWJpbmVMYXRlc3QuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpKSwgbWFwT25lT3JNYW55QXJnc18xLm1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKVxuICAgICAgICA6IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3RfMS5jb21iaW5lTGF0ZXN0SW5pdChfX3NwcmVhZEFycmF5KFtzb3VyY2VdLCBfX3JlYWQoYXJnc09yQXJnQXJyYXlfMS5hcmdzT3JBcmdBcnJheShhcmdzKSkpKShzdWJzY3JpYmVyKTtcbiAgICAgICAgfSk7XG59XG5leHBvcnRzLmNvbWJpbmVMYXRlc3QgPSBjb21iaW5lTGF0ZXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tYmluZUxhdGVzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29tYmluZUxhdGVzdEFsbCA9IHZvaWQgMDtcbnZhciBjb21iaW5lTGF0ZXN0XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0XCIpO1xudmFyIGpvaW5BbGxJbnRlcm5hbHNfMSA9IHJlcXVpcmUoXCIuL2pvaW5BbGxJbnRlcm5hbHNcIik7XG5mdW5jdGlvbiBjb21iaW5lTGF0ZXN0QWxsKHByb2plY3QpIHtcbiAgICByZXR1cm4gam9pbkFsbEludGVybmFsc18xLmpvaW5BbGxJbnRlcm5hbHMoY29tYmluZUxhdGVzdF8xLmNvbWJpbmVMYXRlc3QsIHByb2plY3QpO1xufVxuZXhwb3J0cy5jb21iaW5lTGF0ZXN0QWxsID0gY29tYmluZUxhdGVzdEFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbWJpbmVMYXRlc3RBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb21iaW5lTGF0ZXN0V2l0aCA9IHZvaWQgMDtcbnZhciBjb21iaW5lTGF0ZXN0XzEgPSByZXF1aXJlKFwiLi9jb21iaW5lTGF0ZXN0XCIpO1xuZnVuY3Rpb24gY29tYmluZUxhdGVzdFdpdGgoKSB7XG4gICAgdmFyIG90aGVyU291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIG90aGVyU291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdF8xLmNvbWJpbmVMYXRlc3QuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQob3RoZXJTb3VyY2VzKSkpO1xufVxuZXhwb3J0cy5jb21iaW5lTGF0ZXN0V2l0aCA9IGNvbWJpbmVMYXRlc3RXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tYmluZUxhdGVzdFdpdGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb25jYXQgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBjb25jYXRBbGxfMSA9IHJlcXVpcmUoXCIuL2NvbmNhdEFsbFwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2Zyb21cIik7XG5mdW5jdGlvbiBjb25jYXQoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSBhcmdzXzEucG9wU2NoZWR1bGVyKGFyZ3MpO1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIGNvbmNhdEFsbF8xLmNvbmNhdEFsbCgpKGZyb21fMS5mcm9tKF9fc3ByZWFkQXJyYXkoW3NvdXJjZV0sIF9fcmVhZChhcmdzKSksIHNjaGVkdWxlcikpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuY29uY2F0ID0gY29uY2F0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uY2F0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb25jYXRBbGwgPSB2b2lkIDA7XG52YXIgbWVyZ2VBbGxfMSA9IHJlcXVpcmUoXCIuL21lcmdlQWxsXCIpO1xuZnVuY3Rpb24gY29uY2F0QWxsKCkge1xuICAgIHJldHVybiBtZXJnZUFsbF8xLm1lcmdlQWxsKDEpO1xufVxuZXhwb3J0cy5jb25jYXRBbGwgPSBjb25jYXRBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXRBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmNhdE1hcCA9IHZvaWQgMDtcbnZhciBtZXJnZU1hcF8xID0gcmVxdWlyZShcIi4vbWVyZ2VNYXBcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGNvbmNhdE1hcChwcm9qZWN0LCByZXN1bHRTZWxlY3Rvcikge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihyZXN1bHRTZWxlY3RvcikgPyBtZXJnZU1hcF8xLm1lcmdlTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yLCAxKSA6IG1lcmdlTWFwXzEubWVyZ2VNYXAocHJvamVjdCwgMSk7XG59XG5leHBvcnRzLmNvbmNhdE1hcCA9IGNvbmNhdE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdE1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29uY2F0TWFwVG8gPSB2b2lkIDA7XG52YXIgY29uY2F0TWFwXzEgPSByZXF1aXJlKFwiLi9jb25jYXRNYXBcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGNvbmNhdE1hcFRvKGlubmVyT2JzZXJ2YWJsZSwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ocmVzdWx0U2VsZWN0b3IpID8gY29uY2F0TWFwXzEuY29uY2F0TWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlubmVyT2JzZXJ2YWJsZTsgfSwgcmVzdWx0U2VsZWN0b3IpIDogY29uY2F0TWFwXzEuY29uY2F0TWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlubmVyT2JzZXJ2YWJsZTsgfSk7XG59XG5leHBvcnRzLmNvbmNhdE1hcFRvID0gY29uY2F0TWFwVG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXRNYXBUby5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmNhdFdpdGggPSB2b2lkIDA7XG52YXIgY29uY2F0XzEgPSByZXF1aXJlKFwiLi9jb25jYXRcIik7XG5mdW5jdGlvbiBjb25jYXRXaXRoKCkge1xuICAgIHZhciBvdGhlclNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvdGhlclNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmNhdF8xLmNvbmNhdC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChvdGhlclNvdXJjZXMpKSk7XG59XG5leHBvcnRzLmNvbmNhdFdpdGggPSBjb25jYXRXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uY2F0V2l0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29ubmVjdCA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGZyb21TdWJzY3JpYmFibGVfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2Zyb21TdWJzY3JpYmFibGVcIik7XG52YXIgREVGQVVMVF9DT05GSUcgPSB7XG4gICAgY29ubmVjdG9yOiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3ViamVjdF8xLlN1YmplY3QoKTsgfSxcbn07XG5mdW5jdGlvbiBjb25uZWN0KHNlbGVjdG9yLCBjb25maWcpIHtcbiAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0gREVGQVVMVF9DT05GSUc7IH1cbiAgICB2YXIgY29ubmVjdG9yID0gY29uZmlnLmNvbm5lY3RvcjtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3ViamVjdCA9IGNvbm5lY3RvcigpO1xuICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oc2VsZWN0b3IoZnJvbVN1YnNjcmliYWJsZV8xLmZyb21TdWJzY3JpYmFibGUoc3ViamVjdCkpKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIHN1YnNjcmliZXIuYWRkKHNvdXJjZS5zdWJzY3JpYmUoc3ViamVjdCkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5jb25uZWN0ID0gY29ubmVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbm5lY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvdW50ID0gdm9pZCAwO1xudmFyIHJlZHVjZV8xID0gcmVxdWlyZShcIi4vcmVkdWNlXCIpO1xuZnVuY3Rpb24gY291bnQocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIHJlZHVjZV8xLnJlZHVjZShmdW5jdGlvbiAodG90YWwsIHZhbHVlLCBpKSB7IHJldHVybiAoIXByZWRpY2F0ZSB8fCBwcmVkaWNhdGUodmFsdWUsIGkpID8gdG90YWwgKyAxIDogdG90YWwpOyB9LCAwKTtcbn1cbmV4cG9ydHMuY291bnQgPSBjb3VudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvdW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWJvdW5jZSA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiBkZWJvdW5jZShkdXJhdGlvblNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIHZhciBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICB2YXIgZHVyYXRpb25TdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgdmFyIGVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkdXJhdGlvblN1YnNjcmliZXIgPT09IG51bGwgfHwgZHVyYXRpb25TdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkdXJhdGlvblN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGR1cmF0aW9uU3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxhc3RWYWx1ZTtcbiAgICAgICAgICAgICAgICBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZHVyYXRpb25TdWJzY3JpYmVyID09PSBudWxsIHx8IGR1cmF0aW9uU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZHVyYXRpb25TdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGR1cmF0aW9uU3Vic2NyaWJlciA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBlbWl0LCBub29wXzEubm9vcCk7XG4gICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oZHVyYXRpb25TZWxlY3Rvcih2YWx1ZSkpLnN1YnNjcmliZShkdXJhdGlvblN1YnNjcmliZXIpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbWl0KCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGFzdFZhbHVlID0gZHVyYXRpb25TdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5kZWJvdW5jZSA9IGRlYm91bmNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlYm91bmNlVGltZSA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gZGVib3VuY2VUaW1lKGR1ZVRpbWUsIHNjaGVkdWxlcikge1xuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSBhc3luY18xLmFzeW5jU2NoZWR1bGVyOyB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGFjdGl2ZVRhc2sgPSBudWxsO1xuICAgICAgICB2YXIgbGFzdFZhbHVlID0gbnVsbDtcbiAgICAgICAgdmFyIGxhc3RUaW1lID0gbnVsbDtcbiAgICAgICAgdmFyIGVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYWN0aXZlVGFzaykge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhc2sudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVUYXNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBsYXN0VmFsdWU7XG4gICAgICAgICAgICAgICAgbGFzdFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBlbWl0V2hlbklkbGUoKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0VGltZSA9IGxhc3RUaW1lICsgZHVlVGltZTtcbiAgICAgICAgICAgIHZhciBub3cgPSBzY2hlZHVsZXIubm93KCk7XG4gICAgICAgICAgICBpZiAobm93IDwgdGFyZ2V0VGltZSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhc2sgPSB0aGlzLnNjaGVkdWxlKHVuZGVmaW5lZCwgdGFyZ2V0VGltZSAtIG5vdyk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQoYWN0aXZlVGFzayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW1pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgbGFzdFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBsYXN0VGltZSA9IHNjaGVkdWxlci5ub3coKTtcbiAgICAgICAgICAgIGlmICghYWN0aXZlVGFzaykge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhc2sgPSBzY2hlZHVsZXIuc2NoZWR1bGUoZW1pdFdoZW5JZGxlLCBkdWVUaW1lKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChhY3RpdmVUYXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZW1pdCgpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IGFjdGl2ZVRhc2sgPSBudWxsO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlYm91bmNlVGltZSA9IGRlYm91bmNlVGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYm91bmNlVGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdElmRW1wdHkgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGRlZmF1bHRJZkVtcHR5KGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghaGFzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5kZWZhdWx0SWZFbXB0eSA9IGRlZmF1bHRJZkVtcHR5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdElmRW1wdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlbGF5ID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIGRlbGF5V2hlbl8xID0gcmVxdWlyZShcIi4vZGVsYXlXaGVuXCIpO1xudmFyIHRpbWVyXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS90aW1lclwiKTtcbmZ1bmN0aW9uIGRlbGF5KGR1ZSwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICB2YXIgZHVyYXRpb24gPSB0aW1lcl8xLnRpbWVyKGR1ZSwgc2NoZWR1bGVyKTtcbiAgICByZXR1cm4gZGVsYXlXaGVuXzEuZGVsYXlXaGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGR1cmF0aW9uOyB9KTtcbn1cbmV4cG9ydHMuZGVsYXkgPSBkZWxheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlbGF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWxheVdoZW4gPSB2b2lkIDA7XG52YXIgY29uY2F0XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9jb25jYXRcIik7XG52YXIgdGFrZV8xID0gcmVxdWlyZShcIi4vdGFrZVwiKTtcbnZhciBpZ25vcmVFbGVtZW50c18xID0gcmVxdWlyZShcIi4vaWdub3JlRWxlbWVudHNcIik7XG52YXIgbWFwVG9fMSA9IHJlcXVpcmUoXCIuL21hcFRvXCIpO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi9tZXJnZU1hcFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbmZ1bmN0aW9uIGRlbGF5V2hlbihkZWxheUR1cmF0aW9uU2VsZWN0b3IsIHN1YnNjcmlwdGlvbkRlbGF5KSB7XG4gICAgaWYgKHN1YnNjcmlwdGlvbkRlbGF5KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uY2F0XzEuY29uY2F0KHN1YnNjcmlwdGlvbkRlbGF5LnBpcGUodGFrZV8xLnRha2UoMSksIGlnbm9yZUVsZW1lbnRzXzEuaWdub3JlRWxlbWVudHMoKSksIHNvdXJjZS5waXBlKGRlbGF5V2hlbihkZWxheUR1cmF0aW9uU2VsZWN0b3IpKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBtZXJnZU1hcF8xLm1lcmdlTWFwKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHsgcmV0dXJuIGlubmVyRnJvbV8xLmlubmVyRnJvbShkZWxheUR1cmF0aW9uU2VsZWN0b3IodmFsdWUsIGluZGV4KSkucGlwZSh0YWtlXzEudGFrZSgxKSwgbWFwVG9fMS5tYXBUbyh2YWx1ZSkpOyB9KTtcbn1cbmV4cG9ydHMuZGVsYXlXaGVuID0gZGVsYXlXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVsYXlXaGVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZW1hdGVyaWFsaXplID0gdm9pZCAwO1xudmFyIE5vdGlmaWNhdGlvbl8xID0gcmVxdWlyZShcIi4uL05vdGlmaWNhdGlvblwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gZGVtYXRlcmlhbGl6ZSgpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAobm90aWZpY2F0aW9uKSB7IHJldHVybiBOb3RpZmljYXRpb25fMS5vYnNlcnZlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcik7IH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVtYXRlcmlhbGl6ZSA9IGRlbWF0ZXJpYWxpemU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZW1hdGVyaWFsaXplLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kaXN0aW5jdCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIG5vb3BfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vb3BcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG5mdW5jdGlvbiBkaXN0aW5jdChrZXlTZWxlY3RvciwgZmx1c2hlcykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBkaXN0aW5jdEtleXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleVNlbGVjdG9yID8ga2V5U2VsZWN0b3IodmFsdWUpIDogdmFsdWU7XG4gICAgICAgICAgICBpZiAoIWRpc3RpbmN0S2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIGRpc3RpbmN0S2V5cy5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIGZsdXNoZXMgJiYgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGZsdXNoZXMpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZGlzdGluY3RLZXlzLmNsZWFyKCk7IH0sIG5vb3BfMS5ub29wKSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRpc3RpbmN0ID0gZGlzdGluY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXN0aW5jdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGlzdGluY3RVbnRpbENoYW5nZWQgPSB2b2lkIDA7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBkaXN0aW5jdFVudGlsQ2hhbmdlZChjb21wYXJhdG9yLCBrZXlTZWxlY3Rvcikge1xuICAgIGlmIChrZXlTZWxlY3RvciA9PT0gdm9pZCAwKSB7IGtleVNlbGVjdG9yID0gaWRlbnRpdHlfMS5pZGVudGl0eTsgfVxuICAgIGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yICE9PSBudWxsICYmIGNvbXBhcmF0b3IgIT09IHZvaWQgMCA/IGNvbXBhcmF0b3IgOiBkZWZhdWx0Q29tcGFyZTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgcHJldmlvdXNLZXk7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlTZWxlY3Rvcih2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmlyc3QgfHwgIWNvbXBhcmF0b3IocHJldmlvdXNLZXksIGN1cnJlbnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c0tleSA9IGN1cnJlbnRLZXk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5kaXN0aW5jdFVudGlsQ2hhbmdlZCA9IGRpc3RpbmN0VW50aWxDaGFuZ2VkO1xuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmUoYSwgYikge1xuICAgIHJldHVybiBhID09PSBiO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlzdGluY3RVbnRpbENoYW5nZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkID0gdm9pZCAwO1xudmFyIGRpc3RpbmN0VW50aWxDaGFuZ2VkXzEgPSByZXF1aXJlKFwiLi9kaXN0aW5jdFVudGlsQ2hhbmdlZFwiKTtcbmZ1bmN0aW9uIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkKGtleSwgY29tcGFyZSkge1xuICAgIHJldHVybiBkaXN0aW5jdFVudGlsQ2hhbmdlZF8xLmRpc3RpbmN0VW50aWxDaGFuZ2VkKGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiAoY29tcGFyZSA/IGNvbXBhcmUoeFtrZXldLCB5W2tleV0pIDogeFtrZXldID09PSB5W2tleV0pOyB9KTtcbn1cbmV4cG9ydHMuZGlzdGluY3RVbnRpbEtleUNoYW5nZWQgPSBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5lbGVtZW50QXQgPSB2b2lkIDA7XG52YXIgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXCIpO1xudmFyIGZpbHRlcl8xID0gcmVxdWlyZShcIi4vZmlsdGVyXCIpO1xudmFyIHRocm93SWZFbXB0eV8xID0gcmVxdWlyZShcIi4vdGhyb3dJZkVtcHR5XCIpO1xudmFyIGRlZmF1bHRJZkVtcHR5XzEgPSByZXF1aXJlKFwiLi9kZWZhdWx0SWZFbXB0eVwiKTtcbnZhciB0YWtlXzEgPSByZXF1aXJlKFwiLi90YWtlXCIpO1xuZnVuY3Rpb24gZWxlbWVudEF0KGluZGV4LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcl8xLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBoYXNEZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID49IDI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5waXBlKGZpbHRlcl8xLmZpbHRlcihmdW5jdGlvbiAodiwgaSkgeyByZXR1cm4gaSA9PT0gaW5kZXg7IH0pLCB0YWtlXzEudGFrZSgxKSwgaGFzRGVmYXVsdFZhbHVlID8gZGVmYXVsdElmRW1wdHlfMS5kZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpIDogdGhyb3dJZkVtcHR5XzEudGhyb3dJZkVtcHR5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcl8xLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yKCk7IH0pKTtcbiAgICB9O1xufVxuZXhwb3J0cy5lbGVtZW50QXQgPSBlbGVtZW50QXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbGVtZW50QXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5lbmRXaXRoID0gdm9pZCAwO1xudmFyIGNvbmNhdF8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvY29uY2F0XCIpO1xudmFyIG9mXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9vZlwiKTtcbmZ1bmN0aW9uIGVuZFdpdGgoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkgeyByZXR1cm4gY29uY2F0XzEuY29uY2F0KHNvdXJjZSwgb2ZfMS5vZi5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZCh2YWx1ZXMpKSkpOyB9O1xufVxuZXhwb3J0cy5lbmRXaXRoID0gZW5kV2l0aDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVuZFdpdGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV2ZXJ5ID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBldmVyeShwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KyssIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmV2ZXJ5ID0gZXZlcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXhoYXVzdCA9IHZvaWQgMDtcbnZhciBleGhhdXN0QWxsXzEgPSByZXF1aXJlKFwiLi9leGhhdXN0QWxsXCIpO1xuZXhwb3J0cy5leGhhdXN0ID0gZXhoYXVzdEFsbF8xLmV4aGF1c3RBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGhhdXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leGhhdXN0QWxsID0gdm9pZCAwO1xudmFyIGV4aGF1c3RNYXBfMSA9IHJlcXVpcmUoXCIuL2V4aGF1c3RNYXBcIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xuZnVuY3Rpb24gZXhoYXVzdEFsbCgpIHtcbiAgICByZXR1cm4gZXhoYXVzdE1hcF8xLmV4aGF1c3RNYXAoaWRlbnRpdHlfMS5pZGVudGl0eSk7XG59XG5leHBvcnRzLmV4aGF1c3RBbGwgPSBleGhhdXN0QWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhoYXVzdEFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXhoYXVzdE1hcCA9IHZvaWQgMDtcbnZhciBtYXBfMSA9IHJlcXVpcmUoXCIuL21hcFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gZXhoYXVzdE1hcChwcm9qZWN0LCByZXN1bHRTZWxlY3Rvcikge1xuICAgIGlmIChyZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5waXBlKGV4aGF1c3RNYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIGlubmVyRnJvbV8xLmlubmVyRnJvbShwcm9qZWN0KGEsIGkpKS5waXBlKG1hcF8xLm1hcChmdW5jdGlvbiAoYiwgaWkpIHsgcmV0dXJuIHJlc3VsdFNlbGVjdG9yKGEsIGIsIGksIGlpKTsgfSkpOyB9KSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChvdXRlclZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIWlubmVyU3ViKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWIgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyU3ViID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZSAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHByb2plY3Qob3V0ZXJWYWx1ZSwgaW5kZXgrKykpLnN1YnNjcmliZShpbm5lclN1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgIWlubmVyU3ViICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5leGhhdXN0TWFwID0gZXhoYXVzdE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4aGF1c3RNYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4cGFuZCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIG1lcmdlSW50ZXJuYWxzXzEgPSByZXF1aXJlKFwiLi9tZXJnZUludGVybmFsc1wiKTtcbmZ1bmN0aW9uIGV4cGFuZChwcm9qZWN0LCBjb25jdXJyZW50LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBJbmZpbml0eTsgfVxuICAgIGNvbmN1cnJlbnQgPSAoY29uY3VycmVudCB8fCAwKSA8IDEgPyBJbmZpbml0eSA6IGNvbmN1cnJlbnQ7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlSW50ZXJuYWxzXzEubWVyZ2VJbnRlcm5hbHMoc291cmNlLCBzdWJzY3JpYmVyLCBwcm9qZWN0LCBjb25jdXJyZW50LCB1bmRlZmluZWQsIHRydWUsIHNjaGVkdWxlcik7XG4gICAgfSk7XG59XG5leHBvcnRzLmV4cGFuZCA9IGV4cGFuZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4cGFuZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmlsdGVyID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgrKykgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTsgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZpbmFsaXplID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG5mdW5jdGlvbiBmaW5hbGl6ZShjYWxsYmFjaykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQoY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmZpbmFsaXplID0gZmluYWxpemU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maW5hbGl6ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlRmluZCA9IGV4cG9ydHMuZmluZCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gZmluZChwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoY3JlYXRlRmluZChwcmVkaWNhdGUsIHRoaXNBcmcsICd2YWx1ZScpKTtcbn1cbmV4cG9ydHMuZmluZCA9IGZpbmQ7XG5mdW5jdGlvbiBjcmVhdGVGaW5kKHByZWRpY2F0ZSwgdGhpc0FyZywgZW1pdCkge1xuICAgIHZhciBmaW5kSW5kZXggPSBlbWl0ID09PSAnaW5kZXgnO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGkgPSBpbmRleCsrO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZpbmRJbmRleCA/IGkgOiB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmluZEluZGV4ID8gLTEgOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuY3JlYXRlRmluZCA9IGNyZWF0ZUZpbmQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maW5kLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5maW5kSW5kZXggPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBmaW5kXzEgPSByZXF1aXJlKFwiLi9maW5kXCIpO1xuZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmaW5kXzEuY3JlYXRlRmluZChwcmVkaWNhdGUsIHRoaXNBcmcsICdpbmRleCcpKTtcbn1cbmV4cG9ydHMuZmluZEluZGV4ID0gZmluZEluZGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmluZEluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5maXJzdCA9IHZvaWQgMDtcbnZhciBFbXB0eUVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9FbXB0eUVycm9yXCIpO1xudmFyIGZpbHRlcl8xID0gcmVxdWlyZShcIi4vZmlsdGVyXCIpO1xudmFyIHRha2VfMSA9IHJlcXVpcmUoXCIuL3Rha2VcIik7XG52YXIgZGVmYXVsdElmRW1wdHlfMSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRJZkVtcHR5XCIpO1xudmFyIHRocm93SWZFbXB0eV8xID0gcmVxdWlyZShcIi4vdGhyb3dJZkVtcHR5XCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbmZ1bmN0aW9uIGZpcnN0KHByZWRpY2F0ZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgdmFyIGhhc0RlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnBpcGUocHJlZGljYXRlID8gZmlsdGVyXzEuZmlsdGVyKGZ1bmN0aW9uICh2LCBpKSB7IHJldHVybiBwcmVkaWNhdGUodiwgaSwgc291cmNlKTsgfSkgOiBpZGVudGl0eV8xLmlkZW50aXR5LCB0YWtlXzEudGFrZSgxKSwgaGFzRGVmYXVsdFZhbHVlID8gZGVmYXVsdElmRW1wdHlfMS5kZWZhdWx0SWZFbXB0eShkZWZhdWx0VmFsdWUpIDogdGhyb3dJZkVtcHR5XzEudGhyb3dJZkVtcHR5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBFbXB0eUVycm9yXzEuRW1wdHlFcnJvcigpOyB9KSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuZmlyc3QgPSBmaXJzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpcnN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mbGF0TWFwID0gdm9pZCAwO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi9tZXJnZU1hcFwiKTtcbmV4cG9ydHMuZmxhdE1hcCA9IG1lcmdlTWFwXzEubWVyZ2VNYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mbGF0TWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ncm91cEJ5ID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBncm91cEJ5KGtleVNlbGVjdG9yLCBlbGVtZW50T3JPcHRpb25zLCBkdXJhdGlvbiwgY29ubmVjdG9yKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIGlmICghZWxlbWVudE9yT3B0aW9ucyB8fCB0eXBlb2YgZWxlbWVudE9yT3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnRPck9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoZHVyYXRpb24gPSBlbGVtZW50T3JPcHRpb25zLmR1cmF0aW9uLCBlbGVtZW50ID0gZWxlbWVudE9yT3B0aW9ucy5lbGVtZW50LCBjb25uZWN0b3IgPSBlbGVtZW50T3JPcHRpb25zLmNvbm5lY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdyb3VwcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgZ3JvdXBzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgY2Ioc3Vic2NyaWJlcik7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBoYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIG5vdGlmeShmdW5jdGlvbiAoY29uc3VtZXIpIHsgcmV0dXJuIGNvbnN1bWVyLmVycm9yKGVycik7IH0pOyB9O1xuICAgICAgICB2YXIgYWN0aXZlR3JvdXBzID0gMDtcbiAgICAgICAgdmFyIHRlYXJkb3duQXR0ZW1wdGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBncm91cEJ5U291cmNlU3Vic2NyaWJlciA9IG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlfMSA9IGtleVNlbGVjdG9yKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXBfMSA9IGdyb3Vwcy5nZXQoa2V5XzEpO1xuICAgICAgICAgICAgICAgIGlmICghZ3JvdXBfMSkge1xuICAgICAgICAgICAgICAgICAgICBncm91cHMuc2V0KGtleV8xLCAoZ3JvdXBfMSA9IGNvbm5lY3RvciA/IGNvbm5lY3RvcigpIDogbmV3IFN1YmplY3RfMS5TdWJqZWN0KCkpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwZWQgPSBjcmVhdGVHcm91cGVkT2JzZXJ2YWJsZShrZXlfMSwgZ3JvdXBfMSk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChncm91cGVkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVyYXRpb25TdWJzY3JpYmVyXzEgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoZ3JvdXBfMSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwXzEuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvblN1YnNjcmliZXJfMSA9PT0gbnVsbCB8fCBkdXJhdGlvblN1YnNjcmliZXJfMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZHVyYXRpb25TdWJzY3JpYmVyXzEudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7IHJldHVybiBncm91cHMuZGVsZXRlKGtleV8xKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cEJ5U291cmNlU3Vic2NyaWJlci5hZGQoaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGR1cmF0aW9uKGdyb3VwZWQpKS5zdWJzY3JpYmUoZHVyYXRpb25TdWJzY3JpYmVyXzEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBncm91cF8xLm5leHQoZWxlbWVudCA/IGVsZW1lbnQodmFsdWUpIDogdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5vdGlmeShmdW5jdGlvbiAoY29uc3VtZXIpIHsgcmV0dXJuIGNvbnN1bWVyLmNvbXBsZXRlKCk7IH0pOyB9LCBoYW5kbGVFcnJvciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZ3JvdXBzLmNsZWFyKCk7IH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRlYXJkb3duQXR0ZW1wdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBhY3RpdmVHcm91cHMgPT09IDA7XG4gICAgICAgIH0pO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGdyb3VwQnlTb3VyY2VTdWJzY3JpYmVyKTtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlR3JvdXBlZE9ic2VydmFibGUoa2V5LCBncm91cFN1YmplY3QpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKGdyb3VwU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3VwcysrO1xuICAgICAgICAgICAgICAgIHZhciBpbm5lclN1YiA9IGdyb3VwU3ViamVjdC5zdWJzY3JpYmUoZ3JvdXBTdWJzY3JpYmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpbm5lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAtLWFjdGl2ZUdyb3VwcyA9PT0gMCAmJiB0ZWFyZG93bkF0dGVtcHRlZCAmJiBncm91cEJ5U291cmNlU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdC5rZXkgPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmdyb3VwQnkgPSBncm91cEJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z3JvdXBCeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaWdub3JlRWxlbWVudHMgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xuZnVuY3Rpb24gaWdub3JlRWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgbm9vcF8xLm5vb3ApKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuaWdub3JlRWxlbWVudHMgPSBpZ25vcmVFbGVtZW50cztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlnbm9yZUVsZW1lbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0VtcHR5ID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRW1wdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmpvaW5BbGxJbnRlcm5hbHMgPSB2b2lkIDA7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG52YXIgcGlwZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvcGlwZVwiKTtcbnZhciBtZXJnZU1hcF8xID0gcmVxdWlyZShcIi4vbWVyZ2VNYXBcIik7XG52YXIgdG9BcnJheV8xID0gcmVxdWlyZShcIi4vdG9BcnJheVwiKTtcbmZ1bmN0aW9uIGpvaW5BbGxJbnRlcm5hbHMoam9pbkZuLCBwcm9qZWN0KSB7XG4gICAgcmV0dXJuIHBpcGVfMS5waXBlKHRvQXJyYXlfMS50b0FycmF5KCksIG1lcmdlTWFwXzEubWVyZ2VNYXAoZnVuY3Rpb24gKHNvdXJjZXMpIHsgcmV0dXJuIGpvaW5Gbihzb3VyY2VzKTsgfSksIHByb2plY3QgPyBtYXBPbmVPck1hbnlBcmdzXzEubWFwT25lT3JNYW55QXJncyhwcm9qZWN0KSA6IGlkZW50aXR5XzEuaWRlbnRpdHkpO1xufVxuZXhwb3J0cy5qb2luQWxsSW50ZXJuYWxzID0gam9pbkFsbEludGVybmFscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpvaW5BbGxJbnRlcm5hbHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmxhc3QgPSB2b2lkIDA7XG52YXIgRW1wdHlFcnJvcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvRW1wdHlFcnJvclwiKTtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoXCIuL2ZpbHRlclwiKTtcbnZhciB0YWtlTGFzdF8xID0gcmVxdWlyZShcIi4vdGFrZUxhc3RcIik7XG52YXIgdGhyb3dJZkVtcHR5XzEgPSByZXF1aXJlKFwiLi90aHJvd0lmRW1wdHlcIik7XG52YXIgZGVmYXVsdElmRW1wdHlfMSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRJZkVtcHR5XCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbmZ1bmN0aW9uIGxhc3QocHJlZGljYXRlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgaGFzRGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UucGlwZShwcmVkaWNhdGUgPyBmaWx0ZXJfMS5maWx0ZXIoZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIHByZWRpY2F0ZSh2LCBpLCBzb3VyY2UpOyB9KSA6IGlkZW50aXR5XzEuaWRlbnRpdHksIHRha2VMYXN0XzEudGFrZUxhc3QoMSksIGhhc0RlZmF1bHRWYWx1ZSA/IGRlZmF1bHRJZkVtcHR5XzEuZGVmYXVsdElmRW1wdHkoZGVmYXVsdFZhbHVlKSA6IHRocm93SWZFbXB0eV8xLnRocm93SWZFbXB0eShmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRW1wdHlFcnJvcl8xLkVtcHR5RXJyb3IoKTsgfSkpO1xuICAgIH07XG59XG5leHBvcnRzLmxhc3QgPSBsYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGFzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFwID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBtYXAocHJvamVjdCwgdGhpc0FyZykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHByb2plY3QuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgrKykpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLm1hcCA9IG1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFwVG8gPSB2b2lkIDA7XG52YXIgbWFwXzEgPSByZXF1aXJlKFwiLi9tYXBcIik7XG5mdW5jdGlvbiBtYXBUbyh2YWx1ZSkge1xuICAgIHJldHVybiBtYXBfMS5tYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsdWU7IH0pO1xufVxuZXhwb3J0cy5tYXBUbyA9IG1hcFRvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwVG8uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1hdGVyaWFsaXplID0gdm9pZCAwO1xudmFyIE5vdGlmaWNhdGlvbl8xID0gcmVxdWlyZShcIi4uL05vdGlmaWNhdGlvblwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gbWF0ZXJpYWxpemUoKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoTm90aWZpY2F0aW9uXzEuTm90aWZpY2F0aW9uLmNyZWF0ZU5leHQodmFsdWUpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KE5vdGlmaWNhdGlvbl8xLk5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSgpKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KE5vdGlmaWNhdGlvbl8xLk5vdGlmaWNhdGlvbi5jcmVhdGVFcnJvcihlcnIpKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5tYXRlcmlhbGl6ZSA9IG1hdGVyaWFsaXplO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0ZXJpYWxpemUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1heCA9IHZvaWQgMDtcbnZhciByZWR1Y2VfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gbWF4KGNvbXBhcmVyKSB7XG4gICAgcmV0dXJuIHJlZHVjZV8xLnJlZHVjZShpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihjb21wYXJlcikgPyBmdW5jdGlvbiAoeCwgeSkgeyByZXR1cm4gKGNvbXBhcmVyKHgsIHkpID4gMCA/IHggOiB5KTsgfSA6IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiAoeCA+IHkgPyB4IDogeSk7IH0pO1xufVxuZXhwb3J0cy5tYXggPSBtYXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZSA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIG1lcmdlQWxsXzEgPSByZXF1aXJlKFwiLi9tZXJnZUFsbFwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2Zyb21cIik7XG5mdW5jdGlvbiBtZXJnZSgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgdmFyIGNvbmN1cnJlbnQgPSBhcmdzXzEucG9wTnVtYmVyKGFyZ3MsIEluZmluaXR5KTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBtZXJnZUFsbF8xLm1lcmdlQWxsKGNvbmN1cnJlbnQpKGZyb21fMS5mcm9tKF9fc3ByZWFkQXJyYXkoW3NvdXJjZV0sIF9fcmVhZChhcmdzKSksIHNjaGVkdWxlcikpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMubWVyZ2UgPSBtZXJnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZUFsbCA9IHZvaWQgMDtcbnZhciBtZXJnZU1hcF8xID0gcmVxdWlyZShcIi4vbWVyZ2VNYXBcIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xuZnVuY3Rpb24gbWVyZ2VBbGwoY29uY3VycmVudCkge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IEluZmluaXR5OyB9XG4gICAgcmV0dXJuIG1lcmdlTWFwXzEubWVyZ2VNYXAoaWRlbnRpdHlfMS5pZGVudGl0eSwgY29uY3VycmVudCk7XG59XG5leHBvcnRzLm1lcmdlQWxsID0gbWVyZ2VBbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZUFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVyZ2VJbnRlcm5hbHMgPSB2b2lkIDA7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgZXhlY3V0ZVNjaGVkdWxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9leGVjdXRlU2NoZWR1bGVcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQsIG9uQmVmb3JlTmV4dCwgZXhwYW5kLCBpbm5lclN1YlNjaGVkdWxlciwgYWRkaXRpb25hbEZpbmFsaXplcikge1xuICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICB2YXIgYWN0aXZlID0gMDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgdmFyIGNoZWNrQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc0NvbXBsZXRlICYmICFidWZmZXIubGVuZ3RoICYmICFhY3RpdmUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIG91dGVyTmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKGFjdGl2ZSA8IGNvbmN1cnJlbnQgPyBkb0lubmVyU3ViKHZhbHVlKSA6IGJ1ZmZlci5wdXNoKHZhbHVlKSk7IH07XG4gICAgdmFyIGRvSW5uZXJTdWIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgZXhwYW5kICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgIGFjdGl2ZSsrO1xuICAgICAgICB2YXIgaW5uZXJDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgaW5kZXgrKykpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKGlubmVyVmFsdWUpIHtcbiAgICAgICAgICAgIG9uQmVmb3JlTmV4dCA9PT0gbnVsbCB8fCBvbkJlZm9yZU5leHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uQmVmb3JlTmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIGlmIChleHBhbmQpIHtcbiAgICAgICAgICAgICAgICBvdXRlck5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlubmVyQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLS07XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlcmVkVmFsdWUgPSBidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lclN1YlNjaGVkdWxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBpbm5lclN1YlNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9Jbm5lclN1YihidWZmZXJlZFZhbHVlKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb0lubmVyU3ViKGJ1ZmZlcmVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCAmJiBhY3RpdmUgPCBjb25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIG91dGVyTmV4dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRpdGlvbmFsRmluYWxpemVyID09PSBudWxsIHx8IGFkZGl0aW9uYWxGaW5hbGl6ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFkZGl0aW9uYWxGaW5hbGl6ZXIoKTtcbiAgICB9O1xufVxuZXhwb3J0cy5tZXJnZUludGVybmFscyA9IG1lcmdlSW50ZXJuYWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VJbnRlcm5hbHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlTWFwID0gdm9pZCAwO1xudmFyIG1hcF8xID0gcmVxdWlyZShcIi4vbWFwXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgbWVyZ2VJbnRlcm5hbHNfMSA9IHJlcXVpcmUoXCIuL21lcmdlSW50ZXJuYWxzXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBtZXJnZU1hcChwcm9qZWN0LCByZXN1bHRTZWxlY3RvciwgY29uY3VycmVudCkge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IEluZmluaXR5OyB9XG4gICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHJlc3VsdFNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gbWVyZ2VNYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIG1hcF8xLm1hcChmdW5jdGlvbiAoYiwgaWkpIHsgcmV0dXJuIHJlc3VsdFNlbGVjdG9yKGEsIGIsIGksIGlpKTsgfSkoaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHByb2plY3QoYSwgaSkpKTsgfSwgY29uY3VycmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IHJlc3VsdFNlbGVjdG9yO1xuICAgIH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikgeyByZXR1cm4gbWVyZ2VJbnRlcm5hbHNfMS5tZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQpOyB9KTtcbn1cbmV4cG9ydHMubWVyZ2VNYXAgPSBtZXJnZU1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlTWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZU1hcFRvID0gdm9pZCAwO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi9tZXJnZU1hcFwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gbWVyZ2VNYXBUbyhpbm5lck9ic2VydmFibGUsIHJlc3VsdFNlbGVjdG9yLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gSW5maW5pdHk7IH1cbiAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ocmVzdWx0U2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBtZXJnZU1hcF8xLm1lcmdlTWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlubmVyT2JzZXJ2YWJsZTsgfSwgcmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdFNlbGVjdG9yID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25jdXJyZW50ID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgfVxuICAgIHJldHVybiBtZXJnZU1hcF8xLm1lcmdlTWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlubmVyT2JzZXJ2YWJsZTsgfSwgY29uY3VycmVudCk7XG59XG5leHBvcnRzLm1lcmdlTWFwVG8gPSBtZXJnZU1hcFRvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VNYXBUby5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVyZ2VTY2FuID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgbWVyZ2VJbnRlcm5hbHNfMSA9IHJlcXVpcmUoXCIuL21lcmdlSW50ZXJuYWxzXCIpO1xuZnVuY3Rpb24gbWVyZ2VTY2FuKGFjY3VtdWxhdG9yLCBzZWVkLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gSW5maW5pdHk7IH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3RhdGUgPSBzZWVkO1xuICAgICAgICByZXR1cm4gbWVyZ2VJbnRlcm5hbHNfMS5tZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHsgcmV0dXJuIGFjY3VtdWxhdG9yKHN0YXRlLCB2YWx1ZSwgaW5kZXgpOyB9LCBjb25jdXJyZW50LCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0YXRlID0gdmFsdWU7XG4gICAgICAgIH0sIGZhbHNlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChzdGF0ZSA9IG51bGwpOyB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMubWVyZ2VTY2FuID0gbWVyZ2VTY2FuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VTY2FuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVyZ2VXaXRoID0gdm9pZCAwO1xudmFyIG1lcmdlXzEgPSByZXF1aXJlKFwiLi9tZXJnZVwiKTtcbmZ1bmN0aW9uIG1lcmdlV2l0aCgpIHtcbiAgICB2YXIgb3RoZXJTb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgb3RoZXJTb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBtZXJnZV8xLm1lcmdlLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKG90aGVyU291cmNlcykpKTtcbn1cbmV4cG9ydHMubWVyZ2VXaXRoID0gbWVyZ2VXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5taW4gPSB2b2lkIDA7XG52YXIgcmVkdWNlXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2VcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIG1pbihjb21wYXJlcikge1xuICAgIHJldHVybiByZWR1Y2VfMS5yZWR1Y2UoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oY29tcGFyZXIpID8gZnVuY3Rpb24gKHgsIHkpIHsgcmV0dXJuIChjb21wYXJlcih4LCB5KSA8IDAgPyB4IDogeSk7IH0gOiBmdW5jdGlvbiAoeCwgeSkgeyByZXR1cm4gKHggPCB5ID8geCA6IHkpOyB9KTtcbn1cbmV4cG9ydHMubWluID0gbWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWluLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tdWx0aWNhc3QgPSB2b2lkIDA7XG52YXIgQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGVcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBjb25uZWN0XzEgPSByZXF1aXJlKFwiLi9jb25uZWN0XCIpO1xuZnVuY3Rpb24gbXVsdGljYXN0KHN1YmplY3RPclN1YmplY3RGYWN0b3J5LCBzZWxlY3Rvcikge1xuICAgIHZhciBzdWJqZWN0RmFjdG9yeSA9IGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHN1YmplY3RPclN1YmplY3RGYWN0b3J5KSA/IHN1YmplY3RPclN1YmplY3RGYWN0b3J5IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3ViamVjdE9yU3ViamVjdEZhY3Rvcnk7IH07XG4gICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gY29ubmVjdF8xLmNvbm5lY3Qoc2VsZWN0b3IsIHtcbiAgICAgICAgICAgIGNvbm5lY3Rvcjogc3ViamVjdEZhY3RvcnksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkgeyByZXR1cm4gbmV3IENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZShzb3VyY2UsIHN1YmplY3RGYWN0b3J5KTsgfTtcbn1cbmV4cG9ydHMubXVsdGljYXN0ID0gbXVsdGljYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGljYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vYnNlcnZlT24gPSB2b2lkIDA7XG52YXIgZXhlY3V0ZVNjaGVkdWxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9leGVjdXRlU2NoZWR1bGVcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIG9ic2VydmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9LCBkZWxheSk7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSwgZGVsYXkpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0sIGRlbGF5KTsgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5vYnNlcnZlT24gPSBvYnNlcnZlT247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlT24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IGV4cG9ydHMub25FcnJvclJlc3VtZU5leHRXaXRoID0gdm9pZCAwO1xudmFyIGFyZ3NPckFyZ0FycmF5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzT3JBcmdBcnJheVwiKTtcbnZhciBvbkVycm9yUmVzdW1lTmV4dF8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvb25FcnJvclJlc3VtZU5leHRcIik7XG5mdW5jdGlvbiBvbkVycm9yUmVzdW1lTmV4dFdpdGgoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBuZXh0U291cmNlcyA9IGFyZ3NPckFyZ0FycmF5XzEuYXJnc09yQXJnQXJyYXkoc291cmNlcyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIG9uRXJyb3JSZXN1bWVOZXh0XzEub25FcnJvclJlc3VtZU5leHQuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtzb3VyY2VdLCBfX3JlYWQobmV4dFNvdXJjZXMpKSk7IH07XG59XG5leHBvcnRzLm9uRXJyb3JSZXN1bWVOZXh0V2l0aCA9IG9uRXJyb3JSZXN1bWVOZXh0V2l0aDtcbmV4cG9ydHMub25FcnJvclJlc3VtZU5leHQgPSBvbkVycm9yUmVzdW1lTmV4dFdpdGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vbkVycm9yUmVzdW1lTmV4dFdpdGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBhaXJ3aXNlID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBwYWlyd2lzZSgpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgcHJldjtcbiAgICAgICAgdmFyIGhhc1ByZXYgPSBmYWxzZTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcCA9IHByZXY7XG4gICAgICAgICAgICBwcmV2ID0gdmFsdWU7XG4gICAgICAgICAgICBoYXNQcmV2ICYmIHN1YnNjcmliZXIubmV4dChbcCwgdmFsdWVdKTtcbiAgICAgICAgICAgIGhhc1ByZXYgPSB0cnVlO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnBhaXJ3aXNlID0gcGFpcndpc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWlyd2lzZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGx1Y2sgPSB2b2lkIDA7XG52YXIgbWFwXzEgPSByZXF1aXJlKFwiLi9tYXBcIik7XG5mdW5jdGlvbiBwbHVjaygpIHtcbiAgICB2YXIgcHJvcGVydGllcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHByb3BlcnRpZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsaXN0IG9mIHByb3BlcnRpZXMgY2Fubm90IGJlIGVtcHR5LicpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwXzEubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHZhciBjdXJyZW50UHJvcCA9IHg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwID0gY3VycmVudFByb3AgPT09IG51bGwgfHwgY3VycmVudFByb3AgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1cnJlbnRQcm9wW3Byb3BlcnRpZXNbaV1dO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9wID0gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9wO1xuICAgIH0pO1xufVxuZXhwb3J0cy5wbHVjayA9IHBsdWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGx1Y2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnB1Ymxpc2ggPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1N1YmplY3RcIik7XG52YXIgbXVsdGljYXN0XzEgPSByZXF1aXJlKFwiLi9tdWx0aWNhc3RcIik7XG52YXIgY29ubmVjdF8xID0gcmVxdWlyZShcIi4vY29ubmVjdFwiKTtcbmZ1bmN0aW9uIHB1Ymxpc2goc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gc2VsZWN0b3IgPyBmdW5jdGlvbiAoc291cmNlKSB7IHJldHVybiBjb25uZWN0XzEuY29ubmVjdChzZWxlY3Rvcikoc291cmNlKTsgfSA6IGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIG11bHRpY2FzdF8xLm11bHRpY2FzdChuZXcgU3ViamVjdF8xLlN1YmplY3QoKSkoc291cmNlKTsgfTtcbn1cbmV4cG9ydHMucHVibGlzaCA9IHB1Ymxpc2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdWJsaXNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wdWJsaXNoQmVoYXZpb3IgPSB2b2lkIDA7XG52YXIgQmVoYXZpb3JTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vQmVoYXZpb3JTdWJqZWN0XCIpO1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlXCIpO1xuZnVuY3Rpb24gcHVibGlzaEJlaGF2aW9yKGluaXRpYWxWYWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdF8xLkJlaGF2aW9yU3ViamVjdChpbml0aWFsVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZShzb3VyY2UsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YmplY3Q7IH0pO1xuICAgIH07XG59XG5leHBvcnRzLnB1Ymxpc2hCZWhhdmlvciA9IHB1Ymxpc2hCZWhhdmlvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1Ymxpc2hCZWhhdmlvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucHVibGlzaExhc3QgPSB2b2lkIDA7XG52YXIgQXN5bmNTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vQXN5bmNTdWJqZWN0XCIpO1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlXCIpO1xuZnVuY3Rpb24gcHVibGlzaExhc3QoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0XzEuQXN5bmNTdWJqZWN0KCk7XG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEuQ29ubmVjdGFibGVPYnNlcnZhYmxlKHNvdXJjZSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3ViamVjdDsgfSk7XG4gICAgfTtcbn1cbmV4cG9ydHMucHVibGlzaExhc3QgPSBwdWJsaXNoTGFzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1Ymxpc2hMYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wdWJsaXNoUmVwbGF5ID0gdm9pZCAwO1xudmFyIFJlcGxheVN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9SZXBsYXlTdWJqZWN0XCIpO1xudmFyIG11bHRpY2FzdF8xID0gcmVxdWlyZShcIi4vbXVsdGljYXN0XCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBwdWJsaXNoUmVwbGF5KGJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHNlbGVjdG9yT3JTY2hlZHVsZXIsIHRpbWVzdGFtcFByb3ZpZGVyKSB7XG4gICAgaWYgKHNlbGVjdG9yT3JTY2hlZHVsZXIgJiYgIWlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHNlbGVjdG9yT3JTY2hlZHVsZXIpKSB7XG4gICAgICAgIHRpbWVzdGFtcFByb3ZpZGVyID0gc2VsZWN0b3JPclNjaGVkdWxlcjtcbiAgICB9XG4gICAgdmFyIHNlbGVjdG9yID0gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oc2VsZWN0b3JPclNjaGVkdWxlcikgPyBzZWxlY3Rvck9yU2NoZWR1bGVyIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7IHJldHVybiBtdWx0aWNhc3RfMS5tdWx0aWNhc3QobmV3IFJlcGxheVN1YmplY3RfMS5SZXBsYXlTdWJqZWN0KGJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHRpbWVzdGFtcFByb3ZpZGVyKSwgc2VsZWN0b3IpKHNvdXJjZSk7IH07XG59XG5leHBvcnRzLnB1Ymxpc2hSZXBsYXkgPSBwdWJsaXNoUmVwbGF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVibGlzaFJlcGxheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJhY2VXaXRoID0gdm9pZCAwO1xudmFyIHJhY2VfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL3JhY2VcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG5mdW5jdGlvbiByYWNlV2l0aCgpIHtcbiAgICB2YXIgb3RoZXJTb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgb3RoZXJTb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiAhb3RoZXJTb3VyY2VzLmxlbmd0aFxuICAgICAgICA/IGlkZW50aXR5XzEuaWRlbnRpdHlcbiAgICAgICAgOiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICByYWNlXzEucmFjZUluaXQoX19zcHJlYWRBcnJheShbc291cmNlXSwgX19yZWFkKG90aGVyU291cmNlcykpKShzdWJzY3JpYmVyKTtcbiAgICAgICAgfSk7XG59XG5leHBvcnRzLnJhY2VXaXRoID0gcmFjZVdpdGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYWNlV2l0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVkdWNlID0gdm9pZCAwO1xudmFyIHNjYW5JbnRlcm5hbHNfMSA9IHJlcXVpcmUoXCIuL3NjYW5JbnRlcm5hbHNcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbmZ1bmN0aW9uIHJlZHVjZShhY2N1bXVsYXRvciwgc2VlZCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShzY2FuSW50ZXJuYWxzXzEuc2NhbkludGVybmFscyhhY2N1bXVsYXRvciwgc2VlZCwgYXJndW1lbnRzLmxlbmd0aCA+PSAyLCBmYWxzZSwgdHJ1ZSkpO1xufVxuZXhwb3J0cy5yZWR1Y2UgPSByZWR1Y2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWR1Y2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlZkNvdW50ID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiByZWZDb3VudCgpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHNvdXJjZS5fcmVmQ291bnQrKztcbiAgICAgICAgdmFyIHJlZkNvdW50ZXIgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzb3VyY2UgfHwgc291cmNlLl9yZWZDb3VudCA8PSAwIHx8IDAgPCAtLXNvdXJjZS5fcmVmQ291bnQpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2hhcmVkQ29ubmVjdGlvbiA9IHNvdXJjZS5fY29ubmVjdGlvbjtcbiAgICAgICAgICAgIHZhciBjb25uID0gY29ubmVjdGlvbjtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgaWYgKHNoYXJlZENvbm5lY3Rpb24gJiYgKCFjb25uIHx8IHNoYXJlZENvbm5lY3Rpb24gPT09IGNvbm4pKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVkQ29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShyZWZDb3VudGVyKTtcbiAgICAgICAgaWYgKCFyZWZDb3VudGVyLmNsb3NlZCkge1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IHNvdXJjZS5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMucmVmQ291bnQgPSByZWZDb3VudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZkNvdW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXBlYXQgPSB2b2lkIDA7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2VtcHR5XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL3RpbWVyXCIpO1xuZnVuY3Rpb24gcmVwZWF0KGNvdW50T3JDb25maWcpIHtcbiAgICB2YXIgX2E7XG4gICAgdmFyIGNvdW50ID0gSW5maW5pdHk7XG4gICAgdmFyIGRlbGF5O1xuICAgIGlmIChjb3VudE9yQ29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb3VudE9yQ29uZmlnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgKF9hID0gY291bnRPckNvbmZpZy5jb3VudCwgY291bnQgPSBfYSA9PT0gdm9pZCAwID8gSW5maW5pdHkgOiBfYSwgZGVsYXkgPSBjb3VudE9yQ29uZmlnLmRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50ID0gY291bnRPckNvbmZpZztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQgPD0gMFxuICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtcHR5XzEuRU1QVFk7IH1cbiAgICAgICAgOiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc29GYXIgPSAwO1xuICAgICAgICAgICAgdmFyIHNvdXJjZVN1YjtcbiAgICAgICAgICAgIHZhciByZXN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VTdWIgPT09IG51bGwgfHwgc291cmNlU3ViID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzb3VyY2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBzb3VyY2VTdWIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChkZWxheSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmllciA9IHR5cGVvZiBkZWxheSA9PT0gJ251bWJlcicgPyB0aW1lcl8xLnRpbWVyKGRlbGF5KSA6IGlubmVyRnJvbV8xLmlubmVyRnJvbShkZWxheShzb0ZhcikpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpZXJTdWJzY3JpYmVyXzEgPSBPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpZXJTdWJzY3JpYmVyXzEudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZVRvU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBub3RpZmllci5zdWJzY3JpYmUobm90aWZpZXJTdWJzY3JpYmVyXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlVG9Tb3VyY2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHN1YnNjcmliZVRvU291cmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzeW5jVW5zdWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzb3VyY2VTdWIgPSBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCsrc29GYXIgPCBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW5jVW5zdWIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGlmIChzeW5jVW5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3Vic2NyaWJlVG9Tb3VyY2UoKTtcbiAgICAgICAgfSk7XG59XG5leHBvcnRzLnJlcGVhdCA9IHJlcGVhdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcGVhdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVwZWF0V2hlbiA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gcmVwZWF0V2hlbihub3RpZmllcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbm5lclN1YjtcbiAgICAgICAgdmFyIHN5bmNSZXN1YiA9IGZhbHNlO1xuICAgICAgICB2YXIgY29tcGxldGlvbnMkO1xuICAgICAgICB2YXIgaXNOb3RpZmllckNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHZhciBpc01haW5Db21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzTWFpbkNvbXBsZXRlICYmIGlzTm90aWZpZXJDb21wbGV0ZSAmJiAoc3Vic2NyaWJlci5jb21wbGV0ZSgpLCB0cnVlKTsgfTtcbiAgICAgICAgdmFyIGdldENvbXBsZXRpb25TdWJqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFjb21wbGV0aW9ucyQpIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0aW9ucyQgPSBuZXcgU3ViamVjdF8xLlN1YmplY3QoKTtcbiAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20obm90aWZpZXIoY29tcGxldGlvbnMkKSkuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbm5lclN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlRm9yUmVwZWF0V2hlbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3luY1Jlc3ViID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNOb3RpZmllckNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0aW9ucyQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzdWJzY3JpYmVGb3JSZXBlYXRXaGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXNNYWluQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlubmVyU3ViID0gc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXNNYWluQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICFjaGVja0NvbXBsZXRlKCkgJiYgZ2V0Q29tcGxldGlvblN1YmplY3QoKS5uZXh0KCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBpZiAoc3luY1Jlc3ViKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBpbm5lclN1YiA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3luY1Jlc3ViID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlRm9yUmVwZWF0V2hlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzdWJzY3JpYmVGb3JSZXBlYXRXaGVuKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnJlcGVhdFdoZW4gPSByZXBlYXRXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVwZWF0V2hlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmV0cnkgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG52YXIgdGltZXJfMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL3RpbWVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gcmV0cnkoY29uZmlnT3JDb3VudCkge1xuICAgIGlmIChjb25maWdPckNvdW50ID09PSB2b2lkIDApIHsgY29uZmlnT3JDb3VudCA9IEluZmluaXR5OyB9XG4gICAgdmFyIGNvbmZpZztcbiAgICBpZiAoY29uZmlnT3JDb3VudCAmJiB0eXBlb2YgY29uZmlnT3JDb3VudCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnT3JDb3VudDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGNvdW50OiBjb25maWdPckNvdW50LFxuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgX2EgPSBjb25maWcuY291bnQsIGNvdW50ID0gX2EgPT09IHZvaWQgMCA/IEluZmluaXR5IDogX2EsIGRlbGF5ID0gY29uZmlnLmRlbGF5LCBfYiA9IGNvbmZpZy5yZXNldE9uU3VjY2VzcywgcmVzZXRPblN1Y2Nlc3MgPSBfYiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYjtcbiAgICByZXR1cm4gY291bnQgPD0gMFxuICAgICAgICA/IGlkZW50aXR5XzEuaWRlbnRpdHlcbiAgICAgICAgOiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc29GYXIgPSAwO1xuICAgICAgICAgICAgdmFyIGlubmVyU3ViO1xuICAgICAgICAgICAgdmFyIHN1YnNjcmliZUZvclJldHJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzeW5jVW5zdWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbm5lclN1YiA9IHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzZXRPblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvRmFyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc29GYXIrKyA8IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJTdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJTdWIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVGb3JSZXRyeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3luY1Vuc3ViID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpZXIgPSB0eXBlb2YgZGVsYXkgPT09ICdudW1iZXInID8gdGltZXJfMS50aW1lcihkZWxheSkgOiBpbm5lckZyb21fMS5pbm5lckZyb20oZGVsYXkoZXJyLCBzb0ZhcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmllclN1YnNjcmliZXJfMSA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWVyU3Vic2NyaWJlcl8xLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3ViXzEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RpZmllci5zdWJzY3JpYmUobm90aWZpZXJTdWJzY3JpYmVyXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWJfMSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGlmIChzeW5jVW5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJTdWIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVGb3JSZXRyeSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzdWJzY3JpYmVGb3JSZXRyeSgpO1xuICAgICAgICB9KTtcbn1cbmV4cG9ydHMucmV0cnkgPSByZXRyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJldHJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXRyeVdoZW4gPSB2b2lkIDA7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1N1YmplY3RcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHJldHJ5V2hlbihub3RpZmllcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbm5lclN1YjtcbiAgICAgICAgdmFyIHN5bmNSZXN1YiA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JzJDtcbiAgICAgICAgdmFyIHN1YnNjcmliZUZvclJldHJ5V2hlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlubmVyU3ViID0gc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9ycyQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzJCA9IG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20obm90aWZpZXIoZXJyb3JzJCkpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlubmVyU3ViID8gc3Vic2NyaWJlRm9yUmV0cnlXaGVuKCkgOiAoc3luY1Jlc3ViID0gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycyQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzJC5uZXh0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgaWYgKHN5bmNSZXN1Yikge1xuICAgICAgICAgICAgICAgIGlubmVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN5bmNSZXN1YiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZUZvclJldHJ5V2hlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzdWJzY3JpYmVGb3JSZXRyeVdoZW4oKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmV0cnlXaGVuID0gcmV0cnlXaGVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmV0cnlXaGVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zYW1wbGUgPSB2b2lkIDA7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gc2FtcGxlKG5vdGlmaWVyKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIHZhciBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShub3RpZmllcikuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaGFzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxhc3RWYWx1ZTtcbiAgICAgICAgICAgICAgICBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG5vb3BfMS5ub29wKSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNhbXBsZSA9IHNhbXBsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNhbXBsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2FtcGxlVGltZSA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBzYW1wbGVfMSA9IHJlcXVpcmUoXCIuL3NhbXBsZVwiKTtcbnZhciBpbnRlcnZhbF8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW50ZXJ2YWxcIik7XG5mdW5jdGlvbiBzYW1wbGVUaW1lKHBlcmlvZCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7IH1cbiAgICByZXR1cm4gc2FtcGxlXzEuc2FtcGxlKGludGVydmFsXzEuaW50ZXJ2YWwocGVyaW9kLCBzY2hlZHVsZXIpKTtcbn1cbmV4cG9ydHMuc2FtcGxlVGltZSA9IHNhbXBsZVRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zYW1wbGVUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2FuID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgc2NhbkludGVybmFsc18xID0gcmVxdWlyZShcIi4vc2NhbkludGVybmFsc1wiKTtcbmZ1bmN0aW9uIHNjYW4oYWNjdW11bGF0b3IsIHNlZWQpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoc2NhbkludGVybmFsc18xLnNjYW5JbnRlcm5hbHMoYWNjdW11bGF0b3IsIHNlZWQsIGFyZ3VtZW50cy5sZW5ndGggPj0gMiwgdHJ1ZSkpO1xufVxuZXhwb3J0cy5zY2FuID0gc2Nhbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjYW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjYW5JbnRlcm5hbHMgPSB2b2lkIDA7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBzY2FuSW50ZXJuYWxzKGFjY3VtdWxhdG9yLCBzZWVkLCBoYXNTZWVkLCBlbWl0T25OZXh0LCBlbWl0QmVmb3JlQ29tcGxldGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFzU3RhdGUgPSBoYXNTZWVkO1xuICAgICAgICB2YXIgc3RhdGUgPSBzZWVkO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpID0gaW5kZXgrKztcbiAgICAgICAgICAgIHN0YXRlID0gaGFzU3RhdGVcbiAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yKHN0YXRlLCB2YWx1ZSwgaSlcbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICgoaGFzU3RhdGUgPSB0cnVlKSwgdmFsdWUpO1xuICAgICAgICAgICAgZW1pdE9uTmV4dCAmJiBzdWJzY3JpYmVyLm5leHQoc3RhdGUpO1xuICAgICAgICB9LCBlbWl0QmVmb3JlQ29tcGxldGUgJiZcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaGFzU3RhdGUgJiYgc3Vic2NyaWJlci5uZXh0KHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KSkpO1xuICAgIH07XG59XG5leHBvcnRzLnNjYW5JbnRlcm5hbHMgPSBzY2FuSW50ZXJuYWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NhbkludGVybmFscy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VxdWVuY2VFcXVhbCA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gc2VxdWVuY2VFcXVhbChjb21wYXJlVG8sIGNvbXBhcmF0b3IpIHtcbiAgICBpZiAoY29tcGFyYXRvciA9PT0gdm9pZCAwKSB7IGNvbXBhcmF0b3IgPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSA9PT0gYjsgfTsgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBhU3RhdGUgPSBjcmVhdGVTdGF0ZSgpO1xuICAgICAgICB2YXIgYlN0YXRlID0gY3JlYXRlU3RhdGUoKTtcbiAgICAgICAgdmFyIGVtaXQgPSBmdW5jdGlvbiAoaXNFcXVhbCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlzRXF1YWwpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgY3JlYXRlU3Vic2NyaWJlciA9IGZ1bmN0aW9uIChzZWxmU3RhdGUsIG90aGVyU3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBzZXF1ZW5jZUVxdWFsU3Vic2NyaWJlciA9IE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBvdGhlclN0YXRlLmJ1ZmZlciwgY29tcGxldGUgPSBvdGhlclN0YXRlLmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID8gZW1pdChmYWxzZSkgOiBzZWxmU3RhdGUuYnVmZmVyLnB1c2goYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAhY29tcGFyYXRvcihhLCBidWZmZXIuc2hpZnQoKSkgJiYgZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGZTdGF0ZS5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRlID0gb3RoZXJTdGF0ZS5jb21wbGV0ZSwgYnVmZmVyID0gb3RoZXJTdGF0ZS5idWZmZXI7XG4gICAgICAgICAgICAgICAgY29tcGxldGUgJiYgZW1pdChidWZmZXIubGVuZ3RoID09PSAwKTtcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZUVxdWFsU3Vic2NyaWJlciA9PT0gbnVsbCB8fCBzZXF1ZW5jZUVxdWFsU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VxdWVuY2VFcXVhbFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlcXVlbmNlRXF1YWxTdWJzY3JpYmVyO1xuICAgICAgICB9O1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZVN1YnNjcmliZXIoYVN0YXRlLCBiU3RhdGUpKTtcbiAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGNvbXBhcmVUbykuc3Vic2NyaWJlKGNyZWF0ZVN1YnNjcmliZXIoYlN0YXRlLCBhU3RhdGUpKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2VxdWVuY2VFcXVhbCA9IHNlcXVlbmNlRXF1YWw7XG5mdW5jdGlvbiBjcmVhdGVTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcXVlbmNlRXF1YWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaGFyZSA9IHZvaWQgMDtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaWJlclwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xuZnVuY3Rpb24gc2hhcmUob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIF9hID0gb3B0aW9ucy5jb25uZWN0b3IsIGNvbm5lY3RvciA9IF9hID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3ViamVjdF8xLlN1YmplY3QoKTsgfSA6IF9hLCBfYiA9IG9wdGlvbnMucmVzZXRPbkVycm9yLCByZXNldE9uRXJyb3IgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBfYyA9IG9wdGlvbnMucmVzZXRPbkNvbXBsZXRlLCByZXNldE9uQ29tcGxldGUgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBfZCA9IG9wdGlvbnMucmVzZXRPblJlZkNvdW50WmVybywgcmVzZXRPblJlZkNvdW50WmVybyA9IF9kID09PSB2b2lkIDAgPyB0cnVlIDogX2Q7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3cmFwcGVyU291cmNlKSB7XG4gICAgICAgIHZhciBjb25uZWN0aW9uO1xuICAgICAgICB2YXIgcmVzZXRDb25uZWN0aW9uO1xuICAgICAgICB2YXIgc3ViamVjdDtcbiAgICAgICAgdmFyIHJlZkNvdW50ID0gMDtcbiAgICAgICAgdmFyIGhhc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgaGFzRXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgY2FuY2VsUmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNldENvbm5lY3Rpb24gPT09IG51bGwgfHwgcmVzZXRDb25uZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNldENvbm5lY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJlc2V0Q29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FuY2VsUmVzZXQoKTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBzdWJqZWN0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaGFzQ29tcGxldGVkID0gaGFzRXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVzZXRBbmRVbnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb25uID0gY29ubmVjdGlvbjtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICBjb25uID09PSBudWxsIHx8IGNvbm4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbm4udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJlZkNvdW50Kys7XG4gICAgICAgICAgICBpZiAoIWhhc0Vycm9yZWQgJiYgIWhhc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgIGNhbmNlbFJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGVzdCA9IChzdWJqZWN0ID0gc3ViamVjdCAhPT0gbnVsbCAmJiBzdWJqZWN0ICE9PSB2b2lkIDAgPyBzdWJqZWN0IDogY29ubmVjdG9yKCkpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlZkNvdW50LS07XG4gICAgICAgICAgICAgICAgaWYgKHJlZkNvdW50ID09PSAwICYmICFoYXNFcnJvcmVkICYmICFoYXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRDb25uZWN0aW9uID0gaGFuZGxlUmVzZXQocmVzZXRBbmRVbnN1YnNjcmliZSwgcmVzZXRPblJlZkNvdW50WmVybyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZXN0LnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIGlmICghY29ubmVjdGlvbiAmJlxuICAgICAgICAgICAgICAgIHJlZkNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBuZXcgU3Vic2NyaWJlcl8xLlNhZmVTdWJzY3JpYmVyKHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBkZXN0Lm5leHQodmFsdWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxSZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRDb25uZWN0aW9uID0gaGFuZGxlUmVzZXQocmVzZXQsIHJlc2V0T25FcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxSZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRDb25uZWN0aW9uID0gaGFuZGxlUmVzZXQocmVzZXQsIHJlc2V0T25Db21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKHNvdXJjZSkuc3Vic2NyaWJlKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSh3cmFwcGVyU291cmNlKTtcbiAgICB9O1xufVxuZXhwb3J0cy5zaGFyZSA9IHNoYXJlO1xuZnVuY3Rpb24gaGFuZGxlUmVzZXQocmVzZXQsIG9uKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBpZiAob24gPT09IHRydWUpIHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob24gPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG9uU3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyXzEuU2FmZVN1YnNjcmliZXIoe1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvblN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIGlubmVyRnJvbV8xLmlubmVyRnJvbShvbi5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpKS5zdWJzY3JpYmUob25TdWJzY3JpYmVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaGFyZVJlcGxheSA9IHZvaWQgMDtcbnZhciBSZXBsYXlTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vUmVwbGF5U3ViamVjdFwiKTtcbnZhciBzaGFyZV8xID0gcmVxdWlyZShcIi4vc2hhcmVcIik7XG5mdW5jdGlvbiBzaGFyZVJlcGxheShjb25maWdPckJ1ZmZlclNpemUsIHdpbmRvd1RpbWUsIHNjaGVkdWxlcikge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHZhciBidWZmZXJTaXplO1xuICAgIHZhciByZWZDb3VudCA9IGZhbHNlO1xuICAgIGlmIChjb25maWdPckJ1ZmZlclNpemUgJiYgdHlwZW9mIGNvbmZpZ09yQnVmZmVyU2l6ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgKF9hID0gY29uZmlnT3JCdWZmZXJTaXplLmJ1ZmZlclNpemUsIGJ1ZmZlclNpemUgPSBfYSA9PT0gdm9pZCAwID8gSW5maW5pdHkgOiBfYSwgX2IgPSBjb25maWdPckJ1ZmZlclNpemUud2luZG93VGltZSwgd2luZG93VGltZSA9IF9iID09PSB2b2lkIDAgPyBJbmZpbml0eSA6IF9iLCBfYyA9IGNvbmZpZ09yQnVmZmVyU2l6ZS5yZWZDb3VudCwgcmVmQ291bnQgPSBfYyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYywgc2NoZWR1bGVyID0gY29uZmlnT3JCdWZmZXJTaXplLnNjaGVkdWxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBidWZmZXJTaXplID0gKGNvbmZpZ09yQnVmZmVyU2l6ZSAhPT0gbnVsbCAmJiBjb25maWdPckJ1ZmZlclNpemUgIT09IHZvaWQgMCA/IGNvbmZpZ09yQnVmZmVyU2l6ZSA6IEluZmluaXR5KTtcbiAgICB9XG4gICAgcmV0dXJuIHNoYXJlXzEuc2hhcmUoe1xuICAgICAgICBjb25uZWN0b3I6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBSZXBsYXlTdWJqZWN0XzEuUmVwbGF5U3ViamVjdChidWZmZXJTaXplLCB3aW5kb3dUaW1lLCBzY2hlZHVsZXIpOyB9LFxuICAgICAgICByZXNldE9uRXJyb3I6IHRydWUsXG4gICAgICAgIHJlc2V0T25Db21wbGV0ZTogZmFsc2UsXG4gICAgICAgIHJlc2V0T25SZWZDb3VudFplcm86IHJlZkNvdW50LFxuICAgIH0pO1xufVxuZXhwb3J0cy5zaGFyZVJlcGxheSA9IHNoYXJlUmVwbGF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmVSZXBsYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNpbmdsZSA9IHZvaWQgMDtcbnZhciBFbXB0eUVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9FbXB0eUVycm9yXCIpO1xudmFyIFNlcXVlbmNlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL1NlcXVlbmNlRXJyb3JcIik7XG52YXIgTm90Rm91bmRFcnJvcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvTm90Rm91bmRFcnJvclwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gc2luZ2xlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgc2luZ2xlVmFsdWU7XG4gICAgICAgIHZhciBzZWVuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBzZWVuVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKHZhbHVlLCBpbmRleCsrLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgaGFzVmFsdWUgJiYgc3Vic2NyaWJlci5lcnJvcihuZXcgU2VxdWVuY2VFcnJvcl8xLlNlcXVlbmNlRXJyb3IoJ1RvbyBtYW55IG1hdGNoaW5nIHZhbHVlcycpKTtcbiAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2luZ2xlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHNpbmdsZVZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHNlZW5WYWx1ZSA/IG5ldyBOb3RGb3VuZEVycm9yXzEuTm90Rm91bmRFcnJvcignTm8gbWF0Y2hpbmcgdmFsdWVzJykgOiBuZXcgRW1wdHlFcnJvcl8xLkVtcHR5RXJyb3IoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2luZ2xlID0gc2luZ2xlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2luZ2xlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5za2lwID0gdm9pZCAwO1xudmFyIGZpbHRlcl8xID0gcmVxdWlyZShcIi4vZmlsdGVyXCIpO1xuZnVuY3Rpb24gc2tpcChjb3VudCkge1xuICAgIHJldHVybiBmaWx0ZXJfMS5maWx0ZXIoZnVuY3Rpb24gKF8sIGluZGV4KSB7IHJldHVybiBjb3VudCA8PSBpbmRleDsgfSk7XG59XG5leHBvcnRzLnNraXAgPSBza2lwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2tpcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2tpcExhc3QgPSB2b2lkIDA7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBza2lwTGFzdChza2lwQ291bnQpIHtcbiAgICByZXR1cm4gc2tpcENvdW50IDw9IDBcbiAgICAgICAgP1xuICAgICAgICAgICAgaWRlbnRpdHlfMS5pZGVudGl0eVxuICAgICAgICA6IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciByaW5nID0gbmV3IEFycmF5KHNraXBDb3VudCk7XG4gICAgICAgICAgICB2YXIgc2VlbiA9IDA7XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IHNlZW4rKztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVJbmRleCA8IHNraXBDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICByaW5nW3ZhbHVlSW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB2YWx1ZUluZGV4ICUgc2tpcENvdW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSByaW5nW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgcmluZ1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJpbmcgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG59XG5leHBvcnRzLnNraXBMYXN0ID0gc2tpcExhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1za2lwTGFzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2tpcFVudGlsID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbm9vcFwiKTtcbmZ1bmN0aW9uIHNraXBVbnRpbChub3RpZmllcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciB0YWtpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIHNraXBTdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNraXBTdWJzY3JpYmVyID09PSBudWxsIHx8IHNraXBTdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBza2lwU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGFraW5nID0gdHJ1ZTtcbiAgICAgICAgfSwgbm9vcF8xLm5vb3ApO1xuICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20obm90aWZpZXIpLnN1YnNjcmliZShza2lwU3Vic2NyaWJlcik7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGFraW5nICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2tpcFVudGlsID0gc2tpcFVudGlsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2tpcFVudGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5za2lwV2hpbGUgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHNraXBXaGlsZShwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgdGFraW5nID0gZmFsc2U7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKHRha2luZyB8fCAodGFraW5nID0gIXByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgrKykpKSAmJiBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNraXBXaGlsZSA9IHNraXBXaGlsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNraXBXaGlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RhcnRXaXRoID0gdm9pZCAwO1xudmFyIGNvbmNhdF8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvY29uY2F0XCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbmZ1bmN0aW9uIHN0YXJ0V2l0aCgpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFsdWVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSBhcmdzXzEucG9wU2NoZWR1bGVyKHZhbHVlcyk7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgKHNjaGVkdWxlciA/IGNvbmNhdF8xLmNvbmNhdCh2YWx1ZXMsIHNvdXJjZSwgc2NoZWR1bGVyKSA6IGNvbmNhdF8xLmNvbmNhdCh2YWx1ZXMsIHNvdXJjZSkpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc3RhcnRXaXRoID0gc3RhcnRXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhcnRXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdWJzY3JpYmVPbiA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xuZnVuY3Rpb24gc3Vic2NyaWJlT24oc2NoZWR1bGVyLCBkZWxheSkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpOyB9LCBkZWxheSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zdWJzY3JpYmVPbiA9IHN1YnNjcmliZU9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NyaWJlT24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN3aXRjaEFsbCA9IHZvaWQgMDtcbnZhciBzd2l0Y2hNYXBfMSA9IHJlcXVpcmUoXCIuL3N3aXRjaE1hcFwiKTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG5mdW5jdGlvbiBzd2l0Y2hBbGwoKSB7XG4gICAgcmV0dXJuIHN3aXRjaE1hcF8xLnN3aXRjaE1hcChpZGVudGl0eV8xLmlkZW50aXR5KTtcbn1cbmV4cG9ydHMuc3dpdGNoQWxsID0gc3dpdGNoQWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoQWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zd2l0Y2hNYXAgPSB2b2lkIDA7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHN3aXRjaE1hcChwcm9qZWN0LCByZXN1bHRTZWxlY3Rvcikge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbm5lclN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzQ29tcGxldGUgJiYgIWlubmVyU3Vic2NyaWJlciAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID09PSBudWxsIHx8IGlubmVyU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5uZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB2YXIgaW5uZXJJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgb3V0ZXJJbmRleCA9IGluZGV4Kys7XG4gICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgb3V0ZXJJbmRleCkpLnN1YnNjcmliZSgoaW5uZXJTdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChpbm5lclZhbHVlKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQocmVzdWx0U2VsZWN0b3IgPyByZXN1bHRTZWxlY3Rvcih2YWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCsrKSA6IGlubmVyVmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zd2l0Y2hNYXAgPSBzd2l0Y2hNYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2hNYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN3aXRjaE1hcFRvID0gdm9pZCAwO1xudmFyIHN3aXRjaE1hcF8xID0gcmVxdWlyZShcIi4vc3dpdGNoTWFwXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBzd2l0Y2hNYXBUbyhpbm5lck9ic2VydmFibGUsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHJlc3VsdFNlbGVjdG9yKSA/IHN3aXRjaE1hcF8xLnN3aXRjaE1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBpbm5lck9ic2VydmFibGU7IH0sIHJlc3VsdFNlbGVjdG9yKSA6IHN3aXRjaE1hcF8xLnN3aXRjaE1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBpbm5lck9ic2VydmFibGU7IH0pO1xufVxuZXhwb3J0cy5zd2l0Y2hNYXBUbyA9IHN3aXRjaE1hcFRvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoTWFwVG8uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN3aXRjaFNjYW4gPSB2b2lkIDA7XG52YXIgc3dpdGNoTWFwXzEgPSByZXF1aXJlKFwiLi9zd2l0Y2hNYXBcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbmZ1bmN0aW9uIHN3aXRjaFNjYW4oYWNjdW11bGF0b3IsIHNlZWQpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3RhdGUgPSBzZWVkO1xuICAgICAgICBzd2l0Y2hNYXBfMS5zd2l0Y2hNYXAoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkgeyByZXR1cm4gYWNjdW11bGF0b3Ioc3RhdGUsIHZhbHVlLCBpbmRleCk7IH0sIGZ1bmN0aW9uIChfLCBpbm5lclZhbHVlKSB7IHJldHVybiAoKHN0YXRlID0gaW5uZXJWYWx1ZSksIGlubmVyVmFsdWUpOyB9KShzb3VyY2UpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YXRlID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc3dpdGNoU2NhbiA9IHN3aXRjaFNjYW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2hTY2FuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50YWtlID0gdm9pZCAwO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9lbXB0eVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gdGFrZShjb3VudCkge1xuICAgIHJldHVybiBjb3VudCA8PSAwXG4gICAgICAgID9cbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtcHR5XzEuRU1QVFk7IH1cbiAgICAgICAgOiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc2VlbiA9IDA7XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKytzZWVuIDw9IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA8PSBzZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xufVxuZXhwb3J0cy50YWtlID0gdGFrZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRha2VMYXN0ID0gdm9pZCAwO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9lbXB0eVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gdGFrZUxhc3QoY291bnQpIHtcbiAgICByZXR1cm4gY291bnQgPD0gMFxuICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtcHR5XzEuRU1QVFk7IH1cbiAgICAgICAgOiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gW107XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgY291bnQgPCBidWZmZXIubGVuZ3RoICYmIGJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGJ1ZmZlcl8xID0gX192YWx1ZXMoYnVmZmVyKSwgYnVmZmVyXzFfMSA9IGJ1ZmZlcl8xLm5leHQoKTsgIWJ1ZmZlcl8xXzEuZG9uZTsgYnVmZmVyXzFfMSA9IGJ1ZmZlcl8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYnVmZmVyXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJfMV8xICYmICFidWZmZXJfMV8xLmRvbmUgJiYgKF9hID0gYnVmZmVyXzEucmV0dXJuKSkgX2EuY2FsbChidWZmZXJfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBudWxsO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbn1cbmV4cG9ydHMudGFrZUxhc3QgPSB0YWtlTGFzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2VMYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50YWtlVW50aWwgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xuZnVuY3Rpb24gdGFrZVVudGlsKG5vdGlmaWVyKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgaW5uZXJGcm9tXzEuaW5uZXJGcm9tKG5vdGlmaWVyKS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSwgbm9vcF8xLm5vb3ApKTtcbiAgICAgICAgIXN1YnNjcmliZXIuY2xvc2VkICYmIHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSk7XG59XG5leHBvcnRzLnRha2VVbnRpbCA9IHRha2VVbnRpbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2VVbnRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGFrZVdoaWxlID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiB0YWtlV2hpbGUocHJlZGljYXRlLCBpbmNsdXNpdmUpIHtcbiAgICBpZiAoaW5jbHVzaXZlID09PSB2b2lkIDApIHsgaW5jbHVzaXZlID0gZmFsc2U7IH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBwcmVkaWNhdGUodmFsdWUsIGluZGV4KyspO1xuICAgICAgICAgICAgKHJlc3VsdCB8fCBpbmNsdXNpdmUpICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAhcmVzdWx0ICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50YWtlV2hpbGUgPSB0YWtlV2hpbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlV2hpbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRhcCA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xuZnVuY3Rpb24gdGFwKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICB2YXIgdGFwT2JzZXJ2ZXIgPSBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkgfHwgZXJyb3IgfHwgY29tcGxldGVcbiAgICAgICAgP1xuICAgICAgICAgICAgeyBuZXh0OiBvYnNlcnZlck9yTmV4dCwgZXJyb3I6IGVycm9yLCBjb21wbGV0ZTogY29tcGxldGUgfVxuICAgICAgICA6IG9ic2VydmVyT3JOZXh0O1xuICAgIHJldHVybiB0YXBPYnNlcnZlclxuICAgICAgICA/IGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLnN1YnNjcmliZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIpO1xuICAgICAgICAgICAgdmFyIGlzVW5zdWIgPSB0cnVlO1xuICAgICAgICAgICAgc291cmNlLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLm5leHQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaXNVbnN1YiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLmNvbXBsZXRlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpc1Vuc3ViID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIuZXJyb3IpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyLCBlcnIpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGlmIChpc1Vuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLnVuc3Vic2NyaWJlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIChfYiA9IHRhcE9ic2VydmVyLmZpbmFsaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pXG4gICAgICAgIDpcbiAgICAgICAgICAgIGlkZW50aXR5XzEuaWRlbnRpdHk7XG59XG5leHBvcnRzLnRhcCA9IHRhcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGhyb3R0bGUgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbmZ1bmN0aW9uIHRocm90dGxlKGR1cmF0aW9uU2VsZWN0b3IsIGNvbmZpZykge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSA9IGNvbmZpZyAhPT0gbnVsbCAmJiBjb25maWcgIT09IHZvaWQgMCA/IGNvbmZpZyA6IHt9LCBfYiA9IF9hLmxlYWRpbmcsIGxlYWRpbmcgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBfYyA9IF9hLnRyYWlsaW5nLCB0cmFpbGluZyA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jO1xuICAgICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdmFyIHNlbmRWYWx1ZSA9IG51bGw7XG4gICAgICAgIHZhciB0aHJvdHRsZWQgPSBudWxsO1xuICAgICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgZW5kVGhyb3R0bGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRocm90dGxlZCA9PT0gbnVsbCB8fCB0aHJvdHRsZWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRocm90dGxlZC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhyb3R0bGVkID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0cmFpbGluZykge1xuICAgICAgICAgICAgICAgIHNlbmQoKTtcbiAgICAgICAgICAgICAgICBpc0NvbXBsZXRlICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNsZWFudXBUaHJvdHRsaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3R0bGVkID0gbnVsbDtcbiAgICAgICAgICAgIGlzQ29tcGxldGUgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc3RhcnRUaHJvdHRsZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aHJvdHRsZWQgPSBpbm5lckZyb21fMS5pbm5lckZyb20oZHVyYXRpb25TZWxlY3Rvcih2YWx1ZSkpLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZW5kVGhyb3R0bGluZywgY2xlYW51cFRocm90dGxpbmcpKSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzZW5kVmFsdWU7XG4gICAgICAgICAgICAgICAgc2VuZFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICFpc0NvbXBsZXRlICYmIHN0YXJ0VGhyb3R0bGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbmRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgISh0aHJvdHRsZWQgJiYgIXRocm90dGxlZC5jbG9zZWQpICYmIChsZWFkaW5nID8gc2VuZCgpIDogc3RhcnRUaHJvdHRsZSh2YWx1ZSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICEodHJhaWxpbmcgJiYgaGFzVmFsdWUgJiYgdGhyb3R0bGVkICYmICF0aHJvdHRsZWQuY2xvc2VkKSAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudGhyb3R0bGUgPSB0aHJvdHRsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm90dGxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aHJvdHRsZVRpbWUgPSB2b2lkIDA7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgdGhyb3R0bGVfMSA9IHJlcXVpcmUoXCIuL3Rocm90dGxlXCIpO1xudmFyIHRpbWVyXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS90aW1lclwiKTtcbmZ1bmN0aW9uIHRocm90dGxlVGltZShkdXJhdGlvbiwgc2NoZWR1bGVyLCBjb25maWcpIHtcbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIHZhciBkdXJhdGlvbiQgPSB0aW1lcl8xLnRpbWVyKGR1cmF0aW9uLCBzY2hlZHVsZXIpO1xuICAgIHJldHVybiB0aHJvdHRsZV8xLnRocm90dGxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGR1cmF0aW9uJDsgfSwgY29uZmlnKTtcbn1cbmV4cG9ydHMudGhyb3R0bGVUaW1lID0gdGhyb3R0bGVUaW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3R0bGVUaW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aHJvd0lmRW1wdHkgPSB2b2lkIDA7XG52YXIgRW1wdHlFcnJvcl8xID0gcmVxdWlyZShcIi4uL3V0aWwvRW1wdHlFcnJvclwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gdGhyb3dJZkVtcHR5KGVycm9yRmFjdG9yeSkge1xuICAgIGlmIChlcnJvckZhY3RvcnkgPT09IHZvaWQgMCkgeyBlcnJvckZhY3RvcnkgPSBkZWZhdWx0RXJyb3JGYWN0b3J5OyB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKGhhc1ZhbHVlID8gc3Vic2NyaWJlci5jb21wbGV0ZSgpIDogc3Vic2NyaWJlci5lcnJvcihlcnJvckZhY3RvcnkoKSkpOyB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnRocm93SWZFbXB0eSA9IHRocm93SWZFbXB0eTtcbmZ1bmN0aW9uIGRlZmF1bHRFcnJvckZhY3RvcnkoKSB7XG4gICAgcmV0dXJuIG5ldyBFbXB0eUVycm9yXzEuRW1wdHlFcnJvcigpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dJZkVtcHR5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UaW1lSW50ZXJ2YWwgPSBleHBvcnRzLnRpbWVJbnRlcnZhbCA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gdGltZUludGVydmFsKHNjaGVkdWxlcikge1xuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSBhc3luY18xLmFzeW5jU2NoZWR1bGVyOyB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGxhc3QgPSBzY2hlZHVsZXIubm93KCk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIG5vdyA9IHNjaGVkdWxlci5ub3coKTtcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbCA9IG5vdyAtIGxhc3Q7XG4gICAgICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG5ldyBUaW1lSW50ZXJ2YWwodmFsdWUsIGludGVydmFsKSk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudGltZUludGVydmFsID0gdGltZUludGVydmFsO1xudmFyIFRpbWVJbnRlcnZhbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGltZUludGVydmFsKHZhbHVlLCBpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbDtcbiAgICB9XG4gICAgcmV0dXJuIFRpbWVJbnRlcnZhbDtcbn0oKSk7XG5leHBvcnRzLlRpbWVJbnRlcnZhbCA9IFRpbWVJbnRlcnZhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVJbnRlcnZhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGltZW91dCA9IGV4cG9ydHMuVGltZW91dEVycm9yID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIGlzRGF0ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNEYXRlXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4uL3V0aWwvY3JlYXRlRXJyb3JDbGFzc1wiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbmV4cG9ydHMuVGltZW91dEVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBUaW1lb3V0RXJyb3JJbXBsKGluZm8pIHtcbiAgICAgICAgaWYgKGluZm8gPT09IHZvaWQgMCkgeyBpbmZvID0gbnVsbDsgfVxuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdUaW1lb3V0IGhhcyBvY2N1cnJlZCc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdUaW1lb3V0RXJyb3InO1xuICAgICAgICB0aGlzLmluZm8gPSBpbmZvO1xuICAgIH07XG59KTtcbmZ1bmN0aW9uIHRpbWVvdXQoY29uZmlnLCBzY2hlZHVsZXJBcmcpIHtcbiAgICB2YXIgX2EgPSAoaXNEYXRlXzEuaXNWYWxpZERhdGUoY29uZmlnKSA/IHsgZmlyc3Q6IGNvbmZpZyB9IDogdHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicgPyB7IGVhY2g6IGNvbmZpZyB9IDogY29uZmlnKSwgZmlyc3QgPSBfYS5maXJzdCwgZWFjaCA9IF9hLmVhY2gsIF9iID0gX2Eud2l0aCwgX3dpdGggPSBfYiA9PT0gdm9pZCAwID8gdGltZW91dEVycm9yRmFjdG9yeSA6IF9iLCBfYyA9IF9hLnNjaGVkdWxlciwgc2NoZWR1bGVyID0gX2MgPT09IHZvaWQgMCA/IHNjaGVkdWxlckFyZyAhPT0gbnVsbCAmJiBzY2hlZHVsZXJBcmcgIT09IHZvaWQgMCA/IHNjaGVkdWxlckFyZyA6IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXIgOiBfYywgX2QgPSBfYS5tZXRhLCBtZXRhID0gX2QgPT09IHZvaWQgMCA/IG51bGwgOiBfZDtcbiAgICBpZiAoZmlyc3QgPT0gbnVsbCAmJiBlYWNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm8gdGltZW91dCBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsU291cmNlU3Vic2NyaXB0aW9uO1xuICAgICAgICB2YXIgdGltZXJTdWJzY3JpcHRpb247XG4gICAgICAgIHZhciBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICB2YXIgc2VlbiA9IDA7XG4gICAgICAgIHZhciBzdGFydFRpbWVyID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gICAgICAgICAgICB0aW1lclN1YnNjcmlwdGlvbiA9IGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFNvdXJjZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20oX3dpdGgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YTogbWV0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RWYWx1ZTogbGFzdFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vlbjogc2VlbixcbiAgICAgICAgICAgICAgICAgICAgfSkpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICB9O1xuICAgICAgICBvcmlnaW5hbFNvdXJjZVN1YnNjcmlwdGlvbiA9IHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGltZXJTdWJzY3JpcHRpb24gPT09IG51bGwgfHwgdGltZXJTdWJzY3JpcHRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzZWVuKys7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoKGxhc3RWYWx1ZSA9IHZhbHVlKSk7XG4gICAgICAgICAgICBlYWNoID4gMCAmJiBzdGFydFRpbWVyKGVhY2gpO1xuICAgICAgICB9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEodGltZXJTdWJzY3JpcHRpb24gPT09IG51bGwgfHwgdGltZXJTdWJzY3JpcHRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRpbWVyU3Vic2NyaXB0aW9uLmNsb3NlZCkpIHtcbiAgICAgICAgICAgICAgICB0aW1lclN1YnNjcmlwdGlvbiA9PT0gbnVsbCB8fCB0aW1lclN1YnNjcmlwdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGltZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIH0pKTtcbiAgICAgICAgIXNlZW4gJiYgc3RhcnRUaW1lcihmaXJzdCAhPSBudWxsID8gKHR5cGVvZiBmaXJzdCA9PT0gJ251bWJlcicgPyBmaXJzdCA6ICtmaXJzdCAtIHNjaGVkdWxlci5ub3coKSkgOiBlYWNoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudGltZW91dCA9IHRpbWVvdXQ7XG5mdW5jdGlvbiB0aW1lb3V0RXJyb3JGYWN0b3J5KGluZm8pIHtcbiAgICB0aHJvdyBuZXcgZXhwb3J0cy5UaW1lb3V0RXJyb3IoaW5mbyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lb3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aW1lb3V0V2l0aCA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBpc0RhdGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRGF0ZVwiKTtcbnZhciB0aW1lb3V0XzEgPSByZXF1aXJlKFwiLi90aW1lb3V0XCIpO1xuZnVuY3Rpb24gdGltZW91dFdpdGgoZHVlLCB3aXRoT2JzZXJ2YWJsZSwgc2NoZWR1bGVyKSB7XG4gICAgdmFyIGZpcnN0O1xuICAgIHZhciBlYWNoO1xuICAgIHZhciBfd2l0aDtcbiAgICBzY2hlZHVsZXIgPSBzY2hlZHVsZXIgIT09IG51bGwgJiYgc2NoZWR1bGVyICE9PSB2b2lkIDAgPyBzY2hlZHVsZXIgOiBhc3luY18xLmFzeW5jO1xuICAgIGlmIChpc0RhdGVfMS5pc1ZhbGlkRGF0ZShkdWUpKSB7XG4gICAgICAgIGZpcnN0ID0gZHVlO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICBlYWNoID0gZHVlO1xuICAgIH1cbiAgICBpZiAod2l0aE9ic2VydmFibGUpIHtcbiAgICAgICAgX3dpdGggPSBmdW5jdGlvbiAoKSB7IHJldHVybiB3aXRoT2JzZXJ2YWJsZTsgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vIG9ic2VydmFibGUgcHJvdmlkZWQgdG8gc3dpdGNoIHRvJyk7XG4gICAgfVxuICAgIGlmIChmaXJzdCA9PSBudWxsICYmIGVhY2ggPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdObyB0aW1lb3V0IHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGltZW91dF8xLnRpbWVvdXQoe1xuICAgICAgICBmaXJzdDogZmlyc3QsXG4gICAgICAgIGVhY2g6IGVhY2gsXG4gICAgICAgIHNjaGVkdWxlcjogc2NoZWR1bGVyLFxuICAgICAgICB3aXRoOiBfd2l0aCxcbiAgICB9KTtcbn1cbmV4cG9ydHMudGltZW91dFdpdGggPSB0aW1lb3V0V2l0aDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRXaXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aW1lc3RhbXAgPSB2b2lkIDA7XG52YXIgZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlclwiKTtcbnZhciBtYXBfMSA9IHJlcXVpcmUoXCIuL21hcFwiKTtcbmZ1bmN0aW9uIHRpbWVzdGFtcCh0aW1lc3RhbXBQcm92aWRlcikge1xuICAgIGlmICh0aW1lc3RhbXBQcm92aWRlciA9PT0gdm9pZCAwKSB7IHRpbWVzdGFtcFByb3ZpZGVyID0gZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXzEuZGF0ZVRpbWVzdGFtcFByb3ZpZGVyOyB9XG4gICAgcmV0dXJuIG1hcF8xLm1hcChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuICh7IHZhbHVlOiB2YWx1ZSwgdGltZXN0YW1wOiB0aW1lc3RhbXBQcm92aWRlci5ub3coKSB9KTsgfSk7XG59XG5leHBvcnRzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVzdGFtcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudG9BcnJheSA9IHZvaWQgMDtcbnZhciByZWR1Y2VfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGFyclJlZHVjZXIgPSBmdW5jdGlvbiAoYXJyLCB2YWx1ZSkgeyByZXR1cm4gKGFyci5wdXNoKHZhbHVlKSwgYXJyKTsgfTtcbmZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmVkdWNlXzEucmVkdWNlKGFyclJlZHVjZXIsIFtdKShzb3VyY2UpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudG9BcnJheSA9IHRvQXJyYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b0FycmF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy53aW5kb3cgPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1N1YmplY3RcIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gd2luZG93KHdpbmRvd0JvdW5kYXJpZXMpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgd2luZG93U3ViamVjdCA9IG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQod2luZG93U3ViamVjdC5hc09ic2VydmFibGUoKSk7XG4gICAgICAgIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICB3aW5kb3dTdWJqZWN0LmVycm9yKGVycik7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgIH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gd2luZG93U3ViamVjdCA9PT0gbnVsbCB8fCB3aW5kb3dTdWJqZWN0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3dTdWJqZWN0Lm5leHQodmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3dTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sIGVycm9ySGFuZGxlcikpO1xuICAgICAgICBpbm5lckZyb21fMS5pbm5lckZyb20od2luZG93Qm91bmRhcmllcykuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3dTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoKHdpbmRvd1N1YmplY3QgPSBuZXcgU3ViamVjdF8xLlN1YmplY3QoKSkpO1xuICAgICAgICB9LCBub29wXzEubm9vcCwgZXJyb3JIYW5kbGVyKSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3dTdWJqZWN0ID09PSBudWxsIHx8IHdpbmRvd1N1YmplY3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvd1N1YmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHdpbmRvd1N1YmplY3QgPSBudWxsO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy53aW5kb3cgPSB3aW5kb3c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aW5kb3cuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndpbmRvd0NvdW50ID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiB3aW5kb3dDb3VudCh3aW5kb3dTaXplLCBzdGFydFdpbmRvd0V2ZXJ5KSB7XG4gICAgaWYgKHN0YXJ0V2luZG93RXZlcnkgPT09IHZvaWQgMCkgeyBzdGFydFdpbmRvd0V2ZXJ5ID0gMDsgfVxuICAgIHZhciBzdGFydEV2ZXJ5ID0gc3RhcnRXaW5kb3dFdmVyeSA+IDAgPyBzdGFydFdpbmRvd0V2ZXJ5IDogd2luZG93U2l6ZTtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgd2luZG93cyA9IFtuZXcgU3ViamVjdF8xLlN1YmplY3QoKV07XG4gICAgICAgIHZhciBzdGFydHMgPSBbXTtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHdpbmRvd3NbMF0uYXNPYnNlcnZhYmxlKCkpO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB3aW5kb3dzXzEgPSBfX3ZhbHVlcyh3aW5kb3dzKSwgd2luZG93c18xXzEgPSB3aW5kb3dzXzEubmV4dCgpOyAhd2luZG93c18xXzEuZG9uZTsgd2luZG93c18xXzEgPSB3aW5kb3dzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dfMSA9IHdpbmRvd3NfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3dfMS5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvd3NfMV8xICYmICF3aW5kb3dzXzFfMS5kb25lICYmIChfYSA9IHdpbmRvd3NfMS5yZXR1cm4pKSBfYS5jYWxsKHdpbmRvd3NfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjID0gY291bnQgLSB3aW5kb3dTaXplICsgMTtcbiAgICAgICAgICAgIGlmIChjID49IDAgJiYgYyAlIHN0YXJ0RXZlcnkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dzLnNoaWZ0KCkuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgrK2NvdW50ICUgc3RhcnRFdmVyeSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dfMiA9IG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpO1xuICAgICAgICAgICAgICAgIHdpbmRvd3MucHVzaCh3aW5kb3dfMik7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHdpbmRvd18yLmFzT2JzZXJ2YWJsZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2hpbGUgKHdpbmRvd3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHdpbmRvd3Muc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICB3aGlsZSAod2luZG93cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgd2luZG93cy5zaGlmdCgpLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YXJ0cyA9IG51bGw7XG4gICAgICAgICAgICB3aW5kb3dzID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy53aW5kb3dDb3VudCA9IHdpbmRvd0NvdW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93Q291bnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndpbmRvd1RpbWUgPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4uL1N1YmplY3RcIik7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG52YXIgYXJyUmVtb3ZlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcnJSZW1vdmVcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbmZ1bmN0aW9uIHdpbmRvd1RpbWUod2luZG93VGltZVNwYW4pIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIHZhciBvdGhlckFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvdGhlckFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSAoX2EgPSBhcmdzXzEucG9wU2NoZWR1bGVyKG90aGVyQXJncykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7XG4gICAgdmFyIHdpbmRvd0NyZWF0aW9uSW50ZXJ2YWwgPSAoX2IgPSBvdGhlckFyZ3NbMF0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGw7XG4gICAgdmFyIG1heFdpbmRvd1NpemUgPSBvdGhlckFyZ3NbMV0gfHwgSW5maW5pdHk7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHdpbmRvd1JlY29yZHMgPSBbXTtcbiAgICAgICAgdmFyIHJlc3RhcnRPbkNsb3NlID0gZmFsc2U7XG4gICAgICAgIHZhciBjbG9zZVdpbmRvdyA9IGZ1bmN0aW9uIChyZWNvcmQpIHtcbiAgICAgICAgICAgIHZhciB3aW5kb3cgPSByZWNvcmQud2luZG93LCBzdWJzID0gcmVjb3JkLnN1YnM7XG4gICAgICAgICAgICB3aW5kb3cuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHN1YnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGFyclJlbW92ZV8xLmFyclJlbW92ZSh3aW5kb3dSZWNvcmRzLCByZWNvcmQpO1xuICAgICAgICAgICAgcmVzdGFydE9uQ2xvc2UgJiYgc3RhcnRXaW5kb3coKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHN0YXJ0V2luZG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHdpbmRvd1JlY29yZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VicyA9IG5ldyBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChzdWJzKTtcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93XzEgPSBuZXcgU3ViamVjdF8xLlN1YmplY3QoKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkXzEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdzogd2luZG93XzEsXG4gICAgICAgICAgICAgICAgICAgIHN1YnM6IHN1YnMsXG4gICAgICAgICAgICAgICAgICAgIHNlZW46IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB3aW5kb3dSZWNvcmRzLnB1c2gocmVjb3JkXzEpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh3aW5kb3dfMS5hc09ic2VydmFibGUoKSk7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnMsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gY2xvc2VXaW5kb3cocmVjb3JkXzEpOyB9LCB3aW5kb3dUaW1lU3Bhbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh3aW5kb3dDcmVhdGlvbkludGVydmFsICE9PSBudWxsICYmIHdpbmRvd0NyZWF0aW9uSW50ZXJ2YWwgPj0gMCkge1xuICAgICAgICAgICAgZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgc3RhcnRXaW5kb3csIHdpbmRvd0NyZWF0aW9uSW50ZXJ2YWwsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdGFydE9uQ2xvc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0V2luZG93KCk7XG4gICAgICAgIHZhciBsb29wID0gZnVuY3Rpb24gKGNiKSB7IHJldHVybiB3aW5kb3dSZWNvcmRzLnNsaWNlKCkuZm9yRWFjaChjYik7IH07XG4gICAgICAgIHZhciB0ZXJtaW5hdGUgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIGxvb3AoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvdyA9IF9hLndpbmRvdztcbiAgICAgICAgICAgICAgICByZXR1cm4gY2Iod2luZG93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2Ioc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgbG9vcChmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkLndpbmRvdy5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBtYXhXaW5kb3dTaXplIDw9ICsrcmVjb3JkLnNlZW4gJiYgY2xvc2VXaW5kb3cocmVjb3JkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiB0ZXJtaW5hdGUoZnVuY3Rpb24gKGNvbnN1bWVyKSB7IHJldHVybiBjb25zdW1lci5jb21wbGV0ZSgpOyB9KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gdGVybWluYXRlKGZ1bmN0aW9uIChjb25zdW1lcikgeyByZXR1cm4gY29uc3VtZXIuZXJyb3IoZXJyKTsgfSk7IH0pKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvd1JlY29yZHMgPSBudWxsO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy53aW5kb3dUaW1lID0gd2luZG93VGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpbmRvd1RpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndpbmRvd1RvZ2dsZSA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBpbm5lckZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2lubmVyRnJvbVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xudmFyIGFyclJlbW92ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJyUmVtb3ZlXCIpO1xuZnVuY3Rpb24gd2luZG93VG9nZ2xlKG9wZW5pbmdzLCBjbG9zaW5nU2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgd2luZG93cyA9IFtdO1xuICAgICAgICB2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICB3aGlsZSAoMCA8IHdpbmRvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgd2luZG93cy5zaGlmdCgpLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgIH07XG4gICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShvcGVuaW5ncykuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAob3BlblZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93ID0gbmV3IFN1YmplY3RfMS5TdWJqZWN0KCk7XG4gICAgICAgICAgICB3aW5kb3dzLnB1c2god2luZG93KTtcbiAgICAgICAgICAgIHZhciBjbG9zaW5nU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgdmFyIGNsb3NlV2luZG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGFyclJlbW92ZV8xLmFyclJlbW92ZSh3aW5kb3dzLCB3aW5kb3cpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIGNsb3NpbmdTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY2xvc2luZ05vdGlmaWVyO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjbG9zaW5nTm90aWZpZXIgPSBpbm5lckZyb21fMS5pbm5lckZyb20oY2xvc2luZ1NlbGVjdG9yKG9wZW5WYWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHdpbmRvdy5hc09ic2VydmFibGUoKSk7XG4gICAgICAgICAgICBjbG9zaW5nU3Vic2NyaXB0aW9uLmFkZChjbG9zaW5nTm90aWZpZXIuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBjbG9zZVdpbmRvdywgbm9vcF8xLm5vb3AsIGhhbmRsZUVycm9yKSkpO1xuICAgICAgICB9LCBub29wXzEubm9vcCkpO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKE9wZXJhdG9yU3Vic2NyaWJlcl8xLmNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAgICAgdmFyIHdpbmRvd3NDb3B5ID0gd2luZG93cy5zbGljZSgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB3aW5kb3dzQ29weV8xID0gX192YWx1ZXMod2luZG93c0NvcHkpLCB3aW5kb3dzQ29weV8xXzEgPSB3aW5kb3dzQ29weV8xLm5leHQoKTsgIXdpbmRvd3NDb3B5XzFfMS5kb25lOyB3aW5kb3dzQ29weV8xXzEgPSB3aW5kb3dzQ29weV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93XzEgPSB3aW5kb3dzQ29weV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd18xLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93c0NvcHlfMV8xICYmICF3aW5kb3dzQ29weV8xXzEuZG9uZSAmJiAoX2EgPSB3aW5kb3dzQ29weV8xLnJldHVybikpIF9hLmNhbGwod2luZG93c0NvcHlfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2hpbGUgKDAgPCB3aW5kb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHdpbmRvd3Muc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LCBoYW5kbGVFcnJvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2hpbGUgKDAgPCB3aW5kb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHdpbmRvd3Muc2hpZnQoKS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLndpbmRvd1RvZ2dsZSA9IHdpbmRvd1RvZ2dsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpbmRvd1RvZ2dsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2luZG93V2hlbiA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vU3ViamVjdFwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xuZnVuY3Rpb24gd2luZG93V2hlbihjbG9zaW5nU2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgd2luZG93O1xuICAgICAgICB2YXIgY2xvc2luZ1N1YnNjcmliZXI7XG4gICAgICAgIHZhciBoYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3BlbldpbmRvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsb3NpbmdTdWJzY3JpYmVyID09PSBudWxsIHx8IGNsb3NpbmdTdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbG9zaW5nU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgd2luZG93ID09PSBudWxsIHx8IHdpbmRvdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB3aW5kb3cgPSBuZXcgU3ViamVjdF8xLlN1YmplY3QoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh3aW5kb3cuYXNPYnNlcnZhYmxlKCkpO1xuICAgICAgICAgICAgdmFyIGNsb3NpbmdOb3RpZmllcjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2xvc2luZ05vdGlmaWVyID0gaW5uZXJGcm9tXzEuaW5uZXJGcm9tKGNsb3NpbmdTZWxlY3RvcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsb3NpbmdOb3RpZmllci5zdWJzY3JpYmUoKGNsb3NpbmdTdWJzY3JpYmVyID0gT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIG9wZW5XaW5kb3csIG9wZW5XaW5kb3csIGhhbmRsZUVycm9yKSkpO1xuICAgICAgICB9O1xuICAgICAgICBvcGVuV2luZG93KCk7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gd2luZG93Lm5leHQodmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSwgaGFuZGxlRXJyb3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsb3NpbmdTdWJzY3JpYmVyID09PSBudWxsIHx8IGNsb3NpbmdTdWJzY3JpYmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbG9zaW5nU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgd2luZG93ID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy53aW5kb3dXaGVuID0gd2luZG93V2hlbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpbmRvd1doZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy53aXRoTGF0ZXN0RnJvbSA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGlubmVyRnJvbV8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvaW5uZXJGcm9tXCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG5mdW5jdGlvbiB3aXRoTGF0ZXN0RnJvbSgpIHtcbiAgICB2YXIgaW5wdXRzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgaW5wdXRzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBwcm9qZWN0ID0gYXJnc18xLnBvcFJlc3VsdFNlbGVjdG9yKGlucHV0cyk7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGxlbiA9IGlucHV0cy5sZW5ndGg7XG4gICAgICAgIHZhciBvdGhlclZhbHVlcyA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICB2YXIgaGFzVmFsdWUgPSBpbnB1dHMubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9KTtcbiAgICAgICAgdmFyIHJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIGlubmVyRnJvbV8xLmlubmVyRnJvbShpbnB1dHNbaV0pLnN1YnNjcmliZShPcGVyYXRvclN1YnNjcmliZXJfMS5jcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJWYWx1ZXNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlYWR5ICYmICFoYXNWYWx1ZVtpXSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNWYWx1ZVtpXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIChyZWFkeSA9IGhhc1ZhbHVlLmV2ZXJ5KGlkZW50aXR5XzEuaWRlbnRpdHkpKSAmJiAoaGFzVmFsdWUgPSBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBub29wXzEubm9vcCkpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoT3BlcmF0b3JTdWJzY3JpYmVyXzEuY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IF9fc3ByZWFkQXJyYXkoW3ZhbHVlXSwgX19yZWFkKG90aGVyVmFsdWVzKSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHByb2plY3QgPyBwcm9qZWN0LmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHZhbHVlcykpKSA6IHZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMud2l0aExhdGVzdEZyb20gPSB3aXRoTGF0ZXN0RnJvbTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpdGhMYXRlc3RGcm9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuemlwID0gdm9pZCAwO1xudmFyIHppcF8xID0gcmVxdWlyZShcIi4uL29ic2VydmFibGUvemlwXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG5mdW5jdGlvbiB6aXAoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHppcF8xLnppcC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW3NvdXJjZV0sIF9fcmVhZChzb3VyY2VzKSkpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuemlwID0gemlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9emlwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy56aXBBbGwgPSB2b2lkIDA7XG52YXIgemlwXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS96aXBcIik7XG52YXIgam9pbkFsbEludGVybmFsc18xID0gcmVxdWlyZShcIi4vam9pbkFsbEludGVybmFsc1wiKTtcbmZ1bmN0aW9uIHppcEFsbChwcm9qZWN0KSB7XG4gICAgcmV0dXJuIGpvaW5BbGxJbnRlcm5hbHNfMS5qb2luQWxsSW50ZXJuYWxzKHppcF8xLnppcCwgcHJvamVjdCk7XG59XG5leHBvcnRzLnppcEFsbCA9IHppcEFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXppcEFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnppcFdpdGggPSB2b2lkIDA7XG52YXIgemlwXzEgPSByZXF1aXJlKFwiLi96aXBcIik7XG5mdW5jdGlvbiB6aXBXaXRoKCkge1xuICAgIHZhciBvdGhlcklucHV0cyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIG90aGVySW5wdXRzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiB6aXBfMS56aXAuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQob3RoZXJJbnB1dHMpKSk7XG59XG5leHBvcnRzLnppcFdpdGggPSB6aXBXaXRoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9emlwV2l0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2NoZWR1bGVBcnJheSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlQXJyYXkoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpID09PSBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5wdXRbaSsrXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2NoZWR1bGVBcnJheSA9IHNjaGVkdWxlQXJyYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUFycmF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2hlZHVsZUFzeW5jSXRlcmFibGUgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgZXhlY3V0ZVNjaGVkdWxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9leGVjdXRlU2NoZWR1bGVcIik7XG5mdW5jdGlvbiBzY2hlZHVsZUFzeW5jSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYWJsZSBjYW5ub3QgYmUgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGV4ZWN1dGVTY2hlZHVsZV8xLmV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IGlucHV0W1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgZXhlY3V0ZVNjaGVkdWxlXzEuZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zY2hlZHVsZUFzeW5jSXRlcmFibGUgPSBzY2hlZHVsZUFzeW5jSXRlcmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUFzeW5jSXRlcmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlSXRlcmFibGUgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaXRlcmF0b3JfMSA9IHJlcXVpcmUoXCIuLi9zeW1ib2wvaXRlcmF0b3JcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBleGVjdXRlU2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yO1xuICAgICAgICBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRvciA9IGlucHV0W2l0ZXJhdG9yXzEuaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGVfMS5leGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZG9uZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBpdGVyYXRvci5uZXh0KCksIHZhbHVlID0gX2EudmFsdWUsIGRvbmUgPSBfYS5kb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihpdGVyYXRvciA9PT0gbnVsbCB8fCBpdGVyYXRvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaXRlcmF0b3IucmV0dXJuKSAmJiBpdGVyYXRvci5yZXR1cm4oKTsgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2NoZWR1bGVJdGVyYWJsZSA9IHNjaGVkdWxlSXRlcmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUl0ZXJhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2hlZHVsZU9ic2VydmFibGUgPSB2b2lkIDA7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgb2JzZXJ2ZU9uXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL29ic2VydmVPblwiKTtcbnZhciBzdWJzY3JpYmVPbl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9zdWJzY3JpYmVPblwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlT2JzZXJ2YWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGlubmVyRnJvbV8xLmlubmVyRnJvbShpbnB1dCkucGlwZShzdWJzY3JpYmVPbl8xLnN1YnNjcmliZU9uKHNjaGVkdWxlciksIG9ic2VydmVPbl8xLm9ic2VydmVPbihzY2hlZHVsZXIpKTtcbn1cbmV4cG9ydHMuc2NoZWR1bGVPYnNlcnZhYmxlID0gc2NoZWR1bGVPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVPYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2hlZHVsZVByb21pc2UgPSB2b2lkIDA7XG52YXIgaW5uZXJGcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9pbm5lckZyb21cIik7XG52YXIgb2JzZXJ2ZU9uXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL29ic2VydmVPblwiKTtcbnZhciBzdWJzY3JpYmVPbl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9zdWJzY3JpYmVPblwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGlubmVyRnJvbV8xLmlubmVyRnJvbShpbnB1dCkucGlwZShzdWJzY3JpYmVPbl8xLnN1YnNjcmliZU9uKHNjaGVkdWxlciksIG9ic2VydmVPbl8xLm9ic2VydmVPbihzY2hlZHVsZXIpKTtcbn1cbmV4cG9ydHMuc2NoZWR1bGVQcm9taXNlID0gc2NoZWR1bGVQcm9taXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVQcm9taXNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZSA9IHZvaWQgMDtcbnZhciBzY2hlZHVsZUFzeW5jSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlQXN5bmNJdGVyYWJsZVwiKTtcbnZhciBpc1JlYWRhYmxlU3RyZWFtTGlrZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2VcIik7XG5mdW5jdGlvbiBzY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlQXN5bmNJdGVyYWJsZV8xLnNjaGVkdWxlQXN5bmNJdGVyYWJsZShpc1JlYWRhYmxlU3RyZWFtTGlrZV8xLnJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IoaW5wdXQpLCBzY2hlZHVsZXIpO1xufVxuZXhwb3J0cy5zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZSA9IHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlZCA9IHZvaWQgMDtcbnZhciBzY2hlZHVsZU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlT2JzZXJ2YWJsZVwiKTtcbnZhciBzY2hlZHVsZVByb21pc2VfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlUHJvbWlzZVwiKTtcbnZhciBzY2hlZHVsZUFycmF5XzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZUFycmF5XCIpO1xudmFyIHNjaGVkdWxlSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlSXRlcmFibGVcIik7XG52YXIgc2NoZWR1bGVBc3luY0l0ZXJhYmxlXzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZUFzeW5jSXRlcmFibGVcIik7XG52YXIgaXNJbnRlcm9wT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNJbnRlcm9wT2JzZXJ2YWJsZVwiKTtcbnZhciBpc1Byb21pc2VfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzUHJvbWlzZVwiKTtcbnZhciBpc0FycmF5TGlrZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNBcnJheUxpa2VcIik7XG52YXIgaXNJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNJdGVyYWJsZVwiKTtcbnZhciBpc0FzeW5jSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzQXN5bmNJdGVyYWJsZVwiKTtcbnZhciB0aHJvd1Vub2JzZXJ2YWJsZUVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yXCIpO1xudmFyIGlzUmVhZGFibGVTdHJlYW1MaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZVwiKTtcbnZhciBzY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2VcIik7XG5mdW5jdGlvbiBzY2hlZHVsZWQoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc0ludGVyb3BPYnNlcnZhYmxlXzEuaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZU9ic2VydmFibGVfMS5zY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlXzEuaXNBcnJheUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVBcnJheV8xLnNjaGVkdWxlQXJyYXkoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvbWlzZV8xLmlzUHJvbWlzZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVByb21pc2VfMS5zY2hlZHVsZVByb21pc2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXN5bmNJdGVyYWJsZV8xLmlzQXN5bmNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFzeW5jSXRlcmFibGVfMS5zY2hlZHVsZUFzeW5jSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmFibGVfMS5pc0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlSXRlcmFibGVfMS5zY2hlZHVsZUl0ZXJhYmxlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JlYWRhYmxlU3RyZWFtTGlrZV8xLmlzUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlXzEuc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgdGhyb3dVbm9ic2VydmFibGVFcnJvcl8xLmNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yKGlucHV0KTtcbn1cbmV4cG9ydHMuc2NoZWR1bGVkID0gc2NoZWR1bGVkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQWN0aW9uID0gdm9pZCAwO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmlwdGlvblwiKTtcbnZhciBBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB9XG4gICAgQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEFjdGlvbjtcbn0oU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKSk7XG5leHBvcnRzLkFjdGlvbiA9IEFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFuaW1hdGlvbkZyYW1lQWN0aW9uID0gdm9pZCAwO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9Bc3luY0FjdGlvblwiKTtcbnZhciBhbmltYXRpb25GcmFtZVByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9hbmltYXRpb25GcmFtZVByb3ZpZGVyXCIpO1xudmFyIEFuaW1hdGlvbkZyYW1lQWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQW5pbWF0aW9uRnJhbWVBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWVBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlciwgd29yaykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICBfdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBbmltYXRpb25GcmFtZUFjdGlvbi5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmIChkZWxheSAhPT0gbnVsbCAmJiBkZWxheSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlci5hY3Rpb25zLnB1c2godGhpcyk7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuX3NjaGVkdWxlZCB8fCAoc2NoZWR1bGVyLl9zY2hlZHVsZWQgPSBhbmltYXRpb25GcmFtZVByb3ZpZGVyXzEuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZWR1bGVyLmZsdXNoKHVuZGVmaW5lZCk7IH0pKTtcbiAgICB9O1xuICAgIEFuaW1hdGlvbkZyYW1lQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoZGVsYXkgIT0gbnVsbCA/IGRlbGF5ID4gMCA6IHRoaXMuZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZC5jYWxsKHRoaXMsIHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWN0aW9ucyA9IHNjaGVkdWxlci5hY3Rpb25zO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCAmJiBpZCA9PT0gc2NoZWR1bGVyLl9zY2hlZHVsZWQgJiYgKChfYSA9IGFjdGlvbnNbYWN0aW9ucy5sZW5ndGggLSAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKSAhPT0gaWQpIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMS5hbmltYXRpb25GcmFtZVByb3ZpZGVyLmNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICAgICAgICAgIHNjaGVkdWxlci5fc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gQW5pbWF0aW9uRnJhbWVBY3Rpb247XG59KEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pKTtcbmV4cG9ydHMuQW5pbWF0aW9uRnJhbWVBY3Rpb24gPSBBbmltYXRpb25GcmFtZUFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFuaW1hdGlvbkZyYW1lQWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xudmFyIEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgZmx1c2hJZDtcbiAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgICAgZmx1c2hJZCA9IGFjdGlvbi5pZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZsdXNoSWQgPSB0aGlzLl9zY2hlZHVsZWQ7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgYWN0aW9uID0gYWN0aW9uIHx8IGFjdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnNbMF0pICYmIGFjdGlvbi5pZCA9PT0gZmx1c2hJZCAmJiBhY3Rpb25zLnNoaWZ0KCkpO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnNbMF0pICYmIGFjdGlvbi5pZCA9PT0gZmx1c2hJZCAmJiBhY3Rpb25zLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXI7XG59KEFzeW5jU2NoZWR1bGVyXzEuQXN5bmNTY2hlZHVsZXIpKTtcbmV4cG9ydHMuQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSBBbmltYXRpb25GcmFtZVNjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXNhcEFjdGlvbiA9IHZvaWQgMDtcbnZhciBBc3luY0FjdGlvbl8xID0gcmVxdWlyZShcIi4vQXN5bmNBY3Rpb25cIik7XG52YXIgaW1tZWRpYXRlUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL2ltbWVkaWF0ZVByb3ZpZGVyXCIpO1xudmFyIEFzYXBBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc2FwQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzYXBBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlciwgd29yaykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICBfdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc2FwQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKGRlbGF5ICE9PSBudWxsICYmIGRlbGF5ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVyLmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5fc2NoZWR1bGVkIHx8IChzY2hlZHVsZXIuX3NjaGVkdWxlZCA9IGltbWVkaWF0ZVByb3ZpZGVyXzEuaW1tZWRpYXRlUHJvdmlkZXIuc2V0SW1tZWRpYXRlKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgdW5kZWZpbmVkKSkpO1xuICAgIH07XG4gICAgQXNhcEFjdGlvbi5wcm90b3R5cGUucmVjeWNsZUFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKGRlbGF5ICE9IG51bGwgPyBkZWxheSA+IDAgOiB0aGlzLmRlbGF5ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVjeWNsZUFzeW5jSWQuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFjdGlvbnMgPSBzY2hlZHVsZXIuYWN0aW9ucztcbiAgICAgICAgaWYgKGlkICE9IG51bGwgJiYgKChfYSA9IGFjdGlvbnNbYWN0aW9ucy5sZW5ndGggLSAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKSAhPT0gaWQpIHtcbiAgICAgICAgICAgIGltbWVkaWF0ZVByb3ZpZGVyXzEuaW1tZWRpYXRlUHJvdmlkZXIuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgICAgICAgICAgaWYgKHNjaGVkdWxlci5fc2NoZWR1bGVkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlci5fc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gQXNhcEFjdGlvbjtcbn0oQXN5bmNBY3Rpb25fMS5Bc3luY0FjdGlvbikpO1xuZXhwb3J0cy5Bc2FwQWN0aW9uID0gQXNhcEFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzYXBBY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc2FwU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIEFzeW5jU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9Bc3luY1NjaGVkdWxlclwiKTtcbnZhciBBc2FwU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXNhcFNjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc2FwU2NoZWR1bGVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEFzYXBTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgZmx1c2hJZCA9IHRoaXMuX3NjaGVkdWxlZDtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICBhY3Rpb24gPSBhY3Rpb24gfHwgYWN0aW9ucy5zaGlmdCgpO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgoYWN0aW9uID0gYWN0aW9uc1swXSkgJiYgYWN0aW9uLmlkID09PSBmbHVzaElkICYmIGFjdGlvbnMuc2hpZnQoKSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9uc1swXSkgJiYgYWN0aW9uLmlkID09PSBmbHVzaElkICYmIGFjdGlvbnMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc2FwU2NoZWR1bGVyO1xufShBc3luY1NjaGVkdWxlcl8xLkFzeW5jU2NoZWR1bGVyKSk7XG5leHBvcnRzLkFzYXBTY2hlZHVsZXIgPSBBc2FwU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXNhcFNjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFzeW5jQWN0aW9uID0gdm9pZCAwO1xudmFyIEFjdGlvbl8xID0gcmVxdWlyZShcIi4vQWN0aW9uXCIpO1xudmFyIGludGVydmFsUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVydmFsUHJvdmlkZXJcIik7XG52YXIgYXJyUmVtb3ZlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcnJSZW1vdmVcIik7XG52YXIgQXN5bmNBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc3luY0FjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY0FjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICBfdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5pZDtcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICAgICAgdGhpcy5pZCA9IChfYSA9IHRoaXMuaWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMucmVxdWVzdEFzeW5jSWQoc2NoZWR1bGVyLCB0aGlzLmlkLCBkZWxheSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgX2lkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIGludGVydmFsUHJvdmlkZXJfMS5pbnRlcnZhbFByb3ZpZGVyLnNldEludGVydmFsKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgdGhpcyksIGRlbGF5KTtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChfc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmIChkZWxheSAhPSBudWxsICYmIHRoaXMuZGVsYXkgPT09IGRlbGF5ICYmIHRoaXMucGVuZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW50ZXJ2YWxQcm92aWRlcl8xLmludGVydmFsUHJvdmlkZXIuY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2V4ZWN1dGluZyBhIGNhbmNlbGxlZCBhY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBlbmRpbmcgPT09IGZhbHNlICYmIHRoaXMuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQodGhpcy5zY2hlZHVsZXIsIHRoaXMuaWQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIF9kZWxheSkge1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JWYWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud29yayhzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JWYWx1ZSA9IGUgPyBlIDogbmV3IEVycm9yKCdTY2hlZHVsZWQgYWN0aW9uIHRocmV3IGZhbHN5IGVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yZWQpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvclZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMsIGlkID0gX2EuaWQsIHNjaGVkdWxlciA9IF9hLnNjaGVkdWxlcjtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gc2NoZWR1bGVyLmFjdGlvbnM7XG4gICAgICAgICAgICB0aGlzLndvcmsgPSB0aGlzLnN0YXRlID0gdGhpcy5zY2hlZHVsZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBhcnJSZW1vdmVfMS5hcnJSZW1vdmUoYWN0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLnJlY3ljbGVBc3luY0lkKHNjaGVkdWxlciwgaWQsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWxheSA9IG51bGw7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc3luY0FjdGlvbjtcbn0oQWN0aW9uXzEuQWN0aW9uKSk7XG5leHBvcnRzLkFzeW5jQWN0aW9uID0gQXN5bmNBY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bc3luY0FjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFzeW5jU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIFNjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4uL1NjaGVkdWxlclwiKTtcbnZhciBBc3luY1NjaGVkdWxlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzeW5jU2NoZWR1bGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jU2NoZWR1bGVyKFNjaGVkdWxlckFjdGlvbiwgbm93KSB7XG4gICAgICAgIGlmIChub3cgPT09IHZvaWQgMCkgeyBub3cgPSBTY2hlZHVsZXJfMS5TY2hlZHVsZXIubm93OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFNjaGVkdWxlckFjdGlvbiwgbm93KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5hY3Rpb25zID0gW107XG4gICAgICAgIF90aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc3luY1NjaGVkdWxlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICgoZXJyb3IgPSBhY3Rpb24uZXhlY3V0ZShhY3Rpb24uc3RhdGUsIGFjdGlvbi5kZWxheSkpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgd2hpbGUgKChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jU2NoZWR1bGVyO1xufShTY2hlZHVsZXJfMS5TY2hlZHVsZXIpKTtcbmV4cG9ydHMuQXN5bmNTY2hlZHVsZXIgPSBBc3luY1NjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUXVldWVBY3Rpb24gPSB2b2lkIDA7XG52YXIgQXN5bmNBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FzeW5jQWN0aW9uXCIpO1xudmFyIFF1ZXVlQWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUXVldWVBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUXVldWVBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlciwgd29yaykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICBfdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBRdWV1ZUFjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5zY2hlZHVsZS5jYWxsKHRoaXMsIHN0YXRlLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLmZsdXNoKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFF1ZXVlQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICByZXR1cm4gZGVsYXkgPiAwIHx8IHRoaXMuY2xvc2VkID8gX3N1cGVyLnByb3RvdHlwZS5leGVjdXRlLmNhbGwodGhpcywgc3RhdGUsIGRlbGF5KSA6IHRoaXMuX2V4ZWN1dGUoc3RhdGUsIGRlbGF5KTtcbiAgICB9O1xuICAgIFF1ZXVlQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKChkZWxheSAhPSBudWxsICYmIGRlbGF5ID4gMCkgfHwgKGRlbGF5ID09IG51bGwgJiYgdGhpcy5kZWxheSA+IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZC5jYWxsKHRoaXMsIHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZXIuZmx1c2godGhpcyk7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXVlQWN0aW9uO1xufShBc3luY0FjdGlvbl8xLkFzeW5jQWN0aW9uKSk7XG5leHBvcnRzLlF1ZXVlQWN0aW9uID0gUXVldWVBY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZUFjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlF1ZXVlU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIEFzeW5jU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9Bc3luY1NjaGVkdWxlclwiKTtcbnZhciBRdWV1ZVNjaGVkdWxlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFF1ZXVlU2NoZWR1bGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFF1ZXVlU2NoZWR1bGVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBRdWV1ZVNjaGVkdWxlcjtcbn0oQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0cy5RdWV1ZVNjaGVkdWxlciA9IFF1ZXVlU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWVTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5WaXJ0dWFsQWN0aW9uID0gZXhwb3J0cy5WaXJ0dWFsVGltZVNjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBBc3luY0FjdGlvbl8xID0gcmVxdWlyZShcIi4vQXN5bmNBY3Rpb25cIik7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIEFzeW5jU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9Bc3luY1NjaGVkdWxlclwiKTtcbnZhciBWaXJ0dWFsVGltZVNjaGVkdWxlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFZpcnR1YWxUaW1lU2NoZWR1bGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFZpcnR1YWxUaW1lU2NoZWR1bGVyKHNjaGVkdWxlckFjdGlvbkN0b3IsIG1heEZyYW1lcykge1xuICAgICAgICBpZiAoc2NoZWR1bGVyQWN0aW9uQ3RvciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlckFjdGlvbkN0b3IgPSBWaXJ0dWFsQWN0aW9uOyB9XG4gICAgICAgIGlmIChtYXhGcmFtZXMgPT09IHZvaWQgMCkgeyBtYXhGcmFtZXMgPSBJbmZpbml0eTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXJBY3Rpb25DdG9yLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5mcmFtZTsgfSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubWF4RnJhbWVzID0gbWF4RnJhbWVzO1xuICAgICAgICBfdGhpcy5mcmFtZSA9IDA7XG4gICAgICAgIF90aGlzLmluZGV4ID0gLTE7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgVmlydHVhbFRpbWVTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBhY3Rpb25zID0gX2EuYWN0aW9ucywgbWF4RnJhbWVzID0gX2EubWF4RnJhbWVzO1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHZhciBhY3Rpb247XG4gICAgICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9uc1swXSkgJiYgYWN0aW9uLmRlbGF5IDw9IG1heEZyYW1lcykge1xuICAgICAgICAgICAgYWN0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgICAgdGhpcy5mcmFtZSA9IGFjdGlvbi5kZWxheTtcbiAgICAgICAgICAgIGlmICgoZXJyb3IgPSBhY3Rpb24uZXhlY3V0ZShhY3Rpb24uc3RhdGUsIGFjdGlvbi5kZWxheSkpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBWaXJ0dWFsVGltZVNjaGVkdWxlci5mcmFtZVRpbWVGYWN0b3IgPSAxMDtcbiAgICByZXR1cm4gVmlydHVhbFRpbWVTY2hlZHVsZXI7XG59KEFzeW5jU2NoZWR1bGVyXzEuQXN5bmNTY2hlZHVsZXIpKTtcbmV4cG9ydHMuVmlydHVhbFRpbWVTY2hlZHVsZXIgPSBWaXJ0dWFsVGltZVNjaGVkdWxlcjtcbnZhciBWaXJ0dWFsQWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVmlydHVhbEFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBWaXJ0dWFsQWN0aW9uKHNjaGVkdWxlciwgd29yaywgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSAoc2NoZWR1bGVyLmluZGV4ICs9IDEpOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlciwgd29yaykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICBfdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgX3RoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgX3RoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuaW5kZXggPSBzY2hlZHVsZXIuaW5kZXggPSBpbmRleDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBWaXJ0dWFsQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoZGVsYXkpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5zY2hlZHVsZS5jYWxsKHRoaXMsIHN0YXRlLCBkZWxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBWaXJ0dWFsQWN0aW9uKHRoaXMuc2NoZWR1bGVyLCB0aGlzLndvcmspO1xuICAgICAgICAgICAgdGhpcy5hZGQoYWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uc2NoZWR1bGUoc3RhdGUsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpcnR1YWxBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICB0aGlzLmRlbGF5ID0gc2NoZWR1bGVyLmZyYW1lICsgZGVsYXk7XG4gICAgICAgIHZhciBhY3Rpb25zID0gc2NoZWR1bGVyLmFjdGlvbnM7XG4gICAgICAgIGFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAgICAgYWN0aW9ucy5zb3J0KFZpcnR1YWxBY3Rpb24uc29ydEFjdGlvbnMpO1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9O1xuICAgIFZpcnR1YWxBY3Rpb24ucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgVmlydHVhbEFjdGlvbi5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX2V4ZWN1dGUuY2FsbCh0aGlzLCBzdGF0ZSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBWaXJ0dWFsQWN0aW9uLnNvcnRBY3Rpb25zID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgaWYgKGEuZGVsYXkgPT09IGIuZGVsYXkpIHtcbiAgICAgICAgICAgIGlmIChhLmluZGV4ID09PSBiLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhLmluZGV4ID4gYi5pbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGEuZGVsYXkgPiBiLmRlbGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFZpcnR1YWxBY3Rpb247XG59KEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pKTtcbmV4cG9ydHMuVmlydHVhbEFjdGlvbiA9IFZpcnR1YWxBY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1WaXJ0dWFsVGltZVNjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWUgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIEFuaW1hdGlvbkZyYW1lQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9BbmltYXRpb25GcmFtZUFjdGlvblwiKTtcbnZhciBBbmltYXRpb25GcmFtZVNjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4vQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXJcIik7XG5leHBvcnRzLmFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyID0gbmV3IEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyXzEuQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIoQW5pbWF0aW9uRnJhbWVBY3Rpb25fMS5BbmltYXRpb25GcmFtZUFjdGlvbik7XG5leHBvcnRzLmFuaW1hdGlvbkZyYW1lID0gZXhwb3J0cy5hbmltYXRpb25GcmFtZVNjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuaW1hdGlvbkZyYW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVQcm92aWRlciA9IHZvaWQgMDtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG5leHBvcnRzLmFuaW1hdGlvbkZyYW1lUHJvdmlkZXIgPSB7XG4gICAgc2NoZWR1bGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICAgICAgdmFyIGNhbmNlbCA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgcmVxdWVzdCA9IGRlbGVnYXRlLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICAgICAgICAgIGNhbmNlbCA9IGRlbGVnYXRlLmNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYW5kbGUgPSByZXF1ZXN0KGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcbiAgICAgICAgICAgIGNhbmNlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRpbWVzdGFtcCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbihmdW5jdGlvbiAoKSB7IHJldHVybiBjYW5jZWwgPT09IG51bGwgfHwgY2FuY2VsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYW5jZWwoaGFuZGxlKTsgfSk7XG4gICAgfSxcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHx8IHJlcXVlc3RBbmltYXRpb25GcmFtZSkuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpKTtcbiAgICB9LFxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGVnYXRlID0gZXhwb3J0cy5hbmltYXRpb25GcmFtZVByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2FuY2VsQW5pbWF0aW9uRnJhbWUpIHx8IGNhbmNlbEFuaW1hdGlvbkZyYW1lKS5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmltYXRpb25GcmFtZVByb3ZpZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hc2FwID0gZXhwb3J0cy5hc2FwU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIEFzYXBBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FzYXBBY3Rpb25cIik7XG52YXIgQXNhcFNjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4vQXNhcFNjaGVkdWxlclwiKTtcbmV4cG9ydHMuYXNhcFNjaGVkdWxlciA9IG5ldyBBc2FwU2NoZWR1bGVyXzEuQXNhcFNjaGVkdWxlcihBc2FwQWN0aW9uXzEuQXNhcEFjdGlvbik7XG5leHBvcnRzLmFzYXAgPSBleHBvcnRzLmFzYXBTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc2FwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hc3luYyA9IGV4cG9ydHMuYXN5bmNTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXN5bmNBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FzeW5jQWN0aW9uXCIpO1xudmFyIEFzeW5jU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9Bc3luY1NjaGVkdWxlclwiKTtcbmV4cG9ydHMuYXN5bmNTY2hlZHVsZXIgPSBuZXcgQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcihBc3luY0FjdGlvbl8xLkFzeW5jQWN0aW9uKTtcbmV4cG9ydHMuYXN5bmMgPSBleHBvcnRzLmFzeW5jU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXN5bmMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRhdGVUaW1lc3RhbXBQcm92aWRlciA9IHZvaWQgMDtcbmV4cG9ydHMuZGF0ZVRpbWVzdGFtcFByb3ZpZGVyID0ge1xuICAgIG5vdzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKGV4cG9ydHMuZGF0ZVRpbWVzdGFtcFByb3ZpZGVyLmRlbGVnYXRlIHx8IERhdGUpLm5vdygpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRlVGltZXN0YW1wUHJvdmlkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbW1lZGlhdGVQcm92aWRlciA9IHZvaWQgMDtcbnZhciBJbW1lZGlhdGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL0ltbWVkaWF0ZVwiKTtcbnZhciBzZXRJbW1lZGlhdGUgPSBJbW1lZGlhdGVfMS5JbW1lZGlhdGUuc2V0SW1tZWRpYXRlLCBjbGVhckltbWVkaWF0ZSA9IEltbWVkaWF0ZV8xLkltbWVkaWF0ZS5jbGVhckltbWVkaWF0ZTtcbmV4cG9ydHMuaW1tZWRpYXRlUHJvdmlkZXIgPSB7XG4gICAgc2V0SW1tZWRpYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGVnYXRlID0gZXhwb3J0cy5pbW1lZGlhdGVQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnNldEltbWVkaWF0ZSkgfHwgc2V0SW1tZWRpYXRlKS5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJJbW1lZGlhdGU6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gZXhwb3J0cy5pbW1lZGlhdGVQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLmNsZWFySW1tZWRpYXRlKSB8fCBjbGVhckltbWVkaWF0ZSkoaGFuZGxlKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW1tZWRpYXRlUHJvdmlkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnRlcnZhbFByb3ZpZGVyID0gdm9pZCAwO1xuZXhwb3J0cy5pbnRlcnZhbFByb3ZpZGVyID0ge1xuICAgIHNldEludGVydmFsOiBmdW5jdGlvbiAoaGFuZGxlciwgdGltZW91dCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmludGVydmFsUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuc2V0SW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5zZXRJbnRlcnZhbC5hcHBseShkZWxlZ2F0ZSwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRJbnRlcnZhbC5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW2hhbmRsZXIsIHRpbWVvdXRdLCBfX3JlYWQoYXJncykpKTtcbiAgICB9LFxuICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gZXhwb3J0cy5pbnRlcnZhbFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJJbnRlcnZhbCkgfHwgY2xlYXJJbnRlcnZhbCkoaGFuZGxlKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJ2YWxQcm92aWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlciA9IHZvaWQgMDtcbmV4cG9ydHMucGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlciA9IHtcbiAgICBub3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChleHBvcnRzLnBlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXIuZGVsZWdhdGUgfHwgcGVyZm9ybWFuY2UpLm5vdygpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5xdWV1ZSA9IGV4cG9ydHMucXVldWVTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgUXVldWVBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL1F1ZXVlQWN0aW9uXCIpO1xudmFyIFF1ZXVlU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9RdWV1ZVNjaGVkdWxlclwiKTtcbmV4cG9ydHMucXVldWVTY2hlZHVsZXIgPSBuZXcgUXVldWVTY2hlZHVsZXJfMS5RdWV1ZVNjaGVkdWxlcihRdWV1ZUFjdGlvbl8xLlF1ZXVlQWN0aW9uKTtcbmV4cG9ydHMucXVldWUgPSBleHBvcnRzLnF1ZXVlU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVldWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50aW1lb3V0UHJvdmlkZXIgPSB2b2lkIDA7XG5leHBvcnRzLnRpbWVvdXRQcm92aWRlciA9IHtcbiAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlciwgdGltZW91dCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLnRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRUaW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuc2V0VGltZW91dC5hcHBseShkZWxlZ2F0ZSwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0LmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMudGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJUaW1lb3V0KSB8fCBjbGVhclRpbWVvdXQpKGhhbmRsZSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRQcm92aWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXRlcmF0b3IgPSBleHBvcnRzLmdldFN5bWJvbEl0ZXJhdG9yID0gdm9pZCAwO1xuZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgIH1cbiAgICByZXR1cm4gU3ltYm9sLml0ZXJhdG9yO1xufVxuZXhwb3J0cy5nZXRTeW1ib2xJdGVyYXRvciA9IGdldFN5bWJvbEl0ZXJhdG9yO1xuZXhwb3J0cy5pdGVyYXRvciA9IGdldFN5bWJvbEl0ZXJhdG9yKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVyYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IHZvaWQgMDtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7IHJldHVybiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wub2JzZXJ2YWJsZSkgfHwgJ0BAb2JzZXJ2YWJsZSc7IH0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yID0gdm9pZCAwO1xudmFyIGNyZWF0ZUVycm9yQ2xhc3NfMSA9IHJlcXVpcmUoXCIuL2NyZWF0ZUVycm9yQ2xhc3NcIik7XG5leHBvcnRzLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBBcmd1bWVudE91dE9mUmFuZ2VFcnJvckltcGwoKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ2FyZ3VtZW50IG91dCBvZiByYW5nZSc7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVtcHR5RXJyb3IgPSB2b2lkIDA7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4vY3JlYXRlRXJyb3JDbGFzc1wiKTtcbmV4cG9ydHMuRW1wdHlFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gRW1wdHlFcnJvckltcGwoKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0VtcHR5RXJyb3InO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnbm8gZWxlbWVudHMgaW4gc2VxdWVuY2UnO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVtcHR5RXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRlc3RUb29scyA9IGV4cG9ydHMuSW1tZWRpYXRlID0gdm9pZCAwO1xudmFyIG5leHRIYW5kbGUgPSAxO1xudmFyIHJlc29sdmVkO1xudmFyIGFjdGl2ZUhhbmRsZXMgPSB7fTtcbmZ1bmN0aW9uIGZpbmRBbmRDbGVhckhhbmRsZShoYW5kbGUpIHtcbiAgICBpZiAoaGFuZGxlIGluIGFjdGl2ZUhhbmRsZXMpIHtcbiAgICAgICAgZGVsZXRlIGFjdGl2ZUhhbmRsZXNbaGFuZGxlXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuSW1tZWRpYXRlID0ge1xuICAgIHNldEltbWVkaWF0ZTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHZhciBoYW5kbGUgPSBuZXh0SGFuZGxlKys7XG4gICAgICAgIGFjdGl2ZUhhbmRsZXNbaGFuZGxlXSA9IHRydWU7XG4gICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZWQudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBmaW5kQW5kQ2xlYXJIYW5kbGUoaGFuZGxlKSAmJiBjYigpOyB9KTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICB9LFxuICAgIGNsZWFySW1tZWRpYXRlOiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIGZpbmRBbmRDbGVhckhhbmRsZShoYW5kbGUpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5UZXN0VG9vbHMgPSB7XG4gICAgcGVuZGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYWN0aXZlSGFuZGxlcykubGVuZ3RoO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbW1lZGlhdGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5vdEZvdW5kRXJyb3IgPSB2b2lkIDA7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4vY3JlYXRlRXJyb3JDbGFzc1wiKTtcbmV4cG9ydHMuTm90Rm91bmRFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gTm90Rm91bmRFcnJvckltcGwobWVzc2FnZSkge1xuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdOb3RGb3VuZEVycm9yJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ob3RGb3VuZEVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5PYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JJbXBsKCkge1xuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdvYmplY3QgdW5zdWJzY3JpYmVkJztcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VxdWVuY2VFcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5TZXF1ZW5jZUVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBTZXF1ZW5jZUVycm9ySW1wbChtZXNzYWdlKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1NlcXVlbmNlRXJyb3InO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNlcXVlbmNlRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSB2b2lkIDA7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4vY3JlYXRlRXJyb3JDbGFzc1wiKTtcbmV4cG9ydHMuVW5zdWJzY3JpcHRpb25FcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvckltcGwoZXJyb3JzKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3JzXG4gICAgICAgICAgICA/IGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcblwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiBpICsgMSArIFwiKSBcIiArIGVyci50b1N0cmluZygpOyB9KS5qb2luKCdcXG4gICcpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBvcE51bWJlciA9IGV4cG9ydHMucG9wU2NoZWR1bGVyID0gZXhwb3J0cy5wb3BSZXN1bHRTZWxlY3RvciA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xudmFyIGlzU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9pc1NjaGVkdWxlclwiKTtcbmZ1bmN0aW9uIGxhc3QoYXJyKSB7XG4gICAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG59XG5mdW5jdGlvbiBwb3BSZXN1bHRTZWxlY3RvcihhcmdzKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGxhc3QoYXJncykpID8gYXJncy5wb3AoKSA6IHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMucG9wUmVzdWx0U2VsZWN0b3IgPSBwb3BSZXN1bHRTZWxlY3RvcjtcbmZ1bmN0aW9uIHBvcFNjaGVkdWxlcihhcmdzKSB7XG4gICAgcmV0dXJuIGlzU2NoZWR1bGVyXzEuaXNTY2hlZHVsZXIobGFzdChhcmdzKSkgPyBhcmdzLnBvcCgpIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0cy5wb3BTY2hlZHVsZXIgPSBwb3BTY2hlZHVsZXI7XG5mdW5jdGlvbiBwb3BOdW1iZXIoYXJncywgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBsYXN0KGFyZ3MpID09PSAnbnVtYmVyJyA/IGFyZ3MucG9wKCkgOiBkZWZhdWx0VmFsdWU7XG59XG5leHBvcnRzLnBvcE51bWJlciA9IHBvcE51bWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyZ3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFyZ3NBcmdBcnJheU9yT2JqZWN0ID0gdm9pZCAwO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLCBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGUsIGdldEtleXMgPSBPYmplY3Qua2V5cztcbmZ1bmN0aW9uIGFyZ3NBcmdBcnJheU9yT2JqZWN0KGFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFyIGZpcnN0XzEgPSBhcmdzWzBdO1xuICAgICAgICBpZiAoaXNBcnJheShmaXJzdF8xKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgYXJnczogZmlyc3RfMSwga2V5czogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1BPSk8oZmlyc3RfMSkpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gZ2V0S2V5cyhmaXJzdF8xKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXJnczoga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZmlyc3RfMVtrZXldOyB9KSxcbiAgICAgICAgICAgICAgICBrZXlzOiBrZXlzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBhcmdzOiBhcmdzLCBrZXlzOiBudWxsIH07XG59XG5leHBvcnRzLmFyZ3NBcmdBcnJheU9yT2JqZWN0ID0gYXJnc0FyZ0FycmF5T3JPYmplY3Q7XG5mdW5jdGlvbiBpc1BPSk8ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBnZXRQcm90b3R5cGVPZihvYmopID09PSBvYmplY3RQcm90bztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyZ3NBcmdBcnJheU9yT2JqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcmdzT3JBcmdBcnJheSA9IHZvaWQgMDtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmZ1bmN0aW9uIGFyZ3NPckFyZ0FycmF5KGFyZ3MpIHtcbiAgICByZXR1cm4gYXJncy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShhcmdzWzBdKSA/IGFyZ3NbMF0gOiBhcmdzO1xufVxuZXhwb3J0cy5hcmdzT3JBcmdBcnJheSA9IGFyZ3NPckFyZ0FycmF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJnc09yQXJnQXJyYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFyclJlbW92ZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGFyclJlbW92ZShhcnIsIGl0ZW0pIHtcbiAgICBpZiAoYXJyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAwIDw9IGluZGV4ICYmIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cbmV4cG9ydHMuYXJyUmVtb3ZlID0gYXJyUmVtb3ZlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyUmVtb3ZlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVFcnJvckNsYXNzID0gdm9pZCAwO1xuZnVuY3Rpb24gY3JlYXRlRXJyb3JDbGFzcyhjcmVhdGVJbXBsKSB7XG4gICAgdmFyIF9zdXBlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBFcnJvci5jYWxsKGluc3RhbmNlKTtcbiAgICAgICAgaW5zdGFuY2Uuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9O1xuICAgIHZhciBjdG9yRnVuYyA9IGNyZWF0ZUltcGwoX3N1cGVyKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgY3RvckZ1bmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvckZ1bmM7XG4gICAgcmV0dXJuIGN0b3JGdW5jO1xufVxuZXhwb3J0cy5jcmVhdGVFcnJvckNsYXNzID0gY3JlYXRlRXJyb3JDbGFzcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZWF0ZUVycm9yQ2xhc3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZU9iamVjdCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdChrZXlzLCB2YWx1ZXMpIHtcbiAgICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwga2V5LCBpKSB7IHJldHVybiAoKHJlc3VsdFtrZXldID0gdmFsdWVzW2ldKSwgcmVzdWx0KTsgfSwge30pO1xufVxuZXhwb3J0cy5jcmVhdGVPYmplY3QgPSBjcmVhdGVPYmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGVPYmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNhcHR1cmVFcnJvciA9IGV4cG9ydHMuZXJyb3JDb250ZXh0ID0gdm9pZCAwO1xudmFyIGNvbmZpZ18xID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciBjb250ZXh0ID0gbnVsbDtcbmZ1bmN0aW9uIGVycm9yQ29udGV4dChjYikge1xuICAgIGlmIChjb25maWdfMS5jb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICB2YXIgaXNSb290ID0gIWNvbnRleHQ7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB7IGVycm9yVGhyb3duOiBmYWxzZSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYigpO1xuICAgICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBjb250ZXh0LCBlcnJvclRocm93biA9IF9hLmVycm9yVGhyb3duLCBlcnJvciA9IF9hLmVycm9yO1xuICAgICAgICAgICAgY29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2IoKTtcbiAgICB9XG59XG5leHBvcnRzLmVycm9yQ29udGV4dCA9IGVycm9yQ29udGV4dDtcbmZ1bmN0aW9uIGNhcHR1cmVFcnJvcihlcnIpIHtcbiAgICBpZiAoY29uZmlnXzEuY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcgJiYgY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LmVycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgY29udGV4dC5lcnJvciA9IGVycjtcbiAgICB9XG59XG5leHBvcnRzLmNhcHR1cmVFcnJvciA9IGNhcHR1cmVFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yQ29udGV4dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXhlY3V0ZVNjaGVkdWxlID0gdm9pZCAwO1xuZnVuY3Rpb24gZXhlY3V0ZVNjaGVkdWxlKHBhcmVudFN1YnNjcmlwdGlvbiwgc2NoZWR1bGVyLCB3b3JrLCBkZWxheSwgcmVwZWF0KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgaWYgKHJlcGVhdCA9PT0gdm9pZCAwKSB7IHJlcGVhdCA9IGZhbHNlOyB9XG4gICAgdmFyIHNjaGVkdWxlU3Vic2NyaXB0aW9uID0gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd29yaygpO1xuICAgICAgICBpZiAocmVwZWF0KSB7XG4gICAgICAgICAgICBwYXJlbnRTdWJzY3JpcHRpb24uYWRkKHRoaXMuc2NoZWR1bGUobnVsbCwgZGVsYXkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH0sIGRlbGF5KTtcbiAgICBwYXJlbnRTdWJzY3JpcHRpb24uYWRkKHNjaGVkdWxlU3Vic2NyaXB0aW9uKTtcbiAgICBpZiAoIXJlcGVhdCkge1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVTdWJzY3JpcHRpb247XG4gICAgfVxufVxuZXhwb3J0cy5leGVjdXRlU2NoZWR1bGUgPSBleGVjdXRlU2NoZWR1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGVjdXRlU2NoZWR1bGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlkZW50aXR5ID0gdm9pZCAwO1xuZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICAgIHJldHVybiB4O1xufVxuZXhwb3J0cy5pZGVudGl0eSA9IGlkZW50aXR5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWRlbnRpdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzQXJyYXlMaWtlID0gdm9pZCAwO1xuZXhwb3J0cy5pc0FycmF5TGlrZSA9IChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAmJiB0eXBlb2YgeC5sZW5ndGggPT09ICdudW1iZXInICYmIHR5cGVvZiB4ICE9PSAnZnVuY3Rpb24nOyB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXJyYXlMaWtlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0FzeW5jSXRlcmFibGUgPSB2b2lkIDA7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGlzQXN5bmNJdGVyYWJsZShvYmopIHtcbiAgICByZXR1cm4gU3ltYm9sLmFzeW5jSXRlcmF0b3IgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2JqW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSk7XG59XG5leHBvcnRzLmlzQXN5bmNJdGVyYWJsZSA9IGlzQXN5bmNJdGVyYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXN5bmNJdGVyYWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNWYWxpZERhdGUgPSB2b2lkIDA7XG5mdW5jdGlvbiBpc1ZhbGlkRGF0ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKHZhbHVlKTtcbn1cbmV4cG9ydHMuaXNWYWxpZERhdGUgPSBpc1ZhbGlkRGF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRGF0ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IHZvaWQgMDtcbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRnVuY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzSW50ZXJvcE9ic2VydmFibGUgPSB2b2lkIDA7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL3N5bWJvbC9vYnNlcnZhYmxlXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBpc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGlucHV0W29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSk7XG59XG5leHBvcnRzLmlzSW50ZXJvcE9ic2VydmFibGUgPSBpc0ludGVyb3BPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJbnRlcm9wT2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNJdGVyYWJsZSA9IHZvaWQgMDtcbnZhciBpdGVyYXRvcl8xID0gcmVxdWlyZShcIi4uL3N5bWJvbC9pdGVyYXRvclwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gaXNJdGVyYWJsZShpbnB1dCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihpbnB1dCA9PT0gbnVsbCB8fCBpbnB1dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5wdXRbaXRlcmF0b3JfMS5pdGVyYXRvcl0pO1xufVxuZXhwb3J0cy5pc0l0ZXJhYmxlID0gaXNJdGVyYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzSXRlcmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gaXNPYnNlcnZhYmxlKG9iaikge1xuICAgIHJldHVybiAhIW9iaiAmJiAob2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUgfHwgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9iai5saWZ0KSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYmouc3Vic2NyaWJlKSkpO1xufVxuZXhwb3J0cy5pc09ic2VydmFibGUgPSBpc09ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzUHJvbWlzZSA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gaXNQcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YWx1ZS50aGVuKTtcbn1cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNQcm9taXNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19hd2FpdCA9ICh0aGlzICYmIHRoaXMuX19hd2FpdCkgfHwgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7IH1cbnZhciBfX2FzeW5jR2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2FzeW5jR2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1JlYWRhYmxlU3RyZWFtTGlrZSA9IGV4cG9ydHMucmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihyZWFkYWJsZVN0cmVhbSkge1xuICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcl8xKCkge1xuICAgICAgICB2YXIgcmVhZGVyLCBfYSwgdmFsdWUsIGRvbmU7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRhYmxlU3RyZWFtLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cnVlKSByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9fYXdhaXQocmVhZGVyLnJlYWQoKSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIHZhbHVlID0gX2EudmFsdWUsIGRvbmUgPSBfYS5kb25lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRvbmUpIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX19hd2FpdCh2b2lkIDApXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiwgX2Iuc2VudCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbNCwgX19hd2FpdCh2YWx1ZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0LCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFszLCAxMF07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVsZWFzZUxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciA9IHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3I7XG5mdW5jdGlvbiBpc1JlYWRhYmxlU3RyZWFtTGlrZShvYmopIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2JqLmdldFJlYWRlcik7XG59XG5leHBvcnRzLmlzUmVhZGFibGVTdHJlYW1MaWtlID0gaXNSZWFkYWJsZVN0cmVhbUxpa2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1JlYWRhYmxlU3RyZWFtTGlrZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGlzU2NoZWR1bGVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlLnNjaGVkdWxlKTtcbn1cbmV4cG9ydHMuaXNTY2hlZHVsZXIgPSBpc1NjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vcGVyYXRlID0gZXhwb3J0cy5oYXNMaWZ0ID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBoYXNMaWZ0KHNvdXJjZSkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihzb3VyY2UgPT09IG51bGwgfHwgc291cmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzb3VyY2UubGlmdCk7XG59XG5leHBvcnRzLmhhc0xpZnQgPSBoYXNMaWZ0O1xuZnVuY3Rpb24gb3BlcmF0ZShpbml0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgaWYgKGhhc0xpZnQoc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5saWZ0KGZ1bmN0aW9uIChsaWZ0ZWRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5pdChsaWZ0ZWRTb3VyY2UsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmFibGUgdG8gbGlmdCB1bmtub3duIE9ic2VydmFibGUgdHlwZScpO1xuICAgIH07XG59XG5leHBvcnRzLm9wZXJhdGUgPSBvcGVyYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1hcE9uZU9yTWFueUFyZ3MgPSB2b2lkIDA7XG52YXIgbWFwXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL21hcFwiKTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmZ1bmN0aW9uIGNhbGxPckFwcGx5KGZuLCBhcmdzKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkoYXJncykgPyBmbi5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpIDogZm4oYXJncyk7XG59XG5mdW5jdGlvbiBtYXBPbmVPck1hbnlBcmdzKGZuKSB7XG4gICAgcmV0dXJuIG1hcF8xLm1hcChmdW5jdGlvbiAoYXJncykgeyByZXR1cm4gY2FsbE9yQXBwbHkoZm4sIGFyZ3MpOyB9KTtcbn1cbmV4cG9ydHMubWFwT25lT3JNYW55QXJncyA9IG1hcE9uZU9yTWFueUFyZ3M7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBPbmVPck1hbnlBcmdzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ub29wID0gdm9pZCAwO1xuZnVuY3Rpb24gbm9vcCgpIHsgfVxuZXhwb3J0cy5ub29wID0gbm9vcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vb3AuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5vdCA9IHZvaWQgMDtcbmZ1bmN0aW9uIG5vdChwcmVkLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHsgcmV0dXJuICFwcmVkLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KTsgfTtcbn1cbmV4cG9ydHMubm90ID0gbm90O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5waXBlRnJvbUFycmF5ID0gZXhwb3J0cy5waXBlID0gdm9pZCAwO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi9pZGVudGl0eVwiKTtcbmZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0cy5waXBlID0gcGlwZTtcbmZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5XzEuaWRlbnRpdHk7XG4gICAgfVxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmbnNbMF07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwaXBlZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZm5zLnJlZHVjZShmdW5jdGlvbiAocHJldiwgZm4pIHsgcmV0dXJuIGZuKHByZXYpOyB9LCBpbnB1dCk7XG4gICAgfTtcbn1cbmV4cG9ydHMucGlwZUZyb21BcnJheSA9IHBpcGVGcm9tQXJyYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXBvcnRVbmhhbmRsZWRFcnJvciA9IHZvaWQgMDtcbnZhciBjb25maWdfMSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG52YXIgdGltZW91dFByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlclwiKTtcbmZ1bmN0aW9uIHJlcG9ydFVuaGFuZGxlZEVycm9yKGVycikge1xuICAgIHRpbWVvdXRQcm92aWRlcl8xLnRpbWVvdXRQcm92aWRlci5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9uVW5oYW5kbGVkRXJyb3IgPSBjb25maWdfMS5jb25maWcub25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgaWYgKG9uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIG9uVW5oYW5kbGVkRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5yZXBvcnRVbmhhbmRsZWRFcnJvciA9IHJlcG9ydFVuaGFuZGxlZEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVwb3J0VW5oYW5kbGVkRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yID0gdm9pZCAwO1xuZnVuY3Rpb24gY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBwcm92aWRlZCBcIiArIChpbnB1dCAhPT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IFwiJ1wiICsgaW5wdXQgKyBcIidcIikgKyBcIiB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWQuIFlvdSBjYW4gcHJvdmlkZSBhbiBPYnNlcnZhYmxlLCBQcm9taXNlLCBSZWFkYWJsZVN0cmVhbSwgQXJyYXksIEFzeW5jSXRlcmFibGUsIG9yIEl0ZXJhYmxlLlwiKTtcbn1cbmV4cG9ydHMuY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgPSBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm93VW5vYnNlcnZhYmxlRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkxvYWRpbmdDb21wb25lbnRYID0gdm9pZCAwO1xuZXhwb3J0cy5hZGRCdXR0b24gPSBhZGRCdXR0b247XG5leHBvcnRzLmRlbGV0ZVRhYmxlUm93ID0gZGVsZXRlVGFibGVSb3c7XG53aW5kb3cuZXhwb3J0cyA9IHt9O1xuY29uc3QgbGliXzEgPSByZXF1aXJlKFwiLi9saWIvbGliXCIpO1xuY2xhc3MgTG9hZGluZ0NvbXBvbmVudFgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvL3RoaXMuc3Vic2NyaXB0aW9uID0gbG9hZGluZ1NlcnZpY2UubG9hZGluZyQuc3Vic2NyaWJlKChpc0xvYWRpbmc6IGFueSkgPT4ge1xuICAgICAgICAvLyAgbGV0IHRoYXQgPSBHbG9iYWxQYXJhbXMuZ2V0TG9hZGluZ0VsZW1lbnQoKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIC8vICBpZiAoaXNMb2FkaW5nICYmIHRoYXQpIHtcbiAgICAgICAgLy8gICAgICBpZiAoR2xvYmFsUGFyYW1zLmdldE1vZGFsTG9hZGluZygpKSB7XG4gICAgICAgIC8vICAgICAgICAgIChHbG9iYWxQYXJhbXMuZ2V0TG9hZGluZ0NvbnRhaW5lcigpIGFzIEhUTUxEaXZFbGVtZW50KS5jbGFzc05hbWUgPSBcImxvYWRpbmctbW9kYWxcIjtcbiAgICAgICAgLy8gICAgICAgICAgdGhhdC5jbGFzc05hbWUgPSBcImxvYWRlclwiXG4gICAgICAgIC8vICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgdGhhdC5jbGFzc05hbWUgPSBcImxvYWRlclwiXG4gICAgICAgIC8vICAgICAgfVxuICAgICAgICAvLyAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAoR2xvYmFsUGFyYW1zLmdldExvYWRpbmdDb250YWluZXIoKSBhcyBIVE1MRGl2RWxlbWVudCkuY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgLy8gICAgICAoR2xvYmFsUGFyYW1zLmdldExvYWRpbmdFbGVtZW50KCkgYXMgSFRNTERpdkVsZW1lbnQpLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgIC8vICB9XG4gICAgICAgIC8vfSk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuZXhwb3J0cy5Mb2FkaW5nQ29tcG9uZW50WCA9IExvYWRpbmdDb21wb25lbnRYO1xuZnVuY3Rpb24gYWRkQnV0dG9uKHRleHQsIG9uQ2xpY2spIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG4tcHJpbWFyeVwiKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGlmIChvbkNsaWNrKSB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uO1xufVxuZnVuY3Rpb24gZGVsZXRlVGFibGVSb3cocm93KSB7XG4gICAgbGV0IHRpbWVvdXRJZDtcbiAgICByb3cuY2xhc3NMaXN0LmFkZCgnYm94ZmFkZU91dCcpO1xuICAgICgwLCBsaWJfMS5hcHBEZWxheSkoMzAwKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdmYWRlLW91dCcpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByb3cucmVtb3ZlKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG4gICAgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmxvYWRpbmdTZXJ2aWNlID0gZXhwb3J0cy5zaGFyZWREYXRhU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IHJ4anNfMSA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuY2xhc3MgU2hhcmVkX0RhdGFTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kYXRhU3ViamVjdCA9IG5ldyByeGpzXzEuU3ViamVjdCgpO1xuICAgICAgICB0aGlzLmRhdGEkID0gdGhpcy5kYXRhU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG4gICAgdXBkYXRlRGF0YShkYXRhKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3VwZGF0ZURhdGE6JywgZGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YVN1YmplY3QubmV4dChkYXRhKTtcbiAgICB9XG59XG5jbGFzcyBMb2FkaW5nX1NlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHNoYXJlZFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmctaW5kaWNhdG9yJyk7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0VsZW1lbnQgPSB0aGlzLmxvYWRpbmdDb250YWluZXIuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHNoYXJlZFNlcnZpY2UuZGF0YSQuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEuaXNMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkaW5nQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZy1pbmRpY2F0b3InKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0VsZW1lbnQgPSB0aGlzLmxvYWRpbmdDb250YWluZXIuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGluZ0VsZW1lbnQuY2xhc3NOYW1lID0gXCJsb2FkZXJcIjtcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiO1xuICAgIH1cbn1cbmNvbnN0IHNoYXJlZERhdGFTZXJ2aWNlID0gbmV3IFNoYXJlZF9EYXRhU2VydmljZSgpO1xuZXhwb3J0cy5zaGFyZWREYXRhU2VydmljZSA9IHNoYXJlZERhdGFTZXJ2aWNlO1xuY29uc3QgbG9hZGluZ1NlcnZpY2UgPSBuZXcgTG9hZGluZ19TZXJ2aWNlKHNoYXJlZERhdGFTZXJ2aWNlKTtcbmV4cG9ydHMubG9hZGluZ1NlcnZpY2UgPSBsb2FkaW5nU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcGlQcm9kdWN0cyA9IHZvaWQgMDtcbndpbmRvdy5leHBvcnRzID0ge307XG5jb25zdCByeGpzXzEgPSByZXF1aXJlKFwicnhqc1wiKTtcbmNvbnN0IGh0dHBDbGllbnRfMSA9IHJlcXVpcmUoXCIuL2h0dHBDbGllbnRcIik7XG5jbGFzcyBBcGlfUHJvZHVjdHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFwaV9iYXNlID0gJ2h0dHBzOi8vZmFrZXN0b3JlYXBpLmNvbSc7XG4gICAgICAgIHRoaXMuZ2V0QWxsID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IF91cmwgPSBgJHt0aGlzLmFwaV9iYXNlfS9wcm9kdWN0c2A7XG4gICAgICAgICAgICByZXR1cm4gKDAsIHJ4anNfMS5mcm9tKShodHRwQ2xpZW50XzEuY2xpZW50QXBpLmdldFJvd3MoX3VybCkpO1xuICAgICAgICB9O1xuICAgICAgICAvL2F3YWl0IGRlbGV0ZUJ5SWQodXNlcmlkKTsgXG4gICAgICAgIHRoaXMuZGVsZXRlQnlJZCA9IChfaWQpID0+IHtcbiAgICAgICAgICAgIGxldCBfdXJsID0gYCR7dGhpcy5hcGlfYmFzZX0vcHJvZHVjdHMvYDtcbiAgICAgICAgICAgIHJldHVybiBodHRwQ2xpZW50XzEuY2xpZW50QXBpLmRlbGV0ZVJvdyhfdXJsLCBfaWQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICB9XG59XG52YXIgYXBpUHJvZHVjdHMgPSBuZXcgQXBpX1Byb2R1Y3RzKCk7XG5leHBvcnRzLmFwaVByb2R1Y3RzID0gYXBpUHJvZHVjdHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jbGllbnRBcGkgPSB2b2lkIDA7XG53aW5kb3cuZXhwb3J0cyA9IHt9O1xuY29uc3QgbGliXzEgPSByZXF1aXJlKFwiLi9saWJcIik7XG5jb25zdCBTaGFyZWREYXRhU2VydmljZV8xID0gcmVxdWlyZShcIi4vU2hhcmVkRGF0YVNlcnZpY2VcIik7XG5jbGFzcyBDbGllbnRfQXBpIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9wcm9taXNlIGJ5IGRlZnVsdFxuICAgICAgICB0aGlzLmdldFJvd3MgPSAoX3VybCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRSb3dzIENsaWVudF9BcGlcIik7XG4gICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICB5aWVsZCAoMCwgbGliXzEuYXBwRGVsYXkpKDIwMDApO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChfdXJsLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGRlbGV0ZSB0by1kbzogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHlpZWxkIHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIC8vIGxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkUm93ID0gKF91cmwsIGRhdGEpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KF91cmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFNoYXJlZERhdGFTZXJ2aWNlXzEuc2hhcmVkRGF0YVNlcnZpY2UudXBkYXRlRGF0YSh7IGlzTG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGFkZCB0by1kbzogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuICAgICAgICAgICAgICAgIGlmICghY29udGVudFR5cGUgfHwgIWNvbnRlbnRUeXBlLmluY2x1ZGVzKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT29wcywgd2UgaGF2ZW4ndCBnb3QgSlNPTiFcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIC8vIGxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlUm93ID0gKF91cmwsIHRvZG8pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIFNoYXJlZERhdGFTZXJ2aWNlXzEuc2hhcmVkRGF0YVNlcnZpY2UudXBkYXRlRGF0YSh7IGlzTG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7X3VybH0vJHt0b2RvLmlkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvZG8pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gdXBkYXRlIHRvLWRvOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIC8vIGxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGVsZXRlUm93ID0gKF91cmwsIGlkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICAvL2F3YWl0IGFwcERlbGF5KDIwMDApXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke191cmx9LyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkZWxldGUgdG8tZG86ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIFNoYXJlZERhdGFTZXJ2aWNlXzEuc2hhcmVkRGF0YVNlcnZpY2UudXBkYXRlRGF0YSh7IGlzTG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgLy8gbG9hZGluZ1NlcnZpY2UuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRSb3dCeUlkID0gKF91cmwsIGlkKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBTaGFyZWREYXRhU2VydmljZV8xLnNoYXJlZERhdGFTZXJ2aWNlLnVwZGF0ZURhdGEoeyBpc0xvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7X3VybH0vJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkZWxldGUgdG8tZG86ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICh5aWVsZCByZXNwb25zZS5qc29uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgU2hhcmVkRGF0YVNlcnZpY2VfMS5zaGFyZWREYXRhU2VydmljZS51cGRhdGVEYXRhKHsgaXNMb2FkaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAvLyBsb2FkaW5nU2VydmljZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbnN0cnVjdG9yIENsaWVudF9BcGlcIik7XG4gICAgfVxufVxuY29uc3QgY2xpZW50QXBpID0gbmV3IENsaWVudF9BcGkoKTtcbmV4cG9ydHMuY2xpZW50QXBpID0gY2xpZW50QXBpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdsb2JhbFBhcmFtcyA9IHZvaWQgMDtcbmV4cG9ydHMuYXBwRGVsYXkgPSBhcHBEZWxheTtcbmV4cG9ydHMuc3BsaXRGdWxsTmFtZSA9IHNwbGl0RnVsbE5hbWU7XG5leHBvcnRzLmdldEZ1bGxOYW1lID0gZ2V0RnVsbE5hbWU7XG53aW5kb3cuZXhwb3J0cyA9IHt9O1xuZnVuY3Rpb24gYXBwRGVsYXkobWlsbGlzZWNvbmRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpKTtcbn1cbi8vZXhwb3J0IGNvbnN0IGRlbGF5ID0gKG1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKHJlcyA9PiBzZXRUaW1lb3V0KHJlcywgbXMpKTtcbmZ1bmN0aW9uIHNwbGl0RnVsbE5hbWUoZnVsbE5hbWUpIHtcbiAgICBpZiAoIWZ1bGxOYW1lKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lcyA9IGZ1bGxOYW1lLnRyaW0oKS5zcGxpdChcIiBcIik7XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3ROYW1lOiBuYW1lc1swXSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBcIlwiXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGZpcnN0TmFtZSA9IG5hbWVzWzBdO1xuICAgIGNvbnN0IGxhc3ROYW1lID0gbmFtZXMuc2xpY2UoMSkuam9pbihcIiBcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlyc3ROYW1lLFxuICAgICAgICBsYXN0TmFtZVxuICAgIH07XG59XG5mdW5jdGlvbiBnZXRGdWxsTmFtZShmaXJzdE5hbWUsIGxhc3ROYW1lKSB7XG4gICAgaWYgKCFmaXJzdE5hbWUgJiYgIWxhc3ROYW1lKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoIWZpcnN0TmFtZSkge1xuICAgICAgICByZXR1cm4gbGFzdE5hbWU7XG4gICAgfVxuICAgIGlmICghbGFzdE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0TmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2ZpcnN0TmFtZX0gJHtsYXN0TmFtZX1gO1xufVxuY2xhc3MgR2xvYmFsUGFyYW1zIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMudXNlTW9kYWxMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIEdsb2JhbFBhcmFtcy5sb2FkaW5nQ29udGFpbmVyID0gKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmctaW5kaWNhdG9yJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc29sZS5sb2coR2xvYmFsUGFyYW1zLmxvYWRpbmdDb250YWluZXIpO1xuICAgICAgICBHbG9iYWxQYXJhbXMubG9hZGluZ0VsZW1lbnQgPSAoX2IgPSBHbG9iYWxQYXJhbXMubG9hZGluZ0NvbnRhaW5lcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0TW9kYWxMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLnVzZU1vZGFsTG9hZGluZyA9IHRydWU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRNb2RhbExvYWRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZU1vZGFsTG9hZGluZztcbiAgICB9XG4gICAgc3RhdGljIGdldExvYWRpbmdDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmdDb250YWluZXI7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRMb2FkaW5nRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGluZ0VsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0cy5HbG9iYWxQYXJhbXMgPSBHbG9iYWxQYXJhbXM7XG5HbG9iYWxQYXJhbXMudXNlTW9kYWxMb2FkaW5nID0gZmFsc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xud2luZG93LmV4cG9ydHMgPSB7fTtcbmNvbnN0IGFwaVByb2R1Y3RzXzEgPSByZXF1aXJlKFwiLi9saWIvYXBpUHJvZHVjdHNcIik7XG5jb25zdCBnZW5Db21wb25lbnRzXzEgPSByZXF1aXJlKFwiLi9nZW5Db21wb25lbnRzXCIpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRE9NQ29udGVudExvYWRlZCBwcm9kdWN0cyBwYWdlXCIpO1xuICAgICAgICBjb25zdCBkYXRhID0geWllbGQgYXBpUHJvZHVjdHNfMS5hcGlQcm9kdWN0cy5nZXRBbGwoKTtcbiAgICAgICAgZnVuY3Rpb24gQnVpbGRUYWJsZVJvdyhEYXRhUm93KSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIERhdGFSb3cuaWQpO1xuICAgICAgICAgICAgY29uc3QgaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIGlkQ2VsbC50ZXh0Q29udGVudCA9IERhdGFSb3cuaWQ7XG4gICAgICAgICAgICBjb25zdCB0aXRsZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGl0bGVDZWxsLnRleHRDb250ZW50ID0gRGF0YVJvdy5jYXRlZ29yeTtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgY29tcGxldGVkQ2VsbC50ZXh0Q29udGVudCA9IERhdGFSb3cucHJpY2U7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24xQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoaWRDZWxsKTtcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0aXRsZUNlbGwpO1xuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNvbXBsZXRlZENlbGwpO1xuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGFjdGlvbjFDZWxsKTtcbiAgICAgICAgICAgIGxldCBidG4gPSAoMCwgZ2VuQ29tcG9uZW50c18xLmFkZEJ1dHRvbikoXCJEZWxldGVcIik7XG4gICAgICAgICAgICBhY3Rpb24xQ2VsbC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAvL2xldCB1c2VyaWQgPSBBY3Rpb21DZWxsLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHlpZWxkIGFwaVByb2R1Y3RzXzEuYXBpUHJvZHVjdHMuZGVsZXRlQnlJZChEYXRhUm93LmlkKTtcbiAgICAgICAgICAgICAgICAoMCwgZ2VuQ29tcG9uZW50c18xLmRlbGV0ZVRhYmxlUm93KShyb3cpO1xuICAgICAgICAgICAgICAgIC8vZGVsZXRlVXNlcihBY3Rpb21DZWxsLnRleHRDb250ZW50KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vXHRkZWxldGVUYWJsZVJvdyhyb3cpXG4gICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyVGFibGUoX2RhdGEpIHtcbiAgICAgICAgICAgIF9kYXRhID0gX2RhdGEuc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGEtdGFibGUtYm9keScpO1xuICAgICAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgX2RhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByb3cgPSBCdWlsZFRhYmxlUm93KGl0ZW0pO1xuICAgICAgICAgICAgICAgIHRhYmxlQm9keSA9PT0gbnVsbCB8fCB0YWJsZUJvZHkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5zdWJzY3JpYmUoKF9kYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XG4gICAgICAgICAgICByZW5kZXJUYWJsZShfZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
