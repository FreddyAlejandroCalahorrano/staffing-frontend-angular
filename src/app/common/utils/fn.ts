const getMessageError = (data: string | any) => {
  return typeof data === 'string' ? data : "Error del servidor"
}

const pad = (num: number, replace?: string): string => {
  return num.toString().padStart(2, replace || "0")
}

const getToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
}

export {
  getMessageError,
  pad,
  getToday
}
