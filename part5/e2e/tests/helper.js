const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click();
  await page.getByRole('textbox', { name: 'write blog title here' }).fill(title);
  await page.getByRole('textbox', { name: 'write blog author here' }).fill(author);
  await page.getByRole('textbox', { name: 'write blog url here' }).fill(url);
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText(`${title} ${author}`).waitFor()
}

const likeBlog = async (page, index, likes) => {
  await page.getByRole('button', { name: 'view' }).nth(index).click()
  for (let i = 0; i < likes; i++) {
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText(`likes ${i + 1}`).waitFor()
  }
  await page.getByRole('button', { name: 'hide' }).click()
}

export { loginWith, createBlog, likeBlog }