import { expect, test } from '@playwright/test'
import { CHAT_STORAGE_KEY } from '../../src/lib/chat-storage'

test('saved assistant Markdown isolates HTML IDs while retaining links and code', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  const markdown = [
    '<h2 id="portfolioClobberProbe">Rendered section</h2>',
    '<a href="#portfolioClobberProbe">Jump to section</a>',
    'Ordinary **bold** and a note.[^check]',
    '[^check]: Footnote remains usable.',
    '```js\nconst answer = 42;\n```',
  ].join('\n\n')
  await page.addInitScript(({ key, text }) => {
    localStorage.setItem(key, JSON.stringify([
      { id: 'markdown-security-fixture', role: 'assistant', parts: [{ type: 'text', text }] },
    ]))
  }, { key: CHAT_STORAGE_KEY, text: markdown })
  await page.goto('/')
  const response = page.locator('.chat-response').first()
  await expect(response.getByRole('heading', { name: 'Rendered section' })).toHaveAttribute('id', 'user-content-portfolioClobberProbe')
  await expect(response.locator('#portfolioClobberProbe')).toHaveCount(0)
  expect(await page.evaluate(() => Reflect.get(window, 'portfolioClobberProbe'))).toBeUndefined()

  // Keep the application's default link-safety confirmation enabled. It
  // renders buttons, so verify the rewritten destination in its real modal.
  const fragment = response.getByRole('button', { name: 'Jump to section', exact: true })
  await fragment.focus()
  await page.keyboard.press('Enter')
  const modal = page.locator('[data-streamdown="link-safety-modal"]')
  await expect(modal.getByText('#user-content-portfolioClobberProbe', { exact: true })).toBeVisible()
  await expect(modal.getByRole('button', { name: 'Close', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(modal).toHaveCount(0)
  await expect(fragment).toBeFocused()

  const strong = response.locator('[data-streamdown="strong"]')
  await expect(strong).toHaveText('bold')
  expect(await strong.evaluate((element) => Number(getComputedStyle(element).fontWeight))).toBeGreaterThanOrEqual(600)
  await expect(response.locator('code').filter({ hasText: 'const answer = 42;' }).first()).toBeVisible()
  const note = response.getByRole('button', { name: '1', exact: true })
  await note.focus()
  await page.keyboard.press('Enter')
  const destination = modal.getByText(/^#user-content-fn-/)
  await expect(destination).toBeVisible()
  const target = await destination.textContent()
  expect(target).not.toContain('user-content-user-content-')
  expect(await response.evaluate((element, hash) => {
    const id = hash?.slice(1)
    return [...element.querySelectorAll('[id]')].some((node) => node.id === id && node.textContent?.includes('Footnote remains usable.'))
  }, target)).toBe(true)
  await page.keyboard.press('Escape')
  await expect(modal).toHaveCount(0)
  await expect(note).toBeFocused()
  expect(errors).toEqual([])
})
