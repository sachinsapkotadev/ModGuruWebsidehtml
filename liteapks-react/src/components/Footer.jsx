const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LITEAPKS.COM</h3>
            <p className="text-gray-400 text-sm">
              #1 MOD APK for Android - Download premium apps and games for free.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/apps" className="hover:text-white">Apps</a></li>
              <li><a href="/games" className="hover:text-white">Games</a></li>
              <li><a href="/admin" className="hover:text-white">Admin</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/apps" className="hover:text-white">Music & Audio</a></li>
              <li><a href="/apps" className="hover:text-white">Video Players</a></li>
              <li><a href="/games" className="hover:text-white">Action Games</a></li>
              <li><a href="/games" className="hover:text-white">RPG Games</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">DMCA</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 LITEAPKS.COM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
