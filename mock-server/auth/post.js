module.exports = (req, res) => {
  if (req.body.userid === "invalid_user") {
    return res.send("Not OK");
  }
  if (req.body.userid === "timeout_user") {
    return res.status(408).send("Not OK");
  }
  return res.send("OK");
};
