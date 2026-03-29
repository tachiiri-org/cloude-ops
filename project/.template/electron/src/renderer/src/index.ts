import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';

import './design/layout.css';
import './design/status.css';
import './design/tokens.css';
import './design/typography.css';

import './adapter/electron/desktop-api';

import { mountRenderer } from './bootstrap/mount-renderer';

void mountRenderer();
