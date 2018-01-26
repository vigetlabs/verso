import React from 'react'
import Verso from 'verso'
import { shallow } from 'enzyme'

describe('verso', function() {
  it('renders nothing when given no children', function() {
    let wrapper = shallow(<Verso perPage={3} totalCount={10} currentPage={1} />)
    expect(wrapper.getElement()).toBe(null)
  })

  it('throws if the `children` prop is not a function', function() {
    try {
      shallow(
        <Verso perPage={3} totalCount={10} currentPage={1}>
          <span />
        </Verso>
      )
    } catch (e) {
      expect(e.message).toBe('Verso: The `children` prop must be a function.')
    }
  })

  it('throws if a the `getPages` prop is not a function', function() {
    try {
      shallow(
        <Verso perPage={1} totalCount={10} currentPage={1} getPages="bad" />
      )
    } catch (e) {
      expect(e.message).toBe('Verso: The `getPages` prop must be a function.')
    }
  })

  it('throws if the `maxItems` prop is not a positive integer', function() {
    try {
      shallow(
        <Verso maxItems={0} perPage={1} totalCount={10} currentPage={1} />
      )
    } catch (e) {
      expect(e.message).toBe(
        'Verso: The `maxItems` prop must be a positive integer.'
      )
    }
  })

  it('throws if the `perPage` prop is not a positive integer', function() {
    try {
      shallow(<Verso perPage={0} totalCount={10} currentPage={1} />)
    } catch (e) {
      expect(e.message).toBe(
        'Verso: The `perPage` prop must be a positive integer.'
      )
    }
  })

  it('throws if the `totalCount` prop is a negative integer', function() {
    try {
      shallow(<Verso perPage={1} totalCount={0} currentPage={1} />)
    } catch (e) {
      expect(e.message).toBe(
        'Verso: The `total` prop must be a non-negative integer.'
      )
    }
  })

  it('throws if the `currentPage` prop is not a positive integer', function() {
    try {
      shallow(<Verso perPage={1} totalCount={10} currentPage={0} />)
    } catch (e) {
      expect(e.message).toBe(
        'Verso: The `currentPage` prop must be a positive integer.'
      )
    }
  })

  it('calls the `children` function prop with the verso state', function() {
    let render = versoState => {
      expect(versoState).toEqual(expect.objectContaining({
        totalPages: 10,
        currentPage: 1,
        itemStart: 1,
        itemEnd: 3,
        pages: [1,2,3,4,5],
        nextPage: 2,
        previousPage: null,
        atStart: true,
        atEnd: false
      }))
    }

    let wrapper = shallow(
      <Verso perPage={3} totalCount={30} currentPage={1}>
        {versoState => render(versoState)}
      </Verso>
    )
  })
})
