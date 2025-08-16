const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/tests/reset')
    await request.post('/api/users', {
      data: {
        name: 'Li TianSuo',
        username: '114514',
        password: '1919180'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, '114514', '1919180')
      await expect(page.getByText('Li TianSuo logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, '114514', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, '114514', '1919180')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'first title', 'first author', 'first url')
      await expect(page.getByText('first title first author')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'a title', 'a author', 'a url')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click();
        await page.getByRole('button', { name: 'like' }).click();
        await expect(page.getByText('likes 1')).toBeVisible()
      });

      test('a blog can be deleted by creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click();
        page.once('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click();
        await expect(page.getByText('a title a author')).not.toBeVisible()
      });

      test('remove button rendered if user is creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click();
        await expect(page.getByText('remove')).toBeVisible()
      })

      test('remove button hided if user is not creator', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'Tian Suoli',
            username: '1919180',
            password: '114514'
          }
        })
        await page.getByRole('button', { name: 'logout' }).click();
        await loginWith(page, '1919180', '114514')
        await page.getByRole('button', { name: 'view' }).click();
        await expect(page.getByText('remove')).not.toBeVisible()
      })
    })
  })
})