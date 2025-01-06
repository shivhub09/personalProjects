const { Router } = require("express");
const promoterController = require("../controllers/promoter.controller");
const router = Router();
const upload = require("../middlewares/multer.middleware");

router.route("/fetchAttendance").post(promoterController.fetchAttendance);
router.route("/fetchAllForms").post(promoterController.fetchPromoterForms);

router
  .route("/fetchFormFilledData")
  .post(promoterController.fetchFormFilledData);
router.post(
  "/fillFormData/:collectionName",
  upload.any(),
  promoterController.fillFormData
);

//Done
router
  .route("/fetchPromoterAttendanceDetails")
  .post(promoterController.fetchPromoterAttendanceDetails);
router.route("/fillAttendancePunchIn").post(
  upload.fields([
    {
      name: "loginPhoto",
      maxCount: 1,
    },
  ]),
  promoterController.fillAttendancePunchIn
);
router.route("/fillAttendancePunchOut").post(
  upload.fields([
    {
      name: "logOutPhoto",
      maxCount: 1,
    },
  ]),
  promoterController.fillAttendancePunchOut
);
router
  .route("/fetchPromoterDetails")
  .post(promoterController.fetchPromoterDetails);
router.route("/loginPromoter").post(promoterController.promoterLogin);
router.route("/fetchFormField").post(promoterController.fetchFormField);
router.route("/fetchPromoters").get(promoterController.fetchAllPromoters);

router.route("/registerNewPromoter").post(promoterController.createNewPromoter);
module.exports = router;
