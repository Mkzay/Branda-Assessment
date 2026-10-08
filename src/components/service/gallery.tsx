'use client';
import Image from 'next/image';
import { useState } from 'react';

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="gallery-main">
        <Image
          src={images[active]}
          alt={`${name} example ${active + 1}`}
          fill
          priority
          sizes="(max-width:760px) 100vw, 55vw"
        />
      </div>
      <div className="gallery-thumbs" role="group" aria-label="Service images">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className={index === active ? 'active' : ''}
            aria-label={`View image ${index + 1}`}
            aria-pressed={index === active}
          >
            <Image src={src} alt="" fill sizes="94px" />
          </button>
        ))}
      </div>
    </div>
  );
}
