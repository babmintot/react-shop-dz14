// Полифилл для TextEncoder/TextDecoder (нужен для React Router в Jest)
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Подключаем матчеры @testing-library/jest-dom
require('@testing-library/jest-dom');