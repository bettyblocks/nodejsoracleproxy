module.exports = {
  hrPool: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.CONNECTSTRING, // For example: "192.168.2.114/ORCL.LOCAL" find service-name with: select * from global_name;
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
