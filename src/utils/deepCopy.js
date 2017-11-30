import typeOf from './getType';

function deepCopy(data) {
  const type = typeOf(data);
  let result;

  if (type === 'array') {
    result = [];
  } else if (type === 'object') {
    result = {};
  } else {
    return data;
  }

  if (type === 'array') {
    for (let i = 0; i < data.length; i++) {
      result.push(deepCopy(data[i]));
    }
  } else if (type === 'object') {
    Object
      .keys(data)
      .forEach((key) => {
        result[key] = deepCopy(data[key]);
      });
  }
  return result;
}

export default deepCopy;
