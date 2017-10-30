module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/** <%= pkg.description %>\n' +
        '@version v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        '@author <%= pkg.author %> **/\n',
        compress: {
          unused: false
        }
      },
      main: {
        /*files: {
         'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
         }*/
        files: [{
          expand: true,
          src: [],
          dest: ''
        }]

      }
    },
    less: {
      development: {
        options: {
          paths: ['app/assets/css']
        },
        files: [
          {
            expand: true,
            src: ['app/assets/css/*.less'],
            dest: '',
            ext: '.css',
            extDot: 'first'
          }
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('less:dev', ['less:development']);

};