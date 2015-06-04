/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var extend = require('node.extend');
var protractorUtils = require('wt-protractor-utils');
module.exports = function configProtractor() {

    var browserstack = extend(true /* Deep copy. */, {}, protractorUtils.platform.browserstack);

    var protractorBaseConfig = {
        specs: __dirname + '/tests/e2e/*.js'
    };

    // browserstack.capabilities['browserstack.user'] = process.env.BROWSERSTACK_USER;
    browserstack.capabilities['browserstack.user'] = process.env.bs_user;
    // browserstack.capabilities['browserstack.key'] = process.env.BROWSERSTACK_KEY;
    browserstack.capabilities['browserstack.key'] = process.env.bs_key;

    return {
        configList: [
            /* OS X / Chrome. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.os.osx,
                    protractorUtils.browser.chrome
                ]
            }),
            // /* OS X / Safari. */
            // protractorUtils.mergeConfig({
            //     configList: [
            //         protractorBaseConfig,
            //         browserstack,
            //         protractorUtils.os.osx,
            //         protractorUtils.browser.safari
            //     ]
            // }),
            /* Windows / Chrome. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.os.windows,
                    protractorUtils.browser.chrome
                ]
            }),
            /* Windows / Internet Explorer. */
            // protractorUtils.mergeConfig({
            //     configList: [
            //         protractorBaseConfig,
            //         browserstack,
            //         protractorUtils.os.windows,
            //         protractorUtils.browser.internetExplorer
            //     ]
            // }),
            // /* Android. */
            // protractorUtils.mergeConfig({
            //     configList: [
            //         protractorBaseConfig,
            //         browserstack,
            //         protractorUtils.os.android
            //     ]
            // }),
            // /* iPad. */
            // protractorUtils.mergeConfig({
            //     configList: [
            //         protractorBaseConfig,
            //         browserstack,
            //         protractorUtils.device.iPad
            //     ]
            // }),
            // /* iPhone. */
            // protractorUtils.mergeConfig({
            //     configList: [
            //         protractorBaseConfig,
            //         browserstack,
            //         protractorUtils.device.iPhone
            //     ]
            // })
        ]
    };

};