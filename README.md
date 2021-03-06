[![NPM](https://nodei.co/npm/react-wrappy-text.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-wrappy-text)

[![NPM](https://badge.fury.io/js/react-wrappy-text.png)](https://www.npmjs.com/package/react-wrappy-text)

# React Wrappy Text
"Unwrapping" text component for React.

[![Wrappy Text!](./images/wrappy.png)](http://dkozar.github.io/react-wrappy-text/)

Ported my old [eDriven.Gui](https://github.com/dkozar/edriven-gui/blob/master/eDriven.Playground/Unity/Assets/eDriven/Demo/_shared/Code/Components/TitleLabel.cs) component, originally written in C# (for Unity3d game engine).

Just as a proof of concept, and because I like the effect.

The effect is inspired by the work of great Flash guru [Elvis Mehmedović](http://emehmedovic.com/). Elvis, get back to programming! 😀 

## :tv: Demo

http://dkozar.github.io/react-wrappy-text/

## :zap: Usage

```js
// ES6
import React, { Component } from 'react';
import { render } from 'react-dom';
import WrappyText from 'react-wrappy-text';

export class App extends Component {

    render() {
        return (
            <div>
                <WrappyText>This is the default wrappy text.</WrappyText>

                <WrappyText
                    replacements='$$$$$$$$$$$$$$$$$$$\\\\___+-_'
                    fps={40}
                    factor={0.8}
                    onProgress={this.onProgress}>
                    This is the configured wrappy text.
                </WrappyText>
            </div>
        );
    }
    
    onProgress(info) {
        var progress = info.done / info.total;
        console.log('Progress: ' + 100 * progress + '%');
    }
}

render(<App />, document.body);
```

## :truck: Installation

### Use it as the NPM package:

```bash
npm install react-wrappy-text --save
```

This will install the package into the *node_modules* folder of your project.

### Or, download the project source:

```bash
git clone https://github.com/dkozar/react-wrappy-text.git
cd react-wrappy-text
npm install
```

*npm install* will install all the dependencies (and their dependencies) into the *node_modules* folder.

Then, you should run one of the builds.

## :factory: Builds

### :rocket: Hot-loader development build

```bash
npm start
open http://localhost:3000
```

This will give you the build that will partially update the browser via *webpack* whenever you save the edited source file.

Additionally, it will keep the React component state *intact*.

For more info on React hot-loader, take a look into [this fantastic video](https://www.youtube.com/watch?v=xsSnOQynTHs).

### :helicopter: Demo build

```bash
npm run demo
```
This should build the minified *demo* folder (it's how the [demo](http://dkozar.github.io/react-wrappy-text/) is built).

```bash
npm run debug
```
This should build the non-minified *demo* folder (for easier debugging).

You could install the http-server for running demo builds in the browser:

```bash
npm install http-server
http-server
```

### :steam_locomotive: Additional builds

```bash
npm run build
```

Runs Babel on source files (converting ES6 and React to JS) and puts them into the *build* folder.

```bash
npm run dist
```

Builds the webpackUniversalModuleDefinition and puts it into the *dist* folder.

```bash
npm run all
```

Runs all the builds: *build* + *dist* + *demo*.

## :thumbsup: Thanks to:

:rocket: [React Transform Boilerplate](https://github.com/gaearon/react-transform-boilerplate) for the workflow.

[![Downloads!](https://nodei.co/npm-dl/react-wrappy-text.png?months=1)](https://www.npmjs.com/package/react-wrappy-text)
