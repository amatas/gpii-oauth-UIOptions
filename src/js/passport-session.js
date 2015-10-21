// Module to add passport handling to express.
"use strict";
var fluid     = fluid || require("infusion");
var gpii      = fluid.registerNamespace("gpii");

fluid.registerNamespace("gpii.express.middleware.passport.session");

gpii.express.middleware.passport.session.init = function (that) {
    var passport =  that.options.config.express.passport.session();
    that.options.passportSession = passport;
};

gpii.express.middleware.passport.session.middleware = function (that, req, res, next) {
    that.options.passportSession(req, res, next);
};

fluid.defaults("gpii.express.middleware.passport.session", {
    config:     "{expressConfigHolder}.options.config",
    gradeNames: ["fluid.modelComponent", "gpii.express.middleware"],
    passportSession: null,
    invokers: {
        "middleware": {
            funcName: "gpii.express.middleware.passport.session.middleware",
            "args": [ "{that}", "{arguments}.0", "{arguments}.1", "{arguments}.2"]
        }
    },
    listeners: {
        "onCreate.init": {
            funcName: "gpii.express.middleware.passport.session.init",
            "args": [ "{that}"]
        }
    }
});