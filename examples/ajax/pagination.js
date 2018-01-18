import React from 'react'
import Verso from 'verso'
import './styles.css'

export default class Pagination extends React.Component {
  // this state would be props
  state = {
    loading: false,
    currentPage: 1,
    inputValue: 1,
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
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30
    ]
  }

  fakeJax() {
    return new Promise(resolve => {
      setTimeout(resolve, 500 + Math.random() * 1000)
    })
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
    let isLastPage = currentPage === totalPages
    let isFirstPage = currentPage === 1
    let noPrev = !previousPage
    let noNext = !nextPage

    return (
      <div className="example-container">
        <div className="page-info">
          <span>Showing {itemStart + 1} - {itemEnd} of {this.state.items.length}</span>
          {this.state.loading && <div class="loader">Loading...</div>}
        </div>

        <ul className="pagination-container">
          <li>{this.renderLink(1, '«', null, isFirstPage, 'plain')}</li>
          <li>{this.renderLink(previousPage, '‹', null, noPrev, 'plain')}</li>
          <li>
            <input
              className="pagination-input"
              type="text"
              size="2"
              value={this.state.inputValue}
              disabled={this.state.loading}
              onChange={e => this.handleInputChange(e, totalPages)}
            />{' '}
            of {totalPages}
          </li>
          <li>{this.renderLink(nextPage, '›', null, noNext, 'plain')}</li>
          <li>{this.renderLink(totalPages, '»', null, isLastPage, 'plain')}</li>
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
        <span className="ellipse">…</span>
      </li>
    )
  }

  renderLink = (page, text, isCurrent, disabled, className = '') => {
    return (
      <button
        className={className}
        disabled={isCurrent || disabled || this.state.loading}
        onClick={e => this.handlePageLinkClick(e, page)}
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
        disabled={isCurrent || disabled || this.state.loading}
        onClick={e => this.handlePageLinkClick(e, page)}
        data-page={text}
      >
        xx
      </button>
    )
  }

  handleInputChange = (e, totalPages) => {
    let value = e.target.value

    this.setState({ inputValue: value || '' }, () => {
      this.handlePageChange(value, totalPages)
    })
  }

  handlePageChange = (value, totalPages) => {
    let parsedValue = parseInt(value, 10)

    if (!isNaN(parsedValue) && parsedValue <= totalPages) {
      this.changePage(parsedValue)
    }
  }

  handlePageLinkClick = (e, page) => {
    this.changePage(page)
    e.preventDefault()
  }

  changePage(page) {
    this.setState({loading: true }, () => {
      this.fakeJax().then(() => {
        this.setState({ loading: false, currentPage: page, inputValue: page })
      })
    })
  }
}
