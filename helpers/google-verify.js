import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

export async function verify(token_id) {
    const ticket = await client.verifyIdToken({
        idToken: token_id,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
        user: payload.name,
        email: payload.email,
        image: payload.picture
    }
}
