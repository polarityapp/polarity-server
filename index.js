const express = require('express');
const app = express();
const cors = require('cors');
const wls = require('@whaleshares/wlsjs');
const db = require('node-json-db');
const Database = new db('polarity', true, false);

try {
  const testData = Database.getData("/submits");
} catch(error) {
  Database.push('/submits', {});
};

app.use(cors());

app.get('/:platform/:author/:permlink', function(req, res) {
  try {
    const data = Database.getData(`/submits/${req.params.platform}/${req.params.author}/${req.params.permlink}`);
    switch(data) {
      case 'submitted':
        res.json({status: 'submitted'});
        break;
      case 'verified':
        res.json({status: 'verified'});
        break;
    }
  } catch (err) {
    res.json({status: 'good'});
  }
});

app.post('/:platform/:author/:permlink', function(req, res) {
  try {
    const data = Database.getData(`/submits/${req.params.platform}/${req.params.author}/${req.params.permlink}`);
    res.json({status: 'done'});
  } catch (err) {
    Database.push(`/submits/${req.params.platform}/${req.params.author}/${req.params.permlink}`, 'submitted');
    res.json({status: 'done'});
  }
});

app.listen(80);