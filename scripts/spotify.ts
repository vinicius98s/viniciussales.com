import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("https://viniciussales.com/api/spotify");

const password = process.env.SPOTIFY_PASSWORD;

if (!password) {
  console.log("Missing SPOTIFY_PASSWORD env variable");
  process.exit(1);
}

const email = process.env.SPOTIFY_EMAIL;
if (!email) {
  console.log("Missing SPOTIFY_EMAIL env variable");
  process.exit(1);
}

await page.getByTestId("login-username").fill(email);
const passwordInput = page.getByTestId("login-password");
if (!passwordInput) {
  console.log("Missing password input");
  process.exit(1);
}

await passwordInput.fill(password);
await page.getByTestId("login-button").click();

await page.waitForURL((url) => url.pathname === "/api/spotify");

process.exit(0);
