Feature('Login');

Scenario('I as a media user should be able to sign-in with the valid credentials', async ({I}) => {
    I.loginAsMediaUser();
    I.waitForText('Your account');
}).tag('@CrossBrowser');

Scenario(
    'I as a media user should be able to see proper error messages when username or password fields are empty',
    async ({I}) => {
        I.loginAsMediaUser('', '');
        I.waitForText('Please enter your Email Address');
        I.see('Please enter your password');
    }
).tag('@CrossBrowser');

Scenario(
    'I as a media user should be able to see proper error message when username or password is wrong',
    async ({I}) => {
        I.loginAsMediaUser('email@justice.gov.uk', 'password');
        I.waitForText('Invalid username or password.');
    }
).tag('@CrossBrowser');

Scenario(
    'I as a media user should be able to see proper error message when username is not a valid email address',
    async ({I}) => {
        I.loginAsMediaUser('email..@justice.gov.uk', 'password');
        I.waitForText('Please enter a valid email address.');
    }
).tag('@CrossBrowser');

Scenario('I as a media user should be able to see the beta tag and feedback link when logging in', async ({I}) => {
    I.amOnPage('/sign-in');
    I.click('With a Court and tribunal hearings account');
    I.click('Continue');
    I.waitForText('Sign in with your email address');
    I.seeBetaFeedbackOnPage('b2c/login');
    I.executeScript('window.history.back();');
    I.click('Forgot your password?');
    I.waitForText('Please provide the following details.');
    I.seeBetaFeedbackOnPage('b2c/reset-pw');
});

