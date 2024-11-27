import { test, expect } from "@playwright/test";

test("test footer display", async ({ page }) => {
    await page.goto("http://localhost:5173");
    
    // get the size of the viewport
    const viewport = page.viewportSize();
    
    if (viewport.width < 600) {
        // expect footer to be hidden
        await expect(page.locator("footer")).not.toBeVisible();
    } else {
        // expect footer to be visible
        await expect(page.locator("footer")).toBeVisible();
    }
})