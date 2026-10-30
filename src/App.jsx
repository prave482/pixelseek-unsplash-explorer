import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import Gallery from './components/Gallery.jsx';
import Pagination from './components/Pagination.jsx';
import Footer from './components/Footer.jsx';
import { MessageState, Skeletons } from './components/States.jsx';
import { getPhotos } from './services/photos.js';

const categories = ['Nature', 'Architecture', 'Travel', 'Portraits', 'Fashion', 'Food', 'Technology', 'Minimalism'];

export default function App() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const controller = useRef();
  const load = useCallback(async () => {
    controller.current?.abort();
    const aborter = new AbortController(); controller.current = aborter;
    setLoading(true); setError('');
    try { const response = await getPhotos({ query, page, signal: aborter.signal }); setData(response); }
    catch (err) { if (err.name !== 'AbortError') setError(err.message); }
    finally { if (!aborter.signal.aborted) setLoading(false); }
  }, [page, query]);
  useEffect(() => { load(); return () => controller.current?.abort(); }, [load]);
  const submit = (next) => { const trimmed = next.trim(); setInput(trimmed); setQuery(trimmed); setPage(1); };
  const changePage = (next) => { setPage(next); document.querySelector('#discover')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return <div id="top"><Header /><main>
    <section className="hero"><p className="eyebrow">Curated visual discovery</p><h1>Find inspiration<br /><em>in every image.</em></h1><p className="hero-copy">Explore extraordinary photography from creators around the world. Search, discover, and find your next inspiration.</p><SearchBar value={input} onChange={setInput} onSubmit={submit} /><div className="category-row" aria-label="Popular searches"><span>Popular</span>{categories.map((category) => <button key={category} onClick={() => submit(category)}>{category}</button>)}</div></section>
    <section id="discover" className="discovery"><div className="section-heading"><div><p className="eyebrow">{query ? 'Search results' : 'Fresh perspectives'}</p><h2>{query ? `Exploring “${query}”` : 'Discover the extraordinary'}</h2></div>{!loading && data.total !== undefined && <span className="result-count">{data.total.toLocaleString()} images</span>}</div>
      {loading ? <Skeletons /> : error ? <MessageState type="error" title="We couldn’t load the gallery." message={error} onRetry={load} /> : data.results.length ? <Gallery photos={data.results} /> : <MessageState type="empty" title="Nothing surfaced this time." message="Try a different word, a broader idea, or one of the popular searches above." />}
      {!loading && !error && <Pagination page={page} totalPages={data.totalPages} hasResults={data.results.length > 0} onChange={changePage} />}
    </section>
  </main><Footer /></div>;
}
