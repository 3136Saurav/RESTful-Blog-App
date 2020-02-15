var bodyParser   = require("body-parser"),
express          = require("express"),
expressSanitizer = require("express-sanitizer"),
methodOverride   = require("method-override"),
mongoose         = require("mongoose"),
app              = express();

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE/MODEL/CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String, 
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);
//C://Users//Win-10//Pictures//Camera Roll//WIN_20170702_20_36_29_Pro.jpg

// Blog.create({
//  	title: "Microsoft", 
//  	image: "data:image/png;base64,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", 
//  	body: "Amazing Company"
//  });

//RESTful ROUTES
//-----------------------------------------------------------------------------------

app.get("/", function(req, res){
	res.redirect("/blogs");
});


app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Error!!");
		}
		else{
			res.render("index", {blogs: blogs});
		}
	});
});

 app.get("/blogs/new", function(req, res){
 	res.render("new");
 });

 app.post("/blogs", function(req, res){
 	//req.body.blog.body = sanitize(req.body.blog.body);
 	Blog.create(req.body.blog, function(err, newBlog){
 		if(err){
 			res.render("new");
 		}
 		else{
 			res.redirect("/blogs");
 		}
 	});
 });

app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.render("/blogs");
		}
		else{
			res.render("show", {blog: foundBlog});
		}
	});
});

app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.render("/blogs");
		}
		else{
			res.render("edit", {blog: foundBlog});
		}
	});
});

app.put("/blogs/:id", function(req, res){
	//req.body.blog.body = sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/"+ req.params.id);
		}
	});
});

app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, function(){
	console.log("Server is running...");
});