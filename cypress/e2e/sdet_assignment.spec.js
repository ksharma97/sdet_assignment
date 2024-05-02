import testData from "../fixtures/testData/testData.json";
import locator from "../fixtures/locators/dynamicTable.json";
describe("Verify Inserted Data in Table", () => {
  const columnHeader = Object.keys(testData[0]);
  it("Navigate to Url and Verify", function () {
    /** Step 1: Code to verify landed on correct url */
    cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");
    cy.url().should("include", "dynamic-table");
    cy.get(locator.DynamicTableHeader).should("be.visible");

    /** Step 2: Code to Click on Table Data button and verify */
    cy.get(locator.TableData).should("be.visible").click();
    cy.get(locator.InputField).should("be.visible");

    /** Step 3: Code to enter Json Data in the textarea */
    cy.get(locator.InputField)
      .click()
      .clear()
      .type(JSON.stringify(testData), { parseSpecialCharSequences: false });
    cy.get(locator.InputField).should("have.value", JSON.stringify(testData));
  });
  it("Verify Inserted Data in the Table", function () {
    /** Step 4: Code to click on Refresh Table button and Verify Entered Data in the table */
    cy.get(locator.RefreshTableButton).should("be.visible").click();
    cy.get(locator.DynamicTableData).should("have.length", testData.length + 1); //Added 1 to the original data for header row.
    cy.get(locator.DynamicTableData).each((row, index) => {
      if (index === 0) {
        cy.wrap(row)
          .find("th")
          .each((header, i) => {
            cy.wrap(header)
              .invoke("text")
              .invoke("trim")
              .should("equal", columnHeader[i]);
          });
      } else {
        cy.wrap(row)
          .find("td")
          .each((columnData, i) => {
            cy.wrap(columnData)
              .invoke("text")
              .invoke("trim")
              .should("equal", testData[index - 1][columnHeader[i]].toString());
          });
      }
    });
  });
});
