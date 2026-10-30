import { ArrowLeft, ArrowRight } from 'lucide-react';
export default function Pagination({ page, totalPages, hasResults, onChange }) {
  if (!hasResults) return null;
  const finalPage = Math.min(totalPages || page + 1, 200);
  return <nav className="pagination" aria-label="Gallery pages"><button onClick={() => onChange(page - 1)} disabled={page === 1}><ArrowLeft size={17} /> Previous</button><span>Page <strong>{page}</strong>{totalPages ? ` of ${finalPage}` : ''}</span><button onClick={() => onChange(page + 1)} disabled={page >= finalPage}>Next <ArrowRight size={17} /></button></nav>;
}
