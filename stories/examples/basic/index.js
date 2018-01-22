import React from 'react'
import Verso, { range } from '../../../src'
import './styles.css'

export default class Pagination extends React.Component {
  // in a real app, `currentPage` and `items` would be props to this component
  state = {
    currentPage: 1,
    items: range(1, 31)
  }

  render() {
    return (
      <Verso
        maxItems={5}
        perPage={5} // how many items are displayed on each page
        totalCount={this.state.items.length} // total # of items
        currentPage={this.state.currentPage} // current page
      >
        {versoState => this.renderPagination(versoState)}
      </Verso>
    )
  }

  renderPagination = ({
    currentPage,
    totalPages,
    previousPage,
    nextPage,
    pages,
    itemStart,
    itemEnd,
    atStart,
    atEnd
  }) => {
    return (
      <div className="example example-basic">
        <p className="page-info">
          Showing {itemStart + 1} - {itemEnd} of {this.state.items.length} (Page{' '}
          {currentPage} of {totalPages})
        </p>

        <ul className="pagination-container">
          <li>
            {this.renderLink(1, '« First', null, currentPage === 1, 'plain')}
          </li>

          <li>
            {this.renderLink(
              previousPage,
              '‹ Previous',
              null,
              !previousPage,
              'plain'
            )}
          </li>

          {pages.map((page, i) =>
            this.renderPage(page, i, page === currentPage)
          )}

          <li>
            {this.renderLink(nextPage, 'Next ›', null, !nextPage, 'plain')}
          </li>
          <li>
            {this.renderLink(
              totalPages,
              'Last »',
              null,
              currentPage === totalPages,
              'plain'
            )}
          </li>
        </ul>
      </div>
    )
  }

  renderPage = (page, i, isCurrent) => {
    return <li key={page}>{this.renderPageLink(page, page, isCurrent)}</li>
  }

  renderEllipse() {
    return (
      <li key="ellipse">
        <span>…</span>
      </li>
    )
  }

  renderLink = (page, text, isCurrent, disabled, className = '') => {
    return (
      <button
        className={className}
        disabled={isCurrent || disabled}
        onClick={e => this.onClickPageLink(e, page)}
        data-text={text}
      >
        {text}
      </button>
    )
  }

  renderPageLink = (page, text, isCurrent, disabled) => {
    return (
      <button
        className={`page-link ${isCurrent ? 'current' : ''}`}
        disabled={isCurrent || disabled}
        onClick={e => this.onClickPageLink(e, page)}
        data-page={text}
      >
        xx
      </button>
    )
  }

  onClickPageLink = (e, page) => {
    this.setState({ currentPage: page })
    e.preventDefault()
  }
}
