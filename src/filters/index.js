
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function number (val = 0) {
  if (!val) return ''
  let digits = val.toString().split('')
  let groups = []
  if (digits.length >= 3) {
    groups.unshift(digits.splice(-3, digits.length).join(''))
  }
  while (digits.length > 3) {
    groups.unshift(digits.splice(-3, digits.length).join(''))
  }
  if (digits.length) {
    groups.unshift(digits.join(''))
  }
  return groups.join(',')
}
