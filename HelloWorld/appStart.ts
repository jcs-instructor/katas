import { makeApp } from './app';
const port = 3000
const app = makeApp();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
