function handleValidation(props) {
  const result = [];
  props.map((o) => {
    result.push({ message: o.msg, param: o.param });
  });

  console.log(result);
}

module.exports = handleValidation;
