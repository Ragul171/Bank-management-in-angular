var express=require("express");
var bodyParser=require("body-parser");
var mysql=require("mysql");
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false});
function makeConnection()
{
    con=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"mepco"
    });
}
app.get("/sayhello",function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
	res.json({message:true});
    res.end();
});
app.get("/getall",function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
	res.json({message:true,studList:[{name:"ragul",age:20},{name:"somnath",age:19}]});
    res.end();
});
app.get("/insert",urlencodedParser,function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
	makeConnection();
	var name=req.query['name'];
	var age=req.query['age'];
    con.connect(function(err){
		if(err) throw err;
		sql="insert into student values('"+name+"',"+age+")";
		con.query(sql,function(err,result){
			if(err) throw err;
			res.json({message:true});
			res.end();
		});
	});
});
app.get("/display",urlencodedParser,function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
	makeConnection();
	var name=req.query['name'];
	var age=req.query['age'];
    con.connect(function(err){
		if(err) throw err;
		sql="select * from student";
		con.query(sql,function(err,result){
			if(err) throw err;
			res.json({message:true,result});
			res.end();
		});
	});
});
app.get("/search",urlencodedParser,function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
	makeConnection();
	var name=req.query['name'];
    con.connect(function(err){
		if(err) throw err;
		sql="select * from student where name = '"+name+"'";
		con.query(sql,function(err,result){
			if(err) throw err;
			res.json({message:true,result});
			res.end();
		});
	});
});
app.get("/delete",urlencodedParser,function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
	makeConnection();
	var name=req.query['name'];
    con.connect(function(err){
		if(err) throw err;
		sql="delete from student where name = '"+name+"'";
		con.query(sql,function(err,result){
			if(err) throw err;
			res.json({message:true});
			res.end();
		});
	});
});
app.get("/update",urlencodedParser,function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
	makeConnection();
	var name=req.query['name'];
	var age=req.query['age'];
    con.connect(function(err){
		if(err) throw err;
		sql="update student set age = "+age+" where name = '"+name+"'";
		con.query(sql,function(err,result){
			if(err) throw err;
			res.json({message:true});
			res.end();
		});
	});
});

app.listen(5000);
console.log("server running @ 5000");