import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
  requestResetToken,
} from '../services/auth.js';

import { resetPassword } from '../services/auth.js';

import createHttpError from 'http-errors';

import jvt from 'jsonwebtoken';

import { getEnvVar } from '../utils/getEnvVar.js';

import UserCollection from '../db/Model/User.js';

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent',
    status: 200,
    data: {},
  });
};

export const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  let payload;
  try {
    payload = jvt.verify(token, getEnvVar('JWT_SECRET'));
  } catch {
    throw createHttpError(401, 'Invalid or expired token');
  }

  const user = await UserCollection.findOne({
    _id: payload.sub,
    email: payload.email,
  });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.verify) {
    throw createHttpError(400, 'Email already verified');
  }

  user.verify = true;
  await user.save();

  res.json({
    status: 200,
    message: 'Email successfully verified',
    data: {},
  });
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
