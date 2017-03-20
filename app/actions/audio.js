export const SAMPLE_CHORUS = 'SAMPLE_CHORUS';

export function toggleSampleChorus(sampleChorus) {
  return {
    type: SAMPLE_CHORUS,
    sampleChorus,
  };
}
