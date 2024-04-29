describe("Chapter 3 Question 1", () => {
  it("Section 1", () => {
    cy.request("GET", "https://gorest.co.in/public/v2/todos").then(
      (response) => {
        expect(response.body).to.have.length("10");
      }
    );
  });

  it("Section 2", () => {
    cy.request("GET", "https://gorest.co.in/public/v2/users").then((resp) => {
      var filtered = resp.filter((a) => a.status == "inactive");
      cy.log(filtered);
    });

    //I could not finish Section 2 of Chapter 3 Question 1 as I got limited knowledge to the syntax needed to use for this question for now
    //I am terribly sorry for this faultness
    //However, I am really interested to learn more into API test with Cypress as this topic is my focus moving forward
    //I would love to learn from seniors of Cypress and read more into the Cypress API testing documentation available on the internet
  });
});
