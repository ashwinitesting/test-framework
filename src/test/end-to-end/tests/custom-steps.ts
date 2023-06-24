import {config as testConfig} from '../../config';

export = function () {
    return actor({
        loginAsMediaUser: function (
            username = testConfig.MEDIA_USER_USERNAME,
            password = testConfig.MEDIA_USER_PASSWORD
        ) {
            this.amOnPage('/sign-in');
            this.click('With a Court and tribunal hearings account');
            this.click('Continue');
            this.see('Sign in with your email address');
            this.fillField('#email', secret(username));
            this.fillField('#password', secret(password));
            this.click('Sign in');
        },

        seeBetaFeedbackOnPage: function (page) {
            this.see('BETA');
            this.click('feedback');
            this.seeInCurrentUrl(`https://www.smartsurvey.co.uk/s/FBSPI22/?pageurl=${page}`);
        },
    });
};
