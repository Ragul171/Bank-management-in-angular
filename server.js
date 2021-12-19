var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var mongoose=require("mongoose");
var urlencodedParser=bodyParser.urlencoded({extended:false});
mongoose.connect("mongodb://localhost:27017/user");
var userAuthSchema=new mongoose.Schema({
	username:String,
	pwd:String
});
const userAuthModel=mongoose.model("userauths",userAuthSchema);
var userDataSchema=new mongoose.Schema({
	fuserid:{
		ref:userAuthModel,
		type:mongoose.Schema.ObjectId,
	},
	name:String, 
	accno:Number,
	email:String,
	username:String,
	pwd:String,
	gender:String
});
const userDetailModel=mongoose.model("userdetails",userDataSchema);
var bankSchema=new mongoose.Schema({
	branchid:Number,
	ifsc:String,
	bankname:String,
	city:String
});
const bankModel=mongoose.model("bankdetails",bankSchema);
var accSchema=new mongoose.Schema({
	accno:Number,
	fbranchid:{
		ref:bankModel,
		type:Number
	},
	accbal:Number,
	name:String
});
const accModel=mongoose.model("accdetails",accSchema);
var transferSchema=new mongoose.Schema({
	sent_accno:Number,
	rec_accno:Number,
	date:Date,
	amount:Number
});
const transferModel=mongoose.model("transferdetails",transferSchema);
app.use(function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","*");
	next();
})
app.use(bodyParser.json())
app.post("/register",urlencodedParser,function(req,res){
	userid=null;
	auth={username:req.body.username,pwd:req.body.pwd};
	accModel.findOne({$or:[{accno:req.body.accno}]}).then(accfound=>{
		if(accfound){
			userAuthModel.create(auth).then( userInfo =>{
				userid=userInfo._id;
				detail={fuserid:userid,name:req.body.name,accno:req.body.accno,email:req.body.email,username:req.body.username,pwd:req.body.pwd,gender:req.body.gender};
				userDetailModel.create(detail,function(err){
					if (err) throw err;
					res.json({message:true})
					res.end();
				});
			});
		}
		else
			res.json({message:false,error:"Account not available in our bank"})
	});
});
app.post("/login",urlencodedParser,function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	pwd=req.body.pwd;
	obj={username:req.body.username,pwd:req.body.pwd};
	db=mongoose.connection;
	userAuthModel.findOne({$or:[{username:req.body.username}]}).then(found=>{
		if(found)
		{
			if(pwd==found.pwd)
			{
				userDetailModel.findOne({$or:[{fuserid:found._id}]}).then(user=>{
					res.json({message:true,result:found._id,accno:user.accno});
				});
			}
			else
				res.json({message:false,error:"Password Incorrect"})
		}
		else
			res.json({message:false})
	})
});
app.post("/home",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	userDetailModel.findOne({$or:[{fuserid:req.body.username}]}).then(details=>{
		accModel.findOne({$or:[{accno:parseInt(details.accno)}]}).then(accdetails=>{
			transferModel.find({$or:[{sent_accno:parseInt(details.accno)},{rec_accno:parseInt(details.accno)}]}).then(found=>{
				if(found){
					res.json({message:true,result:details,accdet:accdetails,summary:found});
				}
				else
					res.json({message:true,result:details,accdet:accdetails});
			})
			
		})
	});
});
app.post("/profile",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	userDetailModel.findOne({$or:[{fuserid:req.body.username}]}).then(details=>{
		if(details)
		{
			accModel.findOne({$or:[{accno:parseInt(details.accno)}]}).then(accdetails=>{
				if(accdetails)
				{
					bankModel.findOne({$or:[{branchid:accdetails.fbranchid}]}).then(bankdet=>{
						res.json({message:true,result:details,accdet:accdetails,bank:bankdet});
					})
				}
			})
		}
		
	});
});
app.post("/validate",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	accModel.findOne({$or:[{accno:parseInt(req.body.to)}]}).then(found=>{
		console.log(found)
		if (found){
			res.json({message:true})
		}
		else
			res.json({message:false})
		res.end();
	});
});
app.post("/transfer",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	accModel.findOne({$or:[{accno:parseInt(req.body.from)}]}).then(found=>{
		if(found.accbal > req.body.amount)
		{
			console.log("Balance sufficient");
			accModel.updateOne({accbal:found.accbal},{accbal:found.accbal-req.body.amount}).then( to=>{
				accModel.findOne({$or:[{accno:parseInt(req.body.to)}]}).then(foundto=>{
					accModel.updateOne({accbal:foundto.accbal},{accbal:foundto.accbal+parseInt(req.body.amount)}).then(success=>{
						if(success)
						{
							entry={sent_accno:req.body.from,rec_accno:req.body.to,date:new Date(),amount:req.body.amount}
							transferModel.create(entry,function(err){
								if (err) throw err;
								res.json({message:true})
							})
						}
							
						else
							res.json({message:false})
					});
				});
			});
		}
		else
		{	
			res.json({message:false,error:"Balance not sufficient"});
		}
	});
});
app.get("/admin",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	accModel.find({}).then(accdetails=>{
		res.json({message:true,accdet:accdetails});
    })
});
app.post("/addacc",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	detail={accno:req.body.accno,fbranchid:100,accbal:req.body.bal,name:req.body.name}
	accModel.create(detail,function(err){
		if (err) throw err;
		console.log("Inserted");
		res.json({message:true})
		res.end();
	});
})
app.post("/deleteacc",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	transferModel.deleteOne({$or:[{sent_accno:parseInt(req.body.accno)},{rec_accno:parseInt(req.body.accno)}]});
	accModel.findOne({$or:[{accno:parseInt(req.body.accno)}]}).then(found=>{
		userDetailModel.findOne({$or:[{name:found.name}]}).then(found1=>{
			userAuthModel.deleteOne({$or:[{_id:found1.fuserid}]}).then(
				accModel.findOne({$or:[{accno:parseInt(req.body.accno)}]}).then(found2=>{
					userDetailModel.deleteOne({$or:[{name:found2.name}]}).then(
						accModel.deleteOne({$or:[{accno:parseInt(req.body.accno)}]}).then(function(){
							res.json({message:true});
						})
					)
				})
			)
		})
	})
	
})
app.post("/deposit",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	accModel.findOne({$or:[{accno:parseInt(req.body.accno)}]}).then(foundto=>{
		accModel.updateOne({accbal:foundto.accbal},{accbal:foundto.accbal+parseInt(req.body.amount)}).then(success=>{
			if(success)
			{
				entry={sent_accno:100,rec_accno:req.body.accno,date:new Date(),amount:req.body.amount}
				transferModel.create(entry,function(err){
					if (err) throw err;
					res.json({message:true})
				})
			}				
			else
				res.json({message:false})
		});
	});
});
app.post("/withdraw",function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	accModel.findOne({$or:[{accno:parseInt(req.body.accno)}]}).then(foundto=>{
		accModel.updateOne({accbal:foundto.accbal},{accbal:foundto.accbal-parseInt(req.body.amount)}).then(success=>{
			if(success)
			{
				entry={sent_accno:req.body.accno,rec_accno:100,date:new Date(),amount:req.body.amount}
				transferModel.create(entry,function(err){
					if (err) throw err;
					res.json({message:true})
				})
			}				
			else
				res.json({message:false})
		});
	});
})
app.listen(5000);
console.log("Server running @ 5000");