export const checkFileType = filename => {
  let extensionLists = {}; //Create an object for all extension lists
  extensionLists.video = ['m4v', 'avi', 'mpg', 'mp4', 'webm'];
  extensionLists.image = ['jpg', 'gif', 'bmp', 'png'];

  if (extensionLists.video.includes(filename.split('.').pop())) {
    return true;
  } else {
    return false;
  }
};
