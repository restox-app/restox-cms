import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Types } from "mongoose";
import { BeforeChangeHook } from "payload/dist/collections/config/types";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
})

const beforeChange: BeforeChangeHook = async ({
  data,
  req,
}) => {
  const filename = new Types.ObjectId().toHexString();

  data.filename = filename;

  for (const [key, value] of Object.entries(data.sizes)) {
    const s3_key = (() => {
      const mimeType = (value as any).mimeType as String;
  
      if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
        return `${filename}/${key}.jpg`;
      }
  
      return `${filename}/${key}.png`;
    })()

    const command = new PutObjectCommand({
      Bucket: 'restox-menu-photos',
      Key: s3_key,
      ACL: 'public-read',
      Body: req.payloadUploadSizes[key],
    });
    
    data.sizes[key].filename = s3_key;

    await client.send(command);
  }

  const s3_key = (() => {
    const mimeType = data.mimeType as String;

    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      return `${filename}/original.jpg`;
    }

    return `${filename}/original.png`;
  })()

  const command = new PutObjectCommand({
    Bucket: 'restox-menu-photos',
    Key: s3_key,
    ACL: 'public-read',
    Body: req.files.file.data,
  });
  
  data.filename = s3_key;

  await client.send(command);

  return {
    ...data,
    _id: filename,
  };
};

export default beforeChange;
