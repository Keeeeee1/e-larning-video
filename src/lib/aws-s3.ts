import AWS from 'aws-sdk';
import { getCloudFrontUrl } from './cloudfront';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-northeast-1',
});

export const s3 = new AWS.S3();

export const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'video-learning-platform-bucket';

export const uploadVideoToS3 = async (file: File, key: string): Promise<string> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: file.type,
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
};

export const getVideoUrl = (key: string): string => {
  return getCloudFrontUrl(key);
};

export const deleteVideoFromS3 = async (key: string): Promise<void> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('S3 delete error:', error);
    throw error;
  }
};