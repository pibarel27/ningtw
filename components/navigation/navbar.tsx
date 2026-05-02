// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { Menu } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from "framer-motion";

// const links = [
//   { href: "/home", label: "Home" },
//   { href: "/games", label: "Games" },
//   { href: "/about", label: "About" },
//   { href: "/news", label: "News" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   // Hide navbar on News detail pages only (e.g. /news/studio-launch)
//   if (pathname?.startsWith("/news/")) {
//     return null;
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <nav
//       className={cn(
//         "fixed left-0 right-0 top-0 z-50 flex h-20 items-center transition-all duration-500",
//         isScrolled
//           ? "bg-background/65 backdrop-blur-md shadow-lg shadow-primary/10 border-b border-primary/15"
//           : "bg-transparent"
//       )}
//     >
//       <div className="container mx-auto flex items-center justify-between px-4">
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Link href="/home" className="group relative">
//           <Image
//             src="/logo.png"
//             alt="Nngtw Studio"
//             width={60}
//             height={60}
//             className="transition-all duration-500 group-hover:opacity-0 group-hover:rotate-12"
//           />
//           <Image
//             src="/splash-logo.gif"
//             alt="Nngtw Studio Animated"
//             width={60}
//             height={60}
//             className="absolute left-0 top-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
//           />
//           </Link>
//         </motion.div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:block">
//           <ul className="flex space-x-8">
//             {links.map((link) => (
//               <li key={link.href}>
//                 <motion.div
//                   whileHover={{ y: -2 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Link
//                   href={link.href}
//                   className={cn(
//                     "nav-link relative text-lg font-medium transition-all duration-300",
//                     pathname === link.href
//                       ? "active text-primary"
//                       : "text-foreground/90 hover:text-primary"
//                   )}
//                   >
//                   {link.label}
//                   </Link>
//                 </motion.div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Mobile Menu Button */}
//         <motion.button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-foreground md:hidden transition-colors duration-300 hover:text-primary"
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <Menu size={24} />
//         </motion.button>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="absolute left-0 top-20 w-full bg-background/80 backdrop-blur-md shadow-lg shadow-primary/10 border-b border-primary/15 md:hidden"
//             >
//               <div className="container px-4 py-6">
//                 <ul className="space-y-4">
//                   {links.map((link) => (
//                     <li key={link.href}>
//                       <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: 0.1 }}
//                         whileHover={{ x: 10 }}
//                       >
//                         <Link
//                         href={link.href}
//                         className={cn(
//                           "nav-link block text-lg font-medium transition-all duration-300 py-2",
//                           pathname === link.href
//                             ? "active text-primary"
//                             : "text-foreground/90 hover:text-primary"
//                         )}
//                         onClick={() => setIsOpen(false)}
//                         >
//                         {link.label}
//                         </Link>
//                       </motion.div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/home", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  const pathname = usePathname();

  // Hide navbar on News detail pages
  if (pathname?.startsWith("/news/")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // background blur effect
      setIsScrolled(currentScrollY > 50);

      // hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex h-20 items-center",
        isScrolled
          ? "bg-background/65 backdrop-blur-md shadow-lg shadow-primary/10 border-b border-primary/15"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/home" className="group relative">
            <Image
              src="/logo.png"
              alt="Nngtw Studio"
              width={60}
              height={60}
              className="transition-all duration-500 group-hover:opacity-0 group-hover:rotate-12"
            />
            <Image
              src="/splash-logo.gif"
              alt="Nngtw Studio Animated"
              width={60}
              height={60}
              className="absolute left-0 top-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex space-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link relative text-lg font-medium transition-all duration-300",
                      pathname === link.href
                        ? "active text-primary"
                        : "text-foreground/90 hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground md:hidden transition-colors duration-300 hover:text-primary"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={24} />
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-0 top-20 w-full bg-background/80 backdrop-blur-md shadow-lg shadow-primary/10 border-b border-primary/15 md:hidden"
            >
              <div className="container px-4 py-6">
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "nav-link block text-lg font-medium transition-all duration-300 py-2",
                            pathname === link.href
                              ? "active text-primary"
                              : "text-foreground/90 hover:text-primary"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}