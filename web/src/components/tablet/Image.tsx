const PImage: React.FC<{ src: string; fallback?: string }> = ({
  src,
  fallback = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
}) => {
  return (
    <img
      src={src}
      className='w-full h-full border rounded-sm aspect-square object-cover object-center'
      onError={(e) => {
        e.currentTarget.src = fallback;
      }}
    />
  );
};

export default PImage;
