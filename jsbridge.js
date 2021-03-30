;(function (root, factory) {

    // UMD compatible
    if (typeof define === "function" && define.amd) {

        // AMD && Global
        define([], function () {
            return (root.bridge = factory())
        })
    } else if (typeof exports === "object") {

        // Node, CommonJS-like
        module.exports = factory()
    } else {

        // Browser globals (root is window)
        root.bridge = factory()
    }
}(this, function () {
    var ua = window.navigator.userAgent
    var _webkit = window.webkit
    var _isTTpai = true 
    var _isAndroidApp = !!(window.ttpaiModel && /Android/i.test(ua) && _isTTpai) 
    var _ttpaiWKModel = _webkit && _webkit.messageHandlers && _webkit.messageHandlers.ttpaiWKModel
    var _isiOSApp = !!(/iPhone|iPad|iPod/i.test(ua) && _isTTpai && _ttpaiWKModel)
    var _toStr = Object.prototype.toString
    var _slice = Array.prototype.slice
    var apiList = ["refreshPage", "updateTitle", "updateShareButton",  "closePage", "getAppVersion","goAppLogin","getAppToken","openH5Screen","appRouter","showLoading","getStatusBarHeight","getUserInfo"]

    /**
     * _isString 检查任意一个值是否为 string 类型
     *
     * @param {*} val 待检查的任意值
     * @returns {boolean}
     */
    function _isString (val) {
        return _toStr.call(val) === "[object String]"
    }

    /**
     * _isObject 检查任意一个值是否为 object 类型
     *
     * @param {*} val 待检查的任意值
     * @returns {boolean}
     */
    function _isObject (val) {
        return _toStr.call(val) === "[object Object]"
    }

    /**
     * _isFunction
     *
     * @param {*} val 待检查的任意值
     * @returns {boolean}
     */
    function _isFunction (val) {
        return _toStr.call(val) === "[object Function]"
    }

    /**
     * _buildParams
     * @private
     * @param {string} fname 调用的方法名称window.ttpaiModel
     * @param {object} args 调用方法时传递的参数
     * @returns {string} 生成的向 Native 传递的数据的 JSON 字符串
     */
    function _buildParams(fname, args) {
        var result = {}

        if (_isString(fname)) {
            result.actionType = fname
        } else {
            return console.warn("[错误]: fname 必须是一个字符串")
        }

        if (_isObject(args)) {
            try {
                JSON.stringify(args)
                result.args = args
            } catch (e) {
                console.warn("[错误]: args 必须是一个合法的 JSON 对象")
                return
            }
        }

        return JSON.stringify(result)
    }

    /**
     * _registerCallback
     *
     * @param {string} fname
     * @param {function} callback
     */
    function _registerCallback(fname, callback) {
        if (apiList.indexOf(fname) === -1) {
            console.warn("[错误]: " + fname + " 不是合法的方法名")
        }
        if (_isFunction(callback)) {
            if (!window.callbacks) {
                window.callbacks = {}
            }
            window.callbacks[fname] = callback
        } else {
            console.warn("[错误]: callback 必须是一个函数")
        }
    }

    /**
     * _invokeNative
     *
     * @private
     * @param {string} fname 调用的方法名称
     * @param {object} args 调用方法时传递的参数
     * @returns {*} 获取到的回调数据(仅同步可用)
     */
    function _invokeNative(fname, args) {
        var params
        args = _slice.call(args)

        if (args.length === 1) {
            if (_isObject(args[0])) {
                // 只传了一个 options 参数
                params = _buildParams(fname, args[0])
            } else if (_isFunction(args[0])) {
                // 只传了一个 callback 参数
                params = _buildParams(fname)
                _registerCallback(fname, args[0])
            } else {
                console.warn("[错误]: 参数类型应为 Obejct 或 Function")
                return
            }
        } else if (args.length === 2) {
            if (_isObject(args[0]) && _isFunction(args[1])) {
                params = _buildParams(fname, args[0])
                _registerCallback(fname, args[1])
            } else {
                console.warn("[错误]: 第一个参数为 options{Object}, 第二个参数为 callback{Function}")
            }
        }

        if (!params) return

        if (_isiOSApp) {
            // 在 ttpai iOS APP 环境中
            try {
                return _webkit.messageHandlers.ttpaiWKModel.postMessage(params)
            } catch (e) {
                console.warn("[警告]: 不在 iOS APP 环境中, 没有找到 ttpaiWKModel")
            }
        } else if (_isAndroidApp) {
            // 在 ttpai Android APP 环境中
            try {
                return window.ttpaiModel[fname](params)
            } catch (e) {
                console.warn("[警告]: 不在 Android APP 环境中, 没有找到 window.ttpaiModel")
            }
        } else {
            // 不在 ttpai APP 环境中
            console.warn("[警告]: 不在 TTPAI APP 环境, 无法调用 APP 方法")
        }
    }

    bridge = {}

    apiList.map(function (fname) {
        /**
         * 根据 apiList 注册供 webapp 和 nativeapp 通信的方法
         *
         * @param {object} options 需要传递的参数
         * @param {function} callback 拿到参数后的回调函数
         * @returns {*}
         */
        bridge[fname] = function (options, callback) {
            return _invokeNative(fname, arguments)
        }
    })

    return bridge
}));
