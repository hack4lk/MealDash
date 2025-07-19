const { exec } = require('child_process');
const pythonPath = process.env.PYTHON_PATH || 'python3';

exports.runForecastScripts = (days) => {
  const cmd = `${pythonPath} python/train_forecast_per_meal.py ${days} && ${pythonPath} python/vectorize_forecast_meals.py`;

  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr);
      }
      resolve(stdout);
    });
  });
};

exports.askLLM = (queryText, date, item_lines) => {

  const query = `Based on the historical daily order patterns shown above,
        what is the estimated number of meals ordered for the following items on ${date}?

        Items:
        ${item_lines.split(',').map(item => item.trim()).join('\n        ')}

        Please return the prediction in a structured format like this:

        Date Butter Chicken: X orders  
        Date Garlic Naan: Y orders  
        Date Chicken Biryani: Z orders

        If there is not enough information for a certain item, please state 0. ${queryText ? '' : queryText}`;
  const safeQuery = query.replace(/"/g, '\"');
  const cmd = `${pythonPath} python/ask_llm.py "${safeQuery}" "${item_lines}"`;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      console.log(stdout);
      if (err) {
        return reject(stderr);
      }
      resolve(stdout.trim());
    });
  });
};
