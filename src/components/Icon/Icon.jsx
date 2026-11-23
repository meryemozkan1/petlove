import sprite from '../../assets/icons/sprite.svg';

const Icon = ({ id, width = 20, height = 20, className = '', ...props }) => {
  return (
    <svg width={width} height={height} className={className} {...props}>
      <use href={`${sprite}#icon-${id}`} />
    </svg>
  );
};

export default Icon;

