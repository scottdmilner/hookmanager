import { Request } from 'express';
import crypto from 'crypto';

export function verifyMessage(req: Request, signature_id: string, secretToken: string): boolean {
    const sha1Hash = 'sha1=' +
        crypto.createHmac('sha1', secretToken)
        .update(JSON.stringify(req.body))
        .digest('hex');
    
    const signature = req.headers[signature_id] as string;

    return sha1Hash == signature;
}
