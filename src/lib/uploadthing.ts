//  import type { OurFileRouter } from '@/app/api/uploadthing/core';
// import {
//   generateReactHelpers,
//   generateUploadButton,
//   generateUploadDropzone,
// } from "@uploadthing/react";
// export const UploadButton = generateUploadButton<OurFileRouter>();
// export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
// export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

export { useUploadThing };

export const uploadImage = async (file: File) => {
  try {
    const res = await uploadFiles('imageUploader', { files: [file] });
    // res is an array; access the first element and use fileUrl
    const uploadedFile = res[0];
    return { success: 1, file: { url: uploadedFile.ufsUrl } };
  } catch (error) {
    return { success: 0, file: { url: null } };
  }
};
