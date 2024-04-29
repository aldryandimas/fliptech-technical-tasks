describe("Chapter 3 Question 2", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("https://flip.id/landing", { duration: 1000 });
  });

  it("Section 1", () => {
    cy.get('[alt="hero main customer"]').should("be.visible"); //check the page is fully loaded

    //check the initial toggle and page language are in ID
    cy.get(".css-1yf9g01").find(".css-rrkcqg");
    cy.contains(
      "Transfer beda bank, top up e-wallet, kirim uang ke luar negeri, dan beli produk digital. Semua lebih terjangkau!"
    ).should("exist");

    cy.get(".toggle-language").click();

    //check the page is now in EN
    cy.url().should("contain", "/en");
    cy.get(".css-1qcxquc").find(".css-rrkcqg");
    cy.contains(
      "Transfer from different banks, top up e-wallet, send money abroad, and buy digital products. All with lower cost!"
    ).should("exist");
  });

  it("Section 2", () => {
    cy.get("#home").scrollTo("0%", "30%", { duration: 2000 });
    cy.get('[href="/produk-digital"]').contains("Selengkapnya").click();
    // because I could not find celullar provider in homepage
    // then I direct the automation to go to Produk Digital page

    cy.url().should("contain", "/produk-digital");

    //check Telkomsel, Indosat Ooredoo, and XL mentioned in the page
    cy.get('[alt="telkomsel"]').should("exist");
    cy.get('[alt="indosat"]').should("exist");
    cy.get('[alt="XL"]').should("exist");
  });

  it("Section 3", () => {
    cy.get("#home").scrollTo("0%", "40%", { duration: 2000 });
    cy.get('[href="/flip-globe"]').contains("Selengkapnya").click();

    cy.url().should("contain", "/flip-globe");

    //choosing GBP as the exchange currency
    cy.get(".chakra-menu__menu-button").click();
    cy.get(".chakra-input").type("GBP");
    cy.get(".chakra-stack:eq(10)")
      .should("have.length", "1")
      .find(".chakra-text")
      .click();

    cy.get(".chakra-text").contains("GBP").should("exist").and("be.visible");
    cy.get(".chakra-text").contains("IDR").should("exist").and("be.visible");

    let num = "1000000"; //total IDR to exchange
    cy.get('input[placeholder="Masukkan nominal dalam IDR"]').type(num);

    cy.contains("1 GBP =").then(($exc) => {
      let ratetotext = $exc
        .text()
        .split(" ")[3]
        .replace(".", "")
        .replace(",", ".");

      //collecting the rate according to the portal
      let rate = parseFloat(num / ratetotext).toFixed(2) * 1;
      rate = rate.toString().replace(".", ",");

      //compare the rate and the actual exchange result
      cy.get('input[placeholder="Masukkan nominal dalam GBP"]')
        .invoke("val")
        .should("eq", rate);
    });
  });
});
