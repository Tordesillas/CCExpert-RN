import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../utils';

const Chevron = props => (
    <Svg width={props.width || 26} height={props.height || 26} viewBox="0 0 512 512" {...props}>
        <Path
            d="m362 307c-5.140625 0-10.277344-1.96875-14.1875-5.902344l-77.699219-78.203125c-3.773437-3.800781-8.789062-5.894531-14.113281-5.894531s-10.339844 2.09375-14.113281 5.894531l-77.699219 78.203125c-7.785156 7.835938-20.449219 7.875-28.285156.089844-7.832032-7.785156-7.875-20.449219-.089844-28.285156l77.699219-78.199219c11.339843-11.417969 26.429687-17.703125 42.488281-17.703125s31.148438 6.285156 42.488281 17.703125l77.699219 78.199219c7.785156 7.835937 7.742188 20.5-.089844 28.285156-3.902344 3.875-9 5.8125-14.097656 5.8125zm26.460938 168.105469c9.449218-5.722657 12.46875-18.019531 6.746093-27.46875-5.726562-9.449219-18.023437-12.464844-27.46875-6.742188-33.59375 20.347657-72.234375 31.105469-111.738281 31.105469-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216c0 42.589844-12.664062 84.042969-36.625 119.882812-6.140625 9.183594-3.671875 21.605469 5.507812 27.742188 9.183594 6.140625 21.605469 3.671875 27.742188-5.507812 28.378906-42.441407 43.375-91.585938 43.375-142.117188 0-68.378906-26.628906-132.667969-74.980469-181.019531-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469 46.8125 0 92.617188-12.757812 132.460938-36.894531zm0 0"
            fill={props.color || Colors.WHITE}
            transform="rotate(180, 256, 256)"
        />
    </Svg>
);

export default Chevron;