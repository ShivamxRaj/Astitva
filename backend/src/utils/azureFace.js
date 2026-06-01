const axios = require('axios');

const key = process.env.AZURE_FACE_API_KEY;
const endpoint = process.env.AZURE_FACE_ENDPOINT || 'https://shivam-face-api.cognitiveservices.azure.com/';
const faceListId = 'avyakta-unidentified-bodies';

if (!key) {
  console.warn('⚠️ Warning: AZURE_FACE_API_KEY environment variable is not defined.');
}

// Remove trailing slash if present
const baseEndpoint = endpoint ? (endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint) : '';

const headers = {
  'Ocp-Apim-Subscription-Key': key || '',
  'Content-Type': 'application/json'
};

/**
 * Ensures the persistent FaceList exists on Azure
 */
async function initFaceList() {
  try {
    const url = `${baseEndpoint}/face/v1.0/facelists/${faceListId}`;
    console.log(`[Azure Face] Initializing FaceList at ${url}...`);
    
    await axios.put(url, {
      name: 'Avyakta Unidentified Bodies FaceList',
      userData: 'Persistent list of registered unidentified bodies for Avyakta portal.'
    }, { headers });
    
    console.log('[Azure Face] FaceList initialized successfully.');
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      const code = err.response.data.error.code;
      if (code === 'FaceListAlreadyExists') {
        console.log('[Azure Face] FaceList already exists. Ready.');
        return;
      }
      console.error('[Azure Face] FaceList initialization error:', err.response.data.error.message);
    } else {
      console.error('[Azure Face] FaceList initialization error:', err.message);
    }
  }
}

/**
 * Detect a face from a binary buffer (e.g. uploaded via search file upload)
 * @param {Buffer} imageBuffer 
 * @param {string} mimeType 
 * @returns {Promise<string|null>} faceId
 */
async function detectFace(imageBuffer, mimeType) {
  try {
    const url = `${baseEndpoint}/face/v1.0/detect?returnFaceId=true&recognitionModel=recognition_04&detectionModel=detection_03`;
    
    const res = await axios.post(url, imageBuffer, {
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/octet-stream'
      }
    });

    if (res.data && res.data.length > 0) {
      return res.data[0].faceId;
    }
    return null;
  } catch (err) {
    console.error('[Azure Face] Detect face error:', err.response?.data || err.message);
    return null;
  }
}

/**
 * Add a face to the persistent FaceList
 * @param {string} photoUrl 
 * @param {string} caseId 
 * @returns {Promise<string|null>} persistedFaceId
 */
async function addFaceToFaceList(photoUrl, caseId) {
  try {
    // Ensure FaceList is initialized
    await initFaceList();

    const url = `${baseEndpoint}/face/v1.0/facelists/${faceListId}/persistedFaces?userData=${encodeURIComponent(caseId)}`;
    console.log(`[Azure Face] Adding face for case ${caseId} from URL ${photoUrl}...`);
    
    const res = await axios.post(url, { url: photoUrl }, { headers });
    
    if (res.data && res.data.persistedFaceId) {
      console.log(`[Azure Face] Face registered successfully. persistedFaceId: ${res.data.persistedFaceId}`);
      return res.data.persistedFaceId;
    }
    return null;
  } catch (err) {
    console.error('[Azure Face] Add face to list error:', err.response?.data || err.message);
    return null;
  }
}

/**
 * Retrieves all faces registered in the FaceList to build a persistedFaceId -> caseId mapping
 * @returns {Promise<Map<string, string>>} mapping
 */
async function getFaceListMapping() {
  try {
    const url = `${baseEndpoint}/face/v1.0/facelists/${faceListId}`;
    const res = await axios.get(url, { headers });
    const mapping = new Map();
    
    if (res.data && res.data.persistedFaces) {
      for (const face of res.data.persistedFaces) {
        if (face.persistedFaceId && face.userData) {
          mapping.set(face.persistedFaceId, face.userData);
        }
      }
    }
    return mapping;
  } catch (err) {
    console.error('[Azure Face] Get FaceList mapping error:', err.response?.data || err.message);
    return new Map();
  }
}

/**
 * Find similar faces inside our persistent list
 * @param {string} faceId 
 * @returns {Promise<Array<{persistedFaceId: string, confidence: number}>>} matches
 */
async function findSimilarFaces(faceId) {
  try {
    const url = `${baseEndpoint}/face/v1.0/findsimilars`;
    
    const res = await axios.post(url, {
      faceId,
      faceListId,
      maxNumOfCandidatesReturned: 10,
      mode: 'matchFace'
    }, { headers });
    
    return res.data || [];
  } catch (err) {
    console.error('[Azure Face] Find similar error:', err.response?.data || err.message);
    return [];
  }
}

module.exports = {
  initFaceList,
  detectFace,
  addFaceToFaceList,
  findSimilarFaces,
  getFaceListMapping
};
