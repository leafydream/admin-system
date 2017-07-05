let DICT = {
  0: '还未选择城市',
  1: '还未生成专属精灵',
  2: '完成注册',
};

// id pid/parentId name children
const tree = (list) => {
  let mapped = {}
  let item
  for (let i = 0; i < list.length; i++) {
    item = list[i]
    if (!item || !item.id) continue
    mapped[item.id] = item
    // console.log('item', item);
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
  return result;
}

let DICT_FIXED = (function () {
  let fixed = []
  for (let id in DICT) {
    if ({}.hasOwnProperty.call(DICT, id)) {
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

module.exports = DICT_FIXED;
