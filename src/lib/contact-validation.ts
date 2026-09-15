export type ContactValues = { lastName: string; firstName: string; email: string; phone: string };
export const emptyContact: ContactValues = { lastName: "", firstName: "", email: "", phone: "" };
export const testContact: ContactValues = {
  lastName: "Popescu",
  firstName: "Andrei",
  email: "andrei.popescu@example.com",
  phone: "0700000000",
};
export function validateContact(v: ContactValues) {
  const e: Partial<Record<keyof ContactValues, string>> = {};
  if (!v.lastName.trim()) e.lastName = "Completează numele.";
  if (!v.firstName.trim()) e.firstName = "Completează prenumele.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Introdu o adresă de email validă.";
  if (
    !/^[+\d\s().-]+$/.test(v.phone) ||
    v.phone.replace(/\D/g, "").length < 7 ||
    v.phone.replace(/\D/g, "").length > 15
  )
    e.phone = "Introdu un număr de telefon valid.";
  return e;
}
