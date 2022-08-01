describe('suite', () => {
    it('do the deck', () => {
        var usedCards = []

        //GETTING DECK ID 
        cy.getDeckId()
        cy.get('@deckId').then((deckId) => {
            expect(deckId.status).to.equal(200)

            cy.drawCardsFromDeck(deckId.body.deck_id, 3)
            
            cy.get('@temp').then(cards => {
                expect(cards.status).to.equal(200)

                cards.body.cards.forEach(elem => {
                    //ADDING CARDS TO PILE 1
                    cy.addCardsToPile(deckId.body.deck_id, elem.code, 'pile1')
                    
                    usedCards.push(elem.code)
                });
            })

            cy.drawCardsFromDeck(deckId.body.deck_id, 3)

            cy.get('@temp').then(cards => {
                expect(cards.status).to.equal(200)
                
                cards.body.cards.forEach(elem => {
                    //ADDING CARDS TO PILE 2
                    cy.addCardsToPile(deckId.body.deck_id, elem.code, 'pile2')
                    usedCards.push(elem.code)
                });
            })

            cy.listingCardsInPiles(deckId.body.deck_id, 'pile1')

            cy.get('@listingReturn').then(res => {
                expect(res.status).to.equal(200)
                res.body.piles.pile1.cards.forEach(card => {
                    expect(card.code).to.be.oneOf(usedCards)
                })
            })

            cy.listingCardsInPiles(deckId.body.deck_id, 'pile2')

            cy.get('@listingReturn').then(listingReturn => {
                expect(listingReturn.status).to.equal(200)
                listingReturn.body.piles.pile2.cards.forEach(card => {
                    console.log(card.code)
                    expect(card.code).to.be.oneOf(usedCards)
                })
            })
        })
    })
})