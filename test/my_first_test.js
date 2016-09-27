module.exports = {
    // Checks if the <title> of ´github.com´ has the expected value
    'Page title is correct': function (test) {
        'use strict';
        test.expect(1);

        test
            .open('https://github.com/')
            .screenshot('homepage_:browser.png')
            .assert.title().is('How people build software · GitHub', 'It has title')
            .done();
    }
};