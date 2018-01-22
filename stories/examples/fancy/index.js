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
        perPage={2} // how many items are displayed on each page
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
    let fixedLastPage = currentPage < totalPages - 3

    return (
      <div className="example example-basic">
        <p className="page-info">
          Showing {itemStart} - {itemEnd} of {this.state.items.length}
        </p>

        <ul className="pagination-container">
          <li>
            {this.renderLink(
              previousPage,
              '← Previous',
              null,
              !previousPage,
              'plain'
            )}
          </li>

          {!atStart && <li>{this.renderLink(1, 1, null)}</li>}

          {!atStart && (
            <li key="ellipse-left">
              <span>…</span>
            </li>
          )}

          {pages.map((page, i) =>
            this.renderPage(page, i, page === currentPage)
          )}

          {!atEnd &&
            fixedLastPage && (
              <li key="ellipse-right">
                <span>…</span>
              </li>
            )}

          {!atEnd && <li>{this.renderLink(totalPages, totalPages, null)}</li>}
          <li>
            {this.renderLink(nextPage, 'Next →', null, !nextPage, 'plain')}
          </li>
        </ul>
      </div>
    )
  }

  renderPage = (item, i, isCurrent) => {
    return <li key={item}>{this.renderPageLink(item, item, isCurrent)}</li>
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
