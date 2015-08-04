cached-call
===========
A cached call implementation.

Purpose
-------
I'm trying to find a way to display the result of a call method in a React component. I've tried with promises without success, maybe because I have used them incorrectly.
This way is an experiment and I would like to have feedback from other programmers.

Example
-------
```coffee
Session.set 'arg1', 1
Session.set 'arg2', 2

@Main = React.createClass
    mixins : [ReactMeteorData]
    rv: new ReactiveVar()
    rv2: new ReactiveVar()
    rvm: new ReactiveVar()
    getMeteorData: ->
        data = {}
        data.rv2 = @rv2
        arg1 = Session.get 'arg1'
        arg2 = Session.get 'arg2'
        cachedCall(@rv, 'add', arg1, arg2)
        cachedCall(@rvm, 'mult3', @rv.get())
        cachedCall(@rv2, 'prefix', @rvm.get())
        data
    render: ->
        <div>
            {@data.rv2.get()}
        </div>
```

server side:
```coffee
Meteor.methods
  add: (a, b) -> a+b

  mult3: (x) -> x*3

  prefix: (x) -> 'prefix: ' + x
```

Implementation
--------------
```coffee
cache = {}

@cachedCall = (rv, call, args...) ->
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

@invalidateCache = (call, args...) ->
  argsS = EJSON.stringify {call: call, args:args}, canonical: true
  delete cache[argsS]
```

