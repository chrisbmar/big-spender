describe("All items are rendered correctly", () => {
  it("Renders 24 items", () => {
    cy.visit("/");
    cy.get("[data-cy=items]").should("have.length", 24);
  });

  it("each item has a sell button", () => {
    cy.get("[data-cy=items]").each((item) => {
      cy.wrap(item).find("[data-cy=sellButton]").should("exist");
    });
  });

  it("each item has a buy button", () => {
    cy.get("[data-cy=items]").each((item) => {
      cy.wrap(item).find("[data-cy=buyButton]").should("exist");
    });
  });

  it("each item has a text input", () => {
    cy.get("[data-cy=items]").each((item) => {
      cy.wrap(item).find("input").should("exist");
    });
  });
});

describe("Buying and selling an item updates totalMoney", () => {
  function subtract(a: string, b: number): string {
    const aConvertedToNumber = +a.substring(1);
    return `$${(aConvertedToNumber - b).toString()}`;
  }

  it("buying an item updates totalMoney", () => {
    cy.get("[data-cy=chooseBillionaireBtn]").click();
    cy.get("[data-cy=billionaireTable]")
      .last()
      .find("[data-cy=billionaireTotalMoney]")
      .invoke("text")
      .then(($value) => {
        const value = $value;

        cy.get("[data-cy=billionaireTable]")
          .last()
          .find("[data-cy=selectBillionaireBtn]")
          .click();

        cy.get("[data-cy=items]")
          .eq(2)
          .find("[data-cy=buyButton]")
          .click()
          .click();

        cy.get("[data-cy=totalMoney]")
          .invoke("text")
          .should("equal", subtract(value, 30));
      });
  });

  it("selling an item updates totalMoney", () => {
    cy.get("[data-cy=chooseBillionaireBtn]").click();
    cy.get("[data-cy=billionaireTable]")
      .last()
      .find("[data-cy=billionaireTotalMoney]")
      .invoke("text")
      .then(($value) => {
        const value = $value;

        function add(a: string, b: number): string {
          const aConvertedToNumber = +a.substring(1);
          return `$${(aConvertedToNumber + b).toString()}`;
        }

        cy.get("[data-cy=billionaireTable]")
          .last()
          .find("[data-cy=selectBillionaireBtn]")
          .click();

        cy.get("[data-cy=items]")
          .eq(2)
          .find("[data-cy=sellButton]")
          .click()
          .click();

        cy.get("[data-cy=totalMoney]")
          .invoke("text")
          .should("equal", add(value, 30));
      });
  });

  it("decreases totalMoney when the quantity entered in the input is increased", () => {
    cy.get("[data-cy=chooseBillionaireBtn]").click();
    cy.get("[data-cy=billionaireTable]")
      .last()
      .find("[data-cy=billionaireTotalMoney]")
      .invoke("text")
      .then(($value) => {
        const value = $value;

        cy.get("[data-cy=billionaireTable]")
          .last()
          .find("[data-cy=selectBillionaireBtn]")
          .click();

        cy.get("[data-cy=items]").eq(2).find("input").type("2");

        cy.get("[data-cy=totalMoney]")
          .invoke("text")
          .should("equal", subtract(value, 30));
      });
  });

  it("increases totalMoney when the quantity entered in the input is decreased", () => {
    cy.visit("/");
    cy.get("[data-cy=chooseBillionaireBtn]").click();
    cy.get("[data-cy=billionaireTable]")
      .last()
      .find("[data-cy=billionaireTotalMoney]")
      .invoke("text")
      .then(($value) => {
        const value = $value;

        cy.get("[data-cy=billionaireTable]")
          .last()
          .find("[data-cy=selectBillionaireBtn]")
          .click();

        cy.get("[data-cy=items]").eq(2).find("input").type("2").focus().blur();

        cy.get("[data-cy=items]").eq(2).find("input").clear().type("1");

        cy.get("[data-cy=totalMoney]")
          .invoke("text")
          .should("equal", subtract(value, 15));
      });
  });
});

describe("Correct CSS classes are applied", () => {
  it("On load, the sell button is disabled", () => {
    cy.visit("/");
    cy.get("[data-cy=items]").should("have.length", 24);
    cy.get("[data-cy=items]").each((item) => {
      cy.wrap(item).find("[data-cy=sellButton]").should("be.disabled");
    });
  });

  it("On load, the buy button is enabled", () => {
    cy.get("[data-cy=items]").should("have.length", 24);
    cy.get("[data-cy=items]").each((item) => {
      cy.wrap(item).find("[data-cy=buyButton]").should("not.be.disabled");
    });
  });

  it("buy button is disabled when you can't afford the item", () => {
    cy.get("[data-cy=chooseBillionaireBtn]").click();
    cy.get("[data-cy=selectBillionaireBtn]").last().click();
    cy.get("[data-cy=items]").eq(2).find("input").type("6");
    cy.get("[data-cy=items]").find("[data-cy=buyButton]").should("be.disabled");
  });

  it("sell button is enabled when item quantity > 1", () => {
    cy.get("[data-cy=items]")
      .eq(2)
      .find("[data-cy=sellButton]")
      .should("not.be.disabled");
  });
});
