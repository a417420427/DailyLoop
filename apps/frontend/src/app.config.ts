import { useGlobalIconFont } from './components/OriginalIconFont/helper';

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/register/index',
    'pages/titleGenerator/index',
    'pages/history/index',
    'pages/lifeCopy/index',
    'pages/notes/index',
    'pages/ocr/index',
    'pages/ocrRecognizeTextPage/index',
    
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WeChat',
  },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usingComponents: Object.assign({}, useGlobalIconFont()),
});
