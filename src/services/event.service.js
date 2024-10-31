import axios from "axios";
import StripeService from "./stripe.service"; // Make sure to import StripeService

const API_URL = import.meta.env.VITE_API_URL;

const createEvent = async (
  eventName,
  description,
  image,
  price,
  date,
  tickets_away,
  tickets_home,
  club_id,
  stripeAccountId
) => {
  try {
    // 1. Create the product and price in Stripe
    const stripeProductData = await StripeService.createProductInStripe(
      eventName,
      parseInt(price * 100, 10), // Convert to cents
      "brl", // Currency
      stripeAccountId
    );

    const { product_id: stripeProductId, price_id: stripePriceId } =
      stripeProductData;

    console.log("Product and price created in Stripe:", {
      stripeProductId,
      stripePriceId,
    });

    // 2. Create the event in your existing system
    const response = await axios.post(API_URL + "createEvent", {
      eventName,
      description,
      image,
      fullPrice: parseFloat(price),
      eventDate: date,
      ticketsAway: parseInt(tickets_away),
      ticketsHome: parseInt(tickets_home),
      fkClubId: parseInt(club_id, 10),
    });

    const { id: socioclubEventId } = response.data; // Ensure the API returns an 'id' field

    console.log("Event created in the system:", socioclubEventId);

    // 3. Link the Stripe product to your event
    await StripeService.vinculateProduct(
      parseInt(socioclubEventId),
      stripeProductId,
      stripePriceId,
      2
    );

    // Return the combined data
    return {
      stripeProduct: stripeProductData,
      existingEvent: response.data,
    };
  } catch (error) {
    console.error("Error creating the event and linking:", error);
    throw error;
  }
};

const getEventsByClubId = async (club_id) => {
  try {
    const response = await axios.get(`${API_URL}getEventsByClubId/${club_id}`);
    return response.data.events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const deleteEvent = async (event_id) => {
  try {
    const response = await axios.delete(`${API_URL}deleteEvent/${event_id}`);
    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error("Unexpected error deleting the event");
    }
  } catch (error) {
    console.error("Error deleting the event:", error);
    throw error;
  }
};

const EventService = {
  createEvent,
  getEventsByClubId,
  deleteEvent,
};

export default EventService;
