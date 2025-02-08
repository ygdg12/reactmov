import React from 'react';

function MovieCard({ movie: { id, title, vote_average, release_date, original_language, poster_path } }) {
  
  const handleSearchClick = () => {
    const searchUrl = `https://7movies.ir/?s=${encodeURIComponent(title)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className='movie-card' onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
      />
      <h3 className="mt-4">{title}</h3>
      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="star" />
          <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        </div>
        <span>●</span>
        <p className="lang">{original_language}</p>
        <span>●</span>
        <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  );
}

export default MovieCard;
