// @flow
import type { Animal } from 'animals';

const c:any = {
  name: 'Dog',
  hasLegs: 'yes', // this is not the right type (should be bool)
}

console.log((c:Animal).id);

