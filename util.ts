import { Request } from 'express';
import crypto, { sign } from 'crypto';

export function verifyMessage(req: Request, secretToken: string): boolean {
    const sha1Hash = 'sha1=' 
      + crypto.createHmac('sha1', secretToken)
        .update(JSON.stringify(req.body))
        .digest('hex');
    
    const signature = req.headers['x-sg-signature'] as string;

    // debug
    console.log(sha1Hash);
    console.log(signature);

    return sha1Hash == signature;
}
