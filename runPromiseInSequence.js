function runPromiseInSequence (promises, input) {
  return promises.reduce((previous, current) => {
    return previous.then(current)
  }, Promise.resolve(input))
}