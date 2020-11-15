module.exports = function forceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(
      `https://${req.get('Host')}${req.url}`
    )
  }

  next()
}