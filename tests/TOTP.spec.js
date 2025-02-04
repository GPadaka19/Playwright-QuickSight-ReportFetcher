import { test, expect } from '@playwright/test';
import * as OTPAuth from "otpauth";
import * as dotenv from 'dotenv';

dotenv.config();


test('TOTP', async ({ page }) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const TOTP = process.env.TOTP;
    const LABEL = process.env.LABEL;

    if (!email || !password) {
        throw new Error('EMAIL atau PASSWORD belum ditemukan di file .env');
    }

    let totp = new OTPAuth.TOTP({
 // Provider or service the account is associated with.
        issuer: "AWS SSO",
        label: LABEL,
        // Algorithm used for the HMAC function, possible values are:
        //   "SHA1", "SHA224", "SHA256", "SHA384", "SHA512",
        //   "SHA3-224", "SHA3-256", "SHA3-384" and "SHA3-512".
        algorithm: "SHA1",
        // Length of the generated tokens.
        digits: 6,
        // Interval of time for which a token is valid, in seconds.
        period: 30,
        // Arbitrary key encoded in base32 or `OTPAuth.Secret` instance
        // (if omitted, a cryptographically secure random secret is generated).
        secret: OTPAuth.Secret.fromBase32(TOTP),
        //   or: `OTPAuth.Secret.fromBase32("US3WHSG7X5KAPV27VANWKQHF3SH3HULL")`
        //   or: `new OTPAuth.Secret()`
        // otpauth://totp/AWS%20SSO:gustipadaka19%40gmail.com?secret=7FK5JZ2G5HP62RQCTLCJ3MYHDFLFUNH2&issuer=AWS%20SSO
    });

  await page.goto('https://learnerhub.skillbuilder.aws/quicksight');
  await page.getByTestId('AWSBuilderID-provider-button').click();
  await page.getByRole('textbox', { name: 'We recommend using your' }).fill(email);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

//   await page.pause();


//   TOTP
//   await page.locator('#awsui-input-2').click();
//   await page.locator('#awsui-input-2').fill('fpcfs2');

  await page.pause();
  
  await page.getByRole('checkbox', { name: 'This is a trusted device.' }).check();
  await page.getByRole('button', { name: 'Sign in' }).click();



//   TODO: Solve TOTP Token  
  let token = totp.generate()

  await page.getByRole('textbox', { name: 'MFA code' }).fill(token);

  await page.getByRole('button', { name: 'Sign in' }).click();
});

