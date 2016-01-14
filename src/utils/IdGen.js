'use strict';

export default function gen() {
    return (Date.now() + (Math.random() * 999999 | 0)).toString(36);
}
