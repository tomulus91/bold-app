module.exports = function (app, db) {

  // Get all options application
  app.get('/data/settings', (req, res) => {
    db.collection('settings').find({}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get settings'})
      } else {
        res.send(result)
      }
    })
  })

  // Add setting
  app.post('/data/add-setting', (req, res) => {
    const newSetting = {
      keyOption: req.body.nameOption,
      valueOption: req.body.valueOption
    }
    db.collection('settings').insert(newSetting)
    res.send(newSetting)
  })

  // Get setting by keyoption
  app.get('/data/setting-by-name-option', (req, res) => {
    const keyOption = req.query.nameOption
    const arrayKeyAdmin = []
    db.collection('settings').find({}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get single users'})
      } else {
        Object.keys(result).forEach(function (key) {
          const currentkeyOption = result[key].keyOption
          if (currentkeyOption === keyOption) {
            arrayKeyAdmin.push(result[key])
          }
        })
        res.send(arrayKeyAdmin)
      }
    })
  })

  // Delete setting by value
  app.post('/data/remove-setting', (req, res) => {
    db.collection('settings').deleteOne({valueOption: req.body.params.valueOption}, (err) => {
      if (err) throw err
      res.send(true)
    })
  })

  //Update setting
  app.post('/data/update-settings', (req, res) => {
    const query = {keyOption: req.body.key}
    const newValues = {
      $set: {
        valueOption: req.body.price
      }
    }
    db.collection('settings').update(query, newValues, (error, sett) => {
      if (error) {
        console.log(error)
      }
      res.send(sett)
    })
  })

}

