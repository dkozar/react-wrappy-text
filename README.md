[![NPM](https://nodei.co/npm/react-wrappy-text.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-wrappy-text)

[![NPM](https://badge.fury.io/js/react-wrappy-text.png)](https://www.npmjs.com/package/react-wrappy-text)

# React Wrappy Text
"Unwrapping" text component for React.

![Wrappy Text!](http://dankokozar.com/images/wrappy.png)

Ported my old [eDriven.Gui](https://github.com/dkozar/edriven-gui/blob/master/eDriven.Playground/Unity/Assets/eDriven/Demo/_shared/Code/Components/TitleLabel.cs) component, originally written in C# (for Unity3d game engine).

Just as a proof of concept, and because I like the effect.

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

```bash
git clone https://github.com/dkozar/react-wrappy-text.git
cd react-wrappy-text
npm install
```

*npm install* will install all the dependencies (and their dependencies) into the *node_modules* folder.

### :rocket: Run the hot-loader build (local)

```bash
npm start
open http://localhost:3000
```

This will give you the build that will partially update the browser via *webpack* whenever you save the edited source file.
Additionally, it will keep the React component state *intact*.

For more info on React hot-loader, take a look into [this fantastic video](https://www.youtube.com/watch?v=xsSnOQynTHs).

### :airplane: Run the minified production build

```bash
npm run demo
```
This should build the *demo* folder. This is how the [demo](http://dkozar.github.io/react-wrappy-text/) is built.

### :helicopter: Run the non-minified demo build

```bash
npm run demo-max
```
This should build the *demo* folder. Non-minified for easier debugging.

## Thanks to:

:rocket: [React Transform Boilerplate](https://github.com/gaearon/react-transform-boilerplate) for workflow.
