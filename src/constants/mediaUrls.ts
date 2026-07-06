import { mediaUrl } from '../utils/mediaUrl';

export { DEFAULT_OG_IMAGE, MEDIA_PRECONNECT_ORIGIN, mediaUrl } from '../utils/mediaUrl';

export const VIDEO_URLS = {
  prayas: mediaUrl('Prayas.mp4'),
  falahzar: mediaUrl('falahzar.mp4'),
  forestHearbs: mediaUrl('forestHearbs.mp4'),
  influx: mediaUrl('influx1.mp4'),
} as const;

export const IMAGE_URLS = {
  liquid: mediaUrl('liquid.jpg'),
  ecommerce: mediaUrl('ecommerce1.png'),
  patchManagement: mediaUrl('patchmanagement.jpg'),
  website: mediaUrl('website.png'),
  adaptive: mediaUrl('adaptive.png'),
  vaptBg: mediaUrl('vaptBG.png'),
  operationCenter: mediaUrl('opratiobcenter.jpg'),
  securityOperations: mediaUrl('securitytesting.jpg'),
  responseForensics: mediaUrl('ResponseAndForensics.jpg'),
  detectionResponse: mediaUrl('detectionandresponse.jpg'),
  securityTesting: mediaUrl('securitytesting.jpg'),
  wave: mediaUrl('wave.jpg'),
  laptopScreen: mediaUrl('laptopScreen.png'),
  developerActivity: mediaUrl('Developer activity.png'),
  techGiantPng: mediaUrl('TGpng.png'),
  logo: mediaUrl('logo.svg'),
  icons: {
    innovation: mediaUrl('innovation.svg'),
    quality: mediaUrl('quality.svg'),
    centric: mediaUrl('centric.svg'),
    reliability: mediaUrl('reliability.svg'),
  },
  partners: {
    keyCube: mediaUrl('Keycube.png'),
    axis: mediaUrl('axis.svg'),
    falahzar: mediaUrl('falahzar.png'),
    forest: mediaUrl('forest.webp'),
    iStaff: mediaUrl('iStaff.png'),
    imflux: mediaUrl('imflux.png'),
    prayas: mediaUrl('prayas.png'),
  },
} as const;
