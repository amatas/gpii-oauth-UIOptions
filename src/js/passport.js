// Module to add passport handling to express.
"use strict";
var fluid     = fluid || require("infusion");
var gpii      = fluid.registerNamespace("gpii");

fluid.registerNamespace("gpii.express.middleware.passport.initialize");

gpii.express.middleware.passport.initialize.init = function (that) {
    that.passport =  that.options.config.express.passport.initialize();
    console.log("Passport initialized");
};

gpii.express.middleware.passport.initialize.middleware = function (that, req, res, next) {
    that.passport(req, res, next);
};

fluid.defaults("gpii.express.middleware.passport.initialize", {
    config:     "{expressConfigHolder}.options.config",
    gradeNames: ["fluid.modelComponent", "gpii.express.middleware"],
    invokers: {
        "middleware": {
            funcName: "gpii.express.middleware.passport.initialize.middleware",
            "args": [ "{that}", "{arguments}.0", "{arguments}.1", "{arguments}.2"]
        }
    },
    listeners: {
        "onCreate.init": {
            funcName: "gpii.express.middleware.passport.initialize.init",
            "args": [ "{that}"]
        }
    }
});