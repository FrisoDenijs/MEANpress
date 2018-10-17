import { App } from './App';
import controllerContainer from './controllers/controller.config';

const port = process.env.PORT || 3000;

const app = new App(controllerContainer).express;

app.listen(port, (err) => {
    if (err) {
      return console.log(err)
    }
  
    return console.log(`server is listening on ${port}`)
  });
