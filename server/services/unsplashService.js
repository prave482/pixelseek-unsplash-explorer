import { createApi } from 'unsplash-js';
import { config } from '../config.js';

const ensureClient = () => {
  if (!config.unsplashAccessKey) {
    const error = new Error('The Unsplash API is not configured.');
    error.status = 503;
    error.code = 'CONFIGURATION_ERROR';
    throw error;
  }
  return createApi({ accessKey: config.unsplashAccessKey });
};

const unwrap = async (request) => {
  const response = await request;
  if (response.errors) {
    const error = new Error(response.errors.join(', '));
    error.status = response.status === 401 ? 503 : response.status || 502;
    error.code = response.status === 401 ? 'CONFIGURATION_ERROR' : 'UNSPLASH_ERROR';
    throw error;
  }
  return response.response;
};

export const searchPhotos = ({ query, page, perPage }) =>
  unwrap(ensureClient().search.getPhotos({ query, page, perPage, orientation: 'landscape' }));

export const featuredPhotos = ({ page, perPage }) =>
  unwrap(ensureClient().photos.list({ page, perPage, orderBy: 'popular' }));
