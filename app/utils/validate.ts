export function validateEmail(email: string) {
  if (email.length === 0) return "Email Address Required"
  // if (email.length < 6) return "Must be at least 6 characters"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Must be a valid email address"
  return ""
}
export function validatePassword(password: string) {
  if (password.length === 0) return "Password Required"
  if (password.length < 6) return "Must be at least 6 characters"
  return ""
}

export function validateConfirmPassword(password: string, consfirmPassword: string) {
  if (password === consfirmPassword) return ""
  else {
    return "The passwords do not match"
  }
}

export function validateName(name: string) {
  if (name.split(" ").length < 2 || name.split(" ")[1] === "")
    return "First and Last Name Required"
  if (name[name.length] === " " || name[0] === " ") return "Name cannot contain extra spaces"
  if (name.length === 0) return "Name cannot contain extra spaces"
  return ""
}
