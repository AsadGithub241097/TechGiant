const CLOUDINARY_HOST = 'https://res.cloudinary.com';

/**
 * Maps the logical asset filename (as referenced throughout the app) to its
 * full Cloudinary URL. Assets were migrated off S3 to Cloudinary, so the URLs
 * carry Cloudinary's random public-id suffix and cannot be reconstructed from
 * the filename alone — hence the explicit lookup table.
 */
const CLOUDINARY_MEDIA: Record<string, string> = {
  // Videos
  'Prayas.mp4': `${CLOUDINARY_HOST}/dhaiqgxn8/video/upload/v1780470602/Prayas_plcgzm.mov`,
  'falahzar.mp4': `${CLOUDINARY_HOST}/dhaiqgxn8/video/upload/v1780470559/falahzar_hgy9yn.mp4`,
  'forestHearbs.mp4': `${CLOUDINARY_HOST}/dhaiqgxn8/video/upload/v1780470615/forestHearbs_faggvr.mov`,
  'influx1.mp4': `${CLOUDINARY_HOST}/dhaiqgxn8/video/upload/v1780470613/influx1_rkd51n.mp4`,

  // Images
  'liquid.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470567/liquid_zh5orb.jpg`,
  'ecommerce1.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470559/ecommerce1_ifh71x.png`,
  'patchmanagement.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470566/patchmanagement_mjxc8j.jpg`,
  'website.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470574/website_ltexlk.png`,
  'adaptive.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470555/adaptive_fjgkmu.webp`,
  'vaptBG.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470571/vaptBG_sl5a8h.png`,
  'opratiobcenter.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470564/opratiobcenter_ttpuom.jpg`,
  'securitytesting.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470568/securitytesting_hliql2.jpg`,
  'SecurityOperations.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470569/SecurityOperations_zgmr7y.jpg`,
  'ResponseAndForensics.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470567/ResponseAndForensics_ruq8bu.jpg`,
  'detectionandresponse.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470570/detectionandresponse_tzsx35.jpg`,
  'wave.jpg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470572/wave_boki4k.jpg`,
  'laptopScreen.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470560/laptopScreen_ncs47c.png`,
  'Developer activity.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470553/Developer_activity_zc80st.png`,
  'TGpng.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470570/TGpng_itqilc.png`,
  'logo.svg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470561/logo_j6cvlq.svg`,
  'react.svg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470565/react_gv9dto.svg`,

  // Value icons
  'innovation.svg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470625/innovation_sbuw3h.svg`,
  'quality.svg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470625/quality_muo1ec.svg`,
  'centric.svg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470624/centric_nsulkb.svg`,
  'reliability.svg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470625/reliability_kzyuw8.svg`,

  // Partner logos
  'Keycube.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470642/Keycube_jer9ty.png`,
  'axis.svg': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470641/axis_gjqxr9.svg`,
  'falahzar.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470642/falahzar_nhrvtu.png`,
  'forest.webp': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470641/forest_eknrpl.webp`,
  'iStaff.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470642/iStaff_n0grc9.png`,
  'imflux.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470642/imflux_nqwm4l.png`,
  'prayas.png': `${CLOUDINARY_HOST}/dhaiqgxn8/image/upload/v1780470643/prayas_sddpgc.png`,
};

/** Public Cloudinary URL for a migrated asset. */
export function mediaUrl(filename: string): string {
  const url = CLOUDINARY_MEDIA[filename];
  if (!url) {
    console.warn('No Cloudinary URL mapped for media file:', filename);
    return `/media/${filename}`;
  }
  return url;
}

export const MEDIA_PRECONNECT_ORIGIN = CLOUDINARY_HOST;

export const DEFAULT_OG_IMAGE = mediaUrl('TGpng.png');
