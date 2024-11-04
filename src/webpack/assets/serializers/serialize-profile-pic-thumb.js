/**
 * Function to serialize the profile pic thumb
 * @param {*} obj
 * @returns
 */
export const serializeProfilePicThumb = (obj) => {
  if (obj == undefined) {
    return null;
  }

  return Object.assign(
    {},
    {
      eurl: obj.eurl,
      id: obj.id,
      img: obj.img,
      imgFull: obj.imgFull,
      raw: obj.raw,
      tag: obj.tag,
    }
  );
};
