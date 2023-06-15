import { Injectable } from "@nestjs/common";

@Injectable()
export class Base64Converter{
    encodeBase64(input: string): string {
        const buffer = Buffer.from(input, 'utf8');
        return buffer.toString('base64');
        }
        
    decodeBase64(input: string): string {
    const buffer = Buffer.from(input, 'base64');
    return buffer.toString('utf8');
    }
}