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
    await expect(anomalyCards).toHaveCount(5); // Based on our initial data

    // Check that at least one anomaly name is visible
    await expect(page.locator('text=Kitsune')).toBeVisible();
  });

  test('should allow capturing an anomaly', async ({ page }) => {
    // Find an active anomaly (not yet captured)
    const activeAnomaly = page.locator('[class*="anomalyCard"]').first();
    await expect(activeAnomaly).toBeVisible();

    // Find the capture button for the first anomaly
    const captureButton = activeAnomaly.locator('button:has-text("Capture Yōkai")').first();
    await expect(captureButton).toBeVisible();
    await expect(captureButton).toBeEnabled();

    // Click the capture button
    await captureButton.click();

    // Wait for the optimistic update
    await page.waitForTimeout(500);

    // Check if the button text changed (indicating capture attempt)
    // Note: In a real scenario, we'd wait for the update to complete and check the status
    await expect(captureButton).not.toBeEnabled(); // Button should be disabled during capture
  });

  test('should display threat levels correctly', async ({ page }) => {
    // Check that threat badges are displayed properly
    const threatBadges = page.locator('[class*="threatBadge"]');
    await expect(threatBadges).toHaveCount(5); // Based on our initial data

    // Verify that at least one threat level is visible
    await expect(page.locator('text=high')).toBeVisible();
    await expect(page.locator('text=medium')).toBeVisible();
    await expect(page.locator('text=critical')).toBeVisible();
  });
});