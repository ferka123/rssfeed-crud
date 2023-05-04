export default {
  accessExp: Number(process.env.ACCESS_TOKEN_EXP) || 600000,
  refreshExp: Number(process.env.REFRESH_TOKEN_EXP) || 604800000,
  jwtSecret: process.env.JWT_SECRET as string
};
