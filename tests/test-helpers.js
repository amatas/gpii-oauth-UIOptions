"use strict";
var fluid = fluid || require("infusion");
var gpii  = fluid.registerNamespace("gpii"); 

fluid.registerNamespace("gpii.oauth.tests.helpers");

gpii.oauth.tests.helpers.isSaneResponse = function (jqUnit, response, body, status) {
    status = status ? status : 200;

    jqUnit.assertEquals("The response should have a reasonable status code", status, response.statusCode);
    if (response.statusCode !== status) {
        console.log(JSON.stringify(body, null, 2));
    }

    jqUnit.assertNotNull("There should be a body.", body);
};

gpii.oauth.tests.helpers.addRequiredSequences = function (sequenceStart, rawTests) {
    var completeTests = fluid.copy(rawTests);

    for (var a = 0; a < completeTests.length; a++) {
        var testSuite = completeTests[a];
        for (var b = 0; b < testSuite.tests.length; b++) {
            var tests = testSuite.tests[b];
            var modifiedSequence = sequenceStart.concat(tests.sequence);
            tests.sequence = modifiedSequence;
        }
    }

    return completeTests;
};

 
