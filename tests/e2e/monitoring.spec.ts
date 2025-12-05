import { test, expect } from '@playwright/test';

test.describe('Yōkai Threat Matrix Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the monitoring page
    await page.goto('/monitoring');
  });

  test('should load the dashboard with anomalies', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Yōkai Threat Matrix/);

    // Check that the dashboard title is visible
    await expect(page.locator('h1')).toContainText('Yōkai Threat Matrix');

    // Check that anomaly cards are present
    const anomalyCards = page.locator('[class*="anomalyCard"]');
    await expect(anomalyCards).toHaveCount(12); // Based on our initial data

    // Check that at least one anomaly name is visible
    await expect(page.locator('text=Kitsune')).toBeVisible();
  });

  test('should allow capturing an anomaly', async ({ page }) => {
    // Find an active anomaly (not yet captured)
    const activeAnomaly = page.locator('[class*="anomalyCard"]').first();
    await expect(activeAnomaly).toBeVisible();

    // Find the capture button for the first anomaly
    const captureButton = activeAnomaly
      .locator('button:has-text("Capture Yōkai")')
      .first();
    await expect(captureButton).toBeVisible();
    await expect(captureButton).toBeEnabled();

    // Click the capture button
    await captureButton.click();

    // Wait for the toast notification indicating success or failure
    await expect(
      page.locator('text=/Successfully captured|Capture failed/i')
    ).toBeVisible({ timeout: 10000 });

    // After the operation, check if the anomaly card now shows "Captured" status.
    // This handles both success (status becomes captured) and failure (status remains active, test passes if toast appears)
    // For a more precise test of success/failure, separate tests or more detailed assertions would be needed.
    // For now, simply waiting for the toast confirms the async operation completed.
    // The button itself might disappear if captured, or become re-enabled if failed and retryable.
    // Checking for "Captured" text is a good indicator of state change.
    await expect(activeAnomaly.locator('text=Captured').first()).toBeVisible();
  });

  test('should display threat levels correctly', async ({ page }) => {
    // Check that threat badges are displayed properly
    const threatBadges = page.locator('[class*="threatBadge"]');
    await expect(threatBadges).toHaveCount(12); // Based on our initial data

    // Verify that at least one threat level is visible
    await expect(page.locator('text=high')).toBeVisible();
    await expect(page.locator('text=medium')).toBeVisible();
    await expect(page.locator('text=critical')).toBeVisible();
  });
});
