import { useState } from 'react';
import './App.css';
import { Atom } from './components/Atom';
import { Selector } from './components/Selector';

function App() {
    const [state, setState] = useState('atom');
    return (
        <div>
            <button onClick={() => setState('atom')}>atom</button>
            <button onClick={() => setState('selector')}>selector</button>
            <button onClick={() => setState('selectorAsync')}>
                selectorAsync
            </button>
            <button onClick={() => setState('atomFamily')}>atomFamily</button>
            <button onClick={() => setState('selectorFamily')}>
                selectorFamily
            </button>

            {state === 'atom' && <Atom />}
            {state === 'selector' && <Selector />}
        </div>
    );
}

export default App;
