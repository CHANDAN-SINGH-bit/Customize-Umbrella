import React from 'react';
import classNames from 'classnames';
import './Umbrella.css';
import { UmbrellaMapping } from '../../constants';
import Loader from '../loader';
import mergeImages from '../../utils/MergeImages';

const dimensions = { height: 406, width: 451 };

export const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const Umbrella = ({ color, logo, toggleUploadIcon }) => {
  const [imageLoading, setImageLoading] = React.useState(false);
  const [src, setSrc] = React.useState(UmbrellaMapping[color]);

  const UmbrellaImageClass = classNames({
    ['Umbrella-image']: true,
    ['d-none']: imageLoading,
  });

  const LoaderClass = classNames({
    ['Umbrella-loading']: imageLoading,
    ['d-none']: !imageLoading
  });

  // Merge Umbrella Image and Logo
  const updateUmbrellaLogo = () => {
    const width = dimensions.width * 0.25;
    const height = dimensions.height * 0.1;

    mergeImages([
      { src: UmbrellaMapping[color], x: 0, y: 0 },
      { src: logo, x: width / 2.0, y: height, logo: true, h: height, w: width },
    ], {
      height: dimensions.height,
      width: dimensions.width
    })
      .then(b64 => {
        setSrc(b64);
        setImageLoading(false);
        toggleUploadIcon(false);
      });
  }

  React.useEffect(() => {
    if (logo !== null) {
      toggleUploadIcon(true);
      setImageLoading(true);
      setTimeout(updateUmbrellaLogo, 3000);
    } else {
      setSrc(UmbrellaMapping[color]);
    }
  }, [logo, color]);

  return (
    <div className='Umbrella'>
      <img
        className={UmbrellaImageClass}
        src={src}
      />
      <Loader fill={color} className={LoaderClass} />
    </div>
  );
};

export default Umbrella;