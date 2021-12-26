import React from 'react';

const Media = ({ mediaType, url }) => {

  if (mediaType === "image") {
    return (
      <div>
        <a className="image-heading" href="https://apod.nasa.gov/apod/astropix.html" rel="noopener noreferrer" target="_blank"><img className="image" src={url} alt="astronomy_picture_of_the_day" /></a>
      </div>
    )
  }
  else if (mediaType === "video") {
    return (
      <div>
        <iframe className="video" src={url} title="video"></iframe>
      </div>
    )
  }
  else {
    return (
      <div>
        <span>Unsupported media type</span>
      </div>
    )
  }
}

export default Media;