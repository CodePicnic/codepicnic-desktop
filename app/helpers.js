function classFromPlatform() {
  var themePath;

  switch(global.process.platform) {
    case 'darwin':
      themePath = 'macosx';
    break;
    case 'win32':
      themePath = 'windows10';
    break;
    default:
      themePath = 'elementaryos';
    break;
  }

  return themePath;
}

module.exports = {
  classFromPlatform: classFromPlatform
};