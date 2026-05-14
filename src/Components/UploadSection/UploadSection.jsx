import { useState } from "react";
import "./UploadSection.css";

export default function UploadSection({ onAnalyze, error }) {
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAnalyze(link);
  }

  return (
    <section className="upload">
      <div className="upload__overlay">
        <div className="upload__content">
          <h1 className="upload__title">
            Find the perfect playlist for your track
          </h1>

          <p className="upload__subtitle">
            Paste a Spotify track link to get started
          </p>

          <form onSubmit={handleSubmit} className="upload__form">
            <input
              type="url"
              required
              placeholder="Paste Spotify track link..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button type="button" onClick={handleSubmit}>
              Analyze
            </button>
          </form>

          {error && <p className="upload__error">{error}</p>}
        </div>
      </div>
    </section>
  );
}
