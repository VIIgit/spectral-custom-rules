module.exports = (targetVal, opts, paths) => {
    const { value } = opts;
    if (targetVal !== value) {
      return [
        {
          message: 'Value {{value}} not equal {' + value + '}.'
        },
      ];
    }
  };