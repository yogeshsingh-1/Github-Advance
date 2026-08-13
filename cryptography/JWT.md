# JWT mai verify method hai woh Jwt | JwtPayload | string return karta hai.

export interface JwtPayload {
    [key: string]: any;
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
}
export interface Jwt {
    header: JwtHeader;
    payload: JwtPayload | string;
    signature: string;
}

# JWT mai sign method hai string return karta hai.

# JWT method mai verify ki return value iat and exp time seconds mai aata. miliseconds mai nhi aata hai.