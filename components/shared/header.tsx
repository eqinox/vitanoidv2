import Logo from "./Logo";
import Nav from "./nav";

const Header = () => {
  return (
    <header className="h-auto lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div className="z-40">
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          EcoSense
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          Предлагаме продукт Vitanoid
        </h2>

        <p className="mt-4 max-w-xs leading-normal">
          Филтър за пречистване на вода
        </p>
        <Nav />
      </div>

      <Logo />
    </header>
  );
};

export default Header;
