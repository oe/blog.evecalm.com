module.exports = function(grunt) {
  grunt.config.set('sass', {
    // Compile `tranquilpeak.scss` file into `tranquilpeak.css`
    dev: {
      options: {
        sourceMap: false
      },
      files: {
        'source/assets/css/tranquilpeak.css': 'source/_css/tranquilpeak.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
};