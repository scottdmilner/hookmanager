import { Request } from 'express';
import crypto, { sign } from 'crypto';

export function verifyMessage(req: Request, secretToken: string): boolean {
    const shas1Hash = 'sha1=' + crypto.createHash('sha1')
        .update(secretToken)
        .update(JSON.stringify(req.body))
        .digest('hex');
    
    const signature = req.headers['x-sg-signature'];

    return shas1Hash == signature;
}
