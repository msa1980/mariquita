const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-6 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} DevStore. Todos os direitos reservados.</p>
        <p className="text-sm mt-1">Construído com ❤️ usando React, TypeScript e Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
