const defaultOptions = {
    format: 'image/png',
    quality: 0.92,
    width: undefined,
    height: undefined,
  };
  
  const mergeImages = (sources = [], options = {}) => new Promise(resolve => {
    options = Object.assign({}, defaultOptions, options);
  
    const canvas = window.document.createElement('canvas');
    const Image = window.Image;
  
    const images = sources.map(source => new Promise((resolve, reject) => {
  
      const img = new Image();
      img.onerror = () => reject(new Error('Couldn\'t load image'));
      img.onload = () => resolve(Object.assign({}, source, { img }));
      img.src = source.src;
    }));
  
    // Get canvas context
    const ctx = canvas.getContext('2d');
  
    resolve(Promise.all(images)
      .then(images => {
  
        canvas.width = options.width
        canvas.height = options.height
  
        // Draw images to canvas
        images.forEach(image => {
          if (image.logo) {
            return ctx.drawImage(image.img, (canvas.width / 2) - image.x, canvas.height - image.y - 30, image.w, image.h);
          }
  
          return ctx.drawImage(image.img, image.x, image.y, canvas.width, canvas.height);
  
        });
  
        return canvas.toDataURL(options.format, options.quality);
      }));
  });
  
  export default mergeImages;