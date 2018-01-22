import getPages from '../../src/get-pages'

describe('getPages', function() {
  it('returns an empty array with no arguments', function() {
    expect(getPages()).toEqual([])
  })
})
