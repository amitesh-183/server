const register = (req, res) => {
  res.send({ msg: "successfully registered" });
};
const login = (req, res) => {
  res.send({ msg: "successfully login" });
};
const logout = (req, res) => {
  res.send({ msg: "successfully logout" });
};

module.exports = {
  register,
  login,
  logout,
};
