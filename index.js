const express = require('express');
const echarts = require('echarts');

const app = express();
app.use(express.json());

app.post('/render', (req, res) => {
  try {
    console.log("start");
    const config = req.body;
    
    const width = config.width || 800;
    const height = config.height || 600;
    
    //  In SSR mode the first container parameter is not required
    const chart = echarts.init(null, null, { 
      renderer: 'svg', 
      width:width, 
      height:height, 
      ssr: true 
    });
    
    // use setOption as normal
    chart.setOption(config);
    
    // Output a string
    const dataURL = chart.renderToSVGString()   // Since 5.3.0
    
    res.json({ image: dataURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});