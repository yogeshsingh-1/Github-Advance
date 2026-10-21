import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  profile: "nodejs",
});

const getPublicUrl = (bucket, key) => {
  return `https://${bucket}.s3.amazonaws.com/${key}`;
};


console.log(getPublicUrl('procodrr-nodejs-bucket', 'img/react-interview.png'));