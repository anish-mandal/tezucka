import 'server-only'
export function success(message: string, body: object) {
  return { type: "success", message: message, body: body }
}

export function error(message: string) {
  return { type: "error", message: message }
}
