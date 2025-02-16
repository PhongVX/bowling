import "./command";

Cypress.on("uncaught:exception", (err) => {
    console.error("Uncaught Exception:", err);
    return false;
});