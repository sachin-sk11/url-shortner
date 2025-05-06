const express = require('express');
const router =express.Router();


const {handleGenerateNewUrl,
    analytics,
    handleshortId,
}= require("../controllers/url")

router.post("/",handleGenerateNewUrl);

router.get("/:shortId",handleshortId);

router.get('/analytics/:shortId',analytics);

module.exports = router;