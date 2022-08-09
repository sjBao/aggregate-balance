import { getData } from './request/api'

if (process.env.NODE_ENV === 'development') {
    const root = document.getElementById('_dv01-api-dev-root');
    if (root) getData().then(loanData => {
        root.innerHTML = `<pre>${JSON.stringify(loanData, null, 2)}</pre>`;
    });
}

export {
    getData
}
