import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer
      className="flex flex-col relative items-center justify-center border-t border-border 
      pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32"
    >
      {/* Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full transition-all">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-start justify-start md:max-w-[200px]">
          <div className="flex items-start">
            <Image
              src="/logo.svg"
              alt="logo"
              height={30}
              width={30}
              className=""
            />
          </div>

          <p className="text-foreground/70 mt-4 text-sm text-start max-w-xs">
            Discover, showcase, and support innovative products on
            ProductSphere.
          </p>

          <div className="mt-4 text-sm text-foreground/70">
            Built with passion by{" "}
            <Link
              href="https://github.com/Abhish7k"
              className="hover:text-foreground transition-all duration-300"
              target="_blank"
            >
              Abhish7k
            </Link>
          </div>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex mt-20 md:mt-0 w-full md:w-1/2 lg:w-1/3 transition-all">
          {Links.map((section, index) => (
            <div key={index} className="flex justify-between w-full">
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium">{section.title}</h3>

                <ul className="mt-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mt-2">
                      <Link
                        href={link.href}
                        className="hover:text-foreground transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
        <p className="text-sm text-muted-foreground mt-8 md:mt-0">
          &copy; 2024 ProductSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;

const Links = [
  {
    title: "Product",
    links: [
      { name: "Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Pricing", href: "/pricing" },
    ],
  },

  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Privacy Policy", href: "" },
      { name: "Terms & Conditions", href: "" },
    ],
  },
];
