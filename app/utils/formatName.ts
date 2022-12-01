export function formatName(name: string) {
  const nameArr = name.split(" ")
  if (nameArr.length > 1) return nameArr[0] + " " + nameArr[1][0] + "."

  return nameArr[0]
}
