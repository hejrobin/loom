import { updateWidgetRepository } from 'scripts/utils';

import * as logger from 'pkg/logger';

await updateWidgetRepository();

logger.log(`Scanned and refreshed widget repository.`);
