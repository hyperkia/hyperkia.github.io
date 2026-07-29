
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

function Index(uint8){
	let binary = '';
    const chunkSize = 0x8000; // prevent stack overflow

    for (let i = 0; i < uint8.length; i += chunkSize) {
        const sub = uint8.subarray(i, i + chunkSize);
        binary += String.fromCharCode(...sub);
    }

    return btoa(binary);
}

export default Index;