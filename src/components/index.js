import React from 'react';
import classNames from 'classnames';
import './index.css';
import Umbrella from './umbrella';
import ColorButtons from './colorButtons';
import UploadIcon from '../assets/UploadIcon.svg';
import Loader from '../assets/Loader.svg'

const CustomizeUmbrella = () => {
  const [color, setColor] = React.useState('blue');
  const [fileLoading, setFileLoading] = React.useState(false);
  const [uploadButtonLoading, setUploadButtonLoading] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');

  const InputRef = React.createRef();

  const UmbrellaClass = classNames({
    ['Row']: true,
    [`Row--${color}`]: color,
  });

  const UploadIconClass = classNames({
    ['Upload-icon']: true,
    ['Upload-icon-loading']: fileLoading || uploadButtonLoading
  })

  const UploadButtonClass = classNames({
    ['Upload-Button']: true,
    [`Upload-Button--${color}`]: color
  });

  const CloseIconClass = classNames({
    ['material-icons']: true,
    ['Close-icon']: true,
    ['Close-icon--visible']: fileName !== '',
  });

  const onChangeColor = (e, umbrellaColor) => {
    setColor(umbrellaColor);
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    e.target.value = null;

    setFileLoading(true);
    setTimeout(() => {
      setFileName(file.name);
      setFileLoading(false);
      setFile(URL.createObjectURL(file));
    }, 1000);
  };

  const onToggleUploadIcon = (loading) => {
    setUploadButtonLoading(loading);
  }

  const onRemoveLogo = () => {
    setFile(null);
    setFileName('');
  }

  const onUploadLogo = () => {
    if (uploadButtonLoading || fileLoading) return;
    InputRef && InputRef.current.click();
  }

  return (
    <div className={UmbrellaClass}>
      <div className='Col Col--6 Col--s-12 Col--xs-12' >
        <Umbrella logo={file} color={color} toggleUploadIcon={onToggleUploadIcon}/>
      </div>
      <div className='Col Col--6 Col--s-12 Col--xs-12'>
        <div className='Info-wrapper'>
          <h1 className='Heading'>Customize Umbrella</h1>
          <ColorButtons color={color} onChangeColor={onChangeColor} />
          <p className='Text Text--strong'>Customize your umbrella</p>
          <p className='Text Text--subtle'>Upload a logo for an instant preview</p>
          <p className='Text Text--small Text--subtle'>.png and .jpg file only. Max file size is 5MB.</p>
          <div className='Upload'>
            <input
              type="file"
              ref={InputRef}
              onChange={onChangeFile}
              accept="image/x-png,image/gif,image/jpeg,image/jpg"
              style={{ display: 'none' }}
            />
            <div className={UploadButtonClass}>
              <img
                src={fileLoading || uploadButtonLoading ? Loader : UploadIcon}
                onClick={onUploadLogo}
                className={UploadIconClass} />
              <p className='Text--strong Text--ellipsis'>{fileName ? fileName : 'UPLOAD LOGO'}</p>
              <div className='Upload-close'>
                <i className={CloseIconClass} onClick={onRemoveLogo}>close</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeUmbrella;