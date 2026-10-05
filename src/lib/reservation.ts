import { testContact, validateContact, type ContactValues } from "./contact-validation";
export const RESERVATION_DEPOSIT = 500;
export type ReservationValues = ContactValues & {
  entity: "person" | "company";
  company: string;
  cui: string;
  address: string;
  city: string;
  branch: string;
};
export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;
export const initialReservation = (branch: string): ReservationValues => ({
  ...testContact,
  entity: "person",
  company: "Companie Demo SRL",
  cui: "RO12345678",
  address: "Strada Exemplu nr. 10",
  city: "București",
  branch,
});
export function validateReservation(value: ReservationValues): ReservationErrors {
  const errors: ReservationErrors = validateContact(value);
  if (value.entity === "company") {
    if (!value.company.trim()) errors.company = "Completează denumirea firmei.";
    if (!/^(RO)?\d{2,10}$/i.test(value.cui.replace(/\s/g, "")))
      errors.cui = "Introdu CUI-ul, cu 2–10 cifre și prefixul RO, dacă există.";
  }
  if (!value.address.trim()) errors.address = "Completează adresa de facturare.";
  if (!value.city.trim()) errors.city = "Completează localitatea.";
  return errors;
}
