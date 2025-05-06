const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewUrl(req,res){
    const body= req.body;
    if(!body ||!body.url) return res.status(400).json({error:"no url is passed"});
    const shortId = nanoid(8);
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    });

   return res.render("home",{
    id:shortId, 
   })
}



async function handleshortId(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
}



async function analytics(req,res){
    const shortId= req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalclicks: result.visitHistory.length,
        analytics:result.visitHistory,
    })
}



module.exports = {
 handleGenerateNewUrl,
 analytics,
 handleshortId,
}

