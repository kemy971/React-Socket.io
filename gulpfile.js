/**
 * Created by kemy on 17/04/2016.
 */
var gulp = require('gulp');
var react = require('gulp-react');
var stream = require('webpack-stream');
var named = require('vinyl-named');

var webpackConfig = {
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};

var files = [
    {
        src: './client/src/front/index.js',
        dist: './client/dist/front/'
    },
    {
        src: './client/src/admin/index.js',
        dist: './client/dist/admin/'
    }
];

gulp.task('webpack', function () {
     return files.map(function (file) {
         return gulp.src(file.src)
             .pipe(named(function () {
                 return 'bundle';
             }))
             .pipe(stream(webpackConfig))
             .pipe(gulp.dest(file.dist));
     })
});

gulp.task('default', ['webpack'], function () {
    gulp.watch("./client/**/*.js", ['webpack']);
});