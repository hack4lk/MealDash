const forecastService = require('../services/forecastService');

exports.generateForecast = async (req, res) => {
  const days = req.query.days || 7;

  try {
    await forecastService.runForecastScripts(days);
    res.json({ message: 'Forecast and vector index generated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error });
  }
};

exports.askForecast = async (req, res) => {
  const { date, item_lines, query } = req.body;
  if (!date || !item_lines) {
    return res.status(400).json({ error: "Missing 'date' or 'item_lines' in body" });
  }

  try {
    const answer = await forecastService.askLLM(query, date, item_lines);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error });
  }
};
