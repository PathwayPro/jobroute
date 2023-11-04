const Logo = ({ variant }: { variant: 'primary' | 'secondary' }) => {
  const style = 'min-w-[8.68775rem] h-[1.5rem] bg-no-repeat bg-cover bg-center';

  return variant === 'primary' ? (
    <div className={style} style={{ backgroundImage: 'url(/img/logo-primary.svg)' }}></div>
  ) : (
    <div className={style} style={{ backgroundImage: 'url(/img/logo-secondary.svg)' }}></div>

  )
}

export default Logo;