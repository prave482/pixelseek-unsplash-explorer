import { Router } from 'express';
import { featuredPhotos, searchPhotos } from '../services/unsplashService.js';

const router = Router();
const LIMIT = 30;

const pagination = (req) => {
  const page = Number.parseInt(req.query.page, 10);
  const perPage = Number.parseInt(req.query.per_page, 10);
  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    perPage: Math.min(Number.isInteger(perPage) && perPage > 0 ? perPage : 12, LIMIT),
  };
};

const handler = (fn) => async (req, res, next) => {
  try {
    const data = await fn(req);
    res.json({ results: data.results || data, total: data.total, totalPages: data.total_pages });
  } catch (error) { next(error); }
};

router.get('/search', handler(async (req) => {
  const query = String(req.query.q || '').trim().replace(/\s+/g, ' ');
  if (!query) {
    const error = new Error('A search query is required.');
    error.status = 400;
    error.code = 'INVALID_QUERY';
    throw error;
  }
  if (query.length > 100) {
    const error = new Error('Search queries must be 100 characters or fewer.');
    error.status = 400;
    error.code = 'INVALID_QUERY';
    throw error;
  }
  return searchPhotos({ query, ...pagination(req) });
}));

router.get('/featured', handler((req) => featuredPhotos(pagination(req))));

export default router;
