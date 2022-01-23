module.exports = {
  apps: [
    {
      script: 'cadastropessoas.js',
      cwd: 'backend/',
      name: 'Backend',
      watch: true
    }
    /*{
      script: 'npm start',
      cwd: 'backend/',
      name: 'Backend',
      watch: true
    },
    {
      script: 'npm start',
      cwd: 'frontend/',
      name: 'Frontend',
      watch: true
    }*/
  ]
}
