import 'react-table/react-table.css'
import './styles.css'

import React from 'react'
import axios from 'axios'
import Table from 'react-table'
import Pagination from './pagination'
import moment from 'moment'

const BASE_API_URL = 'https://api.coinmarketcap.com/v1/ticker/'
const ITEMS_PER_PAGE = 50

function apiUrl(page) {
  return `${BASE_API_URL}?limit=${ITEMS_PER_PAGE}&start=${(page - 1) * ITEMS_PER_PAGE}`
}

export default class AjaxExample extends React.Component {
  // in a real app, `loading`, `currentPage` and `items` would be props to this component
  state = {
    error: null,
    loading: true,
    currentPage: 1,
    inputValue: 1,
    totalCount: null,
    items: []
  }

  componentDidMount() {
    this.getTotalCount().then(() => {
      this.getPageData(this.state.currentPage)
    })
  }

  render() {
    return (
      <div className="verso-example-ajax">
        <Pagination
          perPage={ITEMS_PER_PAGE}
          loading={this.state.loading}
          totalCount={this.state.totalCount} // total # of items
          currentPage={this.state.currentPage} // current page
          changePage={this.changePage}
        />
        {this.state.items.length ? (
          <Table
            loading={this.state.loading}
            loadingText={''}
            pageSize={ITEMS_PER_PAGE}
            data={this.state.items}
            columns={[
              {
                Header: 'Name',
                accessor: 'name'
              },
              {
                Header: 'Availability',
                accessor: 'available_supply'
              },
              {
                Header: 'Rank',
                accessor: 'rank'
              },
              {
                Header: 'Price (USD)',
                accessor: 'price_usd'
              },
              {
                Header: 'Price (BTC)',
                accessor: 'price_btc'
              },
              {
                Header: 'Last Updated',
                accessor: 'last_updated',
                Cell: props => moment(props.value, 'X').format("MMM Do YYYY, HH:mm")
              }
            ]}
            showPagination={false}
            className="-striped -highlight"
          />
        ) : null}
      </div>
    )
  }

  getTotalCount() {
    return axios.get(`${BASE_API_URL}?limit=0`).then(
      response => {
        this.setState({ totalCount: response.data.length })
      },
      error => {
        this.setState({ error, loading: false })
      }
    )
  }

  getPageData(page) {
    return new Promise((resolve, reject) => {
      this.setState({ loading: true }, () => {
        axios.get(apiUrl(page)).then(
          response => {
            this.setState({
              error: null,
              loading: false,
              items: response.data,
              currentPage: page
            }, resolve)
          },
          error => {
            this.setState({ error, loading: false }, reject)
          }
        )
      })
    })
  }

  changePage = page => {
    return this.getPageData(page)
  }
}
