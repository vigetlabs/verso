import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'

class Verso extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    getPages: PropTypes.func,
    maxItems: PropTypes.number,
    perPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  }

  static defaultProps = {
    children: () => {},
    getPages: Verso.getPages,
    maxItems: 5
  }

  static getPages(maxItems, currentPage, totalPages) {
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

  render() {
    let {
      getPages,
      perPage,
      children,
      maxItems,
      currentPage,
      totalCount
    } = this.props

    let totalPages = Math.ceil(totalCount / perPage)
    let previousPage = currentPage > 1
    let nextPage = currentPage < totalPages
    let half = Math.floor(maxItems / 2)
    let itemStart = perPage * (currentPage - 1)
    let itemEnd = Math.min(itemStart + perPage, totalCount)

    return children({
      totalPages,
      currentPage,
      itemStart,
      itemEnd,
      pages: getPages(maxItems, currentPage, totalPages),
      nextPage: nextPage ? currentPage + 1 : null,
      previousPage: previousPage ? currentPage - 1 : null,
      atStart: currentPage <= half + 1,
      atEnd: currentPage + half >= totalPages
    })
  }
}

export default Verso
export { range }
