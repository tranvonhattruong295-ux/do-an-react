import React from 'react';

export default function Card({ image, badgeLeft, badgeRight, badgeRightColor, title, desc, tags, delay = 0 }) {
  return (
    <div 
      className="feature-card"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="feature-card__img-box">
        <img 
          src={image} 
          alt={title} 
          className="feature-card__img" 
          loading="lazy" 
        />
        <div className="feature-card__img-overlay"></div>
        <div className="feature-card__badge-bar">
          <span className="feature-card__badge-left">{badgeLeft}</span>
          <span className={`feature-card__badge-right ${badgeRightColor || 'text-emerald-400'}`}>
            {badgeRight}
          </span>
        </div>
      </div>
      <div className="feature-card__body">
        <div className="feature-card__info">
          <h3 className="feature-card__title">
            {title}
          </h3>
          <p className="feature-card__desc">
            {desc}
          </p>
        </div>
        <div className="feature-card__tags">
          {tags.map((t, idx) => (
            <span key={idx} className="feature-card__tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
