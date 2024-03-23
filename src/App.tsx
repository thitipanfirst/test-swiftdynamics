import React, { useEffect, useState } from 'react';
import './styles/globals.scss';
import { useTranslation } from 'react-i18next';
import './i18n';
import { ConfigProvider, Select } from 'antd';
import CardTest from './components/CardTest';
import LayoutAndStyle from './components/LayoutAndStyle';

function App() {
  const { t, i18n } = useTranslation();
  const language = localStorage.getItem("language") || 'en';
  const [selectOption, setSelectOption] = useState<string>(t(language));
  const [testNumber, setTestNumber] = useState<number>(0);

  useEffect(() => {
    i18n.changeLanguage(language);
    setSelectOption(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setSelectOption(value);
    localStorage.setItem("language", value);
  }

  const options = [
    { label: t('en'), value: 'en' },
    { label: t('th'), value: 'th' },
  ];
  return (
    <main className="flex flex-col">
      <div className='selectButton'>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                borderRadius: 0
              },
            }
          }}
        >
          <Select
            value={t(selectOption)}
            options={options}
            onChange={(item) => handleLanguage(item.toString())}
          />
        </ConfigProvider>
      </div>
      {testNumber === 0 ? (<div className='container'>
        <div onClick={() => setTestNumber(1)}>
          <CardTest title="test" number={1} description="description1" />
        </div>
        <div onClick={() => setTestNumber(2)}>
          <CardTest title="test" number={2} description="description2" />
        </div>
      </div>) : null}
      {testNumber === 1 ? (
        <div className=''>
          <div className='textHead'>{t('description1')}</div>
          <LayoutAndStyle />
        </div>) : null}
      {testNumber === 2 ? (<div className=''>
        <div className='flex-row justify-between'>
          <div className='textHead'>{t('description2')}</div>
          <div className=''>หน้าแรก</div>
        </div>
        <LayoutAndStyle />
      </div>) : null}
    </main >
  );
}

export default App;