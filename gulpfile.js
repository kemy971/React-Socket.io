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
        src: 'client/src/front/index.js',
        dist: 'client/dist/front/'
    },
    {
        src: 'client/src/admin/index.js',
        dist: 'client/dist/admin/'
    }
];

gulp.task('webpack', function () {
    files.forEach(function (file) {
        gulp.src(file.src)
             .pipe(named(function () {
                 return 'bundle';
             }))
             .pipe(stream(webpackConfig))
             .pipe(gulp.dest(file.dist));
     })
});

gulp.task('watch', function () {
    gulp.watch("client/src/**/*.js", ['webpack']);
});

gulp.task('default', ['webpack','watch']);