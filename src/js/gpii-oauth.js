"use strict";
var fluid = fluid || require("infusion"),
    path = require("path"),
    contentDir = path.resolve(__dirname, "../../content"),
    gpii = fluid.registerNamespace("gpii"),
    OAuth2Strategy = require("passport-oauth").OAuth2Strategy,
    passport = require("passport"),
    http = require("http"),
    preferences = require('./preferences.js');
 
fluid.setLogging(true);

require("gpii-express");
require("./passport.js");
require("./passport-session.js");

fluid.registerNamespace("gpii.oauth.client");

gpii.oauth.client.initializePassport = function (config, express) {

    config.express.passport.use("UIOptions",new OAuth2Strategy({
        authorizationURL: "http://" + config.oauth.provider.host + "/authorize",
        tokenURL: "http://" + config.oauth.provider.host + "/access_token",
        clientID: config.oauth.clientId,
        clientSecret: config.oauth.clientSecret,
        callbackURL: "http://" + config.oauth.consumer.host + "/preferences/callback"
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, { accessToken: accessToken });
      }
    ));
    config.express.passport.serializeUser(function(preferences, done) {
      return done(null, preferences);
    });

    config.express.passport.deserializeUser(function(preferences, done) {
      return done(null, preferences);
    });
};

var auxfunction = function(accessToken, callback) {
    var options = {
        hostname: "localhost",
        port: "8081",
        path: "/settings",
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    };

    var req = http.request(options, function (res) {
        res.setEncoding("utf8");
        var body = "";
        res.on("data", function (chunk) {
            body += chunk;
        });
        res.on("end", function () {
            console.log("Got " + options.path + " response: " + body);
            callback(body);
        });
    });

    req.end();
};

gpii.oauth.client.getPreferences = function (req, res) {
    auxfunction(req.user.accessToken, function (responseData) {
        var response = "";
        require('fs').readFile("./src/js/client_response.html", "utf-8", function (err,data) {
            if (err) console.log(err);
            response = String(data).replace("__JSON_STRINGIFY__", JSON.stringify(responseData));
            res.status(200).send(response);
        });
        
    });
    
};

fluid.defaults("gpii.oauth.client",{
    gradeNames: ["gpii.express"],
    config: {
        express: {
            port: 8000,
            baseUrl: "http://localhost:8000",
            passport: passport,
            session: {
                secret: "shhhh_secret_string"
            }
        },
        oauth: {
            clientId: "org.rtf.UIOptions",
            clientSecret: "secretUIOptions",
            provider: {
                protocol: "http",
                host: "localhost:8081",
                authPath: "/authorize",
                tokenPath: "/access_token"
            },
            consumer: {
                protocol: "http",
                host: "localhost:8000",
                callbackPath: "/preferences/callback"
            }
        }
    },
    listeners: {
        onStarted: {
            funcName: "gpii.oauth.client.initializePassport",
            args:   ["{that}.options.config","{gpii.express}.express"]
        }
    },
    components: {
        session: {
            type: "gpii.express.middleware.session"
        },
        passport: {
            type: "gpii.express.middleware.passport.initialize"
        },
        passportSession: {
            type: "gpii.express.middleware.passport.session"
        },
        staticContent: {
            type: "gpii.express.router.static",
            options: {
                path: "/",
                content: contentDir
            }
        },
        routePreferences: {
            type: "gpii.express.router",
            options: {
                path: "/preferences",
                invokers: {
                    route: {
                        func: passport.authenticate('UIOptions', {scope: "scope_1"})
                    }
                }
            }
        },
        routeCallback: {
            type: "gpii.express.router",
            options: {
                path: "/preferences/callback",
                invokers: {
                    route: {
                        func: passport.authenticate('UIOptions', { failureRedirect: '/close.html?error=foo' })
                    }
                }
            }
        }        ,
        routeCallbackSender: {
            type: "gpii.express.router",
            options: {
                path: "/preferences/callback",
                invokers: {
                    route: {
                        funcName: "gpii.oauth.client.getPreferences",
                        args:     ["{arguments}.0", "{arguments}.1"]
                    }
                }
            }
        }
    }
});

