module.exports = (req, res) => {
  console.log(req.body);
  return res.send("Not OK");
};
