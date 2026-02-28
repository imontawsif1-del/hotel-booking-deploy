import hotels from "../data/hotels.json";

export type Hotel = {
  id: number;
  name: string;
  city: string;
  pricePerNight: number;
};

export function getHotels(): Hotel[] {
  return hotels;
}

export function getHotel(id: number): Hotel | undefined {
  return hotels.find(h => h.id === id);
}
