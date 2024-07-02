import React from 'react'
import { CoolCalc } from './03-CoolCalc'

describe('<CoolCalc />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CoolCalc />)
  })
})