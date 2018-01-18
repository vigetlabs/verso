import React from 'react'
import Verso from 'verso'
import styles from './styles.css'

export default class Pagination extends React.Component {
  // this state would be props
  state = {
    currentPage: 1,
    items: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ]
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
    pageCount,
    previousPage,
    nextPage,
    items,
    start,
    end,
    atStart,
    atEnd
  }) => {
    let fixedLastPage = currentPage < pageCount - 2

    return (
      <div className="example example-basic">
        <p className="page-info">Showing {start} - {end} of { this.state.items.length }</p>

        <ul className="pagination-container">
          <li>
            {this.renderLink(previousPage, '← Previous', null, !previousPage, 'plain')}
          </li>

          {!atStart && <li>{this.renderLink(1, 1, null)}</li>}

          {!atStart && (
            <li key="ellipse-left">
              <span>…</span>
            </li>
          )}

          {items.map((item, i) =>
            this.renderItem(item, i, item === currentPage)
          )}

          {!atEnd &&
            currentPage < pageCount - 3 && (
              <li key="ellipse-right">
                <span>…</span>
              </li>
            )}

          {!atEnd && <li>{this.renderLink(pageCount, pageCount, null)}</li>}
          <li>{this.renderLink(nextPage, 'Next →', null, !nextPage, 'plain')}</li>
        </ul>
      </div>
    )
  }

  renderItem = (item, i, isCurrent) => {
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
