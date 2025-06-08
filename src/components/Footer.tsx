// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 dark:bg-green-900 text-white dark:text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* 좌측: 브랜드명 + 저작권 */}
        <div>
          <h2 className="text-lg font-semibold text-white dark:text-gray-100">
            SoilMate.
          </h2>
          <p className="text-sm mt-1 text-white dark:text-gray-400">
            © Copyright 2025 by SoilMate
          </p>
        </div>

        {/* 우측: GitHub 아이콘 링크 */}
        <a
          href="https://github.com/YeonShin/soilmate-fe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white dark:text-gray-300 hover:opacity-75 transition"
        >
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 0.2975C5.37 0.2975 0 5.6675 0 12.2975C0 17.5925 3.438 22.0925 8.205 23.6825C8.805 23.7875 9.025 23.4225 9.025 23.1075C9.025 22.8225 9.015 22.0925 9.01 21.1225C5.6725 21.7975 4.9675 19.4175 4.9675 19.4175C4.4225 17.9825 3.6325 17.5925 3.6325 17.5925C2.545 16.7975 3.715 16.8125 3.715 16.8125C4.92 16.8975 5.555 18.0475 5.555 18.0475C6.62 19.8625 8.3575 19.3325 9.0425 19.0475C9.1475 18.2775 9.455 17.7475 9.795 17.4425C7.135 17.1375 4.3425 16.1025 4.3425 11.4675C4.3425 10.1475 4.7975 9.0475 5.555 8.1775C5.4225 7.8725 5.0325 6.6375 5.6675 4.9725C5.6675 4.9725 6.6925 4.6425 9.01 6.2025C9.9925 5.9325 11.045 5.7975 12.0975 5.7925C13.15 5.7975 14.2025 5.9325 15.185 6.2025C17.5025 4.6425 18.525 4.9725 18.525 4.9725C19.1625 6.6375 18.7725 7.8725 18.64 8.1775C19.4025 9.0475 19.8525 10.1475 19.8525 11.4675C19.8525 16.1125 17.055 17.1325 14.3875 17.4375C14.8125 17.7975 15.185 18.5175 15.185 19.6525C15.185 21.2925 15.17 22.5825 15.17 23.1075C15.17 23.4225 15.3875 23.7925 15.9975 23.6825C20.765 22.0875 24.2 17.5925 24.2 12.2975C24.2 5.6675 18.83 0.2975 12.2 0.2975H12Z" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
