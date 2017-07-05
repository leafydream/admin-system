
let DICT = {
  1: '4',

  2: '3',

  3: '2',

  4: '1',


}

// id pid/parentId name children
const tree = (list) => {
  let mapped = {}
  let item
  for (let i = 0; i < list.length; i++) {
    item = list[i]
    if (!item || !item.id) continue
    mapped[item.id] = item
  }

  let result = []
  for (let ii = 0; ii < list.length; ii++) {
    item = list[ii]

    if (!item) continue
            /* jshint -W041 */
    if (item.pid === undefined && item.parentId === undefined) {
      result.push(item)
      continue
    }
    let parent = mapped[item.pid] || mapped[item.parentId]
    if (!parent) continue
    if (!parent.children) parent.children = []
    parent.children.push(item)
  }
  return result
}

let DICT_FIXED = (function () {
  let fixed = []
  for (let id in DICT) {
    if ({}.hasOwnProperty.call(DICT, id)) {
    //   let pid
    //   if (id.slice(2, 6) !== '0000') {
    //     pid = id.slice(4, 6) === '00' ? (`${id.slice(0, 2)}0000`) :
    //     `${id.slice(0, 4)}00`
    //   }
      fixed.push({
        id,
        
        name: DICT[id],
        value: DICT[id],
        label: DICT[id],
      })
    }
  }
  return tree(fixed)
}())

module.exports = DICT_FIXED
