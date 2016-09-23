define([],function(){
    return     function asEventEmitter(target, async) {
        var _async = typeof async == 'boolean' ? async : false, // We default to async
            _handlers = {};

        target.on = function on(event, handler, context) {
            (_handlers[event] || (_handlers[event] = [])).push({ handler: handler, context: (context || target) });
        }

        return function (event) {
            var args = [].slice.call(arguments, 1);
            (_handlers[event] || [])
                .forEach(function (listener) {
                    if (_async)
                        setTimeout(listener.handler.bind.apply(listener.handler, [listener.context].concat(args)), 0);
                    else
                        listener.handler.apply(listener.context, args);
                });
        };
    };
});