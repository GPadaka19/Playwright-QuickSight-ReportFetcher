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

    await page.getByRole('button', { name: 'Sign in' }).click();

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
        
        await frame.getByRole('button', { name: 'Branch All', exact: true }).click();
        await frame.getByRole('checkbox', { name: 'Select all' }).uncheck();
        await frame.getByRole('listitem', { name: 'Talenta IAIN Lhokseumawe' }).getByRole('checkbox').check();
        await page.locator('body').click();

        // Klik tombol untuk membuka tabel
        await frame.getByRole('button', { name: 'Table, Course Activity' }).click();

        // Hover terlebih dahulu sebelum klik menu options
        await frame.getByRole('button', { name: 'Menu options, Course Activity' }).hover();
        await frame.getByRole('button', { name: 'Menu options, Course Activity' }).click();

        // Tunggu event unduhan dan klik tombol Export to CSV
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            frame.getByRole('menuitem', { name: 'Export to CSV' }).click(),
        ]);

        try {
            // Lokasi unduhan dan nama file baru
            const downloadPath = '/Users/gpadaka19/Downloads';
            const filePath = await download.path();

            if (filePath) {
                const originalFileName = path.basename(filePath); // Nama file asli
                const targetPath = path.join(downloadPath, 'IAIN.csv'); // Nama file baru
                fs.renameSync(filePath, targetPath);

                // Log lebih spesifik dengan nama file dan path yang jelas
                console.log(`
                    File berhasil diunduh dari:
                    ${filePath}
                    
                    Kemudian diubah nama dari:
                    '${originalFileName}'
                    
                    Menjadi:
                    ${targetPath}'
                    
                    Dan disimpan di:
                    ${targetPath}
                    `);            } else {
                console.error('File unduhan tidak ditemukan.');
            }
        } catch (error) {
            console.error('Gagal mengunduh atau memproses file:', error);
        }
    } else {
        console.error('Iframe tidak ditemukan!');
    }
});