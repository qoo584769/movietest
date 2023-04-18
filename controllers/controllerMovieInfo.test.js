const controllerMovieInfo = require('./controllerMovieInfo.js')

it('should return success', async () => {
  expect(await controllerMovieInfo.tryTest()).toBe('測試成功')
})
