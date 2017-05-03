export default {
  number (val = 0) {
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
  },

  getBarChart (chartid, colorPattern) {
    var c = { chart_id: chartid,
      data: {
        labels: {format: function (v, id, i, j) { return (v) }},
        x: 'x',
        columns: [ ],
        unload: true,
        type: 'bar'},
      options: {
        point: { show: true },
        grid: { x: { show: false }, y: { show: false } },
        axis: { x: { type: 'category', tick: {rotate: 20, multiline: false} }, rotated: false },
        color: {pattern: ['#94ae0a', '#a61120', '#ff8809', '#ffd13e', '#a61187', '#24ad9a']}
      }
    }
    if (colorPattern) {
      c.options.color.pattern = colorPattern
    }
    return c
  }
}
