import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Default URL for tests
    supportFile: "cypress/support/e2e.ts", // Support file path
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Disable video recording for faster tests
    screenshotOnRunFailure: true, // Capture screenshots on failures
  },
});