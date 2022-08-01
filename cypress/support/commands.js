/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getDeckId', () => {
    cy.request({
        method: 'POST',
        url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    }).then(res => {
        cy.wrap(res).as('deckId')
    })
})


Cypress.Commands.add('drawCardsFromDeck', (deckID, cardsAmount) => {
    cy.request({
        method: 'GET',
        url: `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${cardsAmount}`
    }).then(res => {
        cy.wrap(res).as('temp')

    })
})

Cypress.Commands.add('addCardsToPile', (deckID, card, pileName) => {
    cy.request({
        method: 'GET',
        url: `https://deckofcardsapi.com/api/deck/${deckID}/pile/${pileName}/add/?cards=${card}`
    }).then(res => {
        cy.wrap(res).as('temp2')
    })
})

Cypress.Commands.add('listingCardsInPiles', (deckID, pileName) => {
    cy.request({
        method: 'GET',
        url: `https://deckofcardsapi.com/api/deck/${deckID}/pile/${pileName}/list/`
    }).then(res => {
        cy.wrap(res).as('listingReturn')
    })
})