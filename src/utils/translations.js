export function translateStatus(status) {
  const translations = {
    alive: "Vivo",
    dead: "Muerto",
    unknown: "Desconocido",
  };
  return translations[status?.toLowerCase()] || status;
}

export function translateGender(gender) {
  const translations = {
    male: "Masculino",
    female: "Femenino",
    genderless: "Sin género",
    unknown: "Desconocido",
  };
  return translations[gender?.toLowerCase()] || gender;
}
