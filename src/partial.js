var compactDiff = require("compact-diff")

var isChanged = function(diff){
  return (diff.added || diff.removed)
}


var diffEdge = function(diffs){
  var stop = false
  return diffs.reduce(function(result, diff){
    if(isChanged(diff) || stop){
      stop = true
      return result
    }
    result.push(diff)
    return result
  }, []).map(function(diff){
    return diff.value
  })
}

var partialize_ = function(array){
  var head = array[0]
  var edges
  var breakpoint = -1
  // detect breakpoint
  array.forEach(function(value, i){
    var next = array[i + 1]
    if(!next){ return }
    if(head === value){ return }
    if(breakpoint > -1){ return }
    var diffs = compactDiff(value, head)
    var leftEdge = diffEdge(diffs).join("")
    var rightEdge = diffEdge(diffs.concat().reverse()).reverse().join("")
    if(edges === undefined){
      edges = {
        left : leftEdge,
        right : rightEdge
      }
      return
    }
    if(edges.left !== leftEdge && rightEdge === ""){
      breakpoint = i
      return
    }
    if(edges.right !== rightEdge && leftEdge === ""){
      breakpoint = i
      return
    }
  })
  console.log(array, breakpoint)
  if(breakpoint === -1){
    return {
      current : array
    }
  }
  // split array
  var rest = array.concat()
  var hitted = rest.splice(0, breakpoint - 1)
  var current = hitted.map(function(value){
    var reg = new RegExp("^" + edges.left + "(.+)" + edges.right + "$")
    return value.replace(reg, "$1")
  })
  return {
    current : current,
    left : edges.left,
    right : edges.right,
    next : rest
  }
}

var partialize = function(array){
  var head = array[0]
  var left, right
  var breakpoint = -1
  // detect breakpoint
  array.forEach(function(value, i){
    var next = array[i + 1]
    if(!next || head === value || breakpoint > -1){
      return
    }
    var diffs = compactDiff(value, head)
    var _left = diffEdge(diffs).join("")
    var _right = diffEdge(diffs.concat().reverse()).reverse().join("")
    if(left === undefined && right === undefined){
      left = _left
      right = _right
    }
  })
}


var partial = function(array, result){
  result = result || []
  var part = partialize(array)
  // console.log(array)
  if(!part.next){
    result.push(part.current)
    return result
  }
  var nextResult = partial(part.next)
  var heads = nextResult.map(function(n){
    return n[0]
  })
  var leftIndex = heads.indexOf(part.left)
  var rightIndex = heads.indexOf(part.right)
  if(leftIndex > -1){
    nextResult.splice(leftIndex + 1, 0, part.current)
  }else if(rightIndex > -1){
    nextResult.splice(rightIndex, 0, part.current)
  }
  return nextResult
}
module.exports = function(array){
  var result = partial(array, [])
  console.log(result)
  return result
}
