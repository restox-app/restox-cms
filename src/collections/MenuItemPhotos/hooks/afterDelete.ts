import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { AfterDeleteHook } from "payload/dist/collections/config/types";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
})

const afterDelete: AfterDeleteHook = async ({
  doc,
}) => {
  const command = new DeleteObjectsCommand({
    Bucket: 'restox-menu-photos',
    Delete: {
      Objects: [
        {
          Key: doc.filename + '/original' + (doc.mimeType.includes('jpeg') || doc.mimeType.includes('jpeg') ? 'jpg' : 'png'),
        },
        ...Object.entries(doc.sizes).map(([key, val]) => {
          return {
            Key: (val as any).filename,
          };
        }),
      ],
    },
  });

  await client.send(command);

  return;
};

export default afterDelete;
