const { Setting, Task } = require("../models/model");
const moment = require("moment");

exports.setSetting = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (token) {
      let setting = await Setting.findOne({
        DeviceId: token,
      })
        .sort({ createdAt: -1 })
        .limit(1);

      let createNew = true;

      if (setting) {
        const currentDate = moment();
        createNew = !(
          moment(setting.StartingTime).isSameOrBefore(currentDate) &&
          moment(setting.Deadline).isSameOrAfter(currentDate)
        );
      }

      if (!setting || createNew) {
        setting = await Setting.create({
          DeviceId: token,
          Hours: 40,
          StartingTime: moment().day(1).toDate(),
          Deadline: moment().day(7).toDate(),
        });
      }

      let usedHours = await Task.aggregate([
        { $match: { Setting: setting._id } },
        {
          $group: {
            _id: "$Setting",
            total: {
              $sum: "$EstimatedDuration",
            },
          },
        },
      ]);

      usedHours = usedHours?.[0]?.total || 0;
      req.setting = { ...setting._doc, usedHours };
      next();
    } else next(new Error("Not Authorized"));
  } catch (error) {
    next(error);
  }
};
