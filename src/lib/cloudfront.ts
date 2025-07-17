import AWS from 'aws-sdk';

const cloudfront = new AWS.CloudFront({
  region: process.env.AWS_REGION || 'us-east-1', // CloudFront requires us-east-1 for some operations
});

export const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN;
export const CLOUDFRONT_DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID;

export const getCloudFrontUrl = (s3Key: string): string => {
  if (CLOUDFRONT_DOMAIN) {
    return `https://${CLOUDFRONT_DOMAIN}/${s3Key}`;
  }
  // Fallback to S3 URL if CloudFront is not configured
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'ap-northeast-1'}.amazonaws.com/${s3Key}`;
};

export const createSignedUrl = async (key: string, expires: number = 3600): Promise<string> => {
  if (!CLOUDFRONT_DOMAIN) {
    throw new Error('CloudFront domain not configured');
  }

  const params = {
    Url: getCloudFrontUrl(key),
    Expires: Math.floor(Date.now() / 1000) + expires,
  };

  try {
    const signedUrl = cloudfront.getSignedUrl('getObject', params);
    return signedUrl;
  } catch (error) {
    console.error('Error creating signed URL:', error);
    throw error;
  }
};

export const invalidateCloudFrontCache = async (paths: string[]): Promise<void> => {
  if (!CLOUDFRONT_DISTRIBUTION_ID) {
    console.warn('CloudFront distribution ID not configured, skipping cache invalidation');
    return;
  }

  const params = {
    DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      Paths: {
        Quantity: paths.length,
        Items: paths,
      },
      CallerReference: `invalidation-${Date.now()}`,
    },
  };

  try {
    await cloudfront.createInvalidation(params).promise();
    console.log('CloudFront cache invalidation completed for paths:', paths);
  } catch (error) {
    console.error('Error invalidating CloudFront cache:', error);
    throw error;
  }
};