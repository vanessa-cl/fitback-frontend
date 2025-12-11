export const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  // 11 digits → mobile format: (XX) XXXXX-XXXX
  if (digits.length > 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  // 10 digits → landline format: (XX) XXXX-XXXX
  if (digits.length > 6) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  // 3–6 digits → incrementally format (XX) XXXX...
  if (digits.length > 2) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2");
  }

  // 1–2 digits → start building DDD
  return digits.replace(/(\d{0,2})/, "($1");
};
