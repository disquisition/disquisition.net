import A from '../anchor';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css, cx, keyframes } from 'react-emotion';

const captionColor = '#bbb';
const unsplashQueryParams =
  'utm_source=disquisition&utm_medium=referral&utm_content=creditCopyText';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const baseHeroImageStyle = css`
  position: relative;
  width: 720px;
  height: 360px;
  max-width: 100%;
  background: #eee;
  margin: auto;

  @media screen and (max-width: 720px) {
    height: 240px;
  }

  @media screen and (max-width: 480px) {
    height: 180px;
  }
`;

function HeroImage(props) {
  const { alt, src, ...rest } = props;

  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={baseHeroImageStyle}
        {...rest}
      />
    );
  }

  const heroImageStyle = css`
    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url(${src});
      background-position: center;
      background-size: cover;
      animation: ${fadeIn} 0.25s linear;
    }
  `;

  return (
    <div
      role="img"
      aria-label={alt}
      className={cx(baseHeroImageStyle, heroImageStyle)}
      {...rest}
    />
  );
}

const HeroImageContainer = styled.div`
  margin: 1em 0;
`;

const Caption = styled.p`
  color: ${captionColor};
  text-align: center;
  margin: 0;
  margin-top: 0.5em;
`;

const CaptionLink = styled(A)`
  color: ${captionColor};
`;

export default class PostHeroImage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    image: PropTypes.shape({
      link: PropTypes.string.isRequired,
      user: PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  state = {
    isImageLoaded: false
  };

  componentDidMount() {
    const image = new Image();

    image.onload = () => this.setState({ isImageLoaded: true });

    image.src = this.props.image.link;
  }

  render() {
    const { className, image } = this.props;
    const { isImageLoaded } = this.state;

    return (
      <HeroImageContainer className={className}>
        <HeroImage
          src={isImageLoaded && image.link}
          alt={`Photo by ${image.user.name} / Unsplash`}
        />

        <Caption>
          {'Photo by '}
          <CaptionLink
            href={`${image.user.link}?${unsplashQueryParams}`}
            target="_blank"
          >
            {image.user.name}
          </CaptionLink>
          {' / '}
          <CaptionLink
            href={`https://unsplash.com/?${unsplashQueryParams}`}
            target="_blank"
          >
            Unsplash
          </CaptionLink>
        </Caption>
      </HeroImageContainer>
    );
  }
}
