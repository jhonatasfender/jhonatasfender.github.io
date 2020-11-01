import React, { Component } from 'react';
import "xterm/css/xterm.css";
import './App.css';
import RunTerminal from "./RunTerminal";
import XTerm from './XTermJs';

class App extends Component<{}, {}> {

    private inputRef: React.RefObject<XTerm>;

    constructor(props: {}) {
        super(props)
        this.inputRef = React.createRef()
    }

    public componentDidMount(): void {
        // tslint:disable-next-line: no-unused-expression
        new RunTerminal(this.inputRef.current!!);
    }

    public componentWillUnmount(): void {
        this.inputRef.current?.componentWillUnmount();
    }

    public render() {
        return (
            <div className="App">
                <XTerm ref={this.inputRef}
                    addons={['fit', 'fullscreen', 'search']}
                    style={{
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                    }} />
            </div>
        );
    }
}

export default App;
