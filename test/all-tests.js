// tests
//
// 1. Request local user data
// 2. If not found initiate OAuth2 process

"use strict";

var fluid = fluid || require("infusion");
var gpii  = fluid.registerNamespace("gpii");

fluid.setLogging(true);

require("./includes.js");
require("gpii-express");

fluid.registerNamespace("gpii.oauth.tests.router.testEnvironment");

fluid.defaults("gpii.oauth.tests.router.testEnvironment", {
    gradeNames: ["fluid.test.testEnvironment", "autoInit"],
    port: 8080,
    baseUrl: "http://localhost:8080/",
    events: {
        constructServer: null,
        onStarted: null
    },
    components: {
        oauthServer:{
            createOnEvent: "constructServer",
            type: "gpii.oauth",
            options: {
                events: {
                    onStarted: "{testEnvironment}.events.onStarted"
                },
                config: {
                    express: {
                        port: "{testEnvironment}.options.port",
                        baseUrl: "{testEnvironment}.options.baseUrl"
                    }
                }
            }
        },
        testCaseHolder: {
            type: "gpii.oauth.tests.router.caseHolder"
        }
    }
});

gpii.oauth.tests.router.testEnvironment();
