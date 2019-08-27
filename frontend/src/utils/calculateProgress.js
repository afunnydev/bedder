const calculateProgress = (fields = []) => {
  let progress = 0;
  if (fields.length) {
    const progressStep = 100/fields.length;
    fields.map(field => {if (field != null && field !== '' && field !== 0 && field !== false) { progress += progressStep; }});
  }
  return Math.round(progress);
};

export default calculateProgress;