function buildFilters(input) {
  const paramArray = []

  if (input) {
    Object.keys(input).forEach(key => {
      paramArray.push(`${key}=${input[key]}`)
    })
  }

  return paramArray.length > 0 ? `?${paramArray.join('&')}` : ''
}

module.exports = buildFilters
