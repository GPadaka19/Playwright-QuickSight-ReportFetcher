const fs = require('fs');
const path = require('path');

async function downloadCSV(page, branchName) {
    const iframeLocator = page.locator('iframe[name*="DASHBOARD-SBARDashboardV3"]');
    await iframeLocator.waitFor({ state: 'attached' });
    await iframeLocator.waitFor({ state: 'visible' });

    const frame = await iframeLocator.contentFrame();
    if (frame) {
        await frame.locator('span.ellipsis', { hasText: 'Training' }).click();
        await frame.locator('role=button[name="Course All"]').click();
        await frame.locator('role=combobox[name="Search value"]').fill('e-05wkr9');
        await frame.locator('role=button[name="Search"]').click();
        await frame.locator('input[aria-labelledby="E-05WKR9 - Cloud Essentials Knowledge Badge Assessment-multiSelectControl-label"]').click();
        await page.locator('body').click();

        await frame.locator('textbox', { name: 'End Date' }).dblclick();
        await frame.locator('textbox', { name: 'End Date' }).fill('');
        await frame.locator('textbox', { name: 'End Date' }).fill('2025/02/02');
        await frame.locator('textbox', { name: 'End Date' }).press('Enter');

        await page.pause();
        
        await frame.locator('button', { name: 'Branch All', exact: true }).click();
        await frame.locator('checkbox', { name: 'Select all' }).uncheck();
        await frame.locator('listitem', { name: branchName }).locator('checkbox').check();
        await page.locator('body').click();

        await frame.locator('button', { name: 'Table, Course Activity' }).click();
        await frame.locator('button', { name: 'Menu options, Course Activity' }).hover();
        await frame.locator('button', { name: 'Menu options, Course Activity' }).click();

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            frame.locator('menuitem', { name: 'Export to CSV' }).click(),
        ]);

        try {
            const downloadPath = '/Users/gpadaka19/Downloads';
            const filePath = await download.path();

            if (filePath) {
                const originalFileName = path.basename(filePath);
                const targetPath = path.join(downloadPath, 'IAIN.csv');
                fs.renameSync(filePath, targetPath);

                console.log(`
                    File berhasil diunduh dari:
                    ${filePath}
                    Kemudian diubah nama dari:
                    '${originalFileName}'
                    Menjadi:
                    ${targetPath}
                    Dan disimpan di:
                    ${targetPath}
                `);
            } else {
                console.error('File unduhan tidak ditemukan.');
            }
        } catch (error) {
            console.error('Gagal mengunduh atau memproses file:', error);
        }
    } else {
        console.error('Iframe tidak ditemukan!');
    }
}

module.exports = { downloadCSV };