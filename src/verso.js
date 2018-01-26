import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import getPages from './get-pages'

class Verso extends React.Component {
  constructor(props, context) {
    super(props, context)

    console.assert(
      typeof props.children === 'function',
      `Verso: The \`children\` prop must be a function.`
    )
    console.assert(
      typeof props.getPages === 'function',
      `Verso: The \`getPages\` prop must be a function.`
    )
    console.assert(
      props.maxItems > 0,
      `Verso: The \`maxItems\` prop must be a positive integer.`
    )
    console.assert(
      props.perPage > 0,
      `Verso: The \`perPage\` prop must be a positive integer.`
    )
    console.assert(
      props.totalCount >= 0,
      `Verso: The \`totalCount\` prop must be a non-negative integer.`
    )
    console.assert(
      props.currentPage > 0,
      `Verso: The \`currentPage\` prop must be a positive integer.`
    )
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
    let itemStart = perPage * (currentPage - 1) + 1
    let itemEnd = Math.min(itemStart + perPage, totalCount) - 1

    return (
      children({
        totalPages,
        currentPage,
        itemStart,
        itemEnd,
        pages: getPages({ maxItems, currentPage, totalPages }),
        nextPage: nextPage ? currentPage + 1 : null,
        previousPage: previousPage ? currentPage - 1 : null,
        atStart: currentPage <= half + 1,
        atEnd: currentPage + half >= totalPages
      }) || null
    )
  }
}

// Verso.propTypes = {
//   children: PropTypes.func,
//   getPages: PropTypes.func,
//   maxItems: PropTypes.number,
//   perPage: PropTypes.number.isRequired,
//   totalCount: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired
// }

Verso.defaultProps = {
  children: () => {},
  getPages: getPages,
  maxItems: 5
}

export default Verso
export { range }
