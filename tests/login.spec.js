const { expect } = require('@playwright/test');

async function login(page, email, password) {
    await page.goto('https://learnerhub.skillbuilder.aws/quicksight');
    await page.locator('[data-testid="AWSBuilderID-provider-button"]').click();
    await page.pause();
    await page.locator('button[type="button"][class*="awsui-button-variant-normal"]', { hasText: 'Already have AWS Builder ID?' }).click();    
    // await page.locator('textbox', { name: 'We recommend using your' }).fill(email);
    // await page.locator('textbox', { name: 'We recommend using your' }).fill('test@gmail.com');
    await page.locator('[role="textbox"][name="We recommend using your"]').fill('test@gmail.com');
    await page.locator('button', { name: 'Next' }).click();
    await page.locator('textbox', { name: 'Password' }).fill(password);
    await page.locator('button', { name: 'Sign in' }).click();

    console.log('Silakan input CAPTCHA dan MFA secara manual');
    await page.pause();
}

module.exports = { login };