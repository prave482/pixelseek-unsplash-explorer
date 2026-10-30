import { ExternalLink, Info, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ImageCard({ photo }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const description = photo.description || photo.alt_description || 'Untitled photograph';
  useEffect(() => {
    const close = (event) => { if (ref.current && !ref.current.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close); return () => document.removeEventListener('pointerdown', close);
  }, []);
  return <article ref={ref} className="image-card" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    <a href={photo.links.html} target="_blank" rel="noreferrer" aria-label={`Open ${description} on Unsplash`}><img src={photo.urls.regular} srcSet={`${photo.urls.small} 500w, ${photo.urls.regular} 1080w`} sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw" width={photo.width} height={photo.height} loading="lazy" alt={description} onError={(event) => { event.currentTarget.closest('.image-card').classList.add('image-failed'); }} /></a>
    <button className="details-trigger" onClick={() => setOpen((value) => !value)} aria-label={`Details for ${description}`} aria-expanded={open}><Info size={18} /></button>
    {open && <section className="photo-popover" role="dialog" aria-label="Photo details"><button className="popover-close" onClick={() => setOpen(false)} aria-label="Close details"><X size={16} /></button><p className="photo-description">{description}</p><p className="photo-meta">{photo.width} × {photo.height} px</p><div className="popover-links"><a href={photo.user.links.html} target="_blank" rel="noreferrer">By {photo.user.name}</a><a href={photo.links.html} target="_blank" rel="noreferrer" aria-label="View original on Unsplash"><ExternalLink size={16} /></a></div></section>}
  </article>;
}
