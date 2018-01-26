import getPages from '../../src/get-pages'

describe('getPages/1', function() {
  it('returns an empty array with no arguments', function() {
    expect(getPages()).toEqual([])
  })

  // fewer pages than max items
  it('returns all pages if the total pages is less than the max items to show', function() {
    let args = { currentPage: 1, maxItems: 3, totalPages: 2 }
    expect(getPages(args)).toEqual([1, 2])
  })

  // at start
  it('returns 1..maxItems when the currentPage is near the beginning', function() {
    let args = { currentPage: 2, maxItems: 5, totalPages: 10 }
    expect(getPages(args)).toEqual([1, 2, 3, 4, 5])
  })

  // at end
  it('returns the last maxItems pages when the currentPage is near the end', function() {
    let args = { currentPage: 10, maxItems: 5, totalPages: 10 }
    expect(getPages(args)).toEqual([6, 7, 8, 9, 10])
  })

  // in the middle
  it('returns pages around the currentPage', function() {
    let args = { currentPage: 5, maxItems: 5, totalPages: 10 }
    expect(getPages(args)).toEqual([3, 4, 5, 6, 7])
  })
})
