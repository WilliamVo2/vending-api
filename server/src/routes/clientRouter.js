import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = ["/", "/user-sessions/new", "/users/new", "/orders", "/orders/new", "orders/:id"];

const authedClientRoutes = ["/authed-profile"]

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

router.get(authedClientRoutes, (req, res) => {
  //console.log(req.user)
  if(req.user) {
    res.sendFile(getClientIndexPath())
  } else {
    res.redirect("/user-sections/new")
  }
})

export default router;
