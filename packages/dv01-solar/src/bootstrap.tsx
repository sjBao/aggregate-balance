import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './atoms/Button';
import { Select } from './molecules/Select';

if (process.env.NODE_ENV === 'development') {
    const root = document.getElementById('_solar_dev');
    if (root) {
        ReactDOM.render(
            [
                <Button>Test</Button>,
                <Select
                    name="test-select"
                    onChange={console.log}
                    options={[
                        { value: '1', name: '1' },
                        { value: '2', name: '2' },
                        { value: '3', name: '3' }
                    ]}
                />
            ]
            , root
        )
    }
}

export {
    Button,
    Select
}
