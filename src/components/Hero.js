import React from 'react';
import PropTypes from 'prop-types';

const Hero = props => {
  const { title, subtitle } = props;
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">{title}</p>
        {subtitle.length > 0 ? <p className="subtitle">{subtitle}</p> : null}
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

Hero.defaultProps = {
  subtitle: ''
};

export default Hero;
