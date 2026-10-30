import ImageCard from './ImageCard.jsx';
export default function Gallery({ photos }) { return <div className="gallery">{photos.map((photo) => <ImageCard photo={photo} key={photo.id} />)}</div>; }
