cache = {}

cachedCall = (rv, call, args...) ->
  argsS = EJSON.stringify {call: call, args:args}, canonical: true

  retv = cache[argsS]
  if retv isnt undefined
    rv.set retv
    return
  rv.get()
  Meteor.apply call, args, (err, result)->
    if err
      console.log err
      throw err
    rv.set result
    cache[argsS] = result

invalidateCache = (call, args...) ->
  argsS = EJSON.stringify {call: call, args:args}, canonical: true
  delete cache[argsS]

