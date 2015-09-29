/* Convenience script to launch the test server for manual testing */
var fluid = fluid || require("infusion");
var gpii  = fluid.registerNamespace("gpii");

require("../index");

gpii.oauth.client({
    config: {
        express: {
            port: 8000,
            baseUrl: "http://localhost:8000/"
        }
    }
});