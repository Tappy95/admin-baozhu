export const deepCopy = function(obj) {
  let result

  function helper (obj1, node) {
    for (let k in obj1) {
      let value = obj1[k]
      let valueType = Object.prototype.toString.call(value)
      if (valueType == '[object Object]') {
        node[k] = {}
        helper(value, node[k])
      } else if (valueType == '[object Array]') {
        node[k] = []
        helper(value, node[k])
      } else {
        node[k] = obj1[k]
      }
    }
  }

  let valueType = Object.prototype.toString.call(obj)
  if (valueType == '[object Object]') {
    result = {}
    helper(obj, result)
  } else if (valueType == '[object Array]') {
    result = []
    helper(obj, result)
  } else {
    result = obj
  }

  return result
}
