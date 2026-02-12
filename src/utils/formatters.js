export function formatEpisodeCode(code) {
  const match = code.match(/S(\d+)E(\d+)/);
  if (match) {
    return `Temporada ${parseInt(match[1])}, Episodio ${parseInt(match[2])}`;
  }
  return code;
}

export function formatAirDate(date) {
  if (!date) return "Fecha desconocida";
  
  const months = {
    January: "Enero", 
    February: "Febrero", 
    March: "Marzo",
    April: "Abril", 
    May: "Mayo", 
    June: "Junio",
    July: "Julio", 
    August: "Agosto", 
    September: "Septiembre",
    October: "Octubre", 
    November: "Noviembre", 
    December: "Diciembre"
  };
  
  const parts = date.split(" ");
  if (parts.length === 3) {
    const month = months[parts[0]] || parts[0];
    return `${parts[1]} de ${month} de ${parts[2]}`;
  }
  
  return date;
}

export function extractCharacterIds(characterUrls) {
  return characterUrls.map((url) => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 1]);
  });
}
