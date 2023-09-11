export function dateFormatter() {
    const dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "America/Sao_paulo",
      };    

    const CompleteDate = new Date
    const completeDateFormat = new Intl.DateTimeFormat('PT-BR',dateOptions).format(CompleteDate)

    return completeDateFormat
}