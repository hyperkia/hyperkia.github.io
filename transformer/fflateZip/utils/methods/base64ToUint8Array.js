
import { zip, unzipSync, strFromU8 } from '../../library/browser.js';
import props from '../props.js';

function Index(base64){
    const clean = base64.includes(',') ? base64.split(',')[1] : base64;
    const binary = atob(clean);
    const len = binary.length;

    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

export default Index;