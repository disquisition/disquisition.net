import A from '../anchor';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const captionColor = '#bbb';
const unsplashQueryParams =
  'utm_source=disquisition&utm_medium=referral&utm_content=creditCopyText';

const Caption = glamorous.p({
  color: captionColor,
  textAlign: 'center',
  margin: 0,
  marginTop: '.5em'
});

const CaptionLink = glamorous(A)({
  color: captionColor
});

const Image = glamorous
  .div(
    ({ src }) => ({
      backgroundImage: `url(${src})`
    }),
    {
      width: 720,
      height: 360,
      maxWidth: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
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

const PostHeroImage = ({ className, image }) => (
  <div className={className}>
    <Image src={image.link} alt={`Photo by ${image.user.name} / Unsplash`} />

    <Caption>
      Photo by
      {' '}
      <CaptionLink
        href={`${image.user.link}?${unsplashQueryParams}`}
        target="_blank"
      >
        {image.user.name}
      </CaptionLink>
      {' '}
      /
      {' '}
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

export default glamorous(PostHeroImage)({
  margin: '1em 0'
});
