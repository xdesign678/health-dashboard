const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static(__dirname));

// API 端点：获取今日数据
app.get('/api/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const dataPath = path.join(__dirname, '../daily', `${today}.json`);
  
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  } else {
    res.json({
      date: today,
      meals: [],
      exercises: [],
      summary: { totalIntake: 0, totalBurn: 0, deficit: 0 }
    });
  }
});

app.listen(PORT, () => {
  console.log(`健康管理看板运行在 http://localhost:${PORT}`);
});
