import sharp from 'sharp';
import { CreateSize } from '../model/interface';

export async function resizeImg(buff: Buffer, size: CreateSize) {
  const _ins = await sharp(buff, { failOnError: false })
      .resize({ width: size.width, height: size.height })
      .toBuffer(),
    _w = sharp(_ins, { failOnError: false }).jpeg(),
    _webb64 = (await _w.toBuffer()).toString('base64');
  return _webb64;
}
