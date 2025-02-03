import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';


const { login } = require('./login.spec.js');
const { downloadCSV } = require('./iain.spec.js');
require('dotenv').config();

test('Login and download CSV for Talenta IAIN Lhokseumawe', async ({ page }) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    if (!email || !password) {
        throw new Error('EMAIL atau PASSWORD belum ditemukan di file .env');
    }

    // Langkah 1: Login
    await login(page, email, password);

    // Langkah 2-9: Download CSV untuk cabang tertentu
    await iain(page, 'Talenta IAIN Lhokseumawe');
});