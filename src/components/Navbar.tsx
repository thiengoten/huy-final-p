import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="">
      <div className="container mx-auto flex p-4 items-center space-x-6 ">
        {/* Logo */}
        <div className="font-bold ">
          <a href="#">SNEAKERZONE</a>
        </div>
        {/* Menu Links */}
        <div className="hidden md:flex space-x-6  items-center justify-between">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            About
          </a>
          <a href="#" className="hover:text-gray-300">
            Services
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
        </div>
        {/* Button */}
        <div className=" hidden md:flex w-[100%] justify-end">
          <div></div>
          <Button>Login</Button>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
