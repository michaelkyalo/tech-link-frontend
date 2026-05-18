const Footer = () => {
  return (
    <footer className="bg-green-700 text-white text-center py-4 mt-10">
      <p>
        © {new Date().getFullYear()} AgriLink.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;