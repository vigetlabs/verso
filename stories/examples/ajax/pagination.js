import React from 'react'
import Verso, { range } from '../../../'
import clamp from 'lodash/clamp'

export default class Pagination extends React.Component {
  state = {
    inputValue: 1
  }

  render() {
    return (
      <Verso
        perPage={this.props.perPage} // how many items are displayed on each page
        totalCount={this.props.totalCount} // total # of items
        currentPage={this.props.currentPage} // current page
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
    let { loading, totalCount, error } = this.props

    let isLastPage = currentPage === totalPages
    let isFirstPage = currentPage === 1
    let noPrev = !previousPage
    let noNext = !nextPage

    return (
      <div className="example-container">
        <div className="page-info">
          {totalCount ? (
            <span>
              Showing {itemStart} - {itemEnd} of {totalCount}
            </span>
          ) : null}
          {loading && <div className="loader">Loading...</div>}
        </div>

        {totalCount ? (
          <ul className="pagination-container">
            <li>{this.renderLink(1, '«', null, isFirstPage, 'plain')}</li>
            <li>{this.renderLink(previousPage, '‹', null, noPrev, 'plain')}</li>
            <li>
              <form onSubmit={e => this.onSubmit(e, totalPages)}>
                <input
                  className="pagination-input"
                  type="text"
                  size="2"
                  value={this.state.inputValue}
                  disabled={loading}
                  onChange={e => this.handleInputChange(e, totalPages)}
                />{' '}
                of {totalPages}
              </form>
            </li>
            <li>{this.renderLink(nextPage, '›', null, noNext, 'plain')}</li>
            <li>
              {this.renderLink(totalPages, '»', null, isLastPage, 'plain')}
            </li>
          </ul>
        ) : null}
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
        disabled={isCurrent || disabled || this.props.loading}
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
        disabled={isCurrent || disabled || this.props.loading}
        onClick={e => this.handlePageLinkClick(e, page)}
        data-page={text}
      >
        xx
      </button>
    )
  }

  onSubmit = (e, totalPages) => {
    this.handlePageChange(this.state.inputValue, totalPages)
    e.preventDefault()
    e.stopPropagation()
  }

  handleInputChange = (e, totalPages) => {
    let value = e.target.value

    this.setState({ inputValue: value || '' })
  }

  handlePageChange = (value, totalPages) => {
    let parsedValue = parseInt(value, 10)

    if (
      !isNaN(parsedValue) &&
      parsedValue <= totalPages &&
      parsedValue !== this.props.currentpage
    ) {
      this.changePage(parsedValue)
    } else {
      if (isNaN(parsedValue)) {
        this.setState({ inputValue: this.props.currentPage })
      } else {
        let nextPage = clamp(parsedValue, 1, totalPages)

        this.setState({ inputValue: nextPage }, () => {
          this.changePage(nextPage)
        })
      }
    }
  }

  handlePageLinkClick = (e, page) => {
    this.changePage(page)
    e.preventDefault()
  }

  changePage(page) {
    this.props.changePage(page).then(response => {
      this.setState({ inputValue: page })
    })
  }
}
