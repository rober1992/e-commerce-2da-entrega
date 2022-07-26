import myServer from './services/server'


const port = process.env.PORT || 8080;

myServer.listen(port, () => console.log(`Server up on port ${port}`));