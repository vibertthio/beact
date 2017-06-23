import DrumsController from './controllers/drums_controller';

module.exports = (server) => {
  server.post('/api/notes', DrumsController.create);
  server.put('/api/notes/:id', DrumsController.edit);
  server.delete('/api/notes/:id', DrumsController.delete);
  server.get('/api/notes', DrumsController.getnotes);
  server.get('/api/notes/:id', DrumsController.getnote);

  server.post('/api/patterns', DrumsController.createPattern);
  server.put('/api/patterns/:id', DrumsController.editPattern);
  server.delete('/api/patterns/:id', DrumsController.deletePattern);
  server.get('/api/patterns', DrumsController.getPatterns);
  server.get('/api/patterns/:id', DrumsController.getPattern);
};
