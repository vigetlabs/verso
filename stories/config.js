/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions, import/max-dependencies */

import {configure, storiesOf} from '@storybook/react'
import React from 'react'

import Basic from './examples/basic'
import Ajax from './examples/ajax'
import Fancy from './examples/fancy'

function loadStories() {
  // clear the console to make debugging experience better
  console.clear()

  storiesOf('Examples', module)
    .add('basic', () => <Basic />)
    .add('ajax', () => <Ajax />)
    .add('fancy', () => <Fancy />)
}

configure(loadStories, module)
