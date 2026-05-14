import "./PlaylistCard.css";

export default function PlaylistCard({ name, image, score, followers }) {
  return (
    <article className="playlist-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Match: {score}%</p>
      <p>{followers} followers</p>
      <button>View</button>
    </article>
  );
}
