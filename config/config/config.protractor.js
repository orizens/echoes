// adopted from Wishtack
// NOTICE:
// add these to dev dependencies if testing will be done 
// with browserstack
// "wt-protractor-runner": "^0.2.2",
// "wt-protractor-utils": "^1.0.0"

import extend from 'node.extend';
import protractorUtils from 'wt-protractor-utils';

export function configProtractor() {
    var browserstack = extend(true /* Deep copy. */, {}, protractorUtils.platform.browserstack);

    var protractorBaseConfig = {
        specs: __dirname + '/../../tests/e2e/*.js'
    };

    // browserstack.capabilities['browserstack.user'] = process.env.BROWSERSTACK_USER;
    browserstack.capabilities['browserstack.user'] = process.env.bs_user;
    // browserstack.capabilities['browserstack.key'] = process.env.BROWSERSTACK_KEY;
    browserstack.capabilities['browserstack.key'] = process.env.bs_key;
    browserstack.capabilities['browserstack.local'] = 'true';

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
            /* iPad. */
            // protractorUtils.mergeConfig({
            //     configList: [
            //         protractorBaseConfig,
            //         browserstack,
            //         protractorUtils.device.iPad
            //     ]
            // })
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