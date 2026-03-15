import './design/layout.css';
import './design/status.css';
import './design/tokens.css';
import './design/typography.css';

import './adapters/electron/desktop-api';

import { mountRenderer } from './bootstrap/mount-renderer';

void mountRenderer();
