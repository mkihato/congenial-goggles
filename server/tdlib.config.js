const path = require('path');
require('dotenv').config()

module.exports = {
  apiId: '16967563', // Replace with your Telegram API ID
  apiHash: '3bea3c2c0405ffd69a3101aa5105a90e', // Replace with your Telegram API Hash
  databaseDirectory: path.resolve(__dirname, 'tdlib-db'),
  filesDirectory: path.resolve(__dirname, 'tdlib-files'),
  useFileDatabase: true,
  useChatInfoDatabase: true,
  useMessageDatabase: true,
  useSecretChats: false,
  systemLanguageCode: 'en',
  deviceModel: 'Node.js',
  systemVersion: '1.0',
  applicationVersion: '1.0',
  enableStorageOptimizer: true,
  ignoreFileNames: false,
};
