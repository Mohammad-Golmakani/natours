/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
const stripe = Stripe(
  "pk_test_51QDky7EwmHfnxNbdUO0LXjFu3iQFYJQwqu6eTLmbkMFPbD04kBfJIjuU8bE1h19IJDqt46jtZi1HF2v4XzH6zv2500VnwfPnsH"
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
