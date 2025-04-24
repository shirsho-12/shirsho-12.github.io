import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">CS Portfolio</h3>
            <p className="text-gray-300 max-w-md">
              Computer Science student specializing in software development,
              research, and technical writing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-200">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/publications"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Publications
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-200">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/shirsho-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/shirshajit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a
                  href="mailto:shirshajit@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <MailIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center md:text-left text-gray-400 text-sm">
          <p>&copy; {currentYear} CS Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
