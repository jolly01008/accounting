
const accountingController = {
  addRecord: (req, res, next) => {
    try {
      console.log('addRecord!')
      res.json({ status: 'success' })
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = accountingController
