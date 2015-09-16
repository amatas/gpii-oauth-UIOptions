"use strict";
var fluid        = fluid || require("infusion");
var gpii         = fluid.registerNamespace("gpii");
var jqUnit       = require("jqUnit");

require("./test-helpers.js");

// Bring in the extended test case holder that is designed to work with Kettle.
require("../node_modules/gpii-express/tests/js/lib/test-helpers");

fluid.setLogging(true);


fluid.logObjectRenderChars = 8000;

fluid.registerNamespace("gpii.oauth.tests.router.caseHolder");

gpii.oauth.tests.router.caseHolder.verifyContent = function (response, body, expectedString) {

    gpii.oauth.tests.helpers.isSaneResponse(jqUnit, response, body);
    jqUnit.assertTrue("The body should match the custom content...", body.indexOf(expectedString) !== -1);

};

fluid.defaults("gpii.oauth.tests.router.caseHolder", {
    gradeNames: ["gpii.express.tests.caseHolder"],
    rawModules:[
        {
            tests: [
                {
                    name: "Testing the 'static' router module (index content)...",
                    type: "test",
                    sequence: [
                        {
                            func: "{staticRequest}.send"
                        },
                        {
                            listener: "gpii.oauth.tests.router.caseHolder.verifyContent",
                            event: "{staticRequest}.events.onComplete",
                            args: ["{staticRequest}.nativeResponse", "{arguments}.0", "sample static content"]
                        }
                    ]
                }
                // Get preferences
                // 1. Passport.auth
                // 2. Passport.oauth
                // 3. Get token
            ]
        }
    ],
    components: {
        cookieJar: {
            type: "kettle.test.cookieJar"
        },
        staticRequest: {
            type: "kettle.test.request.http",
            options: {
                path: "{testEnvironment}.options.baseUrl",
                port: "{testEnvironment}.options.port",
                method: "GET"
            }
        }
    }
});
 
