module.exports = {
  customif : (options) => {
    return (options.hash.expected === options.hash.val)? options.fn(this)  : options.inverse(this);
  }
}
