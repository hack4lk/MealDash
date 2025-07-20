const { exec } = require('child_process');

const pythonPath = process.env.PYTHON_PATH || 'python3';

const extractJsonFromString = (text)  => {
  try {
    const jsonString = text.match(/{.*}/s)[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error extracting JSON from string:', error);
    return {};
  }
};

exports.runForecastScripts = (days) => {
  const cmd = `${pythonPath} python/train_forecast_per_meal.py ${days} && ${pythonPath} python/vectorize_forecast_meals.py`;

  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      console.log('Running forecast scripts...');
      console.log('Command:', cmd);
      console.log('Output:', stdout);
      if (error) {
        return reject(stderr);
      }
      resolve(stdout);
    });
  });
};

exports.askLLM = (queryText, date, item_lines) => {

  const query = `Based on the historical daily order patterns shown above,
        what is the estimated number of meals ordered for the following items list at the specified ${date}?

        Items List:
        ${item_lines.split(',').map(item => item.trim()).join('\n        ')}

        Please return the prediction in a structured format like this:

        Date | Item | X orders  
        Date | Item 2 | Y orders  
        Date | Item 3 | Z orders

        Also return the level on of confidence of the prediction as a percentage number, and all the response as a json object  ${queryText ? '' : queryText}`;
  const safeQuery = query.replace(/"/g, '\"');
  console.log('Asking LLM with query:', safeQuery);
  const cmd = `${pythonPath} python/ask_llm.py "${safeQuery}" "${item_lines}" "${date}"`;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return reject(stderr);
      }
      console.log('LLM Response:', stdout);
      const responseText = stdout.trim();
      const resJson = extractJsonFromString(responseText);
      resolve(resJson);
    });
  });
};
