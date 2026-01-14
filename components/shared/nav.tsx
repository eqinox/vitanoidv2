import { useActiveSection } from "@/hooks/use-active-section";

const navItems = [
  { id: "about", label: "За нас" },
  { id: "experience", label: "Какво предлагаме" },
  { id: "projects", label: "Поръчайте" },
];

const Nav = () => {
  const activeSection = useActiveSection(["about", "experience", "projects"]);

  return (
    <nav className="nav hidden lg:block">
      <ul className="mt-16 w-max">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <a
                href={`/#${item.id}`}
                className={`group flex items-center py-3`}
              >
                <span
                  className={`mr-4 h-px transition-all motion-reduce:transition-none ${
                    isActive ? "w-16 bg-slate-200" : "w-8 bg-slate-600"
                  } group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200`}
                ></span>
                <span
                  className={`nav-text text-xs font-bold tracking-widest uppercase ${
                    isActive ? "text-teal-400" : "text-slate-500"
                  } z-50 group-hover:text-slate-200 group-focus-visible:text-slate-200`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
