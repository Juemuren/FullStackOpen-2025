import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('call createBlog with right details when clicking create', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'This is title')
    await user.type(authorInput, 'This is author')
    await user.type(urlInput, 'This is url')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('This is title')
    expect(createBlog.mock.calls[0][0].author).toBe('This is author')
    expect(createBlog.mock.calls[0][0].url).toBe('This is url')
  })
})
