export const SEQUENCES = {
  hero: {
    folder: "/sequence-1",
    frameCount: 121,
    ext: "jpg",
    pad: 4,
  },
} as const;

export function buildSequencePaths(sequence: {
  folder: string;
  frameCount: number;
  ext: string;
  pad: number;
}): string[] {
  return Array.from({ length: sequence.frameCount }, (_, i) => {
    const frame = String(i + 1).padStart(sequence.pad, "0");
    return `${sequence.folder}/${frame}.${sequence.ext}`;
  });
}
