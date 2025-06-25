import { useState } from 'react';
import { Button, Input, View } from '@tarojs/components';

interface SearchHeaderProps {
  onSearch?: (keyword: string) => void;
  onBack?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch, onBack }) => {
  const [keyword, setKeyword] = useState('');

  const handleInput = e => {
    setKeyword(e.detail.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(keyword);
    }
  };

  return (
    <View className="fixed left-0 right-0 top-0 z-50 flex items-center bg-white p-2 shadow">
      {/* 返回按钮 */}
      <Button className="w-auto min-w-0 border-0 bg-transparent p-1" onClick={onBack}>
        <View className="h-5 w-5 text-gray-700">
          <View className="iconfont icon-arrow-left" />
        </View>
      </Button>

      {/* 搜索输入框 + 放大镜 */}
      <View className="flex flex-1 items-center bg-gray-100 rounded-full px-3 py-2 mx-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-gray-500 mr-2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <Input
          className="flex-1 bg-transparent focus:outline-none"
          placeholder="搜索..."
          value={keyword}
          onInput={handleInput}
          confirmType="search"
          onConfirm={handleSearch}
        />
      </View>

      {/* 搜索按钮 */}
      <Button className="w-auto min-w-0 border-0 bg-transparent p-1 text-blue-500" onClick={handleSearch}>
        <View className="iconfont icon-search h-5 w-5" />
      </Button>
    </View>
  );
};

export default SearchHeader;
