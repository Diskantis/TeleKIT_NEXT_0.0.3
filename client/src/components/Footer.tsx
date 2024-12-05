const Footer = () => {
  return (
    <div className="w-full h-[30px] mt-2 flex items-center justify-center bg-gradient-to-r from-cyan-950 to-teal-800">
      &copy; {new Date().getFullYear()} All rights reserved by Mikhail Zajkov
    </div>
  );
};

export default Footer;
