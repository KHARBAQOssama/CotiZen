const cron = require("node-cron");
const { generateInvoicesForApartments } = require("../api/components/appartements/helper");

cron.schedule(
  "1 1 1 * * *",
  async () => {
    try {
      console.log("Invoices generation starts ....");
      await generateInvoicesForApartments();
      console.log("Invoices generated successfully.");
    } catch (error) {
      console.error("Error generating invoices:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Africa/Casablanca", 
  }
);
