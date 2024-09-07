import { Injectable } from '@angular/core';
import JsSHA from "jssha";

export const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export class TotpService {

  constructor() {}

  /**
   * Generates a HMAC-SHA1-based One-Time Password (OTP) using the specified parameters.
   * 
   * @param sharedSecret The secret key used for generating the OTP.
   * @param movingFactor The moving factor to use for generating the OTP.
   * @param digits The number of digits in the OTP. Default is 6.
   * @returns The generated OTP.
   */
  public genOtpHmacSha1(sharedSecret: string, movingFactor: number, digits: number = 6) {
    const hmacSha = new JsSHA('SHA-1', 'BYTES');
    hmacSha.setHMACKey(this.b32toHex(sharedSecret), 'HEX');

    const factorByte = this.number2byteString(movingFactor);
    hmacSha.update(factorByte);

    const hmac_result = hmacSha.getHMAC('BYTES');
    return this.truncate(hmac_result, digits);
  }

  /**
   * Generates a Time-based One-Time Password (TOTP) using the specified parameters.
   * 
   * @param key The secret key used for generating the OTP.
   * @param timeStep The time step in seconds. Default is 30 seconds.
   * @param digits The number of digits in the OTP. Default is 6.
   * @returns The generated TOTP.
   */
  public genTotp(key: string = '', timeStep: number = 30, digits:number = 6) {
    const time = Math.floor((Date.now() / 1000) / timeStep);
    return this.genOtpHmacSha1(key, time, digits);
  }

  /**
   * Truncates the HMAC result to the specified number of digits.
   * 
   * @param hmac_result - The HMAC result to truncate.
   * @param digits - The number of digits to truncate to. Default is 6.
   * @returns The truncated OTP (One-Time Password).
   */
  private truncate(hmac_result: String, digits = 6) {
    const offset   =  hmac_result.charCodeAt(19) & 0xf;
    const bin_code = (hmac_result.charCodeAt(offset)  & 0x7f) << 24
       | (hmac_result.charCodeAt(offset+1) & 0xff) << 16
       | (hmac_result.charCodeAt(offset+2) & 0xff) <<  8
       | (hmac_result.charCodeAt(offset+3) & 0xff);
    let otp = (bin_code % 10 ** digits).toString();
    while (otp.length < digits) {
      otp = '0' + otp;
    }
    return otp;
  }

  
  /**
   * Converts a number into a byte by byte string representation.
   *
   * @param param - The number to convert.
   * @returns The bybyte by byte string representation of the number.
   */
  private number2byteString(param: number) {
    const text = new Array(8);
    for (let i = text.length - 1; i >= 0; i--) {
      text[i] = String.fromCharCode(param & 0xFF);
      param >>= 8;
    }
    return text.join('');
  }

  /**
   * Converts a Base32 string to a hexadecimal string.
   *
   * @param base32string - The Base32 string to convert.
   * @returns The hexadecimal string representation of the Base32 string.
   * @throws Error if the Base32 string contains invalid characters.
   */
  public b32toHex(base32string: string) {
    let bits = "";
    let hex = "";

    base32string = base32string.replace(/=+$/, "");

    for (let i = 0; i < base32string.length; i++) {
      const val = base32chars.indexOf(base32string.charAt(i).toUpperCase());
      if (val === -1) throw new Error("Invalid Base32 character at position " + i);
      bits += this.lpad(val.toString(2), 5, "0");
    }

    for (let i = 0; i + 8 <= bits.length; i += 8) {
      const chunk = bits.substr(i, 8);
      hex = hex + this.lpad(parseInt(chunk, 2).toString(16), 2, "0");
    }

    return hex;
  }

  /**
   * Left pads a string with a specified character to a specified length.
   * 
   * @param str - The string to be padded.
   * @param len - The desired length of the padded string.
   * @param pad - The character used for padding. Default is "0".
   * @returns The padded string.
   */
  private lpad(str: string, len: number, pad = "0") {
    if (len + 1 >= str.length) {
      str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
  }

}
