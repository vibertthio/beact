import PostsController from './controllers/drums_controller';

module.exports = (server) => {
  server.post('/api/notes', PostsController.create);
  server.put('/api/notes/:id', PostsController.edit);
  server.delete('/api/notes/:id', PostsController.delete);
  server.get('/api/notes', PostsController.getposts);
  server.get('/api/notes/:id', PostsController.getpost);
};
