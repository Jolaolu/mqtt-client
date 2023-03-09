export const isEmptyValue = (value: any): boolean => {
  return value === '' || value === null || value === undefined || Object.keys(value).length < 1
}
