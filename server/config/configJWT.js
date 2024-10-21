import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export function generateSecretKey() {
    const key = crypto.randomBytes(256).toString('hex');
    return key;
}

export function generateJWT(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '300s' })
}

export function getToken() {
    const payload = {};
    const token = generateJWT(payload);
    return res.status(200).json(token);
}
