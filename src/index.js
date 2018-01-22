import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import getPages from './get-pages'

class Verso extends React.Component {
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

Verso.propTypes = {
  children: PropTypes.func,
  getPages: PropTypes.func,
  maxItems: PropTypes.number,
  perPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

Verso.defaultProps = {
  children: () => {},
  getPages: getPages,
  maxItems: 5
}

export default Verso
export { range }
