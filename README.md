# SkillBuilderBot-PlayWright

## Project Description  

This project is an automation testing tool based on [Playwright](https://playwright.dev/) designed to test login processes with CAPTCHA and manual MFA on AWS Skill Builder. The program is currently under development and is designed to support automated interactions with dynamic iframes and complex buttons within the AWS Skill Builder platform.

## Key Features

- Otomatisasi login ke AWS Skill Builder menggunakan AWS Builder ID.
- Dukungan untuk CAPTCHA dan MFA input manual.

## System Requirements  

- Node.js 14 atau lebih baru
- Playwright
- File `.env` untuk konfigurasi kredensial

## Installation

1. Clone this repository:  

   ```bash
   git clone <URL-REPO-ANDA>
   cd <NAMA-REPO>
   ```

2. Install dependency:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory with the following format:

   ```env
   EMAIL=<your-email>
   PASSWORD=<your-password>
   ```

4. Run the tests:

   ```bash
   npx playwright test
   ```

## Project Structure

```
<root-folder>
├── test-python
│   └── tests
│       └── main.spec.js      # Main Playwright test file
├── .env                      # Environment file for email & password
├── package.json              # Node.js configuration & dependencies
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

## Usage

-	The testing process will pause temporarily to allow manual CAPTCHA and MFA input.
-	Once the login is successful, Playwright will continue the automation as defined in the script.

## Important Notes

This project is still under active development and is not fully stable. Contributions, suggestions, and feedback are highly welcome.

## License

This project is licensed under the  [MIT License](LICENSE)