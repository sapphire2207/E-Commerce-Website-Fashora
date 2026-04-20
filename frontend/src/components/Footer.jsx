import { Link, NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="section-shell pt-14 sm:pt-18 pb-6 sm:pb-8">
      <div className="surface-card px-6 sm:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 sm:gap-10 text-sm">
          <div>
            <NavLink to="/" className="group inline-flex focusable-ring rounded-lg">
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
            <p className="w-full md:w-2/3 text-gray-600 leading-relaxed mt-4 text-[0.95rem]">
              Fashora is your ultimate destination for trend-forward fashion.
              We bring you premium styles for Men, Women, and Kids - blending
              comfort, elegance, and affordability in every collection.
            </p>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-semibold mb-5 text-gray-800">
              COMPANY
            </p>
            <ul className="flex flex-col gap-2.5 text-gray-600">
              <Link
                to={"/"}
                className="hover:text-orange-600 cursor-pointer transition-colors min-h-11 inline-flex items-center"
              >
                Home
              </Link>
              <Link
                to={"/collection"}
                className="hover:text-orange-600 cursor-pointer transition-colors min-h-11 inline-flex items-center"
              >
                Collections
              </Link>
              <Link
                to={"/about"}
                className="hover:text-orange-600 cursor-pointer transition-colors min-h-11 inline-flex items-center"
              >
                About Us
              </Link>
              <Link
                to={"/contact"}
                className="hover:text-orange-600 cursor-pointer transition-colors min-h-11 inline-flex items-center"
              >
                Contact Us
              </Link>
            </ul>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-semibold mb-5 text-gray-800">
              GET IN TOUCH
            </p>
            <ul className="flex flex-col gap-2.5 text-gray-600">
              <li className="hover:text-orange-600 transition-colors min-h-11 inline-flex items-center">
                +91-9876543210
              </li>
              <li className="hover:text-orange-600 transition-colors min-h-11 inline-flex items-center">
                fashora@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-stone-200">
          <p className="text-sm text-center text-gray-500">
            © 2026 Fashora - Elevate Your Style. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
