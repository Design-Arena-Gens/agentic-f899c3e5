import axios from 'axios';

export interface BufferPost {
  text: string;
  profile_ids: string[];
  media?: {
    picture: string;
  };
}

export async function sendToBuffer(
  text: string,
  imageBase64?: string
): Promise<any> {
  const accessToken = process.env.BUFFER_ACCESS_TOKEN;
  const profileId = process.env.BUFFER_PROFILE_ID;

  if (!accessToken || !profileId) {
    throw new Error('Buffer credentials not configured');
  }

  const postData: any = {
    text: text,
    profile_ids: [profileId],
  };

  if (imageBase64) {
    postData.media = {
      picture: imageBase64,
    };
  }

  try {
    const response = await axios.post(
      'https://api.bufferapp.com/1/updates/create.json',
      postData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Buffer API Error:', error.response?.data || error.message);
    throw error;
  }
}

export async function getBufferProfiles(): Promise<any> {
  const accessToken = process.env.BUFFER_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('Buffer access token not configured');
  }

  try {
    const response = await axios.get(
      'https://api.bufferapp.com/1/profiles.json',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Buffer API Error:', error.response?.data || error.message);
    throw error;
  }
}
