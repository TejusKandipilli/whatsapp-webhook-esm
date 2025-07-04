import Router from "express";
import {
  sendHelloCat,
  sendCustomCat,
  sendRandomCat,
  sendCatGif,
} from "../controllers/sendImage.controller.js";

const router = Router();

// Send basic "hello" cat
router.post('/sendHello/:number', sendHelloCat);

// Send cat with custom text
router.post('/sendCustom/:number/:text', sendCustomCat);

// Send random cat with no text
router.post('/sendRandom/:number', sendRandomCat);


// Send a random cat GIF
router.post('/sendGif/:number', sendCatGif);

export default router;
