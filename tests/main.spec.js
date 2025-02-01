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

    // Navigasi ke halaman login awal
    await page.goto('https://learnerhub.skillbuilder.aws/quicksight');

    // Klik tombol AWS Builder ID
    await page.getByTestId('AWSBuilderID-provider-button').click();

    // Masukkan email akun
    await page.getByRole('button', { name: 'Already have AWS Builder ID?' }).click();
    await page.getByRole('textbox', { name: 'We recommend using your' }).fill(email);
    await page.getByRole('button', { name: 'Next' }).click();

    // Masukkan password akun
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Pause agar bisa input CAPTCHA dan MFA manual
    console.log('Silakan input CAPTCHA dan MFA secara manual');
    await page.pause();

    // Pastikan halaman sudah berada di URL yang diinginkan
    await page.waitForURL('https://learnerhub.skillbuilder.aws/quicksight');

});
