// controllers/payment.js
module.exports = {
    Add: async (req, res) => {
        try {
            // Assuming you'll insert Flouci payment processing logic here
            res.status(200).send("Payment processed successfully");
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).send("Error processing payment");
        }
    }
};
