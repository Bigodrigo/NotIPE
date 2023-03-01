import Link from "next/link";

const Navbar = ({ children }) => {
  const menuItems = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Login",
      link: "/login",
    },
    {
      id: 3,
      name: "Sign Up",
      link: "/signup",
    },
  ];

  return (
    <>
      <header className="flex flex-wrap container mx-auto max-w-full items-center p-2 justify-between bg-white shadow-md sticky top-0 z-50">
        <nav className="md:inline md:items-center font-title w-full md:w-auto">
          <ul className="text-lg sm:flex">
            <>
              {menuItems.map((item) => (
                <li key={item.id} className="md:flex-row p-2">
                  <Link href={item?.link} className="text-blue-800 hover:text-blue-900 transition">
                      {item?.name}
                  </Link>
                </li>
              ))}
            </>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
};

export default Navbar;