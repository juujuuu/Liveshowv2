import React, { useState } from 'react';
import Spinner from '../../../common_components/Spinner';

const ImageLoader = ({ src, alt, classname, style,width,maxwidth }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false); // Once the image is loaded, hide the loader
   
  };

  return (
    <div  className={classname}>
      {loading && (
        <div className="image-placeholder" style={{ textAlign: 'center' }}>
   
          
<button  style={{width:width}} className="btn" type="button" disabled>
  <span style={{width:"20px", height:"20px"}} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

</button>
        </div>
      )}
     
      <img
       
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        maxwidth={maxwidth}
        width={width}
        className="rounded"
        style={{
          display: loading ? 'none' : 'block',
          maxWidth: loading ? undefined : 'auto', // Add maxWidth: 100px when image is loaded
        }}
      />
      
       
    </div>
  );
};
export default ImageLoader;