import { expect, test } from '@playwright/test'

test('pages render without script errors or third-party browser requests', async ({ page }) => {
  const errors: string[] = []
  const remoteRequests: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:3100') && !request.url().startsWith('data:')) remoteRequests.push(request.url())
  })
  for (const route of ['/', '/about', '/blog', '/labs', '/contact', '/thunderbolt', '/gridland', '/peasy', '/careerbot']) {
    const response = await page.goto(route)
    expect(response?.status(), route).toBe(200)
    await expect(page.locator('main').first()).toBeVisible()
  }
  expect(errors).toEqual([])
  expect(remoteRequests).toEqual([])
})

test('blog preserves filters, whole-card links, and static writing', async ({ page }, testInfo) => {
  await page.goto('/blog')
  await page.getByRole('button', { name: 'AI', exact: true }).click()
  await expect(page.getByText('No articles in this category yet.')).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('blog-ui.png') })
  const works = page.getByRole('button', { name: 'Works', exact: true })
  await works.focus()
  await page.keyboard.press('Enter')
  const card = page.locator('a[href="/vercel"]').filter({ hasText: 'Vercel' })
  await expect(card).toBeVisible()
  await card.scrollIntoViewIfNeeded()
  const hitTarget = await card.evaluate((element) => {
    const box = element.getBoundingClientRect()
    return {
      cursor: getComputedStyle(element).cursor,
      center: element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)),
      edge: element.contains(document.elementFromPoint(box.x + 8, box.y + 8)),
    }
  })
  expect(hitTarget).toEqual({ cursor: 'pointer', center: true, edge: true })
  await card.click({ position: { x: 8, y: 8 } })
  await expect(page).toHaveURL(/\/vercel$/)
  await page.goto('/blog')
  await page.getByRole('button', { name: 'Design System', exact: true }).click()
  await page.getByRole('link', { name: /Building Design Tokens/ }).click()
  await expect(page).toHaveURL(/\/blog\/design-system\/design-token$/)
  expect((await page.goto('/blog/unpublished-page'))?.status()).toBe(404)
})

test('portfolio guide works without live AI and rejects unsafe API requests', async ({ page, request, baseURL }) => {
  await page.goto('/')
  const send = page.getByRole('button', { name: 'Send message', exact: true })
  await expect(send).toBeDisabled()
  await page.getByRole('button', { name: 'Give me a 30-second overview of Jessica and her strongest work.', exact: true }).click()
  await expect(page.locator('.chat-response').first()).toContainText('Thunderbolt Skills')
  await expect(page.getByRole('region', { name: "Chat with Jessica's portfolio assistant" }).getByRole('alert')).toHaveCount(0)
  const input = page.getByRole('textbox', { name: "Message Jessica's portfolio assistant" })
  await input.fill('Can you explain a different topic?')
  await send.click()
  await expect(page.getByText('I’m currently a curated portfolio guide', { exact: false })).toBeVisible()
  const message = { id: 'request-test', role: 'user', parts: [{ type: 'text', text: 'Hello' }] }
  const crossOrigin = await request.post('/api/chat', { headers: { Origin: 'https://example.com' }, data: { messages: [message] } })
  expect(crossOrigin.status()).toBe(403)
  const systemRole = await request.post('/api/chat', { headers: { Origin: baseURL! }, data: { messages: [{ ...message, role: 'system' }] } })
  expect(systemRole.status()).toBe(400)
  const attachment = await request.post('/api/chat', { headers: { Origin: baseURL! }, data: { messages: [{ ...message, parts: [{ type: 'file', url: 'https://example.com/file', mediaType: 'text/plain' }] }] } })
  expect(attachment.status()).toBe(400)
  const oversized = await request.post('/api/chat', { headers: { Origin: baseURL!, 'Content-Type': 'application/json' }, data: 'x'.repeat(131073) })
  expect(oversized.status()).toBe(413)
})

test('security headers and image boundaries are enforced', async ({ request }) => {
  const response = await request.get('/')
  const headers = response.headers()
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
  expect(headers['content-security-policy']).toContain("script-src-attr 'none'")
  expect(headers['content-security-policy']).not.toContain("'unsafe-eval'")
  expect(headers['x-powered-by']).toBeUndefined()
  const remote = await request.get('/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.png&w=640&q=75')
  expect(remote.status()).toBe(400)
  const local = await request.get('/_next/image?url=%2Fprofile-small.jpg&w=64&q=75')
  expect(local.ok()).toBe(true)
})

test('Gridland demo moves its cursor and toggles selection with the keyboard', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/gridland')
  const canvas = page.locator('canvas').first()
  // Scroll the demo itself into the viewport so its lazy mount also runs on
  // narrow screens where the explanatory paragraph fills most of the screen.
  await page.getByText('The same JSX, run with', { exact: false }).scrollIntoViewIfNeeded()
  await expect(canvas).toBeVisible()
  await canvas.click()
  await page.keyboard.press('Enter')
  const initial = await canvas.screenshot()
  await page.keyboard.press('ArrowDown')
  await expect.poll(async () => (await canvas.screenshot()).equals(initial)).toBe(false)
  const moved = await canvas.screenshot()
  await page.keyboard.press('Space')
  await expect.poll(async () => (await canvas.screenshot()).equals(moved)).toBe(false)
  await page.keyboard.press('Space')
  await expect.poll(async () => (await canvas.screenshot()).equals(moved)).toBe(true)
  expect(errors).toEqual([])
})
