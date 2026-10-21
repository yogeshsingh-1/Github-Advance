import Stripe from "stripe";
const stripe = new Stripe(
  ""
);

const newCheckoutSession = await stripe.checkout.sessions.create({
  success_url: "https://procodrr.com?session_id={CHECKOUT_SESSION_ID}",
  customer_email: "anuragsinghbam@gmail.com",
  // billing_address_collection: 'required',
  shipping_address_collection: {
    allowed_countries: ["IN", "PK", "BG", "NP", "US", "BD"],
  },
  metadata: {
    userId: 12234,
    courseId: 54321,
    userName: "Anurag Singh",
  },
  line_items: [
    {
      price_data: {
        product_data: {
          name: "Computer Networking Classes",
          description: "Best Computer Networking classes in the World 🌍",
          images: [
            "https://procodrr.com/assets/images/networking-course.webp",
            "https://procodrr.com/assets/images/regex-pro-course.webp",
          ],
        },
        unit_amount: 60000,
        currency: "USD",
      },
      adjustable_quantity: {
        enabled: true,
      },
      quantity: 2,
    },
    {
      price_data: {
        product_data: {
          name: "Regular Expression Classes",
          description: "Best Regular Expression classes in the World 🌍",
          images: ["https://procodrr.com/assets/images/regex-pro-course.webp"],
        },
        unit_amount: 30000,
        currency: "USD",
      },
      adjustable_quantity: {
        enabled: true,
      },
      quantity: 1,
    },
  ],
  mode: "payment",
});

console.log(newCheckoutSession.url);
