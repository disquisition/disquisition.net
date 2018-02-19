import A from '../anchor';
import PropTypes from 'prop-types';
import React from 'react';
import glamorous from 'glamorous';
import { css } from 'glamor';

const captionColor = '#bbb';
const unsplashQueryParams =
  'utm_source=disquisition&utm_medium=referral&utm_content=creditCopyText';

const fadeIn = css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
});

const Caption = glamorous.p({
  color: captionColor,
  textAlign: 'center',
  margin: 0,
  marginTop: '.5em'
});

const CaptionLink = glamorous(A)({
  color: captionColor
});

const StyledHeroImage = glamorous
  .div(
    ({ src }) =>
      src
        ? {
          '&:before': {
            content: ' ',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: `url(${src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            animation: `${fadeIn} .25s linear`
          }
        }
        : {},
    {
      position: 'relative',
      width: 720,
      height: 360,
      maxWidth: '100%',
      background: '#eee',
      margin: 'auto',
      '@media screen and (max-width: 720px)': {
        height: 240
      },
      '@media screen and (max-width: 480px)': {
        height: 180
      }
    }
  )
  .withProps(
    ({ alt }) => ({
      'aria-label': alt
    }),
    {
      role: 'img'
    }
  );

class HeroImage extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  };

  state = {
    isImageLoaded: false
  };

  componentDidMount() {
    const image = new Image();

    image.onload = () => this.setState({ isImageLoaded: true });

    image.src = this.props.src;
  }

  render() {
    const { src, ...rest } = this.props;
    const { isImageLoaded } = this.state;

    return isImageLoaded ? (
      <StyledHeroImage {...rest} src={src} />
    ) : (
      <StyledHeroImage {...rest} />
    );
  }
}

const PostHeroImage = ({ className, image }) => (
  <div {...css({ margin: '1em 0' })} className={className}>
    <HeroImage
      src={image.link}
      alt={`Photo by ${image.user.name} / Unsplash`}
    />

    <Caption>
      Photo by{' '}
      <CaptionLink
        href={`${image.user.link}?${unsplashQueryParams}`}
        target="_blank"
      >
        {image.user.name}
      </CaptionLink>{' '}
      /{' '}
      <CaptionLink
        href={`https://unsplash.com/?${unsplashQueryParams}`}
        target="_blank"
      >
        Unsplash
      </CaptionLink>
    </Caption>
  </div>
);

PostHeroImage.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    link: PropTypes.string.isRequired,
    user: PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default PostHeroImage;
