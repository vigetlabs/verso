import range from 'lodash/range'

export default function getPages({ maxItems, currentPage, totalPages } = {}) {
  if (!maxItems || !currentPage || !totalPages) {
    return []
  }

  // fewer pages than max items
  if (totalPages < maxItems) {
    return range(1, totalPages + 1)
  }

  let half = Math.floor(maxItems / 2)

  if (currentPage <= half) {
    return range(1, maxItems + 1)
  }

  let start = currentPage - half

  if (currentPage >= totalPages - half) {
    start = totalPages - maxItems + 1
  }

  return range(start, start + maxItems)
}
