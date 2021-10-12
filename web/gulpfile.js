const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const run = require("gulp-run");

gulp.task("compress_react", () => compress_react());

gulp.task("compress_custom", () => compress_custom());

//Full compile and compress

gulp.task("build_all", () => run("npm run buildall").exec());

gulp.task("sass", () => {
	const postcss = require("gulp-postcss");
	const autoprefixer = require("autoprefixer");
	return gulp
	.src("./sass/**/main.scss")
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(postcss([autoprefixer()]))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./stylesheets"));
});

//Paths hardcoded in bat, requires winscp in PATH
gulp.task("copy_react", (done)=>{
	//run('scp test.txt c0226@158.176.131.137:/www ').exec();
	//run('oboortjc').exec();
	run('react_full_push.bat').exec();
	//run('winscp /command "option batch abort" "option confirm off" "open sftp://c0226:oboortjc@c0226.paas1.lon.modxcloud.com/" "put test.txt /www/" "exit"').exec();
	done();
});

gulp.task("full_compile", gulp.series("build_all", "compress_react", "compress_custom", "copy_react"));

gulp.task("buildncompress", gulp.series("build_all", "compress_react"));

//Uglify custom bundle in js/bundle.js
const compress_custom = () => {
	let srcpath = "./js/bundle.js";
	let outpath = "./js";
	return pipeline(gulp.src(srcpath), uglify(), gulp.dest(outpath));
};

//Uglify react bundles in js/react/src/**/src/ directories and outputs to dist folder
const compress_react = () => {
	let srcpath = "./js/react/src/**/bundle.js";
	let outpath = "./js/react/dist";
	return pipeline(gulp.src(srcpath), uglify(), gulp.dest(outpath));
};
