'use strict';

import states from 'states-us';

export const STATES = states.filter(x => !x.territory).map(x => x.abbreviation);
