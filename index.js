/**
 * @name Stupid Reload
 * @author a13ks3y.ass@gmail.com
 * @licence WTFPL
 *
 * Basically, if you don't need to change reload state (switch off and then turn it on back) you can use just one line:
 * <code>
 *   setTimeout(location.reload.bind(location, [true], 0xfff));
 * </code>
 */
(function () {
    const getConfigFromScriptTagAttribute =  () => {
        try {
            // @todo use different techniques to get the currentScript and support old browsers @see https://stackoverflow.com/questions/403967/how-may-i-reference-the-script-tag-that-loaded-the-currently-executing-script
            return JSON.parse(document.currentScript.getAttribute("data-config"));
        } catch (e) {
            console.warn("Script attribute configuration (data-config) is not a valid JSON!", e);
            return {};
        }
    };
    window.stupidReloadConfig = Object.assign(window.stupidReloadConfig || {}, {
        hashParameterCheckString: "live=true",
        reloadTimeout: 0xfff,
        forceReload: false
    }, getConfigFromScriptTagAttribute());

    const checkHashAndReload =
        () => (stupidReloadConfig.forceReload || location.hash.search(stupidReloadConfig.hashParameterCheckString) !== -1) &&
            (
                checkHashAndReload.reloadTimerHandle =
                setTimeout(location.reload.bind(location, [true]), stupidReloadConfig.reloadTimeout)
            );
    const toggleReloadState = () =>
        (location.hash.search(stupidReloadConfig.hashParameterCheckString) !== -1 ?
            (location.href = location.href.replace(stupidReloadConfig.hashParameterCheckString, "")) &&
                clearTimeout(checkHashAndReload.reloadTimerHandle) :
            (location.hash += stupidReloadConfig.hashParameterCheckString) && location.reload(true))
        && checkHashAndReload();

    // @todo: different events should be configurable
    let _bodyDblClickLastTime = 0;
    document.body.addEventListener("click",
        () => _bodyDblClickLastTime === 0 ?
            _bodyDblClickLastTime = Date.now() :
            Date.now() - _bodyDblClickLastTime < 800 ?
                toggleReloadState() && (_bodyDblClickLastTime = 0) :
                _bodyDblClickLastTime = Date.now()
    );
    checkHashAndReload();
}());