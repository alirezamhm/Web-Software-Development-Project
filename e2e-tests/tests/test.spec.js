import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".e2e-ready").waitFor();
});

test("Has a heading Welcome!", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome!", exact: true })).toBeVisible();
});

test("Has a home link that navigates to '/'", async ({ page }) => {
    const link = page.getByRole('link', { name: 'Home' });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/');
});

test("Has a courses link that navigates to '/courses'", async ({ page }) => {
    const link = page.getByRole('link', { name: 'Courses' });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/courses');
});

test("Has a register link that navigates to '/auth/register'", async ({ page }) => {
    const link = page.getByRole('link', { name: 'Register' });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/auth/register');
});

test("Has a login link that navigates to '/auth/login'", async ({ page }) => {
    const link = page.getByRole('link', { name: 'Login' });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/auth/login');
});

test("Register and login form works", async ({ page }) => {
    const email = "testing@test.com"
    const password = "12345678"
    await page.goto("/auth/register");
    await page.locator(".e2e-ready").waitFor();
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page).toHaveURL("/auth/login");
    await page.locator(".e2e-ready").waitFor();
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    
    await expect(page).toHaveURL("/");
    await page.locator(".e2e-ready").waitFor();
    await expect(page.getByText(email)).toBeVisible();
});

test("Course page has headings Courses and Add Course", async ({ page }) => {
    page.goto("/courses");
    await page.locator(".e2e-ready").waitFor();
    await expect(page.getByRole("heading", { name: "Courses", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Add Course", exact: true })).toBeVisible();
});

test("Add Course form adds a new course", async ({ page }) => {
    page.goto("/courses");
    await page.locator(".e2e-ready").waitFor();
    const courseName = "Testing Course"
    await page.getByLabel('Name').fill(courseName);
    await page.getByRole("button", { name: "Add course" }).click();
    await page.locator(".e2e-ready").waitFor();
    await expect(page.getByText(courseName).first()).toBeVisible();
});

test("Course 1 page has a heading Existing questions", async ({ page }) => {
    page.goto("/courses/1");
    await page.locator(".e2e-ready").waitFor();
    await expect(page.getByRole("heading", { name: "Existing questions", exact: true })).toBeVisible();
});

test("Add Question form adds a new question", async ({ page }) => {
    page.goto("/courses/1");
    await page.locator(".e2e-ready").waitFor();
    const title = "Testing title"
    const text = "Testing text"
    await page.getByLabel('Title').fill(title);
    await page.getByLabel('Text').fill(text);
    await page.getByRole("button", { name: "Add question" }).click();
    await page.locator(".e2e-ready").waitFor();
    await expect(page.getByText(title).first()).toBeVisible();
    await expect(page.getByText(text).first()).toBeVisible();
});

test("Course questions have upvote and delete buttons", async ({ page }) => {
    page.goto("/courses/1");
    await page.locator(".e2e-ready").waitFor();
    await expect(page.getByRole("button", { name: "Upvote" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Delete" }).first()).toBeVisible();
});
