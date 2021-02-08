# Virtual DOM & Render Functions

## Benefits of having a virtual DOM layer

1. Decouples rendering logic from the actual DOM
    - makes it straightforward to reuse it in non-browser environments.
e.g. rendering to a string (SSR), rendering to a canvas/WebGL, or native mobile rendering.

2. Provides the ability to programmatically construct, inspect, clone and create derivative structures using the full power of JavaScript
