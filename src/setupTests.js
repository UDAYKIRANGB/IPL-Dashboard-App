/* eslint-disable */

import '@testing-library/jest-dom'
import {configure} from '@testing-library/react'

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

configure({testIdAttribute: 'testid'})
