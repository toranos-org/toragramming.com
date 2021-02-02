import theme from './src'

export default theme({
  docs: {
    primaryColor: '#E24F55',
  },
  i18n: {
    locales: () => [
      {
        code: 'ja',
        iso: 'ja-JP',
        file: 'ja_JP.js',
        name: '日本語',
      },
    ],
    defaultLocale: 'ja',
  },
})
