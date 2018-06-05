module.exports = function (app, db) {
// Get all options application
  app.get('/settings', (req, res) => {
    SettingsApplication.find({}, function (error, users) {
      if (error) {
        console.error(error)
      }
      res.send({
        settingsApplication: users
      })
    }).sort({_id: -1})
  })

// Add new settings
  app.post('/add_settings', (req, res) => {
    let newOption = new SettingsApplication({
      nameOptions: req.body.nameOptions,
      valueOptions: req.body.valueOptions
    })

    newOption.save(function (error, option) {
      if (error) {
        console.log(error)
      } else {
        res.send(option)
      }
    })
  })

// Single User by login
  app.get('/setting_by_name_option/:option', (req, res) => {
    SettingsApplication.find({
      nameOptions: req.params.option
    }, 'valueOptions', function (error, result) {
      error ? res.send(error) : res.send(result)
    })
  })

// Delete setting by param
  app.delete('/remove_settings/:option', (req, res) => {
    SettingsApplication.remove({
      'valueOptions': req.params.option
    }, function (err) {
      if (err) {
        res.send(err)
      } else {
        res.send({
          success: true
        })
      }
    })
  })
}
