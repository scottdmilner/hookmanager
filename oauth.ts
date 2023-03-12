export class AuthenticationError extends Error {
    constructor(res: Response) {
        super(
            `Error! Authentication failed with status: ${res.status} (${res.statusText})`
            + (res.bodyUsed ? `\n\t"${JSON.stringify(res)}"` : ``)
        );
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}


export type AuthToken = {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
}


export default class ShotGridAuthenticator {

    private static API = '/api/v1';
    private static ACCESS_ENDPOINT = ShotGridAuthenticator.API + '/auth/access_token'
    
    private baseUrl: string;
    private scriptName: string;
    private scriptId: string;

    private token: AuthToken;
    private expiration: Date;

    constructor(baseUrl: string, scriptName: string, scriptId: string) {
        this.baseUrl = baseUrl;
        this.scriptName = scriptName;
        this.scriptId = scriptId;
        this.token = {} as AuthToken;
        this.expiration = new Date(Date.now());
    }

    async getToken(): Promise<AuthToken> {
        if (!this.isExpired()) {
            return this.token;
        }
        try {
            return await this.fetchToken(true);
        } 
        catch (err) {
            return await this.fetchToken();
        }
    }

    isExpired(): boolean {
        return this.expiration.getTime() <= Date.now();
    }

    async fetchToken(refresh: boolean = false): Promise<AuthToken> {
        return fetch(this.baseUrl + ShotGridAuthenticator.ACCESS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: refresh ? 
                    `refresh_token=${this.token.refresh_token}&grant_type=refresh_token`
                  : `client_id=${this.scriptName}&client_secret=${this.scriptId}&grant_type=client_credentials`,
        })
        .then((res: Response) => {
            if (!res.ok)
                throw new AuthenticationError(res);
            else 
                return res.json();
        })
        .then((data) => {
            this.token = data as AuthToken;
            this.expiration = new Date(Date.now() + (this.token.expires_in - 30) * 1000); 

            return this.token;
        });
    }
}