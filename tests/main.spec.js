import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

test('Manual CAPTCHA & MFA Test with AWS Login', async ({ page }) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    if (!email || !password) {
        throw new Error('EMAIL atau PASSWORD belum ditemukan di file .env');
    }

    await page.goto('https://learnerhub.skillbuilder.aws/quicksight');

    await page.getByTestId('AWSBuilderID-provider-button').click();

    await page.getByRole('button', { name: 'Already have AWS Builder ID?' }).click();
    await page.getByRole('textbox', { name: 'We recommend using your' }).fill(email);
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    console.log('Silakan input CAPTCHA dan MFA secara manual');
    await page.pause();

    await page.waitForURL('https://learnerhub.skillbuilder.aws/quicksight');

    const iframeLocator = page.locator('iframe[name*="DASHBOARD-SBARDashboardV3"]');
    await iframeLocator.waitFor({ state: 'attached' });
    await iframeLocator.waitFor({ state: 'visible' });

    const frame = await iframeLocator.contentFrame();

    if (frame) {
    await frame.locator('span.ellipsis', { hasText: 'Training' }).click();

    await frame.locator('role=button[name="Course All"]').click();

    await frame.locator('role=combobox[name="Search value"]').fill('e-05wkr9');
    await frame.locator('role=button[name="Search"]').click();

    await frame.locator(
    'input[aria-labelledby="E-05WKR9 - Cloud Essentials Knowledge Badge Assessment-multiSelectControl-label"]'
    ).click();

    await page.locator('body').click();

    await frame.getByRole('textbox', { name: 'End Date' }).dblclick();
    await frame.getByRole('textbox', { name: 'End Date' }).fill('');
    await frame.getByRole('textbox', { name: 'End Date' }).fill('2025/02/02');
    await frame.getByRole('textbox', { name: 'End Date' }).press('Enter');

    await page.pause();
    } else {
    console.error('Iframe tidak ditemukan!');
    }
});
