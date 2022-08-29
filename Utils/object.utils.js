module.exports = (arr) => {
  var array = [];
  arr.forEach((element) => {
    array.push({ email: element.email });
  });
  return array;
};
