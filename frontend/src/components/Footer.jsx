import { Link, NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-gray-50 pt-16 pb-8">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm max-w-7xl mx-auto px-4 sm:px-8">
        <div>
          <NavLink to="/" className="group">
            <div className="inline-flex flex-col items-start leading-none select-none cursor-pointer gap-1">
              <span className="font-serif text-[26px] font-bold tracking-[5px] text-[#1c1c1c] uppercase transition-colors duration-300 group-hover:text-orange-600">
                FASHORA
              </span>

              <div className="flex items-center justify-center gap-1.5 mt-0.5 w-full">
                <div className="w-7 h-px bg-[#c9a84c]" />
                <div className="w-1 h-1 bg-[#c9a84c] rotate-45" />
                <div className="w-7 h-px bg-[#c9a84c]" />
              </div>
            </div>
          </NavLink>
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed mt-2">
            Fashora is your ultimate destination for trend-forward fashion. We
            bring you premium styles for Men, Women, and Kids - blending
            comfort, elegance, and affordability in every collection.
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <Link
              to={"/"}
              className="hover:text-gray-900 cursor-pointer transition-colors"
            >
              Home
            </Link>
            <Link
              to={"/collection"}
              className="hover:text-gray-900 cursor-pointer transition-colors"
            >
              Collections
            </Link>
            <Link
              to={"/about"}
              className="hover:text-gray-900 cursor-pointer transition-colors"
            >
              About Us
            </Link>
            <Link
              to={"/contact"}
              className="hover:text-gray-900 cursor-pointer transition-colors"
            >
              Contact Us
            </Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-gray-900 transition-colors">
              +91-9876543210
            </li>
            <li className="hover:text-gray-900 transition-colors">
              fashora@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <hr className="border-gray-200" />
        <p className="py-5 text-sm text-center text-gray-500">
          © 2026 Fashora - Elevate Your Style. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
