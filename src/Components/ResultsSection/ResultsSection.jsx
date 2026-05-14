import PlaylistCard from "../PlaylistCard/PlaylistCard";
import "./ResultsSection.css";

export default function ResultsSection({ playlists, track }) {
  if (!track) {
    return (
      <section className="results">
        <p>Paste a Spotify link to find matching playlists 🎧</p>
      </section>
    );
  }

  return (
    <section className="results">
      <div className="results__header">
        <img src={track.image} alt={track.name} />
        <div>
          <h2>{track.name}</h2>
          <p>{track.artist}</p>
          <p>{playlists.length} matches</p>
        </div>
      </div>

      <ul className="results__cards">
        {playlists.map((p) => (
          <li key={p.id}>
            <PlaylistCard {...p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
