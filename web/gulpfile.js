const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");


//Uglify react bundles in js/react/src/**/src/ directories and outputs to dist folder
gulp.task("compress_react", function () {
	let srcpath = "./js/react/src/**/bundle.js";
	let outpath = "./js/react/dist";
	return pipeline(gulp.src(srcpath), uglify(), gulp.dest(outpath));
});

//Babel and compress react folders -- hmm needs webpack will finish later
gulp.task("compile_react", () => {
	let srcpath = "./js/react/src/**/src/index.js";
	let outpath = "./js/react/dist";
	return pipeline(
		gulp.src(srcpath),
		babel({
			presets: ["@babel/preset-env", "@babel/preset-react"],
		}),
		uglify(),
		gulp.dest(outpath)
	);
});

gulp.task("sass", () => {
	return gulp.src("./sass/**/main.scss")
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./stylesheets"));
});

